const comment_singleline = require("./comment_singleline");
const space = require("./space");
const atrule = require("./atrule");
const declaration = require("./declaration");
const comment_multiline = require("./comment_multiline");
const fs = require("fs");
const { parse } = require("scss-parser");
const path = require("path");
//rectal method to read scss
function readFile(root, filename) {
  let fullpath = path.join(root, filename);
  const parsed = path.parse(fullpath);
  parsed.ext = "scss";
  parsed.base = parsed.name + "." + parsed.ext;
  fullpath = path.format(parsed);
  if (fs.existsSync(fullpath)) {
    console.log(fullpath);
    return fs.readFileSync(fullpath, "utf-8");
  }

  parsed.name = "_" + parsed.name;
  parsed.base = parsed.name + "." + parsed.ext;
  fullpath = path.format(parsed);
  if (fs.existsSync(fullpath)) {
    console.log(fullpath);
    return fs.readFileSync(fullpath, "utf-8");
  }
}

module.exports = class Stylesheet {
  constructor(filename, global) {
    const f = readFile(global.rootDirectory, filename);
    const ast = parse(f);
    this.filename = filename;
    const rule = require("./rule");
    const types = {
      rule: ast => new rule(ast),
      comment_singleline: ast => new comment_singleline(ast),
      comment_multiline: ast => new comment_multiline(ast),
      space: ast => new space(ast),
      atrule: ast => atrule(ast, global),
      declaration: ast => new declaration(ast)
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
