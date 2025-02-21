Component({
  options: { multipleSlots: !0, addGlobalClass: !0 },
  properties: {
    extClass: { type: String, value: "" },
    background: {
      type: String,
      value: "rgba(255, 255, 255, 1)",
      observer: "_showChange",
    },
    backgroundColorTop: {
      type: String,
      value: "rgba(255, 255, 255, 1)",
      observer: "_showChangeBackgroundColorTop",
    },
    color: { type: String, value: "rgba(0, 0, 0, 1)" },
    title: { type: String, value: "" },
    searchText: { type: String, value: "点我搜索" },
    searchBar: { type: Boolean, value: !1 },
    back: { type: Boolean, value: !1 },
    home: { type: Boolean, value: !1 },
    iconTheme: { type: String, value: "black" },
    delta: { type: Number, value: 1 },
  },
  created: function () {
    this.getSystemInfo();
  },
  attached: function () {
    this.setStyle();
  },
  data: {},
  pageLifetimes: {
    show: function () {
      getApp().globalSystemInfo.ios && (this.getSystemInfo(), this.setStyle());
    },
    hide: function () {},
  },
  methods: {
    setStyle: function (t) {
      var e = getApp().globalSystemInfo,
        a = e.statusBarHeight,
        o = e.navBarHeight,
        n = e.capsulePosition,
        i = e.navBarExtendHeight,
        r = e.ios,
        s = e.windowWidth,
        h = this.data,
        g = h.back,
        l = h.home,
        c = h.title,
        u = s - n.right,
        d = s - n.left,
        p = [
          "color: ".concat(this.data.color),
          "background: ".concat(this.data.background),
          "height:".concat(o + i, "px"),
          "padding-top:".concat(a, "px"),
          "padding-right:".concat(d, "px"),
          "padding-bottom:".concat(i, "px"),
        ].join(";"),
        v = [];
      (v =
        (g && !l) || (!g && l)
          ? [
              "width:".concat(n.width, "px"),
              "height:".concat(n.height, "px"),
            ].join(";")
          : (g && l) || c
          ? [
              "width:".concat(n.width, "px"),
              "height:".concat(n.height, "px"),
              "margin-left:".concat(u, "px"),
            ].join(";")
          : ["width:auto", "margin-left:0px"].join(";")),
        "created" === t
          ? (this.data = {
              navigationbarinnerStyle: p,
              navBarLeft: v,
              navBarHeight: o,
              capsulePosition: n,
              navBarExtendHeight: i,
              ios: r,
            })
          : this.setData({
              navigationbarinnerStyle: p,
              navBarLeft: v,
              navBarHeight: o,
              capsulePosition: n,
              navBarExtendHeight: i,
              ios: r,
            });
    },
    _showChange: function (t) {
      this.setStyle();
    },
    back: function () {
      this.triggerEvent("back", { delta: this.data.delta });
    },
    home: function () {
      this.triggerEvent("home", {});
    },
    search: function () {
      this.triggerEvent("search", {});
    },
    getSystemInfo: function () {
      var t = getApp();
      if (t.globalSystemInfo && !t.globalSystemInfo.ios)
        return t.globalSystemInfo;
      var e,
        a = wx.getSystemInfoSync(),
        o = !!(a.system.toLowerCase().search("ios") + 1);
      try {
        if (
          null ===
          (e = wx.getMenuButtonBoundingClientRect
            ? wx.getMenuButtonBoundingClientRect()
            : null)
        )
          throw "getMenuButtonBoundingClientRect error";
        if (!(e.width && e.top && e.left && e.height))
          throw "getMenuButtonBoundingClientRect error";
      } catch (t) {
        var n = "",
          i = 96;
        "android" === a.platform
          ? ((n = 8), (i = 96))
          : "devtools" === a.platform
          ? (n = o ? 5.5 : 7.5)
          : ((n = 4), (i = 88)),
          a.statusBarHeight ||
            (a.statusBarHeight = a.screenHeight - a.windowHeight - 20),
          (e = {
            bottom: a.statusBarHeight + n + 32,
            height: 32,
            left: a.windowWidth - i - 10,
            right: a.windowWidth - 10,
            top: a.statusBarHeight + n,
            width: i,
          }),
          console.log("error", t),
          console.log("rect", e);
      }
      var r = "";
      return (
        a.statusBarHeight
          ? ((r = (function () {
              var t = e.top - a.statusBarHeight;
              return a.statusBarHeight + 2 * t + e.height;
            })()),
            (a.navBarExtendHeight = o ? 4 : 0))
          : ((a.statusBarHeight = a.screenHeight - a.windowHeight - 15),
            (r = 2 * (e.top - a.statusBarHeight) + e.height),
            (a.statusBarHeight = 0),
            (a.navBarExtendHeight = 0)),
        (a.navBarHeight = r),
        (a.capsulePosition = e),
        (a.ios = o),
        (t.globalSystemInfo = a),
        a
      );
    },
  },
});
