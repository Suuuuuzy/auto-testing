var a;
var t,
  o = new (
    (a = require("../../../../../service/js/shopUtils.js")) && a.__esModule
      ? a
      : { default: a }
  ).default(),
  e = getApp();
e.BasePage({
  data: { TabCur: 0, shopsSortIndex: 0, menuTabHeight: 100 },
  onLoad: function (a) {
    (t = this),
      (this.areaId = a.areaId),
      (this.catId = a.catId),
      console.log("location --\x3e", e.globalData.locationData),
      (this.page = 1),
      this.loadData();
  },
  sortClick: function (a) {
    var t = a.currentTarget.dataset.index;
    this.setData({ shopsSortIndex: t }),
      (this.page = 1),
      this.loadShop(),
      e.globalData.locationData &&
        this.setData({ location: e.globalData.locationData });
  },
  loadData: function () {
    this.requestWithLoading(
      "group/groupShopListPage",
      { areaId: this.areaId, catId: this.catId },
      function (a) {
        if (a) {
          if (a.menu && t.catId)
            for (var o in (a.menu.unshift({
              id: 0,
              uy_name: "ھەممە",
              ch_name: "全部",
            }),
            a.menu));
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
          (t.setData({ menuTabHeight: e.px2rpx(a[0].height) }),
          console.log("width --\x3e>", t.data.menuTabHeight)),
          console.log("res --\x3e>", a);
      });
  },
  loadShop: function (a) {
    console.log("loadShop"), console.log("fuck"), (this.data.noMore = !1);
    var n = {
      areaId: this.areaId,
      page: this.page,
      type: this.data.shopsSortIndex,
      menuId: this.catId,
      foodType: this.type,
    };
    if (e.globalData.locationData) {
      var i = e.globalData.locationData;
      (n.lat = i.location.lat), (n.lng = i.location.lng);
    }
    this.requestWithLoading("group/getGroupShopList", n, function (e) {
      if (e) {
        if (
          (e.total == e.to || 0 == e.total
            ? t.setData({ noMore: !0 })
            : t.setData({ noMore: !1 }),
          e.data.length > 0 && (e.data = o.initShops(e.data)),
          1 == t.page)
        )
          t.setData({ shopsData: e.data });
        else {
          var n = t.data.shopsData.concat(e.data);
          (e.data = n), t.setData({ shopsData: e.data });
        }
        return t.page++, "function" == typeof a && a();
      }
    });
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
  onPullDownRefresh: function () {
    (this.page = 1), this.loadShop();
  },
  onReachBottom: function () {
    this.data.noMore || this.loadShop();
  },
  onShareAppMessage: function () {},
});
