module.exports = class _import {
  constructor(ast, global) {
    const styleSheet = require("./stylesheet");
    const names = ast.value
      .filter(item => item.type == "string_double")
      .map(item => item.value);
    names.forEach(item => {
      global.stylesheets[item] = new styleSheet(item, global);
    });
  }
};
