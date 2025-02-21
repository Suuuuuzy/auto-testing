getApp().BasePage({
  data: {},
  onLoad: function (o) {
    var n = decodeURIComponent(o.good);
    (n = JSON.parse(n)),
      console.log("good --\x3e>", n.id),
      this.setData({ good: n }),
      n &&
        wx.setNavigationBarTitle({
          title: this.data.isUy ? n.uy_name : n.ch_name,
        });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
