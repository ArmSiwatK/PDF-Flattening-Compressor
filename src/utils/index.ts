import fs from 'fs/promises';
import path from 'path';


export const cleanupTempFiles = async (tempDir: string, images: string[]): Promise<void> => {
    for (const file of images) {
        const filePath = path.join(tempDir, file);
        await fs.unlink(filePath);
    }
    await fs.rmdir(tempDir);
    console.log('[+] Cleaned up temporary images.');
};



export const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
    await fs.mkdir(dirPath, { recursive: true });
};
