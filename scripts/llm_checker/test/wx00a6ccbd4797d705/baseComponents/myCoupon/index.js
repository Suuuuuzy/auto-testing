(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/myCoupon/index"],
  {
    "1f90a": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("a4a8"),
        a = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      t.default = a.a;
    },
    "55ca": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("8599"),
        a = n("1f90a");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(i);
      n("8538");
      var c = n("f0c5"),
        u = Object(c.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "470f5a40",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = u.exports;
    },
    "81b8": function (e, t, n) {},
    8538: function (e, t, n) {
      "use strict";
      var o = n("81b8");
      n.n(o).a;
    },
    8599: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return a;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    a4a8: function (e, t, n) {
      "use strict";
      (function (e) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = o(n("2309")),
          i = (0, n("ca00").getClientWidth)(),
          c = {
            name: "myCoupon",
            props: ["noticeText", "context"],
            components: {
              wxPopup: function () {
                Promise.all([
                  n.e("common/vendor"),
                  n.e("baseComponents/wxpopup/popup"),
                ])
                  .then(
                    function () {
                      return resolve(n("0387"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
              ticketItem2: function () {
                n.e("baseComponents/ticketItem2/index")
                  .then(
                    function () {
                      return resolve(n("49a7"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
              longPictureTicketItem: function () {
                n.e("baseComponents/longPictureTicketItem/index")
                  .then(
                    function () {
                      return resolve(n("6c8f"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
              addDeBtn: function () {
                Promise.all([
                  n.e("common/vendor"),
                  n.e("baseComponents/addDeBtn/index"),
                ])
                  .then(
                    function () {
                      return resolve(n("cf43"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
            },
            data: function () {
              return {
                topSize: "",
                visible: !0,
                showPopup: !1,
                windowHeight: 0,
                windowWidth: 0.8 * i,
                crmTicketInfos: [],
                quanW: 0,
                quanH: 0,
                btnRadio: !0,
                messageTxt: "",
                matchingItemType: 1,
                themeColor: "",
                myTicketCustomImgFlg: !1,
              };
            },
            created: function () {
              var e = this;
              a.default.injection("CD", !1).then(function () {
                a.default
                  .initDecoration("CD")
                  .then(function () {
                    var t = a.default.getDecorate(e.context);
                    (e.themeColor = t.themeColor),
                      (e.btnRadio = t.decorationData.dishPage.btnRadio),
                      (e.windowHeight =
                        0.7 * t.getPageInfo().windowHeight - 40),
                      (e.quanW = e.windowWidth - 12),
                      (e.quanH = (5 * e.windowWidth) / 17);
                    var n = a.default
                      .getDecorate("CD")
                      .getValidValue("childPagesSet")("couponDecoration")();
                    (e.myTicketCustomImgFlg = n.myTicketCustomImgFlg),
                      (e.couponDecoration = n),
                      "DC" === e.context
                        ? ((e.visible = t.decorationData.dishPage.showMyCoupon),
                          (e.topSize = "90px"))
                        : ((e.visible = t.decorationData.showMyCoupon),
                          (e.topSize = t.navigateBarHeight + 45 + "px")),
                      a.default
                        .getData({
                          name: "getCompanySwitch",
                          ifStore: !0,
                          nameSpace: "SYSTEM",
                          params: {},
                        })
                        .then(function (t) {
                          0 == t.status &&
                            t.result &&
                            (e.matchingItemType = t.result.matchingItemType);
                        });
                  })
                  .catch(function () {
                    e.toPage({
                      page: "errorPage",
                      context: "SYSTEM",
                      replace: !1,
                    });
                  });
              });
            },
            methods: {
              setShopData: function (e) {
                var t = [];
                return (
                  e.wechatMerchantApply &&
                    (t = [
                      {
                        couponId: e.ticketTemplate,
                        couponMemberCountId: e.couponMemberCountId,
                        sendCount: e.couponCnt,
                      },
                    ]),
                  t
                );
              },
              addResultFun: function (e) {
                console.log(e, "bbbbb");
              },
              show: function () {
                this.getCouponInfo(), (this.showPopup = !0);
              },
              hidePopup: function () {
                (this.showPopup = !1),
                  (this.messageTxt = ""),
                  (this.crmTicketInfos = []);
              },
              showCouponDish: function (e) {
                this.$emit("showCouponDish", {
                  ticketInfo: e,
                  matchingItemType: this.matchingItemType,
                });
              },
              unuseText: function (e) {
                if (
                  3 === e.type ||
                  4 === e.type ||
                  0 == e.shareOtherCouponType ||
                  0 == e.shareOtherOffers ||
                  e.threshold > 0 ||
                  e.wechatMerchantApply
                ) {
                  var t = [];
                  return (
                    0 == e.shareOtherCouponType &&
                      t.push("不与其他优惠券类型共享"),
                    0 == e.shareOtherOffers && t.push("不与其他优惠共享"),
                    e.threshold > 0 && t.push("满".concat(e.threshold, "可用")),
                    t.join(" | ")
                  );
                }
              },
              getCouponInfo: function () {
                var t = this;
                a.default
                  .getData({
                    name: "getDishItemsCoupon",
                    nameSpace: this.context,
                    getNew: !0,
                    params: { context: this.context },
                  })
                  .then(function (n) {
                    if (0 == n.status) {
                      var o = t.couponDecoration,
                        a = o.couponItems,
                        i = void 0 === a ? {} : a,
                        c = o.customDefaultCouponImg,
                        u = o.customDefaultCouponImgLong;
                      (n.result || []).forEach(function (e) {
                        (e.ticketType = e.type),
                          (e.kindName = e.title),
                          (e.kindmoney = e.value),
                          (e.couponCnt = e.availableNum);
                        var n,
                          o,
                          a = i[e.couponId];
                        a && ((n = a.listImg), (o = a.listImgCustom)),
                          (e.headPic = n || c),
                          (e.longPic = o || u),
                          (e.unuseText = t.unuseText(e));
                      }),
                        (t.crmTicketInfos = n.result);
                    } else e.showToast({ icon: "none", title: n.message, duration: 2e3 });
                    t.messageTxt = "您当前暂无可用券，请咨询前台服务员~";
                  });
              },
            },
          };
        t.default = c;
      }).call(this, n("543d").default);
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/myCoupon/index-create-component",
    {
      "baseComponents/myCoupon/index-create-component": function (e, t, n) {
        n("543d").createComponent(n("55ca"));
      },
    },
    [["baseComponents/myCoupon/index-create-component"]],
  ]);
