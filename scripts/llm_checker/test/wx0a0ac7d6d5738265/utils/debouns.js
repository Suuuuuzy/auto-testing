require("../common/vendor.js"),
  (exports.throttle = function (t, r) {
    var e = 0;
    return function () {
      var n = Date.now();
      n - e >= r && (t.apply(this, arguments), (e = n));
    };
  });
