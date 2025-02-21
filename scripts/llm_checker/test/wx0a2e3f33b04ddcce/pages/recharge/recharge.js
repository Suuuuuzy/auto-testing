var t = r(require("../../components/vant/toast/toast")),
  a = r(require("../../components/vant/dialog/dialog")),
  e = require("../../assets/js/validator.js");
function r(t) {
  return t && t.__esModule ? t : { default: t };
}
var n = getApp();
Page({
  data: {
    money: [0.01, 50, 100, 200, 500],
    rechargeButton: !0,
    recharge: 0,
    active: "",
    cardId: "",
    detailsData: [],
    cardDetail: {},
    selfActive: "",
    rechargeInfo: {},
  },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  change: function (t) {
    this.setData({ recharge: 0 }),
      t.currentTarget.dataset.index < this.data.money.length
        ? this.setData({
            active: t.currentTarget.dataset.index,
            recharge: t.currentTarget.dataset.money,
            rechargeButton: !1,
            selfActive: !1,
          })
        : t.detail.value
        ? (this.setData({
            rechargeButton: !1,
            recharge: t.detail.value,
            active: this.data.money.length,
            selfActive: !0,
          }),
          this.check(this.data.recharge))
        : this.setData({
            active: this.data.money.length,
            selfActive: !0,
            rechargeButton: !0,
          });
  },
  check: function (t) {
    t
      ? t <= 0 || t > 1e3
        ? (wx.showToast({
            title: "请输入大于0小于等于1000的整数",
            icon: "none",
            duration: 1e3,
          }),
          this.setData({ rechargeButton: !0 }))
        : t.toString().includes(".") && 2 !== t.toString().split(".")[1].length
        ? (this.setData({ rechargeButton: !0 }),
          (0, e.isValidMoney)(t) || this.setData({ rechargeButton: !0 }))
        : this.setData({ recharge: t, rechargeButton: !1 })
      : (wx.showToast({
          title: "请输入自定义金额，或选择固定金额",
          icon: "none",
          duration: 1e3,
        }),
        this.setData({ rechargeButton: !0 }));
  },
  checkMoney: function (t) {
    t.detail
      ? t.detail <= 0 || t.detail > 1e3
        ? (wx.showToast({
            title: "请输入大于0小于等于1000的整数",
            icon: "none",
            duration: 1e3,
          }),
          this.setData({ rechargeButton: !0 }))
        : t.detail.toString().includes(".")
        ? t.detail.toString().split(".")[1].length > 2 ||
          0 === t.detail.toString().split(".")[1].length
          ? (this.setData({ rechargeButton: !0 }),
            (0, e.isValidMoney)(t.detail) ||
              this.setData({ rechargeButton: !0 }))
          : 1 === t.detail.toString().split(".")[1].length
          ? this.setData({ recharge: t.detail + "0", rechargeButton: !1 })
          : this.setData({ recharge: t.detail, rechargeButton: !1 })
        : this.setData({ recharge: t.detail, rechargeButton: !1 })
      : (wx.showToast({
          title: "请输入自定义金额，或选择固定金额",
          icon: "none",
          duration: 1e3,
        }),
        this.setData({ rechargeButton: !0 }));
  },
  recharge: function () {
    var e = this,
      r = this;
    if (0 !== this.data.recharge) {
      var i = {
        url: "".concat(n.globalData.user, "/userCard/appletRecharge"),
        method: "POST",
        data: { cardId: this.data.cardId, totalFee: this.data.recharge },
        successCallback: function (n) {
          console.log(n),
            200 === n.data.resultCode
              ? (e.setData({ rechargeInfo: n.data.data }),
                wx.requestPayment({
                  timeStamp: e.data.rechargeInfo.iTimestamp,
                  nonceStr: e.data.rechargeInfo.iNoncestr,
                  package: e.data.rechargeInfo.packages,
                  signType: e.data.rechargeInfo.iSign,
                  paySign: e.data.rechargeInfo.sign,
                  success: function (t) {
                    a.default
                      .alert({ title: "提示", message: "充值成功" })
                      .then(function () {
                        r.updateRechargeOrderState(
                          r.data.rechargeInfo.outTradeNo
                        ),
                          setTimeout(function () {
                            wx.switchTab({ url: "/pages/card/card" });
                          }, 3e3);
                      });
                  },
                  fail: function (a) {
                    t.default.fail("充值失败");
                  },
                }))
              : 10400 === n.data.resultCode
              ? t.default.fail("支付失败，请检查商户信息。")
              : 60001 === n.data.resultCode
              ? wx.showToast({
                  title: "请输入大于0小于等于1000的整数",
                  icon: "none",
                  duration: 1e3,
                })
              : 30006 === n.data.resultCode
              ? t.default.fail("卡片已冻结。")
              : 30007 === n.data.resultCode
              ? t.default.fail("卡片已欠费。")
              : 30008 === n.data.resultCode
              ? t.default.fail("卡片已失效。")
              : 30013 === n.data.resultCode
              ? t.default.fail("卡片异常。")
              : t.default.fail(n.data.resultMessage);
        },
      };
      n.request(i);
    } else
      wx.showToast({
        title: "请输入自定义金额，或选择固定金额",
        icon: "none",
        duration: 1e3,
      });
  },
  updateRechargeOrderState: function (a) {
    var e = {
      url: "".concat(
        n.globalData.user,
        "/userCard/updateAppletRechargeOrderState"
      ),
      method: "POST",
      data: { outTradeNo: a },
      successCallback: function (a) {
        200 === a.data.resultCode
          ? console.log("订单状态已更新")
          : (a.data.resultCode, t.default.fail("订单未支付"));
      },
    };
    n.request(e);
  },
  onLoad: function (t) {
    var a = this;
    this.getOpenerEventChannel().on("detailsInfo", function (t) {
      a.setData({ cardId: t.cardId });
    });
  },
  onShow: function () {
    this.getDetails();
  },
  getDetails: function () {
    var t = this,
      a = {
        url: "".concat(n.globalData.user, "/userCard/queryUserCards"),
        method: "POST",
        data: { cardId: this.data.cardId },
        successCallback: function (a) {
          200 === a.data.resultCode && t.setData({ detailsData: a.data.data }),
            t.data.detailsData.forEach(function (a) {
              a.id === t.data.cardId &&
                ((t.data.cardDetail = a),
                t.setData({ cardDetail: t.data.cardDetail }));
            });
        },
      };
    n.request(a);
  },
  onReady: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
