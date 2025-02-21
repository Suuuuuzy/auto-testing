Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = require("../../../@babel/runtime/helpers/slicedToArray"),
  e = require("../../../@babel/runtime/helpers/createClass"),
  i = require("../../../@babel/runtime/helpers/classCallCheck"),
  n = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  r = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../@babel/runtime/helpers/inherits"),
  a = require("../../../@babel/runtime/helpers/typeof"),
  c = require("../common/src/index"),
  s = require("../common/utils"),
  l = u(require("./props"));
function u(t) {
  return t && t.__esModule ? t : { default: t };
}
function f(t, e, i) {
  return (
    (e = r(e)),
    n(
      t,
      (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return !Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          );
        } catch (t) {
          return !1;
        }
      })()
        ? Reflect.construct(e, i || [], r(t).constructor)
        : e.apply(t, i)
    )
  );
}
var h = function (t, e, i, n) {
    var r,
      o = arguments.length,
      c =
        o < 3
          ? e
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(e, i))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : a(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      c = Reflect.decorate(t, e, i, n);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (r = t[s]) && (c = (o < 3 ? r(c) : o > 3 ? r(e, i, c) : r(e, i)) || c);
    return o > 3 && c && Object.defineProperty(e, i, c), c;
  },
  p = u(require("../common/config")).default.prefix,
  m = "".concat(p, "-notice-bar"),
  d = {
    info: "info-circle-filled",
    success: "check-circle-filled",
    warning: "info-circle-filled",
    error: "error-circle-filled",
  },
  x = (function (n) {
    function r() {
      var e;
      return (
        i(this, r),
        ((e = f(this, r, arguments)).externalClasses = [
          "".concat(p, "-class"),
          "".concat(p, "-class-content"),
          "".concat(p, "-class-prefix-icon"),
          "".concat(p, "-class-operation"),
          "".concat(p, "-class-suffix-icon"),
        ]),
        (e.options = { styleIsolation: "apply-shared", multipleSlots: !0 }),
        (e.properties = l.default),
        (e.data = { prefix: p, classPrefix: m, loop: -1 }),
        (e.observers = {
          marquee: function (t) {
            ("{}" !== JSON.stringify(t) && "true" !== JSON.stringify(t)) ||
              this.setData({ marquee: { speed: 50, loop: -1, delay: 0 } });
          },
          visible: function (t) {
            t ? this.show() : this.clearNoticeBarAnimation();
          },
          prefixIcon: function (t) {
            this.setPrefixIcon(t);
          },
          suffixIcon: function (t) {
            this.setData({ _suffixIcon: (0, s.calcIcon)(t) });
          },
          content: function () {
            this.clearNoticeBarAnimation(), this.initAnimation();
          },
        }),
        (e.lifetimes = {
          created: function () {
            this.resetAnimation = wx.createAnimation({
              duration: 0,
              timingFunction: "linear",
            });
          },
          detached: function () {
            this.clearNoticeBarAnimation();
          },
          ready: function () {
            this.show();
          },
        }),
        (e.methods = {
          initAnimation: function () {
            var e = this,
              i = ".".concat(m, "__content-wrap"),
              n = ".".concat(m, "__content");
            (0, s.getAnimationFrame)(this, function () {
              Promise.all([(0, s.getRect)(e, n), (0, s.getRect)(e, i)])
                .then(function (i) {
                  var n = t(i, 2),
                    r = n[0],
                    o = n[1],
                    a = e.properties.marquee;
                  if (
                    null != r &&
                    null != o &&
                    r.width &&
                    o.width &&
                    (a || o.width < r.width)
                  ) {
                    var c = a.speed || 50,
                      s = a.delay || 0,
                      l = ((o.width + r.width) / c) * 1e3,
                      u = (r.width / c) * 1e3;
                    e.setData({
                      wrapWidth: Number(o.width),
                      nodeWidth: Number(r.width),
                      animationDuration: l,
                      delay: s,
                      loop: a.loop - 1,
                      firstAnimationDuration: u,
                    }),
                      0 !== a.loop && e.startScrollAnimation(!0);
                  }
                })
                .catch(function () {});
            });
          },
          startScrollAnimation: function () {
            var t = this,
              e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.clearNoticeBarAnimation();
            var i = this.data,
              n = i.wrapWidth,
              r = i.nodeWidth,
              o = i.firstAnimationDuration,
              a = i.animationDuration,
              c = i.delay,
              l = e ? c : 0,
              u = e ? o : a;
            this.setData({
              animationData: this.resetAnimation
                .translateX(e ? 0 : n)
                .step()
                .export(),
            }),
              (0, s.getAnimationFrame)(this, function () {
                t.setData({
                  animationData: wx
                    .createAnimation({
                      duration: u,
                      timingFunction: "linear",
                      delay: l,
                    })
                    .translateX(-r)
                    .step()
                    .export(),
                });
              }),
              (this.nextAnimationContext = setTimeout(function () {
                t.data.loop > 0
                  ? ((t.data.loop -= 1), t.startScrollAnimation())
                  : 0 === t.data.loop
                  ? t.setData({
                      animationData: t.resetAnimation
                        .translateX(0)
                        .step()
                        .export(),
                    })
                  : t.data.loop < 0 && t.startScrollAnimation();
              }, u + l));
          },
          show: function () {
            this.clearNoticeBarAnimation(),
              this.setPrefixIcon(this.properties.prefixIcon),
              this.initAnimation();
          },
          clearNoticeBarAnimation: function () {
            this.nextAnimationContext &&
              clearTimeout(this.nextAnimationContext),
              (this.nextAnimationContext = null);
          },
          setPrefixIcon: function (t) {
            var e = this.properties.theme;
            this.setData({ _prefixIcon: (0, s.calcIcon)(t, d[e]) });
          },
          onChange: function (t) {
            var e = t.detail,
              i = e.current,
              n = e.source;
            this.triggerEvent("change", { current: i, source: n });
          },
          clickPrefixIcon: function () {
            this.triggerEvent("click", { trigger: "prefix-icon" });
          },
          clickContent: function () {
            this.triggerEvent("click", { trigger: "content" });
          },
          clickSuffixIcon: function () {
            this.triggerEvent("click", { trigger: "suffix-icon" });
          },
          clickOperation: function () {
            this.triggerEvent("click", { trigger: "operation" });
          },
        }),
        e
      );
    }
    return o(r, n), e(r);
  })(c.SuperComponent);
x = h([(0, c.wxComponent)()], x);
exports.default = x;
