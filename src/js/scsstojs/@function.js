module.exports = class atfunction {
  constructor(ast, global) {
    this.identifier = ast.value.find(item => item.type == "identifier").value;
    global.functions[this.identifier] = this;
  }
};
