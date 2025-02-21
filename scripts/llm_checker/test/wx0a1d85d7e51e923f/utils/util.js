var t = function (t) {
  return (t = t.toString())[1] ? t : "0" + t;
};
module.exports = {
  formatTime: function (e) {
    var n = e.getFullYear(),
      r = e.getMonth() + 1,
      u = e.getDate(),
      o = e.getHours(),
      i = e.getMinutes(),
      l = e.getSeconds();
    return [n, r, u].map(t).join("/") + " " + [o, i, l].map(t).join(":");
  },
  isNull: function (t) {
    return null == t || null == t || "" == t;
  },
};
