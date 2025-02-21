var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../common/vendor.js"),
  n = require("../../utils/debouns.js"),
  o = {
    data: function () {
      return {
        rechargepop: !1,
        balancepop: !1,
        isloading: !0,
        valueChange: null,
        cureent: "tab1",
        inputValue: "",
        slected: "",
        consumeList: [],
        oilCardList: [],
        topUpTypeList: [],
        cardTopUpId: null,
        oilTypeDiscountList: [],
        giveAmount: 0,
        showInput: !1,
        toUpMoneyList: [],
        pages: 1,
        status: "loading",
        isCardTop: !1,
        ctId: null,
        topId: "",
        parentCard: {},
        cardId: "",
        topUpMoneyList: [
          { Id: 1, Amount: 100 },
          { Id: 2, Amount: 500 },
          { Id: 3, Amount: 1e3 },
        ],
        balanceInfoById: {},
        showTooptil: !1,
      };
    },
    watch: {
      inputValue: function (e) {
        console.log(e), this.calculateMoney();
      },
    },
    onLoad: function (e) {
      console.log("车队卡", e),
        e.cureent && (this.cureent = e.cureent),
        e.topId && (this.topId = e.topId),
        this.getRecordList(),
        this.getCarsList();
    },
    mounted: function () {
      (this.handerRecharge = n.throttle(this.handerRecharge, 4e3)),
        (this.goRecharge = n.throttle(this.goRecharge, 2e3));
    },
    methods: {
      showToop: function () {
        (this.showTooptil = !this.showTooptil), console.log(this.showTooptil);
      },
      getCarsList: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), a.$api.$getCradsList(a.topId);
                  case 2:
                    (n = e.sent),
                      console.log("00", n.data),
                      n.data.code === a.$code.SUCCESS &&
                        ((a.isloading = !1),
                        (a.parentCard = n.data.data.parentCard),
                        (a.oilCardList = n.data.data.ynRefillCardList)),
                      n.data.code === a.$code.TOKENFAIL && a.getCarsList();
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      allocateBalance: function (e, t) {
        (this.valueChange = e),
          (this.cardId = t.id),
          (this.balanceInfoById = t),
          (this.balancepop = !0);
      },
      allocateBalancePage: function (e, t) {
        this.$jump(
          "/pages_asset/fleet-card-detail/allocate-balance?cardid="
            .concat(e, "&topId=")
            .concat(t)
        );
      },
      handerBalance: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var n, o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n = {
                        list: [
                          { cardId: a.cardId, money: parseFloat(a.inputValue) },
                        ],
                        state: a.valueChange,
                        topId: a.topId,
                      }),
                      (e.next = 3),
                      a.$api.$getCradsBalanceToOut(n)
                    );
                  case 3:
                    (o = e.sent).data.code === a.$code.SUCCESS &&
                      (a.getCarsList(),
                      setTimeout(function () {
                        1 === a.valueChange
                          ? a.$toast("分配成功")
                          : a.$toast("转出成功");
                      }, 200)),
                      o.data.code === a.$code.FAIL &&
                        a.$toast(o.data.message, "error"),
                      a.close(2),
                      (a.inputValue = "");
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      showInputtow: function () {
        this.showInput = !0;
      },
      getRecordList: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var n, o, r, i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n = { topId: a.topId, pageNum: a.pages, pageSize: 10 }),
                      (e.next = 3),
                      a.$api.$getCradRecordListByCardId(n)
                    );
                  case 3:
                    (o = e.sent),
                      console.log("消费记录", o.data),
                      o.data.code === a.$code.SUCCESS &&
                        (null === (r = o.data.data.list) || r.length < 10
                          ? (a.status = "nomore")
                          : (a.status = "loading"),
                        (i = a.consumeList.concat(r)),
                        (a.consumeList = []),
                        (a.consumeList = Array.from(new Set(i)).sort(function (
                          e,
                          t
                        ) {
                          return t.creatTime - e.creatTime;
                        }))),
                      (-1 != o.errMsg.indexOf("timeout") ||
                        o.data.code === a.$code.TOKENFAIL) &&
                        a.getRecordList();
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      calculateMoney: function () {
        var e = this.inputValue.toString().replace(/[^0-9.]/g, "");
        /^[0-9]*(\.[0-9]{0,2})?$/.test(e)
          ? ((this.slected = e),
            isNaN(this.inputValue) && (this.inputValue = ""),
            this.inputValue)
          : (this.inputValue = "");
      },
      changeShow: function (e) {
        console.log("失去焦点", e), (this.showInput = !1);
      },
      handerRecharge: function () {
        if (this.inputValue <= 0) this.$toast("充值金额不能小于0");
        else {
          var e = { money: Number(this.inputValue) };
          this.selectGetAmn(e),
            this.inputValue > 5e4
              ? a.index.showModal({
                  title: "单次充值金额不能大于50000",
                  showCancel: !1,
                })
              : this.isCardTop
              ? this.goRechargeById()
              : this.rechargeMoney();
        }
      },
      rechargeMoney: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o, r, i, c, s, u, l, p, d;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      n.$loading("加载中..."),
                      (o = {
                        refillCardId: n.cardTopUpId,
                        topUpAmount: n.inputValue,
                      }),
                      (r = null),
                      (e.next = 4),
                      n.$api.payByRecarhge(o)
                    );
                  case 4:
                    if (
                      ((i = e.sent), (c = n), i.data.code !== n.$code.SUCCESS)
                    ) {
                      e.next = 11;
                      break;
                    }
                    if ((r = i.data.data)) {
                      e.next = 9;
                      break;
                    }
                    return e.abrupt("return");
                  case 9:
                    (s = r.payTimeStamp),
                      (u = r.paynonceStr),
                      (l = r.payPackage),
                      (p = r.paySignType),
                      (d = r.paySign),
                      a.index.requestPayment({
                        provider: "wxpay",
                        timeStamp: s,
                        nonceStr: u,
                        package: l,
                        signType: p,
                        paySign: d,
                        success: function (e) {
                          console.log(e),
                            "requestPayment:ok" === e.errMsg &&
                              (c.$toast("充值成功", "none", 2e3, !0),
                              c.getRecordList(),
                              c.getCarsList());
                        },
                        fail: function (e) {
                          if (
                            ("requestPayment:fail cancel" === e.errMsg &&
                              (console.log("用户取消了充值"),
                              c.$toast("充值已取消", "none", 2e3, !1)),
                            "调用支付JSAPI缺少参数：total_fee" === e.errMsg)
                          )
                            return (
                              console.log(
                                "其它请检查预支付会话标识prepay_id是否已失效 请求的appid与下单接口的appid是否一致 "
                              ),
                              !1
                            );
                          console.log("fail:支付失败" + JSON.stringify(e));
                        },
                      });
                  case 11:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getactiveMoney: function (e) {
        (this.slected = e), (this.inputValue = e);
      },
      selectGetAmn: function (a) {
        var n = this;
        return t(
          e().mark(function t() {
            var o, r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.selectGetAmn(a);
                  case 2:
                    (o = e.sent),
                      console.log("查询充值优惠", o.data.data),
                      o.data.code === n.$code.SUCCESS &&
                        ((r = o.data.data),
                        (n.cardTopUpId = r.cardTopUpId),
                        (n.oilTypeDiscountList = r.oilTypeDiscountList),
                        (n.giveAmount = r.giveAmount));
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getCardBg: function (e) {
        return "92#" === e.oilType && e.discountAmount > 0
          ? "rgba(232, 130, 130, 1)"
          : "95#" === e.oilType && e.discountAmount > 0
          ? "rgba(76, 199, 156, 1)"
          : "98#" === e.oilType && e.discountAmount > 0
          ? "rgba(80, 162, 230, 1)"
          : "0#" === e.oilType && e.discountAmount > 0
          ? "rgba(95, 118, 120, 1)"
          : void 0;
      },
      goRecharge: function (e, t) {
        var n = this;
        if (0 === e) {
          if (5 === this.oilCardList.length)
            return void a.index.showModal({
              title: "油卡已经上限了",
              showCancel: !1,
            });
          console.log("充值方式开卡", e),
            (this.isCardTop = !1),
            this.openRecharge();
        }
        1 === e &&
          (console.log("充值方式卡id", t),
          (this.ctId = t),
          a.index.showModal({
            title: "温馨提示",
            content: "本次充值将会替换原有优惠！",
            success: function (e) {
              e.confirm && ((n.isCardTop = !0), n.openRecharge());
            },
          }),
          console.log(this.ctId));
      },
      openRecharge: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), a.$api.selecttopUpType();
                  case 2:
                    (n = e.sent),
                      console.log(n),
                      n.data.code === a.$code.SUCCESS &&
                        ((a.topUpTypeList = n.data.data),
                        (a.toUpMoneyList = n.data.data),
                        (a.rechargepop = !0));
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      close: function (e) {
        1 === e ? (this.rechargepop = !1) : 2 === e && (this.balancepop = !1),
          (this.inputValue = ""),
          (this.slected = "");
      },
      chageTab: function (e) {
        this.cureent = e;
      },
      toOrderDetails: function (e) {
        console.log(e.outOrderNo),
          3 !== e.state
            ? this.$jump(
                "/pages_pay/order-detail/order-detail?outOrderNo="
                  .concat(e.outOrderNo, "&orderStatus=3&topId=")
                  .concat(this.topId)
              )
            : this.$toast("订单已退款");
      },
      refreshList: function () {
        "nomore" !== this.status &&
          (this.pages++,
          console.log("加载数据", this.pages),
          this.getRecordList());
      },
      onRefresh: function () {
        (this.pages = 1), this.getRecordList(), this.getCarsList();
      },
      goRechargeById: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o, r, i, c, s, u, l, p, d;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (o = {
                        cardId: n.ctId,
                        refillCardId: n.cardTopUpId,
                        topUpAmount: n.inputValue,
                      }),
                      console.log("da", o),
                      n.$loading(),
                      (r = null),
                      (e.next = 5),
                      n.$api.$postTopUpAmount(o)
                    );
                  case 5:
                    if (
                      ((i = e.sent),
                      console.log("卡充值", i.data),
                      (c = n),
                      i.data.code !== n.$code.SUCCESS)
                    ) {
                      e.next = 13;
                      break;
                    }
                    if ((r = i.data.data)) {
                      e.next = 11;
                      break;
                    }
                    return e.abrupt("return");
                  case 11:
                    (s = r.payTimeStamp),
                      (u = r.paynonceStr),
                      (l = r.payPackage),
                      (p = r.paySignType),
                      (d = r.paySign),
                      a.index.requestPayment({
                        provider: "wxpay",
                        timeStamp: s,
                        nonceStr: u,
                        package: l,
                        signType: p,
                        paySign: d,
                        success: function (e) {
                          c.$toast("充值成功", "none", 2e3, !1),
                            c.getRecordList(),
                            c.getCarsList();
                        },
                        fail: function (e) {
                          if (
                            ("requestPayment:fail cancel" === e.errMsg &&
                              (console.log("用户取消了充值"),
                              c.$toast("充值已取消", "none", 2e3, !1)),
                            "调用支付JSAPI缺少参数：total_fee" === e.errMsg)
                          )
                            return (
                              console.log(
                                "其它请检查预支付会话标识prepay_id是否已失效 请求的appid与下单接口的appid是否一致 "
                              ),
                              !1
                            );
                          console.log("fail:支付失败" + JSON.stringify(e));
                        },
                      });
                  case 13:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array ||
  (
    a.resolveComponent("zym-navigation") +
    a.resolveComponent("u-icon") +
    a.resolveComponent("u-loadmore") +
    a.resolveComponent("u-popup") +
    a.resolveComponent("u-skeleton")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../uview-plus/components/u-loadmore/u-loadmore.js";
    } +
    function () {
      return "../../uview-plus/components/u-popup/u-popup.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var r = a._export_sfc(o, [
  [
    "render",
    function (e, t, n, o, r, i) {
      return a.e(
        { a: a.p({ title: "车队信息", "is-home-page": !0 }), b: r.parentCard },
        r.parentCard
          ? a.e(
              {
                c: a.t(r.parentCard.cardName ? r.parentCard.cardName : ""),
                d: a.o(i.showToop),
                e: a.p({
                  name: "question-circle",
                  color: "#5ee0e0f0",
                  size: "24",
                }),
                f: r.showTooptil,
              },
              r.showTooptil
                ? {
                    g: a.t(
                      2 === r.parentCard.balanceShare
                        ? "此卡余额可共享"
                        : "此卡余额不共享"
                    ),
                  }
                : {},
              {
                h: a.t(r.parentCard.phone ? r.parentCard.phone : ""),
                i: a.t(r.parentCard.topId ? r.parentCard.topId : ""),
                j: a.t(
                  r.parentCard.cardBalance > 0 ? r.parentCard.cardBalance : 0
                ),
                k: a.f(r.oilTypeDiscountList, function (e, t, n) {
                  return a.e(
                    { a: null != e.oilType },
                    null != e.oilType
                      ? { b: a.t(e.oilType), c: a.t(e.discountAmount) }
                      : {},
                    { d: i.getCardBg(e), e: t }
                  );
                }),
              }
            )
          : {},
        {
          l: "tab1" === r.cureent ? 1 : "",
          m: a.o(function (e) {
            return i.chageTab("tab1");
          }),
          n: "tab2" === r.cureent ? 1 : "",
          o: a.o(function (e) {
            return i.chageTab("tab2");
          }),
          p: "tab1" === r.cureent,
        },
        "tab1" === r.cureent
          ? a.e(
              { q: r.oilCardList.length },
              r.oilCardList.length
                ? {
                    r: a.f(r.oilCardList, function (t, n, o) {
                      return a.e(
                        { a: t.cardName },
                        t.cardName
                          ? { b: a.t(t.cardName ? t.cardName : "") }
                          : {},
                        { c: t.licensePlateNumber },
                        t.licensePlateNumber
                          ? {
                              d: a.t(
                                t.licensePlateNumber ? t.licensePlateNumber : ""
                              ),
                            }
                          : {},
                        { e: t.phone },
                        t.phone
                          ? {
                              f: "".concat(e.imgPath, "/phone.png"),
                              g: a.t(t.phone ? t.phone : ""),
                            }
                          : {},
                        { h: t.cardNum },
                        t.cardNum
                          ? { i: a.t(t.cardBeanNum ? t.cardBeanNum : "") }
                          : {},
                        {
                          j: a.t(t.cardBalance ? t.cardBalance : 0),
                          k: 2 === t.balanceShare,
                        },
                        2 === t.balanceShare
                          ? {
                              l: a.o(function (e) {
                                return i.allocateBalance(2, t);
                              }, t.id),
                              m: a.o(function (e) {
                                return i.allocateBalance(1, t);
                              }, t.id),
                            }
                          : {},
                        {
                          n: t.id,
                          o: a.o(function (e) {
                            return i.allocateBalancePage(t.id, t.topId);
                          }, t.id),
                        }
                      );
                    }),
                  }
                : {}
            )
          : {},
        { s: "tab2" === r.cureent },
        "tab2" === r.cureent
          ? {
              t: a.f(r.consumeList, function (e, t, n) {
                return a.e(
                  {
                    a:
                      0 === t ||
                      e.creatTime.slice(0, 7) !==
                        r.consumeList[t - 1].creatTime.slice(0, 7),
                  },
                  0 === t ||
                    e.creatTime.slice(0, 7) !==
                      r.consumeList[t - 1].creatTime.slice(0, 7)
                    ? { b: a.t(e.creatTime.slice(0, 7)) }
                    : {},
                  {
                    c: a.t(e.outOrderNo ? e.outOrderNo : ""),
                    d: a.t(
                      1 === e.state ? "消费" : 3 === e.state ? "退款" : ""
                    ),
                    e: 3 === e.state ? 1 : "",
                    f: 3 === e.state ? 1 : "",
                    g: e.licensePlateNumber,
                  },
                  e.licensePlateNumber
                    ? {
                        h: a.t(
                          e.licensePlateNumber ? e.licensePlateNumber : ""
                        ),
                      }
                    : {},
                  {
                    i: a.t(e.oilType ? e.oilType : ""),
                    j: a.t(e.price),
                    k: a.t(e.cardId ? e.cardId : ""),
                    l: a.t(e.oilGunName),
                    m: a.t(e.creatTime),
                    n: a.t(e.oilMoney),
                    o: 3 === e.state,
                  },
                  3 === e.state
                    ? { p: a.t(e.actualPayment) }
                    : { q: a.t(e.actualPayment) },
                  { r: a.t(e.totalOil), s: t }
                );
              }),
              v: a.p({
                color: "#63DAE0",
                status: r.status,
                "font-size": "32",
                "icon-size": "34",
                line: !0,
              }),
              w: a.o(function () {
                return i.refreshList && i.refreshList.apply(i, arguments);
              }),
              x: a.o(function () {
                return i.onRefresh && i.onRefresh.apply(i, arguments);
              }),
            }
          : {},
        {
          y: "".concat(e.imgPath, "/close.png"),
          z: a.o(function (e) {
            return i.close(1);
          }),
          A: a.f(r.topUpTypeList, function (e, t, n) {
            return {
              a: a.t(e.topUpCardAmount),
              b: r.slected == e.topUpCardAmount ? 1 : "",
              c: e.cardTopUpId,
              d: a.o(function (t) {
                return i.getactiveMoney(e.topUpCardAmount);
              }, e.cardTopUpId),
            };
          }),
          B: r.showInput,
        },
        r.showInput
          ? {
              C: a.o(function () {
                return i.changeShow && i.changeShow.apply(i, arguments);
              }),
              D: r.inputValue,
              E: a.o(function (e) {
                return (r.inputValue = e.detail.value);
              }),
            }
          : {
              F: a.t(r.inputValue ? r.inputValue : "请输入或选择充值金额"),
              G: a.o(function () {
                return i.showInputtow && i.showInputtow.apply(i, arguments);
              }),
            },
        {
          H: a.t(r.giveAmount > 0 ? r.giveAmount : 0),
          I: a.o(function () {
            return i.handerRecharge && i.handerRecharge.apply(i, arguments);
          }),
          J: a.p({
            show: r.rechargepop,
            mode: "bottom",
            round: "20",
            "safe-area-inset-bottom": !1,
          }),
          K: a.t(1 === r.valueChange ? "分配余额" : "转出余额"),
          L: "".concat(e.imgPath, "/close.png"),
          M: a.o(function (e) {
            return i.close(2);
          }),
          N: a.f(r.topUpMoneyList, function (e, t, n) {
            return {
              a: a.t(e.Amount),
              b: r.slected == e.Amount ? 1 : "",
              c: e.Id,
              d: a.o(function (t) {
                return i.getactiveMoney(e.Amount);
              }, e.Id),
            };
          }),
          O: r.showInput,
        },
        r.showInput
          ? {
              P: a.o(function () {
                return i.changeShow && i.changeShow.apply(i, arguments);
              }),
              Q: r.inputValue,
              R: a.o(function (e) {
                return (r.inputValue = e.detail.value);
              }),
            }
          : {
              S: a.t(r.inputValue ? r.inputValue : "请输入或选择金额"),
              T: a.o(function () {
                return i.showInputtow && i.showInputtow.apply(i, arguments);
              }),
            },
        {
          U: a.t(r.balanceInfoById.id),
          V: a.t(r.balanceInfoById.licensePlateNumber),
          W: 1 === r.valueChange,
        },
        1 === r.valueChange
          ? {
              X: a.t(
                r.inputValue
                  ? (
                      r.balanceInfoById.cardBalance + parseFloat(r.inputValue)
                    ).toFixed(2)
                  : r.balanceInfoById.cardBalance
              ),
            }
          : {},
        { Y: 2 === r.valueChange },
        2 === r.valueChange
          ? {
              Z: a.t(
                r.inputValue
                  ? (
                      r.balanceInfoById.cardBalance - parseFloat(r.inputValue)
                    ).toFixed(2)
                  : r.balanceInfoById.cardBalance
              ),
            }
          : {},
        { aa: 1 === r.valueChange },
        1 === r.valueChange
          ? {
              ab: a.t(
                r.inputValue
                  ? (
                      r.parentCard.cardBalance - parseFloat(r.inputValue)
                    ).toFixed(2)
                  : r.parentCard.cardBalance
              ),
            }
          : {},
        { ac: 2 === r.valueChange },
        2 === r.valueChange
          ? {
              ad: a.t(
                r.inputValue
                  ? (
                      r.parentCard.cardBalance + parseFloat(r.inputValue)
                    ).toFixed(2)
                  : r.parentCard.cardBalance
              ),
            }
          : {},
        {
          ae: a.o(function () {
            return i.handerBalance && i.handerBalance.apply(i, arguments);
          }),
          af: a.p({
            show: r.balancepop,
            mode: "bottom",
            round: "20",
            "safe-area-inset-bottom": !1,
          }),
          ag: a.p({
            loading: r.isloading,
            rows: "16",
            "rows-height": "32",
            "rows-width": "750rpx",
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-8216c3a6"],
]);
wx.createPage(r);
