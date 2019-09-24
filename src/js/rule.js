module.exports = class CSSRule {
  constructor(selector) {
    this.selector = selector;
    this.properties = new Map();
    this.extendes = [];
    this.medias = new Map();
    this.nesties = [];
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

  nest(selector) {
    let rule = this.nesties.find(s => (s.selector = selector));
    if (rule) return rule;
    rule = new CSSRule(selector);
    this.nesties.push(rule);
    return rule;
  }

  toString(parentSelector = "") {
    const body = Array.from(this.properties)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");

    let selector = this.selector;
    if (selector.includes("&")) {
      selector = selector.replace("&", parentSelector);
    } else {
      if (selector.length > 0) selector = parentSelector + " " + selector;
    }

    const rule = `${[selector, ...this.extendes.map(r => r.selector)].join(
      ", "
    )} {\n${body}\n}`;

    const medias = Array.from(this.medias).map(
      ([key, value]) => `@media ${key} {\n${value.toString()}\n}`
    );

    const nest = this.nesties.map(n => n.toString(selector)).join("\n\n");

    return [rule, ...medias, nest].join("\n\n");
  }
};
