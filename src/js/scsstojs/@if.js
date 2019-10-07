const space = require("./space");
const _arguments = require("./arguments");
const variable = require("./variable");
const block = require("./block");
const { nodeToString } = require("./tools");

module.exports = class atruleIf {
  constructor(ast) {
    const atrule = require("./atrule");
    const types = {
      atkeyword: function(ast) {
        this.atkeyword = ast.value;
      }.bind(this),
      block: function(ast) {
        const block = require("./block");

        this.block = new block(ast);
        this.content = ast.value.map(item => {
          const rule = require("./rule");
          const declaration = require("./declaration");
          const types = {
            rule: ast => new rule(ast),
            comment_singleline: ast => new comment_singleline(ast),
            space: ast => new space(ast),
            atrule: ast => atrule(ast),
            declaration: ast => new declaration(ast)
          };

          return types[item.type]
            ? types[item.type](item)
            : console.error(
                `Unexpected node type '${item.type}' at line ${item.start.line}`
              );
        });
      }.bind(this)
    };
    this.expression = [];

    for (const item of ast.value) {
      if (types[item.type]) {
        types[item.type](item);
      } else {
        if (this.atkeyword && !this.content) {
          if (item.type != "space") {
            this.expression.push(item);
          }
        }
      }
    }
  }

  expressionToString(expressionArray) {
    let index = 0;
    let result = "";
    while (index < expressionArray.length) {
      const item = expressionArray[index];
      const next = expressionArray[index + 1];
      if (item.type == "operator") {
        if (["+", "*", "/", "%"].includes(item.value)) {
          result += ` ${item.value} `;
        } else if ([">", "<", "=", "!"].includes(item.value)) {
          if (next && next.type == "operator" && next.value == "=") {
            result += ` ${item.value}${next.value} `;
            index++;
          } else {
            result += ` ${item.value} `;
          }
        } else {
          console.error(
            `Unexpected operator ${item.value} at line ${item.start.line}`
          );
        }
      } else if (item.type === "identifier") {
        if (item.value == "or") {
          result += " || ";
        }
        if (item.value == "and") {
          result += " && ";
        }
        if (item.value == "not") {
          result += "!";
        }
      } else if (item.type == "parentheses") {
        result += `(${this.expressionToString(item.value)})`;
      } else if (item.type == "variable") {
        const _var = new variable(item);
        result += _var.toString();
      } else if (item.type == "string_double") {
        result += `"${item.value}"`;
      } else if (item.type == "number") {
        result += item.value;
      } else if (item.type != "space") {
        throw `Unexpected node type '${item.type}' in expression at line ${item.start.line}`;
        // result += nodeToString(item);
      }
      index++;
    }

    return result;
  }

  toString() {
    const expr = this.expressionToString(this.expression);

    const blockstr = this.block.toString();
    return `if(${expr}){css${blockstr}}`;
  }
};
