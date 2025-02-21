Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = u(require("../string/str.js")),
  e = u(require("../http/request.js")),
  a = u(require("../js/user.js")),
  o = u(require("../js/lan.js")),
  r = u(require("../js/location.js")),
  n = u(require("../../utils/tools.js")),
  s = u(require("../../utils/util.js")),
  i = u(require("../js/cart.js"));
function u(t) {
  return t && t.__esModule ? t : { default: t };
}
var d = new e.default(),
  l = Component,
  g = new a.default(),
  h = new o.default(),
  f = new r.default(),
  c = new i.default();
getApp(),
  (exports.default = function (e) {
    return (
      (e.data.isLoading = !1),
      (e.data.baseImageUrl = d.getBaseImageUrl()),
      (e.data._baseImageUrl = d._getBaseImageUrl()),
      (e.data.ossImage = d.getOssImage()),
      (e.data.logo_url =
        "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/logo/etewar_logo_.png"),
      (e.methods.requestWithLoading = function (t, e, a) {
        var o = this;
        (this.data.errorPage = !1), o.setData({ isLoading: !0, errorPage: !1 });
        var r = g.getToken();
        r && (e.token = r),
          wx.showNavigationBarLoading(),
          d._post(t, e, function (t) {
            return (
              wx.hideNavigationBarLoading(),
              wx.stopPullDownRefresh(),
              o.setData({ isLoading: !1 }),
              1 == t.resultCode
                ? ((o.data.errorPage = !1), a(t.resultData))
                : (o.setData({ errorPage: !0 }),
                  o.failureToast(),
                  o.requestError(),
                  a(!1))
            );
          });
      }),
      (e.methods.requestNotLoading = function (t, e, a) {
        var o =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
          r = g.getToken();
        r && (e.token = r),
          d._post(
            t,
            e,
            function (t) {
              var e = d._getData(t);
              return e
                ? "function" == typeof a && a(e)
                : "function" == typeof a && a(!1);
            },
            o
          );
      }),
      (e.methods.failureToast = function (t) {
        this.triggerEvent("error");
      }),
      (e.methods.requestError = function () {
        console.log("request error"), (this.data.errorPage = !0);
      }),
      (e.methods.switchLan = function () {
        this.setData({ lanIndex: h.switchLan() }), this.initLan();
      }),
      (e.methods.user = function () {
        return g;
      }),
      (e.methods.lan = function () {
        return h;
      }),
      (e.methods.location = function () {
        return f;
      }),
      (e.methods.tools = function () {
        return n.default;
      }),
      (e.methods.util = function () {
        return s.default;
      }),
      (e.methods.translate = function () {
        return translate;
      }),
      (e.methods.req = function () {
        return d;
      }),
      (e.methods.cart = function () {
        return c;
      }),
      void 0 === e.data.Str && (e.data.Str = t.default),
      (e.data.lanIndex = h.getLan()),
      (e.methods.retryMethod = function () {
        console.log("retryMethod"),
          (this.page = 1),
          "function" == typeof e.methods.loadData && this.loadData();
      }),
      (e.methods.showToast = function (t) {
        this.triggerEvent("showToast", t);
      }),
      (e.methods.hasEggToast = function (t) {
        this.triggerEvent("_hasEggToast", t);
      }),
      (e.methods.initLan = function () {
        var t = h.getLan(),
          e = !1;
        (e = t == h.getLanConst().UY), this.setData({ isUy: e, lanIndex: t });
      }),
      l(e)
    );
  });
