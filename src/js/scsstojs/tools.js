function nodeToString(ast) {
  if (typeof ast.value == "string") {
    if (ast.type == "space" && ast.value == "\n") return "";
    if (ast.type == "comment_singleline") return "";

    return ast.value;
  }
  if (ast.type == "attribute")
    return `[${ast.value.map(nodeToString).join("")}]`;
  return ast.value
    .map(nodeToString)
    .join("")
    .trim();
}

exports.nodeToString = nodeToString;
