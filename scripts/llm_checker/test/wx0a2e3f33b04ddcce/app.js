App({
  globalData: {
    baseURL: "https://huotong.eastcmiot.com/facepay",
    user: "/face-payment-user",
    takeaway: "/face-payment-takeaway",
    mgmt: "/face-payment-mgmt",
    access: "/face-payment-access",
    userInfo: {},
    token: "",
    shoppingCart: [],
    totalPrice: 0,
    companyId: 0,
  },
  onLaunch: function (a) {
    var e = wx.getStorageSync("userInfo") || {},
      o = e.token || "";
    (this.globalData.userInfo = e),
      (this.globalData.token = o),
      wx.setStorageSync("userInfo", e);
  },
  request: function (a) {
    var e = this,
      o = { "content-type": "application/json" };
    a.header && (o = a.header),
      this.globalData.token && (o.token = this.globalData.token),
      void 0 === a.loading && (a.loading = !0),
      a.loading &&
        wx.showLoading({ title: "加载中...", mask: Boolean(a.mask) });
    var t = {
      url: this.globalData.baseURL + a.url,
      method: a.method ? a.method.toUpperCase() : "GET",
      header: o,
      data: a.data || "",
      dataType: "json",
      success: function (o) {
        if (
          (a.loading && wx.hideLoading(),
          11e3 === o.data.resultCode && !e.globalData.lockLogin)
        )
          return (
            console.log("response.data:", o.data),
            (e.globalData.lockLogin = !0),
            setTimeout(function () {
              e.globalData.lockLogin = !1;
            }, 2e3),
            wx.showToast({ title: "登录过期，请重新登录", icon: "none" }),
            wx.clearStorageSync(),
            (e.globalData.token = ""),
            void setTimeout(function () {
              try {
                wx.reLaunch({ url: "/pages/onelogin/onelogin" });
              } catch (a) {
                setTimeout(function () {
                  wx.reLaunch({ url: "/pages/onelogin/onelogin" });
                }, 500);
              }
            }, 1e3)
          );
        a.successCallback && a.successCallback(o);
      },
      fail: function (e) {
        console.log("error:", e),
          a.loading && wx.hideLoading(),
          a.failCallback && a.failCallback(e);
      },
    };
    wx.request(t);
  },
  GetQueryString: function (a, e) {
    var o = a.split("?"),
      t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
      n = o[1].match(t);
    return null !== n ? unescape(n[2]) : null;
  },
});
