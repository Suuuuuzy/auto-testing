(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/cartBtn/index"],
  {
    "208d": function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("6832"),
        a = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(i);
      e.default = a.a;
    },
    2489: function (t, e, n) {
      "use strict";
      var o = n("f94d");
      n.n(o).a;
    },
    "2a09": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    6832: function (t, e, n) {
      "use strict";
      (function (t) {
        var o = n("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = o(n("461a")),
          i = o(n("2309")),
          u = {
            name: "cartBtn",
            components: {
              authBtn: function () {
                Promise.all([
                  n.e("common/vendor"),
                  n.e("baseComponents/authBtn2/index"),
                ])
                  .then(
                    function () {
                      return resolve(n("ed65"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
              uploadPhone: function () {
                Promise.all([
                  n.e("common/vendor"),
                  n.e("baseComponents/uploadPhone/index"),
                ])
                  .then(
                    function () {
                      return resolve(n("34df"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
            },
            mixins: [a.default],
            props: {
              animationData: { type: Object, default: {} },
              context: { type: String, default: "SYSTEM" },
              label: { type: [String, Number], default: "1" },
              layout: { type: String, default: "1" },
              allBgColor: { type: String, default: "" },
              iconBgcolor: { type: String, default: "#FABD00" },
              btnBgcolor: { type: String, default: "#FABD00" },
              btnFontSize: { type: String, default: "30rpx" },
              textColor: { type: String, default: "#fff" },
              btnTxtColor: { type: String, default: "#fff" },
              cartNum: { type: Number, default: 0 },
              cartNumsBgColor: { type: String, default: "#000" },
              cartIconImg: { type: String, default: "" },
              topTips: { type: Boolean, default: !1 },
              bottom: { type: Number, default: 0 },
              ifShowcarList: { type: Boolean, default: !1 },
              isOpenForceAuth: { type: Boolean, default: !1 },
              appType: { type: String, default: "ORDER" },
              sureBtnTxt: {
                type: Object,
                default: function () {
                  return { txt: "点好了", bgColor: "" };
                },
              },
              isVip: {
                default: function () {
                  return !1;
                },
              },
              themeColor: {
                type: String,
                default: function () {
                  return "#fabe00";
                },
              },
              arrowIconColor: {
                type: String,
                default: function () {
                  return "#000";
                },
              },
              authorStyle: { type: String, default: "" },
              cartNumsType: { type: [String, Number], default: "1" },
              templateAlias: { type: String, default: "" },
              useRequiredbtn: { type: Boolean, default: !1 },
              page: { type: String, default: "" },
            },
            data: function () {
              return { needAuth: !0, userRejectAuth: !1, cartCouponCount: 0 };
            },
            computed: {
              authBtnStyle: function () {
                if (this.authorStyle) return this.authorStyle;
                if (
                  "fastFood" === this.templateAlias ||
                  "WM" === this.context ||
                  "ZT" === this.context
                ) {
                  var t = "position: absolute;right: 0;";
                  switch (this.layout) {
                    case "2":
                      t += "width: 253rpx;height: 49px;";
                      break;
                    case "3":
                      t += "width: 120rpx;height: 100%;bottom: 0;";
                      break;
                    case "4":
                    case "5":
                      t += "width: 253rpx;height: 51px;";
                      break;
                    case "7":
                    case "9":
                      t += "width: 31%;height: 100rpx;";
                      break;
                    default:
                      t += "width: 100%;height: 100%;bottom: 0;";
                  }
                  return t;
                }
                return "position: absolute;left: 0;bottom: 0;height: 100%;width: 100%;";
              },
              btHW: function () {
                return 9 == this.layout
                  ? { height: "100%", width: "30%", top: "0", right: "0" }
                  : { height: "100%", width: "100%", top: "0" };
              },
            },
            methods: {
              cartCouponCountChange: function (t) {
                this.cartCouponCount = t;
              },
              isNeedAuth: function (t) {
                console.log(t, "--------看看这个认证的状态"),
                  (this.needAuth = t);
              },
              userRejectAuthHandle: function () {
                this.userRejectAuth = !0;
              },
              clickshowCartInfo: function () {
                this.ifShowcarList && 1 != this.layout
                  ? this.$emit("showCartInfo")
                  : this.disComplete();
              },
              disComplete: function (t) {
                this.useRequiredbtn && 3 != this.layout
                  ? this.toPage({ page: "necessity", context: this.context })
                  : ("updatePhone" === t &&
                      i.default.emitVipChange({ type: "updatePhone" }),
                    this.$emit("disComplete", null, !0));
              },
              authComplate: function (t, e) {
                console.log("走的2"), this.$emit("authComplateCart", t, e);
              },
              authBegin: function (t) {
                this.$emit("authBeginCart", t);
              },
              scanCodeAddDish: function () {
                console.log("走的3"), this.$emit("scanCodeAddDish");
              },
              toFastFoodPopup: function () {
                var e = this;
                console.log("点击的左边球"),
                  ["WM", "ZT"].includes(this.context)
                    ? this.cartNum &&
                      t
                        .createSelectorQuery()
                        .in(this)
                        .select("#cart")
                        .boundingClientRect(function (n) {
                          e.$emit("showCartInfo"),
                            t.$emit("cartPop", { show: !0, height: n.height });
                        })
                        .exec()
                    : "fastFood" === this.templateAlias
                    ? this.$emit("toFastFoodPopup")
                    : this.clickshowCartInfo();
              },
              toCouponPopup: function () {
                t.$emit("couponByCart");
              },
              cardLevelUp: function (t) {
                var e = this;
                if ("fastFood" === this.templateAlias && this.isVip) {
                  var n = i.default.getCurrentPage(),
                    o = n.page,
                    a = n.context,
                    u = {
                      page: "cardLevelUp",
                      context: "CD",
                      toRules: !0,
                      query: "from=".concat(o, "&fromContext=").concat(a),
                    },
                    r = i.default.getBusState("vipUserInfo", "DC");
                  i.default.initDecoration("CD").then(
                    function (t) {
                      i.default.setBusState("cardNo", r.cardNo, "CD", !0),
                        e.$emit("adClickToPage", u);
                    },
                    function (t) {
                      i.default.setBusState(
                        "error",
                        { type: 1, message: t },
                        "SYSTEM"
                      ),
                        e.toPage({ page: "errorPage", context: "SYSTEM" });
                    }
                  );
                }
              },
            },
            created: function () {
              var e = this;
              t
                .createSelectorQuery()
                .in(this)
                .select("#plus")
                .boundingClientRect()
                .exec(function (t) {
                  t &&
                    t[0] &&
                    e.$emit("rect", {
                      x: t[0].left < 0 ? 27 : t[0].left,
                      y: t[0].top,
                    });
                }),
                (this.userRejectAuth = i.default.getBusState(
                  "refusePhoneAuth",
                  "SYSTEM"
                )),
                t.$on("cartCouponCount", this.cartCouponCountChange);
            },
            destroyed: function () {
              t.$off("cartCouponCount", this.cartCouponCountChange);
            },
          };
        e.default = u;
      }).call(this, n("543d").default);
    },
    7181: function (t, e, n) {},
    "9f7f": function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("2a09"),
        a = n("208d");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(i);
      n("cb3b7"), n("2489");
      var u = n("f0c5"),
        r = Object(u.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "769644e2",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = r.exports;
    },
    cb3b7: function (t, e, n) {
      "use strict";
      var o = n("7181");
      n.n(o).a;
    },
    f94d: function (t, e, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/cartBtn/index-create-component",
    {
      "baseComponents/cartBtn/index-create-component": function (t, e, n) {
        n("543d").createComponent(n("9f7f"));
      },
    },
    [["baseComponents/cartBtn/index-create-component"]],
  ]);
