const { nodeToString } = require("./tools");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class _arguments {
  constructor(ast) {
    this.ast = ast;
    this.arguments = [];
    let acc = [];
    for (const item of ast.value) {
      if (item.type == "punctuation") {
        if (acc.length == 1) {
          this.arguments.push(acc[0]);
        } else {
          this.arguments.push(acc);
        }
        acc = [];
      } else if (item.type != "space") {
        acc.push(item);
      }
    }
    if (acc.length == 1) {
      this.arguments.push(acc[0]);
    } else {
      this.arguments.push(acc);
    }
  }

  getAst() {
    return this.arguments.map(item => {
      if (!Array.isArray(item)) {
        if (item.type == "variable") {
          return t.identifier(item.value);
        } else if (item.type == "declaration") {
          const prop = item.value.find(item => item.type == "property");
          const value = nodeToString(
            item.value.find(item => item.type == "value")
          );
          const variable = prop.value.find(item => item.type == "variable");
          return t.assignmentPattern(
            t.identifier(variable.value),
            t.stringLiteral(value)
          );
        } else {
          return t.identifier(nodeToString(item));
        }
      } else {
        throw new Error("Why array is here?");
      }
    });
  }

  toString() {
    return generate(this.getAst).code;
  }
};
