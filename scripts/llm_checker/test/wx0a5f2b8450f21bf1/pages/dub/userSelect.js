!(function () {
  const t = wx.createInnerAudioContext();
  Page({
    data: {
      category: ["通用", "客服", "直播", "童声", "英文", "方言", "多语种"],
      detail: [],
      selectIndex: 0,
      nowPalySourceIndex: null,
    },
    onLoad: function (t) {
      const e = this;
      wx.request({
        url: getApp().globalData.fwqurl + "lyz/getDubUser",
        success: function (t) {
          console.log(t.data),
            1 == t.data.code
              ? e.setData({ detail: t.data.data })
              : wx.showToast({ icon: "none", title: "获取数据失败" });
        },
      });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    changeIndex: function (t) {
      this.setData({ selectIndex: t.currentTarget.dataset.index });
    },
    choosePerson: function (t) {
      var e = getCurrentPages(),
        n = (e[e.length - 1], e[e.length - 2]);
      const a = this.data.detail[t.currentTarget.dataset.index];
      n.setData({ personInfo: a }), wx.navigateBack({ delta: 1 });
    },
    listenDemo: function (e) {
      const n = this;
      wx.showLoading({ title: "请稍等" }),
        wx.request({
          url: getApp().globalData.fwqurl + "lyz/listenDub",
          data: {
            id: e.currentTarget.dataset.id,
            programType: getApp().globalData.sid,
          },
          method: "GET",
          success: function (a) {
            1 != a.data.code
              ? wx.showModal({ content: a.data.msg })
              : ((t.autoplay = !0),
                (t.src = a.data.data.url),
                t.onEnded(function () {
                  n.setData({ nowPalySourceIndex: null });
                }),
                n.setData({ nowPalySourceIndex: e.currentTarget.dataset.id })),
              wx.hideLoading();
          },
        });
    },
    closeAudio: function () {
      t.stop(), this.setData({ nowPalySourceIndex: null });
    },
  });
})();
