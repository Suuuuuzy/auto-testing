var e,
  t = getApp();
t.BasePage({
  data: {
    userInfo: {},
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    pageCur: "home",
    tapInfo: [
      { uy_name: "باش بەت", ch_name: "首页", icon: "tab_1", flag: "home" },
      { uy_name: "زاكاس", ch_name: "订单", icon: "tab_3", flag: "order" },
      { uy_name: "مەن", ch_name: "我的", icon: "tab_4", flag: "mine" },
    ],
    showShop: !1,
    appTitle: null,
  },
  onLoad: function (t) {
    console.log("index onLoad"), (e = this);
    var a = t.lan;
    this.setData({ lanConst: this.lan.getLanConst() }),
      this.lan.getHasSelectLan()
        ? (console.log("lan --\x3e>", a),
          this.initIndexLan(a),
          this.initSharedUser(t),
          this.appState())
        : wx.navigateTo({ url: "./select-lan/select-lan" });
  },
  initSharedUser: function (e) {
    if (
      ((this.shareUserId = 0),
      e.shareUserId && (this.shareUserId = e.shareUserId),
      e.scene)
    ) {
      var a = decodeURIComponent(e.scene);
      this.shareUserId = a.split("&")[0];
      var s = a.split("&")[1];
      this.initIndexLan(s);
    }
    this.shareUserId && (t.globalData.shareUserId = this.shareUserId);
  },
  initIndexLan: function (e) {
    console.log("lan --\x3e>", e),
      1 == e
        ? this.data.isUy || this.switchLan()
        : 2 == e && this.data.isUy && this.switchLan();
  },
  navChange: function (e) {
    "send" != e.currentTarget.dataset.cur &&
      this.setData({ pageCur: e.currentTarget.dataset.cur }),
      this.onShow();
  },
  _lanSwitch: function () {
    var e = this.data.pageCur;
    this.setData({ pageCur: "" }),
      this.setData({ pageCur: e }),
      this.switchLan(),
      this.onShow();
  },
  onShow: function () {
    console.log("index onShow "),
      this._appState(),
      this.calcTabbar(),
      (this.home = this.selectComponent("#home")),
      (this.order = this.selectComponent("#order")),
      (this.mine = this.selectComponent("#mine")),
      (this.shop = this.selectComponent("#shop"));
    var e = getCurrentPages(),
      t = e[e.length - 1],
      a = t.data.refreshData;
    console.log("refreshData --\x3e>", a),
      a
        ? (a.backShop && (t.data.refreshData = null),
          a.hasSelectArea &&
            this.home &&
            ((t.data.refreshData = null), this.home.refresh()),
          this.home && this.home.onShow())
        : (this.home && this.home.onShow({ isComeIndexPage: 1 }),
          this.order && this.order.onShow(),
          this.mine && this.mine.onShow(this.showCall),
          this.shop && this.shop.onShow());
    var s = this.cart.getAllGoodsCount();
    console.log("shopsCount ---\x3e>", s), this.setData({ shopsCount: s });
  },
  _appState: function () {
    e || (e = this), this.appState();
  },
  appState: function () {
    this.requestNotLoading("basic/getAppState", {}, function (a) {
      a &&
        (console.log("fuck appState --\x3e>", a),
        e.setData({ appState: a }),
        (t.globalData.appState = a),
        a.userInfo && (t.globalData.userInfo = a.userInfo),
        e.mine && e.mine.refreshAppState(a),
        a.appTitle &&
          !e.data.appTitle &&
          (console.log("appTitle --\x3e>", a.appTitle.uy_name),
          e.setData({ appTitle: a.appTitle })));
    }),
      this.visitLog();
  },
  visitLog: function () {
    t.globalData.shareUserId &&
      !t.globalData.hasShareVisited &&
      this.requestNotLoading(
        "userCenter/shareVisit",
        { shareUserId: t.globalData.shareUserId },
        function (e) {
          e && (t.globalData.hasShareVisited = !0);
        }
      );
  },
  mOrder: function (e) {
    console.log("index mOrder --\x3e>", e),
      (e.currentTarget.dataset.cur = "order"),
      this.navChange(e);
  },
  takeOrder: function (e) {
    (e.currentTarget.dataset.cur = "shop"), this.navChange(e);
  },
  onShareAppMessage: function () {
    var e = "单单有优惠",
      t = this.data.isUy ? 1 : 2;
    this.data.isUy && (e = "ھەربىر زاكاستا ئېتىبار بار");
    var a = null;
    return (
      this.user && this.user.getId() && (a = this.user.getId()),
      {
        title: e,
        imageUrl: "../../resource/images/common/share.png",
        path: "/pages/index/index?lan=" + t + "&shareUserId=" + a,
      }
    );
  },
  onReachBottom: function () {
    console.log("onReachBottom ---\x3e>"),
      this.home && this.home.loadMore(),
      this.order && this.order.loadMore(),
      this.shop && this.shop.loadMore();
  },
  onPullDownRefresh: function () {
    this.order && this.order.refresh(),
      this.home && this.home.refresh(),
      this.shop && this.shop.refresh(),
      this.mine && this.mine.refresh();
  },
  homeOnLoad: function (t) {
    console.log("index home onLoad --\x3e>", t),
      console.log("wetherData --\x3e>", this.home.data.weatherData);
    var a = t.detail;
    a && this.setData({ pageData: a }),
      a &&
      a.setting &&
      1 == a.setting.show_shop &&
      this.data.appState &&
      this.data.appState.showShop
        ? e.setData({ showShop: !0 })
        : e.setData({ showShop: !1 }),
      this.calcTabbar(),
      console.log("showShop ---\x3e>", this.data.showShop);
  },
  loadWeatheData: function (e) {
    var t = e.detail;
    console.log("index weatherdata =", t),
      t && this.setData({ weatherData: t });
  },
  scrollChange: function (e) {
    console.log("scrollToip = ", e.detail),
      this.setData({ scrollTop: e.detail });
  },
  calcTabbar: function () {
    var e = wx.createSelectorQuery().in(this);
    e.select("#tabbar").boundingClientRect(),
      e.exec(function (e) {
        e && e[0] && (t.globalData.tabbarHeight = e[0].height),
          console.log("calc --\x3e>", e);
      });
  },
});
