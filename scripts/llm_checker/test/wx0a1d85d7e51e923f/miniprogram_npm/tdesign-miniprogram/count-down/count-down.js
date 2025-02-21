Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/createClass"),
  t = require("../../../@babel/runtime/helpers/classCallCheck"),
  i = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  r = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  n = require("../../../@babel/runtime/helpers/inherits"),
  o = require("../../../@babel/runtime/helpers/typeof"),
  s = require("../common/src/index"),
  u = l(require("../common/config")),
  a = l(require("./props")),
  c = require("./utils");
function l(e) {
  return e && e.__esModule ? e : { default: e };
}
function f(e, t, n) {
  return (
    (t = r(t)),
    i(
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
        ? Reflect.construct(t, n || [], r(e).constructor)
        : t.apply(e, n)
    )
  );
}
var m = function (e, t, i, r) {
    var n,
      s = arguments.length,
      u =
        s < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, i))
          : r;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      u = Reflect.decorate(e, t, i, r);
    else
      for (var a = e.length - 1; a >= 0; a--)
        (n = e[a]) && (u = (s < 3 ? n(u) : s > 3 ? n(t, i, u) : n(t, i)) || u);
    return s > 3 && u && Object.defineProperty(t, i, u), u;
  },
  p = u.default.prefix,
  h = "".concat(p, "-count-down"),
  d = (function (i) {
    function r() {
      var e;
      return (
        t(this, r),
        ((e = f(this, r, arguments)).externalClasses = [
          "".concat(p, "-class"),
          "".concat(p, "-class-count"),
          "".concat(p, "-class-split"),
        ]),
        (e.properties = a.default),
        (e.observers = {
          time: function () {
            this.reset();
          },
        }),
        (e.data = {
          prefix: p,
          classPrefix: h,
          timeDataUnit: c.TimeDataUnit,
          timeData: (0, c.parseTimeData)(0),
          formattedTime: "0",
        }),
        (e.timeoutId = null),
        (e.lifetimes = {
          detached: function () {
            this.timeoutId &&
              (clearTimeout(this.timeoutId), (this.timeoutId = null));
          },
        }),
        (e.methods = {
          start: function () {
            this.counting ||
              ((this.counting = !0),
              (this.endTime = Date.now() + this.remain),
              this.doCount());
          },
          pause: function () {
            (this.counting = !1),
              this.timeoutId && clearTimeout(this.timeoutId);
          },
          reset: function () {
            this.pause(),
              (this.remain = this.properties.time),
              this.updateTime(this.remain),
              this.properties.autoStart && this.start();
          },
          getTime: function () {
            return Math.max(this.endTime - Date.now(), 0);
          },
          updateTime: function (e) {
            var t = this.properties.format;
            this.remain = e;
            var i = (0, c.parseTimeData)(e);
            this.triggerEvent("change", i);
            var r = (0, c.parseFormat)(e, t).timeText,
              n = t.split(":");
            this.setData({
              timeRange: n,
              timeData: i,
              formattedTime: r.replace(/:/g, " : "),
            }),
              0 === e && (this.pause(), this.triggerEvent("finish"));
          },
          doCount: function () {
            var e = this;
            this.timeoutId = setTimeout(function () {
              var t = e.getTime();
              e.properties.millisecond
                ? e.updateTime(t)
                : ((0, c.isSameSecond)(t, e.remain) && 0 !== t) ||
                  e.updateTime(t),
                0 !== t && e.doCount();
            }, 33);
          },
        }),
        e
      );
    }
    return n(r, i), e(r);
  })(s.SuperComponent);
d = m([(0, s.wxComponent)()], d);
exports.default = d;
