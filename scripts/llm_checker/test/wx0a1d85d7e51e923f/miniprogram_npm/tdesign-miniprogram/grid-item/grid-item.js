Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../../@babel/runtime/helpers/createClass"),
  r = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  i = require("../../../@babel/runtime/helpers/inherits"),
  o = require("../../../@babel/runtime/helpers/typeof"),
  c = require("../common/src/index"),
  a = l(require("../common/config")),
  u = l(require("./props")),
  s = require("../common/utils");
function l(e) {
  return e && e.__esModule ? e : { default: e };
}
function p(e, t, i) {
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
        ? Reflect.construct(t, i || [], n(e).constructor)
        : t.apply(e, i)
    )
  );
}
var d,
  f = function (e, t, r, n) {
    var i,
      c = arguments.length,
      a =
        c < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      a = Reflect.decorate(e, t, r, n);
    else
      for (var u = e.length - 1; u >= 0; u--)
        (i = e[u]) && (a = (c < 3 ? i(a) : c > 3 ? i(t, r, a) : i(t, r)) || a);
    return c > 3 && a && Object.defineProperty(t, r, a), a;
  },
  h = a.default.prefix,
  y = "".concat(h, "-grid-item"),
  g = (0, s.uniqueFactory)("grid_item");
!(function (e) {
  (e["redirect-to"] = "redirectTo"),
    (e["switch-tab"] = "switchTab"),
    (e.relaunch = "reLaunch"),
    (e["navigate-to"] = "navigateTo");
})(d || (d = {}));
var m = (function (r) {
  function n() {
    var t;
    return (
      e(this, n),
      ((t = p(this, n, arguments)).externalClasses = [
        "".concat(h, "-class"),
        "".concat(h, "-class-content"),
        "".concat(h, "-class-image"),
        "".concat(h, "-class-text"),
        "".concat(h, "-class-description"),
      ]),
      (t.options = { multipleSlots: !0 }),
      (t.relations = {
        "../grid/grid": {
          type: "ancestor",
          linked: function (e) {
            (this.parent = e),
              this.updateStyle(),
              this.setData({ column: e.data.column });
          },
        },
      }),
      (t.properties = u.default),
      (t.data = {
        prefix: h,
        classPrefix: y,
        gridItemStyle: "",
        gridItemWrapperStyle: "",
        gridItemContentStyle: "",
        align: "center",
        column: 0,
        describedbyID: "",
      }),
      (t.observers = {
        icon: function (e) {
          var t = (0, s.setIcon)("icon", e, "");
          this.setData(Object.assign({}, t));
        },
      }),
      (t.lifetimes = {
        ready: function () {
          this.setData({ describedbyID: g() });
        },
      }),
      t
    );
  }
  return (
    i(n, r),
    t(n, [
      {
        key: "updateStyle",
        value: function () {
          var e = this.parent.properties,
            t = e.hover,
            r = e.align,
            n = [],
            i = [],
            o = [],
            c = this.getWidthStyle(),
            a = this.getPaddingStyle(),
            u = this.getBorderStyle();
          c && n.push(c),
            a && i.push(a),
            u && o.push(u),
            this.setData({
              gridItemStyle: "".concat(n.join(";")),
              gridItemWrapperStyle: i.join(";"),
              gridItemContentStyle: o.join(";"),
              hover: t,
              layout: this.properties.layout,
              align: r,
            });
        },
      },
      {
        key: "getWidthStyle",
        value: function () {
          var e = this.parent.properties.column;
          return e > 0 ? "width:".concat((1 / e) * 100, "%") : "";
        },
      },
      {
        key: "getPaddingStyle",
        value: function () {
          var e = this.parent.properties.gutter;
          return e
            ? "padding-left:".concat(e, "rpx;padding-top:").concat(e, "rpx")
            : "";
        },
      },
      {
        key: "getBorderStyle",
        value: function () {
          var e = this.parent.properties.gutter,
            t = this.parent.properties.border;
          if (!t) return "";
          (0, c.isObject)(t) || (t = {});
          var r = t,
            n = r.color,
            i = void 0 === n ? "#266FE8" : n,
            o = r.width,
            a = void 0 === o ? 2 : o,
            u = r.style,
            s = void 0 === u ? "solid" : u;
          return e
            ? "border:".concat(a, "rpx ").concat(s, " ").concat(i)
            : "border-top:"
                .concat(a, "rpx ")
                .concat(s, " ")
                .concat(i, ";border-left:")
                .concat(a, "rpx ")
                .concat(s, " ")
                .concat(i);
        },
      },
      {
        key: "onClick",
        value: function (e) {
          var t = e.currentTarget.dataset.item;
          this.triggerEvent("click", t), this.jumpLink();
        },
      },
      {
        key: "jumpLink",
        value: function () {
          var e = this.properties,
            t = e.url,
            r = e.jumpType;
          t && r && d[r] && wx[d[r]]({ url: t });
        },
      },
    ])
  );
})(c.SuperComponent);
m = f([(0, c.wxComponent)()], m);
exports.default = m;
