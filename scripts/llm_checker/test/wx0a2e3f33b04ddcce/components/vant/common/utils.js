Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.addUnit = function (e) {
    if (!r(e)) return;
    return (e = String(e)), (0, n.isNumber)(e) ? "".concat(e, "px") : e;
  }),
  (exports.getAllRect = function (e) {
    var t = this;
    return new Promise(function (n) {
      wx.createSelectorQuery()
        .in(t)
        .selectAll(e)
        .boundingClientRect()
        .exec(function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return n(e[0]);
        });
    });
  }),
  (exports.getRect = function (e) {
    var t = this;
    return new Promise(function (n) {
      wx.createSelectorQuery()
        .in(t)
        .select(e)
        .boundingClientRect()
        .exec(function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return n(e[0]);
        });
    });
  }),
  (exports.getSystemInfoSync = u),
  (exports.isDef = r),
  (exports.isObj = function (e) {
    var n = t(e);
    return null !== e && ("object" === n || "function" === n);
  }),
  (exports.nextTick = i),
  (exports.pickExclude = function (e, t) {
    if (!(0, n.isPlainObject)(e)) return {};
    return Object.keys(e).reduce(function (n, r) {
      return t.includes(r) || (n[r] = e[r]), n;
    }, {});
  }),
  (exports.range = function (e, t, n) {
    return Math.min(Math.max(e, t), n);
  }),
  (exports.requestAnimationFrame = function (e) {
    if ("devtools" === u().platform) return i(e);
    return wx
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(function () {
        e();
      });
  }),
  require("../../../@babel/runtime/helpers/Arrayincludes");
var e,
  t = require("../../../@babel/runtime/helpers/typeof"),
  n = require("./validator");
function r(e) {
  return null != e;
}
function i(e) {
  setTimeout(function () {
    e();
  }, 1e3 / 30);
}
function u() {
  return null == e && (e = wx.getSystemInfoSync()), e;
}
