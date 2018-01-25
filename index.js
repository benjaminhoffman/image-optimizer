const getImageHash = require("./utils/get-image-hash");
const isAlreadyCompressed = require("./utils/is-already-compressed");
const generateAssets = require("./utils/generate-assets");
const assert = require('assert')

/**
 * Pass in a path and object, it will generate new images in dist folder
 * @param {String} file
 * @param {Object} options
 * @return - generates 5 compressed images of various sizes
 */

async function main(file, options) {
  // assertions
  assert(typeof file === 'String', 'file param must exist & must be of type string')
  if (options) {
    assert(typeof options === 'Object', 'if included, options param must be of type object' )
  }
  const hash = await getImageHash(file);
  const isCompressed = await isAlreadyCompressed(hash);

  if (!isCompressed) {
    generateAssets(file, hash, options);
  } else {
    // no compression / resize necessary
    console.log(`already compressed - ${file}`);
  }
}

// main("./carepro_conversation_i.jpg", { webp: true, toLowerCase: true });
main("./carepro_conversation_ii.jpg", { webp: true, toLowerCase: true });
main("./the_barrys.jpg", { webp: true, toLowerCase: true });
main("./the_cohns.jpg", { webp: true, toLowerCase: true });
main("./the_cubas.jpg", { webp: true, toLowerCase: true });
main("./the_houstons.jpg", { webp: true, toLowerCase: true });
main("./honor_training.jpg", { webp: true, toLowerCase: true });

module.exports = main;
