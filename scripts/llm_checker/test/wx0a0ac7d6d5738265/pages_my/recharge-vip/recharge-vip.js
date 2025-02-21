var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  o = require("../../utils/debouns.js"),
  a = {
    components: {
      addFleetCard: function () {
        return "./components/add_fleet_card.js";
      },
      consumeList: function () {
        return "./components/consume-list.js";
      },
      cardList: function () {
        return "./components/card-list.js";
      },
    },
    data: function () {
      return {
        showRechargePop: !1,
        btnStyle: {
          position: "fixed",
          bottom: "40rpx",
          width: "calc(100% - 116rpx)",
          fontSize: "32rpx",
        },
        oilCardList: [],
        isloading: !1,
        cureent: "tab1",
        inputValue: "",
        slected: "",
        UserMoney: "",
        topUpTypeList: [],
        cardTopUpId: null,
        oilTypeDiscountList: [],
        maxGiveAmount: 0,
        cardOilTypeDiscountBOList: [],
        showInput: !1,
        importability: "0",
        pages: 1,
        isCardTop: !1,
        cardId: null,
        cardTabs: 0,
        topId: "",
      };
    },
    watch: {
      inputValue: function (e) {
        this.calculateMoney();
      },
      showRechargePop: function (e) {
        0 == e && (this.inputValue = "");
      },
    },
    onLoad: function (e) {
      e.cureent && (this.cureent = e.cureent),
        e.topId && (this.topId = e.topId);
    },
    onShow: function () {
      this.getUserMoney(), this.getOilCards();
    },
    mounted: function () {
      (this.handerRecharge = o.throttle(this.handerRecharge, 3e3)),
        (this.goRecharge = o.throttle(this.goRecharge, 2e3));
    },
    methods: {
      addTeamCard: function () {
        console.log("绑定车队卡"), this.$refs.openAddFleet.openPop();
      },
      chageCardTab: function (e) {
        this.cardTabs = e;
      },
      getOilCards: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.selectOilCardList();
                  case 2:
                    (o = e.sent),
                      console.log("油卡", o.data),
                      2e4 === o.data.code &&
                        ((n.isloading = !1), (n.oilCardList = o.data.data)),
                      20004 === o.data.code &&
                        setTimeout(function () {
                          n.getOilCards();
                        }, 1e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getUserMoney: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.selectUserMoney();
                  case 2:
                    2e4 === (o = e.sent).data.code
                      ? (n.UserMoney = o.data.data)
                      : 20004 === o.data.code &&
                        setTimeout(function () {
                          n.getUserMoney();
                        }, 1e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      calculateMoney: function () {
        var e = this.inputValue.toString().replace(/[^0-9.]/g, "");
        if (/^[0-9]*(\.[0-9]{0,2})?$/.test(e)) {
          (this.slected = e), isNaN(this.inputValue) && (this.inputValue = "");
          var t = { topId: this.topId, money: this.inputValue };
          this.selectGetAmn(t);
        } else this.inputValue = "";
      },
      changeShow: function (e) {
        this.showInput = !1;
      },
      handerRecharge: function () {
        this.inputValue <= 0
          ? this.$toast("请选择充值金额", "none", 2500)
          : this.inputValue > 5e4
          ? n.index.showModal({
              title: "单次充值金额不能大于50000",
              showCancel: !1,
            })
          : this.goRechargeById();
      },
      getactiveMoney: function (e) {
        (this.slected = e), (this.inputValue = e);
      },
      selectGetAmn: function (n) {
        var o = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (o.inputValue) {
                      e.next = 2;
                      break;
                    }
                    return e.abrupt("return");
                  case 2:
                    return (e.next = 4), o.$api.$selectAmnByTopidAndMoney(n);
                  case 4:
                    (a = e.sent),
                      console.log("查询充值优惠", a.data.data),
                      2e4 === a.data.code
                        ? ((o.cardOilTypeDiscountBOList =
                            a.data.data.cardOilTypeDiscountBOList),
                          (o.maxGiveAmount = a.data.data.giveAmount || 0))
                        : 20004 === a.data.code
                        ? o.selectGetAmn(n)
                        : (o.maxGiveAmount = 0);
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      goRecharge: function (e) {
        console.log(e),
          (this.cardId = e.cardId),
          (this.topId = e.topId),
          (this.oilTypeDiscountList = e.oilTypeDiscountList),
          (this.cardOilTypeDiscountBOList = []),
          (this.isCardTop = !0),
          this.openRecharge();
      },
      openRecharge: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.$selecttopUpType(n.topId);
                  case 2:
                    (o = e.sent),
                      console.log("按卡充值", o),
                      2e4 === o.data.code &&
                        ((n.topUpTypeList = o.data.data.list),
                        (n.importability = o.data.data.importability),
                        (n.showRechargePop = !0)),
                      20004 === o.data.code && n.openRecharge();
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      chageTab: function (e) {
        this.cureent = e;
      },
      onRefresh: function () {
        (this.pages = 1), this.getUserMoney();
      },
      goRechargeById: function () {
        var o = this;
        return t(
          e().mark(function t() {
            var a, r, i, s, u, c, p, d, l;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (a = {
                        cardId: o.cardId,
                        refillCardId: o.cardTopUpId,
                        topUpAmount: parseFloat(o.inputValue),
                      }),
                      o.$loading(),
                      (r = null),
                      (e.next = 5),
                      o.$api.$postTopUpAmount(a)
                    );
                  case 5:
                    if (((i = e.sent), (s = o), 2e4 !== i.data.code)) {
                      e.next = 14;
                      break;
                    }
                    if ((r = i.data.data)) {
                      e.next = 10;
                      break;
                    }
                    return e.abrupt("return");
                  case 10:
                    (u = r.payTimeStamp),
                      (c = r.paynonceStr),
                      (p = r.payPackage),
                      (d = r.paySignType),
                      (l = r.paySign),
                      n.index.requestPayment({
                        provider: "wxpay",
                        timeStamp: u,
                        nonceStr: c,
                        package: p,
                        signType: d,
                        paySign: l,
                        success: function (e) {
                          s.$toast("充值成功", "none", 2e3, !1),
                            s.getUserMoney(),
                            s.getOilCards(),
                            (s.showRechargePop = !1);
                        },
                        fail: function (e) {
                          if (
                            ("requestPayment:fail cancel" === e.errMsg &&
                              (console.log("用户取消了充值"),
                              s.$toast("充值已取消", "none", 2e3, !1)),
                            "调用支付JSAPI缺少参数：total_fee" === e.errMsg)
                          )
                            return (
                              s.$toast("支付失败", "none", 2e3, !1),
                              console.log(
                                "其它请检查预支付会话标识prepay_id是否已失效 请求的appid与下单接口的appid是否一致 "
                              ),
                              !1
                            );
                          console.log("fail:支付失败" + JSON.stringify(e));
                        },
                      }),
                      (e.next = 15);
                    break;
                  case 14:
                    20001 === i.data.code && o.$toast(i.data.message);
                  case 15:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getCardBg: function (e) {
        return "92#" === e.oilType
          ? "rgba(232, 130, 130, 1)"
          : "95#" === e.oilType
          ? "rgba(76, 199, 156, 1)"
          : "98#" === e.oilType
          ? "rgba(80, 162, 230, 1)"
          : "0#" === e.oilType
          ? "rgba(95, 118, 120, 1)"
          : void 0;
      },
    },
  };
Array ||
  (
    n.resolveComponent("zym-navigation") +
    n.resolveComponent("card-list") +
    n.resolveComponent("u-button") +
    n.resolveComponent("consume-list") +
    n.resolveComponent("u-icon") +
    n.resolveComponent("u-text") +
    n.resolveComponent("u-popup") +
    n.resolveComponent("add-fleet-card") +
    n.resolveComponent("u-skeleton")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../uview-plus/components/u-text/u-text.js";
    } +
    function () {
      return "../../uview-plus/components/u-popup/u-popup.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var r = n._export_sfc(a, [
  [
    "render",
    function (e, t, o, a, r, i) {
      return n.e(
        {
          a: n.p({ title: "我的油卡", "is-home-page": !0 }),
          b: n.t(r.UserMoney > 0 ? r.UserMoney : 0),
          c: "tab1" === r.cureent ? 1 : "",
          d: n.o(function (e) {
            return i.chageTab("tab1");
          }),
          e: "tab2" === r.cureent ? 1 : "",
          f: n.o(function (e) {
            return i.chageTab("tab2");
          }),
          g: n.sr("cardLists", "71a469d5-2,71a469d5-1"),
          h: "tab1" === r.cureent,
          i: n.o(i.goRecharge),
          j: n.p({ height: "60", topId: r.topId, oilCardList: r.oilCardList }),
          k: "tab1" === r.cureent,
        },
        "tab1" === r.cureent
          ? {
              l: n.o(function (t) {
                return e.$jump("/pages_my/recharge-vip/obtain_card");
              }),
              m: n.p({
                text: "领取新的油卡",
                color: "#41bbc0",
                "custom-style": r.btnStyle,
                shape: "circle",
              }),
            }
          : {},
        {
          n: n.sr("consumeLists", "71a469d5-4,71a469d5-1"),
          o: "tab2" === r.cureent,
          p: n.p({ height: "64" }),
          q: "".concat(e.$imgPath, "/close.png"),
          r: n.o(function (e) {
            return (r.showRechargePop = !1);
          }),
          s: n.f(r.topUpTypeList, function (e, t, o) {
            return {
              a: n.t(e.topUpAmount),
              b: r.slected == e.topUpAmount ? 1 : "",
              c: e.cardTopUpId,
              d: n.o(function (t) {
                return i.getactiveMoney(e.topUpAmount);
              }, e.cardTopUpId),
            };
          }),
          t: "0" != r.importability,
        },
        "0" != r.importability
          ? n.e(
              { v: r.showInput },
              r.showInput
                ? {
                    w: n.o(function () {
                      return i.changeShow && i.changeShow.apply(i, arguments);
                    }),
                    x: r.inputValue,
                    y: n.o(function (e) {
                      return (r.inputValue = e.detail.value);
                    }),
                  }
                : {
                    z: n.t(
                      r.inputValue ? r.inputValue : "请输入或选择充值金额"
                    ),
                    A: n.o(function (e) {
                      return (r.showInput = !0);
                    }),
                  }
            )
          : {},
        {
          B: n.p({ name: "question-circle" }),
          C: n.p({
            text: "对优惠有疑问请咨询工作人员",
            align: "left",
            color: "#ef0000",
            size: "28",
            margin: "4rpx ",
          }),
          D: r.oilTypeDiscountList.length,
        },
        r.oilTypeDiscountList.length
          ? {
              E: n.f(r.oilTypeDiscountList, function (e, t, o) {
                return {
                  a: n.t(e.oilType),
                  b: i.getCardBg(e),
                  c: n.t(e.discountAmount),
                  d: n.t(e.startTime),
                  e: n.t(e.endTime),
                  f: t,
                };
              }),
            }
          : {},
        { F: n.t(r.inputValue || 0), G: r.inputValue },
        r.inputValue
          ? {
              H: n.f(r.cardOilTypeDiscountBOList, function (e, t, o) {
                return {
                  a: n.t(e.oilType),
                  b: i.getCardBg(e),
                  c: n.t(e.discountAmount),
                  d: n.t(e.startTime),
                  e: n.t(e.endTime),
                  f: t,
                };
              }),
            }
          : {},
        {
          I: n.o(function () {
            return i.handerRecharge && i.handerRecharge.apply(i, arguments);
          }),
          J: n.o(function (e) {
            return (r.showRechargePop = !1);
          }),
          K: n.p({
            show: r.showRechargePop,
            round: "20",
            "safe-area-inset-bottom": !1,
          }),
          L: n.sr("openAddFleet", "71a469d5-8,71a469d5-1"),
          M: n.p({
            loading: r.isloading,
            rows: "16",
            "rows-height": "36",
            "rows-width": "750rpx",
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-71a469d5"],
]);
wx.createPage(r);
