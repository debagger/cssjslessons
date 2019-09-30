const include = require("./@include");
const atruleIf = require("./@if");
const _import = require("./@import");
const mixin = require("./@mixin");
const _function = require("./@function");

module.exports = function(ast, global) {
  const atkeyword = ast.value.find(i => i.type == "atkeyword").value;
  const atrules = {
    include: include,
    if: atruleIf,
    import: _import,
    mixin: mixin,
    function: _function
  };
  if (atrules[atkeyword]) {
    return new atrules[atkeyword](ast, global);
  } else {
    console.error(`Unknown atrule ${atkeyword} at line ${ast.start.line}`);
  }
};
