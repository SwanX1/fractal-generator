const path = require("path");
const { generateAndWriteTiles } = require("../generator");

const options = {
  shaderPath: path.join(__dirname, "../shaders/mandelbrot.js"),
  width: 7680,
  height: 4320,
};

async function main(shader) {
  await generateAndWriteTiles(shader, `mandelbrot`, {
    centerX: -0.7,
    centerY: 0,
    cx: 0, // Not used by mandelbrot
    cy: 0, // Not used by mandelbrot
    height: 122880,
    width: 69120,
    scale: 1.3,
    totalTilesX: 16,
    totalTilesY: 16,
  });
}

module.exports = main;
module.exports.options = options;