const { nodeToString } = require("./tools");
exports.value = class value {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return nodeToString(this.ast);
  }
};
