module.exports = class Context {
  constructor(parent) {
    this.parent = parent;
    this.vars = {};
    this.mixins = {};
  }
  getChild() {
    return new Context(this);
  }
  findVar(name) {
    if (this.vars[name]) return this.vars[this];
    if (this.parent) return this.parent.findVar(name);
    return undefined;
  }

  findMixin(name) {
    if (this.mixins[name]) return this.mixins[name];
    if (this.parent) return this.findMixin(name);
    return undefined;
  }
};
