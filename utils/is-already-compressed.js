const fs = require("fs");

/**
 * Accepts either an iamge hash or an array of image hashes
 * Indicates whether an image has been compressed/resized
 * already by iterating over manifest.json file & searching
 * for the image hash.
 * @param {String || [Strings]} imageHash - if you pass it a String,
 *  it will return a boolean; if you pass it an Array, it will
 *  return an array of booleans
 * @return {Boolean || [Booleans]}
 */

 // TO DO get the array version working

const isAlreadyCompressed = imageHash => {
  const manifest = "./dist/manifest.json";
  const json = fs.readFileSync(manifest, "utf8");
  const jsonParsed = JSON.parse(json);

  if (Array.isArray(imageHash)) {
    return imageHash.map(hash => {
      return Boolean(jsonParsed[hash]);
    });
  } else {
    return Boolean(jsonParsed[imageHash]);
  }
};

module.exports = isAlreadyCompressed;
