import fs from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument as LibPDFDocument } from 'pdf-lib';
import { Poppler } from 'node-poppler';
import ora from 'ora';
import { type ConvertOptions } from '../config.js';

const poppler = new Poppler();

export interface ConvertPDFToImagesParams {
    inputPDFPath: string;
    tempDir: string;
    convertOptions: ConvertOptions;
}


const getPDFPageCount = async (inputPDFPath: string): Promise<number> => {
    const pdfBytes = await fs.readFile(inputPDFPath);
    const pdfDoc = await LibPDFDocument.load(pdfBytes);
    return pdfDoc.getPageCount();
};


const convertWithPoppler = async (inputPDFPath: string, tempDir: string, pageCount: number, convertOptions: ConvertOptions): Promise<void> => {
    const options = {
        jpegFile: true,
        firstPageToConvert: 1,
        lastPageToConvert: pageCount,
        scalePageTo: convertOptions.scalePageTo
    }
    await poppler.pdfToCairo(inputPDFPath, path.join(tempDir, convertOptions.outPrefix), options);
};


const getGeneratedImages = async (tempDir: string): Promise<string[]> => {
    const images = (await fs.readdir(tempDir))
        .filter(file => file.endsWith('.jpg'))
        .sort();
    if (!images.length) throw new Error('No images generated from PDF');
    return images;
};


export const convertPDFToImages = async ({ inputPDFPath, tempDir, convertOptions }: ConvertPDFToImagesParams): Promise<string[]> => {
    const pageCount = await getPDFPageCount(inputPDFPath);
    const spinner = ora('Converting PDF to high-quality images...').start();
    const start = Date.now();
    try {
        await convertWithPoppler(inputPDFPath, tempDir, pageCount, convertOptions);
        spinner.succeed(`Conversion complete in ${((Date.now() - start) / 1000).toFixed(2)}s`);
        return await getGeneratedImages(tempDir);
    } catch (error) {
        spinner.fail('PDF conversion failed.');
        throw error;
    }
};