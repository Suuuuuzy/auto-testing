Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  i = require("../../../@babel/runtime/helpers/inherits"),
  o = require("../../../@babel/runtime/helpers/typeof"),
  l = require("../common/src/index"),
  c = a(require("../common/config")),
  u = a(require("./props")),
  s = a(require("../mixins/transition"));
function a(e) {
  return e && e.__esModule ? e : { default: e };
}
function f(e, t, i) {
  return (
    (t = n(t)),
    r(
      e,
      (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return !Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Reflect.construct(t, i || [], n(e).constructor)
        : t.apply(e, i)
    )
  );
}
var p = function (e, t, r, n) {
  var i,
    l = arguments.length,
    c =
      l < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, r)) : n;
  if (
    "object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) &&
    "function" == typeof Reflect.decorate
  )
    c = Reflect.decorate(e, t, r, n);
  else
    for (var u = e.length - 1; u >= 0; u--)
      (i = e[u]) && (c = (l < 3 ? i(c) : l > 3 ? i(t, r, c) : i(t, r)) || c);
  return l > 3 && c && Object.defineProperty(t, r, c), c;
};
delete u.default.visible;
var d = c.default.prefix,
  b = "".concat(d, "-popup"),
  h = (function (r) {
    function n() {
      var e;
      return (
        t(this, n),
        ((e = f(this, n, arguments)).externalClasses = [
          "".concat(d, "-class"),
          "".concat(d, "-class-content"),
        ]),
        (e.behaviors = [(0, s.default)()]),
        (e.options = { multipleSlots: !0 }),
        (e.properties = u.default),
        (e.data = { prefix: d, classPrefix: b }),
        (e.methods = {
          handleOverlayClick: function () {
            this.properties.closeOnOverlayClick &&
              this.triggerEvent("visible-change", {
                visible: !1,
                trigger: "overlay",
              });
          },
          handleClose: function () {
            this.triggerEvent("visible-change", {
              visible: !1,
              trigger: "close-btn",
            });
          },
        }),
        e
      );
    }
    return i(n, r), e(n);
  })(l.SuperComponent);
h = p([(0, l.wxComponent)()], h);
exports.default = h;
