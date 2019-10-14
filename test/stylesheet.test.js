const assert = require("assert");
const Stylesheet = require("../src/js/scsstojs/stylesheet");
const RootContextMock = require("./utils/RootContextMock");

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

  it("Nested imports files with mixins and vars", function() {
    const files = {
      root: `@import "vars";
@import "mixins";`,
      vars: `@import "vars2";
$var1: 123;
$var2: 100px;`,
      vars2: `$var3: 123;
$var4: 100px;`,
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
      4,
      "Vars in root context not equals to expected"
    );
  });

  it("Nested imports files with mixins vars and rules use vars", function() {
    const files = {
      root: `@import "vars";
@import "mixins";`,
      vars: `@import "vars2";
$black: black;
$white: white;`,
      vars2: `$var3: 123;
$var4: 100px;`,
      mixins: `@mixin blackandwhite {
    background: black;
    color: white;
}

@mixin whitandblack {
    background: $white;
    color: $black;
}
`,
      rules: `body {
    color: white;
    background: $black;
}`
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
      4,
      "Vars in root context not equals to expected"
    );
  });
});
