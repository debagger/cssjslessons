const { nodeToString } = require("./tools");
module.exports = class selector {
  constructor(ast) {
    this.selectors = nodeToString(ast)
      .split(",")
      .map(s => s.trim().replace(/"/g, '\\"'));
  }
};
