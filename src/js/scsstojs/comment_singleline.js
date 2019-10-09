module.exports = class comment_singleline {
  constructor(ast) {
    this.comment = ast.value;
  }
  getJSAst() {
    return {
      type: "CommentLine",
      value: "Its comment"
    };
  }
  toString() {
    return `//${this.comment.replace("\n", "")}`;
  }
};
