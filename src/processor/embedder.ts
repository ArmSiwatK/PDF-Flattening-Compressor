import fs from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';


const addImageAsPage = async (pdfDoc: PDFDocument, imageBuffer: Uint8Array): Promise<void> => {
    const img = await pdfDoc.embedJpg(imageBuffer);
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
};


export const embedImagesIntoPDF = async (images: string[], tempDir: string, outputPDFPath: string): Promise<void> => {
    console.log(`[+] Embedding ${images.length} images into new PDF...`);
    const pdfDoc = await PDFDocument.create();

    for (const imageFile of images) {
        const imagePath = path.join(tempDir, imageFile);
        const imageBuffer = await fs.readFile(imagePath);
        await addImageAsPage(pdfDoc, imageBuffer);
    }
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPDFPath, pdfBytes);
    console.log(`[+] Saved flattened PDF to: ${outputPDFPath}`);
};