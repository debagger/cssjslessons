const { nodeToString } = require("./tools");
const { selector } = require("./selector");
const { block } = require("./block");
exports.rule = class rule {
  constructor(ast, parentRule) {
    this.ast = ast;
    this.parentRule = parentRule;

    const types = {
      selector: ast => {
        this.selector = new selector(ast);
      },
      block: ast => {
        this.block = new block(ast, this);
      }
    };
    ast.value.forEach(i =>
      Object.keys(types).includes(i.type)
        ? types[i.type](i)
        : console.error(
            `Unexpected node type '${i.type}' at line ${i.start.line}`
          )
    );
  }
  toString() {
    const [first, ...other] = this.selector.selectors;
    const otherRules = other
      .map(selector => `css.rule("${selector}").extend("${first}");`)
      .join("\n");
    return `
css.rule("${first}")${this.block.toString()}
${otherRules}`;
  }
};
