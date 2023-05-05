const app = require("./src/app.js");

const { program } = require('commander');

program
  .name('svg-to-ttf-flutter-icons')
  .description('The program will ttf files & dart codes, and generate a font class.')
  .version('1.0.0');

program
    .command('generate')
    .description('Generate ttf files & dart codes. You should add the ttf file in pubspec.yaml.')
    .option('--input', 'The path of the svg files. This should a directory.', './icons')
    .option('--ttf', 'The output path of the ttf file.', './assets/fonts/AppIcons.ttf')
    .option('--dart', 'The output path of the dart file. the class name will be according the ttf file name, eg: AppIcons.ttf -> AppIcons', './lib/icons/icons.dart')
    .action(async (options) => {
        const {input, ttf, dart} = options;
        await app(input, ttf, dart);
    });

program.parse();
