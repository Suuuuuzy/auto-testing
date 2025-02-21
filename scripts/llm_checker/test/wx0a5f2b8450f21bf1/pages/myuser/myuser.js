Page({
  data: { avatarUrl: "", nickName: "" },
  onLoad: function (a) {},
  onReady: function () {},
  onShow: function () {},
  onChooseAvatar(a) {
    console.log(a), this.setData({ avatarUrl: a.detail.avatarUrl });
  },
  submit(a) {
    console.log(a),
      this.setData({ nickName: a.detail.value.nickname }),
      this.get_UserProfile();
  },
  get_UserProfile: function (a) {
    if (0 != this.data.avatarUrl)
      if ("" != this.data.nickName) {
        var t = this.data.avatarUrl;
        wx.uploadFile({
          url: getApp().globalData.fwqurl + "touxiang",
          filePath: t,
          name: "file",
          formData: {
            userid: getApp().globalData.uid,
            nickname: this.data.nickName,
          },
          success: function (a) {
            let t = JSON.parse(a.data);
            console.log(t.code),
              1 == t.code
                ? (console.log(t.data.headUrl),
                  wx.setStorageSync("avatarUrl", t.data.data.headUrl),
                  wx.setStorageSync("nickName", t.data.data.nickname),
                  wx.setStorageSync("keyong", t.data.data.keyong),
                  wx.setStorageSync("uid", t.data.data.uid),
                  wx.setStorageSync("isLogin", !0),
                  wx.showToast({
                    title: "登录成功",
                    icon: "none",
                    duration: 2e3,
                  }),
                  wx.switchTab({ url: "../my/my" }))
                : wx.showModal({
                    title: "提醒",
                    content: "登录失败,重启试试",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#80848f",
                    confirmText: "确定",
                    confirmColor: "#ed3f14",
                    success: function (a) {
                      a.cancel
                        ? console.log("取消")
                        : (wx.clearStorage(),
                          wx.reLaunch({ url: "../index/index" }));
                    },
                    fail: function (a) {},
                    complete: function (a) {},
                  });
          },
        });
      } else wx.showToast({ title: "请输入昵称", icon: "none", duration: 2e3 });
    else wx.showToast({ title: "请获取头像", icon: "none", duration: 2e3 });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
