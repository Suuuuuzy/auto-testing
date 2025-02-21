var a = require("../../assets/js/util.js"),
  t = getApp();
Page({
  data: {
    headDefaultUrl: "/assets/img/head-default.png",
    foodDefaultUrl: "/assets/img/default-food.png",
    accountId: 0,
    accountPhone: 0,
    companyOption: [],
    companyId: 0,
    cardId: null,
    effectiveDate: "",
    effectiveMealTimes: 0,
    activeKey: 0,
    dayList: [
      { day: "周一" },
      { day: "周二" },
      { day: "周三" },
      { day: "周四" },
      { day: "周五" },
      { day: "周六" },
      { day: "周日" },
    ],
    menuData: [],
    cardNum: 0,
    windowHeight: 0,
    menuHeight: 0,
    menuWidth: 0,
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
  showPopup: function () {
    this.setData({ show: !0 });
  },
  onClose: function () {
    this.setData({ show: !1 });
  },
  getCards: function () {
    var a = this,
      e = {
        url: "".concat(t.globalData.user, "/userCard/queryUserCards"),
        method: "POST",
        data: { pageNum: 1, pageSize: 50 },
        successCallback: function (e) {
          if (200 === e.data.resultCode) {
            var n,
              i,
              d = e.data.data[0].accountId,
              o = e.data.data.map(function (a) {
                return {
                  text: a.companyName,
                  value: a.companyId,
                  cardId: a.id,
                };
              }),
              s = o.find(function (a) {
                return a.value === t.globalData.companyId;
              });
            s
              ? ((n = s.value), (i = s.cardId))
              : ((n = o[0].value),
                (i = o[0].cardId),
                (t.globalData.companyId = n)),
              a.setData({
                accountId: d,
                companyOption: o,
                companyId: n,
                cardId: i,
                cardNum: e.data.data.length,
              }),
              a.getMenu();
          }
        },
      };
    t.request(e);
  },
  getDays: function () {
    var t = this;
    (0, a.weekList)(new Date()).forEach(function (e, n) {
      (t.data.dayList[n].date = (0, a.dateFormat)(new Date(e), "MM-dd")),
        (t.data.dayList[n].effectiveDate = (0, a.dateFormat)(
          new Date(e),
          "yyyy-MM-dd"
        ));
    }),
      this.setData({ dayList: this.data.dayList }),
      this.setData({ effectiveDate: this.data.dayList[0].effectiveDate });
  },
  getMenu: function () {
    var a = this,
      e = {
        url: "".concat(t.globalData.user, "/menu/queryMenu"),
        method: "GET",
        data: {
          companyId: this.data.companyId,
          effectiveDate: this.data.effectiveDate,
          effectiveMealTimes: this.data.effectiveMealTimes,
        },
        successCallback: function (t) {
          if (200 === t.data.resultCode) {
            var e = (t.data.data && t.data.data.dishes) || [];
            a.setData({ menuData: e });
          }
        },
      };
    t.request(e);
  },
  changeDay: function (a) {
    this.setData({ activeKey: a.detail }),
      this.setData({
        effectiveDate: this.data.dayList[this.data.activeKey].effectiveDate,
      }),
      this.getMenu();
  },
  changeMeal: function (a) {
    this.setData({ effectiveMealTimes: a.detail.index }), this.getMenu();
  },
  changeCompany: function (a) {
    var e = this.data.companyOption.find(function (t) {
      return t.value === a.detail;
    });
    this.setData({ companyId: a.detail, cardId: e.cardId }),
      (t.globalData.companyId = this.data.companyId),
      this.getMenu();
  },
  toRate: function (a) {
    var t = this.data.cardId,
      e = a.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/rate/rate",
      success: function (a) {
        a.eventChannel.emit("rate", {
          dishName: e.name,
          dishId: e.id,
          cardId: t,
        });
      },
    });
  },
  onLoad: function (a) {
    var e = wx.getStorageSync("userInfo");
    this.setData({
      accountPhone: e.user.phone,
      windowHeight:
        t.globalSystemInfo.windowHeight - t.globalSystemInfo.navBarHeight,
      menuHeight:
        t.globalSystemInfo.windowHeight - t.globalSystemInfo.navBarHeight - 110,
      menuWidth: t.globalSystemInfo.windowWidth - 75,
    }),
      this.getDays();
  },
  onReady: function () {},
  onShow: function () {
    this.getCards();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
