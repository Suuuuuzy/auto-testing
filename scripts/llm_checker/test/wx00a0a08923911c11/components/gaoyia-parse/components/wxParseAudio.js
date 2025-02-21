(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/gaoyia-parse/components/wxParseAudio"],
  {
    "3c4a": function (n, e, t) {
      "use strict";
      var u;
      t.d(e, "b", function () {
        return a;
      }),
        t.d(e, "c", function () {
          return r;
        }),
        t.d(e, "a", function () {
          return u;
        });
      var a = function () {
          var n = this,
            e = n.$createElement;
          n._self._c;
        },
        r = [];
    },
    "70ad": function (n, e, t) {
      "use strict";
      t.r(e);
      var u = t("3c4a"),
        a = t("a9be");
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return a[n];
            });
          })(r);
      var o,
        c = t("f0c5"),
        f = Object(c["a"])(
          a["default"],
          u["b"],
          u["c"],
          !1,
          null,
          null,
          null,
          !1,
          u["a"],
          o
        );
      e["default"] = f.exports;
    },
    a9be: function (n, e, t) {
      "use strict";
      t.r(e);
      var u = t("d464"),
        a = t.n(u);
      for (var r in u)
        ["default"].indexOf(r) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return u[n];
            });
          })(r);
      e["default"] = a.a;
    },
    d464: function (n, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      e.default = {
        name: "wxParseAudio",
        props: {
          node: {
            type: Object,
            default: function () {
              return {};
            },
          },
        },
      };
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/gaoyia-parse/components/wxParseAudio-create-component",
  {
    "components/gaoyia-parse/components/wxParseAudio-create-component":
      function (module, exports, __webpack_require__) {
        __webpack_require__("543d")["createComponent"](
          __webpack_require__("70ad")
        );
      },
  },
  [["components/gaoyia-parse/components/wxParseAudio-create-component"]],
]);
