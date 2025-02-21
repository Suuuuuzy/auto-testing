var r = require("../@babel/runtime/helpers/createForOfIteratorHelper");
!(function () {
  var t;
  function e(r, t) {
    for (var e = 0, a = r.height, n = 0; n < a && u(o(n, r), o(n, t)); n++) e++;
    return e === a && (e = 0), e;
  }
  function a(r, t) {
    console.log("Begin to find the down bounds");
    for (
      var e = r.height, a = e, n = e - 1;
      n > e / 2 && u(o(n, r), o(n, t));
      n--
    )
      a--;
    return a === Math.floor(e / 2 + 1) && (a = e), a;
  }
  function n(r, t, e, a) {
    var n = e + 1,
      o = [],
      u = [],
      h = 999999,
      l = 0,
      v = 10;
    u.push({ src: n, target: i(r, t, n, e, a) });
    for (var s = 0; s < v; ) {
      var c = n + 12 * (s + 1);
      if (c > a) break;
      var g = i(r, t, c, e + 12 * (s + 1), a);
      if (
        (u.push({ src: c, target: g }),
        o.push(u[s + 1].target - u[s].target),
        s >= 0)
      ) {
        var d = o.slice(s - 1 + 1, s + 1),
          b = 9999999;
        if (
          (g - c > 80 ? (b = f(d, 12)) : v++,
          b < h && ((h = b), (l = s - 1 + 1)),
          h < 5)
        )
          break;
      }
      s++;
    }
    return { head: (n = u[l].src), tail: u[l].target };
  }
  function i(r, t, e, a, n) {
    for (var i = o(e, t), f = 0, u = -1, l = n; l > a; l--) {
      var v = h(i, o(l, r));
      if (v > f) (f = v), (u = l);
      else if (f > 0.9999999) break;
    }
    return u;
  }
  function o(r, t) {
    var e = t.width;
    return t.data.slice(r * e * 4, (r + 1) * e * 4);
  }
  function f(e, a) {
    var n,
      i = 0 + t,
      o = r(e);
    try {
      for (o.s(); !(n = o.n()).done; ) {
        i += l = n.value;
      }
    } catch (r) {
      o.e(r);
    } finally {
      o.f();
    }
    var f,
      u = (i - t) / e.length,
      h = r(((i = 0), e));
    try {
      for (h.s(); !(f = h.n()).done; ) {
        var l;
        i += ((l = f.value) - u) * (l - u);
      }
    } catch (r) {
      h.e(r);
    } finally {
      h.f();
    }
    var v = i / e.length;
    return Math.abs(u - a) + Math.abs(v);
  }
  function u(r, t) {
    return h(r, t) > 0.99;
  }
  function h(r, t) {
    for (var e = 0, a = 0, n = 0, i = 0; i < r.length; i++)
      if (i % 4 != 3) {
        var o = r[i] / 255,
          f = t[i] / 255;
        (e += o * f), (a += o * o), (n += f * f);
      }
    return e / (Math.sqrt(a) * Math.sqrt(n));
  }
  module.exports = function (r) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    if (!(t = i)) return 0;
    var o = r[0].height,
      f = new Array();
    f.push({ head: 0 });
    for (var u = 0; u < r.length - 1; u++) {
      var h = r[u],
        l = r[u + 1],
        v = e(h, l),
        s = a(h, l),
        c = n(h, l, v, s),
        g = c.head,
        d = c.tail;
      (f[u].tail = d), f.push({ head: g });
    }
    return (f[r.length - 1].tail = o - 1), f;
  };
})();
