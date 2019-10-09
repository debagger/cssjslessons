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

  it("Parse src/ootstrap/scss/mixins/_box-shadow.scss", function() {
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

describe.only("rfs.scss convert", function() {
  it("Parser roundtrip test", function() {
    const { parse, stringify } = require("scss-parser");
    const fs = require("fs");
    const t = fs.readFileSync(
      "src\\bootstrap\\scss\\vendor\\_rfs.scss",
      "utf-8"
    );
    const ast = parse(t);
    const t2 = stringify(ast);
    assert.equal(t, t2);
  });

  it.only("Test costructor", function(done) {
    const rootDirectory = "src/bootstrap/scss/vendor";
    const filename = "rfs";
    const conv = converter(filename, rootDirectory);
    assert(conv);
    const result = conv.toString();
    console.log(result);
    const { parse } = require("@babel/parser");

    assert.doesNotThrow(() => {
      parse(result);
    }, "Error when converter output parse");
  });
});
