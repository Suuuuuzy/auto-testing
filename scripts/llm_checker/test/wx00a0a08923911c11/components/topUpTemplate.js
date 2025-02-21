(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/topUpTemplate"],
  {
    "1c97": function (e, o, t) {
      "use strict";
      var n = t("3d97"),
        a = t.n(n);
      a.a;
    },
    "3d97": function (e, o, t) {},
    "892f": function (e, o, t) {
      "use strict";
      t.d(o, "b", function () {
        return a;
      }),
        t.d(o, "c", function () {
          return i;
        }),
        t.d(o, "a", function () {
          return n;
        });
      var n = {
          uniPopup: function () {
            return t
              .e("uni_modules/uni-popup/components/uni-popup/uni-popup")
              .then(t.bind(null, "27c0"));
          },
          uniIcons: function () {
            return Promise.all([
              t.e("common/vendor"),
              t.e("uni_modules/uni-icons/components/uni-icons/uni-icons"),
            ]).then(t.bind(null, "1a49"));
          },
        },
        a = function () {
          var e = this,
            o = e.$createElement;
          e._self._c;
        },
        i = [];
    },
    b321: function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("df4a"),
        a = t.n(n);
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return n[e];
            });
          })(i);
      o["default"] = a.a;
    },
    d670: function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("892f"),
        a = t("b321");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return a[e];
            });
          })(i);
      t("1c97");
      var s,
        r = t("f0c5"),
        p = Object(r["a"])(
          a["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "4e5707d9",
          null,
          !1,
          n["a"],
          s
        );
      o["default"] = p.exports;
    },
    df4a: function (e, o, t) {
      "use strict";
      (function (e) {
        var n = t("4ea4");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        var a = n(t("2eee")),
          i = n(t("c973"));
        o.default = {
          name: "topUpTemplate",
          props: {
            payFlag: { type: Number, value: 1 },
            bookId: { type: String, value: "" },
            isWxReaderFlag: { type: Boolean, value: !1 },
            allOption: { type: Object, value: null },
            scrollTop: { type: Number, value: 0 },
          },
          data: function () {
            return {
              productId: "",
              consumegradeList: [],
              platform: "",
              uniPlatform: "",
              orderId: "",
              requestStatus: !1,
              version: "",
              appName: "",
              imId: "",
              programName: "",
              gradeType: 1,
              paySceneType: { type: "", paySceneDetail: "", moneyStr: "" },
              payment: { provider: "ALIPAY", provider_channel_type: "NORMAL" },
            };
          },
          mounted: function () {
            var o = this;
            return (0, i.default)(
              a.default.mark(function t() {
                return a.default.wrap(function (t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        console.log(222),
                          (o.platform = e.getSystemInfoSync().platform),
                          (o.programName = JSON.parse(
                            e.getStorageSync("appInfo")
                          ).appName),
                          "mp-toutiao" == e.getSystemInfoSync().uniPlatform &&
                            o.getVersion();
                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )();
          },
          methods: {
            getVersion: function () {
              var e = this;
              tt.getSystemInfo({
                success: function (o) {
                  console.log(o),
                    (e.appName = o.appName),
                    (e.version = o.version),
                    e.$forceUpdate();
                },
              });
            },
            handlePaymentSelect: function (e) {
              var o = e.detail;
              (this.payment = o), console.log(o);
            },
            closeFun: function () {
              this.$refs.detainmentPopup.open("center");
            },
            hidePop: function () {
              this.$refs.detainmentPopup.close(), this.$refs.h5PayCon.close();
            },
            syncFun: function () {
              this.$refs.detainmentPopup.close();
            },
            gettopupgrade: function () {
              var e = this,
                o = {
                  isVip: !0,
                  bookId: this.bookId ? this.bookId : "",
                  isWxReader: this.isWxReaderFlag ? this.isWxReaderFlag : "",
                };
              this.allOption &&
                this.allOption.pid &&
                ((o.pid = this.allOption.pid),
                (o.linkId = this.allOption.linkId),
                (o.clickid = this.allOption.clickid)),
                this.$get(this.$api.paygrade, o).then(function (o) {
                  console.log(o),
                    (e.consumegradeList = o.data.grade),
                    console.log(e.consumegradeList),
                    (e.gradeType = o.data.gradeType),
                    (e.imId = o.data.imId),
                    e.$emit("topUpChange", { iosPay: o.data.iosPay }),
                    e.consumegradeList.forEach(function (o) {
                      o.defaultSelect ||
                        (e.productId = e.consumegradeList[0].productId);
                    });
                });
            },
            changeprice: function (o) {
              2 == this.payFlag &&
                (this.bookId && e.setStorageSync(this.bookId, this.scrollTop),
                e.setStorageSync("newBookId", this.bookId)),
                (this.paySceneType.type = o.paySceneType.value),
                (this.paySceneType.moneyStr = o.moneyStr),
                (this.paySceneType.paySceneDetail = o.paySceneDetail),
                (this.productId = o.productId),
                1 == o.paySceneType.value
                  ? this.topupFun()
                  : this.$refs.h5PayCon.open("bottom");
            },
            topupFun: function () {
              var o = this,
                t = "ios" == o.platform ? 4 : 3,
                n = e.getSystemInfoSync().uniPlatform;
              e.showLoading({ title: "加载中", mask: !0, icon: "none" }),
                o
                  .$post(
                    "mp-toutiao" == n
                      ? o.$api.tiktokconsumecreate
                      : o.$api.consumecreate,
                    {
                      productId: o.productId,
                      uniPlatform: n,
                      site: t,
                      douYinAppVersion: o.version,
                      douYinAppType: o.appName,
                      bookId: o.bookId ? o.bookId : "",
                    },
                    1
                  )
                  .then(function (t) {
                    e.hideLoading(),
                      t.success
                        ? ((o.orderId = t.data.topUpId), o.arousePay(t.data))
                        : o.showToastFun(t.message);
                  });
            },
            arousePay: function (o) {
              var t = this,
                n = this,
                a = e.getSystemInfoSync().uniPlatform;
              if ("mp-weixin" == a) {
                var i = o.orderToken;
                e.requestPayment({
                  provider: "wxpay",
                  timeStamp: i.timeStamp,
                  nonceStr: i.nonceStr,
                  package: i.package,
                  signType: i.signType,
                  paySign: i.paySign,
                  success: function (o) {
                    1 == n.payFlag
                      ? e.switchTab({ url: "/pages/mine/mine" })
                      : 2 == n.payFlag
                      ? n.$emit("getBookCdnInfo")
                      : 3 == n.payFlag && n.$emit("getBookAudio");
                  },
                  fail: function (e) {
                    console.log(e), n.showToastFun(e.errMsg);
                  },
                });
              } else if ("mp-toutiao" == a)
                tt.requestOrder({
                  data: JSON.stringify(o.orderToken.data),
                  byteAuthorization: o.orderToken.byteAuthorization,
                  success: function (o) {
                    console.log(o),
                      "ios" == n.platform
                        ? tt.getOrderPayment({
                            orderId: o.orderId,
                            imId: t.imId,
                            success: function (o) {
                              1 == n.payFlag
                                ? e.switchTab({ url: "/pages/mine/mine" })
                                : 2 == n.payFlag
                                ? n.$emit("getBookCdnInfo")
                                : 3 == n.payFlag && n.$emit("getBookAudio");
                            },
                            fail: function (e) {
                              console.log(e), n.showToastFun(e.errMsg);
                            },
                          })
                        : tt.getOrderPayment({
                            orderId: o.orderId,
                            success: function (o) {
                              1 == n.payFlag
                                ? e.switchTab({ url: "/pages/mine/mine" })
                                : 2 == n.payFlag
                                ? n.$emit("getBookCdnInfo")
                                : 3 == n.payFlag && n.$emit("getBookAudio");
                            },
                            fail: function (e) {
                              console.log(e), n.showToastFun(e.errMsg);
                            },
                          });
                  },
                  fail: function (e) {
                    console.log(e),
                      21050 == e.errNo
                        ? n.showToastFun("当前订单不支持该场景下单")
                        : n.showToastFun(e.errMsg);
                  },
                });
              else if ("mp-kuaishou" == a) {
                var s = ks.canIUse("pay.object.payType.IAPPurchase");
                "ios" == n.platform && s
                  ? ks.pay({
                      serviceId: 1,
                      payType: "IAPPurchase",
                      orderInfo: {
                        order_info_token: o.orderToken,
                        order_no: o.outOrderId,
                      },
                      success: function (o) {
                        console.log(o),
                          1 == n.payFlag
                            ? e.switchTab({ url: "/pages/mine/mine" })
                            : 2 == n.payFlag
                            ? n.$emit("getBookCdnInfo")
                            : 3 == n.payFlag &&
                              (n.$emit("getBookAudio"),
                              n.$emit("getBookAudio"));
                      },
                      fail: function (e) {
                        console.log(e);
                      },
                    })
                  : ks.pay({
                      serviceId: 1,
                      orderInfo: {
                        order_info_token: o.orderToken,
                        order_no: o.outOrderId,
                      },
                      paymentChannel: 2 == n.paySceneType.type ? n.payment : "",
                      success: function (o) {
                        1 == n.payFlag
                          ? e.switchTab({ url: "/pages/mine/mine" })
                          : 2 == n.payFlag
                          ? (console.log(111),
                            n.hidePop(),
                            n.$emit("getBookCdnInfo"))
                          : 3 == n.payFlag && n.$emit("getBookAudio");
                      },
                      fail: function (e) {
                        console.log(e), n.showToastFun(e.errMsg);
                      },
                    });
              } else
                "mp-alipay" == a
                  ? e.requestPayment({
                      provider: "alipay",
                      orderInfo: o.outOrderId,
                      success: function (o) {
                        1 == n.payFlag
                          ? e.switchTab({ url: "/pages/mine/mine" })
                          : 2 == n.payFlag
                          ? n.$emit("getBookCdnInfo")
                          : 3 == n.payFlag && n.$emit("getBookAudio");
                      },
                      fail: function (e) {
                        console.log(e), n.showToastFun(e);
                      },
                    })
                  : console.log("不知道什么类型");
            },
          },
        };
      }).call(this, t("543d")["default"]);
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/topUpTemplate-create-component",
  {
    "components/topUpTemplate-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("543d")["createComponent"](
        __webpack_require__("d670")
      );
    },
  },
  [["components/topUpTemplate-create-component"]],
]);
