var e,
  a =
    (e = require("../../../service/lib/map/qqmap-wx-jssdk.min")) && e.__esModule
      ? e
      : { default: e };
var t,
  s,
  i = getApp();
i.BasePage({
  data: { isFirstIntoAddPage: !0 },
  onLoad: function (e) {
    (t = this),
      (this.type = e.type),
      (this.shopId = e.shopId),
      console.log("shopId --\x3e>", this.shopId),
      console.log("type ->>", this.type),
      (s = new a.default({ key: "AM3BZ-7LAC6-QAIS6-EXVBO-N2EZT-IHBBT" })),
      this.setData({ type: this.type });
  },
  addBtn: function () {
    var e = 6 == this.type ? 1 : 0;
    console.log("isVolunter --\x3e>", e),
      wx.navigateTo({
        url:
          "add-address/add-address?title=" +
          this.data.Str.addAddress[this.data.lanIndex] +
          "&isVolunteer=" +
          e,
      });
  },
  loadData: function () {
    this.requestWithLoading(
      "common/getMyAddress",
      { isVolunteer: 6 == this.type ? 1 : 0, shopId: this.shopId },
      function (e) {
        e &&
          (t.setData({ result: e }),
          t.initDistance(e),
          0 == e.address.length &&
            t.data.isFirstIntoAddPage &&
            (t.setData({ isFirstIntoAddPage: !1 }), t.addBtn()),
          console.log("result --\x3e>", e));
      }
    );
  },
  initDistance: function (e) {
    if ((console.log("initResult --\x3e>", e), e)) {
      for (var a in e.address) {
        var s = e.address[a];
        s.canDelivery = 1;
        var i = -1;
        e.shop &&
          (e.address[a].search_address &&
            (i = this.location._initShopDistance(e.shop, s.search_address)),
          i > 0 && (i = parseFloat(i / 1e3).toFixed(2))),
          (s.distance = i),
          (e.address[a] = s);
      }
      e.isDrivingDistance ? t._initDistance(e) : t.initDeliveryFee(e);
    }
  },
  initDeliveryFee: function (e) {
    e &&
      e.address.length > 0 &&
      (e.address.forEach(function (a) {
        if (a.distance > 0) {
          var t = a._distance ? a._distance : a.distance;
          a._distance &&
            (console.log("__distance --\x3e>", a._distance),
            (a.distance = a._distance)),
            t &&
              e.areaFee &&
              e.areaFee.limit_distance &&
              (t > e.areaFee.limit_distance || -1 == t
                ? (a.canDelivery = 0)
                : t >= 0 &&
                  ((a.canDelivery = 1),
                  0 == e.areaFee.area_limit_distance
                    ? (a.deliveryFee =
                        t < 1
                          ? parseFloat(e.areaFee.distance_0_fee)
                          : t < 2
                          ? parseFloat(e.areaFee.distance_1_fee)
                          : t < 3
                          ? parseFloat(e.areaFee.distance_2_fee)
                          : parseFloat(e.areaFee.distance_2_fee) +
                            parseFloat(
                              parseFloat(
                                parseFloat(
                                  Math.ceil(t - 3) *
                                    parseFloat(e.areaFee.one_km_fee)
                                )
                              ).toFixed(2)
                            ))
                    : t <= e.areaFee.area_limit_distance
                    ? (a.deliveryFee = 0)
                    : (a.deliveryFee = parseFloat(
                        parseFloat(
                          Math.ceil(t - e.areaFee.area_limit_distance) *
                            parseFloat(e.areaFee.one_km_fee)
                        )
                      ).toFixed(2))));
        }
      }),
      e.address &&
        e.address.sort(function (e, a) {
          return a.canDelivery - e.canDelivery;
        }),
      this.setData({ result: e }));
  },
  _initDistance: function (e) {
    if (e && e.shop) {
      var a = {};
      e.shop && (a = { latitude: e.shop.lat, longitude: e.shop.lng });
      var i = [];
      for (var n in e.address) {
        var o = e.address[n];
        o.search_address &&
          i.push({
            latitude: o.search_address.lat,
            longitude: o.search_address.lng,
          });
      }
      a &&
        i.length > 0 &&
        s.calculateDistance({
          from: a,
          to: i,
          success: function (a) {
            if (
              (console.log("_distance result --\x3e>", a),
              0 == a.status && a.result.elements.length == e.address.length)
            )
              for (var t in a.result.elements)
                e.address[t]._distance = parseFloat(
                  a.result.elements[t].distance / 1e3
                ).toFixed(2);
          },
          fail: function (e) {
            console.log("_distance error --\x3e>", e);
          },
          complete: function (a) {
            t.initDeliveryFee(e);
          },
        });
    }
  },
  itemClick: function (e) {
    var a = e.currentTarget.dataset.item;
    1 == this.type &&
      ((i.globalData.startAddress = a),
      t.setData({ isLoading: !0 }),
      setTimeout(function () {
        t.setData({ isLoading: !1 }), wx.navigateBack({});
      }, 500)),
      2 == this.type &&
        ((i.globalData.endAddress = a),
        t.setData({ isLoading: !0 }),
        setTimeout(function () {
          t.setData({ isLoading: !1 }), wx.navigateBack({});
        }, 500)),
      3 == this.type &&
        ((i.globalData.buyWhereAddress = a),
        t.setData({ isLoading: !0 }),
        setTimeout(function () {
          t.setData({ isLoading: !1 }), wx.navigateBack({});
        }, 500)),
      4 == this.type &&
        ((i.globalData.buyGoAddress = a),
        t.setData({ isLoading: !0 }),
        setTimeout(function () {
          t.setData({ isLoading: !1 }), wx.navigateBack({});
        }, 500)),
      (5 != this.type && 6 != this.type) ||
        !a.canDelivery ||
        ((i.globalData._selectAddress = a),
        t.setData({ isLoading: !0 }),
        setTimeout(function () {
          t.setData({ isLoading: !1 }), wx.navigateBack({});
        }, 500));
  },
  onReady: function () {},
  onShow: function () {
    this.loadData();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
