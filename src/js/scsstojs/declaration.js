const property = require("./property");
const value = require("./value");
const { nodeToString } = require("./tools");
const assert = require("assert");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class declaration {
  constructor(ast, context) {
    this.property = ast.value.find(item => item.type == "property");
    this.variable = this.property.value.find(item => item.type == "variable");
    this.identifier = this.property.value.find(
      item => item.type == "identifier"
    );
    this.value = ast.value.find(item => item.type == "value");
    if (!((this.variable || this.identifier) && this.value)) {
      throw "Incorrect declaration";
    }

    if (this.variable) context.addVar(this.variable.value, this);
  }
  getAst() {
    if (this.variable) {
      return template("$.%%var_name%% = %%expression%%;")({
        var_name: t.identifier(this.variable.value.replace(/-/g, "_")),
        expression:
          this.value.type == "variable"
            ? t.identifier(this.value.value)
            : t.stringLiteral(nodeToString(this.value))
      });
    }
    if (this.identifier) {
      const variable = this.value.value.find(item => item.type == "variable");

      return template("rule.props({%%identifier%%: %%expression%%});")({
        identifier: this.identifier.value.includes("-")
          ? t.stringLiteral(this.identifier.value)
          : t.identifier(this.identifier.value),
        expression: variable
          ? variable.value
          : t.stringLiteral(nodeToString(this.value))
      });
    }
  }

  toString() {
    const result = generate(this.getAst());
    return result.code;
  }
};
