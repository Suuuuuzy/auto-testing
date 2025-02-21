(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/web"],
  {
    "04ef": function (e, t, n) {
      "use strict";
      n.r(t);
      var u = n("688d"),
        r = n.n(u);
      for (var a in u)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return u[e];
            });
          })(a);
      t["default"] = r.a;
    },
    "46ae": function (e, t, n) {
      "use strict";
      (function (e, t) {
        var u = n("47a9");
        n("b45a");
        u(n("3240"));
        var r = u(n("894e"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = n), t(r.default);
      }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    "688d": function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var u = {
        config: { navigationBarTitleText: "" },
        computed: {},
        data: function () {
          return { url: "" };
        },
        mounted: function () {
          var e = this.$root.$mp.query,
            t = decodeURIComponent(e.url);
          (this.url = t), console.log(this.url);
        },
      };
      t.default = u;
    },
    "7d1e": function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return u;
      }),
        n.d(t, "c", function () {
          return r;
        }),
        n.d(t, "a", function () {});
      var u = function () {
          var e = this.$createElement;
          this._self._c;
        },
        r = [];
    },
    "894e": function (e, t, n) {
      "use strict";
      n.r(t);
      var u = n("7d1e"),
        r = n("04ef");
      for (var a in r)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(a);
      var o = n("828b"),
        c = Object(o["a"])(
          r["default"],
          u["b"],
          u["c"],
          !1,
          null,
          "262c0f15",
          null,
          !1,
          u["a"],
          void 0
        );
      t["default"] = c.exports;
    },
  },
  [["46ae", "common/runtime", "common/vendor"]],
]);
