const {exec} = require("child_process");
const fs = require('fs');
const path = require("path");

async function generate(ttf, dart) {
    console.log('Generating icons (TTF, and Dart Files)...');

    const rootPath = path.resolve(__dirname, '../');

    fs.existsSync(`${rootPath}/.fontello-session`) && fs.unlinkSync(`${rootPath}/.fontello-session`);

    // Remove folders starts with 'flutter-icons'.
    const fontelloOutput = 'flutter-icons';
    const fontelloFolders = fs.readdirSync(rootPath).filter(file => file.startsWith(fontelloOutput));
    for (const fontelloFolder of fontelloFolders) {
        fs.rmSync(`${rootPath}/${fontelloFolder}`, { recursive: true });
    }

    // Create fontello font
    // Run the fontello-cli command to create the font.
    // Exec fontello-cli from node_modules.
    const previousCwd = process.cwd();
    process.chdir(rootPath);
    exec(`node ${rootPath}/node_modules/fontello-cli/bin/fontello-cli install --host https://www.fluttericon.com/`, (err, stdout, stderr) => {
        process.chdir(previousCwd);
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);

        // Find the fontello folder and rename it to fontello.
        const fontelloFolder = fs.readdirSync(rootPath).find(file => file.startsWith(fontelloOutput));
        if (fontelloFolder) {
            fs.renameSync(`${rootPath}/${fontelloFolder}`, `${rootPath}/${fontelloOutput}`);
        }

        // Copy fonts folder to the assets folder.
        const fonts = fs.readdirSync(`${rootPath}/${fontelloOutput}/fonts`);
        for (const font of fonts) {
            fs.copyFileSync(`${rootPath}/${fontelloOutput}/fonts/${font}`, ttf);
        }

        const dartFiles = fs.readdirSync(`${rootPath}/${fontelloOutput}`)
            .filter(file => file.endsWith('.dart'));
        for (const dartFile of dartFiles) {
            let newFileName = dartFile;
            if (newFileName === 'app_icons_icons.dart') {
                newFileName = 'icons.dart';
            }
            fs.copyFileSync(`${rootPath}/${fontelloOutput}/${dartFile}`, dart);
        }

        console.log('Done!');
    });
}

module.exports = generate;
