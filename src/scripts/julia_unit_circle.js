const path = require("path");
const { generateAndWriteTiles } = require("../generator");

const options = {
  shaderPath: path.join(__dirname, "../shaders/julia.js"),
  width: 7680,
  height: 4320,
  circleResolution: 1080,
};

async function main(shader) {
  for (let i = 0; i < options.circleResolution; i++) {
    console.debug(`Frame ${i + 1}/${options.circleResolution}`);
    const theta = (Math.PI * 2) * (i / options.circleResolution);
    console.debug(`\tStep  = ${i / options.circleResolution}`);
    console.debug(`\tTheta = ${theta}`);
    await generateAndWriteTiles(
      shader,
      `julia/${i.toString().padStart(options.circleResolution.toString().length, "0")}`,
      {
        centerX: 0,
        centerY: 0,
        cx: Math.cos(theta),
        cy: Math.sin(theta),
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