const comment_singleline = require("./comment_singleline");
const space = require("./space");
const declaration = require("./declaration");
const comment_multiline = require("./comment_multiline");
const { parse } = require("scss-parser");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class Stylesheet {
  constructor(filename, context) {
    const f = context.readFile(filename);
    const ast = parse(f);
    this.filename = filename;
    this.context = context;
    const rule = require("./rule");
    const atrule = require("./atrule");
    const types = {
      rule: ast => new rule(ast, context),
      comment_singleline: ast => new comment_singleline(ast),
      comment_multiline: ast => new comment_multiline(ast),
      atrule: ast => atrule(ast, context),
      declaration: ast => new declaration(ast, context)
    };

    this.items = ast.value
      .filter(item => item.type != "space")
      .map(i =>
        Object.keys(types).includes(i.type)
          ? types[i.type](i)
          : console.error(
              `Unexpected node type '${i.type}' at line ${i.start.line}, '${filename}'`
            )
      );
  }
  getAst() {
    const result = template(
      "module.exports = function (css, $, mixin) { %%body%% }"
    )({
      body: this.items.reduce(
        (result, item) => result.concat(item.getAst()),
        []
      )
    });
    return result;
  }

  toString() {
    return generate(this.getAst()).code;
  }
};
