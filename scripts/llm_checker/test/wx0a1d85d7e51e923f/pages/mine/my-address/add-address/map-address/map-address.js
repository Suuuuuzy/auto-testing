var t,
  o,
  a,
  n =
    (t = require("../../../../../service/lib/map/qqmap-wx-jssdk.min")) &&
    t.__esModule
      ? t
      : { default: t };
getApp().BasePage({
  data: { location: { lat: "", lng: "" }, itemData: [] },
  onLoad: function (t) {
    (a = this),
      (o = new n.default({ key: "AM3BZ-7LAC6-QAIS6-EXVBO-N2EZT-IHBBT" })),
      this._location();
  },
  _location: function () {
    wx.getLocation({
      type: "wgs84",
      success: function (t) {
        var o = t.latitude,
          n = t.longitude;
        (a.data.location.lat = o),
          (a.data.location.lng = n),
          a.setData({ location: a.data.location }),
          a.initNearAddress();
      },
      fail: function (t) {},
    });
  },
  initNearAddress: function () {
    var t = this.data.location,
      n = t.lat + "," + t.lng;
    console.log("temp --\x3e>", n),
      o.reverseGeocoder({
        get_poi: 1,
        location: n,
        success: function (t) {
          console.log("result --\x3e>", t);
          t = t.result;
          var o = [];
          o.push({
            title: t.address,
            id: 0,
            latitude: t.location.lat,
            longitude: t.location.lng,
            iconPath: "/resource/images/common/dingwei.png",
            width: 40,
            height: 40,
          }),
            (a.data.location.lat = t.location.lat),
            (a.data.location.lng = t.location.lng),
            a.setData({
              markers: o,
              poi: { latitude: t.location.lat, longitude: t.location.lng },
              location: a.data.location,
            }),
            t.poi_count > 0 && a.setData({ itemData: t.pois });
        },
        fail: function (t) {},
      });
  },
  getLngLat: function () {
    var t = this;
    (this.mapCtx = wx.createMapContext("myMap")),
      this.mapCtx.getCenterLocation({
        success: function (o) {
          console.log("getLang --\x3e>>", o),
            (t.data.location.lat = o.latitude),
            (t.data.location.lng = o.longitude),
            a.setData({ location: a.data.location }),
            a.initNearAddress();
        },
      });
  },
  regionChange: function (t) {
    console.log("regionChange --\x3e>", t);
    var o = !0;
    "end" == t.type &&
      "drag" == t.causedBy &&
      o &&
      (this.getLngLat(), (o = !1));
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
