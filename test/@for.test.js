const assert = require("assert");
const getJSResult = require("./utils/getJSResult");

describe("@for tests", function() {
  it("for throght", function() {
    const scss = `@for $i from $var1 through 3 {
    *,   #testid 
    .abc,
    h1 .item-#{$i},
    h2.item-#{$i}  { width: 2em * $i; }
  }`;
    const expected =
      "module.exports = function (css, $, mixin) {\n  for (let i = var1; i <= 3; i++) {\n    {\n      css.rule(`*`)(rule => {\n        rule.props({\n          width: i\n        });\n      });\n      css.rule(`#testid .abc`).extend(css.rule(`*`));\n      css.rule(`h1 .item-${i}`).extend(css.rule(`*`));\n      css.rule(`h2.item-${i}`).extend(css.rule(`*`));\n    }\n  }\n};";
    const result = getJSResult(scss);
    console.log(result);
    assert.equal(result, expected);
  });
});
