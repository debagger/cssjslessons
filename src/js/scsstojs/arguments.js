const { nodeToString } = require("./tools");
exports._arguments = class _arguments {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return nodeToString(this.ast);
  }
};
