Page({
  data: {},
  onLoad: function (e) {
    if ((wx.showLoading({ title: "加载中..." }), "8777" == e.type)) {
      if (
        ("kf" == e.s
          ? wx.setStorageSync("contact", !0)
          : (wx.setStorageSync("invest", !0), wx.setStorageSync("showVip", !0)),
        "app" == e.s && wx.setStorageSync("isapp", !0),
        "coupon" == e.s)
      ) {
        wx.setStorageSync("isapp", !0);
        var t = Date.parse(new Date()) / 1e3;
        wx.setStorageSync("couponTime", t);
      }
      e.uid && wx.setStorageSync("uid", e.uid),
        wx.switchTab({ url: "/pages/user/user" });
    } else
      "authorize" == e.type
        ? (wx.setStorageSync("authorize", !0),
          wx.switchTab({ url: "/pages/user/user" }))
        : wx.switchTab({ url: "/pages/watermark/watermark" });
  },
});
