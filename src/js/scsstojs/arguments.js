const { nodeToString } = require("./tools");
module.exports = class _arguments {
  constructor(ast) {
    this.ast = ast;
    this.arguments = [];
    let acc = [];
    for (const item of ast.value) {
      if (item.type == "punctuation") {
        this.arguments.push(acc);
        acc = [];
      } else if (item.type != "space") {
        acc.push(item);
      }
    }
    this.arguments.push(acc);
  }
  toString() {
    return this.arguments
      .map(arg =>
        arg
          .map(item => {
            if (item.type == "declaration") {
              const prop = nodeToString(
                item.value.find(item => item.type == "property")
              );
              const value = nodeToString(
                item.value.find(item => item.type == "value")
              );
              return `${prop} = ${value}`;
            }
            return nodeToString(item);
          })
          .join("")
      )
      .join(", ");
  }
};
