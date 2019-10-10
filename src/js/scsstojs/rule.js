const { nodeToString } = require("./tools");
const selector = require("./selector");
const block = require("./block");
const Context = require("./ContextBase");
module.exports = class rule {
  constructor(ast, context) {
    this.ast = ast;

    this.context = context;

    const types = {
      selector: ast => {
        this.selector = new selector(ast);
      },
      block: function(ast) {
        this.block = new block(ast, new Context(context, this));
      }.bind(this)
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
      .map(selector => `css.rule("${selector}").extend(css.rule("${first}"));`)
      .join("\n");
    return `
css.rule("${first}")${this.block.toString()}
${otherRules}`;
  }
};
