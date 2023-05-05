const copy = require("./copy");
const fix = require("./fix");
const config = require("./config");
const generate = require("./generate");

async function app(input, ttf, dart) {
    copy(input);
    await fix();
    config(ttf);
    await generate(ttf, dart);
}

module.exports = app;
