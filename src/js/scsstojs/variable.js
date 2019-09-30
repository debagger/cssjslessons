module.exports = class variable {
  constructor(ast) {
    this.ast = ast;
    if (typeof ast.value != "string") {
      console.error("Not String", ast.value);
    }
  }
  toString() {
    return this.ast.value.replace(new RegExp("-", "g"), "_");
  }
};
