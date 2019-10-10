const assert = require("assert");
const RootContext = require("../src/js/scsstojs/RootContext");
const Stylesheet = require("../src/js/scsstojs/stylesheet");

class RootContextMock extends RootContext {
  constructor(files) {
    super();
    this.files = files;
  }
  readFile(filename) {
    return this.files[filename];
  }
}

describe.only("Stylesheet import tests", function() {
  it("Import file with vars", function() {
    const files = {
      root: `@import "vars"`,
      vars: `$var1: 123;
          $var2: 100px;`
    };
    const rootContext = new RootContextMock(files);
    const rootStylesheet = new Stylesheet("root", rootContext);
  });
});
