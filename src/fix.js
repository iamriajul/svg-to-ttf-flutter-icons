const fs = require('fs');
const path = require("path");
const SVGFixer = require("oslllo-svg-fixer");

async function fix() {
    // Fix all SVG files in the ./icons folder
    const fixedPath = path.resolve(__dirname, '../fixed');
    fs.existsSync(fixedPath) && fs.rmSync(fixedPath, { recursive: true });
    fs.mkdirSync(fixedPath);

    const options = {
        showProgressBar: true,
        throwIfDestinationDoesNotExist: false,
    };

    const inputPath = path.resolve(__dirname, '../icons');
    const fixer = SVGFixer(inputPath, fixedPath, options);
    await fixer.fix();
}

module.exports = fix;
