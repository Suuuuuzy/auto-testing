Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../../@babel/runtime/helpers/createClass"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  i = require("../../../@babel/runtime/helpers/typeof"),
  c = require("../common/src/index"),
  s = l(require("../common/config")),
  u = l(require("./props"));
function l(e) {
  return e && e.__esModule ? e : { default: e };
}
function a(e, t, o) {
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
      c = arguments.length,
      s =
        c < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : i(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      s = Reflect.decorate(e, t, r, n);
    else
      for (var u = e.length - 1; u >= 0; u--)
        (o = e[u]) && (s = (c < 3 ? o(s) : c > 3 ? o(t, r, s) : o(t, r)) || s);
    return c > 3 && s && Object.defineProperty(t, r, s), s;
  },
  p = s.default.prefix,
  d = "".concat(p, "-loading"),
  h = (function (r) {
    function n() {
      var t;
      return (
        e(this, n),
        ((t = a(this, n, arguments)).externalClasses = [
          "".concat(p, "-class"),
          "".concat(p, "-class-text"),
          "".concat(p, "-class-indicator"),
        ]),
        (t.data = { prefix: p, classPrefix: d, show: !0 }),
        (t.options = { multipleSlots: !0 }),
        (t.properties = Object.assign({}, u.default)),
        (t.timer = null),
        (t.observers = {
          loading: function (e) {
            var t = this,
              r = this.properties.delay;
            this.timer && clearTimeout(this.timer),
              e && r
                ? (this.timer = setTimeout(function () {
                    t.setData({ show: e }), (t.timer = null);
                  }, r))
                : this.setData({ show: e });
          },
        }),
        (t.lifetimes = {
          detached: function () {
            clearTimeout(this.timer);
          },
        }),
        t
      );
    }
    return (
      o(n, r),
      t(n, [
        {
          key: "refreshPage",
          value: function () {
            this.triggerEvent("reload");
          },
        },
      ])
    );
  })(c.SuperComponent);
h = f([(0, c.wxComponent)()], h);
exports.default = h;
