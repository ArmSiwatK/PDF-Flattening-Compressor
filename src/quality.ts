import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { type ScalePageTo } from './config/index.js';


const scalePageToOptions = {
    '1': {
        label: 'Smallest',
        value: 1000,
    },
    '2': {
        label: 'Clearer',
        value: 2000,
    },
    '3': {
        label: 'Much Clearer',
        value: 3000,
    },
} as const satisfies Record<string, { label: string; value: ScalePageTo }>;


type ScalePageToOptionKey = keyof typeof scalePageToOptions;


const isScalePageToOptionKey = (value: string): value is ScalePageToOptionKey => {
    return value in scalePageToOptions;
};


export const selectScalePageTo = async (): Promise<ScalePageTo> => {
    const rl = readline.createInterface({ input, output });
    try {
        while (true) {
            console.log('');
            console.log('Select PDF output quality:');
            console.log('  1) Smallest     (scalePageTo 1000) [default]');
            console.log('  2) Clearer      (scalePageTo 2000)');
            console.log('  3) Much Clearer (scalePageTo 3000)');
            console.log('');

            const answer = await rl.question(
                'Type 1, 2, or 3 and press Enter.\n' +
                'Or just press Enter right away for Smallest: '
            );
            const choice = answer.trim() || '1';

            if (isScalePageToOptionKey(choice)) {
                const option = scalePageToOptions[choice];
                console.log(`[+] Quality: ${option.label} (scalePageTo=${option.value})`);
                return option.value;
            }
            console.log('Invalid choice. Please try again.');
        }
    } finally {
        rl.close();
    }
};