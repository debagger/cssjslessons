const { Stylesheet } = require("./stylesheet");

const stylesheet = new Stylesheet("src/bootstrap/scss/", "_reboot.scss");
console.log(stylesheet.toString());
