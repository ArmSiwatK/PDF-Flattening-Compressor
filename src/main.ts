import fs from 'node:fs/promises';
import path from 'node:path';
import { processSinglePDF, type ProcessPDFConfig } from './processor/index.js';
import { config } from './config/index.js';
import { selectScalePageTo } from './quality.js';


const main = async (): Promise<void> => {
    try {
        await fs.mkdir(config.inputDir, { recursive: true });
        await fs.rm(config.outputDir, { recursive: true, force: true });
        await fs.mkdir(config.outputDir, { recursive: true });

        const files = await fs.readdir(config.inputDir);
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        if (!pdfFiles.length) throw new Error('No PDF files found in input directory');

        const scalePageTo = await selectScalePageTo();
        await Promise.all(
            pdfFiles.map(async (pdfFile) => {
                const inputPath = path.join(config.inputDir, pdfFile);
                const outputPath = path.join(config.outputDir, pdfFile);

                const pdfConfig: ProcessPDFConfig = {
                    outputDir: config.outputDir,
                    convertOptions: { ...config.convertOptions, scalePageTo }
                };
                await processSinglePDF(inputPath, outputPath, pdfConfig);
            })
        );
        console.log('[+] All PDFs processed successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
};

main();