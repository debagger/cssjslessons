exports.variable = class variable {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return this.ast.value;
  }
};
