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
    this.extendes = [];
    this.medias = new Map();
  }

  _createClass(CSSRule, [{
    key: "props",
    value: function props(properties) {
      this.properties = new Map([].concat(_toConsumableArray(this.properties), _toConsumableArray(Object.entries(properties))));
      return this;
    }
  }, {
    key: "extend",
    value: function extend(rule) {
      rule.extendes.push(this);
      return this;
    }
  }, {
    key: "media",
    value: function media(selector) {
      var rule = this.medias.get(selector);
      if (rule) return rule;
      rule = new CSSRule(this.selector);
      this.medias.set(selector, rule);
      return rule;
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
      var rule = "".concat([this.selector].concat(_toConsumableArray(this.extendes.map(function (r) {
        return r.selector;
      }))).join(", "), " {\n").concat(body, "\n}");
      var medias = Array.from(this.medias).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        return "@media ".concat(key, " {\n").concat(value.toString(), "\n}");
      });
      return [rule].concat(_toConsumableArray(medias)).join("\n\n");
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
  color: "green"
}).props(mixin.setPaddings("0px")).props({
  "padding-left": "150px"
});
mySS.rule("h1").props({
  "margin-bottom": "42px"
});
mySS.rule(".red-color").props({
  color: "red"
});
mySS.rule(".font-big").props({
  "font-size": "300px"
});
mySS.rule("h1").extend(mySS.rule(".red-color")).extend(mySS.rule(".font-big")).media("screen").props({
  border: "white solid 3px"
});
mySS.rule("h1").media("print").props({
  border: "black solid 3 px"
});
console.log(mySS.css());
mySS.attach();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlcyI6WyJzcmMvanMvcnVsZS5qcyIsInNyYy9qcy9zcy5qcyIsInNyYy9qcy9taXhpbnMuanMiLCJzcmMvanMvY3NzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENTU1J1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB0aGlzLmV4dGVuZGVzID0gW107XHJcbiAgICB0aGlzLm1lZGlhcyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIHByb3BzKHByb3BlcnRpZXMpIHtcclxuICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBNYXAoW1xyXG4gICAgICAuLi50aGlzLnByb3BlcnRpZXMsXHJcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKHByb3BlcnRpZXMpXHJcbiAgICBdKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZXh0ZW5kKHJ1bGUpIHtcclxuICAgIHJ1bGUuZXh0ZW5kZXMucHVzaCh0aGlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgbWVkaWEoc2VsZWN0b3IpIHtcclxuICAgIGxldCBydWxlID0gdGhpcy5tZWRpYXMuZ2V0KHNlbGVjdG9yKTtcclxuICAgIGlmIChydWxlKSByZXR1cm4gcnVsZTtcclxuICAgIHJ1bGUgPSBuZXcgQ1NTUnVsZSh0aGlzLnNlbGVjdG9yKTtcclxuICAgIHRoaXMubWVkaWFzLnNldChzZWxlY3RvciwgcnVsZSk7XHJcbiAgICByZXR1cm4gcnVsZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgY29uc3QgYm9keSA9IEFycmF5LmZyb20odGhpcy5wcm9wZXJ0aWVzKVxyXG4gICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IGAgICR7a2V5fTogJHt2YWx1ZX07YClcclxuICAgICAgLmpvaW4oXCJcXG5cIik7XHJcblxyXG4gICAgY29uc3QgcnVsZSA9IGAke1t0aGlzLnNlbGVjdG9yLCAuLi50aGlzLmV4dGVuZGVzLm1hcChyID0+IHIuc2VsZWN0b3IpXS5qb2luKFxyXG4gICAgICBcIiwgXCJcclxuICAgICl9IHtcXG4ke2JvZHl9XFxufWA7XHJcbiAgICBjb25zdCBtZWRpYXMgPSBBcnJheS5mcm9tKHRoaXMubWVkaWFzKS5tYXAoXHJcbiAgICAgIChba2V5LCB2YWx1ZV0pID0+IGBAbWVkaWEgJHtrZXl9IHtcXG4ke3ZhbHVlLnRvU3RyaW5nKCl9XFxufWBcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIFtydWxlLCAuLi5tZWRpYXNdLmpvaW4oXCJcXG5cXG5cIik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBDU1NSdWxlIGZyb20gXCIuL3J1bGUuanNcIjtcclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZVN0cihzZWxlY3RvciwgYm9keU9iaikge1xyXG4gIHJldHVybiBgJHtzZWxlY3Rvcn0ge1xcbiR7Z2V0Qm9keVN0cihib2R5T2JqKX1cXG59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9keVN0cihib2R5T2JqKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGJvZHlPYmopXHJcbiAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgICAke25hbWV9OiAke3ZhbHVlfTtgKVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuLyoqXHJcbiAqIFJvb3QgY2xhc3MgZm9yIFN0eWxlU2hlZXQgZ2VuZXJhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0eWxlU2hlZXQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ydWxlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcnVsZShzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLnJ1bGVzLmZpbmQociA9PiByLnNlbGVjdG9yID09IHNlbGVjdG9yKTtcclxuICAgIGlmIChydWxlKSByZXR1cm4gcnVsZTtcclxuICAgIHJ1bGUgPSBuZXcgQ1NTUnVsZShzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICByZXR1cm4gcnVsZTtcclxuICB9XHJcblxyXG4gIGNzcygpIHtcclxuICAgIHJldHVybiB0aGlzLnJ1bGVzLmpvaW4oXCJcXG5cXG5cIik7XHJcbiAgfVxyXG5cclxuICBhdHRhY2goKSB7XHJcbiAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHRoaXMuY3NzKCk7XHJcbiAgICBjb25zdCBteVN0eWxlID0gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcclxuICAgIHJldHVybiBteVN0eWxlLnNoZWV0O1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0UGFkZGluZ3ModmFsdWUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFwicGFkZGluZy1sZWZ0XCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctcmlnaHRcIjogdmFsdWUsXHJcbiAgICAgIFwicGFkZGluZy1ib3R0dG9tXCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctdG9wXCI6IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCBzdHlsZVNoZWV0IGZyb20gXCIuL3NzLmpzXCI7XHJcbmltcG9ydCBtaXhpbiBmcm9tIFwiLi9taXhpbnMuanNcIjtcclxuY29uc3QgbXlTUyA9IG5ldyBzdHlsZVNoZWV0KCk7XHJcblxyXG5teVNTXHJcbiAgLnJ1bGUoXCJib2R5XCIpXHJcbiAgLnByb3BzKHsgYmFja2dyb3VuZDogXCJ5ZWxsb3dcIiB9KVxyXG4gIC5wcm9wcyh7IGNvbG9yOiBcInJlZFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAucHJvcHMoe1xyXG4gICAgXCJmb250LXNpemVcIjogXCIxMDBweFwiLFxyXG4gICAgY29sb3I6IFwiZ3JlZW5cIlxyXG4gIH0pXHJcbiAgLnByb3BzKG1peGluLnNldFBhZGRpbmdzKFwiMHB4XCIpKVxyXG4gIC5wcm9wcyh7IFwicGFkZGluZy1sZWZ0XCI6IFwiMTUwcHhcIiB9KTtcclxuXHJcbm15U1MucnVsZShcImgxXCIpLnByb3BzKHsgXCJtYXJnaW4tYm90dG9tXCI6IFwiNDJweFwiIH0pO1xyXG5cclxubXlTUy5ydWxlKFwiLnJlZC1jb2xvclwiKS5wcm9wcyh7IGNvbG9yOiBcInJlZFwiIH0pO1xyXG5cclxubXlTUy5ydWxlKFwiLmZvbnQtYmlnXCIpLnByb3BzKHsgXCJmb250LXNpemVcIjogXCIzMDBweFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAuZXh0ZW5kKG15U1MucnVsZShcIi5yZWQtY29sb3JcIikpXHJcbiAgLmV4dGVuZChteVNTLnJ1bGUoXCIuZm9udC1iaWdcIikpXHJcbiAgLm1lZGlhKFwic2NyZWVuXCIpXHJcbiAgLnByb3BzKHsgYm9yZGVyOiBcIndoaXRlIHNvbGlkIDNweFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAubWVkaWEoXCJwcmludFwiKVxyXG4gIC5wcm9wcyh7IGJvcmRlcjogXCJibGFjayBzb2xpZCAzIHB4XCIgfSk7XHJcblxyXG5jb25zb2xlLmxvZyhteVNTLmNzcygpKTtcclxubXlTUy5hdHRhY2goKTtcclxuIl0sIm5hbWVzIjpbIkNTU1J1bGUiLCJzZWxlY3RvciIsInByb3BlcnRpZXMiLCJNYXAiLCJleHRlbmRlcyIsIm1lZGlhcyIsIk9iamVjdCIsImVudHJpZXMiLCJydWxlIiwicHVzaCIsImdldCIsInNldCIsImJvZHkiLCJBcnJheSIsImZyb20iLCJtYXAiLCJrZXkiLCJ2YWx1ZSIsImpvaW4iLCJyIiwidG9TdHJpbmciLCJzdHlsZVNoZWV0IiwicnVsZXMiLCJmaW5kIiwic3R5bGVFbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiY3NzIiwibXlTdHlsZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInNoZWV0Iiwic2V0UGFkZGluZ3MiLCJteVNTIiwicHJvcHMiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJtaXhpbiIsImV4dGVuZCIsIm1lZGlhIiwiYm9yZGVyIiwiY29uc29sZSIsImxvZyIsImF0dGFjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBOzs7bUJBQ1BDLFFBQVosRUFBc0I7OztTQUNmQSxRQUFMLEdBQWdCQSxRQUFoQjtTQUNLQyxVQUFMLEdBQWtCLElBQUlDLEdBQUosRUFBbEI7U0FDS0MsUUFBTCxHQUFnQixFQUFoQjtTQUNLQyxNQUFMLEdBQWMsSUFBSUYsR0FBSixFQUFkOzs7OzswQkFHSUQsWUFBWTtXQUNYQSxVQUFMLEdBQWtCLElBQUlDLEdBQUosOEJBQ2IsS0FBS0QsVUFEUSxzQkFFYkksTUFBTSxDQUFDQyxPQUFQLENBQWVMLFVBQWYsQ0FGYSxHQUFsQjthQUlPLElBQVA7Ozs7MkJBR0tNLE1BQU07TUFDWEEsSUFBSSxDQUFDSixRQUFMLENBQWNLLElBQWQsQ0FBbUIsSUFBbkI7YUFDTyxJQUFQOzs7OzBCQUdJUixVQUFVO1VBQ1ZPLElBQUksR0FBRyxLQUFLSCxNQUFMLENBQVlLLEdBQVosQ0FBZ0JULFFBQWhCLENBQVg7VUFDSU8sSUFBSixFQUFVLE9BQU9BLElBQVA7TUFDVkEsSUFBSSxHQUFHLElBQUlSLE9BQUosQ0FBWSxLQUFLQyxRQUFqQixDQUFQO1dBQ0tJLE1BQUwsQ0FBWU0sR0FBWixDQUFnQlYsUUFBaEIsRUFBMEJPLElBQTFCO2FBQ09BLElBQVA7Ozs7K0JBR1M7VUFDSEksSUFBSSxHQUFHQyxLQUFLLENBQUNDLElBQU4sQ0FB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
