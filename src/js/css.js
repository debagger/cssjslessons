"use strict";
import styleSheet from "./ss.js";
import mixin from "./mixins.js";
const mySS = new styleSheet();

mySS
  .rule("body")
  .props({ background: "yellow" })
  .props({ color: "red" });

mySS
  .rule("h1")
  .props({
    "font-size": "100px",
    color: "blue"
  })
  .props(mixin.setPaddings("0px"))
  .props({ "padding-left": "50px" });

mySS.rule("h1").props({ "margin-bottom": "42px" });

console.log(mySS.css());
mySS.attach();
