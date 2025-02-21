Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  i = require("../../../@babel/runtime/helpers/typeof"),
  u = require("../common/src/index"),
  c = a(require("../common/config")),
  l = a(require("./props"));
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
      u = arguments.length,
      c =
        u < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : i(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      c = Reflect.decorate(e, t, r, n);
    else
      for (var l = e.length - 1; l >= 0; l--)
        (o = e[l]) && (c = (u < 3 ? o(c) : u > 3 ? o(t, r, c) : o(t, r)) || c);
    return u > 3 && c && Object.defineProperty(t, r, c), c;
  },
  p = c.default.prefix,
  d = "".concat(p, "-grid"),
  h = (function (r) {
    function n() {
      var e;
      return (
        t(this, n),
        ((e = s(this, n, arguments)).externalClasses = ["t-class"]),
        (e.relations = { "../grid-item/grid-item": { type: "descendant" } }),
        (e.properties = l.default),
        (e.data = { prefix: p, classPrefix: d, contentStyle: "" }),
        (e.observers = {
          "column,hover,align": function () {
            this.updateContentStyle();
          },
          "gutter,border": function () {
            this.updateContentStyle(),
              this.doForChild(function (e) {
                return e.updateStyle();
              });
          },
        }),
        (e.lifetimes = {
          attached: function () {
            this.updateContentStyle();
          },
        }),
        (e.methods = {
          doForChild: function (e) {
            this.$children.forEach(e);
          },
          updateContentStyle: function () {
            var e = [],
              t = this.getContentMargin();
            t && e.push(t), this.setData({ contentStyle: e.join(";") });
          },
          getContentMargin: function () {
            var e = this.properties.gutter,
              t = this.properties.border;
            if (!t)
              return "margin-left:-"
                .concat(e, "rpx; margin-top:-")
                .concat(e, "rpx");
            (0, u.isObject)(t) || (t = {});
            var r = t.width,
              n = void 0 === r ? 2 : r;
            return "margin-left:-"
              .concat(n, "rpx; margin-top:-")
              .concat(n, "rpx");
          },
        }),
        e
      );
    }
    return o(n, r), e(n);
  })(u.SuperComponent);
h = f([(0, u.wxComponent)()], h);
exports.default = h;
