var e = require("../../../@babel/runtime/helpers/slicedToArray");
require("../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../@babel/runtime/helpers/typeof"),
  n = require("../../../common/vendor.js"),
  r = require("./test.js"),
  o = require("./digit.js");
function i(e) {
  if (
    [null, void 0, NaN, !1].includes(e) ||
    ("object" != t(e) && "function" != typeof e)
  )
    return e;
  var n = r.test.array(e) ? [] : {};
  for (var o in e)
    e.hasOwnProperty(o) && (n[o] = "object" == t(e[o]) ? i(e[o]) : e[o]);
  return n;
}
function a() {
  var t,
    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
    r =
      arguments.length > 1 && void 0 !== arguments[1]
        ? arguments[1]
        : "yyyy-mm-dd",
    o = {
      y: (t = n
        ? /^\d{10}$/.test(n.toString().trim())
          ? new Date(1e3 * n)
          : "string" == typeof n && /^\d+$/.test(n.trim())
          ? new Date(Number(n))
          : new Date("string" == typeof n ? n.replace(/-/g, "/") : n)
        : new Date())
        .getFullYear()
        .toString(),
      m: (t.getMonth() + 1).toString().padStart(2, "0"),
      d: t.getDate().toString().padStart(2, "0"),
      h: t.getHours().toString().padStart(2, "0"),
      M: t.getMinutes().toString().padStart(2, "0"),
      s: t.getSeconds().toString().padStart(2, "0"),
    };
  for (var i in o) {
    var a = new RegExp("".concat(i, "+")).exec(r) || [],
      c = e(a, 1),
      u = c[0];
    if (u) {
      var s = "y" === i && 2 === u.length ? 2 : 0;
      r = r.replace(u, o[i].slice(s));
    }
  }
  return r;
}
function c(e) {
  var t =
    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "both";
  return (
    (e = String(e)),
    "both" == t
      ? e.replace(/^\s+|\s+$/g, "")
      : "left" == t
      ? e.replace(/^\s*/, "")
      : "right" == t
      ? e.replace(/(\s*$)/g, "")
      : "all" == t
      ? e.replace(/\s+/g, "")
      : e
  );
}
String.prototype.padStart ||
  (String.prototype.padStart = function (e) {
    var t =
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
    if ("[object String]" !== Object.prototype.toString.call(t))
      throw new TypeError("fillString must be String");
    var n = this;
    if (n.length >= e) return String(n);
    for (var r = e - n.length, o = Math.ceil(r / t.length); (o >>= 1); )
      (t += t), 1 === o && (t += t);
    return t.slice(0, r) + n;
  });
