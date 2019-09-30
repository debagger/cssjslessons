module.exports = class identifier {
  constructor(ast) {
    this.value = ast.value;
  }
  toString() {
    return `"${this.value}"`;
  }
};
