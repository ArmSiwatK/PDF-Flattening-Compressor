import path from 'path';
import { convertPDFToImages, ConvertPDFToImagesParams } from '../converter';
import { embedImagesIntoPDF } from '../embedder';
import { cleanupTempFiles, ensureDirectoryExists } from '../utils';

export interface ProcessPDFConfig {
    outputDir: string;
    convertOptions: ConvertPDFToImagesParams['convertOptions'];
}



export const processSinglePDF = async (inputPDFPath: string, outputPDFPath: string, config: ProcessPDFConfig): Promise<void> => {
    console.log(`\n[+] Starting flatten for: ${path.basename(inputPDFPath)}`);
    await ensureDirectoryExists(config.outputDir);

    const tempDir = path.join(config.outputDir, path.basename(inputPDFPath, '.pdf'));
    await ensureDirectoryExists(tempDir);

    const images = await convertPDFToImages({
        inputPDFPath,
        tempDir,
        convertOptions: config.convertOptions,
    });

    await embedImagesIntoPDF(images, tempDir, outputPDFPath);
    await cleanupTempFiles(tempDir, images);
};
