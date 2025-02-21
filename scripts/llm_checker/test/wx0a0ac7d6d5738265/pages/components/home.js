var e = require("../../@babel/runtime/helpers/readOnlyError"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../common/vendor.js");
require("../../store/index.js");
var o = {
  data: function () {
    return {
      navigationBarHeight: r.index.getStorageSync("navigationBarHeight") || 44,
      statusBarHeight: r.index.getStorageSync("statusBarHeight"),
      newUserCouponList: [],
      activeId: "",
      newLicensePlateNumber: "",
      plateInfo: [],
      plateOrder: [],
      carnumber: "",
      showPhonePop: !1,
      userInfo: {},
    };
  },
  created: function () {
    console.log("进入首页", this.hasLogin);
  },
  onShow: function () {},
  computed: a(
    a(
      {},
      r.mapState({
        hasLogin: function (e) {
          return e.hasLogin;
        },
      })
    ),
    {},
    {
      vipIconSrc: function () {
        return "普通会员" === this.userInfo.memberLevel
          ? "".concat(this.$imgPath, "/ptvip.png")
          : "".concat(this.$imgPath, "/hjvip.png");
      },
    }
  ),
  mounted: function () {
    this.$store.state.hasLogin && this.havePlateOrder();
  },
  methods: {
    handleDinYue: function () {
      var e = this;
      e.$loading("加载中"),
        r.index.requestSubscribeMessage({
          tmplIds: [
            "7LFWNPqnBaqV7mNh6r-ksQ0Fe9R6XK141vKplDI_LjY",
            "8w-V-iW22YpX-dODjTNnbl1qfQGDOmm4dXRyhrL4Ebo",
          ],
          success: function (e) {},
          fail: function (e) {
            console.log("失败模板消息", e);
          },
          complete: function () {
            r.index.hideLoading(),
              e.$jump("/pages_my/vip-coupon-list/vip-coupon-list");
          },
        });
    },
    nogetphone: function () {
      this.showPhonePop = !1;
    },
    gettypeColor: function (e) {
      return "92#" === e
        ? "rgba(232, 79, 79, 1)"
        : "95#" === e
        ? "rgba(6, 185, 192, 1)"
        : "98#" === e
        ? "rgba(47, 204, 252, 1)"
        : "0#" === e
        ? "rgba(138, 143, 153, 1)"
        : void 0;
    },
    havePlateOrder: function () {
      var e = this;
      this.$api.autoPlateOrder().then(function (t) {
        t.data.code === e.$code.SUCCESS &&
          ((e.plateInfo = t.data.data),
          (0 === e.plateInfo.status || 4 === e.plateInfo.status) &&
            e.getPlateOrder(e.plateInfo));
      });
    },
    getPlateOrder: function (e) {
      var t = this;
      this.$api.getPlateOrder(e).then(function (e) {
        e.data.code === t.$code.SUCCESS && (t.plateOrder = e.data.data);
      });
    },
    handleGetCoupons: function () {
      var e = this;
      return n(
        t().mark(function n() {
          var a;
          return t().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.next = 2), e.$api.$getActiveCoupons(e.activeId);
                case 2:
                  (a = t.sent),
                    console.log("lqyhq", a),
                    e.$toast(a.data.message),
                    e.getUserInfo(),
                    (e.$refs.newCoupon.show = !1);
                case 4:
                case "end":
                  return t.stop();
              }
          }, n);
        })
      )();
    },
    getNewUserCoupm: function () {
      var e = this;
      return n(
        t().mark(function n() {
          var a;
          return t().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.next = 2), e.$api.$selctNewUserCoupon();
                case 2:
                  (a = t.sent),
                    console.log("yhq", a),
                    a.data.code === e.$code.SUCCESS &&
                      ((e.activeId = a.data.data.activityNo),
                      (e.newUserCouponList = a.data.data.list));
                case 4:
                case "end":
                  return t.stop();
              }
          }, n);
        })
      )();
    },
    getUserInfo: function () {
      var e = this;
      return n(
        t().mark(function n() {
          var a, o, s;
          return t().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.next = 2), e.$api.getUserInfoDetail();
                case 2:
                  if (
                    ((a = t.sent),
                    console.log("myuserinfo", a.data.data),
                    a.data.code !== e.$code.SUCCESS)
                  ) {
                    t.next = 16;
                    break;
                  }
                  if (
                    ((o = a.data.data),
                    (e.userInfo = o),
                    e.$store.commit("setUserInfo", o),
                    (e.carnumber = o.licensePlateNumber),
                    (e.newLicensePlateNumber =
                      o.licensePlateNumber.slice(0, 2) +
                      "·" +
                      o.licensePlateNumber.slice(2)),
                    (t.t0 = o.isNewUser && o.newUserCoupon),
                    !t.t0)
                  ) {
                    t.next = 14;
                    break;
                  }
                  return (t.next = 13), e.getNewUserCoupm();
                case 13:
                  e.$refs.newCoupon.show = !0;
                case 14:
                  t.next = 17;
                  break;
                case 16:
                  a.data.code === e.$code.TOKENFAIL
                    ? e.getUserInfo()
                    : ((s = r.index.getStorageSync("userInfo")),
                      e.$store.commit("setUserInfo", s),
                      (e.userInfo = s));
                case 17:
                case "end":
                  return t.stop();
              }
          }, n);
        })
      )();
    },
    goAddCar: function () {
      this.$jump("/pages_asset/add_phone_car/add_phone_car");
    },
    toPay: function () {
      this.$api.getPlateOrder().then(function (t) {
        (t.data.data != [] || "" != t.data.data) && (t.data.data, e("e"));
      }),
        this.userInfo.licensePlateNumber && [] != []
          ? this.$jump("/pages_pay/socketpay/socketpay")
          : this.$jump("/pages_pay/pay/pay");
    },
    toPlatePay: function () {
      console.log("车牌支付", this.carnumber),
        this.carnumber || this.userInfo.licensePlateNumber
          ? this.$jump("/pages_pay/socketpay/socketpay?title=车牌支付")
          : this.goAddCar();
    },
  },
};
Array || r.resolveComponent("zym-coupon-popup")();
Math;
var s = r._export_sfc(o, [
  [
    "render",
    function (e, t, n, a, o, s) {
      return r.e(
        {
          a: "".concat(e.$imgPath, "/logo.png"),
          b: e.$store.getters.getNavigationHeight + "px",
          c: r.o(function (t) {
            return e.$jump("/pages_my/update_user_info/update_user_info");
          }),
          d: o.userInfo.avatarUrl
            ? o.userInfo.avatarUrl
            : "".concat(e.$imgPath, "/avatar.png"),
          e: e.hasLogin,
        },
        e.hasLogin
          ? {
              f: "".concat(e.$imgPath, "/badge.png"),
              g: r.t(o.userInfo.nickName ? o.userInfo.nickName : "微信用户"),
              h: r.o(function (t) {
                return e.$jump("/pages_my/update_user_info/update_user_info");
              }),
            }
          : {},
        { i: e.hasLogin },
        e.hasLogin
          ? r.e(
              { j: o.userInfo.licensePlateNumber },
              o.userInfo.licensePlateNumber
                ? {
                    k: r.t(o.userInfo.carAmount),
                    l: r.t(
                      o.newLicensePlateNumber
                        ? o.newLicensePlateNumber
                        : o.userInfo.licensePlateNumber
                    ),
                    m: r.o(function (t) {
                      return e.$jump("/pages_asset/mycar/mycar");
                    }),
                  }
                : {
                    n: r.o(function () {
                      return s.goAddCar && s.goAddCar.apply(s, arguments);
                    }),
                  }
            )
          : {},
        { o: !e.hasLogin },
        e.hasLogin
          ? {}
          : {
              p: r.o(function (t) {
                return e.$jump("/pages_my/login/wx_login");
              }),
            },
        { q: e.hasLogin },
        e.hasLogin ? { r: s.vipIconSrc } : {},
        {
          s: r.t(o.userInfo.memberLevel ? o.userInfo.memberLevel : "游客"),
          t: "普通会员" == o.userInfo.memberLevel ? 1 : "",
          v:
            "普通会员" != o.userInfo.memberLevel && o.userInfo.memberLevel
              ? 1
              : "",
          w: "".concat(e.$imgPath, "/rightArrow1.png"),
          x: r.o(function (t) {
            return e.$jump("/pages_my/my_vip/my_vip");
          }),
          y: e.$store.getters.getStatusBarHeight + "px",
          z: r.t(o.userInfo.couponAmount ? o.userInfo.couponAmount : 0),
          A: r.o(function () {
            return s.handleDinYue && s.handleDinYue.apply(s, arguments);
          }),
          B: r.t(o.userInfo.cardNumber ? o.userInfo.cardNumber : 0),
          C: r.o(function (t) {
            return e.$jump(
              "/pages_my/recharge-vip/recharge-vip?topId=".concat(
                o.userInfo.topId
              )
            );
          }),
          D: r.t(o.userInfo.balance ? o.userInfo.balance : 0),
          E: r.o(function (t) {
            return e.$forceUpdate();
          }),
          F: r.o(function (t) {
            return e.$jump(
              "/pages_my/recharge-vip/recharge-vip?topId=".concat(
                o.userInfo.topId
              )
            );
          }),
          G:
            null != o.plateInfo.oilGunOrderId &&
            !0 === e.hasLogin &&
            -1 !== o.plateOrder.status,
        },
        null != o.plateInfo.oilGunOrderId &&
          !0 === e.hasLogin &&
          -1 !== o.plateOrder.status
          ? {
              H: r.t(o.plateOrder.oilGunName),
              I: r.t(o.plateOrder.oilType),
              J: s.gettypeColor(o.plateOrder.oilType),
              K: r.t(o.plateOrder.totalOil),
              L: r.t(o.plateOrder.discountAmount),
              M: "".concat(e.$imgPath, "/bofang.png"),
              N: 4 === o.plateOrder.status,
              O: r.o(function () {
                return s.toPlatePay && s.toPlatePay.apply(s, arguments);
              }),
              P: r.t(o.plateOrder.oilGunName),
              Q: r.t(o.plateOrder.oilType),
              R: s.gettypeColor(o.plateOrder.oilType),
              S: r.t(o.plateOrder.totalOil),
              T: r.t(o.plateOrder.discountAmount),
              U: "".concat(e.$imgPath, "/bofang.png"),
              V: 0 === o.plateOrder.status,
              W: r.o(function () {
                return s.toPlatePay && s.toPlatePay.apply(s, arguments);
              }),
            }
          : {},
        {
          X: r.sr("newCoupon", "e2c29b21-0"),
          Y: r.o(s.handleGetCoupons),
          Z: r.p({
            "cupon-list": o.newUserCouponList,
            name: "新人券",
            title: "恭喜你",
            content: "获得新人券",
            btnText: "已获得",
            price: "15",
            "min-price": "20",
            theme: "1",
            receive: !1 === o.userInfo.newUserCoupon,
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-e2c29b21"],
]);
wx.createComponent(s);
