(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/otherTool/otherTool"],
  {
    "30f1": function (e, t, a) {
      (function (e) {
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        a("616a"), a("921b"), t(a("66fd")), e(t(a("45c0")).default);
      }).call(this, a("543d").createPage);
    },
    "45c0": function (e, t, a) {
      a.r(t);
      var n = a("9e6c"),
        i = a("eb3d");
      for (var o in i)
        "default" !== o &&
          (function (e) {
            a.d(t, e, function () {
              return i[e];
            });
          })(o);
      a("d0cc");
      var l = a("f0c5"),
        r = Object(l.a)(
          i.default,
          n.b,
          n.c,
          !1,
          null,
          null,
          null,
          !1,
          n.a,
          void 0
        );
      t.default = r.exports;
    },
    "6c5b": function (e, t, a) {
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = {
          data: function () {
            return {
              tempFilePath: "",
              cropFilePath: "",
              ad: "",
              chengxuma: "",
              typee: 1,
              gzgzh: getApp().globalData.gzgzh,
              wenanpeiyin: getApp().globalData.wenanpeiyin,
              zibannerList: getApp().globalData.zibannerList,
            };
          },
          onLoad: function () {
            this.ad = getApp().globalData.toolAd;
          },
          onShareAppMessage: function (e) {
            return {
              title: getApp().globalData.shareTitle,
              path: "/pages/index/index?openid=" + getApp().globalData.openid,
              imageUrl: getApp().globalData.sharePic,
            };
          },
          onShareTimeline: function () {
            var e = wx.getStorageSync("id");
            return {
              title: this.data.noticedetail[0].title,
              query: "id= " + e,
              imageUrl: this.data.noticedetail[0].thumb,
            };
          },
          methods: {
            toPage: function (t) {
              console.log(t),
                1 == t
                  ? e.navigateTo({ url: "../md5/md5" })
                  : 2 == t
                  ? e.navigateTo({ url: "../picTool/picTool" })
                  : 3 == t
                  ? e.navigateTo({ url: "../music/music" })
                  : 4 == t
                  ? e.navigateTo({ url: "../fontToVoice/fontToVoice" })
                  : 5 == t
                  ? e.navigateTo({ url: "../imgageToText/imgageToText" })
                  : 9 == t
                  ? e.navigateTo({ url: "../dub/dub" })
                  : 6 == t
                  ? e.navigateTo({ url: "../easyCode/easyCode" })
                  : 7 == t
                  ? e.previewImage({
                      urls: [getApp().globalData.chengxuma],
                      longPressActions: {
                        itemList: ["发送给朋友", "保存图片", "收藏"],
                      },
                    })
                  : 8 == t && e.navigateTo({ url: "../charact/charact" });
            },
            bannerClick: function (e) {
              var t = getApp().globalData.zibannerList;
              0 == t[e].hwu
                ? (console.log(t[e]),
                  wx.navigateToMiniProgram({
                    appId: t[e].appid,
                    path: t[e].path,
                  }))
                : (console.log(e),
                  wx.navigateTo({
                    url: "../article/article?url=" + t[e].appid,
                  }));
            },
          },
        };
        t.default = a;
      }).call(this, a("543d").default);
    },
    "81f9": function (e, t, a) {},
    "9e6c": function (e, t, a) {
      var n = function () {
          this.$createElement, this._self._c;
        },
        i = [];
      a.d(t, "b", function () {
        return n;
      }),
        a.d(t, "c", function () {
          return i;
        }),
        a.d(t, "a", function () {});
    },
    d0cc: function (e, t, a) {
      var n = a("81f9");
      a.n(n).a;
    },
    eb3d: function (e, t, a) {
      a.r(t);
      var n = a("6c5b"),
        i = a.n(n);
      for (var o in n)
        "default" !== o &&
          (function (e) {
            a.d(t, e, function () {
              return n[e];
            });
          })(o);
      t.default = i.a;
    },
    onShareAppMessage: function (e) {
      return (
        e.from,
        {
          title: this.data.shareTitle,
          path:
            "/pages/index/index?openid=" + wx.getStorageSync("share_openid"),
          imageUrl: this.data.share_img,
        }
      );
    },
    onShareTimeline: function () {
      var e = wx.getStorageSync("id");
      return {
        title: this.data.noticedetail[0].title,
        query: "id= " + e,
        imageUrl: this.data.noticedetail[0].thumb,
      };
    },
  },
  [["30f1", "common/runtime", "common/vendor"]],
]);
