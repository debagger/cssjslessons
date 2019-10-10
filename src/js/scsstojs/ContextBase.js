module.exports = class ContextBase {
  constructor() {
    const vars = {};
    const mixins = {};

    this.addVar = (varName, varObj) => {
      vars[varName] = { name: varName, obj: varObj };
    };
    this.findVar = name => {
      if (vars[name]) return vars[this];
    };

    this.getVars = () => vars.map(item => Object.assign({}, item));

    this.addMixin = (mixinName, mixinObj) => {
      mixins[mixinName] = { name: mixinName, obj: mixinObj };
    };

    this.findMixin = name => {
      if (mixins[name]) return mixins[name];
    };

    this.getMixins = () => mixins.map(item => Object.assign({}, item));
  }
};
