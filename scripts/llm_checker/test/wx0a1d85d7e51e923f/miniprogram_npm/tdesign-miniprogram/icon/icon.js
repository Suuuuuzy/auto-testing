Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  i = require("../../../@babel/runtime/helpers/typeof"),
  c = require("../common/src/index"),
  s = a(require("../common/config")),
  l = a(require("./props")),
  u = require("../common/utils");
function a(e) {
  return e && e.__esModule ? e : { default: e };
}
function f(e, t, o) {
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
var p = function (e, t, r, n) {
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
      for (var l = e.length - 1; l >= 0; l--)
        (o = e[l]) && (s = (c < 3 ? o(s) : c > 3 ? o(t, r, s) : o(t, r)) || s);
    return c > 3 && s && Object.defineProperty(t, r, s), s;
  },
  d = s.default.prefix,
  h = "".concat(d, "-icon"),
  b = (function (r) {
    function n() {
      var e;
      return (
        t(this, n),
        ((e = f(this, n, arguments)).externalClasses = [
          "".concat(d, "-class"),
        ]),
        (e.properties = l.default),
        (e.data = {
          componentPrefix: d,
          classPrefix: h,
          isImage: !1,
          iconStyle: void 0,
        }),
        (e.observers = {
          "name, color, size, style": function () {
            this.setIconStyle();
          },
        }),
        (e.methods = {
          onTap: function (e) {
            this.triggerEvent("click", e.detail);
          },
          setIconStyle: function () {
            var e = this.properties,
              t = e.name,
              r = e.color,
              n = e.size,
              o = -1 !== t.indexOf("/"),
              i = (0, u.addUnit)(n),
              c = o ? { width: i, height: i } : {},
              s = r ? { color: r } : {},
              l = n ? { "font-size": i } : {};
            this.setData({
              isImage: o,
              iconStyle: "".concat(
                (0, u.styles)(
                  Object.assign(Object.assign(Object.assign({}, s), l), c)
                )
              ),
            });
          },
        }),
        e
      );
    }
    return o(n, r), e(n);
  })(c.SuperComponent);
b = p([(0, c.wxComponent)()], b);
exports.default = b;
