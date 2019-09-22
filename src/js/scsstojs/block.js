const { declaration } = require("./declaration");
const { space } = require("./space");
const { comment_singleline } = require("./comment_singleline");
const { atrule } = require("./atrule");
let rule;
exports.block = class block {
  constructor(ast, _rule) {
    rule = _rule;
    const types = {
      rule: ast => (this.rule = new rule(ast)),
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
    return this.items
      .filter(item => !(item instanceof space))
      .map(item => {
        if (item instanceof declaration) return `\n.props(${item.toString()})`;
        if (item instanceof atrule) return `\n.props(${item.toString()})`;
        if (item instanceof comment_singleline) return item.toString();
        if (item instanceof rule) return `\n.nested(${item.toString()})`;
      })
      .join("");
  }
};
