!(function () {
  getApp();
  var t = new Array(),
    o = null;
  Page({
    data: {
      save: !1,
      duration: 0,
      timer: 0,
      itemList: [],
      play: !1,
      remark: !0,
      remove: !1,
      video: "",
      videoW: 0,
      videoH: 0,
      videoLeft: 0,
      videoTop: 0,
      showSelect: 1,
    },
    deleteAll: function () {
      (t = new Array()), this.setData({ itemList: t });
    },
    drawStart: function (e) {
      for (var i in (console.log("触摸开始"),
      (this.lx = e.touches[0].clientX),
      (this.ly = e.touches[0].clientY),
      t))
        t[i].active = !1;
      console.log("页面大小==" + 0.05 * wx.getSystemInfoSync().windowWidth);
      var a = {
        id: t.length + 1,
        x: this.lx - this.data.videoLeft,
        y: this.ly - this.data.videoTop,
        width: 0,
        height: 0,
        active: !0,
      };
      (o = t.length), console.log(a), t.push(a);
    },
    drawMove: function (e) {
      console.log("index==" + o),
        (this._lx = e.touches[0].clientX),
        (this._ly = e.touches[0].clientY),
        (this.dragLengthX = this._lx - this.lx),
        (this.dragLengthY = this._ly - this.ly),
        (t[o].width = this.dragLengthX),
        (t[o].height = this.dragLengthY),
        this.setData({ itemList: t });
    },
    onLoad: function (t) {},
    getScale1: function (t, o) {
      var e,
        i,
        a = 0,
        n = 0,
        l = t,
        s = o,
        c = s / l,
        h = (wx.createSelectorQuery(), this);
      (i = 0.88 * wx.getSystemInfoSync().windowHeight),
        (e = wx.getSystemInfoSync().windowWidth),
        console.log("view的高：" + i + "===view的宽" + e),
        c < i / e ? ((a = e), (n = (e * s) / l)) : ((n = i), (a = (i * l) / s)),
        console.log("图片显示的大小" + a + "--" + n),
        (h.startY = i / 2 - n / 2),
        (h.startX = e / 2 - a / 2),
        h.setData({
          videoW: a,
          videoH: n,
          videoLeft: h.startX,
          videoTop: h.startY,
        });
    },
    getVideo: function () {
      var o = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success: function (e) {
          var i;
          o.getScale1(e.width, e.height),
            (i = {
              id: t.length + 1,
              width: 100,
              height: 35,
              active: !0,
              y: 5,
              color: Math.floor(256 * Math.random()).toString(16),
              x: 5,
            }),
            t.push(i),
            o.setData({
              itemList: t,
              remark: !0,
              video: e.tempFilePath,
              duration: Math.floor(e.duration),
              originVideoH: e.height,
              originVideoW: e.width,
              save: !0,
            });
        },
      });
    },
    addText: function () {
      this.data.itemList, console.log("添加");
      for (var o = 0; o < t.length; o++) t[o].active = !1;
      var e = {
        id: t.length + 1,
        width: 100,
        height: 30,
        active: !0,
        top: 0,
        color: Math.floor(256 * Math.random()).toString(16),
        left: 0,
      };
      t.push(e), console.log(t), this.setData({ itemList: t, remark: !0 });
    },
    WraptouchStart: function (e) {
      console.log("移动------------------------------------"),
        console.log("点击的id" + e.currentTarget.dataset.id),
        console.log(t);
      for (var i = 0; i < t.length; i++)
        (t[i].active = !1),
          e.currentTarget.dataset.id == t[i].id && (t[(o = i)].active = !0);
      (t[o].lx = e.touches[0].clientX),
        (t[o].ly = e.touches[0].clientY),
        this.setData({ itemList: t });
    },
    WraptouchMove: function (e) {
      (t[o]._lx = e.touches[0].clientX),
        (t[o]._ly = e.touches[0].clientY),
        (t[o].x += t[o]._lx - t[o].lx),
        (t[o].y += t[o]._ly - t[o].ly),
        t[o].x < 0 && (t[o].x = 0),
        this.data.videoW,
        t[o].width,
        t[o].y < 0 && (t[o].y = 0),
        (t[o].lx = e.touches[0].clientX),
        (t[o].ly = e.touches[0].clientY),
        this.setData({ itemList: t });
    },
    drawEnd: function () {
      console.log("hhhh------------");
    },
    dragPointStart: function (e) {
      for (var i = 0; i < t.length; i++)
        (t[i].active = !1),
          e.currentTarget.dataset.id == t[i].id && (t[(o = i)].active = !0);
      (t[o].lx = e.touches[0].clientX),
        (t[o].ly = e.touches[0].clientY),
        this.setData({ itemList: t });
    },
    dragPointMove: function (e) {
      console.log("缩放"),
        (t[o]._lx = e.touches[0].clientX),
        (t[o]._ly = e.touches[0].clientY),
        (t[o].width += t[o]._lx - t[o].lx),
        (t[o].height += t[o]._ly - t[o].ly),
        t[o].width < 10 && (t[o].width = 10),
        t[o].height < 10 && (t[o].height = 10),
        (t[o].lx = e.touches[0].clientX),
        (t[o].ly = e.touches[0].clientY),
        this.setData({ itemList: t });
    },
    onReady: function () {
      this.videoC = wx.createVideoContext("myvideo");
    },
    ShowProgress: function () {
      this.myprogress.showDialog();
    },
    _cancelPress: function () {
      console.log("你点击了取消"), this.myprogress.hideDialog();
    },
    pauseVideo: function () {
      this.videoC.pause(), this.data.play, this.setData({ play: !0 });
    },
    playVideo: function () {
      this.videoC.play(), this.setData({ play: !1 });
    },
    seeStatus: function () {
      console.log(this.videoC.play());
    },
    end: function () {
      console.log("播放结束"), this.setData({ play: !0 });
    },
    getTimer: function (t) {
      var o = t.detail.currentTime,
        e = Math.floor(o);
      console.log(e), this.setData({ timer: e });
    },
    slider3change: function (t) {
      t.value = this.data.timer;
    },
    seekVideo: function (t) {
      this.videoC.seek(10);
    },
    login: function (t) {
      var o = this;
      wx.login({
        success: function (t) {
          o.upload(t.code);
        },
        fail: function (t) {
          console.log("提交参数缺少，联系客服咨询！2"),
            o.showModal("信息获取失败，请联系客服咨询");
        },
      });
    },
    showModal: function (t) {
      wx.hideLoading(),
        wx.showModal({
          title: "温馨提示",
          content: t,
          confirmText: "知道了",
          confirmColor: "#1AAD19",
          showCancel: !1,
          success: function (t) {},
        });
    },
    upload: function (t) {
      var o = this;
      wx.showLoading({ title: "上传中" }),
        wx.uploadFile({
          url: "https://qrcode.layzz.cn/upload/file",
          filePath: o.data.video,
          name: "file",
          method: "POST",
          code: t,
          success: function (e) {
            console.log(e.data);
            var i = JSON.parse(e.data);
            console.log(i.data), o.toRemove(i.data, t);
          },
          fail: function (t) {
            console.log(t),
              o.showModal(
                "错误，原因：1.可能服务器拥堵，可尝试重新上传操作2.（上传视频时长超过小程序规定的时长(1分钟) ，解决方法：1.前往修改视频页面勾选压缩上传，2.早上上传，避免上传高峰期）"
              );
          },
          complete: function () {
            wx.hideLoading();
          },
        });
    },
    toRemove: function (o, e) {
      var i = this,
        a = "";
      wx.showLoading({ title: "去除水印中" }),
        (i.initRatio = i.data.videoH / i.data.originVideoH),
        console.log("显示比例" + i.initRatio);
      for (var n = "", l = 0; l < t.length; l++)
        n =
          n +
          (0 == n ? "" : ",") +
          '{"x":' +
          (t[l].x / i.initRatio).toFixed(0) +
          ',"y":' +
          (t[l].y / i.initRatio).toFixed(0) +
          ',"w":' +
          (t[l].width / i.initRatio).toFixed(0) +
          ', "h":' +
          (t[l].height / i.initRatio).toFixed(0) +
          "}";
      (a = n.split(","))[0].split(":")[1], a[0].split(":")[1];
      var s = "[" + n + "]";
      console.log(s),
        wx.request({
          url: "https://qrcode.layzz.cn/upload/clearVideo",
          method: "POST",
          data: { locations: JSON.stringify(s), filePath: o, code: e },
          header: { "content-type": "application/json" },
          success: function (t) {
            console.log(t),
              (getApp().globalData.playAddr = t.data.data),
              wx.navigateTo({ url: "../videoInfo/videoInfo" });
          },
          fail: function (t) {
            console.log(t);
          },
          complete: function () {
            wx.hideLoading({});
          },
        });
    },
    play: function () {
      this.setData({ play: !1 });
    },
    back: function () {
      wx.navigateBack({ complete: function (t) {} });
    },
    deleteItem: function (o) {
      console.log("删除按钮:", o);
      for (var e = 0; e < t.length; e++)
        o.currentTarget.dataset.id == t[e].id &&
          (t.splice(e, 1), this.setData({ itemList: t }));
    },
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {
      console.log("这里是关闭也remove页面"),
        this.downloadTask && this.downloadTask.abort(),
        this.uploadPro && this.uploadPro.abort(),
        (t = new Array()),
        this.setData({ itemList: [] });
    },
  });
})();
