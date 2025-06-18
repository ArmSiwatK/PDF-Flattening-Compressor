const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-poppler');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

async function flattenPDF(inputPDFPath, outputPDFPath) {
    try {
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const popplerPath = path.join(__dirname, 'poppler-24.08.0', 'Library', 'bin');

        const opts = {
            format: 'png',
            out_dir: outputDir,
            out_prefix: 'page',
            page: null,
            poppler_path: popplerPath,
        };
        await pdf.convert(inputPDFPath, opts);

        let images = fs.readdirSync(outputDir)
            .filter(f => f.startsWith('page') && f.endsWith('.png'))
            .sort();

        if (images.length === 0) {
            console.error('No images generated from PDF.');
            return;
        }

        const pdfDoc = await PDFDocument.create();

        for (const imageFile of images) {
            const imageBytes = fs.readFileSync(path.join(outputDir, imageFile));
            const img = await pdfDoc.embedPng(imageBytes);
            const page = pdfDoc.addPage([img.width, img.height]);
            page.drawImage(img, {
                x: 0,
                y: 0,
                width: img.width,
                height: img.height,
            });
        }

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPDFPath, pdfBytes);
        console.log(`Flattened PDF saved: ${outputPDFPath}`);

        for (const imgFile of images) {
            fs.unlinkSync(path.join(outputDir, imgFile));
        }

    } catch (error) {
        console.error('Error during PDF flattening:', error);
    }
}



async function main() {
    const files = fs.readdirSync(inputDir);
    const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');

    if (pdfFiles.length === 0) {
        console.error('No PDF files found in input directory.');
        return;
    }

    for (const pdfFile of pdfFiles) {
        const inputPDFPath = path.join(inputDir, pdfFile);
        const outputPDFPath = path.join(outputDir, pdfFile);

        console.log(`Processing file: ${pdfFile}`);
        await flattenPDF(inputPDFPath, outputPDFPath);
    }
}

main();
