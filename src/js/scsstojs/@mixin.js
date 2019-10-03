module.exports = class mixin {
  constructor(ast, global) {
    this.identifier = ast.value.find(item => item.type == "identifier").value;
    global.mixins[this.identifier] = this;
  }
};
