Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  c = require("../../../@babel/runtime/helpers/typeof"),
  u = require("../common/src/index"),
  l = s(require("../common/config")),
  i = s(require("./props")),
  a = require("../common/utils");
function s(e) {
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
      u = arguments.length,
      l =
        u < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      l = Reflect.decorate(e, t, r, n);
    else
      for (var i = e.length - 1; i >= 0; i--)
        (o = e[i]) && (l = (u < 3 ? o(l) : u > 3 ? o(t, r, l) : o(t, r)) || l);
    return u > 3 && l && Object.defineProperty(t, r, l), l;
  },
  d = l.default.prefix,
  b = "".concat(d, "-badge"),
  m = (0, a.uniqueFactory)("badge"),
  h = (function (r) {
    function n() {
      var e;
      return (
        t(this, n),
        ((e = f(this, n, arguments)).options = { multipleSlots: !0 }),
        (e.externalClasses = [
          "".concat(d, "-class"),
          "".concat(d, "-class-count"),
          "".concat(d, "-class-content"),
        ]),
        (e.properties = i.default),
        (e.data = {
          prefix: d,
          classPrefix: b,
          value: "",
          labelID: "",
          descriptionID: "",
        }),
        (e.lifetimes = {
          ready: function () {
            var e = m();
            this.setData({
              labelID: "".concat(e, "_label"),
              descriptionID: "".concat(e, "_description"),
            });
          },
        }),
        e
      );
    }
    return o(n, r), e(n);
  })(u.SuperComponent);
h = p([(0, u.wxComponent)()], h);
exports.default = h;
