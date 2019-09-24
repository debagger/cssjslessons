const Stylesheet = require("./stylesheet");
const fs = require("fs");
const { parse } = require("scss-parser");

const rootDirectory = "src/bootstrap/scss/";
const filename = "_reboot.scss";
const f = fs.readFileSync(rootDirectory + filename, "utf-8");
const ast = parse(f);

const stylesheet = new Stylesheet(ast);
console.log(stylesheet.toString());
