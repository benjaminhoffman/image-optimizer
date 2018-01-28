const createFileName = (properties = {}, options = {}) => {
  const { hash8, resize, ext } = properties;
  let { fileName } = properties;
  const {
    toLowerCase = false,
    remove2x = false,
    replaceSpaces = false
  } = options;

  // if options.toLowerCase, convert asset file name to all lowercase
  if (toLowerCase) {
    fileName = fileName.toLowerCase();
  }

  // if options.remove2x, remove `@2x` from file name
  if (remove2x && fileName.includes("@2x")) {
    fileName = fileName.replace("@2x", "");
  }

  // if options.replaceSpaces, replace ' ' with another character
  if (replaceSpaces && fileName.includes(" ")) {
    fileName = fileName.replace(/ /g, replaceSpaces);
  }

  return `./dist/${fileName}_${hash8}_${resize}w${ext}`;
};

module.exports = createFileName;
