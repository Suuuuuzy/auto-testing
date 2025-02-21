var t;
function r(r) {
  return (
    (function (t, r) {
      (t = t.split(".")), (r = r.split("."));
      for (var e = Math.max(t.length, r.length); t.length < e; ) t.push("0");
      for (; r.length < e; ) r.push("0");
      for (var n = 0; n < e; n++) {
        var u = parseInt(t[n]),
          o = parseInt(r[n]);
        if (u > o) return 1;
        if (u < o) return -1;
      }
      return 0;
    })((null == t && (t = wx.getSystemInfoSync()), t).SDKVersion, r) >= 0
  );
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.canIUseFormFieldButton = function () {
    return r("2.10.3");
  }),
  (exports.canUseVirtualHost = function () {
    return r("2.19.2");
  });
