const { calculate } = require("./renderer.js");
const { writePNG } = require("./util.js");
const fs = require("fs-extra");
const path = require("path");

/**
 * @typedef RenderOptions
 * @property {number} width
 * @property {number} height
 * @property {number} totalTilesX
 * @property {number} totalTilesY
 * @property {number} cx
 * @property {number} cy
 * @property {number} centerX
 * @property {number} centerY
 * @property {number} scale
 */

/**
 * 
 * @param {*} shader 
 * @param {*} basename 
 * @param {RenderOptions} renderOptions 
 */

module.exports.generateAndWriteTiles = async function generateAndWriteTiles(shader, basename, renderOptions) {
  for (let x = 0; x < renderOptions.totalTilesX; x++) {
    for (let y = 0; y < renderOptions.totalTilesY; y++) {
      /** @type {CalculateOptions} */
      const options = {
        width: renderOptions.width / renderOptions.totalTilesX,
        height: renderOptions.height / renderOptions.totalTilesY,
        tileX: x,
        tileY: y,
        totalTilesX: renderOptions.totalTilesX,
        totalTilesY: renderOptions.totalTilesY,
        cx: renderOptions.cx,
        cy: renderOptions.cy,
        centerX: renderOptions.centerX,
        centerY: renderOptions.centerY,
        scale: renderOptions.scale
      };
      const outFile = path.join(
        "./output/",
        `${
          basename
        }_${
          x.toString().padStart(renderOptions.totalTilesX.toString().length, "0")
        }_${
          y.toString().padStart(renderOptions.totalTilesY.toString().length, "0")
        }.png`
      );

      if (fs.existsSync(outFile)) {
        continue;
      }

      console.debug(`Tile ${x * renderOptions.totalTilesY + y + 1}/${renderOptions.totalTilesX * renderOptions.totalTilesY}`);
      const png = await calculate(shader, options);
      console.debug("\tWriting to file");
      await fs.ensureFile(outFile);
      const file = fs.createWriteStream(outFile);
      await writePNG(png, file);
    }
  }
}