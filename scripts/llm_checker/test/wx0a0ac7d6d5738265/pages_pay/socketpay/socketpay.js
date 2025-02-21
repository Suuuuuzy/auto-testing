var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../common/vendor.js"),
  o = require("../../utils/debouns.js"),
  a = {
    components: {
      PassWord: function () {
        return "../components/passwordpop.js";
      },
    },
    data: function () {
      return {
        nopwpopShow: !1,
        showPass: !1,
        passWordNumber: ["", "", "", "", "", ""],
        pwIsTure: !0,
        oilCardListShow: !1,
        payType: null,
        loading: !0,
        title: "",
        showPayBtn: !1,
        showorderStatus: 0,
        oilGunOrderId: "",
        cuponTitle: "暂无优惠券",
        timer: "",
        orderlist: [],
        userInfo: r.index.getStorageSync("userInfo"),
        plateTimer: "",
        waitPayOder: [],
        waittimer: null,
        waitCount: 0,
        waitShow: !1,
        oilCardList: [],
        orderOilType: "",
        refillCardId: null,
        states: null,
        UserMoney: 0,
        couponId: "",
        iscardPw: !0,
        sta: null,
        orderid: "",
      };
    },
    onShow: function () {
      console.log("couponId", this.$store.getters.get_coupon_id),
        null !== this.$store.getters.get_coupon_id &&
          (console.log(1234),
          (this.couponId = this.$store.getters.get_coupon_id),
          this.reFreshOrderList()),
        this.getCrads(),
        this.selectBalance();
    },
    onLoad: function (e) {
      var t = this;
      if (
        (console.log("option", e),
        (this.title = e.title),
        e.oilGunOrderId &&
          ((this.oilGunOrderId = e.oilGunOrderId), this.getMoney()),
        e.orderid)
      ) {
        var r = JSON.parse(e.orderid);
        console.log("传进来的订单", r),
          (this.orderlist = r),
          (this.oilGunOrderId = this.orderlist.orderId),
          this.getMoney();
      }
      !e.oilGunOrderId &&
        !e.orderid &&
        ((this.plateTimer = setInterval(function () {
          t.$api
            .autoPlateOrder()
            .then(function (e) {
              if (2e4 === e.data.code) {
                t.loading = !1;
                var r = e.data.data;
                (t.orderlist = e.data.data),
                  4 === r.status &&
                    ((t.timer = setInterval(function () {
                      t.getPlateOrder(r);
                    }, 400)),
                    clearInterval(t.plateTimer)),
                  0 === r.status &&
                    (clearInterval(t.plateTimer), t.getPlateOrder(r)),
                  -1 === r.status && (t.sta = r.status);
              }
            })
            .catch(function (e) {
              console.log("车牌匹配订单失败", e);
            });
        }, 1e3)),
        setTimeout(function () {
          -1 === t.sta && t.$toast("未匹配到订单", "none", 3e3);
        }, 3e3)),
        this.selectWaitPay();
    },
    onUnload: function () {
      this.$store.commit("set_coupon_id", null),
        clearInterval(this.timer),
        clearInterval(this.plateTimer),
        clearInterval(this.waittimer);
    },
    mounted: function () {
      this.loading &&
        !this.oilGunOrderId &&
        this.$toast("正在匹配中...", "none", 3e3),
        (this.toPay = o.throttle(this.toPay, 2e3)),
        (this.oilCardPay = o.throttle(this.oilCardPay, 2e3));
    },
    watch: {
      oilGunOrderId: {
        handler: function (e, t) {
          this.getactive = "" != e && e == t;
        },
        immediate: !0,
        deep: !0,
      },
    },
    methods: {
      selectBalance: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), r.$api.selectUserMoney();
                  case 2:
                    (o = e.sent).data.code === r.$code.SUCCESS
                      ? (r.UserMoney = o.data.data)
                      : o.data.code === r.$code.TOKENFAIL &&
                        setTimeout(function () {
                          return r.selectBalance();
                        }, 2e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      PasswordChage: function (e) {
        this.passWordNumber = e;
        var t = "";
        if (
          (this.passWordNumber.forEach(function (e, r) {
            t += e;
          }),
          6 === t.length)
        ) {
          var r = {
            couponId: this.couponId,
            oilGunOrderId: this.oilGunOrderId,
            refillCardId: this.refillCardId,
            password: t,
          };
          this.oilCardPay(r);
        }
      },
      nopwPay: function () {
        var e = {
          couponId: this.couponId,
          oilGunOrderId: this.oilGunOrderId,
          refillCardId: this.refillCardId,
        };
        console.log("nopwpay====="), this.oilCardPay(e);
      },
      oilCardPay: function (r) {
        var o = this;
        return t(
          e().mark(function t() {
            var a, n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      o.$loading("支付中"), (e.next = 3), o.$api.payByOilCard(r)
                    );
                  case 3:
                    (a = e.sent),
                      console.log("油卡支付api", a),
                      a.data.code === o.$code.SUCCESS
                        ? o.$redirect("/pages_pay/socketpay/paysuccess")
                        : 20002 === a.data.code
                        ? ((n = a.data.data),
                          o.cardNoMoneyToast(n),
                          o.showPassC())
                        : a.data.code === o.$code.FAIL
                        ? (o.showPassC(),
                          o.$toast(a.data.message),
                          (o.pwIsTure = !1),
                          setTimeout(function () {
                            o.pwIsTure = !0;
                          }, 500),
                          "订单已支付或被锁定" === a.data.message &&
                            setTimeout(function () {
                              o.toOrderList();
                            }, 1500))
                        : o.$toast("网络错误");
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      showPassC: function () {
        this.passWordNumber.fill(""), (this.showPass = !1);
      },
      closeNoPwPay: function () {
        this.nopwpopShow = !1;
      },
      getCrads: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), r.$api.selectOilCardList();
                  case 2:
                    (o = e.sent),
                      console.log("油卡", o),
                      o.data.code === r.$code.SUCCESS
                        ? (r.oilCardList = o.data.data)
                        : o.data.code === r.$code.TOKENFAIL &&
                          setTimeout(function () {
                            return r.getCrads();
                          }, 2e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getCardId: function (r) {
        var o = this;
        return t(
          e().mark(function t() {
            var a, n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      console.log("选择的油卡id是", r),
                      (o.refillCardId = r),
                      (o.payType = "yk"),
                      null === o.couponId && (o.couponId = 0),
                      (a = {
                        cardId: o.refillCardId,
                        oilGunOrderId: o.oilGunOrderId,
                        couponId: o.couponId,
                      }),
                      console.log(a),
                      (e.next = 5),
                      o.$api.getOrderCouponMoney(a)
                    );
                  case 5:
                    (n = e.sent).data.code === o.$code.SUCCESS
                      ? (o.orderlist = n.data.data)
                      : (n.data.code === o.$code.TOKENFAIL ||
                          -1 != n.errMsg.indexf("timeout")) &&
                        setTimeout(function () {
                          return o.getCardId(r);
                        }, 2e3);
                  case 7:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      toOrderList: function () {
        this.$jump("/pages_my/pay/pay");
      },
      getOilTypeColor: function () {
        return "92#" == this.orderOilType
          ? "rgba(232, 130, 130, 1)"
          : "95#" == this.orderOilType
          ? "rgba(76, 199, 156, 1)"
          : "98#" == this.orderOilType
          ? "rgba(80, 162, 230, 1)"
          : "0#" == this.orderOilType
          ? "rgba(95, 118, 120, 1)"
          : void 0;
      },
      getPayRadio: function (e) {
        var t = this;
        console.log("e", e),
          (this.payType = e),
          "yk" === e &&
            (console.log("油卡支付"),
            this.oilCardList.length <= 0
              ? (setTimeout(function () {
                  t.payType = "wx";
                }, 50),
                r.index.showModal({ content: "暂无可用油卡", showCancel: !1 }))
              : this.getMoney()),
          "wx" === e &&
            (console.log("微信支付"),
            this.refillCardId && (this.refillCardId = null),
            this.getMoney());
      },
      selectWaitPay: function () {
        var e = this;
        this.waittimer = setInterval(function () {
          (e.waitPayOder = []),
            e.$api
              .getOrderList({ currentPage: 1, pageSize: 10, queryMode: "2" })
              .then(function (t) {
                var r = t.data.data,
                  o = e.waitPayOder.concat(r);
                (e.waitPayOder = Array.from(new Set(o))),
                  e.waitPayOder.length > 1 &&
                    ((e.waitCount = e.waitPayOder.length), (e.waitShow = !0));
              });
        }, 5e3);
      },
      getPlateOrder: function (r) {
        var o = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.getPlateOrder(r);
                  case 2:
                    (a = e.sent),
                      console.log("当前车牌的订单", a),
                      a.data.data &&
                        ((o.orderlist = a.data.data),
                        (o.orderOilType = a.data.data.oilType),
                        (o.oilGunOrderId = o.orderlist.oilGunOrderId),
                        4 != o.orderlist.status &&
                          (o.getMoney(),
                          clearInterval(o.timer),
                          clearInterval(o.plateTimer)),
                        a.data.code === o.$code.TOKENFAIL &&
                          setTimeout(function () {
                            return o.getPlateOrder(r);
                          }, 2e3));
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      handleGoMyCupons: function () {
        this.$jump(
          "/pages_pay/orderCupons/orderCupons?oilGunOrdersId="
            .concat(this.oilGunOrderId, "&cardId=")
            .concat(this.refillCardId, "&couponId=")
            .concat(this.couponId)
        );
      },
      getOrderSelect: function (e) {
        var t = this;
        this.$api.$getOrderSelect(e).then(function (r) {
          r.data.code === t.$code.SUCCESS
            ? console.log(r.data)
            : r.data.code === t.$code.TOKENFAIL &&
              setTimeout(function () {
                return t.getOrderSelect(e);
              }, 2e3);
        });
      },
      getTxtColor: function (e) {
        return e ? "rgba(69, 71, 77, 1)" : "rgba(204, 204, 204, 1)";
      },
      cardNoMoneyToast: function (e) {
        var t = this;
        r.index.showModal({
          content: "油卡余额不足，还需充值".concat(e, "元"),
          confirmText: "立即充值",
          success: function (r) {
            r.confirm &&
              t.$jump(
                "/pages_my/recharge-vip/recharge-oilcard?cardId="
                  .concat(t.refillCardId, "&money=")
                  .concat(e)
              );
          },
        });
      },
      getMoney: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var o, a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      ("yk" == r.payType && (r.states = 2),
                      "wx" == r.payType && (r.states = 1),
                      "yk" != r.payType && "wx" != r.payType && (r.states = 0),
                      r.oilGunOrderId)
                    ) {
                      e.next = 2;
                      break;
                    }
                    return e.abrupt("return", !1);
                  case 2:
                    return (
                      (e.next = 4),
                      r.$api.getGunMoney(r.oilGunOrderId, r.states)
                    );
                  case 4:
                    if (
                      ((o = e.sent).data.code === r.$code.TOKENFAIL &&
                        setTimeout(function () {
                          return r.getMoney();
                        }, 2e3),
                      o.data.code !== r.$code.FAIL)
                    ) {
                      e.next = 8;
                      break;
                    }
                    return (
                      r.$toast(o.data.message || "订单不存在或已支付"),
                      setTimeout(function () {
                        r.$jump("/pages_pay/pay/pay");
                      }, 1500),
                      e.abrupt("return")
                    );
                  case 8:
                    o.data.code !== r.$code.SUCCESS &&
                      o.data.code !== r.$code.FAIL &&
                      r.getMoney(),
                      o.data.code === r.$code.SUCCESS &&
                        ((r.loading = !1),
                        (r.showPayBtn = !0),
                        (a = o.data.data),
                        console.log("============="),
                        (r.orderlist = a),
                        (r.orderOilType = a.oilType),
                        (r.showorderStatus = 1),
                        "null" == a.couponId || null == a.couponId
                          ? (r.couponId = 0)
                          : (r.couponId = a.couponId),
                        a.payTypeState &&
                          (2 == a.payTypeState
                            ? ((r.oilCardListShow = !0),
                              (r.payType = "yk"),
                              0 == a.ynRefillCardVOS.legnth
                                ? ((r.oilCardListShow = !1), (r.payType = "wx"))
                                : (0 === a.cardId &&
                                    a.ynRefillCardVOS.length > 0 &&
                                    (a.ynRefillCardVOS[0].cardId &&
                                      (r.refillCardId =
                                        a.ynRefillCardVOS[0].cardId),
                                    a.ynRefillCardVOS[1].cardId &&
                                      (r.refillCardId =
                                        a.ynRefillCardVOS[1].cardId)),
                                  0 !== a.cardId &&
                                    (console.log(
                                      "自动选择的油卡id\t",
                                      a.cardId
                                    ),
                                    (r.refillCardId = a.cardId))))
                            : 1 == a.payTypeState &&
                              ((r.oilCardListShow = !1), (r.payType = "wx"))),
                        1 === a.status
                          ? (r.cuponTitle = a.couponTitle)
                          : (r.cuponTitle = "暂无可用优惠券"));
                  case 9:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      reFreshOrderList: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var o, a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      (console.log("更换优惠券后请求刷新订单"),
                      (o = {}),
                      null == r.couponId || !r.oilGunOrderId)
                    ) {
                      e.next = 8;
                      break;
                    }
                    return (
                      (o = r.refillCardId
                        ? {
                            cardId: r.refillCardId,
                            oilGunOrderId: r.oilGunOrderId,
                            couponId: r.couponId,
                          }
                        : {
                            couponId: r.couponId,
                            oilGunOrderId: r.oilGunOrderId,
                          }),
                      (e.next = 6),
                      r.$api.getOrderCouponMoney(o)
                    );
                  case 6:
                    (a = e.sent).data.code === r.$code.SUCCESS
                      ? (console.log("金额刷新请求成功了呢", a),
                        (r.orderlist = a.data.data))
                      : a.data.code === r.$code.TOKENFAIL &&
                        setTimeout(function () {
                          return r.reFreshOrderList();
                        }, 2e3);
                  case 8:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      toPay: function () {
        var e = this;
        this.$store.state.hasLogin
          ? (console.log("支付处的payType", this.payType),
            "yk" == this.payType &&
              this.oilCardList.forEach(function (t, r) {
                t.cardId === e.orderlist.cardId &&
                  (console.log("=======", t.cardId),
                  console.log(t.cardId === e.orderlist.cardId),
                  0 === t.passwordExist &&
                    ((e.iscardPw = !1), (e.nopwpopShow = !0)),
                  1 === t.passwordExist && (e.showPass = !0));
              }),
            "wx" == this.payType && (console.log("微信支付"), this.createOrd()))
          : this.$jump("/pages_my/login/wx_login");
      },
      createOrd: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var o, a, n, i, s, d, c, l, u;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      r.$loading(),
                      (o = {
                        oilGunOrderId: r.oilGunOrderId,
                        couponId: r.couponId,
                      }),
                      console.log("开始创建订单"),
                      (e.next = 5),
                      r.$api.createOrder(o)
                    );
                  case 5:
                    if (
                      ((a = e.sent).data.code === r.$code.SUCCESS &&
                        ((n = a.data.data),
                        (i = n.outOrderNo),
                        (s = n.paySign),
                        (d = n.payPackage),
                        (c = n.payTimeStamp),
                        (l = n.paySignType),
                        (u = n.paynonceStr),
                        r.wxpay(s, d, c, l, u, i)),
                      a.data.code !== r.$code.FAIL)
                    ) {
                      e.next = 10;
                      break;
                    }
                    return (
                      r.$toast(a.data.message),
                      setTimeout(function () {
                        r.$jump("/pages_pay/pay/pay");
                      }, 1500),
                      e.abrupt("return")
                    );
                  case 10:
                    a.data.code === r.$code.TOKENFAIL &&
                      setTimeout(function () {
                        return r.createOrd();
                      }, 2e3);
                  case 11:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      wxpay: function (e, t, o, a, n, i) {
        var s = this;
        r.index.requestPayment({
          provider: "wxpay",
          timeStamp: o,
          nonceStr: n,
          package: t,
          signType: a,
          paySign: e,
          success: function (e) {
            "requestPayment:ok" === e.errMsg &&
              s.$redirect(
                "/pages_pay/select_order/select_order?outOrderNo=".concat(i)
              );
          },
          fail: function (e) {
            if (
              ("requestPayment:fail cancel" === e.errMsg && s.orderCanle(i),
              "调用支付JSAPI缺少参数：total_fee" === e.errMsg)
            )
              return s.$toast("支付失败"), !1;
          },
        });
      },
      orderCanle: function (r) {
        var o = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.$getShopOrderCancel(r);
                  case 2:
                    (a = e.sent).data.code === o.$code.TOKENFAIL &&
                      setTimeout(function () {
                        return o.orderCanle(r);
                      }, 2e3),
                      a.data.code === o.$code.SUCCESS &&
                        o.$toast("支付已取消", "none", 2e3, !1);
                  case 4:
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
    r.resolveComponent("zym-navigation") +
    r.resolveComponent("u-skeleton") +
    r.resolveComponent("PassWord") +
    r.resolveComponent("u-popup")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    } +
    function () {
      return "../../uview-plus/components/u-popup/u-popup.js";
    }
  )();
var n = r._export_sfc(a, [
  [
    "render",
    function (e, t, o, a, n, i) {
      return r.e(
        {
          a: r.p({ title: n.title, "is-home-page": !1 }),
          b: r.t(e.$store.state.stationName),
          c: "".concat(e.$imgPath, "/MapPin.png"),
          d: n.waitShow,
        },
        n.waitShow
          ? {
              e: r.o(function () {
                return i.toOrderList && i.toOrderList.apply(i, arguments);
              }),
            }
          : {},
        {
          f: "".concat(e.$imgPath, "/gun.png"),
          g: r.t(n.orderlist.oilGunName ? n.orderlist.oilGunName : "枪号"),
          h: i.getTxtColor(n.oilGunOrderId),
          i: "".concat(e.$imgPath, "/money.png"),
          j: r.t(n.orderlist.discountAmount ? n.orderlist.discountAmount : 0),
          k: r.t(n.orderlist.totalOil ? n.orderlist.totalOil : 0),
          l: r.t(n.orderlist.unitPrice ? n.orderlist.unitPrice : 0),
          m: r.t(n.orderlist.oilType ? n.orderlist.oilType : ""),
          n: n.orderlist.licensePlateNumber,
        },
        n.orderlist.licensePlateNumber
          ? {
              o: r.t(
                n.orderlist.licensePlateNumber.slice(0, 2) +
                  "·" +
                  n.orderlist.licensePlateNumber.slice(2)
                  ? n.orderlist.licensePlateNumber.slice(0, 2) +
                      "·" +
                      n.orderlist.licensePlateNumber.slice(2)
                  : "未绑定"
              ),
            }
          : {},
        { p: 1 === n.showorderStatus },
        1 === n.showorderStatus
          ? { q: r.t(n.orderlist.couponPrice ? n.orderlist.couponPrice : "0") }
          : {},
        { r: 1 === n.showorderStatus },
        1 === n.showorderStatus
          ? {
              s: r.t(
                n.orderlist.memberRemissionAmount
                  ? n.orderlist.memberRemissionAmount
                  : 0
              ),
            }
          : {},
        { t: 1 === n.showorderStatus },
        1 === n.showorderStatus
          ? {
              v: "".concat(e.$imgPath, "/cupon.png"),
              w: r.t(
                0 != n.couponId && null != n.couponId
                  ? n.orderlist.couponTitle
                  : 0 == n.couponId
                  ? ""
                  : n.cuponTitle
              ),
              x: "".concat(e.$imgPath, "/rightArrow.png"),
              y: r.o(function () {
                return (
                  i.handleGoMyCupons && i.handleGoMyCupons.apply(i, arguments)
                );
              }),
            }
          : {},
        { z: 1 === n.showorderStatus },
        1 === n.showorderStatus
          ? {
              A: "".concat(e.$imgPath, "/wxPay.png"),
              B: "wx" == n.payType,
              C: r.o(function (e) {
                return i.getPayRadio("wx");
              }),
              D: "".concat(e.$imgPath, "/vipcard.png"),
              E: r.t(n.UserMoney ? n.UserMoney : 0),
              F: "yk" == n.payType,
              G: r.o(function (e) {
                return i.getPayRadio("yk");
              }),
              H: r.f(n.oilCardList, function (e, t, o) {
                return {
                  a: r.t(e.cardName ? e.cardName : ""),
                  b: n.refillCardId === e.refillCardId ? "#fff" : "#333",
                  c: r.t(e.cardBalance),
                  d: n.refillCardId === e.refillCardId ? 1 : "",
                  e: r.f(e.oilTypeDiscountList, function (t, o, a) {
                    return r.e(
                      { a: t.oilType == n.orderOilType },
                      t.oilType == n.orderOilType
                        ? {
                            b: r.t(t.oilType),
                            c: i.getOilTypeColor(),
                            d:
                              n.refillCardId === e.refillCardId
                                ? "#fff"
                                : "#fcfcfc",
                            e: r.t(t.discountAmount),
                            f:
                              n.refillCardId === e.refillCardId
                                ? "#fff"
                                : i.getOilTypeColor(),
                            g:
                              n.refillCardId === e.refillCardId
                                ? "#FFFEEDFF"
                                : "#8A8D99FF",
                          }
                        : {},
                      { h: o }
                    );
                  }),
                  f: r.o(function (r) {
                    return i.getCardId(e.cardId, t);
                  }, e.refillCardId),
                  g: e.refillCardId,
                  h:
                    n.refillCardId === e.refillCardId && "yk" == n.payType
                      ? 1
                      : "",
                };
              }),
              I: n.oilCardListShow,
              J: "yk" == n.payType ? 1 : "",
            }
          : {},
        { K: !n.showPayBtn },
        n.showPayBtn
          ? {
              L: r.o(function () {
                return i.toPay && i.toPay.apply(i, arguments);
              }),
            }
          : {},
        {
          M: r.p({
            loading: n.loading,
            rows: "16",
            "rows-height": "36",
            "rows-width": "750rpx",
          }),
          N: n.showPass,
        },
        n.showPass
          ? {
              O: r.o(i.PasswordChage),
              P: r.o(i.showPassC),
              Q: r.p({ password: n.passWordNumber, pwIsTure: n.pwIsTure }),
            }
          : {},
        {
          R: r.o(function () {
            return i.closeNoPwPay && i.closeNoPwPay.apply(i, arguments);
          }),
          S: "".concat(e.$imgPath, "/gunclose.png"),
          T: r.t(n.orderlist.discountAmount ? n.orderlist.discountAmount : 0),
          U: r.o(function () {
            return i.nopwPay && i.nopwPay.apply(i, arguments);
          }),
          V: r.p({
            show: n.nopwpopShow,
            mode: "bottom",
            round: "20",
            "background-color": "rgba(0,0,0,0)",
            "safe-area-inset-bottom": !1,
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-efe5ac0d"],
]);
wx.createPage(n);
