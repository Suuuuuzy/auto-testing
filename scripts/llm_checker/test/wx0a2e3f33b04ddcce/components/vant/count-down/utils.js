function e(e) {
  for (
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2,
      o = e + "";
    o.length < r;

  )
    o = "0" + o;
  return o;
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.isSameSecond = function (e, r) {
    return Math.floor(e / 1e3) === Math.floor(r / 1e3);
  }),
  (exports.parseFormat = function (r, o) {
    var t = o.days,
      s = o.hours,
      n = o.minutes,
      a = o.seconds,
      l = o.milliseconds;
    -1 === r.indexOf("DD") ? (s += 24 * t) : (r = r.replace("DD", e(t)));
    -1 === r.indexOf("HH") ? (n += 60 * s) : (r = r.replace("HH", e(s)));
    -1 === r.indexOf("mm") ? (a += 60 * n) : (r = r.replace("mm", e(n)));
    -1 === r.indexOf("ss") ? (l += 1e3 * a) : (r = r.replace("ss", e(a)));
    return r.replace("SSS", e(l, 3));
  }),
  (exports.parseTimeData = function (e) {
    var r = Math.floor(e / 864e5),
      o = Math.floor((e % 864e5) / 36e5),
      t = Math.floor((e % 36e5) / 6e4),
      s = Math.floor((e % 6e4) / 1e3),
      n = Math.floor(e % 1e3);
    return { days: r, hours: o, minutes: t, seconds: s, milliseconds: n };
  });
