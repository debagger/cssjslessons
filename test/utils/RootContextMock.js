const RootContext = require("../../src/js/scsstojs/RootContext");

module.exports = class RootContextMock extends RootContext {
  constructor(files) {
    super();
    this.files = files;
  }
  readFile(filename) {
    return this.files[filename];
  }
};
