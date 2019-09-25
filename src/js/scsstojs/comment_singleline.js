module.exports = class comment_singleline {
  constructor(ast) {
    this.comment = ast.value;
  }
  toString() {
    return `//${this.comment.replace("\n", "")}`;
  }
};
