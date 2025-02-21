var e = require("../common/vendor.js"),
  o = require("../store/index.js"),
  i = [
    "/pages/index/index",
    "/pages/order/order",
    "/pages_pay/receive_coupoon/receivce_coupoon",
    "/pages_pay/receive_coupoon/new_receivce_coupon",
    "/pages_pay/gift-info/gift-info",
    "/pages_pay/pay/pay",
    "/pages_my/webView/webView",
    "/pages_pay/socketpay/socketpay",
    "/pages_my/vip-coupon-list/vip-coupon-list",
    "/pages_my/my_cupons/my_cupons",
    "/pages_my/recharge-vip/recharge-vip",
    "/pages_my/recharge-vip/obtain_card",
  ];
function n(n) {
  return (
    console.log(o.store.state.hasLogin, "登录状态"),
    !!(
      i.some(function (e) {
        return n.startsWith(e);
      }) ||
      (e.index.getStorageSync("token") && o.store.state.hasLogin)
    )
  );
}
function a() {
  e.index.navigateTo({ url: "/pages_my/login/wx_login" });
}
(exports.navigator = function (o) {
  n(o) ? e.index.navigateTo({ url: o }) : a();
}),
  (exports.redirect = function (o) {
    n(o) ? e.index.redirectTo({ url: o }) : a();
  }),
  (exports.switchTab = function (o) {
    e.index.switchTab({ url: o || "/pages/index/index" });
  });
