(global.webpackJsonp = global.webpackJsonp || []).push([
  ["common/main"],
  {
    "001a": function (t, e, o) {},
    "06cd": function (t, e, o) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function a(t, e) {
          var o = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e &&
              (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              o.push.apply(o, a);
          }
          return o;
        }
        function n(t, e, o) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: o,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = o),
            t
          );
        }
        o("616a"), o("921b");
        var r = e(o("66fd")),
          i = e(o("9006"));
        (r.default.config.productionTip = !1),
          (r.default.prototype.$reqUrl = "https://ck.yyymvp.com/"),
          (r.default.prototype.$qrCodeUrl = "https://ck.yyymvp.com/"),
          (r.default.prototype.$version = "3.3.6"),
          (r.default.prototype.prizeContent = "支持下作者,下载提个速"),
          (r.default.prototype.$source = 4),
          wx.setStorage({ key: "sid", data: r.default.prototype.$source }),
          wx.setStorage({ key: "getadurl", data: r.default.prototype.$reqUrl }),
          r.default.component("cu-custom", function () {
            o.e("colorui/components/cu-custom")
              .then(
                function () {
                  return resolve(o("f9fc"));
                }.bind(null, o)
              )
              .catch(o.oe);
          }),
          (r.default.prototype.tui = {}),
          (r.default.prototype.$eventHub =
            r.default.prototype.$eventHub || new r.default()),
          (i.default.mpType = "app"),
          t(
            new r.default(
              (function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var o = null != arguments[e] ? arguments[e] : {};
                  e % 2
                    ? a(Object(o), !0).forEach(function (e) {
                        n(t, e, o[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(o)
                      )
                    : a(Object(o)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(o, e)
                        );
                      });
                }
                return t;
              })({}, i.default)
            )
          ).$mount();
      }).call(this, o("543d").createApp);
    },
    4281: function (t, e, o) {
      o.r(e);
      var a = o("7609"),
        n = o.n(a);
      for (var r in a)
        "default" !== r &&
          (function (t) {
            o.d(e, t, function () {
              return a[t];
            });
          })(r);
      e.default = n.a;
    },
    7609: function (t, e, o) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = (function (t) {
            return t && t.__esModule ? t : { default: t };
          })(o("66fd")),
          n = {
            onLaunch: function (e) {
              console.log("App Launch"), this.initBaseData();
              var o = this;
              (o.globalData.scene = e.scene),
                t.getSystemInfo({
                  success: function (t) {
                    a.default.prototype.StatusBar = t.statusBarHeight;
                    var e = wx.getMenuButtonBoundingClientRect();
                    (a.default.prototype.Custom = e),
                      (a.default.prototype.CustomBar =
                        e.bottom + e.top - t.statusBarHeight),
                      (o.globalData.barHeight = a.default.prototype.CustomBar);
                  },
                });
            },
            onShow: function () {
              console.log("App Show");
            },
            onHide: function () {
              console.log("App Hide");
            },
            globalData: {
              uid: 0,
              isFirstLogin: !1,
              showVideoCourse: !1,
              author: "",
              notice: "有问题请及时联系作者进行反馈",
              x: 0,
              y: 0,
              width: 10,
              height: 10,
              freeType: 1,
              userType: 0,
              prizeContent: "支持下作者 下载提速",
              prizePath:
                "pages/apps/largess/detail?id=fmpt2URXZgCgPc1CLmE7uw%3D%3D",
              banner: [{ imgUrl: "", type: 0 }],
              videoAdTimes: 3,
              batchAnalyse: 1,
              shareImg: "",
              shareTitle: "短视频一键去水印,去水印还能这么简单",
              prizeImg: "",
              prizeType: 0,
              nickName:
                "" != wx.getStorageSync("nickName")
                  ? wx.getStorageSync("nickName")
                  : "普通用户",
              headUrl:
                "" != wx.getStorageSync("headUrl")
                  ? wx.getStorageSync("headUrl")
                  : "../../static/img/login.png",
              watchTimes: 1,
              autoDownload: !1,
              adTip: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
              adTippl: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
              adTiptj: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
              adTipwa: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
              adTippy: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
              sharePic: "",
              playAddr: null,
              cover: null,
              shareBtn: "分享给好友",
              customername: "在线联系客服",
              indexAd: "",
              videoAd: "",
              videoAdReward: "",
              videoAdRewardpl: "",
              videoAdRewardtj: "",
              videoAdRewardwa: "",
              videoAdRewardpy: "",
              renwujili: "",
              videoAdCard: "",
              toolAd: "",
              myAd: "",
              videoAdAfter: "",
              parseAd: "",
              parseAdCard: "",
              batchAd: "",
              fontAd: "",
              md5Ad: "",
              gzgzh: 0,
              picToTextAd: "",
              barHeight: 60,
              endTime: "2020-7-6",
              allow_topup: 0,
              allow_iphone_topup: 0,
            },
            methods: {
              initBaseData: function () {
                var e = t.getStorageSync("autoDownload");
                null != e &&
                  void 0 !== e &&
                  (this.$options.globalData.autoDownload = e);
                var o = t.getStorageSync("basedata");
                null != o &&
                  void 0 !== o &&
                  "" != o &&
                  (console.log("加载本地缓存中的基础数据"),
                  null != o.author &&
                    (this.$options.globalData.author = o.author),
                  null != o.videoAd &&
                    (this.$options.globalData.prizeImg = o.videoAd),
                  (this.$options.globalData.prizeContent = o.link),
                  (this.$options.globalData.showVideoCourse = o.course),
                  (this.$options.globalData.notice = o.content),
                  (this.$options.globalData.prizePath = o.prizePath),
                  (this.$options.globalData.banner = o.bannerList),
                  (this.$options.globalData.batchAnalyse = o.batchAnalyse),
                  (this.$options.globalData.shareImg = o.adPath));
              },
            },
          };
        e.default = n;
      }).call(this, o("543d").default);
    },
    9006: function (t, e, o) {
      o.r(e);
      var a = o("4281");
      for (var n in a)
        "default" !== n &&
          (function (t) {
            o.d(e, t, function () {
              return a[t];
            });
          })(n);
      o("d656");
      var r = o("f0c5"),
        i = Object(r.a)(
          a.default,
          void 0,
          void 0,
          !1,
          null,
          null,
          null,
          !1,
          void 0,
          void 0
        );
      e.default = i.exports;
    },
    d656: function (t, e, o) {
      var a = o("001a");
      o.n(a).a;
    },
  },
  [["06cd", "common/runtime", "common/vendor"]],
]);
