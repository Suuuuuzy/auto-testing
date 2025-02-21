(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/watch"],
  {
    "1bb0": function (e, t, i) {
      "use strict";
      i.d(t, "b", function () {
        return n;
      }),
        i.d(t, "c", function () {
          return o;
        }),
        i.d(t, "a", function () {});
      var n = function () {
          var e = this,
            t = e.$createElement;
          e._self._c;
          e._isMounted ||
            ((e.e0 = function (t) {
              1 === e.cType ? (e.cType = 2) : (e.cType = 1);
            }),
            (e.e1 = function (t) {
              e.showShare = !1;
            }),
            (e.e2 = function (t) {
              e.showShare = !1;
            }));
        },
        o = [];
    },
    "1c28": function (e, t, i) {
      "use strict";
      var n = i("a095"),
        o = i.n(n);
      o.a;
    },
    "2ef5": function (e, t, i) {
      "use strict";
      (function (e) {
        var n = i("47a9");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(i("7ca3")),
          a = i("8f59"),
          s = i("8714"),
          r = i("9f04"),
          c = i("fe17");
        function l(e, t) {
          var i = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              i.push.apply(i, n);
          }
          return i;
        }
        var h,
          u,
          d = {
            宝石镶嵌表壳及表链精饰: "BSXQ_RH",
            "手工精饰工艺是什么？手工精饰工艺是什么？": "SGJS",
            表壳及表链精饰表壳及表链精饰: "BK",
            表链精饰表壳及表链精饰: "BL",
            其他装饰表盘精饰: "QTZS",
            机芯部件精饰机芯部件精饰: "JXBJ",
            抛光表壳及表链精饰: "PG",
            表盘的制作表盘精饰: "BP",
            雕饰纹表盘精饰: "DSW",
            宝石镶嵌表盘精饰: "BSXQ_HBS",
            雕刻表壳及表链精饰: "DK",
            "<strong>雕刻师</strong>精湛工艺|百达翡丽珐琅": "DKS",
            "百达翡丽总裁泰瑞·斯登问答百达翡丽总裁泰瑞·斯登问答": "ZC",
            "组装百达翡丽三问报时腕表|百达翡丽三问报时腕表组装百达翡丽三问报时腕表|百达翡丽三问报时腕表":
              "ZZ",
            珐琅工艺表盘精饰: "FLGY",
            "<strong>宝石镶嵌师</strong>精湛工艺|百达翡丽珐琅": "Strong_BSXQS",
            "传承|百达翡丽珍稀工艺传承传承|百达翡丽珍稀工艺传承": "CC",
            "<strong>珐</strong><strong>琅</strong><strong>工匠</strong>精湛工艺|百达翡丽珐琅":
              "FL",
            灵感灵感: "LG",
            "<strong>珐琅工匠的技艺</strong>精湛工艺|百达翡丽珐琅": "FLGJ",
            "<strong>细木镶嵌</strong><strong>工</strong><strong>匠</strong>精湛工艺|百达翡丽珐琅":
              "XMXQ",
            "<strong>圆顶座钟――完美典范</strong>灵感": "YDZZ",
          },
          f = [],
          g = 0,
          p = 0,
          v = 0,
          m = {
            config: { navigationStyle: "custom", disableScroll: !0 },
            components: {
              ppIndex: function () {
                i.e("components/pp/Index")
                  .then(
                    function () {
                      return resolve(i("25e2"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
              ppWatchIndex: function () {
                i.e("components/pp/WatchIndex")
                  .then(
                    function () {
                      return resolve(i("fc1b"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
              ppNav: function () {
                i.e("components/pp/Nav")
                  .then(
                    function () {
                      return resolve(i("ac66"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
              ppMe: function () {
                Promise.all([i.e("common/vendor"), i.e("components/pp/Me")])
                  .then(
                    function () {
                      return resolve(i("478c"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
              PrivacyPopup: function () {
                i.e("components/privacyPopup")
                  .then(
                    function () {
                      return resolve(i("42b0"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
            },
            computed: (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var i = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? l(Object(i), !0).forEach(function (t) {
                      (0, o.default)(e, t, i[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(i)
                    )
                  : l(Object(i)).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(i, t)
                      );
                    });
              }
              return e;
            })(
              {},
              (0, a.mapState)({
                navigationBarHeight: function (e) {
                  return e.navigationBarHeight;
                },
                navigationBarHeightPlaceholder: function (e) {
                  return e.navigationBarHeightPlaceholder;
                },
                wishList: function (e) {
                  return e.wishList;
                },
              })
            ),
            data: function () {
              return {
                top: 0,
                detail: null,
                others: null,
                calibers: null,
                nowPic: 0,
                nowProduct: 0,
                cType: 1,
                btnMore: "",
                bg: "",
                showShare: !1,
                liked: !1,
                loading: !1,
                progress: 0,
                loaded3d: !1,
                cvsHeight: 3e3,
                shareImg: "",
              };
            },
            methods: {
              learnMore: function (e) {
                this.$tracking("common_event_click", {
                  event_name: "时计PDP页面",
                  event_category: "了解更多btn",
                  event_value: "了解更多btn",
                }),
                  this.$router.push(
                    "watch?ref=" + encodeURIComponent(e.articleRef)
                  );
              },
              toSavior: function () {
                this.$tracking("common_event_click", {
                  event_name: "时计PDP页面",
                  event_category: "机芯部件精饰",
                  event_value: "机芯部件精饰",
                }),
                  this.$router.push(
                    "web?url=" +
                      encodeURIComponent(
                        "https://www.patek.com" + this.detail.savoirFaire.link
                      )
                  );
              },
              toSeal: function () {
                this.$tracking("common_event_click", {
                  event_name: "时计PDP页面",
                  event_category: "百达翡丽印记",
                  event_value: "百达翡丽印记",
                }),
                  this.$router.push(
                    "web?url=" +
                      encodeURIComponent(
                        "https://www.patek.com/chs/%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD/%E5%B7%A5%E5%9D%8A%E4%BB%8B%E7%BB%8D#%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD%E5%8D%B0%E8%AE%B0"
                      )
                  );
              },
              chooseType: function (e) {
                this.$tracking("common_event_click", {
                  event_name: "时计PDP页面",
                  event_category: "机芯",
                  event_value: "机芯-" + ["正面", "背面"][e - 1],
                }),
                  (this.cType = e);
              },
              touchstart: function (e) {
                var t = e.touches[0].x;
                (v = p), (g = t);
              },
              touchmove: function (e) {
                var t = e.touches[0].x,
                  i = Math.ceil((t - g) / -5);
                (p = v + i),
                  p > this.detail.threeSixty.imagesCount
                    ? (p -= this.detail.threeSixty.imagesCount)
                    : p < 0 && (p += this.detail.threeSixty.imagesCount),
                  f[p] &&
                    h.requestAnimationFrame(function () {
                      u.drawImage(f[p], 0, 0, h.width, h.height);
                    });
              },
              show3d: function () {
                this.$alert("功能暂未开放");
              },
              load3d: function () {
                var e = this,
                  t = this.detail.threeSixty,
                  i = t.folderImages,
                  n = t.imagesCount;
                f = [];
                for (var o = 0, a = 1; a <= n; a++)
                  (function (t) {
                    var a = h.createImage();
                    (a.onload = function () {
                      (f[t - 1] = a),
                        o++,
                        (e.progress = Math.ceil((o / n) * 100)),
                        o === n &&
                          ((e.loading = !1),
                          u.drawImage(f[0], 0, 0, h.width, h.height),
                          (e.loaded3d = !0));
                    }),
                      (a.onerror = function () {
                        (f[t - 1] = ""),
                          o++,
                          (e.progress = Math.ceil((o / n) * 100)),
                          o === n &&
                            ((e.loading = !1),
                            u.drawImage(f[0], 0, 0, h.width, h.height),
                            (e.loaded3d = !0));
                      }),
                      (a.src = i + t + ".jpg");
                  })(a);
              },
              showShareNow: function () {
                var t = this;
                e.showLoading({ title: "分享图生成中" }),
                  this.$tracking("common_event_click", {
                    event_name: "PDP底部TAB",
                    event_category: "分享",
                    event_value: "分享",
                  }),
                  (this.showShare = !0),
                  (this.shareImg = "");
                this.cvsHeight = 1390;
                var i = e.createCanvasContext("poster");
                i.setFillStyle("#FFFFFF"),
                  i.fillRect(0, 0, 750, 1390),
                  i.setTextAlign("center"),
                  i.setTextBaseline("top"),
                  i.setFontSize(38),
                  i.setFillStyle("#9C8A76"),
                  i.fillText(this.detail.reference, 375, 748),
                  i.setFillStyle("#463427"),
                  i.fillText(this.detail.collection, 375, 799),
                  i.setFontSize(29),
                  i.setFillStyle("#463427"),
                  i.fillText(this.detail.caliberType, 375, 857),
                  i.setFillStyle("#9C8A76");
                var n = "";
                (n =
                  this.detail.price && "null" !== this.detail.price
                    ? this.detail.price
                    : "按需报价"),
                  i.fillText("价格 : " + n, 375, 932),
                  i.setFontSize(22),
                  i.setFillStyle("#999999"),
                  i.fillText("建议零售价 (含税)", 375, 983),
                  i.fillText(
                    "价格可能随时更改，因此并不构成合约报价",
                    375,
                    1015
                  ),
                  i.setFontSize(24),
                  i.setFillStyle("#463427"),
                  i.fillText("百达翡丽时计查询小程序", 375, 1301),
                  e.downloadFile({
                    url: this.detail.articleImages,
                    success: function (n) {
                      200 === n.statusCode
                        ? (i.drawImage(n.tempFilePath, 173, 190, 403, 535),
                          i.drawImage(
                            "/static/img/logo.png",
                            270,
                            45,
                            212,
                            114
                          ),
                          e.downloadFile({
                            url:
                              "https://api.impdigital.cn/patek/boutique/qrcode/product.php?ref=" +
                              encodeURIComponent(t.detail.articleRef),
                            success: function (n) {
                              200 === n.statusCode
                                ? (i.drawImage(
                                    n.tempFilePath,
                                    269,
                                    1077,
                                    213,
                                    213
                                  ),
                                  i.draw(),
                                  setTimeout(function () {
                                    e.canvasToTempFilePath(
                                      {
                                        x: 0,
                                        y: 0,
                                        width: 750,
                                        height: 1390,
                                        destWidth: 750,
                                        destHeight: 1390,
                                        canvasId: "poster",
                                        success: function (i) {
                                          console.log(i.tempFilePath),
                                            (t.shareImg = i.tempFilePath),
                                            (t.top = 0),
                                            e.hideLoading();
                                        },
                                        fail: function (t) {
                                          console.log(t), e.hideLoading();
                                        },
                                      },
                                      t
                                    );
                                  }, 100))
                                : e.hideLoading();
                            },
                            fail: function (t) {
                              console.log(t), e.hideLoading();
                            },
                          }))
                        : e.hideLoading();
                    },
                    fail: function (t) {
                      console.log(t), e.hideLoading();
                    },
                  });
              },
              saveImageToPhoto: function () {
                var t = this;
                this.shareImg
                  ? (e.showLoading({ title: "正在保存图片", mask: !0 }),
                    e.saveImageToPhotosAlbum({
                      filePath: this.shareImg,
                      success: function () {
                        e.hideLoading(), t.$alert("保存图片成功");
                      },
                      fail: function (i) {
                        e.hideLoading(),
                          "saveImageToPhotosAlbum:fail cancel" === i.errMsg
                            ? t.$alert({
                                title: "保存图片失败",
                                content: "您已取消保存图片到相册",
                                showCancel: !1,
                              })
                            : t.$alert(
                                "保存图片失败，请获取相册权限后再尝试保存"
                              );
                      },
                    }))
                  : this.$alert("图片正在生成中，请稍等片刻");
              },
              toBoutique: function () {
                this.$tracking("common_event_click", {
                  event_name: "PDP底部TAB",
                  event_category: "销售中心",
                  event_value: "销售中心",
                }),
                  this.$router.push({
                    path: "/pages/index?tab=4",
                    reLaunch: !0,
                  });
              },
              downPDF: function () {
                var t = this;
                this.$tracking("common_event_click", {
                  event_name: "PDP底部TAB",
                  event_category: "使用说明",
                  event_value: "使用说明",
                }),
                  this.detail.pdf
                    ? e.openDocument({
                        filePath: this.detail.pdf,
                        success: function (e) {},
                      })
                    : (e.showLoading({ title: "正在下载中", mask: !0 }),
                      e.downloadFile({
                        url: this.detail.instructionsForUse,
                        success: function (i) {
                          var n = i.tempFilePath;
                          (t.detail.pdf = n),
                            e.openDocument({
                              filePath: n,
                              success: function (e) {},
                            });
                        },
                        complete: function () {
                          e.hideLoading();
                        },
                      }));
              },
              chooseTab: function (e) {
                this.tab = e;
              },
              preview: function (t) {
                e.previewImage({
                  current: t,
                  urls: this.detail.imagesArtistic,
                });
              },
              scrollPage: function (e) {
                var t = e.mp.detail.scrollTop;
                this.showNav = t >= 300 * this.$rpx;
              },
              changeSwiper: function (e) {
                this.nowPic = e.mp.detail.current;
              },
              changeProductSwiper: function (e) {
                this.nowProduct = e.mp.detail.current;
              },
              likeThis: function () {
                var e = this.wishList.indexOf(this.detail.articleRef);
                this.liked
                  ? (e >= 0 && this.$store.commit("UPDATE_WISH_LIST_REMOVE", e),
                    (this.liked = !1))
                  : (e < 0 &&
                      this.$store.commit(
                        "UPDATE_WISH_LIST_PUSH",
                        this.detail.articleRef
                      ),
                    (this.liked = !0),
                    this.$tracking("common_event_click", {
                      event_name: "PDP底部TAB",
                      event_category: "加入愿望清单",
                      event_value: "加入愿望清单",
                    })),
                  this.$http.addFavorite(
                    {
                      watch_ref: this.detail.articleRef,
                      status: this.liked ? 1 : 0,
                    },
                    function () {}
                  );
              },
              initData: function (e) {
                (this.detail = (0, s.getProductById)(e)),
                  console.log("this.detail", this.detail),
                  (this.others = null),
                  (this.nowPic = 0),
                  (this.nowProduct = 0);
                var t = this.detail.otherModels,
                  i = [];
                for (var n in t) {
                  var o = (0, s.getProductById)(n);
                  i.push({
                    articleRef: o.articleRef,
                    articleImages: t[n],
                    caseMaterial: o.caseMaterial,
                  });
                }
                if (
                  ((this.others = i),
                  this.detail.savoirFaire && this.detail.savoirFaire.link)
                ) {
                  var a = this.detail.savoirFaire.link.split("/");
                  (this.btnMore = a[a.length - 1]),
                    (this.bg =
                      d[this.detail.savoirFaire.subtitle + this.btnMore]);
                } else (this.btnMore = ""), (this.bg = "");
              },
            },
            onShareAppMessage: function (e) {
              var t = this.detail.reference + " - " + this.detail.collection,
                i = "/pages/watch?ref=".concat(
                  encodeURIComponent(this.detail.articleRef),
                  "&share=1"
                ),
                n = this.detail.articleImages;
              return { title: t, path: i, imageUrl: n };
            },
            onShow: function () {
              var t = this,
                i = getCurrentPages(),
                n = decodeURIComponent(i[i.length - 1].options.ref);
              if (
                ((h = null),
                (u = null),
                (f = []),
                (g = 0),
                (p = 0),
                (this.loaded3d = !1),
                (this.loading = !1),
                (this.progress = 0),
                this.wishList.indexOf(n) >= 0
                  ? (this.liked = !0)
                  : (this.liked = !1),
                !this.detail ||
                  !this.detail.articleRef ||
                  this.detail.articleRef !== n)
              ) {
                var o = (0, s.getProductById)(n);
                if ((console.log("detail", o), o)) this.initData(n);
                else {
                  e.showLoading({ title: "加载中", mask: !0 });
                  Date.parse(new Date());
                  e.request({
                    url: "https://patek.resource.impdigital.cn/product2.json",
                    dataType: "json",
                    complete: function () {
                      e.hideLoading();
                    },
                    success: function (e) {
                      var i = e.data,
                        o = i.watches,
                        a = i.calibers,
                        l = i.jewels;
                      console.log("watches", o),
                        (0, s.setProduct)(o),
                        (0, c.setCalibers)(a),
                        (0, r.setJewels)(l),
                        t.initData(n);
                    },
                  });
                }
              }
            },
          };
        t.default = m;
      }).call(this, i("3223")["default"]);
    },
    "4c41": function (e, t, i) {
      "use strict";
      i.r(t);
      var n = i("2ef5"),
        o = i.n(n);
      for (var a in n)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            i.d(t, e, function () {
              return n[e];
            });
          })(a);
      t["default"] = o.a;
    },
    "9eae": function (e, t, i) {
      "use strict";
      i.r(t);
      var n = i("1bb0"),
        o = i("4c41");
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            i.d(t, e, function () {
              return o[e];
            });
          })(a);
      i("1c28");
      var s = i("828b"),
        r = Object(s["a"])(
          o["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "a299ea6a",
          null,
          !1,
          n["a"],
          void 0
        );
      t["default"] = r.exports;
    },
    a095: function (e, t, i) {},
    e93a: function (e, t, i) {
      "use strict";
      (function (e, t) {
        var n = i("47a9");
        i("b45a");
        n(i("3240"));
        var o = n(i("9eae"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = i), t(o.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
  },
  [["e93a", "common/runtime", "common/vendor"]],
]);
