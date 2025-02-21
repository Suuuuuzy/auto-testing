var t = getApp();
Page({
  Actions: [],
  ctx: "",
  oldXY: "",
  data: {
    penSize: 20,
    penColor: "#ff700f",
    image: "",
    box_data: "",
    adMsgState: !1,
  },
  onLoad: function (t) {
    this.setData({ isSeo: !!t.seo });
    var e = wx.getStorageSync("forwardMaterials");
    e
      ? (this.init(e[0].path), wx.setStorageSync("forwardMaterials", null))
      : this.init(t.url);
  },
  init: function (e) {
    (e = decodeURIComponent(e)),
      console.log("初始化"),
      wx.showLoading({ title: "加载中..." });
    var a = this;
    wx.getImageInfo({
      src: e,
      success: function (t) {
        a._init(t);
      },
      fail: function () {
        wx.getImageInfo({
          src: t.downHost + "/head.php?url=" + encodeURIComponent(e),
          success: function (t) {
            a._init(t);
          },
          fail: function () {
            wx.hideLoading(),
              wx.showToast({ title: "图片加载失败", icon: "none" });
          },
        });
      },
    });
  },
  _init: function (t) {
    var e = this;
    wx.createSelectorQuery()
      .select(".cropper-wrapper")
      .boundingClientRect(function (a) {
        var i = {};
        (i.scale = (a.height - 20) / t.height),
          (i.w = parseFloat((t.width * i.scale).toFixed(0))),
          a.width - 20 < i.w &&
            ((i.scale = (a.width - 20) / t.width),
            (i.w = parseFloat((t.width * i.scale).toFixed(0)))),
          (i.h = parseFloat((t.height * i.scale).toFixed(0))),
          e.setData({ box_data: i, image: t }),
          wx.hideLoading();
      })
      .exec();
  },
  clear: function () {
    console.log("清空画布"),
      this.ctx.clearRect(0, 0, this.data.box_data.w, this.data.box_data.h),
      this.ctx.draw();
  },
  onReady: function () {
    this.ctx = wx.createCanvasContext("draw");
  },
  touchStartDraw: function (t) {
    var e = this.ctx;
    e.setLineCap("round"),
      e.setLineJoin("round"),
      (this.oldXY = [t.touches[0].x, t.touches[0].y]);
    var a = [
      {
        color: this.data.penColor,
        size: this.data.penSize,
        lines: [
          {
            start: { x: t.touches[0].x, y: t.touches[0].y },
            end: { x: t.touches[0].x, y: t.touches[0].y },
          },
        ],
      },
    ];
    (this.Actions = this.Actions.concat(a)),
      this.onDraw(
        t.touches[0].x,
        t.touches[0].y,
        this.oldXY[0],
        this.oldXY[1],
        this.data.penColor,
        this.data.penSize,
        0
      );
  },
  touchMoveDraw: function (t) {
    this.onDraw(
      t.touches[0].x,
      t.touches[0].y,
      this.oldXY[0],
      this.oldXY[1],
      this.data.penColor,
      this.data.penSize,
      0
    );
    var e = [
      {
        start: { x: this.oldXY[0], y: this.oldXY[1] },
        end: { x: t.touches[0].x, y: t.touches[0].y },
      },
    ];
    this.Actions[this.Actions.length - 1].lines =
      this.Actions[this.Actions.length - 1].lines.concat(e);
  },
  onDraw: function (t, e, a, i, s, o, n) {
    this.ctx.setStrokeStyle(s),
      this.ctx.setLineWidth(o),
      this.ctx.moveTo(a, i),
      this.ctx.lineTo(t, e),
      this.ctx.stroke(),
      this.ctx.draw(!0),
      (this.oldXY = [t, e]);
  },
  complete: function () {
    var e = this,
      a = {};
    wx.showLoading({ title: "生成中..." }),
      wx.canvasToTempFilePath({
        canvasId: "draw",
        destWidth: e.data.image.width,
        destHeight: e.data.image.height,
        success: function (i) {
          wx.getFileSystemManager().readFile({
            filePath: e.data.image.path,
            encoding: "base64",
            success: function (s) {
              (a.img = s.data),
                wx.getFileSystemManager().readFile({
                  filePath: i.tempFilePath,
                  encoding: "base64",
                  success: function (i) {
                    (a.shade = i.data),
                      console.log(123),
                      wx.hideLoading(),
                      e.setData({ adMsgState: !0 });
                    var s = {};
                    (s.timestamp = Date.parse(new Date()) / 1e3),
                      (a.timestamp = s.timestamp),
                      t.getSign(s).then(function (i) {
                        (a.sign = i),
                          t.postData(
                            t.apiurl + "/imgapi/onimg",
                            a,
                            function (a) {
                              t.base64src(
                                "data:image/jpeg;base64," + a.data,
                                function (t) {
                                  console.log(123),
                                    wx.getImageInfo({
                                      src: t,
                                      success: function (t) {
                                        e.setData({ adMsgState: !1 }),
                                          wx.navigateTo({
                                            url:
                                              "/pages/img/res/res?url=" +
                                              t.path +
                                              (e.data.isSeo ? "&seo=1" : ""),
                                          });
                                      },
                                      fail: function (t) {
                                        e.setData({ adMsgState: !1 }),
                                          console.log(t);
                                      },
                                    });
                                }
                              );
                            },
                            function (t) {
                              e.setData({ adMsgState: !1 }), console.log(t);
                            }
                          );
                      });
                  },
                });
            },
          });
        },
      });
  },
  onShareAppMessage: function (t) {
    return {
      title: "一键图片去除水印工具",
      path: "/pages/img/img?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/tu-share.jpg",
    };
  },
});
