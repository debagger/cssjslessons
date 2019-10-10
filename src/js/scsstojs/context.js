const ContextBase = require("./ContextBase");

module.exports = class Context extends ContextBase {
  constructor(parentContext, contextObj) {
    super();
    this.parentContext = parentContext;
    this.contextObj = contextObj;

    this.findVar = name => {
      const result = super.findVar(name);
      if (result) {
        return result;
      } else {
        return this.parentContext.findVar(name);
      }
    };

    this.findMixin = name => {
      const result = super.findMixin(name);
      if (result) {
        return result;
      } else {
        return this.parentContext.findMixin(name);
      }
    };
  }
};
