"use strict";
import styleSheet from "./ss.js";
import style from "./style.js";

const mySS = new styleSheet(style);

console.log(mySS.css());
mySS.attach();
