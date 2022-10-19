/**
 * Writes a PNG object to stream
 * @param {import('pngjs').PNG} png
 * @param {import('stream').Writable} stream
 * @param {boolean | undefined} end End the stream when the PNG has been written.
 * @returns {Promise<void>}
 */
module.exports.writePNG = function writePNG(png, stream, end = true) {
  return new Promise((r) => png.pack().pipe(stream, { end }).on("close", r));
}