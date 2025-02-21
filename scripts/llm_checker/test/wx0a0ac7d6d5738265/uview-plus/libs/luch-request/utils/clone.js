var e = require("../../../../@babel/runtime/helpers/typeof"),
  t = (function () {
    function t(e, t) {
      return null != t && e instanceof t;
    }
    var r, n, o;
    try {
      r = Map;
    } catch (e) {
      r = function () {};
    }
    try {
      n = Set;
    } catch (e) {
      n = function () {};
    }
    try {
      o = Promise;
    } catch (e) {
      o = function () {};
    }
    function c(i, u, a, l, s) {
      "object" == e(u) &&
        ((a = u.depth),
        (l = u.prototype),
        (s = u.includeNonEnumerable),
        (u = u.circular));
      var p = [],
        b = [],
        y = ("undefined" == typeof Buffer ? "undefined" : e(Buffer)) < "u";
      return (
        e(u) > "u" && (u = !0),
        e(a) > "u" && (a = 1 / 0),
        (function i(a, g) {
          if (null === a) return null;
          if (0 === g) return a;
          var j, O;
          if ("object" != e(a)) return a;
          if (t(a, r)) j = new r();
          else if (t(a, n)) j = new n();
          else if (t(a, o))
            j = new o(function (e, t) {
              a.then(
                function (t) {
                  e(i(t, g - 1));
                },
                function (e) {
                  t(i(e, g - 1));
                }
              );
            });
          else if (c.__isArray(a)) j = [];
          else if (c.__isRegExp(a))
            (j = new RegExp(a.source, f(a))),
              a.lastIndex && (j.lastIndex = a.lastIndex);
          else if (c.__isDate(a)) j = new Date(a.getTime());
          else {
            if (y && Buffer.isBuffer(a))
              return (
                Buffer.from
                  ? (j = Buffer.from(a))
                  : ((j = new Buffer(a.length)), a.copy(j)),
                j
              );
            t(a, Error)
              ? (j = Object.create(a))
              : e(l) > "u"
              ? ((O = Object.getPrototypeOf(a)), (j = Object.create(O)))
              : ((j = Object.create(l)), (O = l));
          }
          if (u) {
            var d = p.indexOf(a);
            if (-1 != d) return b[d];
            p.push(a), b.push(j);
          }
          for (var _ in (t(a, r) &&
            a.forEach(function (e, t) {
              var r = i(t, g - 1),
                n = i(e, g - 1);
              j.set(r, n);
            }),
          t(a, n) &&
            a.forEach(function (e) {
              var t = i(e, g - 1);
              j.add(t);
            }),
          a)) {
            Object.getOwnPropertyDescriptor(a, _) && (j[_] = i(a[_], g - 1));
            try {
              if ("undefined" === Object.getOwnPropertyDescriptor(a, _).set)
                continue;
              j[_] = i(a[_], g - 1);
            } catch (e) {
              if (e instanceof TypeError) continue;
              if (e instanceof ReferenceError) continue;
            }
          }
          if (Object.getOwnPropertySymbols) {
            var h = Object.getOwnPropertySymbols(a);
            for (_ = 0; _ < h.length; _++) {
              var v = h[_];
              ((m = Object.getOwnPropertyDescriptor(a, v)) &&
                !m.enumerable &&
                !s) ||
                ((j[v] = i(a[v], g - 1)), Object.defineProperty(j, v, m));
            }
          }
          if (s) {
            var w = Object.getOwnPropertyNames(a);
            for (_ = 0; _ < w.length; _++) {
              var m,
                P = w[_];
              ((m = Object.getOwnPropertyDescriptor(a, P)) && m.enumerable) ||
                ((j[P] = i(a[P], g - 1)), Object.defineProperty(j, P, m));
            }
          }
          return j;
        })(i, a)
      );
    }
    function i(e) {
      return Object.prototype.toString.call(e);
    }
    function f(e) {
      var t = "";
      return (
        e.global && (t += "g"),
        e.ignoreCase && (t += "i"),
        e.multiline && (t += "m"),
        t
      );
    }
    return (
      (c.clonePrototype = function (e) {
        if (null === e) return null;
        var t = function () {};
        return (t.prototype = e), new t();
      }),
      (c.__objToStr = i),
      (c.__isDate = function (t) {
        return "object" == e(t) && "[object Date]" === i(t);
      }),
      (c.__isArray = function (t) {
        return "object" == e(t) && "[object Array]" === i(t);
      }),
      (c.__isRegExp = function (t) {
        return "object" == e(t) && "[object RegExp]" === i(t);
      }),
      (c.__getRegExpFlags = f),
      c
    );
  })();
exports.clone = t;
