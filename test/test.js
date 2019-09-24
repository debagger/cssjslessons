const assert = require("assert");
const { Stylesheet } = require("../src/js/scsstojs/stylesheet");
const { parse } = require("scss-parser");

for (let index = 0; index < 3; index++) {
  it("Stylesheet object test " + index, () => {
    const css = `
  body {
    color: white;
    background: black;
  }
  
  p {
    color: green;
  }`;
    const result = `
css.rule("body")
.props({"color": "white"})
.props({"background": "black"})

css.rule("p")
.props({"color": "green"})
`;
    const ast = parse(css);
    const jscss = new Stylesheet(ast);
    assert(jscss instanceof Stylesheet, "Stylesheet created");
    assert.equal(jscss.toString(), result);
  });
}
