'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var CSSRule =
/*#__PURE__*/
function () {
  function CSSRule(selector) {
    _classCallCheck(this, CSSRule);

    this.selector = selector;
    this.properties = new Map();
  }

  _createClass(CSSRule, [{
    key: "props",
    value: function props(properties) {
      this.properties = new Map([].concat(_toConsumableArray(this.properties), _toConsumableArray(Object.entries(properties))));
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      var body = Array.from(this.properties).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return "  ".concat(key, ": ").concat(value, ";");
      }).join("\n");
      return "".concat(this.selector, " {\n").concat(body, "\n}");
    }
  }]);

  return CSSRule;
}();

/**
 * Root class for StyleSheet generate
 */


var styleSheet =
/*#__PURE__*/
function () {
  function styleSheet() {
    _classCallCheck(this, styleSheet);

    this.rules = [];
  }

  _createClass(styleSheet, [{
    key: "rule",
    value: function rule(selector) {
      var rule = this.rules.find(function (r) {
        return r.selector == selector;
      });
      if (rule) return rule;
      rule = new CSSRule(selector);
      this.rules.push(rule);
      return rule;
    }
  }, {
    key: "css",
    value: function css() {
      return this.rules.join("\n\n");
    }
  }, {
    key: "attach",
    value: function attach() {
      var styleEl = document.createElement("style");
      styleEl.textContent = this.css();
      var myStyle = document.head.appendChild(styleEl);
      return myStyle.sheet;
    }
  }]);

  return styleSheet;
}();

var mixin = {
  setPaddings: function setPaddings(value) {
    return {
      "padding-left": value,
      "padding-right": value,
      "padding-botttom": value,
      "padding-top": value
    };
  }
};

var mySS = new styleSheet();
mySS.rule("body").props({
  background: "yellow"
}).props({
  color: "red"
});
mySS.rule("h1").props({
  "font-size": "100px",
  color: "blue"
}).props(mixin.setPaddings("0px")).props({
  "padding-left": "50px"
});
mySS.rule("h1").props({
  "margin-bottom": "42px"
});
console.log(mySS.css());
mySS.attach();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlcyI6WyJzcmMvanMvcnVsZS5qcyIsInNyYy9qcy9zcy5qcyIsInNyYy9qcy9taXhpbnMuanMiLCJzcmMvanMvY3NzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENTU1J1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XHJcbiAgfVxyXG4gIHByb3BzKHByb3BlcnRpZXMpIHtcclxuICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBNYXAoW1xyXG4gICAgICAuLi50aGlzLnByb3BlcnRpZXMsXHJcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKHByb3BlcnRpZXMpXHJcbiAgICBdKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBBcnJheS5mcm9tKHRoaXMucHJvcGVydGllcylcclxuICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgICAke2tleX06ICR7dmFsdWV9O2ApXHJcbiAgICAgIC5qb2luKFwiXFxuXCIpO1xyXG4gICAgcmV0dXJuIGAke3RoaXMuc2VsZWN0b3J9IHtcXG4ke2JvZHl9XFxufWA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBDU1NSdWxlIGZyb20gXCIuL3J1bGUuanNcIjtcclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZVN0cihzZWxlY3RvciwgYm9keU9iaikge1xyXG4gIHJldHVybiBgJHtzZWxlY3Rvcn0ge1xcbiR7Z2V0Qm9keVN0cihib2R5T2JqKX1cXG59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9keVN0cihib2R5T2JqKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGJvZHlPYmopXHJcbiAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgICAke25hbWV9OiAke3ZhbHVlfTtgKVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuLyoqXHJcbiAqIFJvb3QgY2xhc3MgZm9yIFN0eWxlU2hlZXQgZ2VuZXJhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0eWxlU2hlZXQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ydWxlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcnVsZShzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLnJ1bGVzLmZpbmQociA9PiByLnNlbGVjdG9yID09IHNlbGVjdG9yKTtcclxuICAgIGlmIChydWxlKSByZXR1cm4gcnVsZTtcclxuICAgIHJ1bGUgPSBuZXcgQ1NTUnVsZShzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICByZXR1cm4gcnVsZTtcclxuICB9XHJcblxyXG4gIGNzcygpIHtcclxuICAgIHJldHVybiB0aGlzLnJ1bGVzLmpvaW4oXCJcXG5cXG5cIik7XHJcbiAgfVxyXG5cclxuICBhdHRhY2goKSB7XHJcbiAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHRoaXMuY3NzKCk7XHJcbiAgICBjb25zdCBteVN0eWxlID0gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcclxuICAgIHJldHVybiBteVN0eWxlLnNoZWV0O1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0UGFkZGluZ3ModmFsdWUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFwicGFkZGluZy1sZWZ0XCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctcmlnaHRcIjogdmFsdWUsXHJcbiAgICAgIFwicGFkZGluZy1ib3R0dG9tXCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctdG9wXCI6IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCBzdHlsZVNoZWV0IGZyb20gXCIuL3NzLmpzXCI7XHJcbmltcG9ydCBtaXhpbiBmcm9tIFwiLi9taXhpbnMuanNcIjtcclxuY29uc3QgbXlTUyA9IG5ldyBzdHlsZVNoZWV0KCk7XHJcblxyXG5teVNTXHJcbiAgLnJ1bGUoXCJib2R5XCIpXHJcbiAgLnByb3BzKHsgYmFja2dyb3VuZDogXCJ5ZWxsb3dcIiB9KVxyXG4gIC5wcm9wcyh7IGNvbG9yOiBcInJlZFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAucHJvcHMoe1xyXG4gICAgXCJmb250LXNpemVcIjogXCIxMDBweFwiLFxyXG4gICAgY29sb3I6IFwiYmx1ZVwiXHJcbiAgfSlcclxuICAucHJvcHMobWl4aW4uc2V0UGFkZGluZ3MoXCIwcHhcIikpXHJcbiAgLnByb3BzKHsgXCJwYWRkaW5nLWxlZnRcIjogXCI1MHB4XCIgfSk7XHJcblxyXG5teVNTLnJ1bGUoXCJoMVwiKS5wcm9wcyh7IFwibWFyZ2luLWJvdHRvbVwiOiBcIjQycHhcIiB9KTtcclxuXHJcbmNvbnNvbGUubG9nKG15U1MuY3NzKCkpO1xyXG5teVNTLmF0dGFjaCgpO1xyXG4iXSwibmFtZXMiOlsiQ1NTUnVsZSIsInNlbGVjdG9yIiwicHJvcGVydGllcyIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJib2R5IiwiQXJyYXkiLCJmcm9tIiwibWFwIiwia2V5IiwidmFsdWUiLCJqb2luIiwic3R5bGVTaGVldCIsInJ1bGVzIiwicnVsZSIsImZpbmQiLCJyIiwicHVzaCIsInN0eWxlRWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImNzcyIsIm15U3R5bGUiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJzaGVldCIsInNldFBhZGRpbmdzIiwibXlTUyIsInByb3BzIiwiYmFja2dyb3VuZCIsImNvbG9yIiwibWl4aW4iLCJjb25zb2xlIiwibG9n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
