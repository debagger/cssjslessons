const { nodeToString } = require("./tools");

exports.property = class property {
  constructor(ast) {
    this.ast = ast;
  }
  toString() {
    return nodeToString(this.ast);
  }
};
