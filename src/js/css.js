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
    color: "green"
  })
  .props(mixin.setPaddings("0px"))
  .props({ "padding-left": "150px" });

mySS.rule("h1").props({ "margin-bottom": "42px" });

mySS.rule(".red-color").props({ color: "red" });

mySS.rule(".font-big").props({ "font-size": "300px" });

mySS
  .rule("h1")
  .extend(mySS.rule(".red-color"))
  .extend(mySS.rule(".font-big"))
  .media("screen")
  .props({ border: "white solid 3px" });

mySS
  .rule("h1")
  .media("print")
  .props({ border: "black solid 3 px" });

console.log(mySS.css());
mySS.attach();
