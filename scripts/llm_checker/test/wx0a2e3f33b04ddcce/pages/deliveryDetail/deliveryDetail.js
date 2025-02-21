var t,
  a = require("../../@babel/runtime/helpers/objectSpread2"),
  e =
    (t = require("../../assets/lib/dayjs.min.js")) && t.__esModule
      ? t
      : { default: t };
var n = getApp();
Page({
  data: { detailData: [], defaultFoodUrl: "/assets/img/default-food.png" },
  onLoad: function (t) {
    var a = this;
    this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function (t) {
      a.setData({ detailData: t.detail });
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  changeCount: function (t) {
    var i = t.detail,
      o = this.data.detailData;
    o.count = i;
    var d = (0, e.default)(o.date).day();
    o.weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d];
    var l = n.globalData.shoppingCart,
      r = l.findIndex(function (t) {
        return t.date === o.date && t.itemId === o.itemId;
      });
    r > -1
      ? 0 === i
        ? l.splice(r, 1)
        : (l[r] = a({}, o))
      : i > 0 && l.unshift(a({}, o)),
      (n.globalData.shoppingCart = l),
      this.selectComponent("#shopping-cart").checkTotalPrice();
  },
  onChangeCart: function (t) {
    var a = t.detail.currentTarget.dataset.item,
      e = t.detail.detail,
      n = this.data.detailData;
    a.date === n.date &&
      a.itemId === n.itemId &&
      ((n.count = e), this.setData({ detailData: n }));
  },
  onRemoveCart: function () {
    var t = this.data.detailData;
    (t.count = 0), this.setData({ detailData: t });
  },
});
