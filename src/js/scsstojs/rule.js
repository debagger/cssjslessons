const { nodeToString } = require("./tools");
const selector = require("./selector");
const block = require("./block");
const Context = require("./context");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");
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
  getAst() {
    const stylesheet = require("./stylesheet");
    let ruleTemplate = "css.rule(%%selector%%)(%%block%%);";
    let extendRuleTemplate =
      "css.rule(%%selector%%).extend(css.rule(%%first_selector%%));";

    if (this.context.contextObj && this.context.contextObj instanceof rule) {
      ruleTemplate = "rule.nested(%%selector%%)(%%block%%);";
      extendRuleTemplate =
        "rule.nested(%%selector%%).extend(css.rule(%%first_selector%%));";
    }
    const first = this.selector.getAst();
    let result = template(ruleTemplate)({
      selector: first,
      block: this.block.getAst()
    });
    if (this.selector.other.length > 0) {
      result = t.blockStatement([
        result,
        ...this.selector.other.map(item =>
          template(extendRuleTemplate)({
            selector: item.getAst(),
            first_selector: first
          })
        )
      ]);
    }
    return result;
  }
  toString() {
    generate(this.getAst());
  }
};
