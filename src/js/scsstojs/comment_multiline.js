module.exports = class comment_multiline {
  constructor(ast) {
    this.comment = ast.value;
  }
  toString() {
    return `//${this.comment.replace("\n", "")}`;
  }
};
