(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/stampCollectingPopup/index"],
  {
    "1afa": function (n, e, t) {
      "use strict";
      var o = t("f0d4");
      t.n(o).a;
    },
    "33da": function (n, e, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = o(t("2309")),
        c = {
          mixins: [o(t("461a")).default],
          components: {
            wxPopup: function () {
              Promise.all([
                t.e("common/vendor"),
                t.e("baseComponents/wxpopup/popup"),
              ])
                .then(
                  function () {
                    return resolve(t("0387"));
                  }.bind(null, t)
                )
                .catch(t.oe);
            },
          },
          data: function () {
            return { showPopup: !1 };
          },
          methods: {
            showFun: function () {
              this.showPopup = !0;
            },
            beforgo: function () {
              this.$emit("goStampCollecting", "stampCollecting");
            },
            go: function () {
              var n = this;
              a.default.initDecoration("CD").then(
                function (e) {
                  n.toPage({ page: "stampCollecting", context: "CD" });
                },
                function (e) {
                  a.default.setBusState(
                    "error",
                    { type: 1, message: e },
                    "SYSTEM"
                  ),
                    n.toPage({ page: "errorPage", context: "SYSTEM" });
                }
              );
            },
            close: function () {
              (this.showPopup = !1), this.$emit("cbFun");
            },
          },
        };
      e.default = c;
    },
    "80ea8": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return a;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    "8fe0": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("80ea8"),
        a = t("cb9c");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return a[n];
            });
          })(c);
      t("1afa");
      var u = t("f0c5"),
        i = Object(u.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "f18fb15e",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = i.exports;
    },
    cb9c: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("33da"),
        a = t.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(c);
      e.default = a.a;
    },
    f0d4: function (n, e, t) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/stampCollectingPopup/index-create-component",
    {
      "baseComponents/stampCollectingPopup/index-create-component": function (
        n,
        e,
        t
      ) {
        t("543d").createComponent(t("8fe0"));
      },
    },
    [["baseComponents/stampCollectingPopup/index-create-component"]],
  ]);
