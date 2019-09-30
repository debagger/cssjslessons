const { nodeToString } = require("./tools");
const variable = require("./variable");
const identifier = require("./identifier");
const string_double = require("./string_double");
const number = require("./number");
const operator = require("./operator");

module.exports = class property {
  constructor(ast) {
    this.ast = ast;
    const value = ast.value[0];
    if (value.type == "variable") {
      this.variable = new variable(value);
    } else if (value.type == "identifier") {
      this.identifier = new identifier(value);
    } else if (value.type == "string_double") {
      this.string_double = new string_double(value);
    } else if (value.type == "number") {
      this.number = new number(value);
    } else if (
      ast.value[0].type == "operator" &&
      ast.value[1].type == "identifier"
    ) {
      this.identifierwithOp = ast.value[0].value + ast.value[1].value;
    } else {
      console.error(
        `Unexpected node type '${value.type}' at line ${value.start.line}`
      );
    }
  }
  toString() {
    if (this.identifierwithOp) return `"${this.identifierwithOp}"`;
    if (this.variable) return this.variable.toString();
    if (this.identifier) return this.identifier.toString();
    if (this.string_double) return this.string_double.toString();
    if (this.number) return this.number.toString();
    return nodeToString(this.ast);
  }
};
