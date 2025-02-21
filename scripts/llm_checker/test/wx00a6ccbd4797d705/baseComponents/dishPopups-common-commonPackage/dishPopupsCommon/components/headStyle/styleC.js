(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC",
  ],
  {
    "58bc": function (o, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0),
        (e.default = {
          props: {
            themeColor: "",
            btnTxtColor: "",
            sales: { default: "" },
            imgUrl: { default: "" },
            itemName: { default: "" },
            desp: { default: "" },
            showShare: !1,
            promName: "",
            promotionLimit: "",
            hyOrderLimit: "",
            context: "",
            customSalesText: "",
          },
        });
    },
    "592f6": function (o, e, n) {
      "use strict";
      var t = n("dcd4");
      n.n(t).a;
    },
    "6df7": function (o, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return t;
      }),
        n.d(e, "c", function () {
          return c;
        }),
        n.d(e, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
    ac89: function (o, e, n) {
      "use strict";
      n.r(e);
      var t = n("58bc"),
        c = n.n(t);
      for (var a in t)
        ["default"].indexOf(a) < 0 &&
          (function (o) {
            n.d(e, o, function () {
              return t[o];
            });
          })(a);
      e.default = c.a;
    },
    dcd4: function (o, e, n) {},
    e32e: function (o, e, n) {
      "use strict";
      n.r(e);
      var t = n("6df7"),
        c = n("ac89");
      for (var a in c)
        ["default"].indexOf(a) < 0 &&
          (function (o) {
            n.d(e, o, function () {
              return c[o];
            });
          })(a);
      n("592f6");
      var s = n("f0c5"),
        u = Object(s.a)(
          c.default,
          t.b,
          t.c,
          !1,
          null,
          "58582dc7",
          null,
          !1,
          t.a,
          void 0
        );
      e.default = u.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC-create-component":
        function (o, e, n) {
          n("543d").createComponent(n("e32e"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC-create-component",
      ],
    ],
  ]);
