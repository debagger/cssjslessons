const { nodeToString } = require("./tools");
module.exports = class value {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return nodeToString(this.ast);
  }
};
