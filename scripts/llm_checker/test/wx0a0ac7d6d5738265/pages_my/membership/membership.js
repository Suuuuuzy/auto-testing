var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  o = require("../../common/assets.js"),
  a = {
    data: function () {
      return { memberLevel: "", animation: !1, isLeved: !1, leve: "" };
    },
    onShow: function () {
      n.index.getStorageSync("userInfo") &&
        (this.$store.commit("updateHasLogin", !0), console.log("有登录过")),
        this.getCode();
    },
    onLoad: function (e) {
      if (e.q) {
        console.log("参数", e.q);
        var t = decodeURIComponent(e.q).match(/id=(\d+)/)[1];
        console.log("id:", t), (this.memberLevel = t);
      }
      e.id && (console.log("id:", e.id), (this.memberLevel = e.id));
    },
    onUnload: function () {
      this.$store.state.hasLogin || n.index.removeStorageSync("token");
    },
    methods: {
      getCode: function () {
        var e = this;
        n.index.login({
          provider: "weixin",
          success: function (t) {
            e.getToken(t.code);
          },
        });
      },
      getToken: function (o) {
        var a = this;
        return t(
          e().mark(function t() {
            var r, i, c;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (r = a), (e.next = 3), r.$api.getToken({ code: o });
                  case 3:
                    (i = e.sent),
                      console.log("tokenHuoqucg ", i.data),
                      2e4 === i.data.code
                        ? ((c = i.data.data.token),
                          n.index.setStorage({ key: "token", data: c }),
                          console.log("thiscouponid", r.memberLevel),
                          2 == r.memberLevel || r.memberLevel,
                          r.getLv(r.memberLevel))
                        : r.getCode();
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      quikPage: function () {
        (this.animation = !0),
          setTimeout(function () {
            n.index.reLaunch({ url: "/pages/index/index" });
          }, 2e3);
      },
      getLv: function (n) {
        var o = this;
        return t(
          e().mark(function t() {
            var a, r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (a = o),
                      (e.next = 3),
                      a.$api.$upMemberLevel({ memberLevel: n })
                    );
                  case 3:
                    (r = e.sent),
                      console.log("yhqsuccess", r),
                      2e4 === r.data.code && (a.leve = r.data.data.memberLevel),
                      20001 === r.data.code && (a.isLeved = !0),
                      20004 === r.data.code && a.getLv(n);
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
          setTimeout(function () {
            n.index.reLaunch({ url: "/pages/index/index" });
          }, 500);
      },
    },
  };
var r = n._export_sfc(a, [
  [
    "render",
    function (e, t, a, r, i, c) {
      return n.e(
        {
          a: e.$store.getters.getStatusBarHeight + "px",
          b: n.o(function () {
            return c.gohome && c.gohome.apply(c, arguments);
          }),
          c: e.$store.getters.getNavigationHeight + "px",
          d: i.leve || i.isLeved,
        },
        i.leve || i.isLeved
          ? {
              e: o._imports_0$3,
              f: n.t(!0 === i.isLeved ? "参与失败" : "等级提升！"),
              g: n.t(
                !0 === i.isLeved
                  ? "你已参与过活动了"
                  : "恭喜你已提升至".concat(i.leve)
              ),
              h: n.o(function () {
                return c.quikPage && c.quikPage.apply(c, arguments);
              }),
              i: n.n(
                !0 === i.animation ? "slide-out-bottom" : "animatioon-dwn"
              ),
            }
          : {}
      );
    },
  ],
]);
wx.createPage(r);
