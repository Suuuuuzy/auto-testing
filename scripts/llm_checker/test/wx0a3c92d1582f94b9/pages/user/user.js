var t = getApp(),
  a = "",
  o = "";
Page({
  data: {
    showInvest: !1,
    isInvest: !1,
    money: 0,
    token: "",
    couponMoney: 0,
    isSign: !1,
    isauthorize: !1,
    coupon: !1,
    couponData: { discount: 0, show: !1 },
    couponTime: 0,
    couponTimeShow: 0,
    userInfo: "",
    isios: "ios" == wx.getSystemInfoSync().platform,
    showadappid: t.showadappid,
    moneyData: t.moneyData,
    investShow: t.investShow,
    vip: !1,
    shareMsg: !1,
    contact: !1,
    task: {},
    uid: "",
    appback: !1,
    isapp: !1,
    appmsg: !1,
  },
  hideContact: function () {
    this.setData({ contact: !1 });
  },
  hideApp: function () {
    this.setData({ appback: !1, isauthorize: !1 });
  },
  onShow: function () {
    var a = this;
    if ((console.log(t.userinfo), !t.userinfo)) return !1;
    var o = !0;
    if (
      (0 == a.data.isapp && (o = 1 == wx.getStorageSync("isapp")),
      this.setData({
        contact: wx.getStorageSync("contact"),
        isapp: o,
        uid: wx.getStorageSync("uid") ? wx.getStorageSync("uid") : "",
      }),
      wx.setStorageSync("isapp", !1),
      wx.setStorageSync("uid", !1),
      wx.setStorageSync("contact", !1),
      this.getTabBar().setData({ selected: 4 }),
      null != t.payStatus && null != t.payStatus && "" != t.payStatus)
    ) {
      var e = t.orderNo;
      if (
        (console.log("接收到返回支付结果", t.payStatus),
        console.log("订单号", e),
        t.payStatus)
      )
        return (
          (t.payStatus = null),
          a.setData({ showInvest: !1 }),
          wx.showLoading({ title: "正在支付...", mask: !0 }),
          setTimeout(function () {
            a.getUser();
            var t = !1;
            a.data.isapp && (t = !0), a.setData({ appback: t });
          }, 2e3),
          !1
        );
    } else a.getUser();
  },
  onPullDownRefresh: function () {
    this.getUser();
  },
  onSign: function () {
    var a = this;
    t.postData(t.apiurl + "/user/onSign", {}, function (t) {
      wx.showToast({ title: t.msg, icon: "none" }),
        setTimeout(function () {
          a.getUser();
        }, 2e3);
    });
  },
  getUser: function () {
    var a = this;
    wx.showLoading({ title: "加载中.." }),
      t.getUser(function (o) {
        var e = !1,
          n = !1,
          s = 0,
          i = Date.parse(new Date()) / 1e3,
          c = 1 == wx.getStorageSync("authorize");
        c && wx.setStorageSync("authorize", !1),
          o.discount > 0 &&
            (wx.getStorageSync("couponTime")
              ? (i =
                  o.discountTime -
                  (Date.parse(new Date()) / 1e3 -
                    wx.getStorageSync("couponTime")))
              : ((e = !0),
                (n = !o.level),
                wx.setStorageSync("couponTime", i),
                (i = o.discountTime)),
            i > 0 &&
              ((e = !0),
              (s =
                Math.floor((i % 86400) / 3600) +
                ":" +
                Math.floor(((i % 86400) % 3600) / 60) +
                ":" +
                (i % 60)),
              a.onCouponTime())),
          a.setData({
            isSign: !1,
            userInfo: o,
            coupon: e,
            isauthorize: c,
            token: c ? wx.getStorageSync("token") : "",
            couponData: { discount: o.discount, show: n },
            couponTime: i,
            couponTimeShow: s,
            showInvest: wx.getStorageSync("showVip"),
            isInvest:
              !!(
                wx.getStorageSync("invest") ||
                t.isInvest ||
                a.data.isInvest
              ) || o.isInvest,
            appmsg:
              "ios" == wx.getSystemInfoSync().platform
                ? o.appmsg_ios
                : o.appmsg,
            moneyData: o.moneyAll,
          }),
          wx.setStorageSync("showVip", !1),
          wx.stopPullDownRefresh(),
          a.onGetTask();
      });
  },
  onCouponTime: function () {
    var t = this;
    clearInterval(o),
      (o = setInterval(function () {
        var a = t.data.couponTime - 1,
          e =
            Math.floor((a % 86400) / 3600) +
            ":" +
            Math.floor(((a % 86400) % 3600) / 60) +
            ":" +
            (a % 60);
        a <= 0
          ? (t.setData({ coupon: !1, couponTime: a, couponTimeShow: e }),
            clearInterval(o))
          : t.setData({ coupon: !0, couponTime: a, couponTimeShow: e });
      }, 1e3));
  },
  onGetTask: function () {
    var a = this;
    t.postData(t.apiurl + "/user/onGetTask", [], function (o) {
      var e = 0;
      for (var n in o.data.ad.config) e += o.data.ad.config[n];
      (o.data.ad.count = e), a.setData({ task: o.data }), (t.task = o.data);
    });
  },
  copyAppName: function () {
    wx.setClipboardData({
      data: this.data.isios ? "小葩水印" : "小葩去水印",
      success: function (t) {
        wx.showToast({ title: "名称复制成功！", icon: "none" });
      },
    });
  },
  onLoad: function () {
    var a = this;
    wx.showLoading({ title: "加载中.." }),
      wx.showShareMenu({ withShareTicket: !0 }),
      t.userinfo
        ? (console.log(2), this.init())
        : (console.log(3),
          (t.checkGetSignCallback = function (t) {
            console.log(4), wx.hideLoading(), a.onShow(), a.init();
          }));
  },
  init: function () {
    var o = this;
    console.log(5),
      o.setData({
        userInfo: t.userinfo,
        invest_msg: t.invest_msg,
        showadappid: t.showadappid,
        isInvest: !(!wx.getStorageSync("invest") && !t.isInvest),
      }),
      "" == o.data.moneyData
        ? t.postData(t.apiurl + "/api/onGetXcxConfig", {}, function (a) {
            (t.moneyData = a.data.money), (t.showadappid = a.data.showadappid);
            var e =
              !(!wx.getStorageSync("invest") && !t.isInvest) || a.data.isInvest;
            console.log(e),
              (t.isInvest = e),
              o.setData({
                moneyData: a.data.money,
                invest_msg: a.data.invest_msg,
                showadappid: a.data.showadappid,
                isInvest: e,
              }),
              wx.setStorageSync("invest", null);
          })
        : wx.setStorageSync("invest", null),
      (a = wx.createRewardedVideoAd({ adUnitId: t.ad_jili })).onError(function (
        t
      ) {
        a = "";
      }),
      a.onClose(function (t) {
        o.setData({ adState: 0 }),
          !t.isEnded &&
          Date.parse(new Date()) / 1e3 - wx.getStorageSync("showAdTimeOn") < 30
            ? (wx.hideLoading(),
              wx.showModal({
                title: "提示",
                content: "广告任务\n需看完广告才能行喔",
                success: function (t) {
                  t.confirm &&
                    (wx.setStorageSync(
                      "showAdTimeOn",
                      Date.parse(new Date()) / 1e3
                    ),
                    a.show());
                },
              }))
            : o._onAd();
      }),
      a.load(),
      (wx.getStorageSync("token") && "" != wx.getStorageSync("token")) ||
        o.setData({ isSign: !0 });
  },
  onShowAd: function () {
    "" == a
      ? wx.showToast({ title: "广告加载失败！", icon: "none" })
      : (wx.setStorageSync("showAdTimeOn", Date.parse(new Date()) / 1e3),
        a.show());
  },
  showMsg: function (t) {
    wx.previewImage({ urls: [t.currentTarget.dataset.img] });
  },
  _onAd: function () {
    var a = this;
    t.postData(t.apiurl + "/user/onShowAd", {}, function (t) {
      wx.showToast({ title: t.msg, icon: "none" }),
        setTimeout(function () {
          a.getUser();
        }, 2e3);
    });
  },
  onHide: function () {
    wx.setStorageSync("showVip", !1);
  },
  getUserInfo: function () {
    var a = this;
    t.login({}, function (t) {
      a.setData({
        isSign: !1,
        userInfo: t,
        showInvest: wx.getStorageSync("showVip"),
        moneyData: t.moneyAll,
      });
    });
  },
  getCode: function () {
    wx.previewImage({ urls: [t.code_img] });
  },
  showInvest: function () {
    this.setData({ showInvest: !0 });
  },
  hideInvest: function () {
    var t = this.data.couponData;
    (t.show = !1), this.setData({ showInvest: !1, couponData: t });
  },
  showShareMsg: function () {
    this.setData({ shareMsg: !0 });
  },
  hideShareMsg: function () {
    this.setData({ shareMsg: !1 });
  },
  goHtml: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.navigateTo({ url: "/pages/url/url?url=" + a });
  },
  selectMoney: function (t) {
    var a = t.currentTarget.dataset.money;
    this.setData({
      money: a,
      couponMoney: Math.floor(a * (1 - this.data.couponData.discount)),
    });
  },
  recharge: function () {
    if (0 == this.data.money)
      return (
        wx.showToast({
          title: "请选择充值金额",
          icon: "none",
          duration: 2e3,
          mask: !0,
        }),
        !1
      );
    wx.showLoading({ title: "生成订单...", mask: !0 });
    var a = { money: this.data.money, token: wx.getStorageSync("token") };
    "" != this.data.uid && (a.uid = this.data.uid),
      this.data.coupon && (a.discount = this.data.couponData.discount),
      console.log(a),
      t.postData(t.apiurl + "/user/onRechargeOrder", a, function (t) {
        wx.hideLoading(),
          console.log(t),
          1 == t.code
            ? wx.navigateToMiniProgram({
                appId: "wx2574b5c5ee8da56b",
                path: "pages/hpj_cashier/cashier",
                extraData: t.data,
                success: function (t) {
                  callback(t);
                },
                fail: function (t) {
                  callback(t);
                },
              })
            : wx.showToast({ title: "系统有误", icon: "none", duration: 2e3 });
      });
  },
  onShareAppMessage: function (t) {
    return {
      title: "短视频免费去水印",
      path:
        "/pages/watermark/watermark?type=8777" +
        (this.data.task.share.show
          ? "&parent_id=" + this.data.userInfo.id
          : ""),
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/share.jpg",
    };
  },
});
