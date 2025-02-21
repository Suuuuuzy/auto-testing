var a;
getApp().BasePage({
  data: {
    avatarUrl:
      "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    hasAvatar: 0,
    nickName: "",
  },
  onChooseAvatar: function (a) {
    console.log("e --\x3e>", a);
    var t = a.detail.avatarUrl;
    this.setData({ avatarUrl: t, hasAvatar: 1 }),
      console.log("hasAvatar --\x3e>" + this.data.hasAvatar);
  },
  nickNameInput: function (a) {
    var t = a.detail.value;
    console.log("nickName--", t),
      this.setData({ nickName: t }),
      console.log("nickName ==" + this.data.nickName);
  },
  subBtn: function () {
    a.setData({ isLoading: !0 }),
      console.log("filePath --\x3e>", this.data.avatarUrl),
      console.log("nickName --\x3e>", this.data.nickName),
      console.log("token --\x3e>", this.user.getToken()),
      wx.uploadFile({
        url: this.req.getBaseUrl() + "user/setUserAvatar",
        filePath: this.data.avatarUrl,
        name: "source",
        formData: { nickName: this.data.nickName, token: this.user.getToken() },
        header: { "Content-Type": "multipart/form-data" },
        success: function (t) {
          var e;
          a.setData({ isLoading: !1 });
          try {
            e = JSON.parse(t.data);
          } catch (a) {
            e = !1;
          }
          e && 1 == e.resultCode
            ? a.successToast(function () {
                var a = getCurrentPages();
                a[a.length - 2].setData({ pageData: { hasUpdate: !0 } }),
                  wx.navigateBack({ delta: 1 });
              })
            : a.failureToast();
        },
        fail: function (t) {
          a.failureToast();
        },
        complete: function (a) {},
      });
  },
  onLoad: function (t) {
    a = this;
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
