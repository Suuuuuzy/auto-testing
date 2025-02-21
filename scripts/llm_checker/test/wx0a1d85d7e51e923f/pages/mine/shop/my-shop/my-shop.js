var a = getApp(),
  t = void 0;
a.BasePage({
  data: {},
  onLoad: function (a) {
    t = this;
  },
  loadData: function () {
    this.requestWithLoading("admin/myShopList", {}, function (a) {
      a &&
        (a.shops && (a.shops = t.initShops(a.shops)),
        t.setData({ pageData: a }));
    });
  },
  initShops: function (n) {
    if (n && n.length > 0)
      for (var o in n) {
        var i = a.globalData.location;
        if (
          (i && (n[o] = this.location.initShopDistance(n[o], i)),
          n[o].created_at)
        )
          t.tool.dateDifference(n[o].created_at) < 30 && (n[o].is_new = !0);
        0 == n[o].zan_count && 0 == n[o].zan_count
          ? (n[o].stars = 5)
          : (n[o].stars = (
              (n[o].zan_count / (n[o].zan_count + n[o].cha_count)) *
              5
            ).toFixed(1));
      }
    return n;
  },
  initDistance: function () {
    var n = a.globalData.location;
    if (n) {
      var o = this.data.pageData;
      if (o && o.shops.length > 0) {
        for (var i in o.shops)
          if (o.shops[i].lat > 0 && o.shops[i].lng > 0) {
            var s = parseInt(
              this.location.getDistance(
                o.shops[i].lat,
                o.shops[i].lng,
                n.location.lat,
                n.location.lng
              )
            );
            s < 1e3
              ? (s += " m")
              : (s =
                  s >= 1e3 && s <= 1e3
                    ? Math.ceil(s / 1e3) + " Km"
                    : this.data.isUy
                    ? "10Km <"
                    : ">10Km"),
              (o.shops[i].distance = s);
          } else o.shops[i].distance = -1;
        console.log("distance", o), t.setData({ pageData: o });
      }
    }
  },
  addShopBtn: function (n) {
    var o = this;
    a.globalData.userInfo
      ? wx.navigateTo({
          url:
            "/pages/mine/admin/admin-home/admin-shop/add-shop/add-shop?type=1&title=" +
            t.data.Str.addShop[this.data.lanIndex],
        })
      : this.user().getUserInfo(n, function (n) {
          n
            ? ((a.globalData.userInfo = n),
              t.setData({ userInfo: n, hasUserInfo: !0 }),
              wx.navigateTo({
                url:
                  "/pages/mine/admin/admin-home/admin-shop/add-shop/add-shop?type=1&title=" +
                  t.data.Str.addShop[o.data.lanIndex],
              }))
            : t.showToast({
                content: t.data.Str.authorzationFail[t.data.lanIndex],
                icon: "shangxinbiaoqing",
                color: "grey",
              });
        });
  },
  onReady: function () {},
  onShow: function () {
    this.loadData();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.loadData();
  },
  onReachBottom: function () {},
});
