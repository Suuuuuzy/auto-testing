(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishesComponents/dishBanner/components/storeLayout4"],
  {
    "1c04": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return a;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          var n = this,
            e = (n.$createElement, n._self._c, n.__get_style([n.mcInfoStyle])),
            t = n.__get_style([n.mcInfoStyleRadius]);
          n.$mp.data = Object.assign({}, { $root: { s0: e, s1: t } });
        },
        a = [];
    },
    "22cb": function (n, e, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = { name: "Layout4", mixins: [o(t("0b73")).default] };
      e.default = a;
    },
    "26a4": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("22cb"),
        a = t.n(o);
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(s);
      e.default = a.a;
    },
    "940a": function (n, e, t) {},
    c4a0: function (n, e, t) {
      "use strict";
      var o = t("940a");
      t.n(o).a;
    },
    f9bc: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("1c04"),
        a = t("26a4");
      for (var s in a)
        ["default"].indexOf(s) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return a[n];
            });
          })(s);
      t("c4a0");
      var c = t("f0c5"),
        r = Object(c.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "5954e989",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = r.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishesComponents/dishBanner/components/storeLayout4-create-component",
    {
      "baseComponents/dishesComponents/dishBanner/components/storeLayout4-create-component":
        function (n, e, t) {
          t("543d").createComponent(t("f9bc"));
        },
    },
    [
      [
        "baseComponents/dishesComponents/dishBanner/components/storeLayout4-create-component",
      ],
    ],
  ]);
