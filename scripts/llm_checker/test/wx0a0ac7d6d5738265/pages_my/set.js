var t = require("../@babel/runtime/helpers/objectSpread2"),
  e = require("../common/vendor.js"),
  i = {
    data: function () {
      return { switchStatus: { isSwitch: !1 } };
    },
    computed: t(
      {},
      e.mapState({
        hasLogin: function (t) {
          return t.hasLogin;
        },
      })
    ),
    onLoad: function (t) {
      console.log(t.automaticDeduction),
        "1" === t.automaticDeduction &&
          this.$set(this.switchStatus, "isSwitch", !0),
        "0" === t.automaticDeduction &&
          this.$set(this.switchStatus, "isSwitch", !1);
    },
    methods: {
      switchChange: function (t) {
        var i = t.detail.value;
        this.$set(this.switchStatus, "isSwitch", i);
        var n = this;
        !0 === t.detail.value &&
          e.index.showModal({
            content: "是否同意开启油卡余额不足延续扣费服务？",
            confirmText: "开启",
            cancelText: "拒绝",
            success: function (t) {
              t.confirm &&
                (n.$set(n.switchStatus, "isSwitch", !0), n.isOpenYanxu(0)),
                t.cancel && n.$set(n.switchStatus, "isSwitch", !1);
            },
          }),
          !1 === t.detail.value &&
            e.index.showModal({
              content: "确认要关闭油卡延续服务吗？",
              confirmText: "关闭",
              success: function (t) {
                t.confirm &&
                  (n.$set(n.switchStatus, "isSwitch", !1), n.isOpenYanxu(1)),
                  t.cancel && n.$set(n.switchStatus, "isSwitch", !0);
              },
            });
      },
      isOpenYanxu: function (t) {
        var e = this;
        this.$api.$getSwitchCard(t).then(function (t) {
          2e4 === t.data.code && e.$toast(t.data.data);
        });
      },
      testPage: function () {
        e.index.navigateTo({
          url: "/pages_my/update_user_info/update_user_info",
        });
      },
      outLogin: function () {
        var t = this;
        e.index.showModal({
          title: "确定退出？",
          content: "退出登录后无法查看订单，重新登录即可查看",
          success: function (i) {
            if (i.confirm) {
              e.index.removeStorageSync("phone"),
                e.index.removeStorageSync("isFirstTime"),
                e.index.removeStorageSync("avatarUrl");
              var n = t;
              n.$store.commit("setUserInfo", ""),
                e.index.removeStorage({
                  key: "token",
                  success: function (t) {
                    console.log("token clear success", t),
                      n.$store.commit("updateHasLogin", !0),
                      console.log("退出提交后的状态", n.hasLogin),
                      e.index.setStorageSync("hasLogin", !1),
                      e.index.switchTab({ url: "/pages/index/index" });
                  },
                  fail: function (t) {
                    console.log("token clear fail", t);
                  },
                });
            }
          },
        });
      },
    },
  };
Array || e.resolveComponent("zym-navigation")();
Math;
var n = e._export_sfc(i, [
  [
    "render",
    function (t, i, n, s, a, o) {
      return {
        a: e.p({ title: "设置", "is-home-page": "true" }),
        b: e.o(function () {
          return o.switchChange && o.switchChange.apply(o, arguments);
        }),
        c: a.switchStatus.isSwitch,
        d: e.o(function () {
          return o.testPage && o.testPage.apply(o, arguments);
        }),
      };
    },
  ],
]);
wx.createPage(n);
