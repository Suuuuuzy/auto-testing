function t(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
    n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if (!t) return 0;
  var r = t.replace(/-/g, "/"),
    a = new Date();
  e && ((e = e.replace(/-/g, "/")), (a = new Date(e)));
  var u = new Date(r);
  return n
    ? (u.getTime() - a.getTime()) / 1e3
    : (a.getTime() - u.getTime()) / 1e3;
}
module.exports = {
  isChina: function (t) {
    return !!new RegExp("[\\u4E00-\\u9FFF]+", "g").test(t);
  },
  isEn: function (t) {
    return /^[A-Za-z]+$/.test(t);
  },
  strSimilarity: function (t, e) {
    var n = t.length > e.length ? t.length : e.length;
    return (
      100 *
      (
        1 -
        (function (t, e) {
          var n,
            r,
            a,
            u,
            i,
            s,
            o,
            c = t.length,
            f = e.length,
            l = [];
          if (0 == c) return f;
          if (0 == f) return c;
          for (n = 0; n <= c; n++) (l[n] = []), (l[n][0] = n);
          for (r = 0; r <= f; r++) l[0][r] = r;
          for (n = 1; n <= c; n++)
            for (a = t.charAt(n - 1), r = 1; r <= f; r++)
              (u = a == e.charAt(r - 1) ? 0 : 1),
                (l[n][r] =
                  ((i = l[n - 1][r] + 1),
                  (s = l[n][r - 1] + 1),
                  (o = l[n - 1][r - 1] + u),
                  i < s ? (i < o ? i : o) : s < o ? s : o));
          return l[c][f];
        })(t, e) /
          n
      ).toFixed(2)
    );
  },
  checkNum: function (t) {
    return !!/^[0-9]+.?[0-9]*$/.test(t);
  },
  getSecond: t,
  isNumber: function (t) {
    return "NaN" != parseFloat(t).toString();
  },
  isIntNum: function (t) {
    return !(!/ ^\d+$/.test(t) || !/^\-[1-9][0-9]*$/.test(t));
  },
  isSameDay: function (t, e) {
    (t = t.replace(/-/g, "/")), (e = e.replace(/-/g, "/"));
    var n = new Date(t),
      r = new Date(e);
    return n.setHours(0, 0, 0, 0) == r.setHours(0, 0, 0, 0);
  },
  formatSeconds: function (t) {
    var e = parseInt(t),
      n = 0,
      r = 0,
      a = 0;
    e > 60 &&
      ((n = parseInt(e / 60)),
      (e = parseInt(e % 60)),
      n > 60 &&
        ((r = parseInt(n / 60)),
        (n = parseInt(n % 60)),
        r > 24 && ((a = parseInt(r / 24)), (r = parseInt(r % 24)))));
    var u = "" + e < 10 ? "0" + parseInt(e) : parseInt(e);
    return (
      n > 0 && (u = (n < 10 ? "0" + parseInt(n) : parseInt(n)) + ":" + u),
      r > 0 && (u = parseInt(r) + ":" + u),
      a > 0 && (u = parseInt(a) + "天 " + u),
      u
    );
  },
  dateDifference: function (e, n) {
    var r = t(e, n),
      a = 0;
    return r && (a = Math.ceil(r / 86400)), a;
  },
  trim: function (t) {
    return t.replace(/\s+/g, "");
  },
  getUrlParam: function (t, e) {
    var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
      r = e.substr(e.indexOf("?") + 1).match(n);
    return console.log("r ---\x3e>", r), null != r ? unescape(r[2]) : null;
  },
  keepTwoDecimalFull: function (t) {
    var e = parseFloat(t);
    if (isNaN(e)) return alert("传递参数错误，请检查！"), !1;
    var n = (e = Math.round(100 * t) / 100).toString(),
      r = n.indexOf(".");
    for (r < 0 && ((r = n.length), (n += ".")); n.length <= r + 2; ) n += "0";
    return n;
  },
  rpx2px: function (t) {
    return (t * wx.getSystemInfoSync().screenWidth) / 750;
  },
  px2rpx: function (t) {
    return (750 * t) / wx.getSystemInfoSync().screenWidth;
  },
  getDistance: function (t, e, n, r) {
    var a = (t * Math.PI) / 180,
      u = (n * Math.PI) / 180,
      i = a - u,
      s = (e * Math.PI) / 180 - (r * Math.PI) / 180,
      o =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(i / 2), 2) +
              Math.cos(a) * Math.cos(u) * Math.pow(Math.sin(s / 2), 2)
          )
        );
    return (o *= 6378.137), (o = Math.round(1e4 * o) / 10);
  },
};
