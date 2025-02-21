var a = getApp();
Page({
  data: {
    dishName: null,
    dishId: null,
    cardId: null,
    score: 0,
    scoreText: "打个分再走吧",
    message: "",
  },
  onLoad: function (e) {
    var t = this;
    this.setData({ detailHeight: a.globalSystemInfo.navBarHeight + 4 }),
      this.getOpenerEventChannel().on("rating", function (a) {
        console.log(a),
          t.setData({
            dishName: a.dishName,
            dishId: a.dishId,
            cardId: a.cardId,
          });
      });
  },
  handlerGobackClick: function () {
    if (getCurrentPages().length >= 2) {
      var a = getCurrentPages();
      a[a.length - 2].setData({ refresh: !1 }), wx.navigateBack({ delta: 1 });
    } else wx.navigateTo({ url: "/pages/card/card" });
  },
  grade: function () {
    var e = {
      url: "".concat(a.globalData.mgmt, "/DishesEvaluate/insertDishesEvaluate"),
      method: "POST",
      data: {
        dishId: this.data.dishId,
        cardId: this.data.cardId,
        score: this.data.score,
        evaluationContent: this.data.message,
      },
      successCallback: function (a) {
        if (200 === a.data.resultCode) {
          var e = getCurrentPages();
          e[e.length - 2].setData({ refresh: !0 }),
            wx.navigateBack({ delta: 1 });
        } else wx.showToast({ title: a.data.resultMessage, icon: "none" });
      },
    };
    a.request(e);
  },
  changeScore: function () {
    var a = "打个分再走吧",
      e = this.data.score;
    e > 4 && (a = "超赞"),
      e > 3 && e <= 4 && (a = "满意"),
      e > 2 && e <= 3 && (a = "一般"),
      e > 1 && e <= 2 && (a = "差"),
      e > 0 && e <= 1 && (a = "非常差"),
      this.setData({ scoreText: a });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
