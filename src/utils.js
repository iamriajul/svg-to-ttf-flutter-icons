function getSvgPathData(svgData) {
    return svgData
        .toString()
        .split(">")
        .find((e) => e.startsWith("<path"))
        .split('"')[1];
}

function getSvgSize(svgData) {
    // Find out the width attribute value using RegExp
    const width = svgData
        .toString()
        .split(">")
        .find((e) => e.startsWith("<svg"))
        .match(/width="(\d+)"/)[1];
    return parseInt(width);
}

module.exports = {
    getSvgPathData,
    getSvgSize,
};
