(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/clearMusic/clearMusic"],
  {
    1971: function (t, e, o) {
      var n = {
          "cmd-progress": function () {
            return o
              .e("components/cmd-progress/cmd-progress")
              .then(o.bind(null, "2e5c"));
          },
        },
        c = function () {
          this.$createElement, this._self._c;
        },
        a = [];
      o.d(e, "b", function () {
        return c;
      }),
        o.d(e, "c", function () {
          return a;
        }),
        o.d(e, "a", function () {
          return n;
        });
    },
    "38f3": function (t, e, o) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = {
          components: {
            cmdProgress: function () {
              o.e("components/cmd-progress/cmd-progress")
                .then(
                  function () {
                    return resolve(o("2e5c"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          data: function () {
            return {
              tempFilePath: "",
              result: !1,
              text: "",
              handleFaceStatus: !1,
              resultImg: "",
              musicUrl: "",
              showMusic: !1,
              percent: 0,
            };
          },
          onLoad: function () {},
          methods: {
            copyMusic: function () {
              var e = this;
              t.setClipboardData({
                data: e.tempFilePath,
                success: function () {
                  t.setStorageSync(e.tempFilePath, e.tempFilePath),
                    t.showModal({
                      content: "已经复制链接到剪切板,请粘贴到浏览器下载",
                    });
                },
              });
            },
            upload: function () {
              var e = this;
              t.chooseVideo({
                count: 1,
                sourceType: ["album"],
                success: function (o) {
                  e.showMusic = !1;
                  var n = (o.size / 1048576).toFixed(2);
                  console.log("视频大小:" + n),
                    n > 30
                      ? t.showModal({ content: "视频超过30M,暂时无法处理" })
                      : ((e.tempFilePath = o.tempFilePath), (e.result = !0));
                },
              });
            },
            complete: function () {
              var e = this;
              t.showLoading({ title: "处理中" }),
                getApp().globalData,
                t.uploadFile({
                  url: e.$qrCodeUrl + "/upload/file",
                  filePath: e.tempFilePath,
                  name: "file",
                  formData: { user: "test" },
                  success: function (o) {
                    var n = JSON.parse(o.data).data;
                    wx.login({
                      success: function (o) {
                        var c = o.code;
                        t.request({
                          url: e.$qrCodeUrl + "/upload/clearMusic",
                          data: { code: c, filePath: n, source: e.$source },
                          method: "POST",
                          success: function (o) {
                            (e.result = !1),
                              t.showToast({ title: "去除成功" }),
                              "0001" === o.data.code
                                ? (console.log(o.data),
                                  (e.tempFilePath = o.data.data),
                                  (e.showMusic = !0))
                                : t.showModal({
                                    content: "未知错误，请联系作者进行解决",
                                  });
                          },
                          fail: function (e) {
                            t.showModal({
                              content: "去除失败，请联系作者进行解决",
                            });
                          },
                          complete: function (e) {
                            t.hideLoading();
                          },
                        });
                      },
                    });
                  },
                  fail: function (e) {
                    t.showModal({ content: "上传失败，请联系作者进行解决" }),
                      t.hideLoading();
                  },
                });
            },
            downloadFile: function () {
              var e = this;
              t.showLoading({ title: "加载下载资源中" }),
                t.authorize({
                  scope: "scope.writePhotosAlbum",
                  success: function () {
                    (e.percent = 0),
                      (e.fileStatus = "active"),
                      t
                        .downloadFile({
                          url: e.tempFilePath,
                          success: function (e) {
                            200 === e.statusCode &&
                              t.saveVideoToPhotosAlbum({
                                filePath: e.tempFilePath,
                              });
                          },
                          fail: function () {
                            t.showModal({
                              content: "下载失败，请复制无水印链接到浏览器下载",
                            });
                          },
                        })
                        .onProgressUpdate(function (o) {
                          (e.percent = o.progress),
                            100 == o.progress &&
                              t.showToast({
                                icon: "success",
                                title: "文件已保存到相册",
                              });
                        });
                  },
                  fail: function (e) {
                    t.showModal({
                      content:
                        "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]",
                    });
                  },
                  complete: function (e) {
                    t.hideLoading();
                  },
                });
            },
          },
        };
        e.default = n;
      }).call(this, o("543d").default);
    },
    "7ce9": function (t, e, o) {},
    "90a1": function (t, e, o) {
      o.r(e);
      var n = o("1971"),
        c = o("a571");
      for (var a in c)
        "default" !== a &&
          (function (t) {
            o.d(e, t, function () {
              return c[t];
            });
          })(a);
      o("99cc");
      var s = o("f0c5"),
        i = Object(s.a)(
          c.default,
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
      e.default = i.exports;
    },
    "99cc": function (t, e, o) {
      var n = o("7ce9");
      o.n(n).a;
    },
    a571: function (t, e, o) {
      o.r(e);
      var n = o("38f3"),
        c = o.n(n);
      for (var a in n)
        "default" !== a &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(a);
      e.default = c.a;
    },
    dc56: function (t, e, o) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        o("616a"), o("921b"), e(o("66fd")), t(e(o("90a1")).default);
      }).call(this, o("543d").createPage);
    },
  },
  [["dc56", "common/runtime", "common/vendor"]],
]);
