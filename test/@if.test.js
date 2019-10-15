const assert = require("assert");
const { parse } = require("scss-parser");
const _if = require("../src/js/scsstojs/@if");
const RootContextMock = require("./utils/RootContextMock");
const StyleSheet = require("../src/js/scsstojs/stylesheet");
describe.only("Simple @if tests", function() {
  it.only("$var1 or $var2", function() {
    const context = new RootContextMock({
      root: `@if $var1 or $var2 {font-size: red;}`
    });
    const rootStyleSheet = new StyleSheet("root", context);
    const result = rootStyleSheet.toString();
    console.log(result);
    const expected = `if (var1 || var2) {rule.props({  font-size: "red"});}`;
    assert.equal(expected, result);
  });

  it("$var1 or not $var2", function() {
    const ast = parse("@if $var1 or not $var2 {color: red;}").value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(`if (var1 || !var2) {rule.props({  color: "red"});}`, result);
  });

  it("$var1 or not ($var2 and $var3)", function() {
    const ast = parse("@if $var1 or not ($var2 and $var3) {color: red;}")
      .value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(
      `if (var1 || !(var2 && var3)) {rule.props({  color: "red"});}`,
      result
    );
  });

  it(`$var1!="test" or not ($var2 and $var3 > 0)`, function() {
    const ast = parse(
      `@if $var1 != "test" or not ($var2 and $var3 >0) {color: red;}`
    ).value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(
      `if (var1 != "test" || !(var2 && var3 > 0)) {rule.props({  color: "red"});}`,
      result
    );
  });

  it(`($var1 + $var2) >= 100 or not ($var2 and $var3 > 0)`, function() {
    const ast = parse(
      `@if ($var1 + $var2) >= 100 or not ($var2 and $var3 > 0) {color: red;}`
    ).value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(
      `if ((var1 + var2) >= 100 || !(var2 && var3 > 0)) {rule.props({  color: "red"});}`,
      result
    );
  });
});
