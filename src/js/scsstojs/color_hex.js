module.exports = class color_hex {
  constructor(ast) {
    this.value = ast.value;
  }
  toString() {
    return `"#${this.value}"`;
  }
};
