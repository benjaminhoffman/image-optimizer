const fs = require("fs");
const crypto = require("crypto");

/**
 * 
 * @param {String} path - path to file on file system 
 * @return {String} - the sha1 hash of the file
 * 
 * same file with different names ==> same hash
 * same file with different extensions ==> same hash
 * different file with same name ==> different hash
 */

const getImageHash = path =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha1");
    const rs = fs.createReadStream(path);
    rs.on("error", reject);
    rs.on("data", chunk => hash.update(chunk));
    rs.on("end", () => resolve(hash.digest("hex")));
  });

module.exports = getImageHash;
