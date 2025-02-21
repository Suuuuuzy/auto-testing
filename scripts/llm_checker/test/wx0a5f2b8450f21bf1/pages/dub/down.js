Page({
  data: { text: "", url: "", showAd: !1, picToTextAd: "" },
  onLoad: function (t) {
    this.setData({
      text: decodeURIComponent(t.text),
      url: decodeURIComponent(t.url),
      picToTextAd: getApp().globalData.toolAd,
      showAd: !0,
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onShareAppMessage: function (t) {
    return {
      title: getApp().globalData.shareTitle,
      path: "/pages/index/index?openid=" + getApp().globalData.openid,
      imageUrl: getApp().globalData.sharePic,
    };
  },
  onShareTimeline: function () {
    var t = wx.getStorageSync("id");
    return {
      title: this.data.noticedetail[0].title,
      query: "id= " + t,
      imageUrl: this.data.noticedetail[0].thumb,
    };
  },
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  playVoice: function () {
    const t = wx.createInnerAudioContext();
    (t.autoplay = !0), (t.src = this.data.url);
  },
  downVoice: function () {
    const t = this;
    wx.showLoading({ title: "请稍等" });
    try {
      const e = wx.createMediaContainer();
      wx.downloadFile({
        url: t.data.url,
        success: function (t) {
          var o = t.tempFilePath;
          e.extractDataSource({
            source: o,
            success: function (t) {
              var o,
                a = t.tracks[0],
                n = a.duration;
              o = n <= 2e4 ? 4 : n <= 3e4 ? 3 : n <= 6e4 ? 2 : 1;
              var i = getApp().globalData.xiazaipeiyin + o + ".mp4";
              console.log(i),
                console.log(a),
                console.log(i),
                e.addTrack(a),
                wx.downloadFile({
                  url: i,
                  success: function (t) {
                    var o = t.tempFilePath;
                    e.extractDataSource({
                      source: o,
                      success: function (t) {
                        var o = t.tracks[1];
                        console.log(o),
                          e.addTrack(o),
                          e.export({
                            success: function (t) {
                              wx.saveVideoToPhotosAlbum({
                                filePath: t.tempFilePath,
                              }).then((t) => {
                                e.removeTrack(o),
                                  e.removeTrack(a),
                                  e.destroy(),
                                  wx.showToast({ title: "保存成功" });
                              });
                            },
                            fail: function (t) {
                              console.log("错误为5");
                            },
                          });
                      },
                      fail: function (t) {
                        console.log("错误为4");
                      },
                    });
                  },
                  fail: function (t) {
                    console.log("错误为3");
                  },
                });
            },
            fail: function (t) {
              console.log("错误为2", t);
            },
          });
        },
        fail: function (t) {
          console.log(t);
        },
      });
    } catch (t) {
      wx.showToast({ title: "保存失败", icon: "none" });
    }
  },
  saveVoiceToPhone: function () {
    wx.setClipboardData({ data: this.data.url });
  },
  onShareAppMessage: function (t) {
    return (
      t.from,
      {
        title: getApp().globalData.shareTitle,
        path: "/pages/index/index?openid=" + getApp().globalData.openid,
        imageUrl: getApp().globalData.sharePic,
      }
    );
  },
  onShareTimeline: function () {
    var t = wx.getStorageSync("id");
    return {
      title: this.data.noticedetail[0].title,
      query: "id= " + t,
      imageUrl: this.data.noticedetail[0].thumb,
    };
  },
});
