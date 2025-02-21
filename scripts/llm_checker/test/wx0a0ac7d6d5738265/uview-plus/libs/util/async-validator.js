var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/typeof"),
  n = /%[sdj%]/g,
  t = function () {};
function i(e) {
  if (!e || !e.length) return null;
  var r = {};
  return (
    e.forEach(function (e) {
      var n = e.field;
      (r[n] = r[n] || []), r[n].push(e);
    }),
    r
  );
}
function a() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  var i = 1,
    a = r[0],
    s = r.length;
  if ("function" == typeof a) return a.apply(null, r.slice(1));
  if ("string" == typeof a) {
    for (
      var u = String(a).replace(n, function (e) {
          if ("%%" === e) return "%";
          if (i >= s) return e;
          switch (e) {
            case "%s":
              return String(r[i++]);
            case "%d":
              return Number(r[i++]);
            case "%j":
              try {
                return JSON.stringify(r[i++]);
              } catch (e) {
                return "[Circular]";
              }
              break;
            default:
              return e;
          }
        }),
        o = r[i];
      i < s;
      o = r[++i]
    )
      u += " ".concat(o);
    return u;
  }
  return a;
}
function s(e, r) {
  return !!(
    null == e ||
    ("array" === r && Array.isArray(e) && !e.length) ||
    ((function (e) {
      return (
        "string" === e ||
        "url" === e ||
        "hex" === e ||
        "email" === e ||
        "pattern" === e
      );
    })(r) &&
      "string" == typeof e &&
      !e)
  );
}
function u(e, r, n) {
  var t = 0,
    i = e.length;
  !(function a(s) {
    if (s && s.length) n(s);
    else {
      var u = t;
      (t += 1), u < i ? r(e[u], a) : n([]);
    }
  })([]);
}
function o(e, r, n, t) {
  if (r.first) {
    var a = new Promise(function (r, a) {
      u(
        (function (e) {
          var r = [];
          return (
            Object.keys(e).forEach(function (n) {
              r.push.apply(r, e[n]);
            }),
            r
          );
        })(e),
        n,
        function (e) {
          return t(e), e.length ? a({ errors: e, fields: i(e) }) : r();
        }
      );
    });
    return (
      a.catch(function (e) {
        return e;
      }),
      a
    );
  }
  var s = r.firstFields || [];
  !0 === s && (s = Object.keys(e));
  var o = Object.keys(e),
    f = o.length,
    l = 0,
    d = [],
    c = new Promise(function (r, a) {
      var c = function (e) {
        if ((d.push.apply(d, e), ++l === f))
          return t(d), d.length ? a({ errors: d, fields: i(d) }) : r();
      };
      o.length || (t(d), r()),
        o.forEach(function (r) {
          var t = e[r];
          -1 !== s.indexOf(r)
            ? u(t, n, c)
            : (function (e, r, n) {
                var t = [],
                  i = 0,
                  a = e.length;
                function s(e) {
                  t.push.apply(t, e), ++i === a && n(t);
                }
                e.forEach(function (e) {
                  r(e, s);
                });
              })(t, n, c);
        });
    });
  return (
    c.catch(function (e) {
      return e;
    }),
    c
  );
}
function f(e) {
  return function (r) {
    return r && r.message
      ? ((r.field = r.field || e.fullField), r)
      : {
          message: "function" == typeof r ? r() : r,
          field: r.field || e.fullField,
        };
  };
}
function l(n, t) {
  if (t)
    for (var i in t)
      if (t.hasOwnProperty(i)) {
        var a = t[i];
        "object" == r(a) && "object" == r(n[i])
          ? (n[i] = e(e({}, n[i]), a))
          : (n[i] = a);
      }
  return n;
}
function d(e, r, n, t, i, u) {
  e.required &&
    (!n.hasOwnProperty(e.field) || s(r, u || e.type)) &&
    t.push(a(i.messages.required, e.fullField));
}
("undefined" == typeof process ? "undefined" : r(process)) < "u" &&
  process.env &&
  ("undefined" == typeof window ? "undefined" : r(window)) < "u" &&
  ("undefined" == typeof document ? "undefined" : r(document)) < "u" &&
  (t = function (e, n) {
    ("undefined" == typeof console ? "undefined" : r(console)) < "u" &&
      console.warn &&
      n.every(function (e) {
        return "string" == typeof e;
      }) &&
      console.warn(e, n);
  });
