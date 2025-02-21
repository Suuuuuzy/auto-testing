var a,
  t = require("../../@babel/runtime/helpers/defineProperty"),
  s = getApp();
s.BaseComp({
  properties: {},
  data: {
    swiperList: [
      {
        id: 0,
        type: "image",
        url: "https://yeltapan.oss-cn-zhangjiakou.aliyuncs.com/public/uploads/images/7E4A66DB5AFDDE1203DE6AB5E11935C5.jpg",
      },
      {
        id: 1,
        type: "image",
        url: "https://yeltapan.oss-cn-zhangjiakou.aliyuncs.com/public/uploads/images/WechatIMG3774.jpeg",
      },
    ],
  },
  ready: function () {
    this.initLan(),
      (a = this),
      (this.page = 1),
      s
        ? s.userLogin(function (t) {
            a.loadData();
          })
        : a.loadData();
  },
  methods: t(
    {
      loadData: function () {
        this.requestWithLoading(
          "shop/shopHome",
          { areaId: s.globalData.selectArea.id, page: this.page },
          function (t) {
            if (t) {
              if (
                (t.shops.total == t.shops.to || 0 == t.shops.total
                  ? a.setData({ noMore: !0 })
                  : a.setData({ noMore: !1 }),
                1 == a.page)
              )
                a.setData({ result: t });
              else {
                var s = a.data.result.shops.data.concat(t.shops.data);
                (t.shops.data = s), a.setData({ result: t });
              }
              a.initShopCart(), a.page++, a.initDistance();
            }
          }
        );
      },
      initDistance: function () {
        var t = s.globalData.location;
        if (t) {
          var o = this.data.result;
          if (o && o.shops && o.shops.data.length > 0) {
            for (var e in o.shops.data)
              if (o.shops.data[e].lat > 0 && o.shops.data[e].lng > 0) {
                var i = parseInt(
                    this.location().getDistance(
                      o.shops.data[e].lat,
                      o.shops.data[e].lng,
                      t.location.lat,
                      t.location.lng
                    )
                  ),
                  n = i;
                i && (i = parseFloat(i / 1e3).toFixed(2) + "Km"),
                  (o.shops.data[e].distance = i),
                  (o.shops.data[e]._distance = n);
              } else
                (o.shops.data[e].distance = -1),
                  (o.shops.data[e]._distance = 1e4);
            a.setData({ result: o });
          }
        }
      },
      initShopCart: function () {
        a || (a = this);
        var t = this.data.result;
        t &&
          t.shops &&
          t.shops.data.length > 0 &&
          (t.shops.data.forEach(function (s) {
            var o = a.cart().getShopGoodsCount(s.id);
            (s.cartGoodCount = o),
              t.setting && t.setting.has_cash_cart
                ? (s.coupon_percent = t.setting.cash_cart_percent)
                : (s.coupon_percent = Math.round(s.takeaway_percent / 3)),
              0 == s.zan_count && 0 == s.zan_count
                ? (s.stars = 5)
                : (s.stars = (
                    (s.zan_count / (s.zan_count + s.cha_count)) *
                    5
                  ).toFixed(1));
          }),
          a.setData({ result: a.data.result })),
          console.log("result ---\x3e>", this.data.result);
      },
      shopMenuClick: function (t) {
        var s = t.currentTarget.dataset.item;
        wx.navigateTo({
          url:
            "/pages/home/shop/shop-list/shop-list?catId=" +
            s.id +
            "&title=" +
            a.data.Str.nearbyShops[a.data.lanIndex],
        });
      },
      swiperItemClick: function (a) {
        var t = a.currentTarget.dataset.item;
        if (t && t.shops.length > 0) {
          var s = this.data.isUy ? t.shops[0].uy_name : t.shops[0].ch_name;
          wx.navigateTo({
            url:
              "/pages/home/shop/shop-detail/shop-detail?shopId=" +
              t.shops[0].id +
              "&title=" +
              s,
          });
        }
      },
      dasihanClick: function (a) {
        wx.navigateToMiniProgram({ appId: "wx1d6022883331d4ac" });
      },
      onShow: function () {
        this.initShopCart(), console.log("shopHome onShow");
      },
      loadMore: function () {
        this.data.noMore || this.loadData();
      },
      errorRefresh: function () {
        a || (a = this),
          s.userLogin(function (t) {
            a.refresh();
          });
      },
      refresh: function () {
        (this.page = 1), this.loadData();
      },
    },
    "dasihanClick",
    function (a) {
      wx.navigateToMiniProgram({ appId: "wx1d6022883331d4ac" });
    }
  ),
});
