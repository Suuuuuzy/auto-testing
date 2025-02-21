var a,
  t = require("../../../../@babel/runtime/helpers/defineProperty"),
  o =
    (a = require("../../../../service/lib/map/qqmap-wx-jssdk.min")) &&
    a.__esModule
      ? a
      : { default: a };
var e,
  i = getApp();
i.BasePage(
  t(
    t(
      t(
        t(
          t(
            t(
              {
                data: {},
                onLoad: function (a) {
                  (e = this),
                    (this.areaId = a.areaId),
                    wx.setNavigationBarTitle({ title: "团购" }),
                    this.initLocation();
                },
                initLocation: function () {
                  this.areaId || this.data.locationData
                    ? this.loadData()
                    : new o.default({
                        key: "AM3BZ-7LAC6-QAIS6-EXVBO-N2EZT-IHBBT",
                      }).reverseGeocoder({
                        get_poi: 1,
                        success: function (a) {
                          console.log("result --\x3e>", a),
                            a && 0 == a.status
                              ? (a.result.pois &&
                                  a.result.pois.length > 0 &&
                                  e.setData({
                                    addressName: a.result.pois[0].title,
                                  }),
                                e.setData({ locationData: a.result }),
                                (i.globalData.locationData = a.result))
                              : e.setData({ notLocation: !0 }),
                            e.loadData();
                        },
                        fail: function (a) {
                          e.setData({ notLocation: !0 }), e.loadData();
                        },
                      });
                },
                loadData: function () {
                  var a = {};
                  if (
                    this.data.refreshData &&
                    this.data.refreshData.selectItem
                  ) {
                    var t = this.data.refreshData.selectItem;
                    (a.adCode = t.ad_code), (a.townCode = t.town_code);
                  } else
                    this.data.locationData &&
                      (this.data.locationData.ad_info &&
                        this.data.locationData.ad_info.adcode &&
                        (a.adCode = this.data.locationData.ad_info.adcode),
                      this.data.locationData.address_reference &&
                        this.data.locationData.address_reference.town &&
                        (a.townCode =
                          this.data.locationData.address_reference.town.id));
                  this.areaId && (a.areaId = this.areaId),
                    this.requestWithLoading(
                      "group/groupHomePage",
                      a,
                      function (a) {
                        a &&
                          (e.setData({ pageData: a }),
                          a.locationArea &&
                            1 == a.locationArea.can_location &&
                            ((i.globalData.selectArea = a.locationArea),
                            e.setData({
                              selectArea: a.locationArea,
                              notLocation: !1,
                            })),
                          0 == a.hasUser && e.user().callLogin(),
                          (e.page = 1),
                          e.loadGoods());
                      }
                    );
                },
                menuItemClick: function (a) {
                  var t = a.currentTarget.dataset.item;
                  console.log("click  --\x3e>", t),
                    console.log("area", this.data.selectArea),
                    t &&
                      this.data.selectArea &&
                      wx.navigateTo({
                        url:
                          "/pages/home/group/group-shop/group-shop-list/group-shop-list?catId=" +
                          t.id +
                          "&areaId=" +
                          this.data.selectArea.id,
                      });
                },
                loadGoods: function () {
                  var a = this;
                  this.data.selectArea &&
                    ((this.data.noMore = !1),
                    this.requestWithLoading(
                      "group/groupHomeGoods",
                      {
                        areaId: this.data.selectArea
                          ? this.data.selectArea.id
                          : null,
                        page: this.page,
                      },
                      function (t) {
                        if (t) {
                          if (
                            (t.total == t.to || 0 == t.total
                              ? e.setData({ noMore: !0 })
                              : e.setData({ noMore: !1 }),
                            t.data)
                          )
                            for (var o in t.data)
                              if (
                                ((t.data[o].price = parseFloat(
                                  t.data[o].price
                                )),
                                (t.data[o].activity_price = parseFloat(
                                  t.data[o].activity_price
                                )),
                                a.data.locationData && t.data[o].shop.lat)
                              ) {
                                var i = e.location.getDistance(
                                  a.data.locationData.location.lat,
                                  a.data.locationData.location.lng,
                                  t.data[o].shop.lat,
                                  t.data[o].shop.lng
                                );
                                console.log("ok --\x3e", i),
                                  i &&
                                    ((i =
                                      i < 1e3
                                        ? parseInt(i) + "m"
                                        : parseFloat(i / 1e3).toFixed(2) +
                                          "Km"),
                                    (t.data[o].distance = i));
                              } else
                                console.log("what"), (t.data[o].distance = -1);
                          if (1 == e.page) e.setData({ goodsData: t });
                          else {
                            var s = e.data.goodsData.data.concat(t.data);
                            (t.data = s), e.setData({ goodsData: t });
                          }
                          e.page++;
                        }
                      },
                      function (a) {},
                      function (a) {}
                    ));
                },
                onShow: function () {},
                refresh: function () {
                  this.loadData();
                },
                loadMore: function () {
                  console.log("orderMore --\x3e>", this.data.noMore),
                    this.data.noMore || this.loadGoods();
                },
                onReady: function () {},
              },
              "onShow",
              function () {}
            ),
            "onHide",
            function () {}
          ),
          "onUnload",
          function () {}
        ),
        "onPullDownRefresh",
        function () {
          this.initLocation();
        }
      ),
      "onReachBottom",
      function () {}
    ),
    "onShareAppMessage",
    function () {}
  )
);
