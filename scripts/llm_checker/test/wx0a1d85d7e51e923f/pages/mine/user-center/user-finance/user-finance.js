var t, a;
getApp().BasePage({
  data: {
    noMore: !0,
    withdrawValue: null,
    showWithdraw: !1,
    hasVideoAdd: !1,
    isShowingAdvert: !1,
  },
  onLoad: function (a) {
    (t = this), (this.page = 1), this.initVideoAd(), this.loadData();
  },
  initVideoAd: function () {
    console.log("initViewAd"),
      wx.createRewardedVideoAd
        ? ((a = wx.createRewardedVideoAd({
            adUnitId: "adunit-2929c1885bc3f712",
          })).onLoad(function () {
            t.setData({ hasVideoAdd: !0 }), console.log("adver onLoad");
          }),
          a.onError(function (a) {
            t.setData({ hasVideoAdd: !1 });
          }),
          a.onClose(function (a) {
            if ((console.log("advert res =>", a), a && a.isEnded))
              console.log("isEnden"),
                t.data.isShowingAdvert &&
                  (t.setData({ isShowingAdvert: !1 }), t.createAdvertCoupon(1));
            else if ((console.log("not ended"), t.data.isShowingAdvert)) {
              t.setData({ isShowingAdvert: !1 });
              var e = "ئېلانى تۇلۇق كۆرمسىڭىز ئېتىبارلىق بىلەتكە ئىرشەلمەيسىز";
              t.data.isUy || (e = "未能全部看完广告就获取不到优惠券"),
                t.showT({ content: e }, function (a) {
                  t.createAdvertCoupon(0);
                });
            }
          }))
        : console.log("cant reload advert"),
      this.setData({ hasVideoAdd: this.data.hasVideoAdd });
  },
  createAdvertCoupon: function (a) {
    this.requestWithLoading(
      "userCenter/createAdvertMoney",
      { type: a },
      function (e) {
        if (e && 1 == a && -1 != e) {
          var o = (e.amount / 100).toFixed(2),
            n = "سىز" + o + "يۈەنلىك  قىزىل بولاققا ئېرشتىڭىز";
          t.data.isUy || (n = "你获得了" + o + "元的红包"),
            t.showT(
              { content: n, icon: "success", color: "pink" },
              function (a) {
                (t.page = 1), t.loadData();
              }
            );
        }
      },
      !0
    );
  },
  widthdrawInput: function (t) {
    t.detail.value;
    console.log("all --\x3e>", this.data.result.all);
  },
  advertConfitm: function () {
    this.setData({ modalName: "" }),
      a &&
        a
          .show()
          .catch(function () {})
          .then(function () {
            console.log("advertShow"), t.setData({ isShowingAdvert: !0 });
          });
  },
  startAdvert: function (t) {
    console.log("start advert=="), this.setData({ modalName: "advertDialog" });
  },
  loadData: function () {
    this.requestWithLoading(
      "userCenter/userFinanceHome",
      { page: this.page },
      function (a) {
        if (a) {
          if (
            (a.total == a.to || 0 == a.total
              ? t.setData({ noMore: !0 })
              : t.setData({ noMore: !1 }),
            a && a.data && (a = t.initAmount(a)),
            1 == t.page)
          )
            t.setData({ result: a });
          else {
            var e = t.data.result.data.concat(a.data);
            (a.data = e), t.setData({ result: a });
          }
          t.page++;
        }
      }
    );
  },
  initAmount: function (t) {
    var a = t.data;
    if (a && a.length > 0)
      for (var e in a) a[e].amount = parseFloat(a[e].amount / 100).toFixed(2);
    return t;
  },
  hideModal: function () {
    this.setData({ modalName: "" });
  },
  withdrawInput: function (t) {
    var a = t.detail.value;
    (a = parseFloat(a)),
      this.data.result.all && a <= this.data.result.all
        ? this.setData({ withdrawValue: a })
        : this.setData({ withdrawValue: 0 });
  },
  widthdrawBtn: function (t) {
    this.setData({ showWithdraw: !this.data.showWithdraw });
  },
  confirmBtn: function (a) {
    this.requestWithLoading(
      "userCenter/withdrawAmount",
      { amount: this.data.withdrawValue },
      function (a) {
        a &&
          t.successToast(function () {
            t.setData({ showWithdraw: !1, withdrawValue: "" }),
              (t.page = 1),
              t.loadData();
          });
      }
    );
  },
  recommendBtn: function (t) {
    this.setData({ modalName: "aboutGetMoney" });
  },
  iKonwBtn: function (t) {
    this.setData({ modalName: "" }),
      wx.navigateTo({
        url:
          "./my-recommend/my-recommend?title=" +
          this.data.Str.iRecommend[this.data.lanIndex],
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    (this.page = 1), this.loadData();
  },
  onReachBottom: function () {
    this.data.noMore || this.loadData();
  },
});
