const assert = require("assert");
const declaration = require("../src/js/scsstojs/declaration");
const { parse } = require("scss-parser");

describe.only("Declarations", function() {
  it("Variable defenition", function() {
    const scss = "$var1: 123;";
    const ast = parse(scss).value[0];
    const decl = new declaration(ast);
    assert.equal(decl.toString(), "const var1 = 123;");
  });
});
