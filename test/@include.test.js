const assert = require("assert");
const { parse } = require("scss-parser");
const atrule = require("../src/js/scsstojs/atrule");
describe("@include tests", function() {
  it("@include rfs($fs, $important)", function() {
    const ast = parse("@include rfs($fs, $important);").value[0];
    const incl = atrule(ast);
    console.log(incl);

    assert.equal("rfs(fs, important);", incl.toString());
  });
});
