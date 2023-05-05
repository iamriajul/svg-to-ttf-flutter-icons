const fs = require('fs');
const path = require("path");
const {getSvgSize, getSvgPathData} = require("./utils");
const {uid} = require("uid");
const parse = require('parse-svg-path');
const scale = require('scale-svg-path');
const serialize = require('serialize-svg-path');

function config(ttf) {
    const name = path.basename(ttf, '.ttf');
    const config = {
        "name": name,
        "css_prefix_text": "",
        "css_use_suffix": false,
        "hinting": true,
        "units_per_em": 1000,
        "ascent": 850,
        "glyphs": []
    };

    const fixedPath = path.resolve(__dirname, '../fixed');
    const files = fs.readdirSync(fixedPath);

    let icons = [];
    let code = 59392;

    for (let file of files) {
        const name = file.split('.')[0];
        const data = fs.readFileSync(`${fixedPath}/${file}`, 'utf8');
        const svgSize = getSvgSize(data);
        const svgPathData = getSvgPathData(data);

        if (svgPathData.length > 10) {
            const pathDataArray = parse(svgPathData);
            const resizedPath = serialize(scale(pathDataArray, 1000 / svgSize));

            icons.push({
                uid: name,
                css: name,
                code: code,
                src: "custom_icons",
                selected: true,
                svg: { path: resizedPath, width: 1000 },
                search: [file],
            });

            code++;
        }
    }

    config.glyphs = icons;

    const configPath = path.resolve(__dirname, '../config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
}

module.exports = config;
