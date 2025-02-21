Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../@babel/runtime/helpers/createClass"),
  o = Symbol("mall"),
  s = Symbol("shops");
exports.default = (function () {
  return t(
    function t() {
      e(this, t), (this[o] = "mall_shop_"), (this[s] = "shops_cart");
    },
    [
      {
        key: "setShopItem",
        value: function (e, t) {
          wx.setStorageSync(this[o] + e, t);
          var n = this.getShops();
          if (n) {
            var r = !1,
              u = -1;
            n.forEach(function (t, o, s) {
              e == t && ((r = !0), (u = o));
            }),
              r && -1 != u && n.splice(u, 1),
              n.unshift(e);
          } else n = [e];
          wx.setStorageSync(this[s], n);
        },
      },
      {
        key: "getShops",
        value: function () {
          return wx.getStorageSync(this[s]);
        },
      },
      {
        key: "getShopItem",
        value: function (e) {
          return wx.getStorageSync(this[o] + e);
        },
      },
      {
        key: "getShopsCount",
        value: function () {
          var e = this.getShops();
          return e ? e.length : 0;
        },
      },
      {
        key: "getShopGoodsCount",
        value: function (e) {
          var t = this.getShopItem(e),
            o = 0;
          return (
            t &&
              t.forEach(function (e) {
                o += e.count;
              }),
            o
          );
        },
      },
      {
        key: "getAllGoodsCount",
        value: function () {
          var e = this.getShops(),
            t = this,
            o = 0;
          return (
            e &&
              e.forEach(function (e) {
                o += t.getShopGoodsCount(e);
              }),
            o
          );
        },
      },
      {
        key: "removeShopItems",
        value: function (e) {
          wx.removeStorageSync(this[o] + e);
          var t = this.getShops();
          t &&
            t.forEach(function (o, s, n) {
              e == o && t.splice(s, 1);
            }),
            wx.setStorageSync(this[s], t);
        },
      },
    ]
  );
})();
