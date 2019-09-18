import CSSRule from "./rule.js";
function getCssRuleStr(selector, bodyObj) {
  return `${selector} {\n${getBodyStr(bodyObj)}\n}`;
}

function getBodyStr(bodyObj) {
  return Object.entries(bodyObj)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}
/**
 * Root class for StyleSheet generate
 */
export default class styleSheet {
  constructor() {
    this.rules = [];
  }

  rule(selector, properties) {
    let rule = this.rules.find(r => r.selector == selector);
    if (!rule) {
      rule = new CSSRule(selector);
      this.rules.push(rule);
    }
    if (properties) rule.props(properties);
    return rule;
  }

  css() {
    return this.rules.join("\n\n");
  }

  attach() {
    const styleEl = document.createElement("style");
    styleEl.textContent = this.css();
    const myStyle = document.head.appendChild(styleEl);
    return myStyle.sheet;
  }
}
