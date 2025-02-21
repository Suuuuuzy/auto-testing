(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo",
  ],
  {
    "4a90": function (i, e, o) {
      "use strict";
      (function (i) {
        var t = o("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = t(o("2309")),
          s = o("3d71"),
          h = {
            name: "dishInfo",
            mixins: [t(o("439d")).default],
            components: {
              wzAddDeBtn: function () {
                o.e("baseComponents/addDeBtn/wm")
                  .then(
                    function () {
                      return resolve(o("10e0"));
                    }.bind(null, o)
                  )
                  .catch(o.oe);
              },
              dcAddDeBtn: function () {
                Promise.all([
                  o.e("common/vendor"),
                  o.e("baseComponents/addDeBtn/index"),
                ])
                  .then(
                    function () {
                      return resolve(o("cf43"));
                    }.bind(null, o)
                  )
                  .catch(o.oe);
              },
            },
            props: {
              dishData: { type: Object, default: {} },
              layout: { type: [Number, String], default: 0 },
              context: { type: String, default: "DC" },
              showAddBtn: { type: Boolean, default: !0 },
              inputSize: { type: Number, default: 26 },
              dishConfig: {
                type: Object,
                default: function () {
                  return {
                    exchangeFlg: !1,
                    fullGiftFlg: !1,
                    shopMLJTag: !1,
                    guQingFlg: !1,
                    preTime: 0,
                    preTimePoint: "",
                    itemUnit: {},
                    showType: 0,
                    dishNum: 0,
                    isGroupBuy: !1,
                    showAddDish: !1,
                    promPriceName: "",
                    promotionLimitCount: 0,
                    promotionLimitText: "",
                    gqText: "",
                    gqTextFlg: 1,
                    getVipTxt: {},
                    specialDishStyle: [],
                    dishBtnSize: {},
                    set: {},
                    labelList: [],
                    realDishName: "",
                    goodsTitleColor: "",
                    type: "",
                    goodsTitleFontSize: 16,
                    addBtnSize: 2,
                    dishBtnShape: 1,
                    lockDish: "",
                    isShowPop: !1,
                    vipTxt: "",
                    vipTxtNext: "",
                    isIncreasePrice: "",
                    isFullGift: "",
                    goodsBgColor1: "",
                    isFastFood: !1,
                    isHiddenPriceBtn: !1,
                    canAdd: !1,
                  };
                },
              },
            },
            data: function () {
              return {
                themeColor: "",
                onlyShowOriginalPrice: !1,
                isShowDisabledTips: !1,
                iconUrlCount: 0,
              };
            },
            created: function () {
              var i = this;
              if (
                ((this.themeColor = n.default.getDecorate("SYSTEM").themeColor),
                (this.onlyShowOriginalPrice = n.default
                  .getDecorate(this.context)
                  .getValidValue("decorationData")("dishPage")(
                  "onlyShowOriginalPrice",
                  !1
                )()),
                this.dishData.medalCounts && this.dishData.medalCounts.length)
              ) {
                var e = [];
                this.dishData.medalCounts.forEach(function (o) {
                  o.medalCount > 0 &&
                    -1 == e.indexOf(o.medalId) &&
                    (e.push(o.medalId), (i.iconUrlCount += o.medalCount));
                });
              }
            },
            computed: {
              themeColorIcon: function () {
                return this.dishConfig.guQingFlg
                  ? { color: "#999999", borderColor: "#999999" }
                  : { color: this.themeColor, borderColor: this.themeColor };
              },
              themeColorLabel: function () {
                return this.dishConfig.guQingFlg
                  ? { background: "#999999" }
                  : {
                      background: this.dishConfig.goodsTagColor
                        ? this.dishConfig.goodsTagColor
                        : this.themeColor,
                    };
              },
              themeColorPriceLeft: function () {
                return 2 == this.dishConfig.priceLabelStyle
                  ? {}
                  : this.dishConfig.guQingFlg
                  ? { background: "#B1B1B1" }
                  : { background: this.themeColor };
              },
              themeColorPriceRight: function () {
                return 2 == this.dishConfig.priceLabelStyle
                  ? {}
                  : this.dishConfig.guQingFlg
                  ? { background: "#B1B1B126", color: "#B1B1B1" }
                  : {
                      background:
                        "linear-gradient(270deg, " +
                        this.themeColor +
                        "33 0%," +
                        this.themeColor +
                        "1A 100%)",
                      color: this.themeColor,
                    };
              },
              themeColorDishNameAndPrice: function () {
                var i = {
                  fontSize: this.dishConfig.goodsTitleFontSize
                    ? 2 * this.dishConfig.goodsTitleFontSize + "rpx;"
                    : "32rpx",
                  fontWeight: this.dishConfig.goodsTitleFontWeight
                    ? this.dishConfig.goodsTitleFontWeightNum
                      ? this.dishConfig.goodsTitleFontWeightNum
                      : 700
                    : "",
                  fontFamily: "SimHei",
                };
                return (
                  this.dishConfig.guQingFlg
                    ? (i.color =
                        11 == this.layout || 14 == this.layout ? "#FFFFFF" : "")
                    : (i.color =
                        11 == this.layout || 14 == this.layout
                          ? this.dishConfig.goodsTitleColor
                          : ""),
                  i
                );
              },
              addDeBtnConfig: function () {
                return {
                  themeColor: this.themeColor,
                  inputSize: this.inputSize,
                  isShowPop:
                    "DC" == this.context
                      ? this.dishConfig.isShowPop
                      : this.dishConfig.set.isShowPop,
                  min: this.dishConfig.reduceflg,
                  dishBtnShape: this.dishConfig.dishBtnShape,
                  size: this.dishConfig.dishBtnSize.size,
                };
              },
              exchangeFlg: function () {
                return this.dishConfig.exchangeFlg;
              },
              fullGiftFlg: function () {
                return this.dishConfig.fullGiftFlg;
              },
              reducePriceFlg: function () {
                return this.dishConfig.reducePriceFlg;
              },
              isMinPriceUnit: function () {
                var i = n.default.getDecorate(this.context).decorationData
                    .specsPoupPage,
                  e = i.dishPageSpecsShowType ? i.dishPageSpecsShowType : 1,
                  o = n.default
                    .getDecorate(this.context)
                    .getValidValue("decorationData")("dishPage")(
                    "multiclassDishPrice",
                    1
                  )();
                return this.dishConfig.isFastFood ? 1 == o : 1 == e;
              },
              isShowPop: function () {
                return "DC" == this.context
                  ? this.dishConfig.isShowPop
                  : this.dishConfig.set.isShowPop;
              },
              textLineThrough: function () {
                var i = this.dishConfig,
                  e = i.showType,
                  o = i.isVip;
                return 5 == e || 2 == e ? o : 3 == e;
              },
              whichPromotionLimitTextShow: function () {
                return (
                  2 == this.dishConfig.priceLabelStyle &&
                  !(
                    "DC" === this.context ||
                    !(
                      this.dishConfig.itemUnit.promId &&
                      this.dishConfig.itemUnit.promLimitedQuantity > 0
                    ) ||
                    this.dishConfig.isGroupBuy
                  ) &&
                  (!(
                    !this.dishConfig.promotionLimitCount ||
                    this.dishConfig.isGroupBuy
                  ) ||
                    void 0)
                );
              },
            },
            methods: {
              disabledClick: function () {
                var e = n.default.getBusState("oneShop", "DC").shopSetting;
                i.showToast({
                  icon: "none",
                  title: "".concat(e.noMainItemSelectedReminder),
                });
              },
              judgeNpartSet: function (i) {
                return (0, s.judgeNpartSet)(i, this.dishConfig.showType);
              },
              getPrecision: function (i) {
                return Number((0, s.getPrecision)(i));
              },
              add: function (i) {
                this.$emit("add", i);
              },
              remove: function (i) {
                this.$emit("remove", i);
              },
              getNumber: function (i) {
                this.$emit("getNumber", i);
              },
              inputClick: function (i) {
                this.$emit("inputClick", i);
              },
              shift: function (i) {
                this.$emit("shift", i);
              },
              showDisabledTips: function () {
                var i = this;
                if (!this.isShowDisabledTips) {
                  this.isShowDisabledTips = !0;
                  var e = setTimeout(function () {
                    (i.isShowDisabledTips = !1), clearTimeout(e);
                  }, 3e3);
                }
              },
            },
          };
        e.default = h;
      }).call(this, o("543d").default);
    },
    6851: function (i, e, o) {
      "use strict";
      o.d(e, "b", function () {
        return t;
      }),
        o.d(e, "c", function () {
          return n;
        }),
        o.d(e, "a", function () {});
      var t = function () {
          var i = this,
            e =
              (i.$createElement,
              i._self._c,
              i.__get_style([i.themeColorDishNameAndPrice])),
            o =
              "search" === i.dishConfig.type && i.dishData._lightItemName
                ? i.getHtmlRes(i.dishData._lightItemName)
                : null,
            t = i.__get_style([i.themeColorLabel]),
            n =
              i.onlyShowOriginalPrice &&
              "1" == i.dishConfig.itemUnit.limitQuantityFlg &&
              !i.dishConfig.guQingFlg
                ? i.__get_style([i.themeColorIcon])
                : null,
            s =
              i.onlyShowOriginalPrice ||
              !i.exchangeFlg ||
              i.dishConfig.isGroupBuy
                ? null
                : i.__get_style([i.themeColorIcon]),
            h =
              i.onlyShowOriginalPrice ||
              !i.fullGiftFlg ||
              i.dishConfig.isGroupBuy
                ? null
                : i.__get_style([i.themeColorIcon]),
            l =
              !i.onlyShowOriginalPrice &&
              "1" == i.dishData.isManLiJian &&
              i.dishConfig.shopMLJTag
                ? i.__get_style([i.themeColorIcon])
                : null,
            d =
              i.onlyShowOriginalPrice ||
              !i.reducePriceFlg ||
              i.dishConfig.isGroupBuy
                ? null
                : i.__get_style([i.themeColorIcon]),
            r =
              i.onlyShowOriginalPrice ||
              "1" != i.dishConfig.itemUnit.limitQuantityFlg ||
              i.dishConfig.guQingFlg
                ? null
                : i.__get_style([i.themeColorIcon]),
            g =
              !i.onlyShowOriginalPrice && i.dishConfig.preTime > 0
                ? i.__get_style([i.themeColorIcon])
                : null,
            c =
              i.onlyShowOriginalPrice ||
              i.dishConfig.preTime > 0 ||
              !i.dishConfig.preTimePoint
                ? null
                : i.__get_style([i.themeColorIcon]),
            a = i.onlyShowOriginalPrice
              ? null
              : !i.dishConfig.isGroupBuy &&
                0 == i.dishConfig.itemUnit.npartType &&
                i.judgeNpartSet(i.dishConfig.itemUnit) &&
                !i.dishConfig.disNpart,
            u =
              !i.onlyShowOriginalPrice && a
                ? i.__get_style([i.themeColorIcon])
                : null,
            f = i.onlyShowOriginalPrice
              ? null
              : !i.dishConfig.isGroupBuy &&
                1 == i.dishConfig.itemUnit.npartType &&
                i.judgeNpartSet(i.dishConfig.itemUnit) &&
                !i.dishConfig.disNpart,
            C =
              !i.onlyShowOriginalPrice && f
                ? i.__get_style([i.themeColorIcon])
                : null,
            m =
              i.dishConfig.isHiddenPriceBtn ||
              (3 != i.dishConfig.showType && 5 != i.dishConfig.showType)
                ? null
                : i.__get_style([i.themeColorPriceLeft]),
            p =
              i.dishConfig.isHiddenPriceBtn ||
              (3 != i.dishConfig.showType && 5 != i.dishConfig.showType)
                ? null
                : i.__get_style([i.themeColorPriceRight]),
            y =
              i.dishConfig.isHiddenPriceBtn ||
              (3 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              !i.whichPromotionLimitTextShow ||
              15 != i.layout
                ? null
                : i.dishConfig.promotionLimitText.slice(2),
            P =
              i.dishConfig.isHiddenPriceBtn ||
              (3 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              !i.dishConfig.promotionLimitCount ||
              i.dishConfig.isGroupBuy ||
              "DC" === i.context ||
              i.whichPromotionLimitTextShow ||
              15 != i.layout
                ? null
                : i.dishConfig.promotionLimitText.slice(2),
            _ =
              i.dishConfig.isHiddenPriceBtn ||
              (2 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              ("WM" !== i.context && "ZT" !== i.context)
                ? null
                : i.__get_style([i.themeColorPriceLeft]),
            w =
              i.dishConfig.isHiddenPriceBtn ||
              (2 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              ("WM" !== i.context && "ZT" !== i.context)
                ? null
                : i.__get_style([i.themeColorPriceRight]),
            T =
              i.dishConfig.isHiddenPriceBtn ||
              (2 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              "DC" !== i.context ||
              5 != i.dishConfig.showType ||
              4 != i.dishConfig.oldShowTpye
                ? null
                : i.__get_style([i.themeColorPriceLeft]),
            S =
              i.dishConfig.isHiddenPriceBtn ||
              (2 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              "DC" !== i.context ||
              (5 == i.dishConfig.showType && 4 == i.dishConfig.oldShowTpye)
                ? null
                : i.__get_style([i.themeColorPriceLeft]),
            b =
              i.dishConfig.isHiddenPriceBtn ||
              (2 != i.dishConfig.showType && 5 != i.dishConfig.showType) ||
              "DC" !== i.context
                ? null
                : i.__get_style([i.themeColorPriceRight]),
            B =
              i.dishConfig.isHiddenPriceBtn || 4 != i.dishConfig.showType
                ? null
                : i.__get_style([i.themeColorPriceLeft]),
            D =
              i.dishConfig.isHiddenPriceBtn ||
              4 != i.dishConfig.showType ||
              ("WM" !== i.context && "ZT" !== i.context)
                ? null
                : i.__get_style([i.themeColorPriceRight]),
            x =
              i.dishConfig.isHiddenPriceBtn ||
              4 != i.dishConfig.showType ||
              "DC" !== i.context
                ? null
                : i.__get_style([i.themeColorPriceRight]),
            F =
              i.dishConfig.isHiddenPriceBtn ||
              i.dishConfig.isGroupBuy ||
              !i.dishData.equityMark ||
              (1 != i.dishConfig.priceLabelStyle &&
                3 != i.dishConfig.priceLabelStyle)
                ? null
                : i.__get_style([i.themeColorPriceLeft]),
            L =
              i.dishConfig.isHiddenPriceBtn ||
              i.dishConfig.isGroupBuy ||
              !i.dishData.equityMark ||
              (1 != i.dishConfig.priceLabelStyle &&
                3 != i.dishConfig.priceLabelStyle)
                ? null
                : i.__get_style([i.themeColorPriceRight]),
            v =
              "21" == i.layout ||
              i.dishConfig.isHiddenPriceBtn ||
              i.textLineThrough
                ? null
                : i.__get_style([i.themeColorDishNameAndPrice]),
            I =
              "21" == i.layout ||
              i.dishConfig.isHiddenPriceBtn ||
              (!i.showAddBtn && !i.dishConfig.guQingFlg) ||
              i.dishConfig.guQingFlg ||
              !i.dishConfig.showAddDish ||
              "DC" !== i.context
                ? null
                : i.getPrecision(i.dishData),
            O =
              "21" != i.layout &&
              !i.dishConfig.isHiddenPriceBtn &&
              (i.showAddBtn || i.dishConfig.guQingFlg) &&
              !i.dishConfig.guQingFlg &&
              i.dishConfig.showAddDish &&
              "DC" === i.context &&
              I
                ? i.getPrecision(i.dishData)
                : null;
          i.$mp.data = Object.assign(
            {},
            {
              $root: {
                s0: e,
                m0: o,
                s1: t,
                s2: n,
                s3: s,
                s4: h,
                s5: l,
                s6: d,
                s7: r,
                s8: g,
                s9: c,
                m1: a,
                s10: u,
                m2: f,
                s11: C,
                s12: m,
                s13: p,
                g0: y,
                g1: P,
                s14: _,
                s15: w,
                s16: T,
                s17: S,
                s18: b,
                s19: B,
                s20: D,
                s21: x,
                s22: F,
                s23: L,
                s24: v,
                m3: I,
                m4: O,
              },
            }
          );
        },
        n = [];
    },
    "7a5b": function (i, e, o) {
      "use strict";
      var t = o("93842");
      o.n(t).a;
    },
    93842: function (i, e, o) {},
    "985b": function (i, e, o) {
      "use strict";
      o.r(e);
      var t = o("6851"),
        n = o("bf3e");
      for (var s in n)
        ["default"].indexOf(s) < 0 &&
          (function (i) {
            o.d(e, i, function () {
              return n[i];
            });
          })(s);
      o("7a5b");
      var h = o("f0c5"),
        l = Object(h.a)(
          n.default,
          t.b,
          t.c,
          !1,
          null,
          "bf2b50c8",
          null,
          !1,
          t.a,
          void 0
        );
      e.default = l.exports;
    },
    bf3e: function (i, e, o) {
      "use strict";
      o.r(e);
      var t = o("4a90"),
        n = o.n(t);
      for (var s in t)
        ["default"].indexOf(s) < 0 &&
          (function (i) {
            o.d(e, i, function () {
              return t[i];
            });
          })(s);
      e.default = n.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo-create-component":
        function (i, e, o) {
          o("543d").createComponent(o("985b"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo-create-component",
      ],
    ],
  ]);
