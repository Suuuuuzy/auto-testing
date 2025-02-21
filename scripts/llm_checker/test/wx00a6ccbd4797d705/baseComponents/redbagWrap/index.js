(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/redbagWrap/index"],
  {
    "0c18": function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("e491"),
        o = n("cbf4");
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(s);
      var i = n("f0c5"),
        r = Object(i.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          null,
          null,
          !1,
          a.a,
          void 0
        );
      t.default = r.exports;
    },
    "66ab": function (e, t, n) {
      "use strict";
      var a = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = a(n("2309")),
        s = n("ca00"),
        i = {
          data: function () {
            return {
              componentReady: !1,
              canshow: !1,
              dataSet: {},
              hasInited: !1,
              hasCalled: !1,
              storeArg: [],
            };
          },
          props: { context: { type: String, default: "WM" } },
          components: {
            redbagCommonPackage: function () {
              n.e("pages/redbag-commonPackage/index")
                .then(
                  function () {
                    return resolve(n("b013"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          methods: {
            redBagInit: function () {
              var e = this;
              if (this.hasCalled) {
                var t = this.storeArg[this.storeArg.length - 1];
                (this.storeArg.length = 0),
                  this.$nextTick(function () {
                    e.$refs.redbag.show(t);
                  });
              }
              this.hasInited = !0;
            },
            init: function () {
              var e = this;
              return this.getRedBagInfo().then(
                function (t) {
                  var n = e.dataSet;
                  if (0 == t.status) {
                    (e.canshow = (0, s.isValidValue)(t, "result")(
                      "hasRedBag",
                      !1
                    )()),
                      (n.marketActivityID = (0, s.isValidValue)(t, "result")(
                        "marketActivityId",
                        ""
                      )()),
                      (n.sendChannel = (0, s.isValidValue)(t, "result")(
                        "sendChannel",
                        "CRM"
                      )()),
                      (n.isOpenWxAd = (0, s.isValidValue)(t, "result")(
                        "isOpenWxAd",
                        0
                      )()),
                      (n.alipay = Number(
                        (0, s.isValidValue)(t, "result")("alipay", 0)()
                      )),
                      (n.couponRandom = Number(
                        (0, s.isValidValue)(t, "result")("couponRandom", 0)()
                      ));
                    var a = (0, s.isValidValue)(t, "result")(
                      "tikcetkindlist",
                      []
                    )().map(function (e) {
                      return {
                        activityId: e.activityId,
                        outBizNo: e.outBizNo,
                        customizeSendTime: e.customizeSendTime,
                      };
                    });
                    a.length && (n.aliCouponParams = a),
                      (n.isBlindBox = (0, s.isValidValue)(
                        t.result,
                        "isBlindBox",
                        !1
                      )()),
                      (n.styles = (0, s.isValidValue)(
                        t.result,
                        "styles",
                        {}
                      )()),
                      (n.noteMsg = (0, s.isValidValue)(
                        t.result,
                        "noteMsg",
                        ""
                      )()),
                      (n.canshow = e.canshow),
                      e.canshow &&
                        o.default
                          .getCommonPackage("redbag-commonPackage")
                          .then(function (t) {
                            e.componentReady = !0;
                          });
                  } else e.canshow = !1;
                  return e.canshow;
                },
                function (e) {
                  return !1;
                }
              );
            },
            getRedBagInfo: function () {
              var e = o.default.getBusState("sysUser", "SYSTEM"),
                t = o.default.getBusState("vipUserInfo", this.context).cardNo;
              return o.default.getData({
                name: "getRedBagInfo",
                nameSpace: "SYSTEM",
                params: {
                  mcId: o.default.getBusState("mcId", this.context),
                  cardNo: t,
                  type: this.getType(),
                  memberId: e.memberId || "",
                },
              });
            },
            getType: function () {
              return "WM" == this.context
                ? 3
                : "ZT" == this.context
                ? 5
                : "DC" == this.context
                ? 2
                : void 0;
            },
            show: function (e) {
              this.hasInited
                ? this.$refs.redbag.show(e)
                : ((this.hasCalled = !0), this.storeArg.push(e));
            },
            resetDishConnextStep: function () {
              this.$emit("get");
            },
            cartNextStep: function () {
              this.$emit("cartNextStep");
            },
            getCouponBack: function () {
              this.$emit("getCouponBack");
            },
            onBeforeGetCoupon: function () {
              this.$refs.redbag.onBeforeGetCoupon();
            },
            onGetCouponSuccess: function () {
              this.$refs.redbag.onGetCouponSuccess(),
                this.$refs.redbag.onClose();
            },
            onClose: function () {
              this.$refs.redbag.onClose();
            },
          },
        };
      t.default = i;
    },
    cbf4: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("66ab"),
        o = n.n(a);
      for (var s in a)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(s);
      t.default = o.a;
    },
    e491: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return a;
      }),
        n.d(t, "c", function () {
          return o;
        }),
        n.d(t, "a", function () {});
      var a = function () {
          this.$createElement, this._self._c;
        },
        o = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/redbagWrap/index-create-component",
    {
      "baseComponents/redbagWrap/index-create-component": function (e, t, n) {
        n("543d").createComponent(n("0c18"));
      },
    },
    [["baseComponents/redbagWrap/index-create-component"]],
  ]);
