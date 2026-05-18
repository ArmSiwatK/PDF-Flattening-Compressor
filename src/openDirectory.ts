import path from 'node:path';
import { spawn } from 'node:child_process';


export const openDirectory = (dir: string): void => {
    if (process.platform !== 'win32') return;
    const absoluteDir = path.resolve(dir);
    const child = spawn('explorer.exe', [absoluteDir], { detached: true, stdio: 'ignore' });
    child.unref();
};