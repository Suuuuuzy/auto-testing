Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  u = require("../../../@babel/runtime/helpers/typeof"),
  i = require("../common/src/index"),
  c = a(require("../common/config")),
  l = a(require("../mixins/transition"));
function a(e) {
  return e && e.__esModule ? e : { default: e };
}
function s(e, t, o) {
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
        ? Reflect.construct(t, o || [], n(e).constructor)
        : t.apply(e, o)
    )
  );
}
var f = function (e, t, r, n) {
    var o,
      i = arguments.length,
      c =
        i < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : u(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      c = Reflect.decorate(e, t, r, n);
    else
      for (var l = e.length - 1; l >= 0; l--)
        (o = e[l]) && (c = (i < 3 ? o(c) : i > 3 ? o(t, r, c) : o(t, r)) || c);
    return i > 3 && c && Object.defineProperty(t, r, c), c;
  },
  p = c.default.prefix,
  d = "".concat(p, "-overlay"),
  b = (function (r) {
    function n() {
      var e;
      return (
        t(this, n),
        ((e = s(this, n, arguments)).properties = {
          zIndex: { type: Number, value: 11e3 },
          duration: { type: Number, value: 300 },
          backgroundColor: { type: String, value: "" },
          preventScrollThrough: { type: Boolean, value: !0 },
        }),
        (e.behaviors = [(0, l.default)()]),
        (e.data = {
          prefix: p,
          classPrefix: d,
          computedStyle: "",
          _zIndex: 11e3,
        }),
        (e.observers = {
          backgroundColor: function (e) {
            this.setData({
              computedStyle: e ? "background-color: ".concat(e, ";") : "",
            });
          },
          zIndex: function (e) {
            0 !== e && this.setData({ _zIndex: e });
          },
        }),
        (e.methods = {
          handleClick: function () {
            this.triggerEvent("click", { visible: !this.properties.visible });
          },
          noop: function () {},
        }),
        e
      );
    }
    return o(n, r), e(n);
  })(i.SuperComponent);
b = f([(0, i.wxComponent)()], b);
exports.default = b;
