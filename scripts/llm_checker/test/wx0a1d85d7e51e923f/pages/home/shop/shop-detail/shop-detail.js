var t,
  a =
    (t = require("../../../../service/js/shopBusAnimation.js")) && t.__esModule
      ? t
      : { default: t };
var i,
  s,
  e = getApp(),
  o = new a.default();
e.BasePage({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: !0,
    cartList: {
      shop: null,
      allCount: 0,
      allPrice: 0,
      totalPrice: 0,
      deliveryFee: 0,
      canOrder: !1,
      cartItems: [],
    },
    hideCurveGood: !0,
    shopIsOpened: !1,
  },
  onLoad: function (t) {
    var a = this;
    (i = this), (this.shopId = t.shopId);
    t.lan;
    if (
      ((this.busPos = {}),
      (this.busPos.x = 0.8 * e.globalData.wWidth),
      (this.busPos.y = 0.9 * e.globalData.wHeight),
      t.scene)
    ) {
      var s = decodeURIComponent(t.scene);
      (this.shopId = s.split("&")[0]), s.split("&")[1];
    }
    (this.data.cartList.shopId = this.shopId),
      e.userLogin(function (t) {
        a.startCount(), a.loadData();
      });
  },
  loadData: function () {
    this.requestWithLoading(
      "shop/shopDetailPage",
      { shopId: this.shopId },
      function (t) {
        if (t) {
          if (
            (i.setData({ pageData: t }),
            t.shop &&
              ((i.data.cartList.shop = t.shop),
              (i.data.cartList.deliveryFee = t.shop.delivery_fee),
              i.setData({ cartList: i.data.cartList }),
              t.setting))
          )
            if (t.setting.is_open && t.shop.is_open) {
              i.setData({ shopIsOpened: !0 });
              var a = wx.getStorageSync("m_shop_" + t.shop.id);
              a && (i.data.cartList.cartItems = a);
            } else i.setData({ modalName: "shopClosed" });
          if (t.shop.menu) {
            var s = t.shop.menu;
            if (s) {
              var e = i.data.cartList.cartItems;
              for (var o in e)
                s.length > e[o].index &&
                  s[e[o].index].goods.length > e[o].indexx &&
                  s[e[o].index].goods[e[o].indexx].id == e[o].item.id &&
                  ((s[e[o].index].goods[e[o].indexx].count = e[o].count),
                  (s[e[o].index].count =
                    s[e[o].index].count > 0
                      ? s[e[o].index].count + e[o].count
                      : e[o].count));
            }
            for (var n in t.shop.menu) t.shop.menu[n].id = n;
            i.setData({ list: s, listCur: t.shop.menu[0] }),
              i.initCartList(),
              i.initTime();
          }
        }
      }
    );
  },
  tabSelect: function (t) {
    this.setData({
      TabCur: t.currentTarget.dataset.id,
      MainCur: t.currentTarget.dataset.id,
      VerticalNavTop: 50 * (t.currentTarget.dataset.id - 1),
    });
  },
  VerticalMain: function (t) {
    var a = this.data.list,
      i = 0;
    if (this.data.load) {
      for (
        var s = function (t) {
            wx.createSelectorQuery()
              .select("#main-" + a[t].id)
              .fields({ size: !0 }, function (s) {
                console.log("data --\x3e>", s),
                  s &&
                    s.height &&
                    ((p = i), (i += s.height), (a[t].bottom = i));
              })
              .exec();
          },
          e = 0;
        e < a.length;
        e++
      )
        s(e);
      this.setData({ load: !1, list: a });
    }
    for (var o = t.detail.scrollTop + 20, n = 0; n < a.length; n++)
      if (o > a[n].top && o < a[n].bottom)
        return (
          this.setData({ VerticalNavTop: 50 * (a[n].id - 1), TabCur: a[n].id }),
          !1
        );
  },
  startCount: function () {
    s = setInterval(function () {
      i.initTime();
    }, 2e3);
  },
  clearCount: function () {
    clearInterval(s), (s = null);
  },
  initTime: function () {
    if (this.data.list) {
      var t = this.data.list;
      for (var a in t)
        for (var s in t[a].goods)
          t[a].goods[s].activity_price > 0 &&
            t[a].goods[s].activity_start_time &&
            t[a].goods[s].activity_end_time &&
            ((t[a].goods[s].time1 = this.tool.getSecond(
              t[a].goods[s].activity_start_time,
              null,
              !0
            )),
            (t[a].goods[s].time2 = this.tool.getSecond(
              t[a].goods[s].activity_end_time,
              null,
              !0
            )),
            t[a].goods[s].time1 < 0 &&
              t[a].goods[s].time2 > 0 &&
              (t[a].goods[s].time = this.tool.formatSeconds(
                t[a].goods[s].time2
              )));
      i.setData({ list: t });
    }
  },
  viewImg: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.previewImage({ urls: [a] });
  },
  _addBtn: function (t) {
    if (
      (console.log("_addBtn --\x3e>", t),
      console.log("bus --\x3e>", i.busPos),
      this.data.hideCurveGood)
    ) {
      var a = t.currentTarget.dataset.icon;
      console.log("icon --\x3e>", a),
        a && i.setData({ pointIcon: a }),
        (this.finger = {});
      var s = {};
      (this.finger.x = t.touches[0].clientX - 250),
        (this.finger.y = t.touches[0].clientY - 50),
        this.finger.y < this.busPos.y
          ? (s.y = this.finger.y - 150)
          : (s.y = this.busPos.y - 150),
        (s.x = Math.abs(this.finger.x - this.busPos.x) / 2 + this.finger.x),
        (this.linePos = o.bessel([this.finger, s, this.busPos], 30)),
        this.startAnimation(t);
    }
  },
  startAnimation: function (t) {
    var a = 0,
      s = this,
      e = s.linePos.bezier_points;
    this.setData({ hideCurveGood: !1, bus_x: s.finger.x, bus_y: s.finger.y }),
      (this.timer = setInterval(function () {
        a++,
          s.setData({ bus_x: e[a].x, bus_y: e[a].y }),
          a >= 28 &&
            (clearInterval(s.timer),
            s.setData({ hideCurveGood: !0, hideCount: !1 }),
            i.addBtn(t));
      }, 23));
  },
  addBtn: function (t) {
    console.log(t);
    var a = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.indexx;
    this.data.list[a].goods[i].count
      ? this.data.list[a].goods[i].count++
      : (this.data.list[a].goods[i].count = 1),
      this.data.list[a].count
        ? this.data.list[a].count++
        : (this.data.list[a].count = 1),
      this.initCartList(a, i, 1),
      this.setData({ list: this.data.list });
  },
  removeBtn: function (t) {
    var a = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.indexx;
    this.data.list[a].goods[i].count >= 1 && this.data.list[a].goods[i].count--,
      this.data.list[a].count >= 1 && this.data.list[a].count--,
      this.initCartList(a, i, 0),
      this.setData({ list: this.data.list });
  },
  inputPhone: function (t) {
    var a = t.currentTarget.dataset.index,
      s = t.currentTarget.dataset.indexx;
    (i.data.list[a].goods[s].phone = t.detail.value),
      i.setData({ list: i.data.list });
  },
  inputPickupNumber: function (t) {
    var a = t.currentTarget.dataset.index,
      s = t.currentTarget.dataset.indexx;
    (i.data.list[a].goods[s].pickup_number = t.detail.value),
      i.setData({ list: i.data.list });
  },
  initCartList: function (t, a, i) {
    var s = 0,
      e = 0,
      o = !1,
      n = this.data.cartList.cartItems;
    for (var d in n)
      n[d].index == t &&
        n[d].indexx == a &&
        ((o = !0),
        1 == i
          ? n[d].count++
          : 1 == n[d].count
          ? n.splice(d, 1)
          : n[d].count--),
        n[d] &&
          ((s += n[d].count),
          (e = (
            parseFloat(e) +
            parseFloat(
              (n[d].item.time2 > 0
                ? n[d].item.activity_price
                : n[d].item.price) * n[d].count
            )
          ).toFixed(2)));
    o ||
      (1 == i &&
        (n.push({
          index: t,
          indexx: a,
          count: 1,
          item: this.data.list[t].goods[a],
        }),
        s++,
        (e = (
          parseFloat(e) +
          parseFloat(
            this.data.list[t].goods[a].time2 > 0
              ? this.data.list[t].goods[a].activity_price
              : this.data.list[t].goods[a].price
          )
        ).toFixed(2)))),
      (this.data.cartList.allCount = s),
      (this.data.cartList.allPrice = e),
      this.data.cartList.allPrice >=
      parseFloat(this.data.pageData.shop.starting_price)
        ? (this.data.cartList.canOrder = !0)
        : (this.data.cartList.canOrder = !1),
      0 == n.length && this.setData({ modalName: "" }),
      (this.data.cartList.cartItems = n),
      this.setData({ cartIndexs: n, cartList: this.data.cartList });
  },
  showDetail: function () {
    "detailModal" == this.data.modalName
      ? this.hideModal()
      : this.setData({ modalName: "detailModal" });
  },
  hideModal: function () {
    this.setData({ modalName: "" });
  },
  subBtn: function (t) {
    console.log("sub btn"),
      this.data.pageData.shop.is_open
        ? ((e.globalData.cartList = this.data.cartList),
          this.setData({ isLoading: !0 }),
          setTimeout(function () {
            i.setData({ isLoading: !1 }),
              wx.navigateTo({
                url:
                  "/pages/home/shop/shop-order-page/shop-order-page?title=" +
                  i.data.Str.confirmOrder[i.data.lanIndex],
              });
          }, 100))
        : this.showT({ content: i.data.Str.notService[i.data.lanIndex] });
  },
  onReady: function () {},
  onShow: function () {
    e.globalData.orderId &&
      (i.setData({ isLoading: !0, isPayed: !0 }),
      setTimeout(function () {
        i.setData({ isLoading: !1 }),
          wx.navigateTo({
            url:
              "/pages/order/order-detail/order-detail?id=" +
              e.globalData.orderId +
              "&title=" +
              i.data.Str.orderDetail[i.data.lanIndex],
          });
      }, 200));
  },
  onPageScroll: function (t) {
    console.log("onPageScroll --\x3e>", t);
  },
  onHide: function () {},
  onUnload: function () {
    this.clearCount(),
      this.data.cartList &&
        this.data.cartList.shop &&
        this.data.cartList.cartItems.length > 0 &&
        this.data.shopIsOpened &&
        wx.setStorageSync(
          "m_shop_" + this.data.cartList.shop.id,
          this.data.cartList.cartItems
        ),
      this.data.cartList &&
        this.data.cartList.shop &&
        0 == this.data.cartList.cartItems.length &&
        this.data.shopIsOpened &&
        wx.removeStorageSync("m_shop_" + this.data.cartList.shop.id),
      this.data.isPayed &&
        wx.removeStorageSync("m_shop_" + this.data.cartList.shop.id);
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
