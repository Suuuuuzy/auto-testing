Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.parseTimeData =
    exports.parseFormat =
    exports.isSameSecond =
    exports.TimeDataUnit =
      void 0);
(exports.TimeDataUnit = {
  DD: "天",
  HH: "时",
  mm: "分",
  ss: "秒",
  SSS: "毫秒",
}),
  (exports.parseTimeData = function (e) {
    return {
      DD: Math.floor(e / 864e5),
      HH: Math.floor((e % 864e5) / 36e5),
      mm: Math.floor((e % 36e5) / 6e4),
      ss: Math.floor((e % 6e4) / 1e3),
      SSS: Math.floor(e % 1e3),
    };
  }),
  (exports.isSameSecond = function (e, t) {
    return Math.floor(e / 1e3) === Math.floor(t / 1e3);
  }),
  (exports.parseFormat = function (e, t) {
    var o = {
        "D+": Math.floor(e / 864e5),
        "H+": Math.floor((e % 864e5) / 36e5),
        "m+": Math.floor((e % 36e5) / 6e4),
        "s+": Math.floor((e % 6e4) / 1e3),
        "S+": Math.floor(e % 1e3),
      },
      r = [],
      a = t;
    return (
      Object.keys(o).forEach(function (e) {
        new RegExp("(".concat(e, ")")).test(a) &&
          (a = a.replace(RegExp.$1, function (t, a, s) {
            var n = "".concat(o[e]),
              i = n;
            t.length > 1 &&
              (i = (t.replace(new RegExp(t[0], "g"), "0") + n).substr(
                n.length
              ));
            var f = s.substr(a + t.length),
              l = r[r.length - 1];
            if (l) {
              var p = l.unit.indexOf(t);
              -1 !== p && (l.unit = l.unit.substr(0, p));
            }
            return r.push({ digit: i, unit: f, match: t }), i;
          }));
      }),
      { timeText: a, timeList: r }
    );
  });
