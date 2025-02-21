var a,
  t = getApp();
t.BasePage({
  data: { searchKeyWord: "" },
  onLoad: function (t) {
    a = this;
  },
  onReady: function () {},
  onShow: function () {
    this.setData({ location: t.globalData.location }),
      t.globalData.locationDenied && this.setData({ locationDenied: !0 }),
      this.loadData();
  },
  loadData: function () {
    this.requestWithLoading(
      "common/selectAreaPage",
      {
        adCode: this.data.location
          ? this.data.location.addressComponent.adcode
          : 0,
      },
      function (t) {
        t && a.setData({ pageData: t, areaList: t.areas });
      }
    );
  },
  searchInput: function (t) {
    a.setData({ searchKeyWord: t.detail.value }),
      0 == this.data.searchKeyWord.length &&
        a.setData({ areaList: this.data.pageData.areas });
  },
  searchBtn: function (t) {
    var e = this.data.searchKeyWord;
    if ((a.setData({ isLoading: !0 }), 0 != e.length)) {
      var o = 0;
      this.tool.isChina(e)
        ? (o = 1)
        : this.tool.isEn(e)
        ? (o = 2)
        : this.tool.checkNum(e) && (o = 3);
      var n = [],
        i = this.data.pageData.areas;
      for (var s in i)
        0 == o
          ? i[s].uy_name.split(e).length > 1 && n.push(i[s])
          : 1 == o && i[s].ch_name.split(e).length > 1 && n.push(i[s]);
      a.setData({ areaList: n, isLoading: !1 });
    } else a.setData({ areaList: a.data.pageData.areas, isLoading: !1 });
  },
  selectItem: function (a) {
    var e = a.currentTarget.dataset.item;
    if (e) {
      (t.globalData.selectArea = e), this.location.setAreaItem(e);
      var o = getCurrentPages();
      o[o.length - 2].setData({ refreshData: { hasSelectArea: !0 } }),
        wx.navigateBack({ delta: 1 });
    }
  },
  locationBtn: function () {},
  settingCall: function (e) {
    console.log(e),
      e.detail.authSetting["scope.userLocation"]
        ? (console.log("ok"),
          this.location.location(function (e) {
            e && -1 != e && ((t.globalData.location = e), a.onShow());
          }))
        : this.showT({
            content: a.data.Str.locationFail[a.data.lanIndex],
            icon: "shangxinbiaoqing",
            color: "red",
          });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.loadData();
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
