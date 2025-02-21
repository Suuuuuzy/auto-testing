var r = require("../../../@babel/runtime/helpers/toArray");
function n(r) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15;
  return +parseFloat(Number(r).toPrecision(n));
}
function t(r) {
  var n = r.toString().split(/[eE]/),
    t = (n[0].split(".")[1] || "").length - +(n[1] || 0);
  return t > 0 ? t : 0;
}
function e(r) {
  if (-1 === r.toString().indexOf("e"))
    return Number(r.toString().replace(".", ""));
  var e = t(r);
  return e > 0 ? n(Number(r) * Math.pow(10, e)) : Number(r);
}
function o(r) {
  (r > Number.MAX_SAFE_INTEGER || r < Number.MIN_SAFE_INTEGER) &&
    console.warn("".concat(r, " 超出了精度限制，结果可能不正确"));
}
function u(n, t) {
  var e = r(n),
    o = e[0],
    u = e[1],
    a = e.slice(2),
    i = t(o, u);
  return (
    a.forEach(function (r) {
      i = t(i, r);
    }),
    i
  );
}
function a() {
  for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
    n[i] = arguments[i];
  if (n.length > 2) return u(n, a);
  var c = n[0],
    f = n[1],
    h = e(c),
    l = e(f),
    s = t(c) + t(f),
    v = h * l;
  return o(v), v / Math.pow(10, s);
}
function i() {
  for (var r = arguments.length, c = new Array(r), f = 0; f < r; f++)
    c[f] = arguments[f];
  if (c.length > 2) return u(c, i);
  var h = c[0],
    l = c[1],
    s = e(h),
    v = e(l);
  return o(s), o(v), a(s / v, n(Math.pow(10, t(l) - t(h))));
}
exports.round = function (r, n) {
  var t = Math.pow(10, n),
    e = i(Math.round(Math.abs(a(r, t))), t);
  return r < 0 && 0 !== e && (e = a(e, -1)), e;
};
