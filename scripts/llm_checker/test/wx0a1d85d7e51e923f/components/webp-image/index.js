var e = wx.getSystemInfoSync();
Component({
  externalClasses: ["t-class", "t-class-load"],
  properties: {
    loadFailed: { type: String, value: "default" },
    loading: { type: String, value: "default" },
    src: { type: String, value: "" },
    mode: { type: String, value: "aspectFill" },
    webp: { type: Boolean, value: !0 },
    lazyLoad: { type: Boolean, value: !1 },
    showMenuByLongpress: { type: Boolean, value: !1 },
  },
  data: { thumbHeight: 375, thumbWidth: 375, systemInfo: e },
  lifetimes: {
    ready: function () {
      var e = this,
        t = this.properties.mode;
      this.getRect(".J-image").then(function (r) {
        if (r) {
          var i = r.width,
            n = r.height;
          e.setData(
            "heightFix" === t
              ? { thumbHeight: e.px2rpx(n) || 375 }
              : { thumbWidth: e.px2rpx(i) || 375 }
          );
        }
      });
    },
  },
  methods: {
    px2rpx: function (t) {
      return (750 / (e.screenWidth || 375)) * t;
    },
    getRect: function (e) {
      var t = this;
      return new Promise(function (r) {
        t.selectorQuery || (t.selectorQuery = t.createSelectorQuery()),
          t.selectorQuery.select(e).boundingClientRect(r).exec();
      });
    },
    onLoad: function (e) {
      this.triggerEvent("load", e.detail);
    },
    onError: function (e) {
      this.triggerEvent("error", e.detail);
    },
  },
});
