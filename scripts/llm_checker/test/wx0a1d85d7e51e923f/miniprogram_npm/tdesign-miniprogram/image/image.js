Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  i = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  n = require("../../../@babel/runtime/helpers/inherits"),
  o = require("../../../@babel/runtime/helpers/typeof"),
  s = require("../common/src/index"),
  a = l(require("./props")),
  c = l(require("../common/config")),
  u = require("../common/utils");
function l(e) {
  return e && e.__esModule ? e : { default: e };
}
function f(e, t, n) {
  return (
    (t = i(t)),
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
        ? Reflect.construct(t, n || [], i(e).constructor)
        : t.apply(e, n)
    )
  );
}
var d = function (e, t, r, i) {
    var n,
      s = arguments.length,
      a =
        s < 3
          ? t
          : null === i
          ? (i = Object.getOwnPropertyDescriptor(t, r))
          : i;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      a = Reflect.decorate(e, t, r, i);
    else
      for (var c = e.length - 1; c >= 0; c--)
        (n = e[c]) && (a = (s < 3 ? n(a) : s > 3 ? n(t, r, a) : n(t, r)) || a);
    return s > 3 && a && Object.defineProperty(t, r, a), a;
  },
  p = c.default.prefix,
  h = "".concat(p, "-image"),
  g = (function (r) {
    function i() {
      var e;
      return (
        t(this, i),
        ((e = f(this, i, arguments)).externalClasses = [
          "".concat(p, "-class"),
          "".concat(p, "-class-load"),
        ]),
        (e.options = { multipleSlots: !0 }),
        (e.properties = a.default),
        (e.data = {
          prefix: p,
          isLoading: !0,
          isFailed: !1,
          innerStyle: "",
          classPrefix: h,
        }),
        (e.preSrc = ""),
        (e.observers = {
          src: function () {
            this.preSrc !== this.properties.src && this.update();
          },
          "width, height": function (e, t) {
            this.calcSize(e, t);
          },
        }),
        (e.methods = {
          onLoaded: function (e) {
            var t = this,
              r = wx
                .getSystemInfoSync()
                .SDKVersion.split(".")
                .map(function (e) {
                  return parseInt(e, 10);
                }),
              i = this.properties.mode,
              n =
                r[0] < 2 ||
                (2 === r[0] && r[1] < 10) ||
                (2 === r[0] && 10 === r[1] && r[2] < 3);
            if ("heightFix" === i && n) {
              var o = e.detail,
                s = o.height,
                a = o.width;
              (0, u.getRect)(this, "#image").then(function (e) {
                var r = e.height,
                  i = ((r / s) * a).toFixed(2);
                t.setData({
                  innerStyle: "height: "
                    .concat((0, u.addUnit)(r), "; width: ")
                    .concat(i, "px;"),
                });
              });
            }
            this.setData({ isLoading: !1, isFailed: !1 }),
              this.triggerEvent("load", e.detail);
          },
          onLoadError: function (e) {
            this.setData({ isLoading: !1, isFailed: !0 }),
              this.triggerEvent("error", e.detail);
          },
          calcSize: function (e, t) {
            var r = "";
            e && (r += "width: ".concat((0, u.addUnit)(e), ";")),
              t && (r += "height: ".concat((0, u.addUnit)(t), ";")),
              this.setData({ innerStyle: r });
          },
          update: function () {
            var e = this.properties.src;
            (this.preSrc = e),
              e
                ? this.setData({ isLoading: !0, isFailed: !1 })
                : this.onLoadError({ errMsg: "图片链接为空" });
          },
        }),
        e
      );
    }
    return n(i, r), e(i);
  })(s.SuperComponent);
g = d([(0, s.wxComponent)()], g);
exports.default = g;
