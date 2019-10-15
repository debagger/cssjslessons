const assert = require("assert");
const { parse } = require("scss-parser");
const _if = require("../src/js/scsstojs/@if");
const RootContextMock = require("./utils/RootContextMock");
const StyleSheet = require("../src/js/scsstojs/stylesheet");

function getJSResult(sourceCSS) {
  const context = new RootContextMock({
    root: sourceCSS
  });
  const rootStyleSheet = new StyleSheet("root", context);
  const result = rootStyleSheet.toString();
  return result;
}
describe("Simple @if tests", function() {
  it("$var1 or $var2", function() {
    const result = getJSResult(
      `@if $var1 or $var2 { h1, p {font-size: 700; color: red;}}`
    );
    console.log(result);
    const expected = `module.exports = function (css, $, mixin) {
  if (var1 || var2) {
    {
      css.rule("h1")(rule => {
        rule.props({
          font-size: "700"
        });
        rule.props({
          color: "red"
        });
      });
      css.rule("p").extend(css.rule("h1"));
    }
  }
};`;
    assert.equal(expected, result);
  });

  it("$var1 or not $var2", function() {
    const result = getJSResult(`@if $var1 or not $var2 {color: red;}`);
    console.log(result);
    const expected = `module.exports = function (css, $, mixin) {
  if (var1 || !var2) {
    rule.props({
      color: "red"
    });
  }
};`;
    assert.equal(expected, result);
  });

  it("$var1 or not ($var2 and $var3)", function() {
    const result = getJSResult(
      `@if $var1 or not ($var2 and $var3) {color: red;}`
    );
    console.log(result);
    const expected = `module.exports = function (css, $, mixin) {
  if (var1 || !(var2 && var3)) {
    rule.props({
      color: "red"
    });
  }
};`;
    assert.equal(expected, result);
  });

  it(`$var1!="test" or not ($var2 and $var3 > 0)`, function() {
    const result = getJSResult(
      `@if $var1 != "test" or not ($var2 and $var3 >0) {color: red;}`
    );
    console.log(result);
    const expected = `module.exports = function (css, $, mixin) {
  if (var1 != "test" || !(var2 && var3 > 0)) {
    rule.props({
      color: "red"
    });
  }
};`;
    assert.equal(expected, result);
  });

  it(`($var1 + $var2) >= 100 or not ($var2 and $var3 > 0)`, function() {
    const result = getJSResult(
      `@if ($var1 + $var2) >= 100 or not ($var2 and $var3 > 0) {color: red;}`
    );
    console.log(result);
    const expected = `module.exports = function (css, $, mixin) {
  if (var1 + var2 >= 100 || !(var2 && var3 > 0)) {
    rule.props({
      color: "red"
    });
  }
};`;
    assert.equal(expected, result);
  });
});
