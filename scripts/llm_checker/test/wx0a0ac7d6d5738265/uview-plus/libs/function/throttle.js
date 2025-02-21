var t;
exports.throttle = function (o) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
    e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
  e
    ? t ||
      ((t = !0),
      "function" == typeof o && o(),
      setTimeout(function () {
        t = !1;
      }, n))
    : t ||
      ((t = !0),
      setTimeout(function () {
        (t = !1), "function" == typeof o && o();
      }, n));
};
