export type ScalePageTo = 1000 | 2000 | 3000;

export interface ConvertOptions {
    outPrefix: string;
    scalePageTo: ScalePageTo;
}

export interface Config {
    inputDir: string;
    outputDir: string;
    convertOptions: ConvertOptions;
}

export interface ConvertPDFToImagesParams {
    inputPDFPath: string;
    tempDir: string;
    convertOptions: ConvertOptions;
}

export interface ProcessPDFConfig {
    outputDir: string;
    convertOptions: ConvertOptions;
}