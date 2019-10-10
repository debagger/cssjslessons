const Stylesheet = require("./stylesheet");
const Context = require("./ContextBase");
module.exports = function(filename, rootDirectory) {
  const context = new Context(undefined, undefined);
  const rootstylesheet = new Stylesheet(filename, global);
  return rootstylesheet;
};
