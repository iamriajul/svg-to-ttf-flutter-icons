const app = require("./src/app.js");
const PKG = require('./package.json');

/**
 * @param {import('commander').Command} program
 */
module.exports = function makeProgram(program) {
    program
        .name(PKG.name)
        .description(PKG.description)
        .version(PKG.version, '-v, --version');

    program
        .command('generate')
        .description('Generate ttf files & dart codes. You should add the ttf file in pubspec.yaml.')
        .option('--input <string>', 'The path of the svg files. This should a directory.', './icons')
        .option('--ttf <string>', 'The output path of the ttf file.', './assets/fonts/AppIcons.ttf')
        .option('--dart <string>', 'The output path of the dart file. the class name will be according the ttf file name, eg: AppIcons.ttf -> AppIcons', './lib/icons/icons.dart')
        .action(async (options, command) => {
            const {input, ttf, dart} = options;
            await app(input, ttf, dart);
        });
};
