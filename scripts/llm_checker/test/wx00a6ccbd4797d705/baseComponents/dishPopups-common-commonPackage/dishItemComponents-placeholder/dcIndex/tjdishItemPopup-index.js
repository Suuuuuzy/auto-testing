(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index",
  ],
  {
    1896: function (e, t, o) {
      "use strict";
      o.r(t);
      var i = o("e2ae"),
        s = o("8af3a");
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
          "6e2da6b0",
          null,
          !1,
          i.a,
          void 0
        );
      t.default = a.exports;
    },
    "8af3a": function (e, t, o) {
      "use strict";
      o.r(t);
      var i = o("a17d"),
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
    a17d: function (e, t, o) {
      "use strict";
      var i = o("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var s = {
        name: "dishItem",
        mixins: [i(o("c3a5")).default],
        props: {
          layout: { type: [Number, String], default: 0 },
          dishType: { type: String, default: "" },
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
              lockDish: this.lockDish,
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
    e2ae: function (e, t, o) {
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
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index-create-component":
        function (e, t, o) {
          o("543d").createComponent(o("1896"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index-create-component",
      ],
    ],
  ]);
