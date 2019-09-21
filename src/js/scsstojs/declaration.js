const { property } = require("./property");
const { value } = require("./value");

exports.declaration = class declaration {
  constructor(ast) {
    const types = {
      property: ast => (this.property = new property(ast)),
      punctuation: ast => "",
      value: ast => (this.value = new value(ast))
    };
  }
  toString() {
    return `{${this.property.toString()}: ${this.value.toString()}}`;
  }
};
