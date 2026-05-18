import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { convertPDFToImages } from './converter.js';
import { embedImagesIntoPDF } from './embedder.js';
import { cleanupTempFiles, ensureDirectoryExists } from './utils.js';
import type { ProcessPDFConfig } from '../types.js';


export const processSinglePDF = async (inputPDFPath: string, outputPDFPath: string, config: ProcessPDFConfig): Promise<void> => {
    console.log(`\n[+] Starting flatten for: ${path.basename(inputPDFPath)}`);
    await ensureDirectoryExists(config.outputDir);

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-flatten-'));
    try {
        const images = await convertPDFToImages({ inputPDFPath, tempDir, convertOptions: config.convertOptions });
        await embedImagesIntoPDF(images, tempDir, outputPDFPath);
    } finally {
        await cleanupTempFiles(tempDir);
    }
};