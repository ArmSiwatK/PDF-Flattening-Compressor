import fs from 'fs/promises';
import { PDFDocument as LibPDFDocument } from 'pdf-lib';
import { Poppler } from 'node-poppler';
import ora from 'ora';
import { ConvertOptions } from '../config';

const poppler = new Poppler();

export interface ConvertPDFToImagesParams {
    inputPDFPath: string;
    tempDir: string;
    convertOptions: ConvertOptions;
}



export const convertPDFToImages = async ({ inputPDFPath, tempDir, convertOptions, }: ConvertPDFToImagesParams): Promise<string[]> => {
    const pdfDoc = await LibPDFDocument.load(await fs.readFile(inputPDFPath));
    const pageCount = pdfDoc.getPageCount();

    const spinner = ora('Converting PDF to high-quality images...').start();
    const start = Date.now();

    await poppler.pdfToCairo(
        inputPDFPath,
        `${tempDir}/${convertOptions.out_prefix}`,
        {
            jpegFile: true,
            firstPageToConvert: 1,
            lastPageToConvert: pageCount,
            scalePageTo: convertOptions.scale,
        }
    );

    spinner.succeed(`Conversion complete in ${((Date.now() - start) / 1000).toFixed(2)}s`);

    const images = (await fs.readdir(tempDir))
        .filter(file => file.endsWith('.jpg'))
        .sort();

    if (!images.length) throw new Error('No images generated from PDF');
    return images;
};
