const { nodeToString } = require("./tools");
module.exports = class _arguments {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return nodeToString(this.ast);
  }
};
