const assert = require("assert");
const { parse } = require("scss-parser");
const Import = require("../src/js/scsstojs/@import");
const RootContext = require("./utils/RootContextMock");

describe("@import statement", function() {
  it("takes input and return correct JS code", function() {
    const inputAst = parse('@import "imported_file"').value[0];
    const context = new RootContext({ imported_file: "$var1: 123;" });
    const _import = new Import(inputAst, context);
    const result = _import.toString();
    assert.equal(result, 'require("./imported_file")(css, $, mixin);');
  });
});
