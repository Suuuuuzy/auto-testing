var e = require("../adapters/index.js");
exports.dispatchRequest = function (r) {
  return e.adapter(r);
};
