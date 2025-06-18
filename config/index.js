const path = require('path');

module.exports = {
    inputDir: path.resolve(__dirname, '..', 'input'),
    outputDir: path.resolve(__dirname, '..', 'output'),
    convertOptions: {
        format: 'jpeg',
        jpeg_quality: 75,
        out_prefix: 'page',
        poppler_path: path.resolve(__dirname, '..', 'poppler-24.08.0', 'Library', 'bin'),
        scale: 2000,
        anti_aliasing: true
    },
};
