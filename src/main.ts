import { processPDFsInInputDir } from './pdfRunner/index.js';
import { config } from './pdfRunner/config.js';
import { openDirectory } from './openDirectory.js';

const main = async (): Promise<void> => {
    try {
        await processPDFsInInputDir();
        console.log('[+] All PDFs processed successfully.');
        openDirectory(config.outputDir);
    } catch (error) {
        console.error('Error:', error);
        process.exitCode = 1;
    }
};

main();