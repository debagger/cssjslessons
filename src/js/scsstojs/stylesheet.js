const comment_singleline = require("./comment_singleline");
const space = require("./space");
const atrule = require("./atrule");

module.exports = class Stylesheet {
  constructor(ast) {
    const rule = require("./rule");

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
    const rule = require("./rule");

    const items = this.items
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
    return `
const styleSheet = require("../src/js/ss.js");
const css = new styleSheet();
${items}`;
  }
};
