var e = getApp();
Page({
  data: { userinfo: [], mobile: "", showState: e.task.share.show, name: "" },
  onLoad: function (e) {
    this.setData({ mobile: e.mobile, name: e.name });
  },
  onShow: function () {
    var a = this;
    e.getUser(function (e) {
      a.setData({ userinfo: e });
    });
  },
  onSubmit: function (a) {
    if ("" == a.detail.value.mobile || "" == a.detail.value.name)
      return (
        wx.showToast({ title: "数据填写完整！", icon: "none", mask: !0 }), !1
      );
    wx.showModal({
      content: "再次确认收款账号：" + a.detail.value.mobile,
      success: function (t) {
        if (t.confirm) {
          var o = {};
          wx.showLoading({ title: "提交中" }),
            (o.mobile = a.detail.value.mobile),
            (o.name = a.detail.value.name),
            e.postData(e.apiurl + "/user/onCash", o, function (e) {
              wx.showModal({
                content: e.msg,
                showCancel: !1,
                success: function () {
                  wx.navigateBack({ delta: 1 });
                },
              });
            });
        }
      },
    });
  },
});
