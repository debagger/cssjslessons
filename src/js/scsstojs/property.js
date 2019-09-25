const { nodeToString } = require("./tools");

module.exports = class property {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return nodeToString(this.ast);
  }
};
