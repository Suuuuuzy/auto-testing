var t = getApp();
Page({
  data: { userinfo: [], list: [], shareMsg: !1 },
  onShow: function (s) {
    var a = this;
    if (!t.task.share.show) return !1;
    t.getUser(function (t) {
      a.setData({ userinfo: t });
    });
    t.postData(t.apiurl + "/user/onGetShareList", {}, function (t) {
      a.setData({ list: t.data });
    });
  },
  onShowMsg: function (t) {
    wx.previewImage({ urls: [t.currentTarget.dataset.img] });
  },
  showShareMsg: function () {
    this.setData({ shareMsg: !0 });
  },
  hideShareMsg: function () {
    this.setData({ shareMsg: !1 });
  },
});
