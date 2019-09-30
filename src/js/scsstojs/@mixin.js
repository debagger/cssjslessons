module.exports = class mixin {
  constructor(ast, global) {
    console.log(ast);
    this.identifier = ast.value.find(item => item.type == "identifier").value;
    global.mixins[this.identifier] = this;
  }
};
