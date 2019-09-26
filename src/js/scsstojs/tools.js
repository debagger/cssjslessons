function nodeToString(ast) {
  if (typeof ast.value == "string") {
    if (ast.type == "space" && ast.value == "\n") return "";
    if (ast.type == "comment_singleline") return "";
    if (ast.type == "string_double") return `"${ast.value}"`;

    return ast.value;
  }
  if (ast.type == "attribute")
    return `[${ast.value.map(nodeToString).join("")}]`;

  if (ast.type == "pseudo_class")
    return `:${ast.value.map(nodeToString).join("")}`;

  if (ast.type == "arguments")
    return `(${ast.value.map(nodeToString).join("")})`;

  return ast.value
    .map(nodeToString)
    .join("")
    .trim();
}

exports.nodeToString = nodeToString;
