const assert = require('assert')

const assertions = (file, options) => {
  // assertions
  assert(
    typeof file === "string",
    "file param must exist & must be of type string"
  );
  if (options) {
    assert(
      typeof options === "object",
      "if included, options param must be of type object"
    );
  }
};

module.exports = assertions;