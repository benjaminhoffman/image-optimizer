const getImageHash = require("./utils/get-image-hash");
const isAlreadyCompressed = require("./utils/is-already-compressed");
const generateAssets = require("./utils/generate-assets");
const asserts = require("./utils/asserts");
const assetsDir = "./assets/";
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

fs.readdir(assetsDir, (err, files) => {
  if (err) return err;

  // only process images (skip .gitkeep, non media, etc)
  files = files.filter(file => file.search(/(png|jpe?g|webp)/g) > 0);

  // console.log(`processing: ${files}`);

  // get all files in assets dir, then process
  files.forEach(file => {
    main(`${assetsDir}${file}`, {
      webp: true, // also create webp versions
      toLowerCase: true, // convert file names to all lower case
      remove2x: true, // remove `@2x` from file name (sketch feature)
      replaceSpaces: "_" // use `_` instead of spaces
    })
      .then(result => {
        // console.log(`${result}`);
      })
      .catch(err => {
        console.log(`called .catch with err: ${err}`);
      });
  });
});

module.exports = main;
