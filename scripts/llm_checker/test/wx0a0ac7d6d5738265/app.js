Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var e = require("./common/vendor.js"),
  o = require("./utils/jumpFn.js"),
  i = require("./store/index.js"),
  t = require("./api/api.js"),
  n = require("./api/config/config.js"),
  r = require("./utils/toast.js"),
  s = require("./uview-plus/index.js"),
  a = require("./uview-plus/libs/mixin/mpShare.js"),
  c = require("./common/mixin.js"),
  g = {
    onLaunch: function () {
      e.index.setStorageSync("tabBar", {
        list: [
          { pagePath: "pages/index/index", text: "首页" },
          { pagePath: "pages/order/order", text: "订单" },
        ],
      });
      var o = e.index.getUpdateManager();
      o.onCheckForUpdate(function (o) {
        console.log("请求完新版本信息的回调", o.hasUpdate),
          o.hasUpdate &&
            e.index.showToast({
              title: "即将有新版本请留意",
              duration: 1500,
              icon: "none",
            });
      }),
        o.onUpdateReady(function () {
          e.index.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function (e) {
              e.confirm && o.applyUpdate();
            },
          });
        }),
        o.onUpdateFailed(function () {
          e.index.showModal({
            title: "更新提示",
            content: "新版本下载失败",
            showCancel: !1,
          });
        });
    },
    onShow: function () {
      console.log("App Show");
    },
    onHide: function () {
      console.log("App Hide");
    },
  };
require("./vue-devtools/hook.js"), require("./vue-devtools/backend.js");
var l = {
  install: function (e, s) {
    (e.config.globalProperties.$jump = o.navigator),
      (e.config.globalProperties.$redirect = o.redirect),
      (e.config.globalProperties.$switchTab = o.switchTab),
      (e.config.globalProperties.$API_BASE_URL = "https://yiningjiayou.com"),
      (e.config.globalProperties.$imgPath =
        "https://yiningjiayou.com/yn/ynxcx"),
      (e.config.globalProperties.$api = t._api),
      (e.config.globalProperties.$code = n.code),
      (e.config.globalProperties.$toast = r._showToast),
      (e.config.globalProperties.$loading = r._showLoading),
      (e.config.globalProperties.$store = i.store);
  },
};
function p() {
  var o = e.createSSRApp(g);
  return (
    (o.config.productionTip = !1),
    o.use(l),
    o.use(i.store).use(s.uviewPlus),
    o.mixin(a.mpShare),
    o.mixin(c.mixin),
    (e.index.$u.config.unit = "rpx"),
    { app: o }
  );
}
var u,
  d = e.index.getLaunchOptionsSync();
d.scene && (u = d.scene),
  console.log(u),
  e.index.setStorageSync("scene", u),
  console.log("main.js查看store.state.scene", i.store.state.scene);
var h = e.index.getSystemInfoSync(),
  f = h.statusBarHeight,
  x = h.platform,
  m = e.index.getMenuButtonBoundingClientRect(),
  v = m.top,
  S = m.height;
if (
  (console.log("height", S, "top", v),
  i.store.commit("setStatusBarHeight", f),
  v && 0 !== v && S && 0 !== S)
) {
  var b = 2 * (v - f) + S;
  i.store.commit("setNavigationBarHeight", b),
    console.log("高度获取成功进行计算后的结果", b);
} else e.index.setStorageSync("navigationBarHeight", "android" === x ? 44 : 48);
p().app.mount("#app"), (exports.createApp = p);
