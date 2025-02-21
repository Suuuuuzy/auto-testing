Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  a = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  c = require("../../../@babel/runtime/helpers/inherits"),
  s = require("../../../@babel/runtime/helpers/typeof"),
  n = require("../common/src/index"),
  o = u(require("../common/config")),
  i = u(require("./props")),
  l = require("../common/utils");
function u(e) {
  return e && e.__esModule ? e : { default: e };
}
function f(e, t, c) {
  return (
    (t = a(t)),
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
        ? Reflect.construct(t, c || [], a(e).constructor)
        : t.apply(e, c)
    )
  );
}
var p = function (e, t, r, a) {
    var c,
      n = arguments.length,
      o =
        n < 3
          ? t
          : null === a
          ? (a = Object.getOwnPropertyDescriptor(t, r))
          : a;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      o = Reflect.decorate(e, t, r, a);
    else
      for (var i = e.length - 1; i >= 0; i--)
        (c = e[i]) && (o = (n < 3 ? c(o) : n > 3 ? c(t, r, o) : c(t, r)) || o);
    return n > 3 && o && Object.defineProperty(t, r, o), o;
  },
  d = o.default.prefix,
  h = "".concat(d, "-tag"),
  b = (function (r) {
    function a() {
      var e;
      return (
        t(this, a),
        ((e = f(this, a, arguments)).data = {
          prefix: d,
          classPrefix: h,
          className: "",
          tagStyle: "",
        }),
        (e.properties = i.default),
        (e.externalClasses = ["".concat(d, "-class")]),
        (e.options = { multipleSlots: !0, styleIsolation: "apply-shared" }),
        (e.lifetimes = {
          attached: function () {
            this.setClass(), this.setTagStyle();
          },
        }),
        (e.observers = {
          "size, shape, theme, variant, closable, disabled": function () {
            this.setClass();
          },
          maxWidth: function () {
            this.setTagStyle();
          },
          icon: function (e) {
            this.setData({ _icon: (0, l.calcIcon)(e) });
          },
          closable: function (e) {
            this.setData({ _closable: (0, l.calcIcon)(e, "close") });
          },
        }),
        (e.methods = {
          setClass: function () {
            var e = this.data,
              t = e.prefix,
              r = e.classPrefix,
              a = this.properties,
              c = a.size,
              s = a.shape,
              n = a.theme,
              o = a.variant,
              i = a.closable,
              u = a.disabled,
              f = [
                r,
                "".concat(r, "--").concat(n || "default"),
                "".concat(r, "--").concat(o),
                i ? "".concat(r, "--closable ").concat(t, "-is-closable") : "",
                u ? "".concat(r, "--disabled ").concat(t, "-is-disabled") : "",
                "".concat(r, "--").concat(c),
                "".concat(r, "--").concat(s),
              ],
              p = (0, l.classNames)(f);
            this.setData({ className: p });
          },
          setTagStyle: function () {
            var e = this.properties.maxWidth;
            if (!e) return "";
            var t = (0, l.isNumber)(e) ? "".concat(e, "px") : e;
            this.setData({ tagStyle: "max-width:".concat(t, ";") });
          },
          handleClick: function (e) {
            this.data.disabled || this.triggerEvent("click", e);
          },
          handleClose: function (e) {
            this.data.disabled || this.triggerEvent("close", e);
          },
        }),
        e
      );
    }
    return c(a, r), e(a);
  })(n.SuperComponent);
b = p([(0, n.wxComponent)()], b);
exports.default = b;
