const variable = require("./variable");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class atruleIf {
  constructor(ast, context) {
    this.context = context;

    const types = {
      atkeyword: function(ast) {
        this.atkeyword = ast.value;
      }.bind(this),
      block: function(ast) {
        const block = require("./block");
        this.block = new block(ast, context);
      }.bind(this)
    };

    if (ast.value.find(item => item.type == "identifier" && item.value == "if"))
      this.identifier = "if";

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

  getAst() {
    if (
      this.atkeyword == "if" ||
      (this.identifier && this.identifier == "if")
    ) {
      const stringExpression = this.expressionToString(this.expression);
      return template(`if(${stringExpression}){%%body%%}`)({
        body: this.block.getAst()
      });
    } else {
      return template(`{%%body%%}`)({
        body: this.block.getAst()
      });
    }
  }

  expressionToString(expressionArray) {
    let index = 0;
    let result = "";
    while (index < expressionArray.length) {
      const item = expressionArray[index];
      const next = expressionArray[index + 1];
      if (item.type == "operator") {
        if (item.value == "==") {
          result += ` ${item.value} `;
        } else if (["+", "*", "/", "%"].includes(item.value)) {
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
    return generate(this.getAst());
  }
};
