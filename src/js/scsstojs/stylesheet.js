const { comment_singleline } = require("./comment_singleline");
const { rule } = require("./rule");
const { space } = require("./space");
const { atrule } = require("./atrule");

const fs = require("fs");
const { parse } = require("scss-parser");

exports.Stylesheet = class Stylesheet {
  constructor(rootDirectory, filename) {
    this.rootDirectory = rootDirectory;

    const f = fs.readFileSync(this.rootDirectory + filename, "utf-8");
    const ast = parse(f);

    const types = {
      rule: ast => new rule(ast),
      comment_singleline: ast => new comment_singleline(ast),
      space: ast => new space(ast),
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
    return this.items.map(i => i.toString()).join("");
  }
};
