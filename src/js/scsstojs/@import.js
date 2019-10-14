const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class _import {
  constructor(ast, context) {
    const styleSheet = require("./stylesheet");
    this.name = ast.value.find(item => item.type == "string_double").value;
    context.stylesheets[this.name] = new styleSheet(this.name, context);
  }

  getAst() {
    return template.statement("require(%%name%%)(css, $, mixin);")({
      name: t.stringLiteral("./" + this.name)
    });
  }

  toString() {
    const ast = this.getAst();
    return generate(ast).code;
  }
};
