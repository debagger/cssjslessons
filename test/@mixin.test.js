const assert = require("assert");
const mixin = require("../src/js/scsstojs/@mixin");
const { parse } = require("scss-parser");
const RootContextMock = require("./utils/RootContextMock");

describe("@mixin", function() {
  function mixinOutputTest(scss, expected) {
    const ast = parse(scss).value[0];
    const context = new RootContextMock();

    const mix = new mixin(ast, context);

    const actual = mix.toString();
    console.log(actual);
    assert.equal(actual, expected, "Wrong mixin object output");
  }

  it("correct output with no var", function() {
    const scss = `@mixin font-size {
    font-size: 12px;
  }`;
    const expected = `mixin.font_size = () => {
  rule.props({
    "font-size": "12px"
  });
};`;
    mixinOutputTest(scss, expected);
  });

  it("correct output with single var", function() {
    const scss = `@mixin font-size($size) {
      font-size: $size;
  }`;
    const expected = `mixin.font_size = size => {
  rule.props({
    "font-size": size
  });
};`;
    mixinOutputTest(scss, expected);
  });

  it("correct output with two vars", function() {
    const scss = `@mixin font-size($size, $weight) {
  font-size: $size;
  font-weight: $weight;
}`;
    const expected = `mixin.font_size = (size, weight) => {
  rule.props({
    "font-size": size
  });
  rule.props({
    "font-weight": weight
  });
};`;
    mixinOutputTest(scss, expected);
  });

  it("correct output with vars has default values", function() {
    const scss = `@mixin font-size($size, $weight: bold) {
      font-size: $size;
      font-weight: $weight;
    }`;
    const expected = `mixin.font_size = (size, weight = "bold") => {
  rule.props({
    "font-size": size
  });
  rule.props({
    "font-weight": weight
  });
};`;
    mixinOutputTest(scss, expected);
  });
});
