var t,
  a = getApp();
a.BasePage({
  data: {
    noMore: !1,
    catSelectIndex: -1,
    navUrl: "/pages/home/mall/mall-home",
  },
  onLoad: function (a) {
    (t = this),
      (this.catId = a.catId),
      (this.typeId = a.typeId),
      (this.page = 1),
      this.loadData();
  },
  loadData: function () {
    var e = this;
    this.requestWithLoading(
      this.typeId ? "shop/shopTypeListHome" : "shop/shopListHome",
      {
        page: this.page,
        areaId: a.globalData.selectArea.id,
        catId: this.catId,
        typeId: this.typeId,
      },
      function (a) {
        if (a) {
          if (
            (a.shops.total == a.shops.to || 0 == a.shops.total
              ? t.setData({ noMore: !0 })
              : t.setData({ noMore: !1 }),
            a.cat)
          )
            for (var s in (a.cat.unshift({
              id: 0,
              uy_name: "ھەممىسى",
              ch_name: "全部",
            }),
            a.cat))
              if ((console.log("cat --\x3e"), a.cat[s].id == t.catId)) {
                t.setData({ catSelectIndex: s }),
                  console.log("catIndex --\x3e>" + s);
                break;
              }
          if (1 == t.page) t.setData({ result: a });
          else {
            var o = t.data.result.shops.data.concat(a.shops.data);
            (a.shops.data = o), t.setData({ result: a });
          }
          t.initShopCart(), t.page++, e.initDistance();
        }
      }
    );
  },
  initDistance: function () {
    var e = a.globalData.location;
    if (e) {
      var s = this.data.result;
      if (s && s.shops && s.shops.data.length > 0) {
        for (var o in s.shops.data)
          if (s.shops.data[o].lat > 0 && s.shops.data[o].lng > 0) {
            var n = parseInt(
                this.location.getDistance(
                  s.shops.data[o].lat,
                  s.shops.data[o].lng,
                  e.location.lat,
                  e.location.lng
                )
              ),
              i = n;
            n && (n = parseFloat(n / 1e3).toFixed(2) + "Km"),
              (s.shops.data[o].distance = n),
              (s.shops.data[o]._distance = i);
          } else
            (s.shops.data[o].distance = -1), (s.shops.data[o]._distance = 1e4);
        t.setData({ result: s });
      }
    }
  },
  initShopCart: function () {
    t || (t = this);
    var a = this.data.result;
    a &&
      a.shops &&
      a.shops.data.length > 0 &&
      (a.shops.data.forEach(function (e) {
        var s = t.cart.getShopGoodsCount(e.id);
        (e.cartGoodCount = s),
          a.setting && a.setting.has_cash_cart
            ? (e.coupon_percent = a.setting.cash_cart_percent)
            : (e.coupon_percent = Math.round(e.takeaway_percent / 3)),
          0 == e.zan_count && 0 == e.zan_count
            ? (e.stars = 5)
            : (e.stars = (
                (e.zan_count / (e.zan_count + e.cha_count)) *
                5
              ).toFixed(1));
      }),
      t.setData({ result: t.data.result })),
      console.log("result ---\x3e>", this.data.result);
  },
  selectCatClick: function () {
    var t = this.data.result.cat;
    for (var a in t) a == this.data.catSelectIndex && (t[a].checked = !0);
    (this.data.result.cat = t),
      this.setData({ selectData: t, modalName: "selectModal", selectIndex: 3 });
  },
  selectChange: function (t) {
    this.setData({ catSelectIndex: t.detail.value, modalName: "" }),
      (this.catId = this.data.result.cat[t.detail.value].id),
      (this.page = 1),
      this.loadData();
  },
  hideModal: function () {
    this.setData({ modalName: "" });
  },
  onReady: function () {},
  onShow: function () {
    t.initShopCart();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    (t.page = 1), t.loadData();
  },
  onReachBottom: function () {
    this.data.noMore || this.loadData();
  },
  onShareAppMessage: function () {},
});
