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
    const [first, ...other] = this.selector.selectors;
    let result = template("css.rule(%%selector%%)(%%block%%);")({
      selector: t.stringLiteral(first),
      block: this.block.getAst()
    });
    if (other.length > 0) {
      result = t.blockStatement([
        result,
        ...other.map(item =>
          template(
            "css.rule(%%selector%%).extend(css.rule(%%first_selector%%));"
          )({
            selector: t.stringLiteral(item),
            first_selector: t.stringLiteral(first)
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
