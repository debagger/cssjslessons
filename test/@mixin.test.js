const assert = require("assert");
const getJSResult = require("./utils/getJSResult");

describe("@mixin", function() {
  it("correct output with no var", function() {
    const scss = `@mixin font-size {
    font-size: 12px;
  }`;

    const expected = `module.exports = function (css, $, mixin) {
  mixin.font_size = () => {
    rule.props({
      "font-size": "12px"
    });
  };
};`;
    const actual = getJSResult(scss);
    console.log(actual);
    assert.equal(actual, expected, "Wrong mixin object output");
  });

  it("correct output with single var", function() {
    const scss = `@mixin font-size($size) {
      font-size: $size;
  }`;
    const expected = `module.exports = function (css, $, mixin) {
  mixin.font_size = size => {
    rule.props({
      "font-size": size
    });
  };
};`;
    const actual = getJSResult(scss);
    console.log(actual);
    assert.equal(actual, expected, "Wrong mixin object output");
  });

  it("correct output with two vars", function() {
    const scss = `@mixin font-size($size, $weight) {
  font-size: $size;
  font-weight: $weight;
}`;
    const expected = `module.exports = function (css, $, mixin) {
  mixin.font_size = (size, weight) => {
    rule.props({
      "font-size": size
    });
    rule.props({
      "font-weight": weight
    });
  };
};`;
    const actual = getJSResult(scss);
    console.log(actual);
    assert.equal(actual, expected, "Wrong mixin object output");
  });

  it("correct output with vars has default values", function() {
    const scss = `@mixin font-size($size, $weight: bold) {
      font-size: $size;
      font-weight: $weight;
    }`;
    const expected = `module.exports = function (css, $, mixin) {
  mixin.font_size = (size, weight = "bold") => {
    rule.props({
      "font-size": size
    });
    rule.props({
      "font-weight": weight
    });
  };
};`;
    const actual = getJSResult(scss);
    console.log(actual);
    assert.equal(actual, expected, "Wrong mixin object output");
  });
});
