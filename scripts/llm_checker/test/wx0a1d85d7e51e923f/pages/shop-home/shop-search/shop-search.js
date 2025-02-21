var t,
  a = getApp();
a.BasePage({
  data: {
    keywords: [
      { uy_name: "گۈل", ch_name: "花" },
      { uy_name: "تورت", ch_name: "蛋糕" },
      { uy_name: "پوسۇلكا", ch_name: "快递" },
    ],
    keyword: "",
    historySearch: [],
    showKeyword: !0,
  },
  onLoad: function (a) {
    (t = this),
      wx.setNavigationBarTitle({
        title: this.data.Str.search[this.data.lanIndex],
      }),
      this.loadData(),
      this.initHistorySearch();
  },
  loadData: function () {
    var s = a.globalData.selectArea;
    this.requestWithLoading(
      "shop/searchPage",
      { areaId: s ? s.id : null },
      function (a) {
        a && t.setData({ pageData: a });
      }
    );
  },
  initHistorySearch: function () {
    var t = wx.getStorageSync("m_search_key");
    t && this.setData({ historySearch: t });
  },
  setHistorySearch: function () {
    this.data.historySearch &&
      wx.setStorageSync("m_search_key", this.data.historySearch);
  },
  deleteHistoryBtn: function (t) {
    this.setData({ historySearch: [] }),
      this.setHistorySearch(),
      this.initHistorySearch();
  },
  inputSearch: function (t) {
    this.setData({ keyword: t.detail.value });
  },
  inputFocus: function (t) {
    console.log("bindFocus --\x3e>"), this.setData({ showKeyword: !0 });
  },
  keywordClick: function (a) {
    var s = a.currentTarget.dataset.title;
    s && (t.setData({ keyword: s }), this.bindConfirm());
  },
  bindConfirm: function (s) {
    var o = this,
      e = a.globalData.selectArea;
    if (this.data.keyword.length > 0 && e) {
      var n = this.data.historySearch,
        i = !1;
      n.forEach(function (t) {
        t == o.data.keyword && (i = !0);
      }),
        i || n.push(this.data.keyword),
        this.setData({ historySearch: n }),
        this.setHistorySearch();
      var r = { areaId: e.id, keyword: this.data.keyword };
      this.requestWithLoading("shop/searchShopWithKeyword", r, function (a) {
        a &&
          (t.setData({ result: a, showKeyword: !1 }),
          t.initDistance(),
          t.initShopCart());
      });
    }
  },
  initDistance: function () {
    var s = a.globalData.location;
    if (s) {
      var o = this.data.result;
      if (o && o.shops && o.shops.data.length > 0) {
        for (var e in o.shops.data)
          if (o.shops.data[e].lat > 0 && o.shops.data[e].lng > 0) {
            var n = parseInt(
                this.location.getDistance(
                  o.shops.data[e].lat,
                  o.shops.data[e].lng,
                  s.location.lat,
                  s.location.lng
                )
              ),
              i = n;
            n && (n = parseFloat(n / 1e3).toFixed(2) + "Km"),
              (o.shops.data[e].distance = n),
              (o.shops.data[e]._distance = i);
          } else
            (o.shops.data[e].distance = -1), (o.shops.data[e]._distance = 1e4);
        o.shops.data.sort(function (t, a) {
          return t._distance - a._distance;
        }),
          t.setData({ result: o });
      }
    }
  },
  initShopCart: function () {
    t || (t = this);
    var a = this.data.result;
    a &&
      a.shops &&
      a.shops.data.length > 0 &&
      (a.shops.data.forEach(function (a) {
        var s = t.cart.getShopGoodsCount(a.id);
        (a.cartGoodCount = s),
          (a.coupon_percent = Math.round(a.takeaway_percent / 3)),
          0 == a.zan_count && 0 == a.zan_count
            ? (a.stars = 5)
            : (a.stars = (
                (a.zan_count / (a.zan_count + a.cha_count)) *
                5
              ).toFixed(1));
      }),
      t.setData({ result: t.data.result })),
      console.log("result ---\x3e>", this.data.result);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
