var t,
  a = getApp();
a.BasePage({
  data: {},
  onLoad: function (a) {
    (this.isVolunteer = a.isVolunteer ? a.isVolunteer : null), (t = this);
  },
  onReady: function () {},
  onShow: function () {
    this.setData({
      selectArea: a.globalData.selectArea,
      location: a.globalData.location,
    }),
      console.log("location", this.data.location),
      console.log(this.data.selectArea),
      this.loadData();
  },
  loadData: function () {
    this.data.selectArea &&
      this.requestWithLoading(
        "common/getStreetAddress",
        { areaId: this.data.selectArea.id, isVolunteer: this.isVolunteer },
        function (a) {
          if (a) {
            t.setData({ pageData: a, isLoading: !0 });
            var e = t.data.location;
            if (e) {
              for (var o in a) {
                var n = parseInt(
                  t.location.getDistance(
                    a[o].lat,
                    a[o].lng,
                    e.location.lat,
                    e.location.lng
                  )
                );
                a[o].distance = n;
              }
              a.sort(function (t, a) {
                return t.distance - a.distance;
              });
            }
            var i = [];
            if (a.length < 100) i = a;
            else
              for (var s in a) {
                if (s > 100) break;
                i.push(a[s]);
              }
            console.log("list count --\x3e>" + i.length),
              t.setData({ addressList: i, isLoading: !1 });
          }
        }
      );
  },
  searchInput: function (a) {
    var e = a.detail.value;
    t.setData({ searchKeyWord: e });
  },
  searchBtn: function () {
    var a = this.data.searchKeyWord;
    if ((t.setData({ isLoading: !0 }), 0 != a.length)) {
      var e = 0;
      this.tool.isChina(a)
        ? (e = 1)
        : this.tool.isEn(a)
        ? (e = 2)
        : this.tool.checkNum(a) && (e = 3),
        console.log("type --\x3e>" + e);
      var o = [],
        n = this.data.pageData;
      for (var i in n)
        0 == e
          ? n[i].uy_name.split(a).length > 1 && o.push(n[i])
          : 1 == e && n[i].name.split(a).length > 1 && o.push(n[i]);
      t.setData({ addressList: o, isLoading: !1 });
    } else t.setData({ addressList: t.data.pageData, isLoading: !1 });
  },
  itemClick: function (e) {
    var o = e.currentTarget.dataset.item;
    console.log(o),
      (a.globalData.mSelectAddress = o),
      t.setData({ isLoading: !0 }),
      setTimeout(function () {
        t.setData({ isLoading: !1 }), wx.navigateBack({});
      }, 200);
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
