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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function getCssRuleStr(selector, bodyObj) {
  return "".concat(selector, " {\n").concat(getBodyStr(bodyObj), "\n}");
}

function getBodyStr(bodyObj) {
  return Object.entries(bodyObj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    return "  ".concat(name, ": ").concat(value, ";");
  }).join("\n");
}

var styleSheet =
/*#__PURE__*/
function () {
  function styleSheet(styles) {
    _classCallCheck(this, styleSheet);

    this.styles = styles;
  }

  _createClass(styleSheet, [{
    key: "css",
    value: function css() {
      return Object.entries(this.styles).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            selector = _ref4[0],
            body = _ref4[1];

        return getCssRuleStr(selector, body);
      }).join("\n\n");
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

function mix (mixObj) {
  return function (bodyObj) {
    return Object.assign(bodyObj, mixObj);
  };
}

var mixins = {
  setPaddings: function setPaddings(value) {
    return mix({
      "padding-left": value,
      "padding-right": value,
      "padding-botttom": value,
      "padding-top": value
    });
  }
};

var style = {
  body: mixins.setPaddings("0px")({
    padding: "0px",
    color: "blue",
    background: "yellow"
  }),
  h1: mixins.setPaddings("100px")({
    "font-size": "100px"
  })
};

var mySS = new styleSheet(style);
console.log(mySS.css());
mySS.attach();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlcyI6WyJzcmMvanMvc3MuanMiLCJzcmMvanMvbWl4LmpzIiwic3JjL2pzL21peGlucy5qcyIsInNyYy9qcy9zdHlsZS5qcyIsInNyYy9qcy9jc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Q3NzUnVsZVN0cihzZWxlY3RvciwgYm9keU9iaikge1xyXG4gIHJldHVybiBgJHtzZWxlY3Rvcn0ge1xcbiR7Z2V0Qm9keVN0cihib2R5T2JqKX1cXG59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9keVN0cihib2R5T2JqKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGJvZHlPYmopXHJcbiAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgICAke25hbWV9OiAke3ZhbHVlfTtgKVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0eWxlU2hlZXQge1xyXG4gIGNvbnN0cnVjdG9yKHN0eWxlcykge1xyXG4gICAgdGhpcy5zdHlsZXMgPSBzdHlsZXM7XHJcbiAgfVxyXG5cclxuICBjc3MoKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5zdHlsZXMpXHJcbiAgICAgIC5tYXAoKFtzZWxlY3RvciwgYm9keV0pID0+IGdldENzc1J1bGVTdHIoc2VsZWN0b3IsIGJvZHkpKVxyXG4gICAgICAuam9pbihcIlxcblxcblwiKTtcclxuICB9XHJcblxyXG4gIGF0dGFjaCgpIHtcclxuICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gdGhpcy5jc3MoKTtcclxuICAgIGNvbnN0IG15U3R5bGUgPSBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xyXG4gICAgcmV0dXJuIG15U3R5bGUuc2hlZXQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1peE9iaikge1xyXG4gIHJldHVybiBmdW5jdGlvbihib2R5T2JqKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihib2R5T2JqLCBtaXhPYmopO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IG1peCBmcm9tIFwiLi9taXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXRQYWRkaW5ncyh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG1peCh7XHJcbiAgICAgIFwicGFkZGluZy1sZWZ0XCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctcmlnaHRcIjogdmFsdWUsXHJcbiAgICAgIFwicGFkZGluZy1ib3R0dG9tXCI6IHZhbHVlLFxyXG4gICAgICBcInBhZGRpbmctdG9wXCI6IHZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsImltcG9ydCBtaXhpbnMgZnJvbSBcIi4vbWl4aW5zLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBib2R5OiBtaXhpbnMuc2V0UGFkZGluZ3MoXCIwcHhcIikoe1xyXG4gICAgcGFkZGluZzogXCIwcHhcIixcclxuICAgIGNvbG9yOiBcImJsdWVcIixcclxuICAgIGJhY2tncm91bmQ6IFwieWVsbG93XCJcclxuICB9KSxcclxuICBoMTogbWl4aW5zLnNldFBhZGRpbmdzKFwiMTAwcHhcIikoe1xyXG4gICAgXCJmb250LXNpemVcIjogXCIxMDBweFwiXHJcbiAgfSlcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCBzdHlsZVNoZWV0IGZyb20gXCIuL3NzLmpzXCI7XHJcbmltcG9ydCBzdHlsZSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xyXG5cclxuY29uc3QgbXlTUyA9IG5ldyBzdHlsZVNoZWV0KHN0eWxlKTtcclxuXHJcbmNvbnNvbGUubG9nKG15U1MuY3NzKCkpO1xyXG5teVNTLmF0dGFjaCgpO1xyXG4iXSwibmFtZXMiOlsiZ2V0Q3NzUnVsZVN0ciIsInNlbGVjdG9yIiwiYm9keU9iaiIsImdldEJvZHlTdHIiLCJPYmplY3QiLCJlbnRyaWVzIiwibWFwIiwibmFtZSIsInZhbHVlIiwiam9pbiIsInN0eWxlU2hlZXQiLCJzdHlsZXMiLCJib2R5Iiwic3R5bGVFbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiY3NzIiwibXlTdHlsZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInNoZWV0IiwibWl4T2JqIiwiYXNzaWduIiwic2V0UGFkZGluZ3MiLCJtaXgiLCJtaXhpbnMiLCJwYWRkaW5nIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiaDEiLCJteVNTIiwic3R5bGUiLCJjb25zb2xlIiwibG9nIiwiYXR0YWNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxhQUFULENBQXVCQyxRQUF2QixFQUFpQ0MsT0FBakMsRUFBMEM7bUJBQzlCRCxRQUFWLGlCQUF5QkUsVUFBVSxDQUFDRCxPQUFELENBQW5DOzs7QUFHRixTQUFTQyxVQUFULENBQW9CRCxPQUFwQixFQUE2QjtTQUNwQkUsTUFBTSxDQUFDQyxPQUFQLENBQWVILE9BQWYsRUFDSkksR0FESSxDQUNBOztRQUFFQyxJQUFGO1FBQVFDLEtBQVI7O3VCQUF3QkQsSUFBeEIsZUFBaUNDLEtBQWpDO0dBREEsRUFFSkMsSUFGSSxDQUVDLElBRkQsQ0FBUDs7O0lBS21CQzs7O3NCQUNQQyxNQUFaLEVBQW9COzs7U0FDYkEsTUFBTCxHQUFjQSxNQUFkOzs7OzswQkFHSTthQUNHUCxNQUFNLENBQUNDLE9BQVAsQ0FBZSxLQUFLTSxNQUFwQixFQUNKTCxHQURJLENBQ0E7O1lBQUVMLFFBQUY7WUFBWVcsSUFBWjs7ZUFBc0JaLGFBQWEsQ0FBQ0MsUUFBRCxFQUFXVyxJQUFYLENBQW5DO09BREEsRUFFSkgsSUFGSSxDQUVDLE1BRkQsQ0FBUDs7Ozs2QkFLTztVQUNESSxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFoQjtNQUNBRixPQUFPLENBQUNHLFdBQVIsR0FBc0IsS0FBS0MsR0FBTCxFQUF0QjtVQUNNQyxPQUFPLEdBQUdKLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjQyxXQUFkLENBQTBCUCxPQUExQixDQUFoQjthQUNPSyxPQUFPLENBQUNHLEtBQWY7Ozs7Ozs7QUN6QlcsY0FBU0MsTUFBVCxFQUFpQjtTQUN2QixVQUFTcEIsT0FBVCxFQUFrQjtXQUNoQkUsTUFBTSxDQUFDbUIsTUFBUCxDQUFjckIsT0FBZCxFQUF1Qm9CLE1BQXZCLENBQVA7R0FERjs7O0FDQ0YsYUFBZTtFQUNiRSxXQURhLHVCQUNEaEIsS0FEQyxFQUNNO1dBQ1ZpQixHQUFHLENBQUM7c0JBQ09qQixLQURQO3VCQUVRQSxLQUZSO3lCQUdVQSxLQUhWO3FCQUlNQTtLQUpQLENBQVY7O0NBRko7O0FDREEsWUFBZTtFQUNiSSxJQUFJLEVBQUVjLE1BQU0sQ0FBQ0YsV0FBUCxDQUFtQixLQUFuQixFQUEwQjtJQUM5QkcsT0FBTyxFQUFFLEtBRHFCO0lBRTlCQyxLQUFLLEVBQUUsTUFGdUI7SUFHOUJDLFVBQVUsRUFBRTtHQUhSLENBRE87RUFNYkMsRUFBRSxFQUFFSixNQUFNLENBQUNGLFdBQVAsQ0FBbUIsT0FBbkIsRUFBNEI7aUJBQ2pCO0dBRFg7Q0FOTjs7QUNHQSxJQUFNTyxJQUFJLEdBQUcsSUFBSXJCLFVBQUosQ0FBZXNCLEtBQWYsQ0FBYjtBQUVBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsSUFBSSxDQUFDZCxHQUFMLEVBQVo7QUFDQWMsSUFBSSxDQUFDSSxNQUFMIn0=
