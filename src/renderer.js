const { PNG } = require("pngjs");

/**
 * @typedef CalculateOptions
 * @property {number} width
 * @property {number} height
 * @property {number} tileX
 * @property {number} tileY
 * @property {number} totalTilesX
 * @property {number} totalTilesY
 * @property {number} cx
 * @property {number} cy
 */

/**
 * @param {CalculateOptions} options
 * @returns {Promise<PNG>}
 */
module.exports.calculate = async function calculate(
  shader,
  { width, height, tileX, tileY, totalTilesX, totalTilesY, cx, cy, centerX, centerY, scale }
) {
  console.debug("\tRunning shader");
  /** @type {[number, number, number, number][][]} */
  const output = shader(
    width,
    height,
    tileX,
    tileY,
    totalTilesX,
    totalTilesY,
    cx,
    cy,
    centerX,
    centerY,
    scale
  );

  console.debug("\tCreating PNG file");
  const png = new PNG({
    width,
    height,
    colorType: 6,
    bitDepth: 8,
    inputHasAlpha: true,
  });

  for (let x = 0; x < output.length; x++) {
    for (let y = 0; y < output[x].length; y++) {
      const pixelOffset = (width * x + y) * 4;
      for (let i = 0; i < 4; i++) {
        const offset = pixelOffset + i;
        png.data[offset] = output[x][y][i] * 255;
      }
    }
  }

  return png;
}
