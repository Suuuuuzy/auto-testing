(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/readPage/detail"],
  {
    "0141": function (o, t, n) {
      "use strict";
      n.r(t);
      var e = n("bcc1"),
        i = n("3212");
      for (var s in i)
        ["default"].indexOf(s) < 0 &&
          (function (o) {
            n.d(t, o, function () {
              return i[o];
            });
          })(s);
      n("1606");
      var a,
        c = n("f0c5"),
        u = Object(c["a"])(
          i["default"],
          e["b"],
          e["c"],
          !1,
          null,
          "260314d4",
          null,
          !1,
          e["a"],
          a
        );
      t["default"] = u.exports;
    },
    1606: function (o, t, n) {
      "use strict";
      var e = n("4b5c"),
        i = n.n(e);
      i.a;
    },
    3212: function (o, t, n) {
      "use strict";
      n.r(t);
      var e = n("a537"),
        i = n.n(e);
      for (var s in e)
        ["default"].indexOf(s) < 0 &&
          (function (o) {
            n.d(t, o, function () {
              return e[o];
            });
          })(s);
      t["default"] = i.a;
    },
    "4b5c": function (o, t, n) {},
    9970: function (o, t, n) {
      "use strict";
      (function (o, t) {
        var e = n("4ea4");
        n("6cdc");
        e(n("66fd"));
        var i = e(n("0141"));
        (o.__webpack_require_UNI_MP_PLUGIN__ = n), t(i.default);
      }).call(this, n("bc2e")["default"], n("543d")["createPage"]);
    },
    a537: function (o, t, n) {
      "use strict";
      (function (o, e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        n("c9b7");
        var i = n("5d2d");
        t.default = {
          data: function () {
            return {
              bookId: "",
              bookInfo: null,
              recommend: [],
              isExistShelf: !1,
              shelfId: "",
              showShareMoney: !0,
              freeChapterContent: "",
              customParams: "",
              pid: "",
              shareMoneyIcom: "",
              hisChapter: "",
              allOption: null,
              indexBtn: 1,
              codeSrc: "",
              uniPlatform: "",
              shareDesc: "",
              publishId: "",
              AgentLink: {},
            };
          },
          onShow: function () {
            (this.uniPlatform = o.getSystemInfoSync().uniPlatform),
              this.gethomebanner();
            var t = this;
            if (t.pid)
              if ((0, i.getToken)())
                console.log("阅读页有TOKEN"), t.getBindUser();
              else {
                var n = this;
                o.login({
                  force: !0,
                  success: function (t) {
                    (t.uniPlatform = o.getSystemInfoSync().uniPlatform),
                      n.$post(n.$api.userauth, t).then(function (t) {
                        t.success &&
                          (o.setStorageSync("userId", t.data.id),
                          console.log("阅读页TOKEN"),
                          (0, i.getToken)() && n.getBindUser());
                      });
                  },
                  fail: function (o) {
                    console.log(o);
                  },
                });
              }
          },
          onShareAppMessage: function (t) {
            var n = this;
            console.log("123");
            var e = n.pid ? n.pid : o.getStorageSync("userId");
            return {
              title: n.shareDesc,
              imageUrl: "",
              path:
                "/pages/readPage/detail?ks_third_id=" +
                n.bookId +
                "&bookId=" +
                n.bookId +
                "&customParams=" +
                n.customParams +
                "&pid=" +
                e,
              success: function () {
                console.log(4444);
              },
              fail: function () {
                console.log(3333);
              },
            };
          },
          onLoad: function (o) {
            console.log(o),
              (this.allOption = o),
              (this.bookId = "undefined" == o.bookId ? null : o.bookId),
              (this.customParams =
                "undefined" == o.customParams ? null : o.customParams),
              (this.pid = "undefined" == o.pid ? "" : o.pid),
              this.showLoadingFun();
          },
          methods: {
            showPopup: function () {
              (this.indexBtn = 1), this.$refs.changepopup.open("center");
            },
            buttonChange: function (o) {
              var t = this;
              (this.indexBtn = o),
                4 == this.indexBtn &&
                  this.$get(this.$api.genAgentLink, {
                    bookId: this.bookId,
                  }).then(function (o) {
                    console.log(o), (t.AgentLink = o.data);
                  });
            },
            submitBtn: function () {
              if (1 == this.indexBtn) this.copycommand();
              else {
                var t = this;
                (0, i.getToken)()
                  ? 7 == t.indexBtn
                    ? t.copyWxLink()
                    : 4 == t.indexBtn
                    ? t.genAgentLink()
                    : t.getUrl()
                  : o.login({
                      force: !0,
                      success: function (n) {
                        (n.uniPlatform = o.getSystemInfoSync().uniPlatform),
                          t.$post(t.$api.userauth, n).then(function (o) {
                            o.success &&
                              (console.log("阅读页TOKEN"),
                              (0, i.getToken)() &&
                                (7 == t.indexBtn
                                  ? t.copyWxLink()
                                  : 4 == t.indexBtn
                                  ? t.genAgentLink()
                                  : t.getUrl()));
                          });
                      },
                      fail: function (o) {
                        console.log(o);
                      },
                    });
              }
            },
            genAgentLink: function () {
              this.$refs.changepopup.close();
              var t = this;
              o.navigateToMiniProgram({
                appId: t.AgentLink.app_id,
                path: t.AgentLink.app_link,
                success: function (o) {
                  console.log("成功11"), console.log(o);
                },
                fail: function (o) {
                  console.log("失败11"), console.log(o);
                },
                complete: function (o) {
                  console.log("结束11"), console.log(o);
                },
              });
            },
            getUrl: function () {
              var t = this;
              console.log("bookId");
              var n = {
                bookId: this.bookId,
                siteType:
                  "mp-toutiao" == this.uniPlatform
                    ? 5
                    : "mp-kuaishou" == this.uniPlatform
                    ? 6
                    : "mp-weixin" == this.uniPlatform
                    ? 7
                    : "",
              };
              "mp-toutiao" == this.uniPlatform &&
                (n.isVideo = 2 == this.indexBtn || (3 != this.indexBtn && "")),
                this.$get(this.$api.bookMount, n).then(function (n) {
                  console.log(n),
                    n.success &&
                      n.data &&
                      (8 == t.indexBtn
                        ? o.setClipboardData({
                            data: n.data,
                            success: function () {
                              o.showToast({
                                title: "复制成功！",
                                icon: "none",
                                duration: 1e3,
                              });
                            },
                          })
                        : ((t.codeSrc = n.data),
                          t.$refs.resultpopup.open("center"),
                          t.$refs.changepopup.close()));
                });
            },
            copyWxLink: function () {
              var t = this;
              o.showLoading({ title: "正在生成中" });
              var n = { bookId: this.bookId };
              this.$get(this.$api.bookWxLink, n).then(function (n) {
                console.log(n),
                  n.data && "publishId" == n.data.type && n.data.publishId
                    ? ((t.publishId = n.data.publishId),
                      setTimeout(t.pollAPI, 1e4))
                    : n.data &&
                      n.data.link &&
                      o.setClipboardData({
                        data: n.data.link,
                        success: function () {
                          o.showToast({
                            title: "复制成功！",
                            icon: "none",
                            duration: 1e3,
                          });
                        },
                      });
              });
            },
            pollAPI: function () {
              var t = this;
              o.showLoading({ title: "正在生成中" }),
                this.$post(this.$api.bookWxLink, {
                  bookId: this.bookId,
                  publishId: this.publishId,
                }).then(function (n) {
                  n.data.link
                    ? n.data &&
                      n.data.link &&
                      (o.setClipboardData({
                        data: n.data.link,
                        success: function () {
                          o.showToast({
                            title: "复制成功！",
                            icon: "none",
                            duration: 1e3,
                          });
                        },
                      }),
                      o.hideLoading())
                    : setTimeout(t.pollAPI, 2e3);
                });
            },
            imgTost: function () {
              o.showToast({ title: "请截屏保存二维码", icon: "none" });
            },
            saveImg: function () {
              console.log("223");
              var t = this,
                n = "";
              "mp-toutiao" == this.uniPlatform
                ? (n = "scope.album")
                : "mp-kuaishou" == this.uniPlatform &&
                  (n = "scope.writePhotosAlbum"),
                o.authorize({
                  scope: n,
                  success: function () {
                    console.log("234"), t.downLoadImg();
                  },
                  fail: function () {
                    console.log("123"),
                      o.getSetting({
                        success: function (o) {
                          console.log(o, "result"),
                            console.log(
                              o.authSetting["scope.writePhotosAlbum"]
                            ),
                            o.authSetting["scope.writePhotosAlbum"] ||
                              t.isAuth();
                        },
                      });
                  },
                });
            },
            downLoadImg: function () {
              console.log(this.codeSrc);
              var t = this.codeSrc.replace(/^data:image\/\w+;base64,/, "");
              console.log(this.codeSrc);
              var n = e.env.USER_DATA_PATH + "/hym_pay_qrcode.png";
              console.log(n),
                o.getFileSystemManager().writeFile({
                  filePath: n,
                  data: t,
                  encoding: "base64",
                  success: function (t) {
                    o.saveImageToPhotosAlbum({
                      filePath: n,
                      success: function (t) {
                        o.showToast({
                          title: "保存成功，请从相册选择再分享",
                          icon: "none",
                          duration: 2e3,
                        });
                      },
                      fail: function (t) {
                        o.showToast({ title: "下载失败", icon: "none" });
                      },
                    });
                  },
                  fail: function (t) {
                    o.showToast({ title: "下载失败", icon: "none" });
                  },
                });
            },
            isAuth: function () {
              o.showModal({
                content:
                  "由于您还没有允许保存图片到您相册里,无法进行保存,请点击确定允许授权",
                success: function (t) {
                  t.confirm &&
                    o.openSetting({
                      success: function (o) {
                        console.log(o.authSetting);
                      },
                    });
                },
              });
            },
            getBindUser: function () {
              var o = this;
              o.pid &&
                o.$post(o.$api.bindUserPartner, o.allOption).then(function (o) {
                  console.log(o);
                });
            },
            gethomebanner: function () {
              var t = this;
              this.$get(this.$api.bookdetail, { bookId: this.bookId }).then(
                function (n) {
                  console.log(n),
                    t.hideLoadingFun(),
                    n.success &&
                      ((t.bookInfo = n.data.book),
                      o.setNavigationBarTitle({ title: t.bookInfo.name }),
                      (t.shareMoneyIcom = n.data.shareMoneyIcom),
                      (t.freeChapterContent = n.data.freeChapterContent),
                      (t.showShareMoney = n.data.showShareMoney),
                      (t.isExistShelf =
                        !!n.data.readStatus && n.data.readStatus.isExistShelf),
                      (t.hisChapter =
                        n.data.readStatus && n.data.readStatus.hisChapter
                          ? n.data.readStatus.hisChapter.id
                          : ""),
                      (t.shelfId = n.data.recommend.id),
                      (t.shareDesc = n.data.desc),
                      t.getbookshelf());
                }
              );
            },
            getbookshelf: function () {
              var o = this;
              this.$get(this.$api.bookshelf, { shelfId: this.shelfId }).then(
                function (t) {
                  console.log(t),
                    t.success &&
                      ((o.recommend = []), (o.recommend = t.data.content));
                }
              );
            },
            getRecommendcid: function (o) {
              (this.bookId = o), this.gethomebanner();
            },
            addShelfFun: function () {
              var t = this;
              this.showLoadingFun(),
                this.$post(this.$api.shelfadd, { bookId: this.bookId }).then(
                  function (n) {
                    console.log(n),
                      t.hideLoadingFun(),
                      n.success &&
                        (o.showToast({
                          title: "已加入书架",
                          icon: "none",
                          duration: 1e3,
                        }),
                        o.setStorageSync("isShelf", !0),
                        (t.isExistShelf = !0));
                  }
                );
            },
          },
        };
      }).call(this, n("543d")["default"], n("bc2e")["default"]);
    },
    bcc1: function (o, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return i;
      }),
        n.d(t, "c", function () {
          return s;
        }),
        n.d(t, "a", function () {
          return e;
        });
      var e = {
          uniIcons: function () {
            return Promise.all([
              n.e("common/vendor"),
              n.e("uni_modules/uni-icons/components/uni-icons/uni-icons"),
            ]).then(n.bind(null, "1a49"));
          },
          uniPopup: function () {
            return n
              .e("uni_modules/uni-popup/components/uni-popup/uni-popup")
              .then(n.bind(null, "27c0"));
          },
        },
        i = function () {
          var o = this,
            t = o.$createElement,
            n =
              (o._self._c,
              o.bookInfo && o.bookInfo.tags
                ? o.bookInfo.tags.split(",")
                : null);
          o.$mp.data = Object.assign({}, { $root: { l0: n } });
        },
        s = [];
    },
  },
  [["9970", "common/runtime", "common/vendor"]],
]);
