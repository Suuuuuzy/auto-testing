var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../@babel/runtime/helpers/slicedToArray");
require("../../@babel/runtime/helpers/Arrayincludes");
var n = require("../../common/vendor.js"),
  i = require("../../utils/debouns.js"),
  a = require("../../common/assets.js"),
  c = {
    data: function () {
      return {
        show: !1,
        activeId: "",
        token: "",
        couponInfo: [],
        code: "",
        flag: !1,
        isReceive: 0,
        activtyInfo: "",
        nowTime: "",
      };
    },
    onShow: function () {
      var e = this;
      n.index.getStorageSync("userInfo") &&
        (e.$store.commit("updateHasLogin", !0),
        console.log("本地有token,当前登录状态", e.$store.state.hasLogin)),
        e.getCode();
    },
    onLoad: function (e) {
      if ((console.log("token", this.token, e), e.q)) {
        var t = decodeURIComponent(e.q).split("?")[1];
        console.log("url", t);
        var n = t.includes("&") ? t.split("&") : [t],
          i = {};
        n.forEach(function (e) {
          var t = e.split("="),
            n = o(t, 2),
            a = n[0],
            c = n[1];
          i[a] = c;
        }),
          console.log("id:", i.id, "ip:", i.ip),
          (this.activeId = i.id),
          console.log("this.activeId ", this.activeId);
      }
      e.id &&
        (console.log(e.id), console.log("id:", e.id), (this.activeId = e.id));
    },
    mounted: function () {
      this.getCoupon = i.throttle(this.getCoupon, 4e3);
    },
    onUnload: function () {
      this.$store.state.hasLogin ||
        (this.$store.commit("updateHasLogin", !1),
        n.index.removeStorageSync("token"));
    },
    methods: {
      getCode: function () {
        var e = this;
        n.index.login({
          provider: "weixin",
          success: function (t) {
            (e.code = t.code), e.getToken(t.code);
          },
        });
      },
      getToken: function (o) {
        var i = this;
        return t(
          e().mark(function t() {
            var a, c, s, r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (a = i),
                      (c = { code: o }),
                      (e.next = 4),
                      a.$api.getToken(c)
                    );
                  case 4:
                    (s = e.sent),
                      console.log("优惠券token刷新 ", s.data),
                      s.data.code === a.$code.SUCCESS
                        ? ((r = s.data.data.token),
                          n.index.setStorage({ key: "token", data: r }),
                          a.getCouponState())
                        : setTimeout(function () {
                            a.getCode();
                          }, 300);
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getCouponState: function () {
        var o = this;
        return t(
          e().mark(function t() {
            var i, a, c, s, r, d, u, g;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (i = o),
                      (e.next = 3),
                      i.$api.$selctActiveCoupons(i.activeId)
                    );
                  case 3:
                    (a = e.sent),
                      console.log("yhqsuccess", a),
                      a.data.code === i.$code.SUCCESS
                        ? (n.index.hideLoading(),
                          (c = a.data.data),
                          a.data.data.list &&
                            ((i.flag = !0),
                            (i.activtyInfo = c),
                            (i.couponInfo = c.list)),
                          (i.isReceive = c.isReceive),
                          c.state >= 0
                            ? (i.nowTime =
                                0 === c.state
                                  ? "isnobegin"
                                  : 1 === c.state
                                  ? "isnow"
                                  : "isend")
                            : i.activtyInfo.activityStartTime &&
                              ((s = new Date().getTime()),
                              (r = i.activtyInfo.activityStartTime.replace(
                                /\s/,
                                "T"
                              )),
                              (d = i.activtyInfo.activityEndTime.replace(
                                /\s/,
                                "T"
                              )),
                              (u = new Date(r).getTime()),
                              (g = new Date(d).getTime()),
                              s >= u && s <= g
                                ? (console.log("当前时间在范围内。"),
                                  (i.nowTime = "isnow"))
                                : s > g
                                ? (console.log("当前时间不在范围内。"),
                                  (i.nowTime = "isend"))
                                : s < u &&
                                  (console.log("当前时间不在范围内。"),
                                  (i.nowTime = "isnobegin"))),
                          (i.show = !0))
                        : a.data.code === i.$code.TOKENFAIL ||
                          -1 !== a.errMsg.indexOf("timeout")
                        ? setTimeout(function () {
                            i.getCouponState();
                          }, 2e3)
                        : ((i.nowTime = "isnobegin"),
                          (i.show = !0),
                          n.index.hideLoading());
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getTime: function (e) {
        var t = new Date(e);
        return ""
          .concat(t.getFullYear(), ".")
          .concat((t.getMonth() + 1).toString().padStart(2, "0"), ".")
          .concat(t.getDate().toString().padStart(2, "0"), " ")
          .concat(t.getHours().toString().padStart(2, "0"), ":")
          .concat(t.getMinutes().toString().padStart(2, "0"), ":")
          .concat(t.getSeconds().toString().padStart(2, "0"));
      },
      getTimeYear: function (e) {
        var t = new Date(e);
        return ""
          .concat(t.getFullYear(), ".")
          .concat((t.getMonth() + 1).toString().padStart(2, "0"), ".")
          .concat(t.getDate().toString().padStart(2, "0"));
      },
      gohome: function () {
        console.log("返回首页"),
          n.index.reLaunch({ url: "/pages/index/index" });
      },
      handleDinYue: function () {
        var e = this;
        n.index.requestSubscribeMessage({
          tmplIds: [
            "7LFWNPqnBaqV7mNh6r-ksQ0Fe9R6XK141vKplDI_LjY",
            "8w-V-iW22YpX-dODjTNnbl1qfQGDOmm4dXRyhrL4Ebo",
          ],
          success: function (e) {},
          fail: function (e) {
            console.log("失败模板消息", e);
          },
          complete: function () {
            e.getCoupon();
          },
        });
      },
      getCoupon: function () {
        var e = this;
        e.$loading("领取中"),
          e.couponInfo
            ? e.$api
                .$getActiveCoupons(e.activeId)
                .then(function (t) {
                  console.log(t.data),
                    t.data.code === e.$code.SUCCESS &&
                      (e.getCouponState(),
                      n.index.hideLoading(),
                      n.index.showModal({ title: "领取成功", showCancel: !1 })),
                    t.data.code === e.$code.FAIL &&
                      (n.index.hideLoading(),
                      n.index.showModal({
                        title: t.data.message,
                        showCancel: !1,
                      }));
                })
                .catch(function (e) {
                  console.log(e),
                    n.index.hideLoading(),
                    n.index.showModal({ title: "领取失败", showCancel: !1 });
                })
            : n.index.showModal({ title: "活动暂未开始", showCancel: !1 });
      },
    },
  };
Array ||
  (n.resolveComponent("zym-navigation") + n.resolveComponent("u-button"))();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    }
  )();
var s = n._export_sfc(c, [
  [
    "render",
    function (e, t, o, i, c, s) {
      return n.e(
        {
          a: n.p({
            title: c.activtyInfo.activityName,
            "is-home-page": !0,
            mini: !0,
          }),
          b: "".concat(e.$imgPath, "/log.png"),
          c: c.flag,
        },
        c.flag
          ? {
              d: n.f(c.couponInfo, function (e, t, o) {
                return n.e(
                  {
                    a: n.t(e.couponPrice ? e.couponPrice : ""),
                    b: n.t(e.useMinPrice),
                    c: n.t(e.couponPrice),
                    d: e.couponTime <= 0,
                  },
                  e.couponTime <= 0
                    ? {
                        e: n.t(s.getTimeYear(e.startTime)),
                        f: n.t(s.getTimeYear(e.endTime)),
                      }
                    : { g: n.t(e.couponTime) },
                  (c.isReceive, {}),
                  { h: t }
                );
              }),
              e: 0 === c.isReceive ? 1 : "",
              f: 0 === c.isReceive,
            }
          : {},
        {
          g: "".concat(e.$imgPath, "/titleleft.png"),
          h: "".concat(e.$imgPath, "/titleright.png"),
          i: c.activtyInfo.activityStartTime,
        },
        c.activtyInfo.activityStartTime
          ? {
              j: n.t(c.activtyInfo.activityStartTime),
              k: n.t(c.activtyInfo.activityEndTime),
            }
          : {},
        { l: c.show },
        c.show
          ? n.e(
              {
                m:
                  "isnobegin" === c.nowTime ||
                  !0 !== c.flag ||
                  c.couponInfo.length <= 0,
              },
              "isnobegin" === c.nowTime ||
                !0 !== c.flag ||
                c.couponInfo.length <= 0
                ? { n: n.p({ "custom-style": "width:686rpx;", color: "#ccc" }) }
                : "isend" === c.nowTime
                ? { p: n.p({ "custom-style": "width:686rpx;", color: "#ccc" }) }
                : 0 == c.isReceive && c.couponInfo.length
                ? {
                    r: a._imports_0$2,
                    s: n.o(function () {
                      return (
                        s.handleDinYue && s.handleDinYue.apply(s, arguments)
                      );
                    }),
                  }
                : {
                    t: "".concat(e.$imgPath, "/lq.png"),
                    v: n.o(function () {
                      return (
                        s.handleDinYue && s.handleDinYue.apply(s, arguments)
                      );
                    }),
                  },
              {
                o: "isend" === c.nowTime,
                q: 0 == c.isReceive && c.couponInfo.length,
              }
            )
          : {},
        { w: e.$store.getters.getNavigationHeight + "px" }
      );
    },
  ],
]);
wx.createPage(s);
