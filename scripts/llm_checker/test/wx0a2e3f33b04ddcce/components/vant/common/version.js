Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.canIUseFormFieldButton = function () {
    return t((0, e.getSystemInfoSync)().SDKVersion, "2.10.3") >= 0;
  }),
  (exports.canIUseModel = function () {
    return t((0, e.getSystemInfoSync)().SDKVersion, "2.9.3") >= 0;
  });
var e = require("./utils");
function t(e, t) {
  (e = e.split(".")), (t = t.split("."));
  for (var r = Math.max(e.length, t.length); e.length < r; ) e.push("0");
  for (; t.length < r; ) t.push("0");
  for (var n = 0; n < r; n++) {
    var s = parseInt(e[n], 10),
      o = parseInt(t[n], 10);
    if (s > o) return 1;
    if (s < o) return -1;
  }
  return 0;
}
