const assert = require("assert");
const { parse } = require("scss-parser");
const _if = require("../src/js/scsstojs/@if");

describe.only("Simple @if tests", function() {
  it("$var1 or $var2", function() {
    const ast = parse("@if $var1 or $var2 {color: red;}").value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(`if(var1 || var2){css.props({"color": "red"})}`, result);
  });

  it("$var1 or not $var2", function() {
    const ast = parse("@if $var1 or not $var2 {color: red;}").value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(`if(var1 || !var2){css.props({"color": "red"})}`, result);
  });

  it("$var1 or not ($var2 and $var3)", function() {
    const ast = parse("@if $var1 or not ($var2 and $var3) {color: red;}")
      .value[0];
    const newif = new _if(ast);
    const result = newif.toString().replace(/\n/g, "");
    assert.equal(
      `if(var1 || !(var2 && var3)){css.props({"color": "red"})}`,
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
      `if(var1 != "test" || !(var2 && var3 > 0)){css.props({"color": "red"})}`,
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
      `if((var1 + var2) >= 100 || !(var2 && var3 > 0)){css.props({"color": "red"})}`,
      result
    );
  });
});
