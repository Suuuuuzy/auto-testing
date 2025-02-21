Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  n = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  r = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  a = require("../../../@babel/runtime/helpers/inherits"),
  i = require("../../../@babel/runtime/helpers/typeof"),
  o = require("../common/src/index"),
  c = f(require("../common/config")),
  s = f(require("./props")),
  u = require("../common/version"),
  l = require("../common/utils");
function f(e) {
  return e && e.__esModule ? e : { default: e };
}
function h(e, t, a) {
  return (
    (t = r(t)),
    n(
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
        ? Reflect.construct(t, a || [], r(e).constructor)
        : t.apply(e, a)
    )
  );
}
var d = function (e, t, n, r) {
    var a,
      o = arguments.length,
      c =
        o < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : i(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      c = Reflect.decorate(e, t, n, r);
    else
      for (var s = e.length - 1; s >= 0; s--)
        (a = e[s]) && (c = (o < 3 ? a(c) : o > 3 ? a(t, n, c) : a(t, n)) || c);
    return o > 3 && c && Object.defineProperty(t, n, c), c;
  },
  p = c.default.prefix,
  g = "".concat(p, "-button"),
  b = (function (n) {
    function r() {
      var e;
      return (
        t(this, r),
        ((e = h(this, r, arguments)).externalClasses = [
          "".concat(p, "-class"),
          "".concat(p, "-class-icon"),
          "".concat(p, "-class-loading"),
        ]),
        (e.behaviors = (0, u.canIUseFormFieldButton)()
          ? ["wx://form-field-button"]
          : []),
        (e.properties = s.default),
        (e.options = { multipleSlots: !0 }),
        (e.data = { prefix: p, className: "", classPrefix: g }),
        (e.observers = {
          "theme, size, plain, block, shape, disabled, loading, variant":
            function () {
              this.setClass();
            },
          icon: function (e) {
            var t = (0, l.setIcon)("icon", e, "");
            this.setData(Object.assign({}, t));
          },
        }),
        (e.lifetimes = {
          attached: function () {
            this.setClass();
          },
        }),
        (e.methods = {
          setClass: function () {
            var e = [
              g,
              "".concat(p, "-class"),
              "".concat(g, "--").concat(this.data.variant || "base"),
              "".concat(g, "--").concat(this.data.theme || "default"),
              "".concat(g, "--").concat(this.data.shape || "rectangle"),
              "".concat(g, "--size-").concat(this.data.size || "medium"),
            ];
            this.data.block && e.push("".concat(g, "--block")),
              this.data.disabled && e.push("".concat(g, "--disabled")),
              this.data.ghost && e.push("".concat(g, "--ghost")),
              this.setData({ className: e.join(" ") });
          },
          getuserinfo: function (e) {
            this.triggerEvent("getuserinfo", e.detail);
          },
          contact: function (e) {
            this.triggerEvent("contact", e.detail);
          },
          getphonenumber: function (e) {
            this.triggerEvent("getphonenumber", e.detail);
          },
          error: function (e) {
            this.triggerEvent("error", e.detail);
          },
          opensetting: function (e) {
            this.triggerEvent("opensetting", e.detail);
          },
          launchapp: function (e) {
            this.triggerEvent("launchapp", e.detail);
          },
          chooseavatar: function (e) {
            this.triggerEvent("chooseavatar", e.detail);
          },
          agreeprivacyauthorization: function (e) {
            this.triggerEvent("agreeprivacyauthorization", e.detail);
          },
          handleTap: function (e) {
            this.data.disabled ||
              this.data.loading ||
              this.triggerEvent("tap", e);
          },
        }),
        e
      );
    }
    return a(r, n), e(r);
  })(o.SuperComponent);
b = d([(0, o.wxComponent)()], b);
exports.default = b;
