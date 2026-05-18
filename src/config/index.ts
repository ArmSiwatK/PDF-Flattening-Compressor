import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface ConvertOptions {
    format: string;
    jpeg_quality: number;
    out_dir: string;
    out_prefix: string;
    poppler_path: string;
    scale: number;
    anti_aliasing: boolean;
}

export interface Config {
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
    convertOptions: {
        format: 'jpg',
        jpeg_quality: 100,
        out_dir: '',
        out_prefix: 'page',
        poppler_path: path.resolve(projectRoot, 'poppler-24.08.0', 'Library', 'bin'),
        scale: 2000,
        anti_aliasing: true,
    },
};