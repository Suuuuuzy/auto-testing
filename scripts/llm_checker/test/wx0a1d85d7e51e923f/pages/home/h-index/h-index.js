var a,
  t,
  e = getApp();
e.BaseComp({
  properties: {},
  data: {
    tabInfo: [
      {
        uy_name: "ئورۇن  زاكاس قىلىش",
        ch_name: "预订座位",
        icon: "peisong1",
        flag: "seat",
        img_url:
          "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/icons/home/home_menu_3.png",
        id: 0,
      },
      {
        uy_name: "تاماق زاكاس قىلىش",
        ch_name: "预订饮食",
        icon: "goumai",
        flag: "takeOrder",
        img_url:
          "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/icons/home/home_menu_2.png",
        id: 1,
      },
      {
        uy_name: "سىكانىرلاپ تاماق بۇيرۇش",
        ch_name: "扫描订餐",
        icon: "goumai",
        flag: "scan",
        img_url:
          "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/icons/home/home_menu_1.png",
        id: 2,
      },
    ],
    updateLoading: !1,
    isAllLoaded: !1,
    goodScrollHeight: 0,
    showWaterfall01: !0,
    isShowAll: !1,
    shopsSortType: [
      { id: 0, uy_name: "تەۋسىيە", ch_name: "推荐" },
      { id: 1, uy_name: "يېقىن", ch_name: "距离" },
      { id: 2, uy_name: "ئاۋات", ch_name: "销量" },
    ],
    shopsSortIndex: 0,
    notService: !1,
    mHeight: 100,
    foodMenuSelectIndex: 0,
    searchStrs: [],
    searchStrsContent: [],
    searchStrIndex: 0,
    searchStrColors: ["#a5673f", "#35ba69", "#E15F6D"],
    scrollTop: 0,
    tabHeight: 100,
    scrollHeightDifference: 150,
    showTopSearch: !1,
    showTopMenu: !1,
    foodMenuTop: 0,
    qqMapLocation: null,
    searchContainer: null,
    searchTop: 85,
  },
  ready: function () {
    this.initLan();
  },
  attached: function () {
    var t = this;
    if (((a = this), this.initLan(), e.globalData.homeData)) {
      var o = e.globalData.homeData;
      (this.data.pageData = o.pageData), this.setData(o), (this.page = o.page);
    } else
      this.initLan(),
        (this.waterfall01 = this.selectComponent("#waterfall01")),
        this.waterfall && this.waterfall.resetParam(),
        (this.page = 1),
        this.initSearchStrs(),
        a.initLocation(!1);
    this.startCount(),
      this.setData({
        searchContainer: function () {
          return t.createSelectorQuery().select(".container");
        },
      }),
      e.globalData.CustomBar &&
        this.setData({ searchTop: e.globalData.CustomBar });
  },
  detached: function () {
    (e.globalData.homeData = this.data),
      (this.data.page = this.page),
      this.clearCount();
  },
  methods: {
    bindscroll: function (a) {
      var t = 0;
      a.detail &&
        ((t = e.px2rpx(a.detail.scrollTop)), this.setData({ scrollTop: t })),
        t > 95 &&
          (this.data.showTopSearch ||
            (this.setData({ showTopSearch: !0 }), this.queryTopView())),
        t <= 95 &&
          this.data.showTopSearch &&
          (this.setData({ showTopSearch: !1 }), this.queryTopView());
    },
    initSearchStrs: function () {
      var a = this,
        t = [],
        e = [];
      t.push({
        title: this.data.Str.inputSearchShop[this.data.lanIndex],
        color: "#666",
      }),
        e.push(this.data.Str.inputSearchShop[this.data.lanIndex]),
        this.data.pageData &&
          this.data.pageData.shops &&
          this.data.pageData.shops.forEach(function (o) {
            var n = Math.floor(Math.random() * a.data.searchStrColors.length);
            t.push({
              title: a.data.isUy ? o.uy_name : o.ch_name,
              color: a.data.searchStrColors[n],
            }),
              e.push(a.data.isUy ? o.uy_name : o.ch_name);
          }),
        this.setData({ searchStrs: t, searchStrsContent: e });
    },
    initLocation: function (t) {
      var o = !1;
      t && 1 == t.isHide && (o = !0),
        a || (a = this),
        o || this.setData({ isLoading: !0 }),
        e.globalData.location
          ? (a.setData({ location: e.globalData.location }), a.loadData(o))
          : this.location().location(function (t) {
              console.log("location --\x3e>", t),
                t &&
                  ((e.globalData.wxLocation = t),
                  -1 == t
                    ? a.location().getAreaItem() ||
                      ((e.globalData.locationDenied = !0),
                      a.setData({ notLocation: !0 }))
                    : ((t.location = a.location().getLocationInfo()),
                      (e.globalData.location = t),
                      a.setData({ location: t }))),
                a.loadData(o);
            });
    },
    swiperItemClick: function (a) {
      var t = a.currentTarget.dataset.item;
      t.appId
        ? wx.navigateToMiniProgram({ appId: t.appId, path: t.link_url })
        : t && t.link_url && wx.navigateTo({ url: t.link_url });
    },
    goSelectAreaPage: function (a) {
      wx.navigateTo({
        url:
          "../common-page/select-area/select-area?title=" +
          this.data.Str.selectArea[this.data.lanIndex],
      });
    },
    shopTypeClick: function (a) {
      var t = a.currentTarget.dataset.item;
      if (t) {
        var e = this.data.isUy ? t.uy_name : t.ch_name;
        wx.navigateTo({
          url:
            "/pages/home/shop/shop-list/shop-list?typeId=" +
            t.id +
            "&title=" +
            e,
        });
      }
    },
    sortClick: function (a) {
      var t = a.currentTarget.dataset.index;
      this.setData({
        shopsSortIndex: t,
        mainCur: "sort",
        foodMenuSelectIndex: 0,
        foodMenuScrollLeft: 0,
      }),
        (this.page = 1),
        this.loadShop();
    },
    loadData: function (t) {
      var o = this;
      if (!o.data.isLoadingData) {
        o.data.isLoadingData = !0;
        var n = 0,
          i = 0;
        e.globalData.homeFirstOpen
          ? o.data.location && o.data.location.addressComponent
            ? ((n = o.data.location.addressComponent.adcode),
              (i = o.data.location.addressComponent.towncode))
            : o.location() &&
              o.location().getAreaItem() &&
              o.location().getAreaItem().can_location &&
              ((n = o.location().getAreaItem().ad_code),
              (i = o.location().getAreaItem().town_code))
          : o.location() &&
            o.location().getAreaItem() &&
            o.location().getAreaItem().can_location
          ? ((n = o.location().getAreaItem().ad_code),
            (i = o.location().getAreaItem().town_code))
          : o.data.location &&
            o.data.location.addressComponent &&
            (console.log("comp ---\x3e>>", o.data.location.addressComponent),
            (n = o.data.location.addressComponent.adcode),
            (i = o.data.location.addressComponent.towncode));
        var s = { adCode: n, townCode: i };
        o.requestWithLoading("common/__homePage", s, function (n) {
          setTimeout(function () {
            o.setData({ isLoadingData: !1 });
          }, 300),
            n &&
              (n.foodMenu &&
                n.foodMenu.unshift({
                  id: 0,
                  uy_name: "ھەممە",
                  ch_name: "全部",
                  icon: "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/icons/shop-type/foods3/5.png",
                }),
              o.setData({ pageData: n, isShowAll: n.isShow }),
              e.globalData.showAdvert ||
                (n.wAdvert &&
                  n.wAdvert.show_advert &&
                  (a.setData({ modalName: "showAdvert" }),
                  (e.globalData.showAdvert = !0))),
              n.locationArea &&
                ((n.locationArea.can_location && n.locationArea.is_checked) ||
                  a.setData({ notService: !0 })),
              n.shops &&
                ((n.shops = o.initShops(n.shops)),
                o.setData({ pageData: n, isShowAll: n.isShow }),
                o.initSearchStrs()),
              (e.globalData.homeFirstOpen = !1),
              n.locationArea &&
                ((e.globalData.selectArea = n.locationArea),
                o.setData({ selectArea: n.locationArea }),
                n.locationArea.can_location &&
                  o.location().setAreaItem(n.locationArea),
                t ||
                  ((a.page = 1),
                  o.data.isShowAll ? a.loadShop() : a.loadGoods())),
              o.onLoadCall(n),
              a.queryTopView(),
              a.getWetherData());
        });
      }
    },
    loadShop: function () {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      if (this.data.selectArea) {
        this.data.noMore = !1;
        var e = 0;
        this.data.pageData &&
          this.data.pageData.foodMenu &&
          (e = this.data.pageData.foodMenu[this.data.foodMenuSelectIndex].id);
        var o = {
          areaId: this.data.selectArea ? this.data.selectArea.id : null,
          page: this.page,
          type: this.data.shopsSortIndex,
          catId: e,
        };
        this.data.location &&
          ((o.lat = this.data.location.location.lat),
          (o.lng = this.data.location.location.lng)),
          this.requestWithLoading("common/getHomeShops", o, function (e) {
            if (e) {
              if (
                (e.total == e.to || 0 == e.total
                  ? a.setData({ noMore: !0 })
                  : a.setData({ noMore: !1 }),
                e.data.length > 0 && (e.data = a.initShops(e.data)),
                1 == a.page)
              )
                a.setData({ shopsData: e.data });
              else {
                var o = a.data.shopsData.concat(e.data);
                (e.data = o), a.setData({ shopsData: e.data });
              }
              t && t(), a.page++;
            }
          });
      }
      this.setData({ mHeight: 120 });
    },
    initShops: function (t) {
      if (t && t.length > 0) {
        var o = this.data.pageData.setting.has_cash_cart,
          n = this.data.pageData.setting.cash_cart_percent;
        for (var i in t) {
          var s = e.globalData.location;
          s && (t[i] = this.location().initShopDistance(t[i], s)),
            (t[i].delivery_fee = parseFloat(t[i].delivery_fee)),
            (t[i].starting_price = parseFloat(t[i].starting_price)),
            t[i].activity_delivery_fee &&
              t[i].activity_delivery_fee.length > 0 &&
              (t[i].activity_delivery_fee[0].activity_delivery_fee = parseFloat(
                t[i].activity_delivery_fee[0].activity_delivery_fee
              ));
          var r = a.cart().getShopGoodsCount(t[i].id);
          if (((t[i].cartGoodCount = r), t[i].created_at))
            a.tools().dateDifference(t[i].created_at) < 30 &&
              (t[i].is_new = !0);
          (t[i].coupon_percent = o ? n : Math.round(t[i].takeaway_percent / 3)),
            0 == t[i].zan_count && 0 == t[i].zan_count
              ? (t[i].stars = 5)
              : (t[i].stars = (
                  (t[i].zan_count / (t[i].zan_count + t[i].cha_count)) *
                  5
                ).toFixed(1));
        }
      }
      return t;
    },
    homeMenuClick: function (a) {
      var t = a.currentTarget.dataset.item,
        e = 0;
      this.data.selectArea && (e = this.data.selectArea.id),
        console.log("item -=->", t);
      var o = t.ch_name;
      if (
        (t &&
          1 == t.id &&
          wx.navigateToMiniProgram({
            appId: "wx8beb5d54926e53e5",
            path: "pages/tool-index/tool-index?shareToken=8050ea8545df29118a59ea865d36b578",
          }),
        "跑腿服务" != o)
      ) {
        if ("优惠超市" == o)
          return this.data.pageData.marketShop
            ? void wx.navigateTo({
                url:
                  "/pages/home/mall/supermarket/super-market_/super-market_?shopId=" +
                  this.data.pageData.marketShop.id,
              })
            : void this.showToast({
                content: this.data.Str.inDevelopment[this.data.lanIndex],
              });
        if ("菜市场" == o)
          return this.data.pageData.vegetableShop
            ? void wx.navigateTo({
                url:
                  "/pages/home/mall/supermarket/supermarket-home?shopId=" +
                  this.data.pageData.vegetableShop.id,
              })
            : void this.showToast({
                content: this.data.Str.inDevelopment[this.data.lanIndex],
              });
        this.data.isUy && (o = t.uy_name),
          t && t.link_url
            ? wx.navigateTo({
                url:
                  t.link_url + "?areaId=" + e + "&title=" + o + "&type=" + t.id,
              })
            : this.showToast({
                content: this.data.Str.inDevelopment[this.data.lanIndex],
              });
      } else wx.navigateTo({ url: "/pkgErrand/pages/errand-home/errand-home" });
    },
    subMenuClick: function (a) {
      var t = a.currentTarget.dataset.url;
      console.log("url --\x3e>", t), t && wx.navigateTo({ url: t });
    },
    queryTopView: function () {
      var t = wx.createSelectorQuery().in(this);
      t.select("#topView").boundingClientRect(),
        t.select("#foodMenu").boundingClientRect(),
        t.exec(function (t) {
          var o = 0,
            n = 0;
          t &&
            (t[0] && t[0].height && (o = t[0].height),
            t[1] && t[1].top && (n = t[1].top));
          var i = e.globalData.tabbarHeight;
          i && (o += i),
            o > 0 &&
              a.setData({
                scrollHeightDifference: e.px2rpx(o),
                tabHeight: e.px2rpx(i),
              }),
            n > 0 && a.setData({ foodMenuTop: e.px2rpx(n) });
        });
    },
    getWetherData: function () {
      var t = e.globalData.location;
      t &&
        t.addressComponent &&
        this.requestNotLoading(
          "common/getAreaWeather",
          { areaName: t.addressComponent.district },
          function (t) {
            t && (a.setData({ weatherData: t }), a.onWeatheLoadCall(t));
          },
          1
        );
    },
    loadGoods: function () {
      this.data.selectArea &&
        ((this.data.noMore = !1),
        this.requestWithLoading(
          "common/getHomeGoods",
          {
            areaId: this.data.selectArea ? this.data.selectArea.id : null,
            page: this.page,
          },
          function (t) {
            if (t) {
              if (
                (t.total == t.to || 0 == t.total
                  ? a.setData({ noMore: !0 })
                  : a.setData({ noMore: !1 }),
                1 == a.page)
              )
                a.setData({ goodsData: t });
              else {
                var e = a.data.goodsData.data.concat(t.data);
                (t.data = e), a.setData({ goodsData: t });
              }
              a.page++;
            }
          }
        ));
    },
    topTabClick: function (t) {
      var e = t.currentTarget.dataset.item,
        o = e.flag;
      e &&
        ("takeOrder" == o
          ? a.triggerEvent("takeOrder", e)
          : "scan" == o
          ? a.scanBtn()
          : "seat" == o &&
            this.showToast({
              content: this.data.Str.inDevelopment[this.data.lanIndex],
            }));
    },
    wAdvertClick: function (a) {
      wx.navigateTo({ url: this.data.pageData.wAdvert.link_url });
    },
    checkService: function () {
      return (
        a || (a = this),
        this.data.notLocation
          ? (this.showToast({
              content: a.data.Str.notLocation[a.data.lanIndex],
              icon: "shangxinbiaoqing",
              color: "grey",
            }),
            !1)
          : this.data.pageData &&
            this.data.pageData.locationArea &&
            !this.data.pageData.locationArea.can_location
          ? (this.showToast({
              content: a.data.Str.cantService[a.data.lanIndex],
              icon: "shangxinbiaoqing",
              color: "grey",
            }),
            !1)
          : this.data.pageData &&
            this.data.pageData.locationArea &&
            this.data.pageData.setting &&
            !this.data.pageData.setting.is_open
          ? (this.showToast({
              content: a.data.Str.notService[a.data.lanIndex],
              icon: "shangxinbiaoqing",
              color: "grey",
            }),
            !1)
          : !!(
              this.data.pageData &&
              this.data.pageData.locationArea &&
              this.data.pageData.setting &&
              this.data.pageData.setting.is_open
            ) ||
            (this.showToast({
              content: a.data.Str.opratingError[a.data.lanIndex],
              icon: "shangxinbiaoqing",
              color: "grey",
            }),
            !1)
      );
    },
    hasCertification: function (a) {
      var t = this;
      this.requestWithLoading("user/hasCertification", {}, function (e) {
        e && -1 == e
          ? (wx.navigateTo({
              url:
                "/pages/common-page/login-page/login-page?title=" +
                t.data.Str.login[t.data.lanIndex],
            }),
            a(!1))
          : a(!(!e || 1 != e));
      });
    },
    callPhone: function (a) {
      var t = a.currentTarget.dataset.phone;
      t && wx.makePhoneCall({ phoneNumber: t });
    },
    hideModal: function () {
      this.setData({ modalName: "" });
    },
    foodMenuClick: function (a) {
      var t = a.currentTarget.dataset.index;
      this.setData({
        foodMenuSelectIndex: t,
        foodMenuScrollLeft: 100 * (t - 1),
      }),
        this.data.showTopSearch || this.setData({ mainCur: "sort" }),
        (this.page = 1),
        this.loadShop();
    },
    onShow: function (a) {
      a &&
        1 == a.isComeIndexPage &&
        e.globalData.homeData &&
        this.initLocation({ isHide: 1 });
      var t = this.data.shopsData;
      t && ((t = this.initShops(t)), this.setData({ shopsData: t }));
    },
    startCount: function () {
      var a = this;
      this.clearCount(),
        (t = setInterval(function () {
          a.initSearchStrIndex();
        }, 4e3));
    },
    initSearchStrIndex: function () {
      var a = this.data.searchStrIndex;
      a < this.data.searchStrs.length - 1 ? a++ : (a = 0),
        this.setData({ searchStrIndex: a });
    },
    clearCount: function () {
      clearInterval(t), (t = null);
    },
    _onShow: function () {
      console.log("_onShow");
      e.globalData.location &&
        this.setData({ location: e.globalData.location }),
        e.globalData.selectArea
          ? (this.setData({
              selectArea: e.globalData.selectArea,
              notLocation: !1,
            }),
            console.log("selectArea loadData"),
            this.initLocation())
          : this.location().getAreaItem()
          ? ((e.globalData.selectArea = this.location().getAreaItem()),
            this.setData({
              selectArea: this.location().getAreaItem(),
              notLocation: !1,
            }),
            this.initLocation())
          : this.initLocation(),
        this.weatherData();
    },
    _loadMore: function (t) {
      (console.log("_loadMore --\x3e>", t), this.data.noMore) ||
        this.data.loadingData ||
        (this.data.isShowAll &&
          (this.setData({ loadingData: !0 }),
          a.loadShop(function () {
            a.setData({ loadingData: !1 });
          })));
    },
    loadMore: function () {
      console.log("orderMore --\x3e>", this.data.noMore),
        this.data.noMore ||
          (console.log("ok"),
          this.data.isShowAll ? a.loadShop() : a.loadGoods());
    },
    refresh: function () {
      console.log("refresh");
      this.setData({ showWaterfall01: !1 }), this.initLocation();
    },
    onLoadCall: function (t) {
      a.triggerEvent("homeOnLoadCall", t);
    },
    onWeatheLoadCall: function (t) {
      a.triggerEvent("wetherLoadDataCall", t);
    },
    scanBtn: function (t) {
      wx.scanCode({
        onlyFromCamera: !0,
        success: function (t) {
          t &&
            (console.log("scan res --\x3e>", t),
            "WX_CODE" == t.scanType &&
              (console.log("path ---\x3e>", t.path),
              wx.navigateTo({ url: "/" + t.path })),
            "QR_CODE" == t.scanType &&
              ((e.globalData.scanResult = t.result),
              -1 != t.result.indexOf("scan")
                ? wx.navigateTo({
                    url:
                      "/pages/home/mall/mall-pay-page/coupon-pay-page/coupon-pay-page?p=" +
                      t.result,
                  })
                : wx.navigateTo({
                    url: "/pages/home/mall/mall-home?p=" + t.result,
                  })),
            "CODE_128" == t.scanType && a.searchOrderByOrderNo(t.result));
        },
        fail: function (t) {
          console.log("scan error --\x3e>", t), a.failureToast();
        },
      });
    },
    searchOrderByOrderNo: function (a) {
      this.requestWithLoading(
        "shop/searchOrderByOrderNo",
        { orderNo: a },
        function (a) {
          a &&
            wx.navigateTo({
              url: "/pages/order/order-detail/order-detail?id=" + a.id,
            });
        }
      );
    },
    errorRefresh: function () {
      this.initLocation();
    },
    goodItemClick: function (a) {
      var t = a.currentTarget.dataset.item;
      t &&
        wx.navigateTo({
          url:
            "/pages/home/mall/mall-home?shopId=" +
            t.shop.id +
            "&catId=" +
            t.cat_id +
            "&typeId=" +
            t.type_id +
            "&goodId=" +
            t.id,
        });
    },
    testBtn: function (a) {
      wx.navigateTo({ url: "/pages/home/mall/mall-test/mall-test" });
    },
    smallAdvertClick: function (a) {
      var t = a.currentTarget.dataset.item;
      t &&
        1 == t.type &&
        t.link_url &&
        wx.makePhoneCall({ phoneNumber: t.link_url });
    },
  },
});
