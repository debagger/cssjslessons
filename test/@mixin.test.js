const assert = require("assert");
const mixin = require("../src/js/scsstojs/@mixin");
const { parse } = require("scss-parser");

describe("@mixin", function() {
  function mixinOutputTest(scss, expected) {
    const ast = parse(scss).value[0];
    const context = {
      mixins: []
    };

    const mix = new mixin(ast, context);

    const actual = mix.toString();
    console.log(actual);
    assert.equal(actual, expected, "Wrong mixin object output");
  }

  it("correct output with no var", function() {
    const scss = `@mixin font-size {
    @include rfs(123);
  }`;
    const expected = `function font_size(){
rfs(123);
}`;
    mixinOutputTest(scss, expected);
  });

  it("correct output with single var", function() {
    const scss = `@mixin font-size($fs) {
    @include rfs($fs);
  }`;
    const expected = `function font_size(fs){
rfs(fs);
}`;
    mixinOutputTest(scss, expected);
  });

  it("correct output with two vars", function() {
    const scss = `@mixin font-size($fs, $important) {
    @include rfs($fs, $important);
}`;
    const expected = `function font_size(fs, important){
rfs(fs, important);
}`;
    mixinOutputTest(scss, expected);
  });

  it("correct output with vars has default values", function() {
    const scss = `@mixin font-size-big($fs, $important: false) {
        @include rfs($fs, $important);
}`;
    const expected = `function font_size_big(fs, important = false){
rfs(fs, important);
}`;
    mixinOutputTest(scss, expected);
  });
});
