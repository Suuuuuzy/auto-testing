Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/slicedToArray"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/createClass"),
  n = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  i = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  s = require("../../../@babel/runtime/helpers/typeof"),
  c = require("../common/src/index"),
  a = p(require("./props")),
  f = p(require("../common/config")),
  l = p(require("../mixins/page-scroll")),
  u = require("../common/utils");
function p(e) {
  return e && e.__esModule ? e : { default: e };
}
function h(e, t, r) {
  return (
    (t = i(t)),
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
        ? Reflect.construct(t, r || [], i(e).constructor)
        : t.apply(e, r)
    )
  );
}
var d = function (e, t, r, n) {
    var i,
      o = arguments.length,
      c =
        o < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      c = Reflect.decorate(e, t, r, n);
    else
      for (var a = e.length - 1; a >= 0; a--)
        (i = e[a]) && (c = (o < 3 ? i(c) : o > 3 ? i(t, r, c) : i(t, r)) || c);
    return o > 3 && c && Object.defineProperty(t, r, c), c;
  },
  m = f.default.prefix,
  x = "".concat(m, "-sticky"),
  b = ".".concat(x),
  g = (function (n) {
    function i() {
      var r;
      return (
        t(this, i),
        ((r = h(this, i, arguments)).externalClasses = [
          "".concat(m, "-class"),
          "".concat(m, "-class-content"),
        ]),
        (r.properties = a.default),
        (r.behaviors = [(0, l.default)()]),
        (r.observers = {
          "offsetTop, disabled, container": function () {
            this.onScroll();
          },
        }),
        (r.data = {
          prefix: m,
          classPrefix: x,
          containerStyle: "",
          contentStyle: "",
        }),
        (r.methods = {
          onScroll: function (t) {
            var r = this,
              n = (t || {}).scrollTop,
              i = this.properties,
              o = i.container,
              s = i.offsetTop;
            i.disabled
              ? this.setDataAfterDiff({ isFixed: !1, transform: 0 })
              : ((this.scrollTop = n || this.scrollTop),
                "function" != typeof o
                  ? (0, u.getRect)(this, b).then(function (e) {
                      e &&
                        (s >= e.top
                          ? (r.setDataAfterDiff({
                              isFixed: !0,
                              height: e.height,
                            }),
                            (r.transform = 0))
                          : r.setDataAfterDiff({ isFixed: !1 }));
                    })
                  : Promise.all([
                      (0, u.getRect)(this, b),
                      this.getContainerRect(),
                    ]).then(function (t) {
                      var n = e(t, 2),
                        i = n[0],
                        o = n[1];
                      i &&
                        o &&
                        (s + i.height > o.height + o.top
                          ? r.setDataAfterDiff({
                              isFixed: !1,
                              transform: o.height - i.height,
                            })
                          : s >= i.top
                          ? r.setDataAfterDiff({
                              isFixed: !0,
                              height: i.height,
                              transform: 0,
                            })
                          : r.setDataAfterDiff({ isFixed: !1, transform: 0 }));
                    }));
          },
          setDataAfterDiff: function (e) {
            var t = this,
              r = this.properties.offsetTop,
              n = this.data,
              i = n.containerStyle,
              o = n.contentStyle,
              s = e.isFixed,
              c = e.height,
              a = e.transform;
            wx.nextTick(function () {
              var e = "",
                n = "";
              if (
                (s &&
                  ((e += "height:".concat(c, "px;")),
                  (n += "position:fixed;top:".concat(r, "px;left:0;right:0;"))),
                a)
              ) {
                var f = "translate3d(0, ".concat(a, "px, 0)");
                n += "-webkit-transform:"
                  .concat(f, ";transform:")
                  .concat(f, ";");
              }
              (i === e && o === n) ||
                t.setData({ containerStyle: e, contentStyle: n }),
                t.triggerEvent("scroll", {
                  scrollTop: t.scrollTop,
                  isFixed: s,
                });
            });
          },
          getContainerRect: function () {
            var e = this.properties.container();
            return new Promise(function (t) {
              return e.boundingClientRect(t).exec();
            });
          },
        }),
        r
      );
    }
    return (
      o(i, n),
      r(i, [
        {
          key: "ready",
          value: function () {
            this.onScroll();
          },
        },
      ])
    );
  })(c.SuperComponent);
g = d([(0, c.wxComponent)()], g);
exports.default = g;
