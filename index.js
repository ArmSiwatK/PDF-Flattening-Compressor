const fs = require('fs').promises;
const path = require('path');
const { PDFDocument: LibPDFDocument } = require('pdf-lib');
const pdf = require('pdf-poppler');
const ora = require('ora').default;

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');



const convertPDFToImages = async (inputPDFPath, tempDir) => {
    const optsBase = {
        format: 'png',
        out_dir: tempDir,
        out_prefix: 'page',
        poppler_path: path.join(__dirname, 'poppler-24.08.0', 'Library', 'bin'),
        scale: 2000,
        anti_aliasing: true
    };

    const pdfData = await fs.readFile(inputPDFPath);
    const pdfDoc = await LibPDFDocument.load(pdfData);
    const pageCount = pdfDoc.getPageCount();

    const spinner = ora('Converting PDF to high-quality images in parallel...').start();
    const startTime = Date.now();

    const convertPromises = generateConversionPromises(inputPDFPath, pageCount, optsBase);
    await Promise.all(convertPromises);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    spinner.succeed(`High-quality conversion complete in ${elapsed}s`);

    const images = (await fs.readdir(tempDir))
        .filter(f => f.startsWith('page') && f.endsWith('.png'))
        .sort();

    if (!images.length) throw new Error('No images generated from PDF');
    return images;
};



const generateConversionPromises = (inputPDFPath, pageCount, optsBase) => {
    return Array.from({ length: pageCount }, (_, i) => {
        const pageNum = i + 1;
        const opts = { ...optsBase, page: pageNum };
        return pdf.convert(inputPDFPath, opts);
    });
};



const embedImagesIntoPDF = async (images, tempDir, outputPDFPath) => {
    console.log(`[+] Embedding ${images.length} images into new PDF...`);
    const pdfDoc = await LibPDFDocument.create();

    for (const imageFile of images) {
        const img = await pdfDoc.embedPng(await fs.readFile(path.join(tempDir, imageFile)));
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    await fs.writeFile(outputPDFPath, await pdfDoc.save());
    console.log(`[+] Saved flattened PDF to: ${outputPDFPath}`);
};



const flattenPDF = async (inputPDFPath, outputPDFPath) => {
    try {
        console.log(`\n[+] Starting flatten for: ${path.basename(inputPDFPath)}`);
        await fs.mkdir(outputDir, { recursive: true });

        const pdfName = path.basename(inputPDFPath, '.pdf');
        const tempDir = path.join(outputDir, pdfName);
        await fs.mkdir(tempDir, { recursive: true });

        const images = await convertPDFToImages(inputPDFPath, tempDir);
        await embedImagesIntoPDF(images, tempDir, outputPDFPath);

        await Promise.all(images.map(f => fs.unlink(path.join(tempDir, f))));
        await fs.rmdir(tempDir);
        console.log('[+] Cleaned up temporary images.');
    } catch (error) {
        console.error('Error during PDF flattening:', error);
    }
};



const main = async () => {
    try {
        const files = await fs.readdir(inputDir);
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        if (!pdfFiles.length) throw new Error('No PDF files found in input directory');

        await Promise.all(pdfFiles.map(async pdfFile => {
            console.log(`Processing file: ${pdfFile}`);
            await flattenPDF(path.join(inputDir, pdfFile), path.join(outputDir, pdfFile));
        }));
    } catch (error) {
        console.error('Error:', error);
    }
};



main();