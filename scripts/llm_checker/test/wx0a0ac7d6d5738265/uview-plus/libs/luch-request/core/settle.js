exports.settle = function (t, s, e) {
  var a = e.config.validateStatus,
    i = e.statusCode;
  !i || (a && !a(i)) ? s(e) : t(e);
};
