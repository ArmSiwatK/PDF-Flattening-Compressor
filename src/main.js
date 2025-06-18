const fs = require('fs').promises;
const path = require('path');
const { processSinglePDF } = require('./processor');
const config = require('../config');



const main = async () => {
    try {
        await fs.rm(config.outputDir, { recursive: true, force: true });
        await fs.mkdir(config.outputDir, { recursive: true });

        const files = await fs.readdir(config.inputDir);
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        if (!pdfFiles.length) throw new Error('No PDF files found in input directory');

        await Promise.all(pdfFiles.map(async pdfFile => {
            const inputPath = path.join(config.inputDir, pdfFile);
            const outputPath = path.join(config.outputDir, pdfFile);
            const outputDir = path.join(config.outputDir, path.basename(pdfFile, '.pdf'))
            await processSinglePDF(inputPath, outputPath, {
                ...config, convertOptions: { ...config.convertOptions, out_dir: outputDir }
            });
        }));
        console.log('[+] All PDFs processed successfully.');

    } catch (error) {
        console.error('Error:', error);
    }
}



main();
