function r(r) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
    n = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if ((r = String(r).toLowerCase()) && n.test(r)) {
    if (4 === r.length) {
      for (var e = "#", a = 1; a < 4; a += 1)
        e += r.slice(a, a + 1).concat(r.slice(a, a + 1));
      r = e;
    }
    for (var o = [], c = 1; c < 7; c += 2)
      o.push(parseInt("0x".concat(r.slice(c, c + 2))));
    return t ? "rgb(".concat(o[0], ",").concat(o[1], ",").concat(o[2], ")") : o;
  }
  return /^(rgb|RGB)/.test(r)
    ? r
        .replace(/(?:\(|\)|rgb|RGB)*/g, "")
        .split(",")
        .map(function (r) {
          return Number(r);
        })
    : r;
}
function t(r) {
  var t = r;
  if (/^(rgb|RGB)/.test(t)) {
    for (
      var n = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), e = "#", a = 0;
      a < n.length;
      a++
    ) {
      var o = Number(n[a]).toString(16);
      "0" === (o = 1 == String(o).length ? "0".concat(o) : o) && (o += o),
        (e += o);
    }
    return 7 !== e.length && (e = t), e;
  }
  if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) return t;
  var c = t.replace(/#/, "").split("");
  if (6 === c.length) return t;
  if (3 === c.length) {
    for (var i = "#", f = 0; f < c.length; f += 1) i += c[f] + c[f];
    return i;
  }
}
var n = {
  colorGradient: function () {
    for (
      var n =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : "rgb(0, 0, 0)",
        e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "rgb(255, 255, 255)",
        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10,
        o = r(n, !1),
        c = o[0],
        i = o[1],
        f = o[2],
        g = r(e, !1),
        l = g[0],
        s = g[1],
        u = g[2],
        h = (l - c) / a,
        v = (s - i) / a,
        b = (u - f) / a,
        p = [],
        d = 0;
      d < a;
      d++
    ) {
      var A = t(
        "rgb("
          .concat(Math.round(h * d + c), ",")
          .concat(Math.round(v * d + i), ",")
          .concat(Math.round(b * d + f), ")")
      );
      0 === d && (A = t(n)), d === a - 1 && (A = t(e)), p.push(A);
    }
    return p;
  },
  hexToRgb: r,
  rgbToHex: t,
  colorToRgba: function (r, n) {
    r = t(r);
    var e = String(r).toLowerCase();
    if (e && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)) {
      if (4 === e.length) {
        for (var a = "#", o = 1; o < 4; o += 1)
          a += e.slice(o, o + 1).concat(e.slice(o, o + 1));
        e = a;
      }
      for (var c = [], i = 1; i < 7; i += 2)
        c.push(parseInt("0x".concat(e.slice(i, i + 2))));
      return "rgba(".concat(c.join(","), ",").concat(n, ")");
    }
    return e;
  },
};
exports.colorGradient = n;
