(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index",
  ],
  {
    "449d": function (t, e, o) {
      "use strict";
      o.r(e);
      var i = o("6210"),
        s = o.n(i);
      for (var n in i)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return i[t];
            });
          })(n);
      e.default = s.a;
    },
    "470e": function (t, e, o) {
      "use strict";
      o.d(e, "b", function () {
        return i;
      }),
        o.d(e, "c", function () {
          return s;
        }),
        o.d(e, "a", function () {});
      var i = function () {
          this.$createElement, this._self._c;
        },
        s = [];
    },
    6210: function (t, e, o) {
      "use strict";
      var i = o("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var s = {
        name: "dishItem",
        mixins: [i(o("7a72")).default],
        props: {
          layout: { type: [Number, String], default: 0 },
          dishType: { type: String, default: "" },
          isFastFood: { type: Boolean, default: !0 },
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
              goodsBgColor: this.goodsBgColor,
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
              dishBtnShape: this.dishBtnShape,
              isShowPop: this.isShowPop,
              vipTxt: this.vipTxt,
              vipTxtNext: this.vipTxtNext,
              reduceflg: this.reduceflg,
              getVipTxtNext: this.getVipTxtNext,
              oldShowTpye: this.oldShowTpye,
              template: this.template,
              wrapperClass: this.wrapperClass,
              isIncreasePrice: this.isIncreasePrice,
              isFullGift: this.isFullGift,
              intersectionRatio: this.intersectionRatio,
              componentHeight: this.componentHeight,
              dishLayoutSkeletonType: this.dishLayoutSkeletonType,
              gqData: this.gqData,
              lockDish: this.lockDish,
              isFastFood: this.isFastFood,
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
      e.default = s;
    },
    fd7c: function (t, e, o) {
      "use strict";
      o.r(e);
      var i = o("470e"),
        s = o("449d");
      for (var n in s)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return s[t];
            });
          })(n);
      var h = o("f0c5"),
        a = Object(h.a)(
          s.default,
          i.b,
          i.c,
          !1,
          null,
          "55aee4de",
          null,
          !1,
          i.a,
          void 0
        );
      e.default = a.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index-create-component":
        function (t, e, o) {
          o("543d").createComponent(o("fd7c"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index-create-component",
      ],
    ],
  ]);
