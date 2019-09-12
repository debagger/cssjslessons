"use strict";

var _createStylesheet = _interopRequireDefault(require("createStylesheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bgColor = "yellow";

var body = _createStylesheet["default"].cssRules[_createStylesheet["default"].insertRule("\nbody {background: ".concat(bgColor, "}\n"))];

var h1 = _createStylesheet["default"].insertRule("\nh1 {color:red}\n");