var a,
  t = require("../../@babel/runtime/helpers/objectSpread2"),
  e =
    (a = require("../../assets/lib/dayjs.min.js")) && a.__esModule
      ? a
      : { default: a };
var n = getApp(),
  i = require("../../assets/lib/wx-formdata/formData.js");
Page({
  data: {
    headDefaultUrl: "/assets/img/head-default.png",
    defaultFoodUrl: "/assets/img/default-food.png",
    accountId: "",
    accountPhone: "",
    companyOption: [],
    companyId: 0,
    activeDay: 0,
    days: [],
    deliveryData: [],
    deliveryDayData: [],
    cardNum: 0,
  },
  handlerGohomeClick: function () {
    var a = this;
    wx.navigateTo({
      url: "/pages/logout/logout",
      success: function (t) {
        t.eventChannel.emit("cardNum", { cardNum: a.data.cardNum });
      },
    });
  },
  onLoad: function (a) {
    var t = wx.getStorageSync("userInfo");
    this.setData({ accountPhone: t.user ? t.user.phone : "" }), this.getDays();
  },
  onReady: function () {},
  onShow: function () {
    this.getCards();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.getCards();
  },
  getCards: function () {
    var a = this,
      t = this,
      e = {
        url: "".concat(n.globalData.user, "/userCard/queryUserCards"),
        method: "POST",
        data: { pageNum: 1, pageSize: 50 },
        successCallback: function (e) {
          if ((wx.stopPullDownRefresh(), 200 === e.data.resultCode)) {
            var i,
              d = e.data.data[0].accountId,
              r = e.data.data.map(function (a) {
                return { text: a.companyName, value: a.companyId };
              }),
              o = r.find(function (a) {
                return a.value === n.globalData.companyId;
              });
            o
              ? (i = o.value)
              : ((i = r[0].value), (n.globalData.companyId = i)),
              a.setData({
                accountId: d,
                companyOption: r,
                companyId: i,
                cardNum: e.data.data.length,
              }),
              t.getDelivery();
          }
        },
        failCallback: function () {
          wx.stopPullDownRefresh();
        },
      };
    n.request(e);
  },
  changeCard: function () {
    (n.globalData.companyId = this.data.companyId), this.getDelivery();
  },
  getDelivery: function () {
    var a = this,
      e = new i();
    e.append("companyId", this.data.companyId);
    var d = e.getData(),
      r = {
        url: "".concat(
          n.globalData.takeaway,
          "/api/takeaway/item/plan/findPlanList"
        ),
        method: "POST",
        header: { "content-type": d.contentType },
        data: d.buffer,
        successCallback: function (e) {
          if ((wx.stopPullDownRefresh(), 200 === e.data.resultCode)) {
            var i = e.data.data;
            i.forEach(function (a) {
              a.list.forEach(function (a) {
                a.max = Math.min(a.limit, a.item.inventory);
              });
            });
            var d = n.globalData.shoppingCart;
            d.forEach(function (a, e) {
              var n = i.findIndex(function (t) {
                return t.date === a.date;
              });
              if (-1 !== n) {
                var r = i[n].list.findIndex(function (t) {
                  return t.itemId === a.itemId;
                });
                -1 !== r
                  ? ((i[n].list[r].count = a.count),
                    (i[n].list[r].weekday = a.weekday),
                    (d[e] = t({}, i[n].list[r])))
                  : (d[e].delete = !0);
              } else d[e].delete = !0;
            });
            var r = d.filter(function (a) {
              return !0 !== a.delete;
            });
            (n.globalData.shoppingCart = r),
              a.selectComponent("#shopping-cart").checkTotalPrice(),
              a.setData({ deliveryData: i }),
              a.changeDay({ detail: a.data.activeDay });
          }
        },
      };
    n.request(r);
  },
  getDays: function () {
    for (
      var a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        t = (0, e.default)().day(),
        n = [],
        i = 0;
      i < 7;
      i++
    ) {
      var d = (0, e.default)().day(t);
      n.push({
        date: d.format("YYYY-MM-DD"),
        day: d.format("MM-DD"),
        weekday: a[d.day()],
      }),
        t++;
    }
    this.setData({ days: n });
  },
  changeDay: function (a) {
    var t = this;
    this.setData({ activeDay: a.detail });
    var e = this.data.deliveryData.find(function (e) {
      return e.date === t.data.days[a.detail].date;
    });
    e
      ? this.setData({ deliveryDayData: e.list })
      : this.setData({ deliveryDayData: [] });
  },
  changeCount: function (a) {
    var e = a.detail,
      i = a.currentTarget.dataset.item;
    i.count = e;
    var d = this.data.days.find(function (a) {
      return a.date === i.date;
    });
    i.weekday = d.weekday;
    var r = this.data.deliveryData.findIndex(function (a) {
        return a.date === i.date;
      }),
      o = this.data.deliveryData[r].list.findIndex(function (a) {
        return a.itemId === i.itemId;
      }),
      s = this.data.deliveryData;
    (s[r].list[o].count = e),
      this.setData({ deliveryData: s }),
      this.changeDay({ detail: this.data.activeDay });
    var c = n.globalData.shoppingCart,
      l = c.findIndex(function (a) {
        return a.date === i.date && a.itemId === i.itemId;
      });
    l > -1
      ? 0 === e
        ? c.splice(l, 1)
        : (c[l] = t({}, i))
      : e > 0 && c.unshift(t({}, i)),
      (n.globalData.shoppingCart = c),
      this.selectComponent("#shopping-cart").checkTotalPrice();
  },
  onChangeCart: function (a) {
    var t = a.detail.detail,
      e = a.detail.currentTarget.dataset.item;
    e.count = t;
    var n = this.data.deliveryData.findIndex(function (a) {
        return a.date === e.date;
      }),
      i = this.data.deliveryData[n].list.findIndex(function (a) {
        return a.itemId === e.itemId;
      }),
      d = this.data.deliveryData;
    (d[n].list[i].count = t),
      this.setData({ deliveryData: d }),
      this.changeDay({ detail: this.data.activeDay });
  },
  onRemoveCart: function () {
    var a = this.data.deliveryData;
    a.forEach(function (a) {
      a.list.forEach(function (a) {
        a.count = 0;
      });
    }),
      this.setData({ deliveryData: a }),
      this.changeDay({ detail: this.data.activeDay });
  },
  catchTap: function () {},
  toDetail: function (a) {
    var t = a.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/deliveryDetail/deliveryDetail",
      success: function (a) {
        a.eventChannel.emit("acceptDataFromOpenerPage", { detail: t });
      },
    });
  },
});
