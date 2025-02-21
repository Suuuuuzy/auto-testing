(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index",
  ],
  {
    "29d3": function (e, t, i) {},
    "4a9f6": function (e, t, i) {
      "use strict";
      i.r(t);
      var a = i("a011"),
        o = i.n(a);
      for (var n in a)
        ["default"].indexOf(n) < 0 &&
          (function (e) {
            i.d(t, e, function () {
              return a[e];
            });
          })(n);
      t.default = o.a;
    },
    "79e9": function (e, t, i) {
      "use strict";
      i.r(t);
      var a = i("c5a4"),
        o = i("4a9f6");
      for (var n in o)
        ["default"].indexOf(n) < 0 &&
          (function (e) {
            i.d(t, e, function () {
              return o[e];
            });
          })(n);
      i("b415");
      var c = i("f0c5"),
        d = Object(c.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          "b5e2635a",
          null,
          !1,
          a.a,
          void 0
        );
      t.default = d.exports;
    },
    a011: function (e, t, i) {
      "use strict";
      var a = i("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = a(i("2309")),
        n = {
          props: {
            itemData: {
              type: Object,
              default: function () {
                return {};
              },
            },
            dynamicShow: {
              type: Object,
              default: function () {
                return {
                  showAddPrice: !1,
                  showCook: !1,
                  showAddCookBtn: !1,
                  cookText: "",
                };
              },
            },
            showTcOriginalprice: { type: Boolean, default: !1 },
            showUnitName: { type: Boolean, default: !1 },
            showPriceType: { default: "1" },
            showDishLabel: { type: Boolean, default: !0 },
            themeColor: { default: "" },
            btnTxtColor: { default: "" },
            hasBgColor: { default: !1 },
            layout: { type: [String, Number], default: "1" },
            context: { default: "" },
          },
          data: function () {
            return {
              imgPaddingBottom: "75%",
              showAddPriceWhenDetailIsZero: !1,
            };
          },
          computed: {
            imgUrl: function () {
              var e = this.itemData,
                t = e.threeToFourFileName;
              return (
                (t =
                  "16" === this.layout || "17" === this.layout
                    ? e.threeToFourFileName
                    : ""),
                e.gifName || t || e.smallTaFileName
              );
            },
            vipAddPriceCalc: function () {
              return 4 == this.showPriceType
                ? this.itemData.nextVipAddPrice
                : 2 == this.showPriceType || 5 == this.showPriceType
                ? this.itemData.vipAddPrice
                : this.itemData.originalVipAddPrice;
            },
          },
          created: function () {
            var e = this.layout;
            if (
              ("16" === e || "17" === e
                ? (this.imgPaddingBottom = 100 / (3 / 4) + "%")
                : ("7" !== e && "9" !== e && "13" !== e && "18" !== e) ||
                  (this.imgPaddingBottom = "100%"),
              "DC" === this.context)
            ) {
              var t = o.default.getDecorate(this.context).decorationData.tcPage;
              this.showAddPriceWhenDetailIsZero =
                !!t.showAddPriceWhenDetailIsZero &&
                t.showAddPriceWhenDetailIsZero;
            }
          },
          methods: {
            imgAddDish: function () {
              this.$emit("imgAddDish");
            },
            ceptUnit: function (e) {
              return e.slice(0, 2) + (e.length > 2 ? "..." : "");
            },
            showCookPop: function () {
              this.$emit("showCookPop");
            },
            showDelDishPop: function () {
              this.$emit("showDelDishPop");
            },
          },
        };
      t.default = n;
    },
    b415: function (e, t, i) {
      "use strict";
      var a = i("29d3");
      i.n(a).a;
    },
    c5a4: function (e, t, i) {
      "use strict";
      i.d(t, "b", function () {
        return a;
      }),
        i.d(t, "c", function () {
          return o;
        }),
        i.d(t, "a", function () {});
      var a = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.showTcOriginalprice &&
              e.itemData.itemPrice != e.itemData.addPrice &&
              e.showTcOriginalprice
                ? e.ceptUnit(e.itemData.unitName)
                : null),
            i =
              (e.dynamicShow.showAddPrice || e.showAddPriceWhenDetailIsZero) &&
              e.itemData.addPrice > 0 &&
              ((e.itemData.isShowVipAddPrice &&
                e.itemData.addPrice == e.vipAddPriceCalc) ||
                !e.itemData.isShowVipAddPrice) &&
              e.showTcOriginalprice
                ? e.ceptUnit(e.itemData.unitName)
                : null,
            a =
              (e.dynamicShow.showAddPrice || e.showAddPriceWhenDetailIsZero) &&
              e.itemData.addPrice > 0 &&
              e.itemData.isShowVipAddPrice &&
              e.itemData.addPrice != e.vipAddPriceCalc &&
              e.showTcOriginalprice
                ? e.ceptUnit(e.itemData.unitName)
                : null,
            o =
              (e.dynamicShow.showAddPrice || e.showAddPriceWhenDetailIsZero) &&
              e.itemData.addPrice > 0 &&
              e.itemData.isShowVipAddPrice &&
              e.itemData.addPrice != e.vipAddPriceCalc &&
              e.showTcOriginalprice
                ? e.ceptUnit(e.itemData.unitName)
                : null,
            n =
              (e.dynamicShow.showAddPrice || e.showAddPriceWhenDetailIsZero) &&
              !e.itemData.addPrice &&
              e.itemData.isShowVipAddPrice &&
              e.itemData.addPrice != e.vipAddPriceCalc &&
              e.showTcOriginalprice
                ? e.ceptUnit(e.itemData.unitName)
                : null;
          e.$mp.data = Object.assign(
            {},
            { $root: { m0: t, m1: i, m2: a, m3: o, m4: n } }
          );
        },
        o = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index-create-component",
    {
      "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index-create-component":
        function (e, t, i) {
          i("543d").createComponent(i("79e9"));
        },
    },
    [
      [
        "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index-create-component",
      ],
    ],
  ]);
