const property = require("./property");
const value = require("./value");
const { nodeToString } = require("./tools");
const assert = require("assert");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class declaration {
  constructor(ast) {
    this.property = ast.value.find(item => item.type == "property");
    this.variable = this.property.value.find(item => item.type == "variable");
    this.identifier = this.property.value.find(
      item => item.type == "identifier"
    );
    this.value = ast.value.find(item => item.type == "value");
  }
  ast() {
    if (this.variable) {
      return template("const VAR_NAME = EXPRESSION;")({
        VAR_NAME: t.identifier(this.variable.value.replace(/-/g, "_")),
        EXPRESSION: t.stringLiteral(nodeToString(this.value))
      });
    }
    if (this.identifier) {
      return template("rule.props({IDENTIFIER: EXPRESSION});")({
        IDENTIFIER: t.identifier(this.identifier.value),
        EXPRESSION: t.stringLiteral(nodeToString(this.value))
      });
    }
  }

  toString() {
    const result = generate(this.ast());
    return result.code + "\n";
  }
};
