const fs = require("fs");
const f = fs.readFileSync("src/bootstrap/scss/_reboot.scss", "utf-8");

const { parse } = require("scss-parser");

const ast = parse(f);

const getStruct = (ast, pad) => {
  if (!Array.isArray(ast.value)) return `${pad}${ast.type}: ${ast.value}`;
  const childs = ast.value.map(i => getStruct(i, pad + "  ")).join("\n");
  return `${pad}${ast.type}
${childs}`;
};
fs.writeFileSync("aststruct.txt", getStruct(ast, ""), "utf-8");
// console.log(getStruct(ast, ""));

const getStr = i => {
  if (typeof i.value == "string") {
    if (i.type == "space" && i.value == "\n") return "";
    if (i.type == "comment_singleline") return "";

    return i.value;
  }
  if (i.type == "attribute") return `[${i.value.map(getStr).join("")}]`;
  return i.value
    .map(getStr)
    .join("")
    .trim();
};

const getSelectors = selectorsAST => {
  const res = getStr(selectorsAST).split(",");
  return res;
};

const getBlock = ast => {
  const declarations = ast.value.filter(i => i.type == "declaration");
  const props = declarations
    .map(i => {
      const prop = i.value.filter(j => j.type == "property")[0];
      const val = i.value.filter(j => j.type == "value")[0];
      return `    "${getStr(prop)}": "${getStr(val)}"`;
    })
    .join(",\n");
  return `{
${props}
}`;
};

const rule = ast => {
  const selectorNode = ast.value.filter(i => i.type == "selector")[0];
  const blockNode = ast.value.filter(i => i.type == "block")[0];
  const block = getBlock(blockNode);

  const [firstSelector, ...otherSelectors] = getSelectors(selectorNode);
  const extenders = otherSelectors
    .map(
      i => `css.rule('${i.trim()}').extend(css.rule('${firstSelector}'));
`
    )
    .join("");
  const result = `css.rule(
  '${firstSelector}', ${block});
${extenders}`;
  return result;
};

const generate = ast => {
  const types = {
    comment_singleline: ast => {
      return `\\\\${ast.value}`;
    },
    rule: rule
  };
  const result = ast.value
    .filter(ast => Object.keys(types).includes(ast.type))
    .map(ast => types[ast.type](ast))
    .join("\n");
  return result;
};

const result = generate(ast);
console.log(result);