var u = {
  range: function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    return Math.max(e, Math.min(t, Number(n)));
  },
  getPx: function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return r.test.number(e)
      ? t
        ? "".concat(e, "px")
        : Number(e)
      : /(rpx|upx)$/.test(e)
      ? t
        ? "".concat(n.index.upx2px(parseInt(e)), "px")
        : Number(n.index.upx2px(parseInt(e)))
      : t
      ? "".concat(parseInt(e), "px")
      : parseInt(e);
  },
  sleep: function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 30;
    return new Promise(function (t) {
      setTimeout(function () {
        t();
      }, e);
    });
  },
  os: function () {
    return n.index.getSystemInfoSync().platform.toLowerCase();
  },
  sys: function () {
    return n.index.getSystemInfoSync();
  },
  random: function (e, t) {
    if (e >= 0 && t > 0 && t >= e) {
      var n = t - e + 1;
      return Math.floor(Math.random() * n + e);
    }
    return 0;
  },
  guid: function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32,
      t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
      r =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
          ""
        ),
      o = [];
    if (((n = n || r.length), e))
      for (var i = 0; i < e; i++) o[i] = r[0 | (Math.random() * n)];
    else {
      var a;
      (o[8] = o[13] = o[18] = o[23] = "-"), (o[14] = "4");
      for (var c = 0; c < 36; c++)
        o[c] ||
          ((a = 0 | (16 * Math.random())),
          (o[c] = r[19 == c ? (3 & a) | 8 : a]));
    }
    return t ? (o.shift(), "u".concat(o.join(""))) : o.join("");
  },
  $parent: function () {
    for (
      var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : void 0,
        t = this.$parent;
      t;

    ) {
      if (!t.$options || t.$options.name === e) return t;
      t = t.$parent;
    }
    return !1;
  },
  addStyle: function (e) {
    var n =
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "object";
    if (
      r.test.empty(e) ||
      ("object" == t(e) && "object" === n) ||
      ("string" === n && "string" == typeof e)
    )
      return e;
    if ("object" === n) {
      for (var o = (e = c(e)).split(";"), i = {}, a = 0; a < o.length; a++)
        if (o[a]) {
          var u = o[a].split(":");
          i[c(u[0])] = c(u[1]);
        }
      return i;
    }
    var s = "";
    for (var l in e) {
      var f = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      s += "".concat(f, ":").concat(e[l], ";");
    }
    return c(s);
  },
  addUnit: function () {
    var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "auto",
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return (
      t || (t = n.index.$u.config.unit || "px"),
      (e = String(e)),
      r.test.number(e) ? "".concat(e).concat(t) : e
    );
  },
  deepClone: i,
  deepMerge: function e() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (((n = i(n)), "object" != t(n) || "object" != t(r))) return !1;
    for (var o in r)
      r.hasOwnProperty(o) &&
        (o in n
          ? null == r[o] || "object" != t(n[o]) || "object" != t(r[o])
            ? (n[o] = r[o])
            : n[o].concat && r[o].concat
            ? (n[o] = n[o].concat(r[o]))
            : (n[o] = e(n[o], r[o]))
          : (n[o] = r[o]));
    return n;
  },
  error: function (e) {
    console.error("uView提示：".concat(e));
  },
  randomArray: function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return e.sort(function () {
      return Math.random() - 0.5;
    });
  },
  timeFormat: a,
  timeFrom: function () {
    var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "yyyy-mm-dd";
    null == e && (e = Number(new Date())),
      10 == (e = parseInt(e)).toString().length && (e *= 1e3);
    var n = new Date().getTime() - e,
      r = "";
    switch (!0) {
      case (n = parseInt(n / 1e3)) < 300:
        r = "刚刚";
        break;
      case n >= 300 && n < 3600:
        r = "".concat(parseInt(n / 60), "分钟前");
        break;
      case n >= 3600 && n < 86400:
        r = "".concat(parseInt(n / 3600), "小时前");
        break;
      case n >= 86400 && n < 2592e3:
        r = "".concat(parseInt(n / 86400), "天前");
        break;
      default:
        r =
          !1 === t
            ? n >= 2592e3 && n < 31536e3
              ? "".concat(parseInt(n / 2592e3), "个月前")
              : "".concat(parseInt(n / 31536e3), "年前")
            : a(e, t);
    }
    return r;
  },
  trim: c,
  queryParams: function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
      n =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : "brackets",
      r = t ? "?" : "",
      o = [];
    -1 == ["indices", "brackets", "repeat", "comma"].indexOf(n) &&
      (n = "brackets");
    var i = function (t) {
      var r = e[t];
      if (!(["", void 0, null].indexOf(r) >= 0))
        if (r.constructor === Array)
          switch (n) {
            case "indices":
              for (var i = 0; i < r.length; i++)
                o.push("".concat(t, "[").concat(i, "]=").concat(r[i]));
              break;
            case "brackets":
              r.forEach(function (e) {
                o.push("".concat(t, "[]=").concat(e));
              });
              break;
            case "repeat":
              r.forEach(function (e) {
                o.push("".concat(t, "=").concat(e));
              });
              break;
            case "comma":
              var a = "";
              r.forEach(function (e) {
                a += (a ? "," : "") + e;
              }),
                o.push("".concat(t, "=").concat(a));
              break;
            default:
              r.forEach(function (e) {
                o.push("".concat(t, "[]=").concat(e));
              });
          }
        else o.push("".concat(t, "=").concat(r));
    };
    for (var a in e) i(a);
    return o.length ? r + o.join("&") : "";
  },
  toast: function (e) {
    var t =
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3;
    n.index.showToast({ title: String(e), icon: "none", duration: t });
  },
  type2icon: function () {
    var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "success",
      t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    -1 == ["primary", "info", "error", "warning", "success"].indexOf(e) &&
      (e = "success");
    var n = "";
    switch (e) {
      case "primary":
      case "info":
        n = "info-circle";
        break;
      case "error":
        n = "close-circle";
        break;
      case "warning":
        n = "error-circle";
        break;
      case "success":
        n = "checkmark-circle";
        break;
      default:
        n = "checkmark-circle";
    }
    return t && (n += "-fill"), n;
  },
  priceFormat: function (e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".",
      i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ",";
    e = "".concat(e).replace(/[^0-9+-Ee.]/g, "");
    var a = isFinite(+e) ? +e : 0,
      c = isFinite(+n) ? Math.abs(n) : 0,
      u = t(i) > "u" ? "," : i,
      s = t(r) > "u" ? "." : r,
      l = "";
    l = (c ? o.round(a, c) + "" : "".concat(Math.round(a))).split(".");
    for (var f = /(-?\d+)(\d{3})/; f.test(l[0]); )
      l[0] = l[0].replace(f, "$1".concat(u, "$2"));
    return (
      (l[1] || "").length < c &&
        ((l[1] = l[1] || ""),
        (l[1] += new Array(c - l[1].length + 1).join("0"))),
      l.join(s)
    );
  },
  getDuration: function (e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
      n = parseInt(e);
    return t
      ? /s$/.test(e)
        ? e
        : "".concat(e, e > 30 ? "ms" : "s")
      : /ms$/.test(e)
      ? n
      : /s$/.test(e)
      ? n > 30
        ? n
        : 1e3 * n
      : n;
  },
  padZero: function (e) {
    return "00".concat(e).slice(-2);
  },
  formValidate: function (e, t) {
    var r = n.index.$u.$parent.call(e, "u-form-item"),
      o = n.index.$u.$parent.call(e, "u-form");
    r && o && o.validateField(r.prop, function () {}, t);
  },
  getProperty: function (e, t) {
    if (e) {
      if ("string" != typeof t || "" === t) return "";
      if (-1 !== t.indexOf(".")) {
        for (var n = t.split("."), r = e[n[0]] || {}, o = 1; o < n.length; o++)
          r && (r = r[n[o]]);
        return r;
      }
      return e[t];
    }
  },
  setProperty: function (e, n, r) {
    if (e) {
      if ("string" == typeof n && "" !== n)
        if (-1 !== n.indexOf(".")) {
          !(function e(n, r, o) {
            if (1 !== r.length)
              for (; r.length > 1; ) {
                var i = r[0];
                (!n[i] || "object" != t(n[i])) && (n[i] = {}),
                  r.shift(),
                  e(n[i], r, o);
              }
            else n[r[0]] = o;
          })(e, n.split("."), r);
        } else e[n] = r;
    }
  },
  page: function () {
    var e = getCurrentPages();
    return "/".concat(e[e.length - 1].route || "");
  },
  pages: function () {
    return getCurrentPages();
  },
  setConfig: function (e) {
    var t = e.props,
      r = void 0 === t ? {} : t,
      o = e.config,
      i = void 0 === o ? {} : o,
      a = e.color,
      c = void 0 === a ? {} : a,
      u = e.zIndex,
      s = void 0 === u ? {} : u,
      l = n.index.$u.deepMerge;
    (n.index.$u.config = l(n.index.$u.config, i)),
      (n.index.$u.props = l(n.index.$u.props, r)),
      (n.index.$u.color = l(n.index.$u.color, c)),
      (n.index.$u.zIndex = l(n.index.$u.zIndex, s));
  },
};
exports.index = u;
