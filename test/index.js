const assert = require("assert");
const main = require("../index");

describe("Assertion Tests", () => {
  it("testing....", done => {
    main({})
      .catch(err => {
        if (err.toString().includes("file param must exist & must be of type string")) {
          done();
        } else {
          done(err);
        }
      });
  });
});
