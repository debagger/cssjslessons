module.exports = class string_double {
  constructor(ast) {
    this.value = ast.value;
  }
  toString() {
    return `"${this.value}"`;
  }
};
