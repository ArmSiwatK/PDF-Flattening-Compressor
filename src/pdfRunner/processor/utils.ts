import fs from 'node:fs/promises';


export const cleanupTempFiles = async (tempDir: string): Promise<void> => {
    await fs.rm(tempDir, { recursive: true, force: true });
    console.log('[+] Cleaned up temporary files.');
};


export const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
    await fs.mkdir(dirPath, { recursive: true });
};