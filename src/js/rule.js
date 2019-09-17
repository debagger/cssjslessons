export default class CSSRule {
  constructor(selector) {
    this.selector = selector;
    this.properties = new Map();
    this.extendes = [];
    this.medias = new Map();
  }

  props(properties) {
    this.properties = new Map([
      ...this.properties,
      ...Object.entries(properties)
    ]);
    return this;
  }

  extend(rule) {
    rule.extendes.push(this);
    return this;
  }

  media(selector) {
    let rule = this.medias.get(selector);
    if (rule) return rule;
    rule = new CSSRule(this.selector);
    this.medias.set(selector, rule);
    return rule;
  }

  toString() {
    const body = Array.from(this.properties)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");

    const rule = `${[this.selector, ...this.extendes.map(r => r.selector)].join(
      ", "
    )} {\n${body}\n}`;
    const medias = Array.from(this.medias).map(
      ([key, value]) => `@media ${key} {\n${value.toString()}\n}`
    );

    return [rule, ...medias].join("\n\n");
  }
}
