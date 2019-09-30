module.exports = class parentheses {
  constructor(ast) {
    const declaration = require("./declaration");
    this.declarations = ast.value
      .filter(item => item.type == "declaration")
      .map(item => new declaration(item));
  }
  toString() {
    return `{${this.declarations.map(item => item.toString()).join(",\n")}}`;
  }
};
