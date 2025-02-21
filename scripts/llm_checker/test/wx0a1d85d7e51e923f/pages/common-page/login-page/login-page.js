var n;
getApp().BasePage({
  data: {},
  onLoad: function (t) {
    n = this;
  },
  getPhoneNumber: function (t) {
    var e = this;
    console.log(t),
      "getPhoneNumber:ok" == t.detail.errMsg
        ? (this.user.removeToken(),
          this.setData({ isLoading: !0 }),
          this.showT(
            {
              content: n.data.Str.authorzationSuccess[n.data.lanIndex],
              icon: "success",
              color: "green",
            },
            function () {
              e.user.login(function (e) {
                n.setData({ isLoading: !1 }),
                  e &&
                    n.requestWithLoading(
                      "user/getPhoneNumber",
                      {
                        encryptedData: t.detail.encryptedData,
                        iv: t.detail.iv,
                        sessionKey: e.session_key,
                      },
                      function (t) {
                        t &&
                          n.successToast(function (t) {
                            n.setData({ isLoading: !0 }),
                              setTimeout(function () {
                                var n = getCurrentPages();
                                n[n.length - 2].setData({
                                  loginSuccessBack: !0,
                                }),
                                  wx.navigateBack({ delta: 1 });
                              }, 300);
                          });
                      }
                    );
              });
            }
          ))
        : this.showT(
            {
              content: n.data.Str.authorzationFail[n.data.lanIndex],
              icon: "shibaibiaoqing",
              color: "grey",
            },
            function (n) {}
          );
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
