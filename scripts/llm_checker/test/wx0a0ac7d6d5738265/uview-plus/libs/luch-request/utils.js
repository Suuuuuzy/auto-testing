var e = require("../../../@babel/runtime/helpers/typeof"),
  t = Object.prototype.toString;
function r(e) {
  return "[object Array]" === t.call(e);
}
function n(t, n) {
  if (!(null === t || e(t) > "u"))
    if (("object" != e(t) && (t = [t]), r(t)))
      for (var o = 0, c = t.length; o < c; o++) n.call(null, t[o], o, t);
    else
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && n.call(null, t[a], a, t);
}
(exports.deepMerge = function t() {
  var r = {};
  function o(n, o) {
    "object" == e(r[o]) && "object" == e(n)
      ? (r[o] = t(r[o], n))
      : "object" == e(n)
      ? (r[o] = t({}, n))
      : (r[o] = n);
  }
  for (var c = 0, a = arguments.length; c < a; c++) n(arguments[c], o);
  return r;
}),
  (exports.forEach = n),
  (exports.isArray = r),
  (exports.isDate = function (e) {
    return "[object Date]" === t.call(e);
  }),
  (exports.isObject = function (t) {
    return null !== t && "object" == e(t);
  }),
  (exports.isPlainObject = function (e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }),
  (exports.isURLSearchParams = function (t) {
    return (
      ("undefined" == typeof URLSearchParams
        ? "undefined"
        : e(URLSearchParams)) < "u" && t instanceof URLSearchParams
    );
  }),
  (exports.isUndefined = function (t) {
    return e(t) > "u";
  });
