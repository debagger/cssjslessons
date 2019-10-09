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

describe("rfs.scss convert", function() {
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

  it("Test costructor", function(done) {
    const rootDirectory = "src/bootstrap/scss/vendor";
    const filename = "rfs";

    const conv = converter(filename, rootDirectory);
    assert(conv);
    const result = conv.toString();
    console.log(result);
    const { LintStream } = require("jslint");
    const l = new LintStream({
      edition: "latest",
      length: 100,
      es6: true
    });
    l.write({ file: "test.js", body: result });
    l.on("data", function(chunk, encoding, callback) {
      // chunk is an object
      // chunk.file is whatever you supplied to write (see above)
      //assert.deepEqual(chunk.file, fileName);
      // chunk.linted is an object holding the result from running JSLint
      // chunk.linted.ok is the boolean return code from JSLINT()
      if (chunk.linted.errors.length > 0) console.table(chunk.linted.errors);
      assert.equal(chunk.linted.errors.length, 0, "Has errors");

      // is the array of errors, etc.
      // see JSLINT for the complete contents of the object

      done();
    });
  });
});
