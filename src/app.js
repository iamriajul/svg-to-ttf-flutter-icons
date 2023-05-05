const copy = require("./copy");
const fix = require("./fix");
const config = require("./config");
const generate = require("./generate");
const fs = require("fs");

async function app(input, ttf, dart) {
    if (!fs.existsSync(input)) {
        throw new Error(`The input path ${input} does not exist.`);
    }

    let ttfDir = ttf.split('/');
    ttfDir.pop();
    ttfDir = ttfDir.join('/');
    if (!fs.existsSync(ttfDir)) {
        fs.mkdirSync(ttfDir, {recursive: true});
    }

    let dartDir = dart.split('/');
    dartDir.pop();
    dartDir = dartDir.join('/');
    if (!fs.existsSync(dartDir)) {
        fs.mkdirSync(dartDir, {recursive: true});
    }

    copy(input);
    await fix();
    config(ttf);
    await generate(ttf, dart);
}

module.exports = app;
