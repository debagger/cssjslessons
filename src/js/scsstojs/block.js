const { declaration } = require("./declaration");
const { space } = require("./space");
const { comment_singleline } = require("./comment_singleline");
const { atrule } = require("./atrule");
exports.block = class block {
  constructor(ast) {
    const types = {
      declaration: ast => new declaration(ast),
      space: ast => new space(ast),
      comment_singleline: ast => new comment_singleline(ast),
      atrule: ast => new atrule(ast)
    };
    this.items = ast.value.map(i =>
      Object.keys(types).includes(i.type)
        ? types[i.type](i)
        : console.error(
            `Unexpected node type '${i.type}' at line ${i.start.line}`
          )
    );
  }

  toString() {
    return this.items.map(item => `.props(${item.toString()})`);
  }
};
