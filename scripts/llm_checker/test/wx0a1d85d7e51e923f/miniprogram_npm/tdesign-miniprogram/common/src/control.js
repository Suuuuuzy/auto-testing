Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.useControl = function () {
    var n = this,
      a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      r = Object.assign(Object.assign({}, t), a),
      u = r.valueKey,
      i = r.defaultValueKey,
      c = r.changeEventName,
      l = r.strict,
      o = this.properties || {},
      s = o[u],
      v = o[l ? i : u],
      f = !1;
    l && null != s && (f = !0);
    var g = function (t, a, r) {
      n.setData(Object.assign(e({}, "_".concat(u), t), a), r);
    };
    return {
      controlled: f,
      initValue: f ? s : v,
      set: g,
      get: function () {
        return n.data["_".concat(u)];
      },
      change: function (e, t, a) {
        n.triggerEvent(c, void 0 !== t ? t : e),
          f || ("function" == typeof a ? a() : g(e));
      },
    };
  });
var e = require("../../../../@babel/runtime/helpers/defineProperty"),
  t = {
    valueKey: "value",
    defaultValueKey: "defaultValue",
    changeEventName: "change",
    strict: !0,
  };
