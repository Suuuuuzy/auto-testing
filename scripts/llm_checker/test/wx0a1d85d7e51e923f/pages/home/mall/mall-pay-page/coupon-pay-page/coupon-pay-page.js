var t,
  a = getApp();
a.BasePage({
  data: {
    couponAmount: 0,
    allChecked: !1,
    selectedCartCount: 0,
    maxCouponAmount: 0,
    actulyAmount: 0,
    allAmount: null,
    payedPage: !1,
    shop: null,
    amountFocus: !1,
    confirmBottom: 0,
    couponPercent: 0,
  },
  onLoad: function (o) {
    if (
      ((t = this),
      (this.orderId = o.orderId),
      (this.shopId = o.shopId),
      console.log("url --\x3e>", decodeURIComponent(o.q)),
      this.orderId && this.setData({ hasOrder: !0 }),
      this.shopId && this.setData({ amountFocus: !0 }),
      wx.setNavigationBarTitle({
        title: this.data.Str.payForShop[this.data.lanIndex],
      }),
      o.scene)
    ) {
      var n = decodeURIComponent(o.scene);
      (this.shopId = n.split("&")[0]), (this.lan = n.split("&")[1]);
    }
    if (o.q || a.globalData.scanResult) {
      var e = o.q ? o.q : a.globalData.scanResult,
        s = decodeURIComponent(e);
      s &&
        ((this.shopId = this.tool.getUrlParam("shopId", s)),
        console.log("shopId --\x3e>", this.shopId)),
        (a.globalData.scanResult = null);
    }
    1 == this.lan
      ? this.data.isUy || this.switchLan()
      : 2 == this.lan && this.data.isUy && this.switchLan(),
      this.loadLoginInfo();
  },
  loadLoginInfo: function () {
    t || (t = this),
      a.globalData.isLogin
        ? this.loadData()
        : (a.userLoginCall = function (o) {
            console.log("login call =>", o),
              o
                ? t.loadData()
                : a.userLogin(function () {
                    t.loadData();
                  });
          });
  },
  loadData: function () {
    this.requestWithLoading(
      "order/getCouponPayPage",
      { orderId: this.orderId, shopId: this.shopId },
      function (a) {
        a &&
          (a.order && t.setData({ allAmount: a.order.total_fee }),
          a.shop &&
            (t.shopId && a.userLan && t.initShowLan(a.userLan),
            t.setData({ shop: a.shop })),
          t.setData({ pageData: a, amountFocus: !0 }),
          t.initMaxCouponAmount());
      }
    );
  },
  initShowLan: function (t) {
    console.log("lan ---\x3e>>", t),
      1 == t
        ? this.data.isUy || this.switchLan()
        : 2 == t && this.data.isUy && this.switchLan();
  },
  inputFocus: function (t) {
    console.log("focus --\x3e>", t),
      t.detail.height && this.setData({ confirmBottom: t.detail.height });
  },
  inputBlur: function (t) {
    console.log("blur ---\x3e>", t), this.setData({ confirmBottom: 0 });
  },
  inputChange: function (t) {
    var a = t.detail.value;
    this.setData({ allAmount: a }), this.initMaxCouponAmount();
  },
  initMaxCouponAmount: function () {
    var t = this.data.allAmount ? this.data.allAmount : 0;
    if (this.data.shop) {
      var a = 0;
      this.data.pageData &&
        this.data.pageData.order &&
        (0 == this.data.pageData.order.order_type
          ? 3 == this.data.pageData.order.take_food_way
            ? (console.log("fuck --\x3e>" + this.data.shop.takeaway_percent),
              (a = parseInt(this.data.shop.takeaway_percent / 3)),
              console.log("fuck percent --\x3e>" + a))
            : (a = parseInt(this.data.shop.booking_percent))
          : (a = this.data.shop.shop_percent)),
        0 == a && (a = this.data.shop.shop_percent),
        (this.data.couponPercent = a),
        console.log("percent ---\x3e>" + a),
        (this.data.maxCouponAmount = ((t * (a - 0.6)) / 100).toFixed(2)),
        this.setData({ maxCouponAmount: this.data.maxCouponAmount }),
        this.initCoupon();
    }
  },
  initCoupon: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    if ((console.log("canceld --\x3e>", t), this.data.pageData)) {
      var a = this.data.pageData.coupon,
        o = this.data.couponAmount,
        n = this.data.maxCouponAmount;
      if (
        (a.forEach(function (t) {
          t.selected = !1;
        }),
        t)
      )
        o = 0;
      else {
        for (var e in a) {
          if (!(o < n)) break;
          (o = parseFloat(o) + parseFloat(a[e].amount)), (a[e].selected = !0);
        }
        o > n && (o = n);
      }
      this.setData({ coupon: a, couponAmount: o }), this.initCouponSelected();
    }
  },
  initCouponSelected: function () {
    var t = this.data.coupon,
      a = 0,
      o = 0;
    if (t) {
      for (var n in t)
        t[n].selected && ((a = parseFloat(a) + parseFloat(t[n].amount)), o++);
      a > this.data.maxCouponAmount && (a = this.data.maxCouponAmount),
        (a = parseFloat(a).toFixed(2)),
        this.setData({
          couponAmount: a,
          selectedCartCount: o,
          actulyAmount: parseFloat(this.data.allAmount - a).toFixed(2),
        });
    }
  },
  allChekChange: function (t) {
    console.log(t),
      this.data.allAmount &&
        (this.setData({ allChecked: !this.data.allChecked }),
        this.data.allChecked
          ? (this.initCoupon(!1), console.log("allChecked"))
          : (this.initCoupon(!0), console.log("allUnChecked")));
  },
  selectedClick: function (t) {
    var a = t.currentTarget.dataset.index;
    (this.data.coupon[a].selected ||
      this.data.couponAmount != this.data.maxCouponAmount) &&
      ((this.data.coupon[a].selected = !this.data.coupon[a].selected),
      this.setData({ coupon: this.data.coupon }),
      this.initCouponSelected(),
      console.log("selectedClick ---\x3e>", t));
  },
  subBtn: function (a) {
    if (this.data.allAmount) {
      var o = [];
      if (this.data.selectedCartCount)
        for (var n in this.data.coupon)
          this.data.coupon[n].selected && o.push(this.data.coupon[n]);
      var e = {
        orderId: this.orderId,
        shopId: this.data.shop.id,
        discountCartCount: this.data.selectedCartCount,
        actualAmount: this.data.actulyAmount,
        maxCouponAmount: this.data.maxCouponAmount,
        allAmount: this.data.allAmount,
        couponAmount: this.data.couponAmount,
        cartItems: JSON.stringify(o),
      };
      this.requestWithLoading(
        this.data.hasOrder ? "order/subCouponInfo" : "order/createCouponOrder",
        e,
        function (a) {
          a && t.pay(a.id);
        }
      );
    } else
      this.showT({ content: this.data.Str.inputAmount[this.data.lanIndex] });
  },
  pay: function (o) {
    this.requestWithLoading(
      "order/payCouponOrderFee",
      { orderId: o },
      function (n) {
        n &&
          wx.requestPayment({
            timeStamp: n.timestamp,
            nonceStr: n.nonceStr,
            package: n.package,
            signType: n.signType,
            paySign: n.paySign,
            success: function () {
              t.showT(
                {
                  content: t.data.Str.paySuccessed[t.data.lanIndex],
                  icon: "success",
                  color: "cyan",
                },
                function (n) {
                  t.data.hasOrder && (a.globalData.orderId = o),
                    t.setData({ isLoading: !0 }),
                    setTimeout(function () {
                      if ((t.setData({ isLoading: !1 }), t.data.hasOrder)) {
                        var a = getCurrentPages();
                        a[a.length - 2].setData({ pData: { orderId: o } });
                      }
                      t.getPayedPage(o), t.setData({ payedPage: !0 });
                    }, 500);
                }
              );
            },
            fail: function (a) {
              console.log(a), t.failureToast();
            },
          });
      }
    );
  },
  getPayedPage: function (a) {
    this.requestWithLoading(
      "order/getCouponPayedPage",
      { orderId: a },
      function (a) {
        a && t.setData({ payedData: a });
      }
    );
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
