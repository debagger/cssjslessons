module.exports = class number {
  constructor(ast) {
    this.value = ast.value;
  }
  toString() {
    return this.value;
  }
};
