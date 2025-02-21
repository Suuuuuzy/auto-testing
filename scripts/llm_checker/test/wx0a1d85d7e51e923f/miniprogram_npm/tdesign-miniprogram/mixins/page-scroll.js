Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../common/utils"),
  r = function (r) {
    var o = (0, e.getCurrentPage)();
    if (o) {
      var l = o.pageScroller;
      null == l ||
        l.forEach(function (e) {
          "function" == typeof e && e(r);
        });
    }
  };
exports.default = function () {
  var o =
    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "onScroll";
  return Behavior({
    attached: function () {
      var l,
        t = (0, e.getCurrentPage)();
      if (t) {
        var n = null === (l = this[o]) || void 0 === l ? void 0 : l.bind(this);
        n && (this._pageScroller = n),
          Array.isArray(t.pageScroller)
            ? t.pageScroller.push(n)
            : (t.pageScroller =
                "function" == typeof t.onPageScroll
                  ? [t.onPageScroll.bind(t), n]
                  : [n]),
          (t.onPageScroll = r);
      }
    },
    detached: function () {
      var r,
        o = this,
        l = (0, e.getCurrentPage)();
      l &&
        (l.pageScroller =
          (null === (r = l.pageScroller) || void 0 === r
            ? void 0
            : r.filter(function (e) {
                return e !== o._pageScroller;
              })) || []);
    },
  });
};
