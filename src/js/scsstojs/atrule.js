module.exports = function(ast, global) {
  const atkeyword = ast.value.find(i => i.type == "atkeyword").value;
  const atrules = {
    include: require("./@include"),
    if: require("./@if"),
    import: require("./@import"),
    mixin: require("./@mixin"),
    function: require("./@function")
  };
  const atrule = atrules[atkeyword];
  if (atrule) {
    return new atrule(ast, global);
  } else {
    console.error(`Unknown atrule ${atkeyword} at line ${ast.start.line}`);
  }
};
