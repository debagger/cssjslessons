const { nodeToString } = require("./tools");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

module.exports = class selector {
  constructor(ast) {
    const selectors = [];
    let currentSelector = [];
    selectors.push(currentSelector);
    for (const item of ast.value) {
      if (item.type == "punctuation" && item.value == ",") {
        currentSelector = [];
        selectors.push(currentSelector);
      } else {
        currentSelector.push(item);
      }
    }
    let [first, ...other] = selectors;
    first = first.filter(
      (item, index) =>
        !(item.type == "space" && [0, first.length - 1].includes(index))
    );

    this.selector = first;
    this.other = other.map(
      item => new selector({ type: "selector", value: item })
    );
  }

  getAst() {
    let currentQuasisValue = { raw: "" };
    const template = t.templateLiteral(
      [t.templateElement(currentQuasisValue)],
      []
    );
    const flat = nodes => {
      let result = [];
      for (const node of nodes) {
        if (node.type == "interpolation") {
          result.push(node);
          continue;
        } else if (Array.isArray(node.value)) {
          if (node.type == "class") result.push(".");
          if (node.type == "id") result.push("#");
          result = result.concat(flat(node.value));
        } else {
          if (node.type == "space") {
            result.push(" ");
          } else {
            result.push(node.value);
          }
        }
      }
      return result;
    };

    for (const item of flat(this.selector)) {
      if (item.type == "interpolation") {
        currentQuasisValue = { raw: "" };
        template.quasis.push(t.templateElement(currentQuasisValue));
        template.expressions.push(t.identifier(nodeToString(item)));
      } else {
        currentQuasisValue.raw = currentQuasisValue.raw + item;
      }
    }
    return template;
  }
};
