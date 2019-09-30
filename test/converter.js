const assert = require("assert");
const converter = require("../src/js/scsstojs/converter");

describe.only("Converter test on bootstrap-reboot", function() {
  it("Test costructor", function() {
    const rootDirectory = "src/bootstrap/scss/";
    const filename = "bootstrap-reboot.scss";

    const conv = converter(filename, rootDirectory);
    assert(conv);
  });
});
