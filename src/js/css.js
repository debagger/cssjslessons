"use strict";
import myStylesheet from "createStylesheet";

const bgColor = "yellow";
const body =
  myStylesheet.cssRules[
    myStylesheet.insertRule(`
body {background: ${bgColor}}
`)
  ];

const h1 = myStylesheet.insertRule(`
h1 {color:red}
`);
