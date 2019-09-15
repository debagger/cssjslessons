function getCssRuleStr(selector, bodyObj) {
  return `${selector} {\n${getBodyStr(bodyObj)}\n}`;
}

function getBodyStr(bodyObj) {
  return Object.entries(bodyObj)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

export default class styleSheet {
  constructor(styles) {
    this.styles = styles;
  }

  css() {
    return Object.entries(this.styles)
      .map(([selector, body]) => getCssRuleStr(selector, body))
      .join("\n\n");
  }

  attach() {
    const styleEl = document.createElement("style");
    styleEl.textContent = this.css();
    const myStyle = document.head.appendChild(styleEl);
    return myStyle.sheet;
  }
}
