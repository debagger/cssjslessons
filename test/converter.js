const assert = require("assert");
const converter = require("../src/js/scsstojs/converter");

describe("Converter test on bootstrap-reboot", function() {
  it("Parse _mixin.scss", function() {
    const fs = require("fs");
    const { parse } = require("scss-parser");
    const f = fs.readFileSync("src/bootstrap/scss/_mixins.scss", "utf-8");
    assert.doesNotThrow(() => {
      parse(f);
    });
  });

  it("Test costructor", function() {
    const rootDirectory = "src/bootstrap/scss/";
    const filename = "bootstrap-reboot.scss";

    const conv = converter(filename, rootDirectory);
    assert(conv);
  });

  it("Parse src\bootstrapscssmixins_box-shadow.scss", function() {
    const fs = require("fs");
    const t = fs.readFileSync(
      "src\\bootstrap\\scss\\mixins\\_box-shadow.scss",
      "utf-8"
    );
    const { parse, stringify } = require("scss-parser");
    const ast = parse(t);
    const t2 = stringify(ast);
    assert.equal(t, t2);
  });
});
