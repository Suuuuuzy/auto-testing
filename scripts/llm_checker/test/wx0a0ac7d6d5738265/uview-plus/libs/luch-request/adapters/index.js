var e = require("../../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../../common/vendor.js"),
  r = require("../helpers/buildURL.js"),
  a = require("../core/buildFullPath.js"),
  i = require("../core/settle.js"),
  n = require("../utils.js"),
  d = function (e, t) {
    var r = {};
    return (
      e.forEach(function (e) {
        n.isUndefined(t[e]) || (r[e] = t[e]);
      }),
      r
    );
  };
exports.adapter = function (n) {
  return new Promise(function (l, o) {
    var u,
      s = r.buildURL(a.buildFullPath(n.baseURL, n.url), n.params),
      c = {
        url: s,
        header: n.header,
        complete: function (e) {
          (n.fullPath = s), (e.config = n);
          try {
            "string" == typeof e.data && (e.data = JSON.parse(e.data));
          } catch (e) {}
          i.settle(l, o, e);
        },
      };
    if ("UPLOAD" === n.method) {
      delete c.header["content-type"], delete c.header["Content-Type"];
      var h = { filePath: n.filePath, name: n.name };
      u = t.index.uploadFile(e(e(e({}, c), h), d(["formData"], n)));
    } else if ("DOWNLOAD" === n.method) u = t.index.downloadFile(c);
    else {
      u = t.index.request(
        e(
          e({}, c),
          d(["data", "method", "timeout", "dataType", "responseType"], n)
        )
      );
    }
    n.getTask && n.getTask(u, n);
  });
};
