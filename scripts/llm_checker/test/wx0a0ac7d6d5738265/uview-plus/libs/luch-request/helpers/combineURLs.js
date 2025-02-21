exports.combineURLs = function (c, e) {
  return e
    ? "".concat(c.replace(/\/+$/, ""), "/").concat(e.replace(/^\/+/, ""))
    : c;
};
