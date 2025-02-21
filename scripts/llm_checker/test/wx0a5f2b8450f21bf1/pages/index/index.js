(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/index/index"],
  {
    "371a": function (a, t, e) {
      e.r(t);
      var o = e("667b"),
        n = e.n(o);
      for (var l in o)
        "default" !== l &&
          (function (a) {
            e.d(t, a, function () {
              return o[a];
            });
          })(l);
      t.default = n.a;
    },
    "4c50": function (a, t, e) {},
    "667b": function (a, t, e) {
      (function (a) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var e = {
          data: function () {
            return {
              notice: getApp().globalData.notice,
              animation: !1,
              cardCur: 0,
              banner: getApp().globalData.banner,
              dotStyle: !1,
              towerStart: 0,
              direction: "",
              wenanpeiyin: "",
              analyseUrl: "",
              chengxuma: "",
              pcpeiyin: "",
              modalName: null,
              skin: !1,
              listTouchStart: 0,
              listTouchDirection: null,
              copyData: "",
              rewardedVideoAd: null,
              videoAd: "",
              prizeContent: getApp().globalData.prizeContent,
              showNotice: !0,
              currentTimeStamp: null,
              shareBtn: getApp().globalData.shareBtn,
              jiancelink: wx.getStorageSync("jc-url"),
              indexAd: "",
              showAd: !1,
              wxappid: "",
              wxpath: "",
              jx: "开始解析",
              showTip: !0,
              song: "",
              appName: "去水印",
              customername: getApp().globalData.customername,
              barHeight: getApp().globalData.barHeight,
            };
          },
          onLoad: function (t) {
            var e = this;
            (getApp().globalData.fwqurl = e.$reqUrl),
              (getApp().globalData.sid = e.$source),
              setTimeout(function () {
                e.animation = !0;
              }, 200),
              this.initBaseData(),
              this.register(),
              a.getStorageSync("autoTip").length > 5 && (this.showTip = !1),
              (getApp().globalData.openids = t.openid);
          },
          onShow: function (a) {
            !0 === wx.getStorageSync("jc-url") && this.checkCliboard();
          },
          onShareAppMessage: function (a) {
            return {
              title: getApp().globalData.shareTitle,
              path: "/pages/index/index?openid=" + getApp().globalData.openid,
              imageUrl: getApp().globalData.sharePic,
            };
          },
          onShareTimeline: function () {
            var a = wx.getStorageSync("id");
            return {
              title: this.data.noticedetail[0].title,
              query: "id= " + a,
              imageUrl: this.data.noticedetail[0].thumb,
            };
          },
          methods: {
            closeNotice: function () {
              console.log("============" + a.getStorageSync("autoTip")),
                (this.showTip = !1),
                a.setStorageSync("autoTip", "autoTip");
            },
            clearText2: function () {
              this.analyseUrl = "";
            },
            clearText: function () {
              var a = this;
              wx.getClipboardData({
                success: function (t) {
                  wx.hideToast();
                  var e = t.data || "";
                  e.length > 1
                    ? ((a.analyseUrl = e),
                      wx.showToast({
                        title: "粘贴成功",
                        icon: "success",
                        duration: 1500,
                      }))
                    : wx.showModal({
                        title: "提示",
                        content: "没有检测到有效的链接地址",
                        showCancel: !1,
                      });
                },
              });
            },
            copytext: function () {
              if (wx.getStorageSync("privacy")) {
                var a = this.selectComponent("#privacyComponent"),
                  t = a.data.showModalStatus;
                a.setData({ showModalStatus: !t });
              } else this.clearText();
            },
            isUrl: function (a) {
              var t = this;
              if (0 == a.length)
                return (
                  wx.showModal({
                    title: "温馨提示",
                    content: "网址不能为空",
                    confirmColor: "#ff9900",
                    showCancel: !1,
                  }),
                  !1
                );
              for (
                var e = t.handleUrl(a), o = wx.getStorageSync("guize"), n = 0;
                n < o.length;
                n++
              )
                if (a.indexOf(o[n].guize) > 0) return a;
              return (
                e ||
                (wx.showModal({
                  title: "温馨提示",
                  content: "请输入正确的网址",
                  confirmColor: "#ff9900",
                  showCancel: !1,
                  success: function (a) {
                    t.setData({ result: "" });
                  },
                }),
                !1)
              );
            },
            handleUrl: function (a) {
              return (
                !!(a = a.match(
                  /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
                )) && a[0]
              );
            },
            page: function (t) {
              1 == t
                ? a.navigateTo({ url: "../charact/charact" })
                : 2 == t
                ? a.navigateTo({ url: "../share/index" })
                : 3 == t
                ? a.navigateTo({ url: "../batch/batch" })
                : 4 == t && a.navigateTo({ url: "../dub/dub" }),
                5 == t && a.navigateTo({ url: "../course/index" }),
                6 == t && a.navigateTo({ url: "../list/list" });
            },
            createRewardCard: function () {
              var a = null;
              if (wx.createInterstitialAd) {
                (a = wx.createInterstitialAd({
                  adUnitId: getApp().globalData.videoAdCard,
                })).onLoad(function () {
                  console.log("onLoad event emit");
                }),
                  a.onError(function (a) {
                    console.log("onError event emit", a);
                  }),
                  a.onClose(function (a) {
                    console.log("onClose event emit", a);
                  });
                var t = Math.floor(10 * Math.random());
                (4 != t && 8 != t) ||
                  a.show().catch(function (a) {
                    console.error(a);
                  });
              }
            },
            initBaseData: function () {
              var t = this;
              a.request({
                url:
                  t.$reqUrl +
                  "advert/getAdvertMsg?targetId=" +
                  t.$source +
                  "&version=" +
                  t.$version,
                success: function (e) {
                  if (
                    ((getApp().globalData.guize = e.data.data.guize),
                    (getApp().globalData.downlink = e.data.data.downlink),
                    (getApp().globalData.downlink_img =
                      e.data.data.downlink_img),
                    (getApp().globalData.allow_topup = e.data.data.allow_topup),
                    (getApp().globalData.gzgzh = e.data.data.gzgzh),
                    (getApp().globalData.wenanpeiyin = e.data.data.wenanpeiyin),
                    (getApp().globalData.allow_iphone_topup =
                      e.data.data.allow_iphone_topup),
                    (getApp().globalData.xiazaipeiyin =
                      e.data.data.xiazaipeiyin),
                    (getApp().globalData.eqijx = e.data.data.eqijx),
                    (getApp().globalData.wxappid = e.data.data.wxappid),
                    (getApp().globalData.wxpath = e.data.data.wxpath),
                    (getApp().globalData.song = e.data.data.song),
                    (getApp().globalData.jiacishu = e.data.data.jiacishu),
                    (getApp().globalData.jiatianshu = e.data.data.jiatianshu),
                    (getApp().globalData.pcqsy = e.data.data.pcqsy),
                    (getApp().globalData.bucket = e.data.data.bucket),
                    (getApp().globalData.region = e.data.data.region),
                    null != e.data.data.bannerList &&
                      void 0 !== e.data.data.bannerList &&
                      ((getApp().globalData.banner = e.data.data.bannerList),
                      (t.banner = e.data.data.bannerList)),
                    (getApp().globalData.zibannerList =
                      e.data.data.zibannerList),
                    (getApp().globalData.videoAdTimes = e.data.data.times),
                    (getApp().globalData.accounturl = e.data.data.accounturl),
                    (getApp().globalData.customername =
                      e.data.data.customername),
                    (getApp().globalData.customer = e.data.data.customer),
                    (getApp().globalData.prizeContent = e.data.data.link),
                    (getApp().globalData.vs = e.data.data.vs),
                    (getApp().globalData.notice = e.data.data.content),
                    (getApp().globalData.batchAnalyse =
                      e.data.data.batchAnalyse),
                    (t.batchAnalyse = e.data.data.batchAnalyse),
                    (t.prizeContent = e.data.data.link),
                    (getApp().globalData.shareImg = e.data.data.adPath),
                    (getApp().globalData.showVideoCourse = e.data.data.course),
                    (getApp().globalData.author = e.data.data.author),
                    (getApp().globalData.prizeType = e.data.data.prizeType),
                    (getApp().globalData.prizePath = e.data.data.prizePath),
                    (getApp().globalData.watchTimes = e.data.data.watchTimes),
                    (getApp().globalData.sharePic = e.data.data.sharePic),
                    (getApp().globalData.chengxuma = e.data.data.chengxuma),
                    (getApp().globalData.shareTitle = e.data.data.shareTitle),
                    (getApp().globalData.adTip = e.data.data.adTip),
                    (getApp().globalData.adTippl = e.data.data.adTippl),
                    (getApp().globalData.adTiptj = e.data.data.adTiptj),
                    (getApp().globalData.adTipwa = e.data.data.adTipwa),
                    (getApp().globalData.adTippy = e.data.data.adTippy),
                    (getApp().globalData.freeType = e.data.data.freeType),
                    null != e.data.data.customername &&
                      ((getApp().globalData.customername =
                        e.data.data.customername),
                      (t.customername = e.data.data.customername)),
                    null != e.data.data.appName &&
                      (t.appName = e.data.data.appName),
                    (getApp().globalData.freeType = e.data.data.freeType),
                    null != e.data.data.customername &&
                      ((getApp().globalData.customername =
                        e.data.data.customername),
                      (t.customername = e.data.data.customername)),
                    null != e.data.data.chengxuma &&
                      (t.chengxuma = e.data.data.chengxuma),
                    (getApp().globalData.freeType = e.data.data.freeType),
                    null != e.data.data.customername &&
                      ((getApp().globalData.customername =
                        e.data.data.customername),
                      (t.customername = e.data.data.customername)),
                    null != e.data.data.pcpeiyin &&
                      (t.pcpeiyin = e.data.data.pcpeiyin),
                    (getApp().globalData.freeType = e.data.data.freeType),
                    null != e.data.data.customername &&
                      ((getApp().globalData.customername =
                        e.data.data.customername),
                      (t.customername = e.data.data.customername)),
                    null != e.data.data.wenanpeiyin &&
                      (t.wenanpeiyin = e.data.data.wenanpeiyin),
                    (getApp().globalData.freeType = e.data.data.freeType),
                    null != e.data.data.customername &&
                      ((getApp().globalData.customername =
                        e.data.data.customername),
                      (t.customername = e.data.data.customername)),
                    null != e.data.data.wxappid &&
                      (t.wxappid = e.data.data.wxappid),
                    (getApp().globalData.freeType = e.data.data.freeType),
                    null != e.data.data.customername &&
                      ((getApp().globalData.customername =
                        e.data.data.customername),
                      (t.customername = e.data.data.customername)),
                    null != e.data.data.wxpath &&
                      (t.wxpath = e.data.data.wxpath),
                    null != e.data.data.videoAd &&
                      (getApp().globalData.prizeImg = e.data.data.videoAd),
                    null != e.data.data.shareBtn &&
                      ((getApp().globalData.shareBtn = e.data.data.shareBtn),
                      (t.shareBtn = e.data.data.shareBtn)),
                    null != e.data.data.ads)
                  ) {
                    var o = e.data.data.ads;
                    (t.notice = getApp().globalData.notice),
                      (getApp().globalData.indexAd = o.indexAd),
                      (t.indexAd = o.indexAd),
                      (t.showAd = !0),
                      (getApp().globalData.videoAd = o.videoAd),
                      (getApp().globalData.videoAdReward = o.videoAdReward),
                      (t.showAd = !0),
                      (getApp().globalData.videoAd = o.videoAd),
                      (getApp().globalData.videoAdRewardpl = o.videoAdRewardpl),
                      (t.showAd = !0),
                      (getApp().globalData.videoAd = o.videoAd),
                      (getApp().globalData.videoAdRewardtj = o.videoAdRewardtj),
                      (t.showAd = !0),
                      (getApp().globalData.videoAd = o.videoAd),
                      (getApp().globalData.videoAdRewardwa = o.videoAdRewardwa),
                      (t.showAd = !0),
                      (getApp().globalData.videoAd = o.videoAd),
                      (getApp().globalData.videoAdRewardpy = o.videoAdRewardpy),
                      (getApp().globalData.renwujili = o.renwujili),
                      (getApp().globalData.videoAdAfter = o.videoAdAfter),
                      (getApp().globalData.videoAdCard = o.videoAdCard),
                      (getApp().globalData.toolAd = o.toolAd),
                      (getApp().globalData.fontAd = o.fontAd),
                      (getApp().globalData.batchAd = o.batchAd),
                      (getApp().globalData.myAd = o.myAd),
                      (getApp().globalData.picToTextAd = o.picToTextAd),
                      (getApp().globalData.parseAdCard = o.parseAdCard),
                      (getApp().globalData.parseAd = o.parseAd),
                      (getApp().globalData.md5Ad = o.md5Ad);
                    var n = null;
                    wx.createInterstitialAd &&
                      ((n = wx.createInterstitialAd({
                        adUnitId: getApp().globalData.videoAdCard,
                      })).onLoad(function () {}),
                      n.onError(function (a) {}),
                      n.onClose(function () {})),
                      n && n.show().catch(function (a) {}),
                      (t.song = e.data.data.song),
                      a.setStorageSync("basedata", e.data.data),
                      a.setStorageSync("guize", e.data.data.guize),
                      (getApp().globalData.song = t.song);
                  }
                },
              });
            },
            skipToPrize: function () {
              1 == getApp().globalData.prizeType
                ? a.previewImage({
                    urls: [getApp().globalData.prizeImg],
                    longPressActions: {
                      itemList: ["发送给朋友", "保存图片", "收藏"],
                    },
                  })
                : a.navigateToMiniProgram({
                    appId: "wx9e7c6ea754e14099",
                    path: getApp().globalData.prizePath,
                  });
            },
            skipgzh: function () {
              1 == getApp().globalData.customer
                ? wx.navigateTo({ url: "../article/article" })
                : wx.navigateTo({ url: "../my/my" });
            },
            bannerClick: function (a) {
              var t = this;
              1 == t.banner[a].type && 0 == t.banner[a].hwu
                ? wx.navigateToMiniProgram({
                    appId: t.banner[a].appid,
                    path: t.banner[a].path,
                  })
                : 1 == t.banner[a].hwu &&
                  wx.navigateTo({
                    url: "../article/article?url=" + t.banner[a].appid,
                  });
            },
            skipToRichText: function (t) {
              a.navigateTo({ url: "../parse/parse?conId=" + t });
            },
            skipToBatch: function () {
              a.navigateTo({ url: "../batch/batch" });
            },
            register: function () {
              var t = this;
              wx.login({
                success: function (e) {
                  var o = e.code;
                  a.request({
                    url: t.$reqUrl + "/video/registryUser",
                    data: {
                      code: o,
                      programType: t.$source,
                      scene: getApp().globalData.scene,
                      openid: getApp().globalData.openids,
                    },
                    success: function (a) {
                      a.data.code,
                        (getApp().globalData.uid = a.data.data.userId),
                        (getApp().globalData.endTime = a.data.data.endTime),
                        (getApp().globalData.userType = a.data.data.userType),
                        (getApp().globalData.openid = a.data.data.openid),
                        a.data.data.isFirstLogin;
                    },
                  });
                },
              });
            },
            startqsy: function () {
              var a = this;
              1 == a.jiancelink &&
                setTimeout(function () {
                  a.checkCliboard(), console.log("检测去水印");
                }, 500);
            },
            SwitchA: function (a) {
              console.log(a.detail.value),
                wx.setStorageSync("jc-url", a.detail.value),
                (this.jiancelink = a.detail.value),
                a.detail.value && this.startqsy();
            },
            checkCliboard: function () {
              var t = this;
              a.getClipboardData({
                success: function (e) {
                  if (
                    (a.hideToast(),
                    (t.copyData = e.data),
                    null != t.copyData && -1 != t.copyData.indexOf("http"))
                  ) {
                    var o = a.getStorageSync(t.copyData);
                    (null != o && "" != o) ||
                      (a.setStorageSync(t.copyData, t.copyData),
                      a.showModal({
                        content: "检测到视频链接，是否去水印？",
                        confirmText: "确定",
                        success: function (a) {
                          a.confirm &&
                            ((t.analyseUrl = t.copyData), t.videoAnalyse());
                        },
                      }));
                  }
                },
              });
            },
            teach: function () {
              a.navigateTo({ url: "../teach/teach" });
            },
            setLog(a) {
              wx.getStorage({
                key: "userlog",
                success: function (t) {
                  let e = t.data;
                  if (e.includes(a)) {
                    let t = 0;
                    for (var o = 0; o < e.length; o++)
                      if (e[o] == a) {
                        t = o;
                        break;
                      }
                    e.splice(t, 1);
                  } else e.length >= 100 && e.pop();
                  e.unshift(a), wx.setStorageSync("userlog", e);
                },
                fail: function (t) {
                  let e = [];
                  e.unshift(a), wx.setStorageSync("userlog", e);
                },
              });
            },
            videoAnalyse: function () {
              var t = this,
                e = (new Date().valueOf(), this),
                o = this.isUrl(t.analyseUrl);
              console.log(o),
                o &&
                  (a.showLoading({ title: "解析中", mask: !0 }),
                  wx.login({
                    success: function (n) {
                      var l = n.code;
                      a.request({
                        url: t.$reqUrl + "/lyz/miniAnalyse",
                        data: {
                          code: l,
                          programType: t.$source,
                          link: o,
                          nickName: getApp().globalData.nickName,
                          avatarUrl: getApp().globalData.headUrl,
                        },
                        method: "POST",
                        success: function (t) {
                          if ((console.log(t.data), "0004" === t.data.code))
                            (getApp().globalData.playAddr = t.data.message),
                              (getApp().globalData.cover = t.data.method),
                              a.navigateTo({
                                url: "../videoInfo/videoInfo?type=1",
                              });
                          else if (
                            "0002" == t.data.code ||
                            "0009" === t.data.code
                          )
                            a.showModal({ content: t.data.message });
                          else if ("0001" == t.data.code) {
                            var o = t.data.data;
                            e.setLog(e.analyseUrl),
                              (getApp().globalData.playAddr = o.playAddr),
                              (getApp().globalData.cover = o.cover),
                              (getApp().globalData.desc = o.desc),
                              2 == o.type
                                ? (a.setStorageSync(
                                    "ks_pics",
                                    JSON.stringify(o)
                                  ),
                                  a.navigateTo({ url: "../picInfo/picInfo" }))
                                : a.navigateTo({
                                    url: "../videoInfo/videoInfo",
                                  });
                          } else
                            a.showModal({
                              content: "未知错误，请联系作者进行解决",
                            });
                        },
                        complete: function (t) {
                          a.hideLoading();
                        },
                      });
                    },
                  }));
            },
          },
        };
        t.default = e;
      }).call(this, e("543d").default);
    },
    a7e7: function (a, t, e) {
      var o = function () {
          this.$createElement, this._self._c;
        },
        n = [];
      e.d(t, "b", function () {
        return o;
      }),
        e.d(t, "c", function () {
          return n;
        }),
        e.d(t, "a", function () {});
    },
    a8b1: function (a, t, e) {
      var o = e("4c50");
      e.n(o).a;
    },
    a9a6: function (a, t, e) {
      (function (a) {
        function t(a) {
          return a && a.__esModule ? a : { default: a };
        }
        e("616a"), e("921b"), t(e("66fd")), a(t(e("beb5")).default);
      }).call(this, e("543d").createPage);
    },
    beb5: function (a, t, e) {
      e.r(t);
      var o = e("a7e7"),
        n = e("371a");
      for (var l in n)
        "default" !== l &&
          (function (a) {
            e.d(t, a, function () {
              return n[a];
            });
          })(l);
      e("a8b1");
      var d = e("f0c5"),
        i = Object(d.a)(
          n.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      t.default = i.exports;
    },
    onShareAppMessage: function (a) {
      return (
        a.from,
        {
          title: this.data.shareTitle,
          path:
            "/pages/index/index?openid=" + wx.getStorageSync("share_openid"),
          imageUrl: this.data.share_img,
        }
      );
    },
    onShareTimeline: function () {
      var a = wx.getStorageSync("id");
      return {
        title: this.data.noticedetail[0].title,
        query: "id= " + a,
        imageUrl: this.data.noticedetail[0].thumb,
      };
    },
  },
  [["a9a6", "common/runtime", "common/vendor"]],
]);
