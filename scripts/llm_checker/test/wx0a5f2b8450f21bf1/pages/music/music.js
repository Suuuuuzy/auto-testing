(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/music/music"],
  {
    "6fa6": function (t, o, n) {
      (function (t) {
        function o(t) {
          return t && t.__esModule ? t : { default: t };
        }
        n("616a"), n("921b"), o(n("66fd")), t(o(n("8929")).default);
      }).call(this, n("543d").createPage);
    },
    8929: function (t, o, n) {
      n.r(o);
      var e = n("e4f1"),
        i = n("f82c");
      for (var a in i)
        "default" !== a &&
          (function (t) {
            n.d(o, t, function () {
              return i[t];
            });
          })(a);
      n("f5d3");
      var u = n("f0c5"),
        c = Object(u.a)(
          i.default,
          e.b,
          e.c,
          !1,
          null,
          null,
          null,
          !1,
          e.a,
          void 0
        );
      o.default = c.exports;
    },
    d2a4: function (t, o, n) {},
    e4f1: function (t, o, n) {
      var e = function () {
          this.$createElement, this._self._c;
        },
        i = [];
      n.d(o, "b", function () {
        return e;
      }),
        n.d(o, "c", function () {
          return i;
        }),
        n.d(o, "a", function () {});
    },
    f5d3: function (t, o, n) {
      var e = n("d2a4");
      n.n(e).a;
    },
    f6f0: function (t, o, n) {
      (function (t) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        var n = {
          data: function () {
            return {
              tempFilePath: "",
              result: !1,
              text: "",
              handleFaceStatus: !1,
              resultImg: "",
              musicUrl: "",
              innerAudioContext: null,
              showMusic: !1,
            };
          },
          onLoad: function () {
            this.initAudio();
          },
          methods: {
            initAudio: function () {
              this.innerAudioContext = t.createInnerAudioContext();
            },
            copyMusic: function () {
              var o = this;
              t.setClipboardData({
                data: o.musicUrl,
                success: function () {
                  t.setStorageSync(o.musicUrl, o.musicUrl),
                    t.showModal({
                      content: "已经复制链接到剪切板,请粘贴到浏览器下载",
                    });
                },
              });
            },
            handleAudio: function (t) {
              1 == t
                ? this.innerAudioContext.play()
                : this.innerAudioContext.stop();
            },
            upload: function () {
              var o = this;
              t.chooseVideo({
                count: 1,
                sourceType: ["album"],
                success: function (n) {
                  o.showMusic = !1;
                  var e = (n.size / 1048576).toFixed(2);
                  console.log("视频大小:" + e),
                    e > 30
                      ? t.showModal({ content: "视频超过30M,暂时无法处理" })
                      : ((o.tempFilePath = n.tempFilePath), (o.result = !0));
                },
              });
            },
            complete: function () {
              var o = this;
              t.showLoading({ title: "处理中" }),
                getApp().globalData,
                t.uploadFile({
                  url: o.$qrCodeUrl + "/upload/file",
                  filePath: o.tempFilePath,
                  name: "file",
                  formData: { user: "test" },
                  success: function (n) {
                    console.log(n);
                    var e = JSON.parse(n.data).data;
                    console.log(e),
                      wx.login({
                        success: function (n) {
                          var i = n.code;
                          t.request({
                            url: o.$qrCodeUrl + "/upload/videoMusic",
                            data: { code: i, filePath: e, source: o.$source },
                            method: "POST",
                            success: function (n) {
                              t.showToast({ title: "提取成功" }),
                                "0001" === n.data.code
                                  ? (console.log(n.data),
                                    (o.musicUrl = n.data.data),
                                    (o.innerAudioContext.src = o.musicUrl),
                                    (o.showMusic = !0))
                                  : t.showModal({
                                      content: "未知错误，请联系作者进行解决",
                                    });
                            },
                            complete: function (o) {
                              t.hideLoading();
                            },
                          });
                        },
                      });
                  },
                  fail: function (o) {
                    t.showModal({ content: "上传失败，请联系作者进行解决" }),
                      t.hideLoading();
                  },
                });
            },
            downloadFile: function () {
              t.showLoading({ title: "下载中", mask: !0 }),
                t.downloadFile({
                  url: this.musicUrl,
                  success: function (o) {
                    200 === o.statusCode
                      ? t.saveFile({
                          tempFilePath: o.tempFilePath,
                          success: function (o) {
                            var n = o.savedFilePath;
                            t.showModal({ title: "文件路径:" + n });
                          },
                        })
                      : t.showModal({
                          title: "下载失败，请复制音乐链接，打开手机浏览器下载",
                        });
                  },
                  fail: function () {
                    t.showModal({
                      content: "下载失败，请复制音乐链接到浏览器下载",
                    });
                  },
                  complete: function () {
                    t.hideLoading();
                  },
                });
            },
          },
        };
        o.default = n;
      }).call(this, n("543d").default);
    },
    f82c: function (t, o, n) {
      n.r(o);
      var e = n("f6f0"),
        i = n.n(e);
      for (var a in e)
        "default" !== a &&
          (function (t) {
            n.d(o, t, function () {
              return e[t];
            });
          })(a);
      o.default = i.a;
    },
  },
  [["6fa6", "common/runtime", "common/vendor"]],
]);
