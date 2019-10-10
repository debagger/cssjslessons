const declaration = require("./declaration");
const space = require("./space");
const comment_singleline = require("./comment_singleline");
const atrule = require("./atrule");
const Context = require("./context");

module.exports = class block {
  constructor(ast, parentContext) {
    const rule = require("./rule");
    this.context = new Context(parentContext);
    const types = {
      rule: ast => new rule(ast, this.context),
      declaration: ast => new declaration(ast),
      space: ast => new space(ast),
      comment_singleline: ast => new comment_singleline(ast),
      atrule: ast => atrule(ast)
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
    const rule = require("./rule");
    let previtem;
    return this.items
      .filter(item => !(item instanceof space))
      .map((item, i, arr) => {
        const prev = i - 1 >= 0 ? arr[i - 1] : undefined;

        if (item instanceof declaration) {
          let res = "";
          if (prev instanceof rule) res += "\n.parent";
          res += `\n{${item.toString()}}`;
          return res;
        }

        if (item instanceof comment_singleline)
          return prev instanceof comment_singleline
            ? "\n" + item.toString()
            : item.toString();

        if (item instanceof rule) {
          const [firstSelector, ...otherSelectors] = item.selector.selectors;

          return `\n.nest("${firstSelector}")${item.block.toString()}`;
        }
        if (item) return item.toString();
      })
      .join("");
  }
};
