const Stylesheet = require("./stylesheet");

module.exports = function(filename, rootDirectory) {
  const global = {
    rootDirectory: rootDirectory,
    stylesheets: {},
    mixins: {},
    functions: {}
  };
  const rootstylesheet = new Stylesheet(filename, global);
  return rootstylesheet;
};
