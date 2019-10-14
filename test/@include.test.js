const assert = require("assert");
const { parse } = require("scss-parser");
const atrule = require("../src/js/scsstojs/atrule");
const RootContextMock = require("./utils/RootContextMock");
describe("@include tests", function() {
  it("@include rfs($fs, $important)", function() {
    const files = {
      root: `@import "mixins";
p {
  font-size: 12px;
  @include redandwhite;
}`,
      mixins: `@mixin redandwhite {
        color: red;
        background: white;
      };`
    };
    const rootContext = new RootContextMock(files);
    const rootStylesheet = new Stylesheet("root", rootContext);

    const result = rootStylesheet.toString();
    console.log(result);
    assert.equal(result, "function");
  });
});
