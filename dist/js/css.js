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
    value: function rule(selector, properties) {
      var rule = this.rules.find(function (r) {
        return r.selector == selector;
      });

      if (!rule) {
        rule = new CSSRule(selector);
        this.rules.push(rule);
      }

      if (properties) rule.props(properties);
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
mySS.rule("body", {
  background: "yellow",
  color: "red"
});
mySS.rule("h1", {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlcyI6WyJzcmMvanMvcnVsZS5qcyIsInNyYy9qcy9zcy5qcyIsInNyYy9qcy9taXhpbnMuanMiLCJzcmMvanMvY3NzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENTU1J1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB0aGlzLmV4dGVuZGVzID0gW107XHJcbiAgICB0aGlzLm1lZGlhcyA9IG5ldyBNYXAoKTtcclxuICAgIHRoaXMubmVzdGllcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHJvcHMocHJvcGVydGllcykge1xyXG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IE1hcChbXHJcbiAgICAgIC4uLnRoaXMucHJvcGVydGllcyxcclxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMocHJvcGVydGllcylcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBleHRlbmQocnVsZSkge1xyXG4gICAgcnVsZS5leHRlbmRlcy5wdXNoKHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBtZWRpYShzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLm1lZGlhcy5nZXQoc2VsZWN0b3IpO1xyXG4gICAgaWYgKHJ1bGUpIHJldHVybiBydWxlO1xyXG4gICAgcnVsZSA9IG5ldyBDU1NSdWxlKHRoaXMuc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5tZWRpYXMuc2V0KHNlbGVjdG9yLCBydWxlKTtcclxuICAgIHJldHVybiBydWxlO1xyXG4gIH1cclxuXHJcbiAgbmVzdChzZWxlY3Rvcikge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLm5lc3RpZXMuZmluZChzID0+IChzLnNlbGVjdG9yID0gc2VsZWN0b3IpKTtcclxuICAgIGlmIChydWxlKSByZXR1cm4gcnVsZTtcclxuICAgIHJ1bGUgPSBuZXcgQ1NTUnVsZShzZWxlY3Rvcik7XHJcbiAgICB0aGlzLm5lc3RpZXMucHVzaChydWxlKTtcclxuICAgIHJldHVybiBydWxlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcocGFyZW50U2VsZWN0b3IgPSBcIlwiKSB7XHJcbiAgICBjb25zdCBib2R5ID0gQXJyYXkuZnJvbSh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCAgJHtrZXl9OiAke3ZhbHVlfTtgKVxyXG4gICAgICAuam9pbihcIlxcblwiKTtcclxuXHJcbiAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xyXG4gICAgaWYgKHNlbGVjdG9yLmluY2x1ZGVzKFwiJlwiKSkge1xyXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoXCImXCIsIHBhcmVudFNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChzZWxlY3Rvci5sZW5ndGggPiAwKSBzZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yICsgXCIgXCIgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBydWxlID0gYCR7W3NlbGVjdG9yLCAuLi50aGlzLmV4dGVuZGVzLm1hcChyID0+IHIuc2VsZWN0b3IpXS5qb2luKFxyXG4gICAgICBcIiwgXCJcclxuICAgICl9IHtcXG4ke2JvZHl9XFxufWA7XHJcblxyXG4gICAgY29uc3QgbWVkaWFzID0gQXJyYXkuZnJvbSh0aGlzLm1lZGlhcykubWFwKFxyXG4gICAgICAoW2tleSwgdmFsdWVdKSA9PiBgQG1lZGlhICR7a2V5fSB7XFxuJHt2YWx1ZS50b1N0cmluZygpfVxcbn1gXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG5lc3QgPSB0aGlzLm5lc3RpZXMubWFwKG4gPT4gbi50b1N0cmluZyhzZWxlY3RvcikpLmpvaW4oXCJcXG5cXG5cIik7XHJcblxyXG4gICAgcmV0dXJuIFtydWxlLCAuLi5tZWRpYXMsIG5lc3RdLmpvaW4oXCJcXG5cXG5cIik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBDU1NSdWxlIGZyb20gXCIuL3J1bGUuanNcIjtcclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZVN0cihzZWxlY3RvciwgYm9keU9iaikge1xyXG4gIHJldHVybiBgJHtzZWxlY3Rvcn0ge1xcbiR7Z2V0Qm9keVN0cihib2R5T2JqKX1cXG59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9keVN0cihib2R5T2JqKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGJvZHlPYmopXHJcbiAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgICAke25hbWV9OiAke3ZhbHVlfTtgKVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuLyoqXHJcbiAqIFJvb3QgY2xhc3MgZm9yIFN0eWxlU2hlZXQgZ2VuZXJhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0eWxlU2hlZXQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ydWxlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcnVsZShzZWxlY3RvciwgcHJvcGVydGllcykge1xyXG4gICAgbGV0IHJ1bGUgPSB0aGlzLnJ1bGVzLmZpbmQociA9PiByLnNlbGVjdG9yID09IHNlbGVjdG9yKTtcclxuICAgIGlmICghcnVsZSkge1xyXG4gICAgICBydWxlID0gbmV3IENTU1J1bGUoc2VsZWN0b3IpO1xyXG4gICAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvcGVydGllcykgcnVsZS5wcm9wcyhwcm9wZXJ0aWVzKTtcclxuICAgIHJldHVybiBydWxlO1xyXG4gIH1cclxuXHJcbiAgY3NzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucnVsZXMuam9pbihcIlxcblxcblwiKTtcclxuICB9XHJcblxyXG4gIGF0dGFjaCgpIHtcclxuICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gdGhpcy5jc3MoKTtcclxuICAgIGNvbnN0IG15U3R5bGUgPSBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xyXG4gICAgcmV0dXJuIG15U3R5bGUuc2hlZXQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXRQYWRkaW5ncyh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgXCJwYWRkaW5nLWxlZnRcIjogdmFsdWUsXHJcbiAgICAgIFwicGFkZGluZy1yaWdodFwiOiB2YWx1ZSxcclxuICAgICAgXCJwYWRkaW5nLWJvdHR0b21cIjogdmFsdWUsXHJcbiAgICAgIFwicGFkZGluZy10b3BcIjogdmFsdWVcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHN0eWxlU2hlZXQgZnJvbSBcIi4vc3MuanNcIjtcclxuaW1wb3J0IG1peGluIGZyb20gXCIuL21peGlucy5qc1wiO1xyXG5pbXBvcnQgbWl4aW5zIGZyb20gXCIuL21peGlucy5qc1wiO1xyXG5jb25zdCBteVNTID0gbmV3IHN0eWxlU2hlZXQoKTtcclxuXHJcbm15U1MucnVsZShcImJvZHlcIiwgeyBiYWNrZ3JvdW5kOiBcInllbGxvd1wiLCBjb2xvcjogXCJyZWRcIiB9KTtcclxuXHJcbm15U1NcclxuICAucnVsZShcImgxXCIsIHtcclxuICAgIFwiZm9udC1zaXplXCI6IFwiMTAwcHhcIixcclxuICAgIGNvbG9yOiBcImdyZWVuXCJcclxuICB9KVxyXG4gIC5wcm9wcyhtaXhpbi5zZXRQYWRkaW5ncyhcIjBweFwiKSlcclxuICAucHJvcHMoeyBcInBhZGRpbmctbGVmdFwiOiBcIjE1MHB4XCIgfSk7XHJcblxyXG5teVNTLnJ1bGUoXCJoMVwiKS5wcm9wcyh7IFwibWFyZ2luLWJvdHRvbVwiOiBcIjQycHhcIiB9KTtcclxuXHJcbm15U1MucnVsZShcIi5yZWQtY29sb3JcIikucHJvcHMoeyBjb2xvcjogXCJyZWRcIiB9KTtcclxuXHJcbm15U1NcclxuICAucnVsZShcIi5mb250LWJpZ1wiKVxyXG4gIC5wcm9wcyh7IFwiZm9udC1zaXplXCI6IFwiMzAwcHhcIiB9KVxyXG4gIC5uZXN0KFwiJi1yZWRcIilcclxuICAucHJvcHMoeyBjb2xvcjogXCJyZWRcIiB9KVxyXG4gIC5uZXN0KFwicFwiKVxyXG4gIC5wcm9wcyhtaXhpbnMuc2V0UGFkZGluZ3MoXCIzcHhcIikpO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAuZXh0ZW5kKG15U1MucnVsZShcIi5yZWQtY29sb3JcIikpXHJcbiAgLmV4dGVuZChteVNTLnJ1bGUoXCIuZm9udC1iaWdcIikpXHJcbiAgLm1lZGlhKFwic2NyZWVuXCIpXHJcbiAgLnByb3BzKHsgYm9yZGVyOiBcIndoaXRlIHNvbGlkIDNweFwiIH0pO1xyXG5cclxubXlTU1xyXG4gIC5ydWxlKFwiaDFcIilcclxuICAubWVkaWEoXCJwcmludFwiKVxyXG4gIC5wcm9wcyh7IGJvcmRlcjogXCJibGFjayBzb2xpZCAzIHB4XCIgfSk7XHJcblxyXG5jb25zb2xlLmxvZyhteVNTLmNzcygpKTtcclxubXlTUy5hdHRhY2goKTtcclxuIl0sIm5hbWVzIjpbIkNTU1J1bGUiLCJzZWxlY3RvciIsInByb3BlcnRpZXMiLCJNYXAiLCJleHRlbmRlcyIsIm1lZGlhcyIsIm5lc3RpZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwicnVsZSIsInB1c2giLCJnZXQiLCJzZXQiLCJmaW5kIiwicyIsInBhcmVudFNlbGVjdG9yIiwiYm9keSIsIkFycmF5IiwiZnJvbSIsIm1hcCIsImtleSIsInZhbHVlIiwiam9pbiIsImluY2x1ZGVzIiwicmVwbGFjZSIsImxlbmd0aCIsInIiLCJ0b1N0cmluZyIsIm5lc3QiLCJuIiwic3R5bGVTaGVldCIsInJ1bGVzIiwicHJvcHMiLCJzdHlsZUVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJjc3MiLCJteVN0eWxlIiwiaGVhZCIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJzZXRQYWRkaW5ncyIsIm15U1MiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJtaXhpbiIsIm1peGlucyIsImV4dGVuZCIsIm1lZGlhIiwiYm9yZGVyIiwiY29uc29sZSIsImxvZyIsImF0dGFjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBOzs7bUJBQ1BDLFFBQVosRUFBc0I7OztTQUNmQSxRQUFMLEdBQWdCQSxRQUFoQjtTQUNLQyxVQUFMLEdBQWtCLElBQUlDLEdBQUosRUFBbEI7U0FDS0MsUUFBTCxHQUFnQixFQUFoQjtTQUNLQyxNQUFMLEdBQWMsSUFBSUYsR0FBSixFQUFkO1NBQ0tHLE9BQUwsR0FBZSxFQUFmOzs7OzswQkFHSUosWUFBWTtXQUNYQSxVQUFMLEdBQWtCLElBQUlDLEdBQUosOEJBQ2IsS0FBS0QsVUFEUSxzQkFFYkssTUFBTSxDQUFDQyxPQUFQLENBQWVOLFVBQWYsQ0FGYSxHQUFsQjthQUlPLElBQVA7Ozs7MkJBR0tPLE1BQU07TUFDWEEsSUFBSSxDQUFDTCxRQUFMLENBQWNNLElBQWQsQ0FBbUIsSUFBbkI7YUFDTyxJQUFQOzs7OzBCQUdJVCxVQUFVO1VBQ1ZRLElBQUksR0FBRyxLQUFLSixNQUFMLENBQVlNLEdBQVosQ0FBZ0JWLFFBQWhCLENBQVg7VUFDSVEsSUFBSixFQUFVLE9BQU9BLElBQVA7TUFDVkEsSUFBSSxHQUFHLElBQUlULE9BQUosQ0FBWSxLQUFLQyxRQUFqQixDQUFQO1dBQ0tJLE1BQUwsQ0FBWU8sR0FBWixDQUFnQlgsUUFBaEIsRUFBMEJRLElBQTFCO2FBQ09BLElBQVA7Ozs7eUJBR0dSLFVBQVU7VUFDVFEsSUFBSSxHQUFHLEtBQUtILE9BQUwsQ0FBYU8sSUFBYixDQUFrQixV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
