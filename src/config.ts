import path from 'node:path';
import { fileURLToPath } from 'node:url';

export type ScalePageTo = 1000 | 2000 | 3000;

export interface ConvertOptions {
    outPrefix: string;
    scalePageTo: ScalePageTo;
}

interface Config {
    inputDir: string;
    outputDir: string;
    convertOptions: ConvertOptions;
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../..');

export const config: Config = {
    inputDir: path.resolve(projectRoot, 'input'),
    outputDir: path.resolve(projectRoot, 'output'),
    convertOptions: { outPrefix: 'page', scalePageTo: 1000 }
};