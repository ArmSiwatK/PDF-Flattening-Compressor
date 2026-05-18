import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Config } from './types.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

export const config: Config = {
    inputDir: path.resolve(projectRoot, 'input'),
    outputDir: path.resolve(projectRoot, 'output'),
    convertOptions: { outPrefix: 'page', scalePageTo: 1000 }
};