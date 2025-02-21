var t;
getApp().BasePage({
  data: {
    tabInfo: [
      { uy_name: "ئىشلەتمىگەنلىرىم", ch_name: "未使用" },
      { uy_name: "ئىشلەتكەنلىرىم", ch_name: "已使用" },
      { uy_name: "ۋاقتى ئۆتكەنلىرى", ch_name: "已过期" },
    ],
    TabCur: 0,
    noMore: !0,
    hasVideoAdd: !1,
  },
  onLoad: function (a) {
    (t = this), (this.page = 1), this.initVideoAd(), this.loadData();
  },
  createAdvertCoupon: function (a) {
    this.requestWithLoading(
      "userCenter/createAdvertCoupon",
      { type: a },
      function (e) {
        if (e && 1 == a) {
          var n = "سىز" + e.amount + "يۈەنلىك ئېتىبارلىق بىلەتكە ئېرشتىڭىز";
          t.data.isUy || (n = "你获得了" + e.amount + "元的优惠券"),
            t.showT(
              { content: n, icon: "success", color: "pink" },
              function (a) {
                (t.page = 1), t.loadData();
              }
            );
        }
      },
      !0
    ),
      this.initVideoAd();
  },
  startAdvert: function (t) {
    console.log("start advert==");
  },
  tabSelect: function (t) {
    this.setData({ TabCur: t.currentTarget.dataset.id }),
      (this.page = 1),
      this.loadData();
  },
  loadData: function () {
    this.requestWithLoading(
      "userCenter/getMyCoupon",
      { type: this.data.TabCur, page: this.page },
      function (a) {
        if (a) {
          if (
            (a.total == a.to || 0 == a.total
              ? t.setData({ noMore: !0 })
              : t.setData({ noMore: !1 }),
            1 == t.page)
          )
            t.setData({ result: a, selectCount: 0 });
          else {
            var e = t.data.result.data.concat(a.data);
            (a.data = e), t.setData({ result: a, selectCount: 0 });
          }
          t.page++;
        }
      }
    );
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.data.noMore || this.loadData();
  },
});
