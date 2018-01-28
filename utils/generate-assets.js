const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const updateManifest = require("./update-manifest");
const createFileName = require("./create-file-name");

// determines how many resized versions of the image we want
// for example, a value of 5 will generate:
// original, half, third, fourth, and fifth of the size
const RESIZE_COUNT = 2;

/**
 * Generates new assets based on the original
 * @param {String} file - path to asset file
 * @param {String} hash - sha1 hash of the asset file
 * @param {Object} options - handful of options to control settings
 * @returns outputs files into dist folder with the following format:
 *  fileName_hash8_pixelWidth.extension
 */

const generateAssets = (file, hash, options = {}) => {
  const image = sharp(file);
  const ext = path.extname(file);
  const fileName = path.basename(file, ext);
  const hash8 = hash.substr(0, 8);

  image
    .metadata() // gets metadata of image
    .then(metadata => {
      const width = metadata.width;

      for (let i = 1; i <= RESIZE_COUNT; i++) {
        const resize = Math.round(width / i);

        const toFile = createFileName(
          { fileName, resize, hash8, ext },
          options
        );

        // will generate new, compressed sizes of original file
        image
          .clone() // make a duplicate of original
          // .withoutEnlargement()  // prevent enlargement of original (see README.md TODO)
          .resize(resize) // resize original
          .toFile(toFile, err => {
            if (err) console.log("asset err", err);
          });

        // generate webp versions
        if (options.webp) {
          const toFileWebp = createFileName(
            { fileName, resize, hash8, ext: ".webp" },
            options
          );

          // will generate new, compressed webp sizes of original file
          image
            .clone() // make a duplicate of original
            .resize(resize) // resize original
            .webp() // convert MIME type
            .toFile(toFileWebp, err => {
              if (err) console.log("webp asset err", err);
            });
        }
      }
      // TODO: even if above errors out,
      // this will set the file as already compressed/resized
      // we need to decide at what point in the process we
      // want to mark this as complete in the manifest
      updateManifest(hash);
    })
    .catch(err => {
      console.log("Catch Err", err);
    });
};

module.exports = generateAssets;
