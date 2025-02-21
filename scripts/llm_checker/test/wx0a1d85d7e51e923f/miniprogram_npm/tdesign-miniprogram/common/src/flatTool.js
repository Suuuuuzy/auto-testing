Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.toObject =
    exports.iterateInheritedPrototype =
    exports.isPlainObject =
    exports.isObject =
    exports.getPrototypeOf =
      void 0);
var t = require("../../../../@babel/runtime/helpers/typeof"),
  e = (exports.getPrototypeOf = function (t) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(t) : t.__proto__;
  }),
  r = (exports.isObject = function (e) {
    var r = t(e);
    return null !== e && ("function" === r || "object" === r);
  }),
  o = (exports.iterateInheritedPrototype = function (t, r, o) {
    for (
      var n =
          !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        i = r.prototype || r,
        c = o.prototype || o;
      i && (n || i !== c) && !1 !== t(i) && i !== c;

    )
      i = e(i);
  });
(exports.toObject = function (t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = {};
  if (!r(t)) return n;
  var i = e.excludes || ["constructor"],
    c = e.enumerable,
    p = void 0 === c || c,
    a = e.configurable,
    b = void 0 === a ? 0 : a,
    s = e.writable,
    u = void 0 === s ? 0 : s,
    f = {};
  return (
    0 !== p && (f.enumerable = p),
    0 !== b && (f.configurable = b),
    0 !== u && (f.writable = u),
    o(
      function (t) {
        Object.getOwnPropertyNames(t).forEach(function (r) {
          if (
            !(i.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(n, r))
          ) {
            var o = Object.getOwnPropertyDescriptor(t, r);
            ["get", "set", "value"].forEach(function (t) {
              if ("function" == typeof o[t]) {
                var r = o[t];
                o[t] = function () {
                  for (
                    var t = arguments.length, o = new Array(t), n = 0;
                    n < t;
                    n++
                  )
                    o[n] = arguments[n];
                  return r.apply(
                    Object.prototype.hasOwnProperty.call(e, "bindTo")
                      ? e.bindTo
                      : this,
                    o
                  );
                };
              }
            }),
              Object.defineProperty(
                n,
                r,
                Object.assign(Object.assign({}, o), f)
              );
          }
        });
      },
      t,
      e.till || Object,
      !1
    ),
    n
  );
}),
  (exports.isPlainObject = function (t) {
    return "[object Object]" === Object.prototype.toString.call(t);
  });
