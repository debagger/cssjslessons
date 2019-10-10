module.exports = class _import {
  constructor(ast, context) {
    const styleSheet = require("./stylesheet");
    this.name = ast.value.find(item => item.type == "string_double").value;
    context.stylesheets[this.name] = new styleSheet(this.name, context);
  }
};
