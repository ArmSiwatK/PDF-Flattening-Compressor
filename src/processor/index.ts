import path from 'path';
import { convertPDFToImages, type ConvertPDFToImagesParams } from '../converter/index.js';
import { embedImagesIntoPDF } from '../embedder/index.js';
import { cleanupTempFiles, ensureDirectoryExists } from '../utils/index.js';

export interface ProcessPDFConfig {
    outputDir: string;
    convertOptions: ConvertPDFToImagesParams['convertOptions'];
}



export const processSinglePDF = async (inputPDFPath: string, outputPDFPath: string, config: ProcessPDFConfig): Promise<void> => {
    console.log(`\n[+] Starting flatten for: ${path.basename(inputPDFPath)}`);
    await ensureDirectoryExists(config.outputDir);

    const tempDir = path.join(config.outputDir, `temp_${Date.now()}`);
    await ensureDirectoryExists(tempDir);
    const images = await convertPDFToImages({ inputPDFPath, tempDir, convertOptions: config.convertOptions, });

    await embedImagesIntoPDF(images, tempDir, outputPDFPath);
    await cleanupTempFiles(tempDir, images);
};
