import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { processSinglePDF, type ProcessPDFConfig } from './processor/index.js';
import { config, type ScalePageTo } from './config/index.js';


const scalePageToOptions = {
    '1': {
        label: 'Smallest',
        value: 1000,
    },
    '2': {
        label: 'Clearer',
        value: 2000,
    },
    '3': {
        label: 'Much Clearer',
        value: 3000,
    },
} as const satisfies Record<string, { label: string; value: ScalePageTo }>;

type ScalePageToOptionKey = keyof typeof scalePageToOptions;


const isScalePageToOptionKey = (value: string): value is ScalePageToOptionKey => {
    return value in scalePageToOptions;
};


const selectScalePageTo = async (): Promise<ScalePageTo> => {
    const rl = readline.createInterface({ input, output });
    try {
        while (true) {
            console.log('');
            console.log('Select PDF output quality:');
            console.log('  1) Smallest     (scalePageTo 1000) [default]');
            console.log('  2) Clearer      (scalePageTo 2000)');
            console.log('  3) Much Clearer (scalePageTo 3000)');
            console.log('');

            const answer = await rl.question('Choose 1, 2, or 3, then press Enter: ');
            const choice = answer.trim() || '1';

            if (isScalePageToOptionKey(choice)) {
                const option = scalePageToOptions[choice];
                console.log(`[+] Quality: ${option.label} (scalePageTo=${option.value})`);
                return option.value;
            }
            console.log('Invalid choice. Please try again.');
        }
    } finally {
        rl.close();
    }
};


const main = async (): Promise<void> => {
    try {
        const scalePageTo = await selectScalePageTo();
        await fs.mkdir(config.inputDir, { recursive: true });
        await fs.rm(config.outputDir, { recursive: true, force: true });
        await fs.mkdir(config.outputDir, { recursive: true });

        const files = await fs.readdir(config.inputDir);
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        if (!pdfFiles.length) throw new Error('No PDF files found in input directory');

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