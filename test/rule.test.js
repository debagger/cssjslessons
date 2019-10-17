const assert = require("assert");
const getJSResult = require("./utils/getJSResult");

describe("Rules tests", function() {
  it("correct output for simple rule", function() {
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
  it("work for nested rules", function() {
    const source = `h1 {
      font-size: 32px;
      font-weight: 700;
      color: red;
      .yellow {
        color: yellow;
      }
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
    rule.nested("yellow")(rule => {
      rule.props({
        color: "yellow"
      });
    });
  });
};`;
    assert.equal(result, expected);
  });
});
