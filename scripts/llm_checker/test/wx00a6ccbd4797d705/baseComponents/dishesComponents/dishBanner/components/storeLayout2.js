(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishesComponents/dishBanner/components/storeLayout2"],
  {
    "258d": function (n, e, t) {},
    "5fbdf": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return s;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        s = [];
    },
    8070: function (n, e, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var s = { name: "Layout2", mixins: [o(t("0b73")).default] };
      e.default = s;
    },
    "9b7d": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("8070"),
        s = t.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      e.default = s.a;
    },
    cc95: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("5fbdf"),
        s = t("9b7d");
      for (var a in s)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return s[n];
            });
          })(a);
      t("f416");
      var c = t("f0c5"),
        u = Object(c.a)(
          s.default,
          o.b,
          o.c,
          !1,
          null,
          "d3d47924",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = u.exports;
    },
    f416: function (n, e, t) {
      "use strict";
      var o = t("258d");
      t.n(o).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishesComponents/dishBanner/components/storeLayout2-create-component",
    {
      "baseComponents/dishesComponents/dishBanner/components/storeLayout2-create-component":
        function (n, e, t) {
          t("543d").createComponent(t("cc95"));
        },
    },
    [
      [
        "baseComponents/dishesComponents/dishBanner/components/storeLayout2-create-component",
      ],
    ],
  ]);
