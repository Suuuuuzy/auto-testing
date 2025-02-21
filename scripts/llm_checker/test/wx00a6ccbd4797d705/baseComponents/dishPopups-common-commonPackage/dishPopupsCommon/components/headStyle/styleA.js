(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA",
  ],
  {
    "0a90": function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("cdbe"),
        a = t.n(n);
      for (var c in n)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return n[e];
            });
          })(c);
      o.default = a.a;
    },
    "32bf": function (e, o, t) {
      "use strict";
      t.d(o, "b", function () {
        return n;
      }),
        t.d(o, "c", function () {
          return a;
        }),
        t.d(o, "a", function () {});
      var n = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    "3c27": function (e, o, t) {
      "use strict";
      var n = t("5d6e");
      t.n(n).a;
    },
    "5d6e": function (e, o, t) {},
    c6e8: function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("32bf"),
        a = t("0a90");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return a[e];
            });
          })(c);
      t("3c27");
      var s = t("f0c5"),
        i = Object(s.a)(
          a.default,
          n.b,
          n.c,
          !1,
          null,
          "3accbe07",
          null,
          !1,
          n.a,
          void 0
        );
      o.default = i.exports;
    },
    cdbe: function (e, o, t) {
      "use strict";
      Object.defineProperty(o, "__esModule", { value: !0 }),
        (o.default = void 0),
        (o.default = {
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
            aspectRatio: { default: 1 },
            customSalesText: "",
          },
          data: function () {
            return { imageHeight: "150rpx" };
          },
          created: function () {
            1 !== this.aspectRatio &&
              (this.imageHeight = "".concat(160 / this.aspectRatio, "rpx"));
          },
        });
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA-create-component":
        function (e, o, t) {
          t("543d").createComponent(t("c6e8"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA-create-component",
      ],
    ],
  ]);
