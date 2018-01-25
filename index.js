const getImageHash = require("./utils/get-image-hash");
const isAlreadyCompressed = require("./utils/is-already-compressed");
const generateAssets = require("./utils/generate-assets");
const asserts = require("./utils/asserts");
const assets = "./assets/";
const fs = require("fs");

/**
 * Pass in a path and object, it will generate new images in dist folder
 * @param {String} file
 * @param {Object} options
 * @return - generates compressed images of various sizes
 */

async function main(file, options) {
  // checks to ensure params are formatted correctly
  asserts(file, options);
  
  // for asset caching: get sha1 hash of asset (8 char length)
  const hash = await getImageHash(file);

  // check if we've processed this asset already
  const isCompressed = await isAlreadyCompressed(hash);

  if (!isCompressed) {
    generateAssets(file, hash, options);
    return `processed: ${file}`;
  } else {
    return `already processed: ${file}`;
  }
}

fs.readdir(assets, (err, files) => {
  if (err) return err;

  console.log(`processing: ${files}`);

  // get all files in assets dir, then process
  files.forEach(file => {
    main(`./assets/${file}`, { webp: true, toLowerCase: true })
      .then(result => {
        console.log(`${result}`);
      })
      .catch(err => {
        console.log(`called .catch with err: ${err}`);
      });
  });
});

module.exports = main;
