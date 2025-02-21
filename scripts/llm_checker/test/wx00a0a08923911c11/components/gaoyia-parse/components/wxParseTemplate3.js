(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/gaoyia-parse/components/wxParseTemplate3"],
  {
    "0bfa": function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t("b8d4"),
        o = t("9b3a");
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(r);
      var c,
        u = t("f0c5"),
        i = Object(u["a"])(
          o["default"],
          a["b"],
          a["c"],
          !1,
          null,
          null,
          null,
          !1,
          a["a"],
          c
        );
      n["default"] = i.exports;
    },
    "2edf": function (e, n, t) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = function () {
          t.e("components/gaoyia-parse/components/wxParseTemplate4")
            .then(
              function () {
                return resolve(t("b825"));
              }.bind(null, t)
            )
            .catch(t.oe);
        },
        o = function () {
          t.e("components/gaoyia-parse/components/wxParseImg")
            .then(
              function () {
                return resolve(t("782c"));
              }.bind(null, t)
            )
            .catch(t.oe);
        },
        r = function () {
          t.e("components/gaoyia-parse/components/wxParseVideo")
            .then(
              function () {
                return resolve(t("ead2"));
              }.bind(null, t)
            )
            .catch(t.oe);
        },
        c = function () {
          t.e("components/gaoyia-parse/components/wxParseAudio")
            .then(
              function () {
                return resolve(t("70ad"));
              }.bind(null, t)
            )
            .catch(t.oe);
        },
        u = function () {
          t.e("components/gaoyia-parse/components/wxParseTable")
            .then(
              function () {
                return resolve(t("512b"));
              }.bind(null, t)
            )
            .catch(t.oe);
        };
      n.default = {
        name: "wxParseTemplate3",
        props: { node: {} },
        components: {
          wxParseTemplate: a,
          wxParseImg: o,
          wxParseVideo: r,
          wxParseAudio: c,
          wxParseTable: u,
        },
        methods: {
          wxParseATap: function (e, n) {
            var t = n.currentTarget.dataset.href;
            if (t) {
              var a = this.$parent;
              while (!a.preview || "function" !== typeof a.preview)
                a = a.$parent;
              a.navigate(t, n, e);
            }
          },
        },
      };
    },
    "9b3a": function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t("2edf"),
        o = t.n(a);
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return a[e];
            });
          })(r);
      n["default"] = o.a;
    },
    b8d4: function (e, n, t) {
      "use strict";
      var a;
      t.d(n, "b", function () {
        return o;
      }),
        t.d(n, "c", function () {
          return r;
        }),
        t.d(n, "a", function () {
          return a;
        });
      var o = function () {
          var e = this,
            n = e.$createElement;
          e._self._c;
        },
        r = [];
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/gaoyia-parse/components/wxParseTemplate3-create-component",
  {
    "components/gaoyia-parse/components/wxParseTemplate3-create-component":
      function (module, exports, __webpack_require__) {
        __webpack_require__("543d")["createComponent"](
          __webpack_require__("0bfa")
        );
      },
  },
  [["components/gaoyia-parse/components/wxParseTemplate3-create-component"]],
]);
