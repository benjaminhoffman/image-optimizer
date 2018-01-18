const fs = require("fs");

const MANIFEST_PATH = "./dist/manifest.json";

const updateManifest = hash => {
  const manifest = fs.readFileSync(MANIFEST_PATH, "utf8");
  const manifestJson = JSON.parse(manifest);
  manifestJson[hash] = true;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestJson, null, 2));
};

module.exports = updateManifest;