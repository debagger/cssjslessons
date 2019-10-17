const RootContextMock = require("./RootContextMock");
const StyleSheet = require("../../src/js/scsstojs/stylesheet");

module.exports = function getJSResult(sourceCSS) {
  const context = new RootContextMock({
    root: sourceCSS
  });
  const rootStyleSheet = new StyleSheet("root", context);
  const result = rootStyleSheet.toString();
  return result;
};
