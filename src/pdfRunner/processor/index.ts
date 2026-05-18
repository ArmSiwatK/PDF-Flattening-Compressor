import path from 'path';
import { convertPDFToImages } from './converter.js';
import { embedImagesIntoPDF } from './embedder.js';
import { cleanupTempFiles, ensureDirectoryExists } from './utils.js';
import type { ProcessPDFConfig } from '../types.js';


export const processSinglePDF = async (inputPDFPath: string, outputPDFPath: string, config: ProcessPDFConfig): Promise<void> => {
    console.log(`\n[+] Starting flatten for: ${path.basename(inputPDFPath)}`);
    await ensureDirectoryExists(config.outputDir);

    const tempDir = path.join(config.outputDir, `temp_${Date.now()}`);
    await ensureDirectoryExists(tempDir);
    try {
        const images = await convertPDFToImages({ inputPDFPath, tempDir, convertOptions: config.convertOptions });
        await embedImagesIntoPDF(images, tempDir, outputPDFPath);
    } finally {
        await cleanupTempFiles(tempDir);
    }
};