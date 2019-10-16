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
    const body = {
      *[Symbol.iterator]() {
        const _if = require("./@if");
        let currentIfAst;
        for (const item of this.items) {
          if (item instanceof _if) {
            if (item.atkeyword == "if") {
              const ifAst = item.getAst();
              currentIfAst = ifAst;
              yield ifAst;
            } else {
              const ast = item.getAst();
              currentIfAst.alternate = ast;
              currentIfAst = ast;
            }
          } else {
            yield item.getAst();
          }
        }
      },
      items: this.items
    };

    const result = template(
      "module.exports = function (css, $, mixin) { %%body%% }"
    )({
      body: [...body]
    });
    return result;
  }

  toString() {
    return generate(this.getAst()).code;
  }
};
