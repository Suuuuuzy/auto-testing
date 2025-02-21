var t = getApp(),
  a = "",
  e = "";
Page({
  Actions: [],
  ctx: "",
  oldXY: "",
  type: 1,
  data: {
    penSize: 12,
    penColor: "#ff700f",
    image: "",
    box_data: "",
    box_item: [],
    play: !1,
    box_active_index: 1,
    url: "",
  },
  onLoad: function (t) {
    this.setData({ isSeo: !!t.seo, type: t.type ? t.type : 1 }), this.init(t);
  },
  init: function (t) {
    console.log("初始化"), wx.showLoading({ title: "加载中..." });
    var a = this,
      o = t;
    wx.createSelectorQuery()
      .select(".cropper-wrapper")
      .boundingClientRect(function (i) {
        var s = {};
        (s.scale = (i.height - 20) / o.height),
          (s.w = parseFloat((o.width * s.scale).toFixed(0))),
          i.width - 20 < s.w &&
            ((s.scale = (i.width - 20) / o.width),
            (s.w = parseFloat((o.width * s.scale).toFixed(0)))),
          (s.h = parseFloat((o.height * s.scale).toFixed(0))),
          a.setData({
            box_data: s,
            image: o,
            url: decodeURIComponent(t.url),
            box_item: [
              { w: 120, h: 60, x: (s.w - 120) / 2, y: (s.h - 60) / 2 },
            ],
            box_active_index: 0,
          }),
          (e = wx.createVideoContext("mp4")),
          wx.hideLoading();
      })
      .exec();
  },
  del: function () {
    for (
      var t = this,
        a = t.data.box_item,
        e = t.data.box_active_index,
        o = [],
        i = 0;
      i < a.length;
      i++
    )
      i != e && o.push(a[i]);
    t.setData({
      box_item: o,
      box_active_index: o.length > 0 ? o.length - 1 : null,
    });
  },
  play: function () {
    var t = this;
    t.data.play ? e.pause() : e.play(), t.setData({ play: !t.data.play });
  },
  touchStart: function (t) {
    var a = this,
      e = a.data.box_item;
    "move" == t.target.dataset.type &&
      a.setData({ box_active_index: t.target.dataset.index });
    var o = a.data.box_active_index;
    a.oldXY = [
      t.touches[0].pageX,
      t.touches[0].pageY,
      e[o].w,
      e[o].h,
      e[o].x,
      e[o].y,
    ];
  },
  touchMove: function (t) {
    var a = this,
      e = a.data.box_item,
      o = a.data.box_active_index;
    "move" == t.target.dataset.type
      ? ((e[o].x = a.oldXY[4] + t.touches[0].pageX - a.oldXY[0]),
        (e[o].y = a.oldXY[5] + t.touches[0].pageY - a.oldXY[1]),
        (e[o].x = e[o].x > 1 ? e[o].x : 1),
        (e[o].y = e[o].y > 1 ? e[o].y : 1),
        (e[o].x =
          e[o].x + e[o].w < a.data.box_data.w
            ? e[o].x
            : a.data.box_data.w - e[o].w - 1),
        (e[o].y =
          e[o].y + e[o].h < a.data.box_data.h
            ? e[o].y
            : a.data.box_data.h - e[o].h - 1))
      : ((e[o].w = a.oldXY[2] + t.touches[0].pageX - a.oldXY[0]),
        (e[o].h = a.oldXY[3] + t.touches[0].pageY - a.oldXY[1]),
        (e[o].w =
          e[o].x + e[o].w < a.data.box_data.w
            ? e[o].w
            : a.data.box_data.w - e[o].x - 1),
        (e[o].h =
          e[o].y + e[o].h < a.data.box_data.h
            ? e[o].h
            : a.data.box_data.h - e[o].y - 1)),
      a.setData({ box_item: e });
  },
  touchMoveDraw: function (t) {
    console.log(t);
    var e = this;
    "" == a
      ? ((a = "add"),
        e.addItem({
          w: 0,
          h: 0,
          x: t.touches[0].pageX - t.target.offsetLeft,
          y: t.touches[0].pageY - t.target.offsetTop,
        }),
        e.touchStart(t))
      : e.touchMove(t);
  },
  touchEndDraw: function () {
    a = "";
  },
  addItem: function (t) {
    var a = this;
    a.setData({
      box_item: a.data.box_item.concat(t),
      box_active_index: a.data.box_item.length,
    });
  },
  complete: function () {
    var a = this,
      e = {};
    if (0 == a.data.box_item.length)
      return (
        wx.showToast({ title: "请框选视频水印", icon: "none", mask: !0 }), !1
      );
    if ("2" == a.data.type)
      return (
        wx.requestSubscribeMessage({
          tmplIds: [t.tmp],
          success: function (o) {
            (e.box_item = a.data.box_item),
              (e.scale = a.data.box_data.scale),
              wx.setStorageSync("waterData", e),
              wx.setStorageSync("isMsg", "accept" == o[t.tmp] || null),
              wx.navigateBack({ delta: 1 });
          },
          fail: function (t) {
            (e.box_item = a.data.box_item),
              (e.scale = a.data.box_data.scale),
              wx.setStorageSync("waterData", e),
              wx.setStorageSync("isMsg", null),
              wx.navigateBack({ delta: 1 });
          },
        }),
        !1
      );
    wx.showLoading({ title: "生成中...", mask: !0 }),
      (e.box_item = JSON.stringify(a.data.box_item)),
      (e.scale = a.data.box_data.scale),
      (e.timestamp = Date.parse(new Date()) / 1e3);
    var o = {};
    (o.timestamp = e.timestamp),
      t.getSign(o).then(function (t) {
        (e.sign = t),
          wx.uploadFile({
            url: "https://water.quanminyouxi.cn/",
            filePath: a.data.url,
            name: "files",
            formData: e,
            success: function (t) {
              wx.hideLoading(), console.log(t.data);
              var e = JSON.parse(t.data);
              "1" == e.code
                ? wx.navigateTo({
                    url:
                      "/pages/video/res/res?url=" +
                      e.data +
                      (a.data.isSeo ? "&seo=1" : ""),
                  })
                : wx.showToast({ title: e.data, icon: "none", mask: !0 });
            },
            fail: function (t) {
              wx.hideLoading(),
                wx.showToast({
                  title: "系统繁忙，稍后重试",
                  icon: "none",
                  mask: !0,
                }),
                console.log(t);
            },
          });
      });
  },
  onShareAppMessage: function (t) {
    return {
      title: "一键视频去除水印工具",
      path: "/pages/video/draw/draw?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/tu-share-2.jpg",
    };
  },
});
