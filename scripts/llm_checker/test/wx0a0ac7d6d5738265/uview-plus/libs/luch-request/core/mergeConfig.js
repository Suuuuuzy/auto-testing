var e = require("../../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../utils.js"),
  r = function (e, r, a) {
    var n = {};
    return (
      e.forEach(function (e) {
        t.isUndefined(a[e])
          ? t.isUndefined(r[e]) || (n[e] = r[e])
          : (n[e] = a[e]);
      }),
      n
    );
  };
exports.mergeConfig = function (a) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    d = n.method || a.method || "GET",
    o = {
      baseURL: a.baseURL || "",
      method: d,
      url: n.url || "",
      params: n.params || {},
      custom: e(e({}, a.custom || {}), n.custom || {}),
      header: t.deepMerge(a.header || {}, n.header || {}),
    };
  return (
    (o = e(e({}, o), r(["getTask", "validateStatus"], a, n))),
    "DOWNLOAD" === d ||
      ("UPLOAD" === d
        ? (delete o.header["content-type"],
          delete o.header["Content-Type"],
          ["filePath", "name", "formData"].forEach(function (e) {
            t.isUndefined(n[e]) || (o[e] = n[e]);
          }))
        : (o = e(
            e({}, o),
            r(["data", "timeout", "dataType", "responseType"], a, n)
          ))),
    o
  );
};
