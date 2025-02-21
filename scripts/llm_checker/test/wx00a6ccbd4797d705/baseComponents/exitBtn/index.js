(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/exitBtn/index"],
  {
    "193dd": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return c;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
    4678: function (n, e, t) {},
    "5af2": function (n, e, t) {
      "use strict";
      (function (n) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = {
          name: "exitBtn",
          context: "SYSTEM",
          props: { styleStr: { default: "" } },
          methods: {
            closeWindow: t("ca00").closeWindow,
            closeAli: function () {
              n.showToast({
                title: "亲，退出当前小程序需点击屏幕右上角的叉号",
                icon: "none",
                duration: 2e3,
              });
            },
          },
        };
        e.default = o;
      }).call(this, t("543d").default);
    },
    "935e": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("193dd"),
        c = t("c847");
      for (var a in c)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return c[n];
            });
          })(a);
      t("cc9a");
      var i = t("f0c5"),
        u = Object(i.a)(
          c.default,
          o.b,
          o.c,
          !1,
          null,
          "ba585e98",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = u.exports;
    },
    c847: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("5af2"),
        c = t.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      e.default = c.a;
    },
    cc9a: function (n, e, t) {
      "use strict";
      var o = t("4678");
      t.n(o).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/exitBtn/index-create-component",
    {
      "baseComponents/exitBtn/index-create-component": function (n, e, t) {
        t("543d").createComponent(t("935e"));
      },
    },
    [["baseComponents/exitBtn/index-create-component"]],
  ]);
