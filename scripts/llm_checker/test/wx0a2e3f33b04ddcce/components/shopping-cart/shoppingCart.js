var t = require("../../@babel/runtime/helpers/objectSpread2"),
  a = getApp();
Component({
  properties: {},
  data: { show: !1, cartData: [], totalPrice: 0, badge: 0 },
  pageLifetimes: {
    show: function () {
      this.setData({
        cartData: a.globalData.shoppingCart,
        badge: a.globalData.shoppingCart.length,
        totalPrice: a.globalData.totalPrice,
      });
    },
  },
  methods: {
    showPopup: function () {
      this.setData({
        show: !0,
        cartData: a.globalData.shoppingCart,
        badge: a.globalData.shoppingCart.length,
      });
    },
    onClose: function () {
      this.setData({ show: !1 });
    },
    changeCount: function (e) {
      var r = this,
        o = e.detail,
        i = e.currentTarget.dataset.item;
      i.count = o;
      var n = a.globalData.shoppingCart,
        c = n.findIndex(function (t) {
          return t.date === i.date && t.itemId === i.itemId;
        });
      c > -1
        ? 0 === o
          ? n.splice(c, 1)
          : (n[c] = t({}, i))
        : o > 0 && n.unshift(t({}, i)),
        (a.globalData.shoppingCart = n),
        this.checkTotalPrice(),
        wx.nextTick(function () {
          r.triggerEvent("changecart", e);
        });
    },
    checkTotalPrice: function () {
      for (var t = a.globalData.shoppingCart, e = 0, r = 0; r < t.length; r++) {
        e += (t[r].count || 0) * (t[r].item.price || 0);
      }
      (a.globalData.totalPrice = e.toFixed(2)),
        this.setData({
          cartData: t,
          badge: t.length,
          totalPrice: e.toFixed(2),
        });
    },
    removeCart: function () {
      (a.globalData.shoppingCart = []),
        (a.globalData.totalPrice = 0),
        this.setData({ cartData: [], badge: 0, totalPrice: 0 }),
        this.triggerEvent("removecart");
    },
    createOrder: function () {
      this.data.totalPrice > 0 &&
        wx.navigateTo({ url: "/pages/createOrder/createOrder" });
    },
  },
});
