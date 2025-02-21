(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price",
  ],
  {
    4478: function (e, o, t) {
      "use strict";
      t.d(o, "b", function () {
        return n;
      }),
        t.d(o, "c", function () {
          return r;
        }),
        t.d(o, "a", function () {});
      var n = function () {
          this.$createElement, this._self._c;
        },
        r = [];
    },
    "8c623": function (e, o, t) {
      "use strict";
      var n = t("b23f");
      t.n(n).a;
    },
    b23f: function (e, o, t) {},
    c713: function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("4478"),
        r = t("c872");
      for (var a in r)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return r[e];
            });
          })(a);
      t("8c623");
      var c = t("f0c5"),
        i = Object(c.a)(
          r.default,
          n.b,
          n.c,
          !1,
          null,
          "16028948",
          null,
          !1,
          n.a,
          void 0
        );
      o.default = i.exports;
    },
    c872: function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("cb29"),
        r = t.n(n);
      for (var a in n)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return n[e];
            });
          })(a);
      o.default = r.a;
    },
    cb29: function (e, o, t) {
      "use strict";
      var n = t("4ea4");
      Object.defineProperty(o, "__esModule", { value: !0 }),
        (o.default = void 0);
      var r = {
        name: "Price",
        mixins: [n(t("2987")).default],
        props: {
          addCartBar: {
            type: Object,
            default: function () {
              return {};
            },
          },
          popType: { type: String, default: "1" },
          context: { type: String, default: "" },
          onlyShowOriginalPrice: { type: Boolean, default: !1 },
          isTcPop: { type: Boolean, default: !1 },
        },
        computed: {
          tcYouHui: function () {
            var e =
              this.addCartBar.curStdPrice - this.processedPrice.active.price;
            return +(e > 0 ? e : 0).toFixed(2);
          },
          stdPriceColor: function () {
            return "1" == this.popType || 1 == this.addCartBar.showPriceType
              ? this.addCartBar.themeColor
              : "#000";
          },
          promVipPriceColor: function () {
            return "1" == this.popType ? "#000" : this.addCartBar.themeColor;
          },
        },
        data: function () {
          return {};
        },
        methods: {
          setPriceObj: function (e, o) {
            var t =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : "",
              n =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {};
            return { priceType: e, price: o, priceName: t, extraMsg: n };
          },
        },
      };
      o.default = r;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price-create-component":
        function (e, o, t) {
          t("543d").createComponent(t("c713"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price-create-component",
      ],
    ],
  ]);
