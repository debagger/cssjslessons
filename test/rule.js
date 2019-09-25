const assert = require("assert");
const rule = require("../src/js/scsstojs/rule");
const { nodeToString } = require("../src/js/scsstojs/tools");
const { parse, stringify } = require("scss-parser");
const fs = require("fs");
const styleSheet = require("../src/js/ss.js");
let css = new styleSheet();

describe("Test rules from _reboot.scss", function() {
  const sourceSCSS = fs.readFileSync(
    "./src/bootstrap/scss/_reboot.scss",
    "utf-8"
  );

  const ast = parse(sourceSCSS);

  const rules = ast.value.filter(item => item.type == "rule");
  this.beforeEach(function() {
    css = new styleSheet();
  });
  rules.forEach((item, index) => {
    const selector = nodeToString(
      item.value.find(item => item.type == "selector")
    );
    describe(`CSSRule test for '${selector}' rule`, function() {
      it("constructor", function() {
        assert.doesNotThrow(() => {
          new rule(item);
        });
      });

      it("toString()", function() {
        const newrule = new rule(item);
        assert.doesNotThrow(() => {
          newrule.toString();
        });
      });
      it("Generate valid code", function() {
        const newrule = new rule(item);
        const js = newrule.toString();
        assert.doesNotThrow(() => {
          eval(js);
        }, js);
      });
    });
  });
});
