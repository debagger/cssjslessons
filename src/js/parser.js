const fs = require("fs");
const f = fs.readFileSync("src/bootstrap/scss/_reboot.scss", "utf-8");

const symbolsParser = require("scss-symbols-parser");

const symbols = symbolsParser.parseSymbols(f);
console.log(symbols);

const { parse } = require("scss-parser");

const ast = parse(f);

const getStr = i => {
  if (typeof i.value == "string") {
    if (i.type == "space" && i.value == "\n") return "";
    return i.value;
  }
  if (i.type == "attribute") return `[${i.value.map(getStr).join("")}]`;
  return i.value.map(getStr).join("");
};

const getSelectors = selectorsAST => {
  const res = getStr(selectorsAST).split(",");
  return res;
};

const getBlock = ast => {
  const res = ast.value
    .filter(i => i.type == "declaration")
    .map(dec => {
      const prop = dec.value.find(i => i.type == "property");
      const val = dec.value.find(i => i.type == "value");
      return `  "${getStr(prop).trim()}": "${getStr(val).trim()}"`;
    });
  return `{
${res.join(",\n")}
}`;
};

const getRule = rule => {
  const selectors = getSelectors(rule.value[0]);
  const [firstSelector, ...otherSelectors] = selectors;

  const block = getBlock(rule.value[1]);
  return `
css.rule(
  "${firstSelector.trim()}", ${block}
)${otherSelectors.map(s => `.extend(css.rule("${s.trim()}"))`).join("\n")};`;
};

const getJStyleSheet = node => {
  const rules = node.value
    .filter(i => i.type == "rule")
    .map(getRule)
    .join("\n");
  return `
const css = new styleSheet();
${rules}
`;
};
console.log(getJStyleSheet(ast));
