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
    this.block = new Block(blockAst);

    context.mixins[this.identifier] = this;
  }
  toString() {
    return `function ${this.identifier}(${
      this.arguments ? this.arguments.toString() : ""
    }){
${this.block.toString()}
}`;
  }
};
