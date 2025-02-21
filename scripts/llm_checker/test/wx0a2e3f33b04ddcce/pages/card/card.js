var e = require("../../@babel/runtime/helpers/defineProperty"),
  a = getApp();
Page(
  e(
    e(
      {
        data: { mycardData: [], cardNum: 0 },
        handlerGohomeClick: function () {
          var e = this;
          wx.navigateTo({
            url: "/pages/logout/logout",
            success: function (a) {
              a.eventChannel.emit("cardNum", { cardNum: e.data.cardNum });
            },
          });
        },
        onLoad: function (e) {},
        onShow: function () {
          this.getMyCards();
        },
        onReady: function () {},
        onHide: function () {},
        onUnload: function () {},
        onPullDownRefresh: function () {
          this.getMyCards();
        },
        getMyCards: function () {
          var e = this,
            t = {
              url: "".concat(a.globalData.user, "/userCard/queryUserCards"),
              method: "POST",
              data: { pageNum: 1, pageSize: 50 },
              successCallback: function (a) {
                200 === a.data.resultCode &&
                  e.setData({
                    mycardData: a.data.data,
                    cardNum: a.data.data.length,
                  }),
                  wx.stopPullDownRefresh();
              },
              failCallback: function () {
                wx.stopPullDownRefresh();
              },
            };
          a.request(t);
        },
        onReachBottom: function () {},
        onShareAppMessage: function () {},
        getMyCardList: function () {
          appwx.request({ url: "/userCard/queryUserCards" });
        },
        goRecharge: function () {
          wx.navigateTo({ url: "../recharge/recharge" });
        },
        goDetails: function (e) {
          wx.navigateTo({
            url: "../details/details",
            success: function (a) {
              a.eventChannel.emit("detailsInfo", {
                id: e.currentTarget.dataset.id,
              });
            },
          });
        },
        goHongbao: function (e) {
          wx.navigateTo({
            url: "../hongbao/hongbao",
            success: function (a) {
              a.eventChannel.emit("detailsInfo", {
                id: e.currentTarget.dataset.id,
              });
            },
          });
        },
      },
      "goRecharge",
      function (e) {
        wx.navigateTo({
          url: "../recharge/recharge",
          success: function (a) {
            a.eventChannel.emit("detailsInfo", {
              cardId: e.currentTarget.dataset.id,
            });
          },
        });
      }
    ),
    "toQrcode",
    function (e) {
      var a = e.currentTarget.dataset.item.id,
        t = e.currentTarget.dataset.item.cardId,
        n = e.currentTarget.dataset.item.merchantId;
      wx.navigateTo({
        url: "/pages/qrcode/qrcode",
        success: function (e) {
          e.eventChannel.emit("qrcode", {
            cardId: a,
            cardNum: t,
            merchantId: n,
          });
        },
      });
    }
  )
);
