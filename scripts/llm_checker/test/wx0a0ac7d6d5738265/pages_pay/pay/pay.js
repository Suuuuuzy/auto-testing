var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  n = {
    data: function () {
      return {
        oilGunOrderIdber: "",
        getactive: !1,
        selectOilGunId: "",
        oilGunOrderId: "",
        gunList: [],
        color: [
          "rgba(230, 69, 85, 1)",
          "rgba(15, 153, 123, 1)",
          "rgba(32, 104, 215, 1)",
          "rgba(138, 141, 153, 1)",
        ],
        isRote: !1,
        orderlist: [],
        order: [],
        showOrder: !0,
        showGunList: !1,
        showOrderList: !1,
      };
    },
    onShow: function () {
      1035 == o.index.getStorageSync("scene") &&
        (o.index.getStorageSync("userInfo").phoneNumber
          ? (this.getLoginCode(),
            console.log("//登录过"),
            this.$store.commit("updateHasLogin", !0))
          : this.$jump("pages_my/login/wx_login")),
        this.getGun();
    },
    onLoad: function (e) {
      e && console.log("跳转参数", e);
    },
    onUnload: function () {
      this.oilGunOrderId = "";
    },
    watch: {
      oilGunOrderId: {
        handler: function (e, t) {
          "" == e || e != t
            ? ((this.getactive = !1), (this.oilGunOrderIdber = ""))
            : (this.getactive = !0);
        },
        immediate: !0,
        deep: !0,
      },
    },
    methods: {
      getLoginCode: function () {
        var e = this;
        o.index.login({
          provider: "weixin",
          success: function (t) {
            (e.code = t.code), e.getToken(t.code);
          },
        });
      },
      getToken: function (n) {
        var r = this;
        return t(
          e().mark(function t() {
            var i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), r.$api.getToken({ code: n });
                  case 2:
                    (i = e.sent),
                      console.log("跳转进入油枪页token刷新 ", i),
                      i.data.code === r.$code.SUCCESS
                        ? o.index.setStorage({
                            key: "token",
                            data: i.data.data.token,
                          })
                        : r.getLoginCode();
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getGunColor: function (e) {
        if (1 === e) return "rgba(255, 250, 245, 1)";
      },
      closepop: function () {
        (this.showOrderList = !1), (this.showGunList = !1);
      },
      getTxtColor: function (e) {
        return e ? "rgba(69, 71, 77, 1)" : "rgba(204, 204, 204, 1)";
      },
      gunReFresh: function () {
        var e = this;
        (this.isRote = !0),
          this.getGun(),
          setTimeout(function () {
            e.isRote = !1;
          }, 500);
      },
      toggleGunSelection: function (e) {
        console.log(e),
          (this.order = []),
          this.getGmoney(e),
          (this.showOrderList = !0);
      },
      getGmoney: function (e) {
        var t = this;
        this.$api
          .getOrderGunMoney(e.oilGunNumber)
          .then(function (e) {
            console.log("订单列表获取成功", e),
              e.data.code === t.$code.SUCCESS && (t.order = e.data.data),
              0 === t.order.length ? (t.showOrder = !1) : (t.showOrder = !0);
          })
          .catch(function (e) {
            console.log("没有");
          });
      },
      getGunOrderMoney: function (e) {
        var t = this;
        console.log("点击了订单按钮id", e),
          o.index.getStorageSync("userInfo").phoneNumber
            ? this.order.forEach(function (o, n) {
                e === o.oilGunOrderId &&
                  ((t.oilGunOrderId = o.oilGunOrderId),
                  (t.selectOilGunId = n),
                  t.$jump(
                    "/pages_pay/socketpay/socketpay?oilGunOrderId=".concat(
                      t.oilGunOrderId,
                      "&title=油枪支付"
                    )
                  ),
                  t.closepop());
              })
            : this.$toast("请先登录后操作");
      },
      getBackColor: function (e) {
        return "92#" === e
          ? this.color[0]
          : "95#" === e
          ? this.color[1]
          : "98#" === e
          ? this.color[2]
          : "0#" === e
          ? this.color[3]
          : void 0;
      },
      chagebtn: function () {
        this.getactive = !this.getactive;
      },
      getGun: function () {
        var o = this;
        return t(
          e().mark(function t() {
            var n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.getOilGunTpye();
                  case 2:
                    (n = e.sent).data.code === o.$code.SUCCESS
                      ? (o.gunList = n.data.data)
                      : setTimeout(function () {
                          this.getGun();
                        }, 2e3),
                      console.log("油站所有油枪号", n.data.data);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getactiveClass: function (e) {
        return 1 === e ? "rgba(6, 185, 192, 1)" : "";
      },
    },
  };
Array ||
  (
    o.resolveComponent("zym-navigation") +
    o.resolveComponent("u-line") +
    o.resolveComponent("u-popup")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../uview-plus/components/u-popup/u-popup.js";
    }
  )();
var r = o._export_sfc(n, [
  [
    "render",
    function (e, t, n, r, i, u) {
      return o.e(
        {
          a: o.p({ title: "油枪支付", "is-home-page": !0, mini: !0 }),
          b: o.t(e.$store.state.stationName),
          c: "".concat(e.$imgPath, "/MapPin.png"),
          d: "".concat(e.$imgPath, "/gun.png"),
          e: o.t(i.oilGunOrderIdber ? i.oilGunOrderIdber : "枪号"),
          f: u.getTxtColor(i.oilGunOrderId),
          g: o.o(function (e) {
            return (i.showGunList = !0);
          }),
          h: "".concat(e.$imgPath, "/money.png"),
          i: o.t(
            i.orderlist.discountAmount > 0 ? i.orderlist.discountAmount : 0
          ),
          j: i.getactive,
          k: !i.getactive,
          l: o.o(function (e) {
            return (i.showGunList = !0);
          }),
          m: i.isRote ? 1 : "",
          n: "".concat(e.$imgPath, "/refresh.png"),
          o: o.o(function () {
            return u.gunReFresh && u.gunReFresh.apply(u, arguments);
          }),
          p: "".concat(e.$imgPath, "/gunclose.png"),
          q: o.o(function (e) {
            return (i.showGunList = !1);
          }),
          r: o.p({ margin: "24rpx 0", color: "#F0F0F5FF" }),
          s: o.f(i.gunList, function (e, t, n) {
            return {
              a: o.t(e.oilGunNumber),
              b: u.getGunColor(e.status),
              c: o.t(e.oilName),
              d: u.getBackColor(e.oilName),
              e: u.getactiveClass(e.status),
              f: t,
              g: o.o(function (t) {
                return u.toggleGunSelection(e);
              }, t),
            };
          }),
          t: o.o(function (e) {
            return (i.showGunList = !1);
          }),
          v: o.p({
            show: i.showGunList,
            mode: "bottom",
            safeAreaInsetBottom: !1,
            round: "20",
          }),
          w: "".concat(e.$imgPath, "/leftArrow.png"),
          x: o.o(function (e) {
            return (i.showOrderList = !1);
          }),
          y: "".concat(e.$imgPath, "/gunclose.png"),
          z: o.o(function (e) {
            return u.closepop();
          }),
          A: o.p({ margin: "24rpx 0", color: "#F0F0F5FF" }),
          B: i.showOrder,
        },
        i.showOrder
          ? {
              C: o.f(i.order, function (e, t, n) {
                return {
                  a: e.oilGunOrderId === i.oilGunOrderId,
                  b: o.t(e.oilGunNumber),
                  c: o.t("0#" === e.oilType ? "柴油" : "汽油"),
                  d: o.t(e.oilType),
                  e: u.getBackColor(e.oilType),
                  f: o.t(
                    e.licensePlateNumber ? e.licensePlateNumber : "暂未绑定"
                  ),
                  g: o.t(e.money),
                  h: o.t(e.creatTime),
                  i: e.oilGunOrderId,
                  j: o.o(function (t) {
                    return u.getGunOrderMoney(e.oilGunOrderId);
                  }, e.oilGunOrderId),
                };
              }),
            }
          : {},
        {
          D: i.isRote ? 1 : "",
          E: "".concat(e.$imgPath, "/refresh.png"),
          F: o.o(function () {
            return u.gunReFresh && u.gunReFresh.apply(u, arguments);
          }),
          G: o.o(function (e) {
            return (i.showOrderList = !1);
          }),
          H: o.p({
            show: i.showOrderList,
            mode: "bottom",
            safeAreaInsetBottom: !1,
            round: "20",
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-4e14259e"],
]);
wx.createPage(r);
