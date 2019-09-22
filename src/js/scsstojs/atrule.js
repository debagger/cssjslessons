const { space } = require("./space");
const { _arguments } = require("./arguments");
const { variable } = require("./variable");

class include {
  constructor(ast) {
    const types = {
      atkeyword: ast => (this.atkeyword = ast.value),
      space: ast => new space(ast),
      identifier: ast => (this.identifier = ast.value),
      arguments: ast => (this.arguments = new _arguments(ast)),
      block: ast => (this.content = ast),
      punctuation: ast => "",
      variable: ast => new variable(ast)
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
    if (this.arguments)
      return `${this.identifier.toString()}(${this.arguments.toString()})`;
    if (this.variable)
      return `${this.identifier.toString()}(${this.variable.toString()})`;

    return `${this.identifier.toString()}()`;
  }
}

exports.atrule = function(ast) {
  const atkeyword = ast.value.find(i => i.type == "atkeyword").value;
  const atrules = {
    include: new include(ast)
  };

  return atrules[atkeyword];
};
