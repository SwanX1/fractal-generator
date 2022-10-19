const path = require("path");
const { generateAndWriteTiles } = require("../generator");

const options = {
  shaderPath: path.join(__dirname, "../shaders/mandelbrot.js"),
  width: 1920,
  height: 1080,
};

async function main(shader) {
  await generateAndWriteTiles(shader, `mandelbrot`, {
    centerX: -0.7,
    centerY: 0,
    cx: 0, // Not used by mandelbrot
    cy: 0, // Not used by mandelbrot
    height: options.height,
    width: options.width,
    scale: 1.3,
    totalTilesX: 1,
    totalTilesY: 1,
  });
}

module.exports = main;
module.exports.options = options;