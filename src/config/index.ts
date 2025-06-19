import path from 'path';

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

export const config: Config = {
    inputDir: path.resolve(__dirname, '..', 'input'),
    outputDir: path.resolve(__dirname, '..', 'output'),
    convertOptions: {
        format: 'jpg',
        jpeg_quality: 100,
        out_dir: '',
        out_prefix: 'page',
        poppler_path: path.resolve(__dirname, '..', 'poppler-24.08.0', 'Library', 'bin'),
        scale: 2000,
        anti_aliasing: true,
    },
};
