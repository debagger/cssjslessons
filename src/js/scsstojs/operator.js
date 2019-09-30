module.exports = class operator {
  constructor(ast) {
    this.value = ast.value;
  }
  toString() {
    return this.value;
  }
};
