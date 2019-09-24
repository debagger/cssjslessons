const assert = require("assert");
const Stylesheet = require("../src/js/scsstojs/stylesheet");

describe("Simple css converter generate test", function() {
  const sourceCss = `
  body {
    color: white;background: black;
  }

  p {
    color: green;
  }`;
  let ast = require("scss-parser").parse(sourceCss);

  this.beforeEach(function() {});

  it("Stylesheet constructor didnt trow", function() {
    assert.doesNotThrow(
      () => (jscss = new Stylesheet(ast)),
      "Stylesheet object constructor trows exception"
    );
  });

  it("Stylesheet toString() method return correct result", function() {
    const jscss = new Stylesheet(ast);
    const result = `
const styleSheet = require("../src/js/ss.js");
const css = new styleSheet();

css.rule("body")
.props({"color": "white"})
.props({"background": "black"})

css.rule("p")
.props({"color": "green"})
`;
    assert.strictEqual(
      jscss.toString(),
      result,
      "Stylesheet toString() didn`t return coorrect output"
    );
  });

  it("Result is valid JS and can evaluate result", function() {
    const jscss = new Stylesheet(ast);
    const result = jscss.toString();
    assert.doesNotThrow(() => eval(result), "Result cant eval");
  });
});
