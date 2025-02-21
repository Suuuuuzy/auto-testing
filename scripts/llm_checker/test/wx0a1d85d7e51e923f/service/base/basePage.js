Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = u(require("../string/str.js")),
  a = u(require("../http/request.js")),
  e = u(require("../js/user.js")),
  o = u(require("../js/lan.js")),
  n = u(require("../js/location.js")),
  r = require("../../pages/template/toast/toast.js"),
  i = u(require("../../utils/tools.js")),
  s = u(require("../js/cart.js"));
function u(t) {
  return t && t.__esModule ? t : { default: t };
}
var f = new a.default(),
  l = new e.default(),
  c = new o.default(),
  g = new n.default(),
  d = new s.default(),
  h = Page;
exports.default = function (a) {
  (a.data.isLoading = !1),
    (a.data.errorPage = !1),
    (a.data.isUy = !0),
    (a.data.baseImageUrl = f.getBaseImageUrl()),
    (a.data.token = l.getToken()),
    (a.data._baseImageUrl = f._getBaseImageUrl()),
    (a.data.ossImage = f.getOssImage()),
    (a.data.logo_url = f.getLogUrl());
  var e = a.onLoad;
  return (
    (a.onLoad = function (t) {
      var a = t.title;
      return (
        a && wx.setNavigationBarTitle({ title: a }),
        this.initLan(),
        (this.req = f),
        new r.ToastPannel(),
        (this.location = g),
        (this.user = l),
        (this.tool = i.default),
        (this.errDialog = this.selectComponent("#errDialog")),
        (this.lan = c),
        (this.cart = d),
        e.call(this, t)
      );
    }),
    "function" != typeof a.testFun &&
      (a.testFun = function () {
        console.log("this si test fun");
      }),
    (a.requestWithLoading = function (t, a, e, o, n) {
      var r = this;
      this.setData({ isLoading: !0 }), a || (a = {});
      var i = l.getToken();
      i && (a.token = i),
        wx.showNavigationBarLoading(),
        f._post(t, a, function (t) {
          wx.hideNavigationBarLoading(),
            wx.stopPullDownRefresh(),
            r.setData({ isLoading: !1 });
          var a = f._getData(t);
          return a
            ? (r.setData({ errorPage: !1 }), "function" == typeof e && e(a))
            : (r.requestError(),
              o
                ? r.errDialog.show(function (t) {
                    r.retryMethod();
                  })
                : r.failureToast(),
              "function" == typeof n && n(t));
        });
    }),
    (a.uploadRequest = function (t, a, e, o) {
      var n = this;
      this.setData({ isLoading: !0 }), a || (a = {});
      var r = l.getToken();
      r && (a.token = r),
        wx.showNavigationBarLoading(),
        f._upload(t, a, e, function (t) {
          wx.hideNavigationBarLoading(),
            wx.stopPullDownRefresh(),
            n.setData({ isLoading: !1 });
          var a = f._getData(t);
          if (a)
            return n.setData({ errorPage: !1 }), "function" == typeof o && o(a);
          n.requestError();
        });
    }),
    (a.requestWithLoading_ = function (t, a, e, o, n) {
      var r = this;
      this.setData({ isLoading: !0 }), a || (a = {});
      var i = l.getToken();
      i && (a.token = i),
        wx.showNavigationBarLoading(),
        f._post(
          t,
          a,
          function (t) {
            wx.hideNavigationBarLoading(),
              wx.stopPullDownRefresh(),
              r.setData({ isLoading: !1 });
            var a = f._getData(t);
            return a
              ? (r.setData({ errorPage: !1 }), "function" == typeof e && e(a))
              : (r.requestError(),
                o
                  ? r.errDialog.show(function (t) {
                      r.retryMethod();
                    })
                  : r.failureToast(),
                "function" == typeof n && n(t));
          },
          1
        );
    }),
    (a.requestNotLoading = function (t, a, e, o) {
      var n =
        arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
      a || (a = {});
      var r = l.getToken();
      r && (a.token = r),
        f._post(
          t,
          a,
          function (t) {
            return t && 1 == t.resultCode
              ? "function" == typeof e && e(t.resultData)
              : "function" == typeof o && o(t);
          },
          n
        );
    }),
    (a.requestError = function () {
      console.log("request error"), this.setData({ errorPage: !0 });
    }),
    (a.lanSwitch = function () {
      console.log("lanSwitch"),
        this.setData({ lanIndex: c.getLan() }),
        this.initLan();
    }),
    (a.switchLan = function () {
      this.setData({ lanIndex: c.switchLan() }), this.initLan();
    }),
    (a.getToken = function () {
      return l.getToken();
    }),
    (a.showToast = function (t) {
      console.log("showToast", t), this.showT(t.detail, t.detail.call);
    }),
    (a.initLan = function () {
      var t = c.getLan(),
        a = !1;
      (a = t == c.getLanConst().UY), this.setData({ isUy: a, lanIndex: t });
    }),
    void 0 === a.data.Str && (a.data.Str = t.default),
    void 0 === a.data.lanIndex && (a.data.lanIndex = c.getLan()),
    (a.retryMethod = function () {
      console.log("retryMethod"),
        "function" == typeof a.loadData && this.loadData();
    }),
    (a.successToast = function (t) {
      this.showT(
        {
          content: this.data.Str.opratingSuccess[this.data.lanIndex],
          icon: "success",
          color: "pink",
        },
        function (a) {
          "function" == typeof t && t();
        }
      );
    }),
    (a.hasEggToast = function (t) {
      var a =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
      this.showT(
        {
          content: "X " + a,
          icon: a > 0 ? "egg" : "Eggcrackedfood",
          color: a > 0 ? "orange" : "gray",
        },
        function (a) {
          "function" == typeof t && t();
        }
      );
    }),
    (a.failureToast = function (t) {
      this.showT(
        {
          content: this.data.Str.opratingError[this.data.lanIndex],
          icon: "error",
          color: "red",
        },
        function (a) {
          "function" == typeof t && t();
        }
      );
    }),
    (a.initBar = function () {
      switch (this.type) {
        case "black":
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#333333",
          });
          break;
        case "red":
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#e54d42",
          });
          break;
        case "cyan":
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#1cbbb4",
          });
      }
    }),
    h(a)
  );
};
