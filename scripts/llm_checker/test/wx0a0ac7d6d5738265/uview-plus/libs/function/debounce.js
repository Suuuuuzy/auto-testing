var t = null;
exports.debounce = function (e) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
    o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if ((null !== t && clearTimeout(t), o)) {
    var u = !t;
    (t = setTimeout(function () {
      t = null;
    }, n)),
      u && "function" == typeof e && e();
  } else
    t = setTimeout(function () {
      "function" == typeof e && e();
    }, n);
};
