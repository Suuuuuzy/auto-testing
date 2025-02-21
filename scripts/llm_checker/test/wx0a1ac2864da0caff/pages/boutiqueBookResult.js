(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutiqueBookResult"],
  {
    "0154": function (t, e, o) {
      "use strict";
      (function (t, n) {
        var a = o("47a9");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var i = a(o("7ca3")),
          c = o("05ff"),
          s = o("8f59"),
          r = o("4bd4"),
          l = a(o("e94a")),
          u = o("7791");
        function h(t, e) {
          var o = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              o.push.apply(o, n);
          }
          return o;
        }
        var d = {
          config: { navigationStyle: "custom", disableScroll: !0 },
          components: {
            ppNav: function () {
              o.e("components/pp/Nav")
                .then(
                  function () {
                    return resolve(o("ac66"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
            PrivacyPopup: function () {
              o.e("components/privacyPopup")
                .then(
                  function () {
                    return resolve(o("42b0"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          computed: (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var o = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? h(Object(o), !0).forEach(function (e) {
                    (0, i.default)(t, e, o[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(o)
                  )
                : h(Object(o)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(o, e)
                    );
                  });
            }
            return t;
          })(
            {},
            (0, s.mapState)({
              navigationBarHeight: function (t) {
                return t.navigationBarHeight;
              },
              navigationBarHeightPlaceholder: function (t) {
                return t.navigationBarHeightPlaceholder;
              },
              bookCache: function (t) {
                return t.bookCache;
              },
            })
          ),
          data: function () {
            return { detail: null, timeShow: "", phone: "", status: 0 };
          },
          methods: {
            changeBook: function () {
              var t = this;
              this.$alert({
                content: "请确认是否修改预约",
                showCancel: !0,
                success: function () {
                  t.$router.replace(
                    "boutiqueBookTime?update=1&id=" + t.bookCache.boutique_code
                  );
                },
              });
            },
            savePic: function () {
              var e = this;
              t.showLoading({ title: "加载中", mask: !0 });
              var o = t.createCanvasContext("poster");
              o.setFillStyle("#FFFFFF"),
                o.fillRect(0, 0, 750, 1300),
                o.setFillStyle("#DBD1C8"),
                o.fillRect(60, 560, 630, 1),
                o.drawImage(
                  "https://cdn.impdigital.cn/patek/book-top.jpg",
                  0,
                  0,
                  750,
                  420
                ),
                o.setTextBaseline("top"),
                o.setTextAlign("center"),
                o.setFillStyle("#9C8A76"),
                o.setFontSize(36),
                o.fillText("预约成功", 375, 470),
                o.setFontSize(32),
                o.fillText(
                  ""
                    .concat(this.bookCache.lastname)
                    .concat(this.bookCache.firstname)
                    .concat(
                      1 === this.bookCache.gender
                        ? " 先生"
                        : 2 === this.bookCache.gender
                        ? " 女士"
                        : ""
                    ),
                  375,
                  621
                ),
                o.fillText("预约时间", 375, 726),
                o.setFontSize(30),
                o.fillText(this.detail.name, 375, 897),
                o.setFontSize(28),
                o.setFillStyle("#463427"),
                o.fillText(this.timeShow, 375, 787),
                o.fillText(this.detail.address, 375, 955),
                o.fillText(this.detail.phone, 375, 1011),
                o.draw(),
                setTimeout(function () {
                  t.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 750,
                    height: 1300,
                    destWidth: 750,
                    destHeight: 1300,
                    canvasId: "poster",
                    success: function (o) {
                      t.hideLoading(), e.saveImageToPhoto(o.tempFilePath);
                    },
                    fail: function () {
                      t.hideLoading();
                    },
                  });
                }, 100);
            },
            saveImageToPhoto: function (e) {
              var o = this;
              e
                ? (t.showLoading({ title: "正在保存图片", mask: !0 }),
                  t.saveImageToPhotosAlbum({
                    filePath: e,
                    success: function () {
                      t.hideLoading(), o.$alert("保存图片成功");
                    },
                    fail: function (e) {
                      t.hideLoading(),
                        console.log(e),
                        "saveImageToPhotosAlbum:fail cancel" === e.errMsg
                          ? o.$alert({
                              title: "保存图片失败",
                              content: "您已取消保存图片到相册",
                              showCancel: !1,
                            })
                          : o.$alert(
                              "保存图片失败，请获取相册权限后再尝试保存"
                            );
                    },
                  }))
                : this.$alert("图片正在生成中，请稍等片刻");
            },
            cancelBook: function () {
              var e = this;
              console.log("cancel"),
                this.$alert({
                  content: "请确认是否取消预约",
                  showCancel: !0,
                  success: function () {
                    t.requestSubscribeMessage({
                      tmplIds: ["GoJ4TDKVm0RL51V53a7_hrkbeIOuu6FjRBetQE_7g0c"],
                      success: function () {
                        e.$http.cancelBook(
                          { token: e.bookCache.token },
                          function () {
                            e.$alert({
                              content: "取消成功",
                              showCancel: !1,
                              success: function () {
                                e.$router.back();
                              },
                            });
                          }
                        );
                      },
                    });
                  },
                });
            },
            callPhone: function () {
              var t = this.phone.split("tel:");
              n.makePhoneCall({ phoneNumber: t[1], error: function () {} });
              var e = {
                m04v: "北京源邸",
                m0n3: "上海源邸",
                m5Ky: "北京客服中心",
                qy68: "上海客服中心",
              };
              e[this.detail.id] &&
                this.$tracking("common_event_click", {
                  event_name: e,
                  event_category: "电话",
                  event_value: "电话",
                });
            },
            showLocation: function () {
              var t = {
                m04v: "北京源邸",
                m0n3: "上海源邸",
                m5Ky: "北京客服中心",
                qy68: "上海客服中心",
              };
              t[this.detail.id] &&
                this.$tracking("common_event_click", {
                  event_name: t,
                  event_category: "导航",
                  event_value: "导航",
                }),
                n.openLocation({
                  name: this.detail.name,
                  address: this.detail.address,
                  latitude: this.detail.latitude,
                  longitude: this.detail.longitude,
                  scale: 16,
                });
            },
          },
          mounted: function () {
            var t = this.$dayjs(
                this.bookCache.day + " " + this.bookCache.start_time
              ),
              e = u.weekName.zh[parseInt(t.format("d"))],
              o = this.bookCache.day.split("-"),
              n = this.bookCache.start_time.split(":"),
              a = t.format("h");
            (a = parseInt(n[0]) <= 12 ? "上午" + a + "点" : "下午" + a + "点"),
              "30" === n[1] && (a += "30分"),
              (this.timeShow = ""
                .concat(o[0], "年")
                .concat(o[1], "月")
                .concat(o[2], "日 ")
                .concat(e, " ")
                .concat(a));
            var i = (0, r.getBoutiqueById)(this.bookCache.boutique_code);
            if (
              (l.default[this.bookCache.boutique_code] &&
                (i = Object.assign(i, l.default[this.bookCache.boutique_code])),
              (this.detail = i),
              this.detail.phone)
            ) {
              var s = (0, c.parsePhoneNumberFromString)(this.detail.phone);
              this.phone = s ? s.getURI() : this.detail.phone;
            } else this.phone = "";
            var h = this.$dayjs();
            h.isAfter(this.$dayjs(this.bookCache.day + " 23:59:59"))
              ? (this.status = -1)
              : (this.status = this.bookCache.status);
          },
        };
        e.default = d;
      }).call(this, o("3223")["default"], o("df3c")["default"]);
    },
    "21c3": function (t, e, o) {
      "use strict";
      o.d(e, "b", function () {
        return n;
      }),
        o.d(e, "c", function () {
          return a;
        }),
        o.d(e, "a", function () {});
      var n = function () {
          var t = this.$createElement;
          this._self._c;
        },
        a = [];
    },
    "3b4e": function (t, e, o) {
      "use strict";
      o.r(e);
      var n = o("21c3"),
        a = o("bdd0");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return a[t];
            });
          })(i);
      o("bdd5");
      var c = o("828b"),
        s = Object(c["a"])(
          a["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "314e9186",
          null,
          !1,
          n["a"],
          void 0
        );
      e["default"] = s.exports;
    },
    a1d2: function (t, e, o) {
      "use strict";
      (function (t, e) {
        var n = o("47a9");
        o("b45a");
        n(o("3240"));
        var a = n(o("3b4e"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = o), e(a.default);
      }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    },
    bdd0: function (t, e, o) {
      "use strict";
      o.r(e);
      var n = o("0154"),
        a = o.n(n);
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(i);
      e["default"] = a.a;
    },
    bdd5: function (t, e, o) {
      "use strict";
      var n = o("e0e1"),
        a = o.n(n);
      a.a;
    },
    e0e1: function (t, e, o) {},
  },
  [["a1d2", "common/runtime", "common/vendor"]],
]);
