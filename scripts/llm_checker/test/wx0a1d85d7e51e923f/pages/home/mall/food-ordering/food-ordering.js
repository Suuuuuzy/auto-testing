var a;
var t,
  o = new (
    (a = require("../../../../service/js/shopUtils.js")) && a.__esModule
      ? a
      : { default: a }
  ).default(),
  e = getApp();
e.BasePage({
  data: { shopsSortIndex: 0, menuSelectIndex: -1 },
  onLoad: function (a) {
    (t = this),
      (this.areaId = a.areaId),
      (this.type = a.type),
      (this.page = 1),
      this.loadData();
  },
  homeMenuClick: function (a) {
    var t = a.currentTarget.dataset.index;
    this.setData({ menuSelectIndex: t }),
      (this.page = 1),
      this.loadShop(),
      console.log("index", t);
  },
  sortClick: function (a) {
    var t = a.currentTarget.dataset.index;
    this.setData({ shopsSortIndex: t }),
      (this.page = 1),
      this.loadShop(),
      e.globalData.location &&
        this.setData({ location: e.globalData.location });
  },
  loadData: function () {
    this.requestWithLoading(
      "shop/foodOrderingPage",
      { areaId: this.areaId },
      function (a) {
        a && (t.setData({ pageData: a }), t.loadShop());
      }
    );
  },
  loadShop: function () {
    console.log("loadShop");
    var a = null;
    if (
      (-1 != this.data.menuSelectIndex &&
        (a = this.data.pageData.foodMenu[this.data.menuSelectIndex].id),
      this.areaId)
    ) {
      console.log("fuck"), (this.data.noMore = !1);
      var n = {
        areaId: this.areaId,
        page: this.page,
        type: this.data.shopsSortIndex,
        menuId: a,
        foodType: this.type,
      };
      if (e.globalData.location) {
        var s = e.globalData.location;
        (n.lat = s.location.lat), (n.lng = s.location.lng);
      }
      this.requestWithLoading("shop/getOrderingShops", n, function (a) {
        if (a) {
          if (
            (a.total == a.to || 0 == a.total
              ? t.setData({ noMore: !0 })
              : t.setData({ noMore: !1 }),
            a.data.length > 0 &&
              (a.data = o.initShops(a.data, t.data.pageData.setting)),
            1 == t.page)
          )
            t.setData({ shopsData: a.data });
          else {
            var e = t.data.shopsData.concat(a.data);
            (a.data = e), t.setData({ shopsData: a.data });
          }
          t.page++;
        }
      });
    }
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
