const { comment_singleline } = require("./comment_singleline");
const { rule } = require("./rule");
const { space } = require("./space");
const { atrule } = require("./atrule");

exports.Stylesheet = class Stylesheet {
  constructor(ast) {
    const types = {
      rule: ast => new rule(ast),
      comment_singleline: ast => new comment_singleline(ast),
      space: ast => new space(ast),
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
    return this.items
      .map((item, index, arr) => {
        const isLast = arr.length == index - 1;
        if (item instanceof comment_singleline) {
          return item.toString() + "\n";
        }
        if (item instanceof rule) {
          if (!isLast) return item.toString();
          return item.toString() + "\n\n";
        }

        return item.toString();
      })
      .join("");
  }
};
