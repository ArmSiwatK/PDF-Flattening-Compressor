const path = require('path');
const { convertPDFToImages } = require('./pdfConverter');
const { embedImagesIntoPDF } = require('./pdfEmbedder');
const { cleanupTempFiles, ensureDirectoryExists } = require('./fileUtils');



const processSinglePDF = async (inputPDFPath, outputPDFPath, config) => {
    console.log(`\n[+] Starting flatten for: ${path.basename(inputPDFPath)}`);

    await ensureDirectoryExists(config.outputDir);

    const tempDir = path.join(config.outputDir, path.basename(inputPDFPath, '.pdf'));
    await ensureDirectoryExists(tempDir);

    const images = await convertPDFToImages(inputPDFPath, tempDir, config.convertOptions);
    await embedImagesIntoPDF(images, tempDir, outputPDFPath);
    await cleanupTempFiles(tempDir, images);
}



module.exports = { processSinglePDF };
