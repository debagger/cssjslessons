const parentheses = require("./parentheses");
const variable = require("./variable");
const string_double = require("./string_double");
module.exports = class _function {
  constructor(ast) {
    this.ast = ast;
    this.identifier = ast.value.find(item => item.type == "identifier").value;
    const _arguments = ast.value.find(item => item.type == "arguments").value;
    const types = {
      parentheses: ast => new parentheses(ast),
      variable: ast => new variable(ast),
      string_double: ast => new string_double(ast)
    };
    this.arguments = _arguments
      .map(item => (types[item.type] ? types[item.type](item) : undefined))
      .filter(item => !!item);
  }
  toString() {
    if (this.identifier == "map-get") {
      return `${this.arguments[0].toString()}[${this.arguments[1].toString()}]`;
    }
    if (this.identifier == "map-merge") {
      return `Object.assign(${this.arguments
        .map(item => item.toString())
        .join(", ")})\n`;
    }
    return `${this.identifier}(${this.arguments
      .map(item => item.toString())
      .join(", ")})`;
  }
};
