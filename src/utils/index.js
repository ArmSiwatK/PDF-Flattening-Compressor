const fs = require('fs').promises;
const path = require('path');



const cleanupTempFiles = async (tempDir, images) => {
    for (const file of images) {
        await fs.unlink(path.join(tempDir, file));
    }
    await fs.rmdir(tempDir);
    console.log('[+] Cleaned up temporary images.');
}



const ensureDirectoryExists = async (dirPath) => {
    await fs.mkdir(dirPath, { recursive: true });
}



module.exports = { cleanupTempFiles, ensureDirectoryExists };
