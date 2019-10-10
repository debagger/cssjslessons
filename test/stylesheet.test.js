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

    assert.equal(
      rootContext.getVars().length,
      2,
      "Vars in root context not equals to expected"
    );
  });

  it("Import file with mixins", function() {
    const files = {
      root: `@import "mixins";`,
      mixins: `@mixin blackandwhite {
    background: black;
    color: white;
}

@mixin whitandblack {
    background: white;
    color: black;
}
`
    };
    const rootContext = new RootContextMock(files);
    const rootStylesheet = new Stylesheet("root", rootContext);
    assert.equal(
      rootContext.getMixins().length,
      2,
      "Mixins in root context not equals to expected"
    );
  });

  it("Import files with mixins and vars", function() {
    const files = {
      root: `@import "vars";
@import "mixins";`,
      vars: `$var1: 123;
$var2: 100px;`,
      mixins: `@mixin blackandwhite {
    background: black;
    color: white;
}

@mixin whitandblack {
    background: white;
    color: black;
}
`
    };
    const rootContext = new RootContextMock(files);
    const rootStylesheet = new Stylesheet("root", rootContext);
    assert.equal(
      rootContext.getMixins().length,
      2,
      "Mixins in root context not equals to expected"
    );

    assert.equal(
      rootContext.getVars().length,
      2,
      "Vars in root context not equals to expected"
    );
  });
});
