var e = function (e) {
    return (e = e.toString())[1] ? e : "0" + e;
  },
  t = function (e, t) {
    var n = {
      "M+": e.getMonth() + 1,
      "d+": e.getDate(),
      "h+": e.getHours(),
      "m+": e.getMinutes(),
      "s+": e.getSeconds(),
      "q+": Math.floor((e.getMonth() + 3) / 3),
      "S+": e.getMilliseconds(),
    };
    for (var r in (/(y+)/i.test(t) &&
      (t = t.replace(
        RegExp.$1,
        String(e.getFullYear()).substr(4 - RegExp.$1.length)
      )),
    n))
      new RegExp("(" + r + ")").test(t) &&
        (t = t.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? n[r]
            : ("00" + n[r]).substr(String(n[r]).length)
        ));
    return t;
  };
module.exports = {
  throttle: function (e, t) {
    (null != t && null != t) || (t = 1500);
    var n = null;
    return function () {
      var r = +new Date();
      (r - n > t || !n) && (e.apply(this, arguments), (n = r));
    };
  },
  formatTime: function (t) {
    var n = t.getFullYear(),
      r = t.getMonth() + 1,
      g = t.getDate(),
      a = t.getHours(),
      o = t.getMinutes(),
      i = t.getSeconds();
    return [n, r, g].map(e).join("/") + " " + [a, o, i].map(e).join(":");
  },
  dateFormat: t,
  weekList: function (e) {
    for (
      var n =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "yyyy-MM-dd",
        r = 864e5,
        g = new Date(e),
        a = g.getDay() || 7,
        o = new Date(g.getTime() - r * (a - 1)),
        i = new Array(),
        u = 0;
      u < 7;
      u++
    ) {
      var l = new Date(o.getTime() + u * r);
      i[u] = t(l, n);
    }
    return i;
  },
};
