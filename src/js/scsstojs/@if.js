const space = require("./space");
const _arguments = require("./arguments");
const variable = require("./variable");
const { nodeToString } = require("./tools");

module.exports = class atruleIf {
  constructor(ast) {
    const atrule = require("./atrule");
    const types = {
      atkeyword: ast => {
        this.atkeyword = ast.value;
      },
      space: ast => new space(ast),
      identifier: ast => {
        this.identifier = ast.value;
      },
      arguments: ast => {
        this.arguments = new _arguments(ast);
      },
      block: ast => {
        this.content = ast.value.map(item => {
          const rule = require("./rule");
          const types = {
            rule: ast => new rule(ast),
            comment_singleline: ast => new comment_singleline(ast),
            space: ast => new space(ast),
            atrule: ast => atrule(ast)
          };

          return Object.keys(types).includes(item.type)
            ? types[item.type](item)
            : console.error(
                `Unexpected node type '${item.type}' at line ${item.start.line}`
              );
        });
      },
      punctuation: ast => "",
      variable: ast => {
        this.variable = new variable(ast);
      }
    };

    ast.value.forEach(i =>
      Object.keys(types).includes(i.type)
        ? types[i.type](i)
        : console.error(
            `Unexpected node type '${i.type}' at line ${i.start.line}`
          )
    );
  }

  toString() {
    return `
  if(${this.variable.toString()}){${this.content
      .map(item => item.toString())
      .join("")}})\n`;
  }
};
