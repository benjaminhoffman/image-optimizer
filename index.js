const getImageHash = require("./utils/get-image-hash");
const isAlreadyCompressed = require("./utils/is-already-compressed");
const generateAssets = require("./utils/generate-assets");

/**
 * Pass in a path and object, it will generate new images in dist folder
 * @param {String} file 
 * @param {Object} options 
 * @return - generates 5 compressed images of various sizes
 */

async function main(file, options) {
  const hash = await getImageHash(file);
  const isCompressed = await isAlreadyCompressed(hash);

  if (!isCompressed) {
    generateAssets(file, hash, options);

  } else {
    // no compression / resize necessary
    console.log(`already compressed - ${file}`);
  }
}

module.exports = main;