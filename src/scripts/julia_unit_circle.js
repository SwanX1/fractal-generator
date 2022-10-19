const path = require("path");
const { generateAndWriteTiles } = require("../generator");

const options = {
  shaderPath: path.join(__dirname, "../shaders/julia.js"),
  width: 7680,
  height: 4320,
  circleResolution: 1080,
};

async function main(shader) {
  for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / options.circleResolution) {
    await generateAndWriteTiles(
      shader,
      `julia/${Math.round(i).toString().padStart(options.circleResolution.toString().length, "0")}`,
      {
        centerX: 0,
        centerY: 0,
        cx: Math.cos(i),
        cy: Math.sin(i),
        height: options.height,
        width: options.width,
        scale: 1.3,
        totalTilesX: 1,
        totalTilesY: 1,
      }
    );
  }
}

module.exports = main;
module.exports.options = options;