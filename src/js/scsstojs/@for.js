const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");
const { nodeToString } = require("./tools");
module.exports = class atruleFor {
  constructor(ast, context) {
    const block = require("./block");
    const iter = ast.value
      .filter(item => item.type != "space")
      [Symbol.iterator]();

    this.atkeyword = iter.next().value.value;
    this.varName = iter.next().value.value;
    if (iter.next().value.value != "from")
      throw new Error("Identifier 'from' not found");
    this.from = iter.next().value;

    this.comparer = iter.next().value.value;
    this.to = iter.next().value;
    this.block = new block(iter.next().value, context);
  }

  getAst() {
    const numOrVar = node => {
      return node.type == "variable"
        ? t.identifier(node.value)
        : node.type == "number"
        ? t.numericLiteral(Number(node.value))
        : t.stringLiteral(nodeToString(node));
    };

    const i = t.identifier(this.varName);

    const init = t.variableDeclaration("let", [
      t.variableDeclarator(i, numOrVar(this.from))
    ]);

    const comparer = { through: "<=", to: "<" };
    const test = t.binaryExpression(
      comparer[this.comparer],
      i,
      numOrVar(this.to)
    );

    const update = t.updateExpression("++", i);

    const result = t.forStatement(
      init,
      test,
      update,
      t.blockStatement(this.block.getAst())
    );
    return result;
  }
};
