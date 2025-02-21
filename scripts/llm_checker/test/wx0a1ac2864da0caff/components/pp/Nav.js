(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/pp/Nav"],
  {
    "0c90": function (n, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var o = {
        props: {
          title: String,
          logo: Boolean,
          fixed: Boolean,
          white: Boolean,
          value: Boolean,
          placeholder: Number,
          transparent: Boolean,
          noCircle: Boolean,
          noTouch: Boolean,
          back: Boolean,
        },
        data: function () {
          return {};
        },
        methods: {
          backTo: function () {
            var n = getCurrentPages();
            n && 0 !== n.length && 1 !== n.length
              ? this.$router.back()
              : this.$router.push({ path: "/pages/index", reLaunch: !0 });
          },
        },
      };
      e.default = o;
    },
    1153: function (n, e, t) {
      "use strict";
      var o = t("6405"),
        a = t.n(o);
      a.a;
    },
    6405: function (n, e, t) {},
    "7ee8": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return a;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          var n = this.$createElement;
          this._self._c;
        },
        a = [];
    },
    ab90: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("0c90"),
        a = t.n(o);
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(r);
      e["default"] = a.a;
    },
    ac66: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("7ee8"),
        a = t("ab90");
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return a[n];
            });
          })(r);
      t("1153");
      var u = t("828b"),
        c = Object(u["a"])(
          a["default"],
          o["b"],
          o["c"],
          !1,
          null,
          "4d1f6152",
          null,
          !1,
          o["a"],
          void 0
        );
      e["default"] = c.exports;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/pp/Nav-create-component",
  {
    "components/pp/Nav-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("df3c")["createComponent"](
        __webpack_require__("ac66")
      );
    },
  },
  [["components/pp/Nav-create-component"]],
]);