var c = {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  },
  p = {
    integer: function (e) {
      return /^(-)?\d+$/.test(e);
    },
    float: function (e) {
      return /^(-)?\d+(\.\d+)?$/.test(e);
    },
    array: function (e) {
      return Array.isArray(e);
    },
    regexp: function (e) {
      if (e instanceof RegExp) return !0;
      try {
        return !!new RegExp(e);
      } catch (e) {
        return !1;
      }
    },
    date: function (e) {
      return (
        "function" == typeof e.getTime &&
        "function" == typeof e.getMonth &&
        "function" == typeof e.getYear
      );
    },
    number: function (e) {
      return !isNaN(e) && "number" == typeof +e;
    },
    object: function (e) {
      return "object" == r(e) && !p.array(e);
    },
    method: function (e) {
      return "function" == typeof e;
    },
    email: function (e) {
      return "string" == typeof e && !!e.match(c.email) && e.length < 255;
    },
    url: function (e) {
      return "string" == typeof e && !!e.match(c.url);
    },
    hex: function (e) {
      return "string" == typeof e && !!e.match(c.hex);
    },
  };
var y = "enum";
var h = {
  required: d,
  whitespace: function (e, r, n, t, i) {
    (/^\s+$/.test(r) || "" === r) &&
      t.push(a(i.messages.whitespace, e.fullField));
  },
  type: function (e, n, t, i, s) {
    if (e.required && void 0 === n) d(e, n, t, i, s);
    else {
      var u = e.type;
      [
        "integer",
        "float",
        "array",
        "regexp",
        "object",
        "method",
        "email",
        "number",
        "date",
        "url",
        "hex",
      ].indexOf(u) > -1
        ? p[u](n) || i.push(a(s.messages.types[u], e.fullField, e.type))
        : u &&
          r(n) !== e.type &&
          i.push(a(s.messages.types[u], e.fullField, e.type));
    }
  },
  range: function (e, r, n, t, i) {
    var s = "number" == typeof e.len,
      u = "number" == typeof e.min,
      o = "number" == typeof e.max,
      f = r,
      l = null,
      d = "number" == typeof r,
      c = "string" == typeof r,
      p = Array.isArray(r);
    if ((d ? (l = "number") : c ? (l = "string") : p && (l = "array"), !l))
      return !1;
    p && (f = r.length),
      c && (f = r.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "_").length),
      s
        ? f !== e.len && t.push(a(i.messages[l].len, e.fullField, e.len))
        : u && !o && f < e.min
        ? t.push(a(i.messages[l].min, e.fullField, e.min))
        : o && !u && f > e.max
        ? t.push(a(i.messages[l].max, e.fullField, e.max))
        : u &&
          o &&
          (f < e.min || f > e.max) &&
          t.push(a(i.messages[l].range, e.fullField, e.min, e.max));
  },
  enum: function (e, r, n, t, i) {
    (e[y] = Array.isArray(e[y]) ? e[y] : []),
      -1 === e[y].indexOf(r) &&
        t.push(a(i.messages[y], e.fullField, e[y].join(", ")));
  },
  pattern: function (e, r, n, t, i) {
    e.pattern &&
      (e.pattern instanceof RegExp
        ? ((e.pattern.lastIndex = 0),
          e.pattern.test(r) ||
            t.push(a(i.messages.pattern.mismatch, e.fullField, r, e.pattern)))
        : "string" == typeof e.pattern &&
          (new RegExp(e.pattern).test(r) ||
            t.push(a(i.messages.pattern.mismatch, e.fullField, r, e.pattern))));
  },
};
function g(e, r, n, t, i) {
  var a = e.type,
    u = [];
  if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
    if (s(r, a) && !e.required) return n();
    h.required(e, r, t, u, i, a), s(r, a) || h.type(e, r, t, u, i);
  }
  n(u);
}
var m = {
  string: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r, "string") && !e.required) return n();
      h.required(e, r, t, a, i, "string"),
        s(r, "string") ||
          (h.type(e, r, t, a, i),
          h.range(e, r, t, a, i),
          h.pattern(e, r, t, a, i),
          !0 === e.whitespace && h.whitespace(e, r, t, a, i));
    }
    n(a);
  },
  method: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i), void 0 !== r && h.type(e, r, t, a, i);
    }
    n(a);
  },
  number: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (("" === r && (r = void 0), s(r) && !e.required)) return n();
      h.required(e, r, t, a, i),
        void 0 !== r && (h.type(e, r, t, a, i), h.range(e, r, t, a, i));
    }
    n(a);
  },
  boolean: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i), void 0 !== r && h.type(e, r, t, a, i);
    }
    n(a);
  },
  regexp: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i), s(r) || h.type(e, r, t, a, i);
    }
    n(a);
  },
  integer: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i),
        void 0 !== r && (h.type(e, r, t, a, i), h.range(e, r, t, a, i));
    }
    n(a);
  },
  float: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i),
        void 0 !== r && (h.type(e, r, t, a, i), h.range(e, r, t, a, i));
    }
    n(a);
  },
  array: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r, "array") && !e.required) return n();
      h.required(e, r, t, a, i, "array"),
        s(r, "array") || (h.type(e, r, t, a, i), h.range(e, r, t, a, i));
    }
    n(a);
  },
  object: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i), void 0 !== r && h.type(e, r, t, a, i);
    }
    n(a);
  },
  enum: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i), void 0 !== r && h.enum(e, r, t, a, i);
    }
    n(a);
  },
  pattern: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r, "string") && !e.required) return n();
      h.required(e, r, t, a, i), s(r, "string") || h.pattern(e, r, t, a, i);
    }
    n(a);
  },
  date: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      var u;
      if ((h.required(e, r, t, a, i), !s(r)))
        (u = "number" == typeof r ? new Date(r) : r),
          h.type(e, u, t, a, i),
          u && h.range(e, u.getTime(), t, a, i);
    }
    n(a);
  },
  url: g,
  hex: g,
  email: g,
  required: function (e, n, t, i, a) {
    var s = [],
      u = Array.isArray(n) ? "array" : r(n);
    h.required(e, n, i, s, a, u), t(s);
  },
  any: function (e, r, n, t, i) {
    var a = [];
    if (e.required || (!e.required && t.hasOwnProperty(e.field))) {
      if (s(r) && !e.required) return n();
      h.required(e, r, t, a, i);
    }
    n(a);
  },
};
function v() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid",
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s",
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters",
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s",
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length",
    },
    pattern: { mismatch: "%s value %s does not match pattern %s" },
    clone: function () {
      var e = JSON.parse(JSON.stringify(this));
      return (e.clone = this.clone), e;
    },
  };
}
var q = v();
function b(e) {
  (this.rules = null), (this._messages = q), this.define(e);
}
(b.prototype = {
  messages: function (e) {
    return e && (this._messages = l(v(), e)), this._messages;
  },
  define: function (e) {
    if (!e) throw new Error("Cannot configure a schema with no rules");
    if ("object" != r(e) || Array.isArray(e))
      throw new Error("Rules must be an object");
    var n, t;
    for (n in ((this.rules = {}), e))
      e.hasOwnProperty(n) &&
        ((t = e[n]), (this.rules[n] = Array.isArray(t) ? t : [t]));
  },
  validate: function (n, t, s) {
    var u = this;
    void 0 === t && (t = {}), void 0 === s && (s = function () {});
    var d,
      c,
      p = n,
      y = t,
      h = s;
    if (
      ("function" == typeof y && ((h = y), (y = {})),
      !this.rules || 0 === Object.keys(this.rules).length)
    )
      return h && h(), Promise.resolve();
    if (y.messages) {
      var g = this.messages();
      g === q && (g = v()), l(g, y.messages), (y.messages = g);
    } else y.messages = this.messages();
    var m = {};
    (y.keys || Object.keys(this.rules)).forEach(function (r) {
      (d = u.rules[r]),
        (c = p[r]),
        d.forEach(function (t) {
          var i = t;
          "function" == typeof i.transform &&
            (p === n && (p = e({}, p)), (c = p[r] = i.transform(c))),
            ((i =
              "function" == typeof i ? { validator: i } : e({}, i)).validator =
              u.getValidationMethod(i)),
            (i.field = r),
            (i.fullField = i.fullField || r),
            (i.type = u.getType(i)),
            i.validator &&
              ((m[r] = m[r] || []),
              m[r].push({ rule: i, value: c, source: p, field: r }));
        });
    });
    var w = {};
    return o(
      m,
      y,
      function (n, t) {
        var i,
          s = n.rule,
          u = !(
            ("object" !== s.type && "array" !== s.type) ||
            ("object" != r(s.fields) && "object" != r(s.defaultField))
          );
        function o(r, n) {
          return e(
            e({}, n),
            {},
            { fullField: "".concat(s.fullField, ".").concat(r) }
          );
        }
        function l(r) {
          void 0 === r && (r = []);
          var i = r;
          if (
            (Array.isArray(i) || (i = [i]),
            !y.suppressWarning && i.length && b.warning("async-validator:", i),
            i.length && s.message && (i = [].concat(s.message)),
            (i = i.map(f(s))),
            y.first && i.length)
          )
            return (w[s.field] = 1), t(i);
          if (u) {
            if (s.required && !n.value)
              return (
                (i = s.message
                  ? [].concat(s.message).map(f(s))
                  : y.error
                  ? [y.error(s, a(y.messages.required, s.field))]
                  : []),
                t(i)
              );
            var l = {};
            if (s.defaultField)
              for (var d in n.value)
                n.value.hasOwnProperty(d) && (l[d] = s.defaultField);
            for (var c in (l = e(e({}, l), n.rule.fields)))
              if (l.hasOwnProperty(c)) {
                var p = Array.isArray(l[c]) ? l[c] : [l[c]];
                l[c] = p.map(o.bind(null, c));
              }
            var h = new b(l);
            h.messages(y.messages),
              n.rule.options &&
                ((n.rule.options.messages = y.messages),
                (n.rule.options.error = y.error)),
              h.validate(n.value, n.rule.options || y, function (e) {
                var r = [];
                i && i.length && r.push.apply(r, i),
                  e && e.length && r.push.apply(r, e),
                  t(r.length ? r : null);
              });
          } else t(i);
        }
        (u = u && (s.required || (!s.required && n.value))),
          (s.field = n.field),
          s.asyncValidator
            ? (i = s.asyncValidator(s, n.value, l, n.source, y))
            : s.validator &&
              (!0 === (i = s.validator(s, n.value, l, n.source, y))
                ? l()
                : !1 === i
                ? l(s.message || "".concat(s.field, " fails"))
                : i instanceof Array
                ? l(i)
                : i instanceof Error && l(i.message)),
          i &&
            i.then &&
            i.then(
              function () {
                return l();
              },
              function (e) {
                return l(e);
              }
            );
      },
      function (e) {
        !(function (e) {
          var r,
            n,
            t,
            a = [],
            s = {};
          for (r = 0; r < e.length; r++)
            (n = e[r]),
              (t = void 0),
              Array.isArray(n) ? (a = (t = a).concat.apply(t, n)) : a.push(n);
          a.length ? (s = i(a)) : ((a = null), (s = null)), h(a, s);
        })(e);
      }
    );
  },
  getType: function (e) {
    if (
      (void 0 === e.type && e.pattern instanceof RegExp && (e.type = "pattern"),
      "function" != typeof e.validator && e.type && !m.hasOwnProperty(e.type))
    )
      throw new Error(a("Unknown rule type %s", e.type));
    return e.type || "string";
  },
  getValidationMethod: function (e) {
    if ("function" == typeof e.validator) return e.validator;
    var r = Object.keys(e),
      n = r.indexOf("message");
    return (
      -1 !== n && r.splice(n, 1),
      1 === r.length && "required" === r[0]
        ? m.required
        : m[this.getType(e)] || !1
    );
  },
}),
  (b.register = function (e, r) {
    if ("function" != typeof r)
      throw new Error(
        "Cannot register a validator by type, validator is not a function"
      );
    m[e] = r;
  }),
  (b.warning = t),
  (b.messages = q),
  (exports.Schema = b);
