const { nodeToString } = require("./tools");
const func = require("./function");
const parentheses = require("./parentheses");
const color_hex = require("./color_hex");
const variable = require("./variable");
const number = require("./number");
const space = require("./space");
const operator = require("./operator");
const identifier = require("./identifier");
const string_double = require("./string_double");
const punctuation = require("./punctuation");

module.exports = class value {
  constructor(ast) {
    const types = {
      function: ast => new func(ast),
      parentheses: ast => new parentheses(ast),
      color_hex: ast => new color_hex(ast),
      variable: ast => new variable(ast),
      number: ast => new number(ast),
      operator: ast => new operator(ast),
      identifier: ast => new identifier(ast),
      string_double: ast => new string_double(ast)
    };

    this.items = ast.value
      .filter(item => !["space", "punctuation"].includes(item.type))
      .map(ast =>
        types[ast.type]
          ? types[ast.type](ast)
          : console.error(
              `Unexpected type '${ast.type}' at line ${ast.start.line}`
            )
      );
  }
  toString() {
    if (this.items.length == 2) {
      if (
        this.items[0] instanceof number &&
        this.items[1] instanceof operator
      ) {
        return `"${this.items[0].toString()}${this.items[1].toString()}"`;
      }
    }
    return this.items
      .map(item => (item ? item.toString() : `\n//Unexpected\n`))
      .join(" ");
  }
};
