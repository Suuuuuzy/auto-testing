var a;
var t,
  e = new (
    (a = require("../../../../service/js/shopUtils.js")) && a.__esModule
      ? a
      : { default: a }
  ).default(),
  o = getApp();
o.BasePage({
  data: { TabCur: 0, shopsSortIndex: 0, menuTabHeight: 100 },
  onLoad: function (a) {
    (t = this),
      (this.areaId = a.areaId),
      (this.catId = a.catId),
      (this.page = 1),
      this.loadData();
  },
  sortClick: function (a) {
    var t = a.currentTarget.dataset.index;
    this.setData({ shopsSortIndex: t }),
      (this.page = 1),
      this.loadShop(),
      o.globalData.location &&
        this.setData({ location: o.globalData.location });
  },
  loadData: function () {
    this.requestWithLoading(
      "shop/shopListPage",
      { areaId: this.areaId, catId: this.catId },
      function (a) {
        if (a) {
          if (a.menu && t.catId)
            for (var e in a.menu)
              a.menu[e].id == t.catId && t.setData({ TabCur: e });
          t.setData({ pageData: a }),
            console.log("pageData --\x3e>", a),
            (t.page = 1),
            t.loadShop(),
            setTimeout(function () {
              console.log("ok"), t.queryView();
            }, 200);
        }
      }
    );
  },
  tabSelect: function (a) {
    var t = 80 * (a.currentTarget.dataset.id - 1);
    this.data.isUy && (t = 80 * this.data.pageData.menu.length - t),
      this.setData({ TabCur: a.currentTarget.dataset.id, scrollLeft: t }),
      this.data.pageData &&
        (this.catId = this.data.pageData.menu[a.currentTarget.dataset.id].id),
      (this.page = 1),
      this.loadShop();
  },
  queryView: function () {
    var a = wx.createSelectorQuery().in(this);
    a.select("#menuTab").boundingClientRect(),
      a.exec(function (a) {
        a &&
          a[0] &&
          (t.setData({ menuTabHeight: o.px2rpx(a[0].height) }),
          console.log("width --\x3e>", t.data.menuTabHeight)),
          console.log("res --\x3e>", a);
      });
  },
  loadShop: function (a) {
    if ((console.log("loadShop"), this.areaId)) {
      console.log("fuck"), (this.data.noMore = !1);
      var n = {
        areaId: this.areaId,
        page: this.page,
        type: this.data.shopsSortIndex,
        menuId: this.catId,
        foodType: this.type,
      };
      if (o.globalData.location) {
        var i = o.globalData.location;
        (n.lat = i.location.lat), (n.lng = i.location.lng);
      }
      this.requestWithLoading("shop/getOrderingShops", n, function (o) {
        if (o) {
          if (
            (o.total == o.to || 0 == o.total
              ? t.setData({ noMore: !0 })
              : t.setData({ noMore: !1 }),
            o.data.length > 0 &&
              (o.data = e.initShops(o.data, t.data.pageData.setting)),
            1 == t.page)
          )
            t.setData({ shopsData: o.data });
          else {
            var n = t.data.shopsData.concat(o.data);
            (o.data = n), t.setData({ shopsData: o.data });
          }
          return t.page++, "function" == typeof a && a();
        }
      });
    }
  },
  loadMore: function (a) {
    (console.log("_loadMore --\x3e>", a), this.data.noMore) ||
      this.data.loadingData ||
      (this.setData({ loadingData: !0 }),
      t.loadShop(function () {
        t.setData({ loadingData: !1 });
      }));
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.data.noMore || this.loadShop();
  },
  onShareAppMessage: function () {},
});
