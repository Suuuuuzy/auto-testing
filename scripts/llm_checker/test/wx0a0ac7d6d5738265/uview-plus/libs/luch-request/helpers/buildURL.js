var e = require("../../../../@babel/runtime/helpers/typeof"),
  r = require("../utils.js");
function i(e) {
  return encodeURIComponent(e)
    .replace(/%40/gi, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
exports.buildURL = function (n, c) {
  if (!c) return n;
  var t;
  if (r.isURLSearchParams(c)) t = c.toString();
  else {
    var a = [];
    r.forEach(c, function (n, c) {
      null === n ||
        e(n) > "u" ||
        (r.isArray(n) ? (c = "".concat(c, "[]")) : (n = [n]),
        r.forEach(n, function (e) {
          r.isDate(e)
            ? (e = e.toISOString())
            : r.isObject(e) && (e = JSON.stringify(e)),
            a.push("".concat(i(c), "=").concat(i(e)));
        }));
    }),
      (t = a.join("&"));
  }
  if (t) {
    var o = n.indexOf("#");
    -1 !== o && (n = n.slice(0, o)),
      (n += (-1 === n.indexOf("?") ? "?" : "&") + t);
  }
  return n;
};
