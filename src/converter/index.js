const fs = require('fs').promises;
const path = require('path');
const { PDFDocument: LibPDFDocument } = require('pdf-lib');
const pdf = require('pdf-poppler');
const ora = require('ora').default;
const config = require('../../config')



const convertPDFToImages = async (inputPDFPath, tempDir) => {
    const pdfDoc = await LibPDFDocument.load(await fs.readFile(inputPDFPath));
    const spinner = ora('Converting PDF to high-quality images in parallel...').start();
    const start = Date.now();

    const baseOpts = { ...config.convertOptions, out_dir: tempDir };
    await Promise.all(generateConversionPromises(inputPDFPath, pdfDoc.getPageCount(), baseOpts));
    spinner.succeed(`High-quality conversion complete in ${((Date.now() - start) / 1000).toFixed(2)}s`);

    const images = (await fs.readdir(tempDir)).sort();
    if (!images.length) throw new Error('No images generated from PDF');
    return images;
};



const generateConversionPromises = (inputPDFPath, pageCount, optsBase) => {
    return Array.from({ length: pageCount }, (_, i) => {
        const pageNum = i + 1;
        const opts = { ...optsBase, page: pageNum };
        return pdf.convert(inputPDFPath, opts);
    });
};



module.exports = { convertPDFToImages, generateConversionPromises };
