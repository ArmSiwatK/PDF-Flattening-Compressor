const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-poppler');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

async function flattenPDF(inputPDFPath, outputPDFPath) {
    try {
        await fs.mkdir(outputDir, { recursive: true });
        const opts = {
            format: 'png',
            out_dir: outputDir,
            out_prefix: 'page',
            poppler_path: path.join(__dirname, 'poppler-24.08.0', 'Library', 'bin'),
        };

        await pdf.convert(inputPDFPath, opts);
        const images = (await fs.readdir(outputDir))
            .filter(f => f.startsWith('page') && f.endsWith('.png'))
            .sort();

        if (!images.length) throw new Error('No images generated from PDF');

        const pdfDoc = await PDFDocument.create();
        await Promise.all(images.map(async imageFile => {
            const img = await pdfDoc.embedPng(await fs.readFile(path.join(outputDir, imageFile)));
            const page = pdfDoc.addPage([img.width, img.height]);
            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }));

        await fs.writeFile(outputPDFPath, await pdfDoc.save());
        await Promise.all(images.map(f => fs.unlink(path.join(outputDir, f))));
        console.log(`Flattened PDF saved: ${outputPDFPath}`);
    } catch (error) {
        console.error('Error during PDF flattening:', error);
    }
}

async function main() {
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
}

main();