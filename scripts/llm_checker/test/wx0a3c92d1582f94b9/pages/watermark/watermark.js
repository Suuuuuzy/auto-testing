require("../../utils/md5.js");
var t,
  a = getApp(),
  e = "",
  o = "",
  n = "",
  s = "",
  i = !1,
  r = "将短视频分享的网址链接，粘贴到这里就能去水印了！（支持视频和图集提取）",
  d = 0,
  c = "";
Page({
  data: {
    src: "",
    adState: 0,
    name: a.name,
    showPrivacy: !1,
    recommendListData: "",
    link: "",
    beyond: "",
    problem: [],
    ad_day: !1,
    autocopy: !1,
    showSph: !1,
    autodown: !1,
    ad_num: 0,
    isInvest: !1,
    invest_msg: "",
    VideoHandleMoney: 0,
    error: "",
    indexLink: "",
    isShowDownload: !1,
    isShowSph: !1,
    sph: {},
    hotData: [],
    isfullScreen: !1,
    isShow: !1,
    isAd: !0,
    title: "",
    xcx: [],
    errormoney: "",
    vipState: !1,
    task: {},
    conversion: "",
    conversionNum: 0,
    conversionShow: !1,
    adMsgState: !1,
    adStates: 2,
    showTag: 0,
    conversion_Num: 5,
    state: !1,
    imgUrls: [],
    type: "",
    progress: 0,
    userInfo: {},
    waterData: "",
    isSeo: !1,
    viphandle: [],
    ad_banner: a.ad_banner,
    ad_video: a.ad_video,
    tab: {},
    isCopyUrl: !0,
    saveType: "save",
    isCut: !1,
    isWater: !1,
    showHistory: !1,
    investShow: a.investShow,
    msg: r,
    isMsg: !1,
  },
  videoContext: "",
  goHistory: function () {
    this.closeHistory(),
      wx.navigateTo({ url: "/pages/history/history?type=2" });
  },
  closeHistory: function () {
    this.setData({ showHistory: !1 });
  },
  onCut: function () {
    this.setData({ isCut: !this.data.isCut });
  },
  _pay: function (t) {
    i || (a._pay(), (i = !0));
  },
  onWater: function () {
    var t = this;
    if ((this.setData({ isWater: !this.data.isWater }), this.data.isWater)) {
      var e = {};
      (e.url = this.data.src),
        wx.showLoading({ title: "获取视频信息", mask: !0 }),
        a.postData(
          "https://douyin.ddfans.com/douyin/onGetVideoInfo.php",
          e,
          function (a) {
            wx.hideLoading(),
              wx.navigateTo({
                url:
                  "/pages/video/draw/draw?url=" +
                  encodeURIComponent(t.data.src) +
                  "&width=" +
                  a.data.width +
                  "&type=2&height=" +
                  a.data.height +
                  (t.data.isSeo ? "&seo=1" : ""),
              });
          }
        );
    }
  },
  onShow: function () {
    var t = this;
    !t.data.sign && a.sign, console.log(111);
    var e = wx.getStorageSync("waterData");
    console.log(e),
      e
        ? (t.setData({ waterData: e, isMsg: !!wx.getStorageSync("isMsg") }),
          wx.setStorageSync("isMsg", null),
          wx.setStorageSync("waterData", null),
          t.data.vipState && ((c = ""), (n = ""), t.onDownload("vip")))
        : t.setData({ isWater: !1 }),
      wx.getStorageSync("token") &&
        "" != wx.getStorageSync("token") &&
        t.setData({ userInfo: a.userinfo, isAd: 1 != a.userinfo.level });
    var o = wx.getStorageSync("conversion"),
      s = Date.parse(new Date()) / 1e3;
    o &&
      (s < o.time
        ? t.setData({ conversionNum: o.num })
        : wx.setStorageSync("conversion", null)),
      t.setData({
        autodown: !1 !== wx.getStorageSync("autodown"),
        autocopy: !!wx.getStorageSync("autocopy"),
      }),
      console.log("adTime", wx.getStorageSync("autocopy_num")),
      t.data.autocopy &&
        (wx.getStorageSync("autocopy_num") &&
        wx.getStorageSync("autocopy_num") >= 5
          ? wx.getClipboardData({
              success: function (e) {
                var o = e.data;
                if (a.isURL(o) && t.data.link != o) {
                  wx.showModal({
                    title: "是否解析该链接",
                    content: o.match(
                      /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
                    )[0],
                    confirmText: "解析",
                    success: function (a) {
                      a.confirm &&
                        (t.setData({ link: o, isShow: !1, vipState: !1 }),
                        (d = 0),
                        t.onWatermark());
                    },
                  });
                }
              },
            })
          : wx.showModal({
              title: "",
              content: "是否复制粘贴板内容去水印",
              confirmText: "解析",
              success: function (e) {
                e.confirm
                  ? (wx.getStorageSync("autocopy_num")
                      ? wx.getStorageSync("autocopy_num") < 5 &&
                        wx.setStorageSync(
                          "autocopy_num",
                          wx.getStorageSync("autocopy_num") + 1
                        )
                      : wx.setStorageSync("autocopy_num", 1),
                    wx.getClipboardData({
                      success: function (e) {
                        var o = e.data;
                        a.isURL(o) && t.data.link != o
                          ? (t.setData({ link: o, isShow: !1, vipState: !1 }),
                            (d = 0),
                            t.onWatermark())
                          : wx.showToast({
                              title: "没有检查到链接",
                              icon: "none",
                              mask: !0,
                            });
                      },
                    }))
                  : e.cancel;
              },
            }));
    (o = wx.getStorageSync("adTask")), (s = Date.parse(new Date()) / 1e3);
    console.log("adTask", o),
      o &&
        (s < o.time
          ? t.setData({ ad_num: o.num })
          : wx.setStorageSync("adTask", null));
  },
  copyUrl: function (t) {
    var e = this;
    if ("" != e.data.link) return e.onWatermark(), !1;
    wx.getClipboardData({
      success: function (o) {
        var n = o.data;
        e.setData({ isCopyUrl: !1 }),
          a.isURL(n) && e.data.link != n
            ? (e.setData({ link: n, isShow: !1, isCopyUrl: !1, vipState: !1 }),
              (d = 0))
            : "copy" == t.currentTarget.dataset.type &&
              wx.showToast({ title: "没读取到链接，请重新复制", icon: "none" }),
          e.onWatermark();
      },
      fail: function (t) {
        console.log(t);
      },
    });
  },
  onAutocopy: function (t) {
    this.setData({ autocopy: t.detail.value }),
      wx.setStorageSync("autocopy", t.detail.value);
  },
  onAutodown: function (t) {
    this.setData({ autodown: t.detail.value }),
      wx.setStorageSync("autodown", t.detail.value);
  },
  onHide: function () {
    clearTimeout(t), clearTimeout(void 0);
  },
  copyIndexUrl: function () {
    var t = this;
    wx.getClipboardData({
      success: function (e) {
        var o = e.data;
        a.isURL(o)
          ? t.setData({ indexLink: o, isShow: !1, vipState: !1 })
          : wx.showToast({ title: "未检测到链接", icon: "none" });
      },
    });
  },
  vipStateShow: function () {
    wx.setStorageSync("link", this.data.src),
      wx.switchTab({ url: "/pages/video/video" });
  },
  vipStateHide: function () {
    this.setData({ vipState: !1 });
  },
  copyLink2: function () {
    this.setData({ beyond: "" }),
      wx.setClipboardData({
        data: this.data.link,
        success: function (t) {
          wx.showToast({ title: "链接复制成功！", icon: "none" });
        },
      });
  },
  copyLink: function () {
    var t = this;
    t.setData({ beyond: "" }),
      wx.setClipboardData({
        data: t.data.src,
        success: function (a) {
          wx.showToast({
            title:
              "链接复制成功！" +
              (i || "0" != t.data.userInfo.level ? "" : " -1无印豆"),
            icon: "none",
          }),
            t._pay();
        },
      });
  },
  onLoad: function (t) {
    var e = this;
    e.setData({ isSeo: !(!t || !t.seo) }),
      wx.onNeedPrivacyAuthorization &&
        (wx.onNeedPrivacyAuthorization(function (t) {
          e.setData({ showPrivacy: !0 }), (e.resolvePrivacyAuthorization = t);
        }),
        wx.requirePrivacyAuthorize({
          success: function () {},
          fail: function () {},
          complete: function () {},
        })),
      console.log(wx.getStorageSync("token")),
      "" != a.userinfo
        ? this.init(t)
        : (a.checkGetSignCallback = function (a) {
            wx.hideLoading(), e.onShow(), e.init(t);
          });
  },
  handleAgreePrivacyAuthorization: function () {
    this.setData({ showPrivacy: !1 }),
      this.resolvePrivacyAuthorization({
        buttonId: "agree-btn",
        event: "agree",
      });
  },
  openPrivacy: function () {
    wx.openPrivacyContract({
      success: function () {},
      fail: function () {},
      complete: function () {},
    });
  },
  exitMini: function () {
    wx.exitMiniProgram({ success: function (t) {} });
  },
  init: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      e = this;
    wx.showShareMenu({ withShareTicket: !0 });
    var o = {};
    a.postData(a.apiurl + "/api/onGetXcxConfig", o, function (o) {
      (a.moneyData = o.data.money),
        (a.isInvest = o.data.isInvest),
        (a.invest_msg = o.data.invest_msg),
        (a.downHost = o.data.downHost),
        (a.showadappid = o.data.showadappid),
        e.setData({
          viphandle: o.data.handle,
          adStates: o.data.state,
          problem: o.data.problem,
          sph: o.data.sph,
          showSph: o.data.showSph,
          ad_day: o.data.qsy_w_ad_day,
          conversion_Num: o.data.conversion_num,
          imgUrls: o.data.data,
          xcx: o.data.xcx,
          VideoHandleMoney: o.data.VideoHandleMoney,
          invest_msg: o.data.invest_msg,
          isInvest: o.data.isInvest,
        }),
        "comment" == t.type && wx.navigateTo({ url: "/pages/comment/comment" });
    }),
      (8777 != t.type && 8777 != wx.getStorageSync("type")) ||
        (wx.setStorageSync("type", "8777"), e.setData({ state: !0 })),
      (e.videoContext = wx.createVideoContext("myVideo")),
      (s = wx.createRewardedVideoAd({ adUnitId: a.ad_jili })).onError(function (
        t
      ) {
        s = "";
      }),
      s.onClose(function (t) {
        !t.isEnded &&
        Date.parse(new Date()) / 1e3 - wx.getStorageSync("showAdTimeOn") < 30
          ? (wx.hideLoading(),
            wx.showModal({
              title: "提示",
              content: "广告任务\n需看完广告才能行喔",
              success: function (t) {
                t.confirm &&
                  (wx.setStorageSync(
                    "showAdTimeOn",
                    Date.parse(new Date()) / 1e3
                  ),
                  s.show());
              },
            }))
          : e._onAd();
      }),
      s.load(),
      e.setData({ isSeo: !!t.seo }),
      t.url && wx.navigateTo({ url: decodeURIComponent(t.url) });
  },
  goHtml: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.navigateTo({ url: "/pages/url/url?url=" + a });
  },
  _onAd: function () {
    var t = this;
    wx.showLoading({ title: "加载中..", mask: !0 }),
      a.postData(a.apiurl + "/user/onShowAd", {}, function (a) {
        wx.showToast({ title: a.msg, icon: "none" }),
          setTimeout(function () {
            t._handle();
          }, 2e3);
      });
  },
  vipHandle: function (t) {
    n = "";
    var a = t.currentTarget.dataset.i,
      e = this.data.viphandle;
    if (0 != a) {
      if (((e[a].state = !e[a].state), e[a].name && e[a].state))
        for (var o in e) o != a && e[a].name == e[o].name && (e[o].state = !1);
      this.setData({ viphandle: e }), (c = "");
    }
  },
  onUnload: function () {},
  onInput: function (t) {
    this.setData({ link: t.detail.value }), (d = 0);
  },
  onInputIndex: function (t) {
    this.setData({ indexLink: t.detail.value });
  },
  clearInput: function (t) {
    this.setData({ link: "", msg: r, isShow: !1, isCopyUrl: !0 });
  },
  isShowDownload: function () {
    this.setData({ isShowDownload: !0 });
  },
  isHideDownload: function () {
    this.setData({ isShowDownload: !1, isShowSph: !1, errormoney: "" });
  },
  noAd: function () {
    this.isHideDownload(),
      wx.setStorageSync("showVip", !0),
      wx.switchTab({ url: "/pages/user/user" });
  },
  noAd2: function () {
    this.isHideDownload(),
      wx.setStorageSync("invest", !0),
      wx.setStorageSync("showVip", !0),
      wx.switchTab({ url: "/pages/user/user" });
  },
  vipDown: function () {
    if (
      (this.setData({
        saveType: this.data.isCut || this.data.isWater ? "edit" : "save",
      }),
      this.data.src,
      this.setData({ type: "vipDown", typeMsg: "下载" }),
      !0,
      (!wx.getStorageSync("adTime") ||
        Date.parse(new Date()) / 1e3 - wx.getStorageSync("adTime") >
          a.ad_time) &&
        this.data.isAd &&
        "" != s &&
        "function" == typeof s.show &&
        !this.data.isSeo)
    ) {
      if (
        (wx.hideLoading(),
        this.setData({ adState: "on" }),
        !this.data.isShowDownload)
      )
        return this.isShowDownload(), !1;
      this.isHideDownload(),
        wx.setStorageSync("showAdTimeOn", Date.parse(new Date()) / 1e3),
        s.show();
    } else this.onDownload();
  },
  showAd: function () {
    var t = wx.getStorageSync("adTask");
    a.get24Time();
    !t || t.num < 3
      ? ((e = ""),
        this.setData({ type: "" }),
        wx.setStorageSync("showAdTimeOn", Date.parse(new Date()) / 1e3),
        s.show())
      : wx.showToast({ title: "今日任务已完成！", icon: "none" });
  },
  onShowMsg: function (t) {
    wx.previewImage({ urls: [t.currentTarget.dataset.img] });
  },
  isShowAd: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      n = this;
    (e =
      "" != t && t.currentTarget.dataset.type
        ? t.currentTarget.dataset.type
        : e),
      (o =
        "" != t && t.currentTarget.dataset.url
          ? t.currentTarget.dataset.url
          : o);
    var s = "",
      r =
        "" != t && t.currentTarget.dataset.savetype
          ? t.currentTarget.dataset.savetype
          : n.data.saveType;
    switch (e) {
      case "onDownload":
        s = "edit" == r ? "剪辑" : "下载";
        break;
      case "onCopyTitle":
      case "onCopyConversion":
        s = "复制";
        break;
      case "onDownImgs":
      case "onDownImg":
        s = "下载";
        break;
      case "onShowImg":
        s = "查看";
        break;
      default:
        s = "复制";
    }
    if (
      (n.setData({
        type: e,
        saveType: r,
        typeMsg: s,
        isCut: ("" == t || !t.currentTarget.dataset.savetype) && n.data.isCut,
        isWater:
          ("" == t || !t.currentTarget.dataset.savetype) && n.data.isWater,
      }),
      !i && 0 == a.userinfo.level)
    )
      return (
        n.data.isShowDownload
          ? (n.isHideDownload(), n._handle())
          : (wx.showLoading({ title: "加载中", mask: !0 }),
            a.postData(
              a.apiurl + "/user/onCheckPay",
              {},
              function (t) {
                console.log(t);
                var a = n.data.userInfo;
                (a.money = t.data),
                  n.setData({ userInfo: a, task: t.task }),
                  n.data.autodown && t.data >= 1
                    ? n._handle()
                    : n.isShowDownload();
              },
              function (t) {
                n.setData({ errormoney: t.msg, task: t.task });
              }
            )),
        !1
      );
    n._handle();
  },
  showTaskAd: function () {
    this.setData({ errormoney: "" }),
      wx.setStorageSync("showAdTimeOn", Date.parse(new Date()) / 1e3),
      s.show();
  },
  _handle: function () {
    switch (e) {
      case "onDownload":
        this.onDownload();
        break;
      case "onCopyTitle":
        this.onCopyTitle();
        break;
      case "onCopyConversion":
        this.onCopyConversion();
        break;
      case "onDownImgs":
        this.onDownImgs();
        break;
      case "onDownImg":
        this.onDownImg(o);
        break;
      case "onShowImg":
        this.onShowImg(o);
        break;
      default:
        this.copyLink();
    }
  },
  isShowAd1: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      n = this;
    (e =
      "" != t && t.currentTarget.dataset.type
        ? t.currentTarget.dataset.type
        : e),
      (o =
        "" != t && t.currentTarget.dataset.url
          ? t.currentTarget.dataset.url
          : o);
    var i = "",
      r =
        "" != t && t.currentTarget.dataset.savetype
          ? t.currentTarget.dataset.savetype
          : n.data.saveType;
    switch (e) {
      case "onDownload":
        i = "edit" == r ? "剪辑" : "下载";
        break;
      case "onCopyTitle":
      case "onCopyConversion":
        i = "复制";
        break;
      case "onDownImgs":
      case "onDownImg":
        i = "下载";
        break;
      case "onShowImg":
        i = "查看";
        break;
      default:
        i = "复制";
    }
    n.setData({
      type: e,
      saveType: r,
      typeMsg: i,
      isCut: ("" == t || !t.currentTarget.dataset.savetype) && n.data.isCut,
      isWater: ("" == t || !t.currentTarget.dataset.savetype) && n.data.isWater,
    });
    var d = wx.getStorageSync("adTask");
    if (
      (!wx.getStorageSync("adTime") ||
        Date.parse(new Date()) / 1e3 - wx.getStorageSync("adTime") >
          a.ad_time) &&
      n.data.isAd &&
      "" != s &&
      "function" == typeof s.show &&
      !n.data.isSeo &&
      (!d || d.num < 3 || d.time < Date.parse(new Date()) / 1e3)
    ) {
      if (
        (wx.hideLoading(), n.setData({ adState: "on" }), !n.data.isShowDownload)
      )
        return n.isShowDownload(), !1;
      n.isHideDownload();
    } else
      switch (e) {
        case "onDownload":
          n.onDownload();
          break;
        case "onCopyTitle":
          n.onCopyTitle();
          break;
        case "onCopyConversion":
          n.onCopyConversion();
          break;
        case "onDownImgs":
          n.onDownImgs();
          break;
        case "onDownImg":
          n.onDownImg(o);
          break;
        case "onShowImg":
          n.onShowImg(o);
          break;
        default:
          n.copyLink();
      }
  },
  onCopyTitle: function () {
    var t = this;
    wx.setClipboardData({
      data: t.data.title,
      success: function (a) {
        wx.showToast({
          title:
            "文案复制成功" +
            (i || "0" != t.data.userInfo.level ? "" : " -1无印豆"),
          icon: "none",
        }),
          t._pay();
      },
    });
  },
  onCopyConversion: function () {
    var t = this;
    wx.setClipboardData({
      data: t.data.conversion,
      success: function (a) {
        wx.showToast({
          title:
            "文案复制成功" +
            (i || "0" != t.data.userInfo.level ? "" : " -1无印豆"),
          icon: "none",
        }),
          t._pay();
      },
    });
  },
  onShowImg: function (t) {
    var a = [];
    if ("" != this.data.images)
      for (var e in this.data.images) a.push(this.data.images[e]);
    else a.push(this.data.cover);
    wx.previewImage({ urls: a, current: t });
  },
  onDownImg: function (t) {
    var e = this,
      o = [];
    wx.showLoading({ title: "图片加载中...", mask: !0 }),
      console.log(t),
      wx.getImageInfo({
        src: t.replace("http://", "https://"),
        success: function (t) {
          console.log(t), o.push(t.path), e.onDownImgs(o);
        },
        fail: function (n) {
          console.log(n),
            wx.getImageInfo({
              src: a.downHost + "/head.php?url=" + encodeURIComponent(t),
              success: function (t) {
                o.push(t.path), e.onDownImgs(o);
              },
              fail: function (t) {
                console.log(t),
                  wx.hideLoading(),
                  wx.showToast({
                    title: "图片加载失败",
                    icon: "none",
                    mask: !0,
                  });
              },
            });
        },
      });
  },
  onDownImgs: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      a = this;
    0 == t.length
      ? (wx.showLoading({ title: "图片下载中...", mask: !0 }), a._getImages())
      : (wx.showLoading({ title: "图片保存中...", mask: !0 }),
        a._saveImg(0, t));
  },
  _saveImg: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      e = this;
    wx.saveImageToPhotosAlbum({
      filePath: a[t],
      success: function (o) {
        t >= a.length - 1
          ? (wx.hideLoading(),
            wx.showToast({
              title:
                "保存成功" +
                (i || "0" != e.data.userInfo.level ? "" : " -1无印豆"),
              mask: !0,
              icon: "none",
            }),
            e._pay())
          : e._saveImg(t + 1, a);
      },
      fail: function () {
        wx.hideLoading(), wx.previewImage({ current: "", urls: a });
      },
    });
  },
  _getImages: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      o = this;
    if (
      (console.log(t),
      0 == t || (o.data.images.length > 0 && o.data.images.length > t))
    ) {
      if (
        (wx.showLoading({ title: "图片下载(" + (t + 1) + ")", mask: !0 }),
        "" == o.data.images)
      )
        var n = o.data.cover;
      else n = o.data.images[t];
      wx.getImageInfo({
        src: n.replace("http://", "https://"),
        success: function (a) {
          console.log(a), e.push(a.path), o._getImages(t + 1, e);
        },
        fail: function (s) {
          wx.showLoading({ title: "图片下载(" + (t + 1) + ")", mask: !0 }),
            console.log(s),
            wx.getImageInfo({
              src: a.downHost + "/head.php?url=" + encodeURIComponent(n),
              success: function (a) {
                e.push(a.path), o._getImages(t + 1, e);
              },
              fail: function (a) {
                o._getImages(t + 1, e);
              },
            });
        },
      });
    } else {
      if ((wx.hideLoading(), 0 == e.length))
        return wx.showToast({ title: "暂无图片下载！", icon: "none" }), !1;
      o.onDownImgs(e);
    }
  },
  onWaterIndex: function () {
    var t = this.data.indexLink;
    if (!a.isURL(t))
      return (
        wx.showToast({ title: "请复制链接，口令无法解析", icon: "none" }), !1
      );
    (t = t.match(
      /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
    )),
      wx.setClipboardData({ data: "" }),
      wx.navigateTo({
        url: "./index/index?url=" + encodeURIComponent(this.data.indexLink),
      });
  },
  onFocus: function () {
    this.data.msg != r &&
      "" == this.data.link &&
      this.setData({ link: this.data.msg });
  },
  onWatermark: function () {
    var e = this;
    if (((c = ""), (n = ""), (i = !1), "" != e.data.link)) {
      var o = {},
        s = e.data.link;
      if (!a.isURL(s))
        return (
          wx.showToast({ title: "请复制链接，口令无法解析", icon: "none" }), !1
        );
      var r = e.data.adStates;
      wx.showLoading({ title: "正在解析...", mask: !0 }),
        e.setData({ conversion: "", isWater: !1, waterData: "", adStates: r }),
        (s = (s = s.match(
          /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
        ))[0]);
      var l = {};
      (l.link = s),
        (l.timestamp = Date.parse(new Date()) / 1e3),
        (l.sign = a.getSign(l)),
        a.postData(
          a.apiurl + "/api/onWater",
          l,
          function (n) {
            console.log(n), a.addHistory(e.data.link);
            var s = 8e3 - 1e3 * (Date.parse(new Date()) / 1e3 - o.timestamp);
            t = setTimeout(
              function () {
                l.link,
                  e.setData({
                    src: n.data.waterUrl.replace("http://", "https://"),
                    title: n.data.text,
                    link: "",
                    msg: e.data.link,
                    showTag: "" == n.data.waterUrl ? 1 : 0,
                    cover: n.data.cover,
                    images: n.data.images,
                    isShow: !0,
                    adMsgState: !1,
                  }),
                  wx.vibrateShort({ type: "heavy" }),
                  e.data.autodown &&
                    ("" != n.data.waterUrl
                      ? e.isShowAd({
                          currentTarget: { dataset: { type: "onDownload" } },
                        })
                      : e.isShowAd({
                          currentTarget: { dataset: { type: "onDownImgs" } },
                        }));
              },
              s > 0 ? s : 0
            );
          },
          function (t) {
            wx.vibrateShort({ type: "heavy" }),
              1114 == t.code
                ? e.setData({
                    adMsgState: !1,
                    link: "",
                    msg: e.data.link,
                    isShowSph: !0,
                  })
                : 0 == d && 1029 != t.code
                ? (e.setData({ adMsgState: 0, link: "", msg: e.data.link }),
                  (d = 1),
                  wx.showToast({ title: "再试一次!", icon: "none", mask: !0 }))
                : e.setData({
                    adMsgState: !1,
                    link: "",
                    msg: e.data.link,
                    error: t.msg,
                  });
          }
        );
    }
  },
  onConversionHide: function () {
    this.setData({ conversionShow: !1 });
  },
  onConversion: function () {
    var t = {},
      e = this;
    wx.getStorageSync("conversion"), Date.parse(new Date()), a.get24Time();
    if (e.data.conversion) return e.setData({ conversionShow: !0 }), !1;
    wx.showLoading({ title: "转换中...", mask: !0 }),
      (t.url = e.data.src),
      (t.timestamp = Date.parse(new Date()) / 1e3),
      (t.sign = a.getSign(t)),
      a.postData(
        "https://qsys.ddfans.com/water/public/index.php/index/index/TaskId",
        t,
        function (t) {
          console.log(t),
            wx.showLoading({ title: "获取结果", mask: !0 }),
            e.getConvarsion(t.data);
        }
      );
  },
  onSubtitle: function () {
    var t = {},
      e = this;
    wx.showLoading({ title: "正在上传...", mask: !0 }),
      (t.url = e.data.src),
      (t.timestamp = Date.parse(new Date()) / 1e3),
      (t.sign = a.getSign(t)),
      a.postData(a.apiurl + "/user/onUploadOss", t, function (t) {
        wx.hideLoading(),
          wx.requestSubscribeMessage({
            tmplIds: [a.tmp],
            success: function (t) {
              e.setData({ showHistory: !0 });
            },
          });
      });
  },
  getConvarsion: function (e) {
    var o = {},
      n = this;
    (o.id = e),
      a.postData(
        "https://qsys.ddfans.com/water/public/index.php/index/index/getret",
        o,
        function (o) {
          if (
            (console.log("结果", o),
            wx.hideLoading(),
            0 == o.status || "1" == o.status)
          )
            wx.showLoading({
              title: 0 == o.status ? "等待中..." : "处理中...",
              mask: !0,
            }),
              (t = setTimeout(function () {
                n.getConvarsion(e);
              }, 1e3));
          else if (2 == o.status) {
            n.setData({ conversion: o.data, conversionShow: !0 });
            var s = wx.getStorageSync("conversion"),
              i = Date.parse(new Date()) / 1e3,
              r = a.get24Time();
            if (s && i < s.time) {
              var d = { num: s.num + 1, time: s.time };
              n.setData({
                conversionNum:
                  s.num + 1 > n.data.conversion_Num
                    ? n.data.conversion_Num
                    : s.num + 1,
              }),
                wx.setStorageSync("conversion", d);
            } else {
              d = { num: 1, time: r };
              n.setData({ conversionNum: 1 }),
                wx.setStorageSync("conversion", d);
            }
          } else wx.showToast({ title: "转换失败！" });
        }
      );
  },
  vipDownload: function () {
    var t = this;
    t.setData({ saveType: t.data.isCut || t.data.isWater ? "edit" : "save" }),
      (n = ""),
      (c = ""),
      wx.requestSubscribeMessage({
        tmplIds: [a.tmp],
        success: function (e) {
          t.setData({ isMsg: "accept" == e[a.tmp] }), t.onDownload("vip");
        },
        fail: function () {
          t.setData({ isMsg: !1 }), t.onDownload("vip");
        },
      });
  },
  onDownload: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      e = this;
    if ("" == c)
      if ("" == n) {
        var o = {};
        if (
          (e.setData({ adState: 0 }),
          (o.downlink = e.data.src),
          "vip" == t || "vipDown" == e.data.type)
        ) {
          e.vipStateHide(),
            (o.token = wx.getStorageSync("token")),
            (o.type = e.data.isInvest ? "" : "ios"),
            (o.handle = []);
          var s = e.data.viphandle;
          for (var i in s) s[i].state && o.handle.push(s[i].code);
          e.data.isCut && o.handle.push("cut"),
            e.data.isWater &&
              (o.handle.push("onwater"),
              (o.waterData = JSON.stringify(e.data.waterData))),
            (o.handle = o.handle.toString());
        }
        if (o.handle)
          return (
            wx.showLoading({ title: "正在提交", mask: !0 }),
            a.postData(
              a.apiurl + "/user/onVideoHandle",
              o,
              function (t) {
                e.setData({ showHistory: !0 });
              },
              function (t) {
                e.setData({ error: t.msg });
              }
            ),
            !1
          );
        wx.showLoading({ title: "获取视频 0 %", mask: !0 });
        var r = 1,
          d = setInterval(function () {
            var t = parseFloat((100 * r) / 11).toFixed(2);
            t >= 100 && ((t = 99), clearInterval(d)),
              wx.showLoading({ title: "获取视频 " + t + "%", mask: !0 }),
              r++;
          }, 1e3);
        a.postData(
          a.apiurl + "/api/onDownload",
          o,
          function (t) {
            clearInterval(d),
              (n = t.data),
              wx.showLoading({ title: "正在下载...", mask: !0 }),
              e._drawVideo(n);
          },
          function (t) {
            clearInterval(d), e.setData({ error: t.msg });
          }
        );
      } else e._drawVideo(n);
    else e.saveVideo(c);
  },
  _drawVideo: function (t) {
    wx.showLoading({ title: "正在下载...", mask: !0 });
    var e = this;
    console.log(t),
      wx
        .downloadFile({
          url: t.replace("http://", "https://"),
          timeout: 2e8,
          success: function (o) {
            if (
              (console.log(o),
              o.tempFilePath && -1 != o.tempFilePath.indexOf(".mp4"))
            ) {
              var n = o.tempFilePath;
              (c = n), e.saveVideo(n);
            } else
              -1 != t.indexOf(a.downHost)
                ? (wx.hideLoading(),
                  wx.showToast({
                    title: "视频下载失败！请稍后重试",
                    icon: "none",
                  }))
                : e.__downVideo(t);
          },
          fail: function (o) {
            -1 != o.errMsg.indexOf("exceed max file size") ||
            -1 != o.errMsg.indexOf("time")
              ? (wx.hideLoading(), e.setData({ beyond: "文件超微信限制" }))
              : -1 != t.indexOf(a.downHost)
              ? (wx.hideLoading(),
                wx.showToast({
                  title: "视频下载失败！请稍后重试",
                  icon: "none",
                }))
              : e.__downVideo(t);
          },
        })
        .onProgressUpdate(function (t) {
          wx.showLoading({ title: "下载 " + t.progress + "%", mask: !0 });
        });
  },
  __downVideo: function (t) {
    var e = this;
    wx.showLoading({ title: "下载 0%", mask: !0 }),
      console.log(a.downHost + "/down.php?downlink=" + encodeURIComponent(t)),
      wx
        .downloadFile({
          url: a.downHost + "/down.php?downlink=" + encodeURIComponent(t),
          timeout: 2e8,
          success: function (t) {
            var a = t.tempFilePath;
            (c = a), e.saveVideo(a);
          },
          fail: function (t) {
            console.log(t),
              wx.hideLoading(),
              wx.showToast({ title: "视频下载失败！请稍后重试", icon: "none" });
          },
        })
        .onProgressUpdate(function (t) {
          wx.showLoading({ title: "下载 " + t.progress + "%", mask: !0 });
        });
  },
  saveVideo: function (t) {
    var a = this;
    "edit" == a.data.saveType
      ? a.data.isCut || (!a.data.isCut && !a.data.isWater)
        ? wx.openVideoEditor({
            filePath: t,
            maxDuration: 5e4,
            success: function (t) {
              a.data.isWater
                ? wx.getVideoInfo({
                    src: t.tempFilePath,
                    success: function (e) {
                      wx.navigateTo({
                        url:
                          "/pages/video/draw/draw?url=" +
                          t.tempFilePath +
                          "&width=" +
                          e.width +
                          "&height=" +
                          e.height +
                          (a.data.isSeo ? "&seo=1" : ""),
                      });
                    },
                  })
                : a._saveVideo(t.tempFilePath);
            },
            fail: function (t) {
              console.log(t);
            },
          })
        : a.data.isWater &&
          wx.getVideoInfo({
            src: t,
            success: function (e) {
              wx.navigateTo({
                url:
                  "/pages/video/draw/draw?url=" +
                  t +
                  "&width=" +
                  e.width +
                  "&height=" +
                  e.height +
                  (a.data.isSeo ? "&seo=1" : ""),
              });
            },
          })
      : a._saveVideo(t);
  },
  _saveVideo: function (t) {
    wx.showLoading({ title: "保存中...", mask: !0 });
    var a = this;
    wx.saveVideoToPhotosAlbum({
      filePath: t,
      success: function (t) {
        console.log(t),
          wx.hideLoading(),
          a.vipStateHide(),
          wx.showToast({
            title:
              "保存至相册" +
              (i || "0" != a.data.userInfo.level ? "" : " -1无印豆"),
            icon: "none",
          }),
          a._pay();
      },
      fail: function (e) {
        console.log(e),
          "saveVideoToPhotosAlbum:fail invalid video" == e.errMsg
            ? wx.compressVideo({
                src: t,
                quality: "high",
                success: function (t) {
                  (c = t.tempFilePath), a._saveVideo(t.tempFilePath);
                },
                fail: function () {
                  wx.hideLoading(), a.setData({ beyond: "保存相册失败！" });
                },
              })
            : "saveVideoToPhotosAlbum:fail auth deny" == e.errMsg
            ? (wx.hideLoading(),
              wx.showModal({
                title: "提示",
                content: "请开启相册访问权限后重试！",
                confirmText: "开启",
                success: function (e) {
                  e.confirm
                    ? wx.openSetting({
                        success: function (e) {
                          e.authSetting["scope.writePhotosAlbum"] &&
                            (wx.showLoading({ title: "保存中...", mask: !0 }),
                            wx.saveVideoToPhotosAlbum({
                              filePath: t,
                              success: function (t) {
                                console.log(t),
                                  wx.hideLoading(),
                                  wx.showToast({
                                    title:
                                      "保存成功！" +
                                      (i || "0" != a.data.userInfo.level
                                        ? ""
                                        : " -1无印豆"),
                                    icon: "none",
                                  }),
                                  a._pay();
                              },
                              fail: function (t) {
                                wx.hideLoading(),
                                  "saveVideoToPhotosAlbum:fail cancel" ==
                                    t.errMsg ||
                                    wx.showToast({
                                      title: "系统错误",
                                      icon: "none",
                                    });
                              },
                            }));
                        },
                      })
                    : e.cancel && console.log("用户点击取消");
                },
              }))
            : (wx.hideLoading(), a.setData({ beyond: "保存相册失败！" }));
      },
    });
  },
  showTag: function (t) {
    this.setData({ showTag: t.currentTarget.dataset.i });
  },
  goImgWater: function (t) {
    wx.navigateTo({
      url:
        "/pages/img/draw/draw?url=" +
        encodeURIComponent(t.currentTarget.dataset.url) +
        (this.data.isSeo ? "&seo=1" : ""),
    });
  },
  To: function (t) {
    var e = t.currentTarget.dataset.type,
      o = t.currentTarget.dataset.appid;
    t.currentTarget.dataset.path;
    "game" == e &&
      ((o = (o = gameConfig.appid)[Math.round(Math.random())]),
      wx.navigateToMiniProgram({
        appId: o,
        path: t.currentTarget.dataset.path,
      }));
    "app" == e &&
      (o == a.appid
        ? wx.redirectTo({ url: "/" + t.currentTarget.dataset.path })
        : wx.navigateToMiniProgram({
            appId: o,
            path: t.currentTarget.dataset.path,
          }));
  },
  goHome: function (t) {
    wx.navigateToMiniProgram({
      appId: t.currentTarget.dataset.appid,
      path: t.currentTarget.dataset.path,
    });
  },
  videoPlay: function (t) {
    console.log(t),
      this.data.isfullScreen || this.videoContext.requestFullScreen();
  },
  fullscreen: function (t) {
    this.setData({ isfullScreen: t.detail.fullScreen }),
      t.detail.fullScreen
        ? this.videoContext.play()
        : this.videoContext.pause();
  },
  onComment: function () {
    this.setData({ errormoney: "", isShowDownload: !1 }),
      requirePlugin("wxacommentplugin").openComment({
        success: function (t) {
          console.log("plugin.openComment success", t);
          var e = {};
          (e.timestamp = Date.parse(new Date()) / 1e3),
            (e.sign = a.getSign(e)),
            a.postData(a.apiurl + "/user/onComment", e, function (t) {
              wx.showModal({ content: t.data, showCancel: !1 });
            });
        },
        fail: function (t) {},
      });
  },
  onShareAppMessage: function (t) {
    if (
      (console.log(t),
      "button" == t.from && "timeShare" == t.target.dataset.type)
    ) {
      console.log("ccc");
      this.setData({ errormoney: "", isShowDownload: !1 });
      var e = {};
      (e.timestamp = Date.parse(new Date()) / 1e3),
        (e.sign = a.getSign(e)),
        a.postData(a.apiurl + "/user/onShare", e, function (t) {
          wx.showModal({ content: t.data, showCancel: !1 });
        });
    }
    return {
      title: "短视频免费去水印",
      path: "/pages/watermark/watermark?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/share.jpg",
    };
  },
  clearError: function () {
    this.setData({ error: "", beyond: "" });
  },
});
