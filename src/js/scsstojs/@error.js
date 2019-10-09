module.exports = class aterror {
  constructor(ast, context) {
    this.message = ast.value.find(item => item.type == "string_double").value;
  }
  toString() {
    return `console.error("${this.message}")\n`;
  }
};
