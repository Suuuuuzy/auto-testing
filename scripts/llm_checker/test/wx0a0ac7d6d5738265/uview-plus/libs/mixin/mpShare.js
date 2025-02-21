var e = require("../../../common/vendor.js"),
  r = {
    onLoad: function () {
      e.index.$u.mpShare = { title: "", path: "", imageUrl: "" };
    },
    onShareAppMessage: function () {
      return e.index.$u.mpShare;
    },
  };
exports.mpShare = r;
