const fs = require('fs');
const path = require("path");

function copy(input) {
    // Copy all .svg files in the previous folder to the current folder's icons folder.
    // Resolve absolute path to the previous folder.
    const newInputPath = path.resolve(__dirname, '../icons');
    fs.existsSync(newInputPath) && fs.rmSync(newInputPath, { recursive: true });
    fs.mkdirSync(newInputPath);

    const svgFiles = fs.readdirSync(input).filter(file => file.endsWith('.svg'));
    for (const svgFile of svgFiles) {
        // Give a new name to the file.
        // Convert the case to camelCase.
        const newName = svgFile.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        fs.copyFileSync(`${input}/${svgFile}`, `${newInputPath}/${newName}`);
    }
}

module.exports = copy;
