const { property } = require("./property");
const { value } = require("./value");

exports.declaration = class declaration {
  constructor(ast) {
    const types = {
      property: ast => (this.property = new property(ast)),
      punctuation: ast => "",
      value: ast => (this.value = new value(ast))
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
    if (this.rule) return this.rule.toString();
    return `{"${this.property.toString()}": "${this.value.toString()}"}`;
  }
};
