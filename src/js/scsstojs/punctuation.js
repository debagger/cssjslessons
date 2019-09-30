module.exports = class punctuation {
  constructor(ast) {
    this.value = ast.value;
  }
  toString() {
    return this.value;
  }
};
