Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0),
  require("../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../@babel/runtime/helpers/createClass"),
  e = require("../../../@babel/runtime/helpers/classCallCheck"),
  n = require("../../../@babel/runtime/helpers/possibleConstructorReturn"),
  o = require("../../../@babel/runtime/helpers/getPrototypeOf"),
  c = require("../../../@babel/runtime/helpers/inherits"),
  r = require("../../../@babel/runtime/helpers/typeof"),
  i = require("../common/src/index"),
  a = u(require("../common/config")),
  s = u(require("./props")),
  l = require("../common/utils");
function u(t) {
  return t && t.__esModule ? t : { default: t };
}
function f(t, e, c) {
  return (
    (e = o(e)),
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
        ? Reflect.construct(e, c || [], o(t).constructor)
        : e.apply(t, c)
    )
  );
}
var p = function (t, e, n, o) {
    var c,
      i = arguments.length,
      a =
        i < 3
          ? e
          : null === o
          ? (o = Object.getOwnPropertyDescriptor(e, n))
          : o;
    if (
      "object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) &&
      "function" == typeof Reflect.decorate
    )
      a = Reflect.decorate(t, e, n, o);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (c = t[s]) && (a = (i < 3 ? c(a) : i > 3 ? c(e, n, a) : c(e, n)) || a);
    return i > 3 && a && Object.defineProperty(e, n, a), a;
  },
  h = a.default.prefix,
  b = "".concat(h, "-dialog"),
  d = (function (n) {
    function o() {
      var t;
      return (
        e(this, o),
        ((t = f(this, o, arguments)).options = {
          multipleSlots: !0,
          addGlobalClass: !0,
        }),
        (t.externalClasses = [
          "".concat(h, "-class"),
          "".concat(h, "-class-content"),
          "".concat(h, "-class-confirm"),
          "".concat(h, "-class-cancel"),
          "".concat(h, "-class-action"),
        ]),
        (t.properties = s.default),
        (t.data = { prefix: h, classPrefix: b, buttonVariant: "text" }),
        (t.observers = {
          "confirmBtn, cancelBtn": function (t, e) {
            var n = this.data,
              o = n.prefix,
              c = n.classPrefix,
              i = n.buttonLayout,
              a = { buttonVariant: "text" },
              s = [t, e].some(function (t) {
                return (0, l.isObject)(t) && t.variant && "text" !== t.variant;
              }),
              u = { confirm: t, cancel: e },
              f = ["".concat(c, "__button")],
              p = [];
            s
              ? ((a.buttonVariant = "base"),
                f.push("".concat(c, "__button--").concat(i)))
              : (f.push("".concat(c, "__button--text")),
                p.push("".concat(c, "-button"))),
              Object.keys(u).forEach(function (t) {
                var e = u[t],
                  n = {
                    block: !0,
                    class: [].concat(f, ["".concat(c, "__button--").concat(t)]),
                    externalClass: [].concat(p, [
                      "".concat(o, "-class-").concat(t),
                    ]),
                    variant: a.buttonVariant,
                  };
                "cancel" === t &&
                  "base" === a.buttonVariant &&
                  (n.theme = "light"),
                  "string" == typeof e
                    ? (a["_".concat(t)] = Object.assign(Object.assign({}, n), {
                        content: e,
                      }))
                    : e && "object" === r(e)
                    ? (a["_".concat(t)] = Object.assign(
                        Object.assign({}, n),
                        e
                      ))
                    : (a["_".concat(t)] = null);
              }),
              this.setData(Object.assign({}, a));
          },
        }),
        (t.methods = {
          onTplButtonTap: function (t) {
            var e,
              n,
              o,
              c = t.type,
              r = t.target.dataset,
              i = r.type,
              a = r.extra,
              s = this.data["_".concat(i)],
              u = "bind".concat(c);
            if ("action" !== i) {
              if ("function" == typeof s[u]) s[u](t) && this.close();
              if (
                (!("openType" in s) &&
                  ["confirm", "cancel"].includes(i) &&
                  (null === (e = this[(0, l.toCamel)("on-".concat(i))]) ||
                    void 0 === e ||
                    e.call(this, i)),
                "tap" !== c)
              ) {
                var f =
                  (null ===
                    (o =
                      null === (n = t.detail) || void 0 === n
                        ? void 0
                        : n.errMsg) || void 0 === o
                    ? void 0
                    : o.indexOf("ok")) > -1;
                this.triggerEvent(
                  f ? "open-type-event" : "open-type-error-event",
                  t.detail
                );
              }
            } else this.onActionTap(a);
          },
          onConfirm: function () {
            this.triggerEvent("confirm"),
              this._onConfirm && (this._onConfirm(), this.close());
          },
          onCancel: function () {
            this.triggerEvent("close", { trigger: "cancel" }),
              this.triggerEvent("cancel"),
              this._onCancel && (this._onCancel(), this.close());
          },
          onClose: function () {
            this.triggerEvent("close", { trigger: "close-btn" }), this.close();
          },
          close: function () {
            this.setData({ visible: !1 });
          },
          overlayClick: function () {
            this.properties.closeOnOverlayClick &&
              this.triggerEvent("close", { trigger: "overlay" }),
              this.triggerEvent("overlay-click");
          },
          onActionTap: function (t) {
            this.triggerEvent("action", { index: t }),
              this._onAction && (this._onAction({ index: t }), this.close());
          },
          openValueCBHandle: function (t) {
            this.triggerEvent("open-type-event", t.detail);
          },
          openValueErrCBHandle: function (t) {
            this.triggerEvent("open-type-error-event", t.detail);
          },
        }),
        t
      );
    }
    return c(o, n), t(o);
  })(i.SuperComponent);
d = p([(0, i.wxComponent)()], d);
exports.default = d;
