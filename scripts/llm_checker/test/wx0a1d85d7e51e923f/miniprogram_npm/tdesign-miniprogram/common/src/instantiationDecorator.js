Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.wxComponent = exports.toComponent = void 0);
var e = require("../../../../@babel/runtime/helpers/createClass"),
  t = require("../../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../../../../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../../../../@babel/runtime/helpers/inherits"),
  i = require("../../../../@babel/runtime/helpers/defineProperty");
require("../../../../@babel/runtime/helpers/Arrayincludes");
var a = require("../../../../@babel/runtime/helpers/toConsumableArray"),
  s = require("./flatTool"),
  l = require("../version");
function c(e, t, o) {
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
var p = ["Created", "Attached", "Ready", "Moved", "Detached", "Error"].map(
    function (e) {
      return e.toLowerCase();
    }
  ),
  u = ["properties", "data", "observers", "methods", "behaviors"].concat(a(p), [
    "relations",
    "externalClasses",
    "options",
    "lifetimes",
    "pageLifeTimes",
    "definitionFilter",
  ]),
  f = (exports.toComponent = function (e) {
    var t = e.relations,
      r = e.behaviors,
      n = void 0 === r ? [] : r,
      o = e.externalClasses,
      l = void 0 === o ? [] : o;
    e.properties &&
      (Object.keys(e.properties).forEach(function (t) {
        var r = e.properties[t];
        (0, s.isPlainObject)(r) || (r = { type: r }), (e.properties[t] = r);
      }),
      [
        { key: "ariaHidden", type: Boolean },
        { key: "ariaRole", type: String },
        { key: "ariaLabel", type: String },
        { key: "ariaLabelledby", type: String },
        { key: "ariaDescribedby", type: String },
        { key: "ariaBusy", type: Boolean },
      ].forEach(function (t) {
        var r = t.key,
          n = t.type;
        e.properties[r] = { type: n };
      }),
      (e.properties.style = { type: String, value: "" }),
      (e.properties.customStyle = { type: String, value: "" }));
    e.methods || (e.methods = {}), e.lifetimes || (e.lifetimes = {});
    var c = {};
    if (t) {
      var f = {};
      Object.keys(t).forEach(function (e) {
        var r = t[e],
          n = ["parent", "ancestor"].includes(r.type) ? "parent" : "children",
          o = (function (e, t) {
            return Behavior({
              created: function () {
                var r = this;
                Object.defineProperty(this, "$".concat(e), {
                  get: function () {
                    var n = r.getRelationNodes(t) || [];
                    return "parent" === e ? n[0] : n;
                  },
                });
              },
            });
          })(n, e);
        f[n] = o;
      }),
        n.push.apply(
          n,
          a(
            Object.keys(f).map(function (e) {
              return f[e];
            })
          )
        );
    }
    if (
      ((e.behaviors = a(n)),
      (e.externalClasses = ["class"].concat(a(l))),
      Object.getOwnPropertyNames(e).forEach(function (t) {
        var r = Object.getOwnPropertyDescriptor(e, t);
        r &&
          (p.indexOf(t) < 0 && "function" == typeof r.value
            ? (Object.defineProperty(e.methods, t, r), delete e[t])
            : u.indexOf(t) < 0
            ? (c[t] = r)
            : p.indexOf(t) >= 0 && (e.lifetimes[t] = e[t]));
      }),
      Object.keys(c).length)
    ) {
      var y = e.lifetimes.created,
        d = e.lifetimes.attached,
        h = e.controlledProps,
        b = void 0 === h ? [] : h;
      (e.lifetimes.created = function () {
        Object.defineProperties(this, c);
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        y && y.apply(this, t);
      }),
        (e.lifetimes.attached = function () {
          for (
            var e = this, t = arguments.length, r = new Array(t), n = 0;
            n < t;
            n++
          )
            r[n] = arguments[n];
          d && d.apply(this, r),
            b.forEach(function (t) {
              var r = t.key,
                n = "default".concat(
                  r.replace(/^(\w)/, function (e, t) {
                    return t.toUpperCase();
                  })
                ),
                o = e.properties;
              null == o[r] && (e._selfControlled = !0),
                null == o[r] && null != o[n] && e.setData(i({}, r, o[n]));
            });
        }),
        (e.methods._trigger = function (e, t, r) {
          var n = b.find(function (t) {
            return t.event == e;
          });
          if (n) {
            var o = n.key;
            this._selfControlled && this.setData(i({}, o, t[o]));
          }
          this.triggerEvent(e, t, r);
        });
    }
    return e;
  });
exports.wxComponent = function () {
  return function (r) {
    var n = new ((function (r) {
      function n() {
        return t(this, n), c(this, n, arguments);
      }
      return o(n, r), e(n);
    })(r))();
    (n.options = n.options || {}),
      void 0 === n.options.addGlobalClass && (n.options.addGlobalClass = !0),
      (0, l.canUseVirtualHost)() && (n.options.virtualHost = !0);
    var i = f((0, s.toObject)(n));
    Component(i);
  };
};
