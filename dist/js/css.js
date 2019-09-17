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
    this.nesties = [];
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
    key: "nest",
    value: function nest(selector) {
      var rule = this.nesties.find(function (s) {
        return s.selector = selector;
      });
      if (rule) return rule;
      rule = new CSSRule(selector);
      this.nesties.push(rule);
      return rule;
    }
  }, {
    key: "toString",
    value: function toString() {
      var parentSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var body = Array.from(this.properties).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return "  ".concat(key, ": ").concat(value, ";");
      }).join("\n");
      var selector = this.selector;

      if (selector.includes("&")) {
        selector = selector.replace("&", parentSelector);
      } else {
        if (selector.length > 0) selector = parentSelector + " " + selector;
      }

      var rule = "".concat([selector].concat(_toConsumableArray(this.extendes.map(function (r) {
        return r.selector;
      }))).join(", "), " {\n").concat(body, "\n}");
      var medias = Array.from(this.medias).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        return "@media ".concat(key, " {\n").concat(value.toString(), "\n}");
      });
      var nest = this.nesties.map(function (n) {
        return n.toString(selector);
      }).join("\n\n");
      return [rule].concat(_toConsumableArray(medias), [nest]).join("\n\n");
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

var mixins = {
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
}).props(mixins.setPaddings("0px")).props({
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
}).nest("&-red").props({
  color: "red"
}).nest("p").props(mixins.setPaddings("3px"));
mySS.rule("h1").extend(mySS.rule(".red-color")).extend(mySS.rule(".font-big")).media("screen").props({
  border: "white solid 3px"
});
mySS.rule("h1").media("print").props({
  border: "black solid 3 px"
});
console.log(mySS.css());
mySS.attach();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlcyI6WyJzcmMvanMvcnVsZS5qcyIsInNyYy9qcy9zcy5qcyIsInNyYy9qcy9taXhpbnMuanMiLCJzcmMvanMvY3NzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENTU1J1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB0aGlzLmV4dGVuZGVzID0gW107XHJcbiAgICB0aGlzLm1lZGlhcyA9IG5ldyBNYXAoKTtcclxuICAgIHRoaXMubmVzdGllcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHJvcHMocHJvcGVydGllcykge1xyXG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IE1hcChbXHJcbiAgICAgIC4uLnRoaXMucHJvcGVydGllcyxcclxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMocHJvcGVydGllcylcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBleHRlbmQocnVsZSkge1xyXG4gICAgcnVsZS5leHRlbmRlcy5wdXNoKHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBtZWRpYShzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLm1lZGlhcy5nZXQoc2VsZWN0b3IpO1xyXG4gICAgaWYgKHJ1bGUpIHJldHVybiBydWxlO1xyXG4gICAgcnVsZSA9IG5ldyBDU1NSdWxlKHRoaXMuc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5tZWRpYXMuc2V0KHNlbGVjdG9yLCBydWxlKTtcclxuICAgIHJldHVybiBydWxlO1xyXG4gIH1cclxuXHJcbiAgbmVzdChzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLm5lc3RpZXMuZmluZChzID0+IChzLnNlbGVjdG9yID0gc2VsZWN0b3IpKTtcclxuICAgIGlmIChydWxlKSByZXR1cm4gcnVsZTtcclxuICAgIHJ1bGUgPSBuZXcgQ1NTUnVsZShzZWxlY3Rvcik7XHJcbiAgICB0aGlzLm5lc3RpZXMucHVzaChydWxlKTtcclxuICAgIHJldHVybiBydWxlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcocGFyZW50U2VsZWN0b3IgPSBcIlwiKSB7XHJcbiAgICBjb25zdCBib2R5ID0gQXJyYXkuZnJvbSh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCAgJHtrZXl9OiAke3ZhbHVlfTtgKVxyXG4gICAgICAuam9pbihcIlxcblwiKTtcclxuXHJcbiAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xyXG4gICAgaWYgKHNlbGVjdG9yLmluY2x1ZGVzKFwiJlwiKSkge1xyXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoXCImXCIsIHBhcmVudFNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChzZWxlY3Rvci5sZW5ndGggPiAwKSBzZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yICsgXCIgXCIgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBydWxlID0gYCR7W3NlbGVjdG9yLCAuLi50aGlzLmV4dGVuZGVzLm1hcChyID0+IHIuc2VsZWN0b3IpXS5qb2luKFxyXG4gICAgICBcIiwgXCJcclxuICAgICl9IHtcXG4ke2JvZHl9XFxufWA7XHJcblxyXG4gICAgY29uc3QgbWVkaWFzID0gQXJyYXkuZnJvbSh0aGlzLm1lZGlhcykubWFwKFxyXG4gICAgICAoW2tleSwgdmFsdWVdKSA9PiBgQG1lZGlhICR7a2V5fSB7XFxuJHt2YWx1ZS50b1N0cmluZygpfVxcbn1gXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG5lc3QgPSB0aGlzLm5lc3RpZXMubWFwKG4gPT4gbi50b1N0cmluZyhzZWxlY3RvcikpLmpvaW4oXCJcXG5cXG5cIik7XHJcblxyXG4gICAgcmV0dXJuIFtydWxlLCAuLi5tZWRpYXMsIG5lc3RdLmpvaW4oXCJcXG5cXG5cIik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBDU1NSdWxlIGZyb20gXCIuL3J1bGUuanNcIjtcclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZVN0cihzZWxlY3RvciwgYm9keU9iaikge1xyXG4gIHJldHVybiBgJHtzZWxlY3Rvcn0ge1xcbiR7Z2V0Qm9keVN0cihib2R5T2JqKX1cXG59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9keVN0cihib2R5T2JqKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGJvZHlPYmopXHJcbiAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgICAke25hbWV9OiAke3ZhbHVlfTtgKVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuLyoqXHJcbiAqIFJvb3QgY2xhc3MgZm9yIFN0eWxlU2hlZXQgZ2VuZXJhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0eWxlU2hlZXQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ydWxlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcnVsZShzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLnJ1bGVzLmZpbmQociA9PiByLnNlbGVjdG9yID09IHNlbGVjdG9yKTtcclxuICAgIGlmIChydWxlKSByZXR1cm4gcnVsZTtcclxuICAgIHJ1bGUgPSBuZXcgQ1NTUnVsZShzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICByZXR1cm4gcnVsZTtcclxuICB9XHJcblxyXG4gIGNzcygpIHtcclxuICAgIHJldHVybiB0aGlzLnJ1bGVzLmpvaW4oXCJcXG5cXG5cIik7XHJcbiAgfVxyXG5cclxuICBhdHRhY2goKSB7XHJcbiAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHRoaXMuY3NzKCk7XHJcbiAgICBjb25zdCBteVN0eWxlID0gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcclxuICAgIHJldHVybiBteVN0eWxlLnNoZWV0O1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0UGFkZGluZ3ModmFsdWUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFwicGFkZGluZy1sZWZ0XCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctcmlnaHRcIjogdmFsdWUsXHJcbiAgICAgIFwicGFkZGluZy1ib3R0dG9tXCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctdG9wXCI6IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCBzdHlsZVNoZWV0IGZyb20gXCIuL3NzLmpzXCI7XHJcbmltcG9ydCBtaXhpbiBmcm9tIFwiLi9taXhpbnMuanNcIjtcclxuaW1wb3J0IG1peGlucyBmcm9tIFwiLi9taXhpbnMuanNcIjtcclxuY29uc3QgbXlTUyA9IG5ldyBzdHlsZVNoZWV0KCk7XHJcblxyXG5teVNTXHJcbiAgLnJ1bGUoXCJib2R5XCIpXHJcbiAgLnByb3BzKHsgYmFja2dyb3VuZDogXCJ5ZWxsb3dcIiB9KVxyXG4gIC5wcm9wcyh7IGNvbG9yOiBcInJlZFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAucHJvcHMoe1xyXG4gICAgXCJmb250LXNpemVcIjogXCIxMDBweFwiLFxyXG4gICAgY29sb3I6IFwiZ3JlZW5cIlxyXG4gIH0pXHJcbiAgLnByb3BzKG1peGluLnNldFBhZGRpbmdzKFwiMHB4XCIpKVxyXG4gIC5wcm9wcyh7IFwicGFkZGluZy1sZWZ0XCI6IFwiMTUwcHhcIiB9KTtcclxuXHJcbm15U1MucnVsZShcImgxXCIpLnByb3BzKHsgXCJtYXJnaW4tYm90dG9tXCI6IFwiNDJweFwiIH0pO1xyXG5cclxubXlTUy5ydWxlKFwiLnJlZC1jb2xvclwiKS5wcm9wcyh7IGNvbG9yOiBcInJlZFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiLmZvbnQtYmlnXCIpXHJcbiAgLnByb3BzKHsgXCJmb250LXNpemVcIjogXCIzMDBweFwiIH0pXHJcbiAgLm5lc3QoXCImLXJlZFwiKVxyXG4gIC5wcm9wcyh7IGNvbG9yOiBcInJlZFwiIH0pXHJcbiAgLm5lc3QoXCJwXCIpXHJcbiAgLnByb3BzKG1peGlucy5zZXRQYWRkaW5ncyhcIjNweFwiKSk7XHJcblxyXG5teVNTXHJcbiAgLnJ1bGUoXCJoMVwiKVxyXG4gIC5leHRlbmQobXlTUy5ydWxlKFwiLnJlZC1jb2xvclwiKSlcclxuICAuZXh0ZW5kKG15U1MucnVsZShcIi5mb250LWJpZ1wiKSlcclxuICAubWVkaWEoXCJzY3JlZW5cIilcclxuICAucHJvcHMoeyBib3JkZXI6IFwid2hpdGUgc29saWQgM3B4XCIgfSk7XHJcblxyXG5teVNTXHJcbiAgLnJ1bGUoXCJoMVwiKVxyXG4gIC5tZWRpYShcInByaW50XCIpXHJcbiAgLnByb3BzKHsgYm9yZGVyOiBcImJsYWNrIHNvbGlkIDMgcHhcIiB9KTtcclxuXHJcbmNvbnNvbGUubG9nKG15U1MuY3NzKCkpO1xyXG5teVNTLmF0dGFjaCgpO1xyXG4iXSwibmFtZXMiOlsiQ1NTUnVsZSIsInNlbGVjdG9yIiwicHJvcGVydGllcyIsIk1hcCIsImV4dGVuZGVzIiwibWVkaWFzIiwibmVzdGllcyIsIk9iamVjdCIsImVudHJpZXMiLCJydWxlIiwicHVzaCIsImdldCIsInNldCIsImZpbmQiLCJzIiwicGFyZW50U2VsZWN0b3IiLCJib2R5IiwiQXJyYXkiLCJmcm9tIiwibWFwIiwia2V5IiwidmFsdWUiLCJqb2luIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwibGVuZ3RoIiwiciIsInRvU3RyaW5nIiwibmVzdCIsIm4iLCJzdHlsZVNoZWV0IiwicnVsZXMiLCJzdHlsZUVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJjc3MiLCJteVN0eWxlIiwiaGVhZCIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJzZXRQYWRkaW5ncyIsIm15U1MiLCJwcm9wcyIsImJhY2tncm91bmQiLCJjb2xvciIsIm1peGluIiwibWl4aW5zIiwiZXh0ZW5kIiwibWVkaWEiLCJib3JkZXIiLCJjb25zb2xlIiwibG9nIiwiYXR0YWNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkE7OzttQkFDUEMsUUFBWixFQUFzQjs7O1NBQ2ZBLFFBQUwsR0FBZ0JBLFFBQWhCO1NBQ0tDLFVBQUwsR0FBa0IsSUFBSUMsR0FBSixFQUFsQjtTQUNLQyxRQUFMLEdBQWdCLEVBQWhCO1NBQ0tDLE1BQUwsR0FBYyxJQUFJRixHQUFKLEVBQWQ7U0FDS0csT0FBTCxHQUFlLEVBQWY7Ozs7OzBCQUdJSixZQUFZO1dBQ1hBLFVBQUwsR0FBa0IsSUFBSUMsR0FBSiw4QkFDYixLQUFLRCxVQURRLHNCQUViSyxNQUFNLENBQUNDLE9BQVAsQ0FBZU4sVUFBZixDQUZhLEdBQWxCO2FBSU8sSUFBUDs7OzsyQkFHS08sTUFBTTtNQUNYQSxJQUFJLENBQUNMLFFBQUwsQ0FBY00sSUFBZCxDQUFtQixJQUFuQjthQUNPLElBQVA7Ozs7MEJBR0lULFVBQVU7VUFDVlEsSUFBSSxHQUFHLEtBQUtKLE1BQUwsQ0FBWU0sR0FBWixDQUFnQlYsUUFBaEIsQ0FBWDtVQUNJUSxJQUFKLEVBQVUsT0FBT0EsSUFBUDtNQUNWQSxJQUFJLEdBQUcsSUFBSVQsT0FBSixDQUFZLEtBQUtDLFFBQWpCLENBQVA7V0FDS0ksTUFBTCxDQUFZTyxHQUFaLENBQWdCWCxRQUFoQixFQUEwQlEsSUFBMUI7YUFDT0EsSUFBUDs7Ozt5QkFHR1IsVUFBVTtVQUNUUSxJQUFJLEdBQUcsS0FBS0gsT0FBTCxDQUFhTyxJQUFiLENBQWtCLFVBQUFDLENBQUM7ZUFBS0Es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
