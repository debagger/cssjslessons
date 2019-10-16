const declaration = require("./declaration");
const space = require("./space");
const comment_singleline = require("./comment_singleline");
const atrule = require("./atrule");

const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class block {
  constructor(ast, context) {
    const rule = require("./rule");

    this.context = context;

    const types = {
      rule: ast => new rule(ast, this.context),
      declaration: ast => new declaration(ast, context),
      comment_singleline: ast => new comment_singleline(ast),
      atrule: ast => atrule(ast, this.context)
    };
    this.items = ast.value
      .filter(item => item.type != "space")
      .map(i =>
        Object.keys(types).includes(i.type)
          ? types[i.type](i)
          : console.error(
              `Unexpected node type '${i.type}' at line ${i.start.line}`
            )
      );
  }

  getAst() {
    const rule = require("./rule");

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

    if (this.context.contextObj && this.context.contextObj instanceof rule) {
      return template("rule => {  %%body%% }")({
        body: [...body]
      }).expression;
    }
    return this.items.map(item => item.getAst());
  }

  toString() {
    return generate(this.getAst());
  }
};
