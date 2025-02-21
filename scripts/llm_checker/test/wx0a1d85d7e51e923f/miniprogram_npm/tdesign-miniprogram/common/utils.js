Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unitConvert =
    exports.uniqueFactory =
    exports.toCamel =
    exports.throttle =
    exports.styles =
    exports.setIcon =
    exports.isUndefined =
    exports.isString =
    exports.isOverSize =
    exports.isObject =
    exports.isNumber =
    exports.isNull =
    exports.isDef =
    exports.isBool =
    exports.getRect =
    exports.getInstance =
    exports.getCurrentPage =
    exports.getCharacterLength =
    exports.getAnimationFrame =
    exports.debounce =
    exports.classNames =
    exports.chunk =
    exports.calcIcon =
    exports.addUnit =
      void 0);
var e = require("../../../@babel/runtime/helpers/defineProperty");
require("../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../@babel/runtime/helpers/toConsumableArray"),
  r = require("../../../@babel/runtime/helpers/typeof"),
  n = require("./config"),
  o = wx.getSystemInfoSync(),
  i =
    ((exports.debounce = function (e) {
      var t,
        r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
      return function () {
        for (
          var n = this, o = arguments.length, i = new Array(o), c = 0;
          c < o;
          c++
        )
          i[c] = arguments[c];
        t && clearTimeout(t),
          (t = setTimeout(function () {
            e.apply(n, i);
          }, r));
      };
    }),
    (exports.throttle = function (e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
        r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
        n = 0,
        o = null;
      return (
        r || (r = { leading: !0 }),
        function () {
          var i = Date.now();
          n || r.leading || (n = i);
          var c = t - (i - n),
            a = this;
          if (c <= 0) {
            o && (clearTimeout(o), (o = null)), (n = i);
            for (var s = arguments.length, u = new Array(s), l = 0; l < s; l++)
              u[l] = arguments[l];
            e.apply(a, u);
          }
        }
      );
    }),
    (exports.classNames = function e() {
      for (
        var n = {}.hasOwnProperty,
          o = [],
          i = arguments.length,
          c = new Array(i),
          a = 0;
        a < i;
        a++
      )
        c[a] = arguments[a];
      return (
        c.forEach(function (i) {
          if (i) {
            var c = r(i);
            if ("string" === c || "number" === c) o.push(i);
            else if (Array.isArray(i) && i.length) {
              var a = e.apply(void 0, t(i));
              a && o.push(a);
            } else if ("object" === c)
              for (var s in i) n.call(i, s) && i[s] && o.push(s);
          }
        }),
        o.join(" ")
      );
    }),
    (exports.styles = function (e) {
      return Object.keys(e)
        .map(function (t) {
          return "".concat(t, ": ").concat(e[t]);
        })
        .join("; ");
    }),
    (exports.getAnimationFrame = function (e, t) {
      return wx
        .createSelectorQuery()
        .in(e)
        .selectViewport()
        .boundingClientRect()
        .exec(function () {
          t();
        });
    }),
    (exports.getRect = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      return new Promise(function (n, o) {
        wx.createSelectorQuery()
          .in(e)
          [r ? "selectAll" : "select"](t)
          .boundingClientRect(function (e) {
            e ? n(e) : o(e);
          })
          .exec();
      });
    }),
    (exports.isNumber = function (e) {
      return /^\d+(\.\d+)?$/.test(e);
    })),
  c = (exports.isNull = function (e) {
    return null === e;
  }),
  a = (exports.isUndefined = function (e) {
    return void 0 === e;
  }),
  s = (exports.isDef = function (e) {
    return !a(e) && !c(e);
  }),
  u =
    ((exports.addUnit = function (e) {
      if (s(e)) return (e = String(e)), i(e) ? "".concat(e, "px") : e;
    }),
    (exports.getCharacterLength = function (e, t, r) {
      var n = String(null != t ? t : "");
      if (0 === n.length) return { length: 0, characters: "" };
      if ("maxcharacter" === e) {
        for (var o = 0, i = 0; i < n.length; i += 1) {
          var c = 0;
          if (
            o + (c = n.charCodeAt(i) > 127 || 94 === n.charCodeAt(i) ? 2 : 1) >
            r
          )
            return { length: o, characters: n.slice(0, i) };
          o += c;
        }
        return { length: o, characters: n };
      }
      if ("maxlength" === e) {
        var a = n.length > r ? r : n.length;
        return { length: a, characters: n.slice(0, a) };
      }
      return { length: n.length, characters: n };
    }),
    (exports.chunk = function (e, t) {
      return Array.from({ length: Math.ceil(e.length / t) }, function (r, n) {
        return e.slice(n * t, n * t + t);
      });
    }),
    (exports.getInstance = function (e, t) {
      if (!e) {
        var r = getCurrentPages(),
          n = r[r.length - 1];
        e = n.$$basePage || n;
      }
      var o = e ? e.selectComponent(t) : null;
      return o || (console.warn("未找到组件,请检查selector是否正确"), null);
    }),
    (exports.unitConvert = function (e) {
      var t;
      return "string" == typeof e
        ? e.includes("rpx")
          ? (parseInt(e, 10) *
              (null !== (t = null == o ? void 0 : o.screenWidth) && void 0 !== t
                ? t
                : 750)) /
            750
          : parseInt(e, 10)
        : e;
    }),
    (exports.setIcon = function (t, n, o) {
      return n
        ? "string" == typeof n
          ? e(e({}, "".concat(t, "Name"), n), "".concat(t, "Data"), {})
          : "object" === r(n)
          ? e(e({}, "".concat(t, "Name"), ""), "".concat(t, "Data"), n)
          : e(e({}, "".concat(t, "Name"), o), "".concat(t, "Data"), {})
        : e(e({}, "".concat(t, "Name"), ""), "".concat(t, "Data"), {});
    }),
    (exports.isBool = function (e) {
      return "boolean" == typeof e;
    })),
  l = (exports.isObject = function (e) {
    return "object" === r(e) && null != e;
  }),
  p = (exports.isString = function (e) {
    return "string" == typeof e;
  });
(exports.toCamel = function (e) {
  return e.replace(/-(\w)/g, function (e, t) {
    return t.toUpperCase();
  });
}),
  (exports.getCurrentPage = function () {
    var e = getCurrentPages();
    return e[e.length - 1];
  }),
  (exports.uniqueFactory = function (e) {
    var t = 0;
    return function () {
      return "".concat(n.prefix, "_").concat(e, "_").concat(t++);
    };
  }),
  (exports.calcIcon = function (e, t) {
    return (u(e) && e && t) || p(e) ? { name: u(e) ? t : e } : l(e) ? e : null;
  }),
  (exports.isOverSize = function (e, t) {
    var r;
    if (!t) return !1;
    var n = { B: 1, KB: 1e3, MB: 1e6, GB: 1e9 };
    return (
      e >
      ("number" == typeof t
        ? 1e3 * t
        : (null == t ? void 0 : t.size) *
          n[
            null !== (r = null == t ? void 0 : t.unit) && void 0 !== r
              ? r
              : "KB"
          ])
    );
  });
