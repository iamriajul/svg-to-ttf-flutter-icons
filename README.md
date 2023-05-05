# svg-to-ttf-flutter-icons

The `svg-to-ttf-flutter-icons` utility is a command line tool that generates TTF (TrueType font) files and Dart code to create a font class for use in Flutter applications. This tool is designed to simplify the process of creating custom icon fonts for use in your Flutter apps.

## Installation

To install `svg-to-ttf-flutter-icons`, run the following command:
`npm install -g svg-to-ttf-flutter-icons`

## Usage

Once installed, you can use `svg-to-ttf-flutter-icons` by running the following command:

`svg-to-ttf-flutter-icons generate --input=./icons --ttf=./assets/fonts/AppIcons.ttf --dart=./lib/icons/icons.dart`
#### Or simply: `svg-to-ttf-flutter-icons generate` 
If you have the icons folder in the root of your project and want to generate the font in the assets/fonts folder and the dart file in the lib/icons folder.


This command will generate a TTF file and a Dart code file in the specified output locations based on the SVG files in the input directory. The generated class name will match the name of the TTF file (without the `.ttf` extension).

## Options

The following options are available when running the `generate` command:

* `--input`: The path of the directory containing the SVG files to use as input. Default: `./icons`.
* `--ttf`: The path of the output TTF file to generate. Default: `./assets/fonts/AppIcons.ttf`.
* `--dart`: The path of the output Dart code file to generate. Default: `./lib/icons/icons.dart`.

## Example

Here's an example of how you might use `svg-to-ttf-flutter-icons` in a Flutter app:

```dart
import 'package:flutter/material.dart';
import 'package:my_app/icons/icons.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(AppIcons.myIcon),
      onPressed: () => print('Button pressed!'),
    );
  }
}
```
In this example, the `AppIcons` class is generated by `svg-to-ttf-flutter-icons` and contains a static constant for each icon in the font. You can use these constants to create `Icon` widgets throughout your app.

## License
`svg-to-ttf-flutter-icons` is licensed under the MIT License. See the LICENSE file for more information.
