(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index",
  ],
  {
    "4d65": function (e, t, o) {
      "use strict";
      o.d(t, "b", function () {
        return i;
      }),
        o.d(t, "c", function () {
          return s;
        }),
        o.d(t, "a", function () {});
      var i = function () {
          this.$createElement, this._self._c;
        },
        s = [];
    },
    a93f: function (e, t, o) {
      "use strict";
      var i = o("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var s = {
        name: "dishItem",
        mixins: [i(o("83b5")).default],
        props: {
          layout: { type: [Number, String], default: 0 },
          dishType: { type: String, default: "" },
          lazyLoad: { default: !1 },
        },
        components: {
          layout9: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9"
              ),
            ])
              .then(
                function () {
                  return resolve(o("b501"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          layout23: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23"
              ),
            ])
              .then(
                function () {
                  return resolve(o("ae187"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          woods: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/woods"
              ),
            ])
              .then(
                function () {
                  return resolve(o("2f1e"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
        },
        computed: {
          dishConfig: function () {
            return {
              themeColor: this.themeColor,
              exchangeFlg: this.exchangeFlg,
              fullGiftFlg: this.fullGiftFlg,
              shopMLJTag: this.shopMLJTag,
              guQingFlg: this.guQingFlg,
              preTime: this.preTime,
              preTimePoint: this.preTimePoint,
              itemUnit: this.itemUnit,
              showType: this.showType,
              isGroupBuy: this.isGroupBuy,
              promPriceName: this.promPriceName,
              promotionLimitCount: this.promotionLimitCount,
              promotionLimitText: this.promotionLimitText,
              getVipTxt: this.getVipTxt,
              showAddDish: this.showAddDish,
              dishNum: this.dishNum,
              specialDishStyle: this.specialDishStyle,
              goodsTitleFontWeight: this.goodsTitleFontWeight,
              goodsTitleFontWeightNum: this.goodsTitleFontWeightNum,
              dishBtnSize: this.dishBtnSize,
              addBtnSize: this.addBtnSize,
              set: this.set,
              gqText: this.gqText,
              gqTextFlg: this.gqTextFlg,
              gqCustomText: this.gqCustomText,
              labelList: this.labelList,
              realDishName: this.realDishName,
              goodsTitleColor: this.goodsTitleColor,
              markerWidth: this.markerWidth,
              markerHeight: this.markerHeight,
              foodsales: this.foodsales,
              type: this.type,
              goodsTitleFontSize: this.goodsTitleFontCustomSwitch
                ? this.goodsTitleFontSize
                : 0,
              hasBGColor: this.hasBGColor,
              template: this.template,
              vipTxt: this.vipTxt,
              getVipTxtNext: this.getVipTxtNext,
              goodsDescLine: this.goodsDescLine,
              goodsDescLineColor: this.goodsDescLineColor,
              goodsDescLineSize: this.goodsDescLineSize,
              priceLabelStyle: this.priceLabelStyle,
              goodsTagColor: this.goodsTagColor,
            };
          },
          showWhitchLayout: function () {
            return (this.dishType && "fullGift" === this.dishType) ||
              "exchange" === this.dishType
              ? this.dishType
              : this.layout;
          },
        },
      };
      t.default = s;
    },
    b838: function (e, t, o) {
      "use strict";
      o.r(t);
      var i = o("4d65"),
        s = o("bf97");
      for (var n in s)
        ["default"].indexOf(n) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return s[e];
            });
          })(n);
      var h = o("f0c5"),
        a = Object(h.a)(
          s.default,
          i.b,
          i.c,
          !1,
          null,
          "ff519ed6",
          null,
          !1,
          i.a,
          void 0
        );
      t.default = a.exports;
    },
    bf97: function (e, t, o) {
      "use strict";
      o.r(t);
      var i = o("a93f"),
        s = o.n(i);
      for (var n in i)
        ["default"].indexOf(n) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return i[e];
            });
          })(n);
      t.default = s.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index-create-component":
        function (e, t, o) {
          o("543d").createComponent(o("b838"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index-create-component",
      ],
    ],
  ]);
