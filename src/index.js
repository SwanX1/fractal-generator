const fs = require("fs-extra");
const { GPU } = require("gpu.js");
const path = require("path");

const script = process.argv[2];
let main;
try {
  main = require(path.join(__dirname, "./scripts/", script + ".js"));
} catch (e) {
  console.error("Couldn't load script " + script);
  console.error(e);
  process.exit(0);
}

void async function exec() {
  console.debug("Creating GPU");
  console.debug(GPU.isGPUSupported ? "GPU is supported" : "GPU is not supported");
  const gpu = new GPU();
  console.debug("Creating kernel");
  const shader = gpu
    .createKernel(new Function(
      "$width",
      "$height",
      "$tileX",
      "$tileY",
      "$totalTilesX",
      "$totalTilesY",
      "$cx",
      "$cy",
      "$centerX",
      "$centerY",
      "$scale",
      fs.readFileSync(main.options.shaderPath).toString()
    ))
    .setOutput([main.options.width, main.options.height]);
    
  await main(shader);

  console.debug("Destroying kernel");
  shader.destroy(true);
  console.debug("Destroying GPU instance");
  await gpu.destroy();
  console.debug("Destroyed GPU instance");
}();
