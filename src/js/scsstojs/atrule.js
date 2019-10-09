module.exports = function(ast, context) {
  const atkeyword = ast.value.find(i => i.type == "atkeyword").value;
  const atrules = {
    include: require("./@include"),
    if: require("./@if"),
    import: require("./@import"),
    mixin: require("./@mixin"),
    function: require("./@function"),
    error: require("./@error")
  };
  const atrule = atrules[atkeyword];
  if (atrule) {
    return new atrule(ast, context);
  } else {
    console.error(`Unknown atrule ${atkeyword} at line ${ast.start.line}`);
  }
};
