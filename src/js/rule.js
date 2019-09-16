export default class CSSRule {
  constructor(selector) {
    this.selector = selector;
    this.properties = new Map();
  }
  props(properties) {
    this.properties = new Map([
      ...this.properties,
      ...Object.entries(properties)
    ]);
    return this;
  }
  toString() {
    const body = Array.from(this.properties)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");
    return `${this.selector} {\n${body}\n}`;
  }
}
