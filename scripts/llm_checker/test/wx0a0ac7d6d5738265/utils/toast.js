var o = require("../common/vendor.js");
(exports._showLoading = function () {
  var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
    t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  o.index.showLoading({ mask: t, title: n });
}),
  (exports._showToast = function () {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none",
      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500,
      e = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
    o.index.showToast({ title: n, icon: t, duration: i, mask: e });
  });
