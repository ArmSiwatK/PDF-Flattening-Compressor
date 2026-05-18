import fs from 'node:fs/promises';
import path from 'node:path';
import { processSinglePDF, type ProcessPDFConfig } from './processor/index.js';
import { config, type ScalePageTo } from './config.js';
import { selectScalePageTo } from './quality.js';


const prepareDirectories = async (): Promise<void> => {
    await fs.mkdir(config.inputDir, { recursive: true });
    await fs.rm(config.outputDir, { recursive: true, force: true });
    await fs.mkdir(config.outputDir, { recursive: true });
};


const getPDFFiles = async (): Promise<string[]> => {
    const files = await fs.readdir(config.inputDir);
    return files.filter(file => path.extname(file).toLowerCase() === '.pdf');
};


const processPDFFile = async (pdfFile: string, scalePageTo: ScalePageTo): Promise<void> => {
    const inputPath = path.join(config.inputDir, pdfFile);
    const outputPath = path.join(config.outputDir, pdfFile);

    const pdfConfig: ProcessPDFConfig = {
        outputDir: config.outputDir,
        convertOptions: { ...config.convertOptions, scalePageTo }
    };
    await processSinglePDF(inputPath, outputPath, pdfConfig);
};


export const processPDFsInInputDir = async (): Promise<void> => {
    await prepareDirectories();

    const pdfFiles = await getPDFFiles();
    if (!pdfFiles.length) throw new Error('No PDF files found in input directory');

    const scalePageTo = await selectScalePageTo();
    await Promise.all(pdfFiles.map(pdfFile => processPDFFile(pdfFile, scalePageTo)));
};