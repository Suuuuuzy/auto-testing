var t = getApp();
Page({
  data: { userinfo: [], showState: t.task.share.show, list: [] },
  onShow: function (a) {
    var s = this;
    t.getUser(function (t) {
      s.setData({ userinfo: t });
    });
    t.postData(t.apiurl + "/user/onGetCashList", {}, function (t) {
      s.setData({ list: t.data });
    });
  },
  onSubmit: function () {
    this.data.userinfo.price < 100
      ? wx.showToast({ title: "可提现金额不足100", icon: "none", mask: !0 })
      : wx.navigateTo({
          url:
            "./cashform?mobile=" +
            (this.data.list.length > 0 ? this.data.list[0].mobile : "") +
            "&name=" +
            (this.data.list.length > 0 ? this.data.list[0].name : ""),
        });
  },
});
