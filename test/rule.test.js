const assert = require("assert");
const Stylesheet = require("../src/js/scsstojs/stylesheet");
const RootContextMock = require("./utils/RootContextMock");

function getJSResult(sourceCSS) {
  const context = new RootContextMock({
    root: sourceCSS
  });
  const rootStyleSheet = new Stylesheet("root", context);
  const result = rootStyleSheet.toString();
  return result;
}
describe("Rules tests", function() {
  it("Correct output for simple rule", function() {
    const source = `h1 {
      font-size: 32px;
      font-weight: 700;
      color: red;
    }`;
    const result = getJSResult(source);
    console.log(result);
    const expected = `module.exports = function (css, $, mixin) {
  css.rule("h1")(rule => {
    rule.props({
      "font-size": "32px"
    });
    rule.props({
      "font-weight": "700"
    });
    rule.props({
      color: "red"
    });
  });
};`;
    assert.equal(result, expected);
  });
});
