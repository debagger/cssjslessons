const Context = require("./context");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class mixin {
  constructor(ast, context) {
    this.identifier = ast.value
      .find(item => item.type == "identifier")
      .value.replace(/-/g, "_");

    const Arguments = require("./arguments");
    const argAst = ast.value.find(item => item.type == "arguments");
    if (argAst) this.arguments = new Arguments(argAst);

    const Block = require("./block");
    const blockAst = ast.value.find(item => item.type == "block");
    this.block = new Block(blockAst, new Context(context, this));

    context.addMixin(this.identifier, this);
  }

  getAst() {
    let paramsAst = [];
    if (this.arguments) paramsAst = this.arguments.getAst();
    const bodyAst = this.block.getAst();

    return template("mixin.%%identifier%% = (%%params%%) => {%%body%%}")({
      identifier: t.identifier(this.identifier),
      params: paramsAst,
      body: bodyAst
    });
  }

  toString() {
    const ast = this.getAst();
    return generate(ast).code;
  }
};
