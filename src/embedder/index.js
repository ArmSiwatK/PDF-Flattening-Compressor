const fs = require('fs').promises;
const path = require('path');
const { PDFDocument: LibPDFDocument } = require('pdf-lib');



const embedImagesIntoPDF = async (images, tempDir, outputPDFPath) => {
    console.log(`[+] Embedding ${images.length} images into new PDF...`);
    const pdfDoc = await LibPDFDocument.create();

    for (const imageFile of images) {
        const imageBuffer = await fs.readFile(path.join(tempDir, imageFile));
        const img = await pdfDoc.embedJpg(imageBuffer);
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    await fs.writeFile(outputPDFPath, await pdfDoc.save());
    console.log(`[+] Saved flattened PDF to: ${outputPDFPath}`);
}



module.exports = { embedImagesIntoPDF };
