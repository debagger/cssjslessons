const space = require("./space");
const _arguments = require("./arguments");
const variable = require("./variable");
const { nodeToString } = require("./tools");

const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class include {
  constructor(ast) {
    const types = {
      atkeyword: ast => {
        this.atkeyword = ast.value;
      },
      space: ast => new space(ast),
      identifier: ast => {
        this.identifier = ast.value;
      },
      arguments: ast => {
        this.arguments = new _arguments(ast);
      },
      block: ast => {
        this.content = ast;
      },
      punctuation: ast => "",
      variable: ast => new variable(ast)
    };

    ast.value.forEach(item =>
      types[item.type]
        ? types[item.type](item)
        : console.error(
            `Unexpected node type in @include '${item.type}' at line ${item.start.line}`
          )
    );
  }
  getAst() {
    return template("rule.include(mixin[%%identifier%%]);")({
      identifier: t.stringLiteral(this.identifier)
    });
  }

  toString() {
    if (this.arguments)
      return `${this.identifier.toString()}(${this.arguments.toString()});`;
    if (this.variable)
      return `${this.identifier.toString()}(${this.variable.toString()});`;

    return `${this.identifier.toString()}();`;
  }
};
