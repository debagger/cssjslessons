const { nodeToString } = require("./tools");
exports.selector = class selector {
  constructor(ast) {
    this.selectors = nodeToString(ast)
      .split(",")
      .map(s => s.trim());
  }
};
