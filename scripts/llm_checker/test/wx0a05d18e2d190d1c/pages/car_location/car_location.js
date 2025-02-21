(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/car_location/car_location"],
  {
    4219: function (t, e, a) {
      a.r(e);
      var n = a("f9fa"),
        o = a("9752");
      for (var i in o)
        "default" !== i &&
          (function (t) {
            a.d(e, t, function () {
              return o[t];
            });
          })(i);
      a("c8a4");
      var r = a("f0c5"),
        c = Object(r.a)(
          o.default,
          n.b,
          n.c,
          !1,
          null,
          null,
          null,
          !1,
          n.a,
          void 0
        );
      e.default = c.exports;
    },
    "84b6": function (t, e, a) {},
    9752: function (t, e, a) {
      a.r(e);
      var n = a("b52c"),
        o = a.n(n);
      for (var i in n)
        "default" !== i &&
          (function (t) {
            a.d(e, t, function () {
              return n[t];
            });
          })(i);
      e.default = o.a;
    },
    b52c: function (t, e, a) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n,
          o,
          i = (function (t) {
            return t && t.__esModule ? t : { default: t };
          })(a("ccdc")),
          r = a("2e80"),
          c = {
            data: function () {
              return {
                carId: "",
                maxWidth: "",
                maxHeight: "",
                centerLat: "",
                centerLng: "",
                marker: new Array(2),
                plateNumber: "车牌号码",
                userLat: "",
                userLng: "",
                mapKey: "ZDKBZ-SAW3X-QOK4D-72N64-D766J-A6FQX",
                address: "",
                resultList: "",
                is_ready: !1,
                mapCtx: "",
                is_outof_service: !0,
                map_loaded: !1,
              };
            },
            onLoad: function (e) {
              var a = this,
                o = t.getSystemInfoSync();
              (a.maxWidth = o.windowWidth),
                (a.maxHeight = o.windowHeight),
                (n = new r({ key: a.mapKey })),
                t.setNavigationBarTitle({ title: "位置" });
            },
            onReady: function () {
              (o = this), (this.is_ready = !0);
            },
            onShow: function () {
              console.log("locator: onshow..."),
                this.map_loaded && this.get_car_gps_data();
            },
            onHide: function () {
              this.$api51.api51_car_stop_gps_data();
            },
            methods: {
              get_car_gps_data: function () {
                this.$api51.api51_user_islogin() ||
                  (this.is_outof_service = !0),
                  (o.is_outof_service = this.$api51.api51_car_is_outservice(
                    !1
                  )),
                  this.$api51.api51_car_set_interval(1e4),
                  console.log("locator: startCarData..."),
                  this.$api51.api51_car_start_gps_data(
                    function (t, e) {
                      o.showData(t);
                    },
                    function (t, e) {}
                  );
              },
              map_updated: function () {
                (this.map_loaded = !0),
                  console.log("地图加载完成"),
                  this.get_car_gps_data();
              },
              click_navigate: function () {
                t.openLocation({
                  address: this.address,
                  latitude: this.marker[0].latitude,
                  longitude: this.marker[0].longitude,
                  name: o.resultList.plateNo + " 车辆位置",
                  complete: function (t) {
                    console.log("click_navigate...res:" + JSON.stringify(t));
                  },
                });
              },
              click_car_center: function () {
                var t = this.marker[0].latitude + 1e-6;
                this.centerLat =
                  t == this.centerLat ? this.marker[0].latitude : t;
              },
              showNoGpsData: function () {
                (o.marker = []),
                  (o.address = ""),
                  (o.resultList = ""),
                  t.getLocation({
                    type: "gcj02",
                    success: function (t) {
                      (o.centerLat = t.latitude), (o.centerLng = t.longitude);
                    },
                  });
              },
              showData: function (e) {
                void 0 != e && void 0 != e[0].lat && "" != e[0].lat
                  ? (console.log("showData:" + JSON.stringify(e)),
                    n.reverseGeocoder({
                      location: { latitude: e[0].lat, longitude: e[0].lng },
                      coord_type: 1,
                      success: function (a) {
                        if (
                          (console.log("reverseGeocoder...."), 0 == a.status)
                        ) {
                          a.result.ad_info.location;
                          var n = a.result.formatted_addresses.recommend,
                            r = i.default.wgs2gcj(1 * e[0].lat, 1 * e[0].lng),
                            c = {
                              id: 1,
                              latitude: r.lat,
                              longitude: r.lng,
                              rotate: Number(e[0].direct),
                              iconPath: e[0].isOnline
                                ? "/static/images/car_locate_true.png"
                                : "/static/images/car_locate_false.png",
                            };
                          if (!o.is_outof_service) {
                            var s = o.marker;
                            (s[0] = c), (o.marker = s);
                          }
                          (o.resultList = e[0]),
                            (o.centerLat = r.lat),
                            (o.centerLng = r.lng),
                            (o.address = n);
                        } else
                          t.showToast({
                            title: "转换地址失败: " + a.status,
                            icon: "none",
                          });
                      },
                      fail: function (e) {
                        console.log(e.message),
                          t.showToast({
                            title: "转换地址失败了",
                            icon: "none",
                          });
                      },
                    }),
                    t.hideNavigationBarLoading(),
                    t.stopPullDownRefresh())
                  : o.showNoGpsData();
              },
              onClickCarRailFun: function () {
                console.log("点击围栏"),
                  t.navigateTo({ url: "../car_rail/car_rail" });
              },
              onClickCarDriveRecordFun: function () {
                console.log("点击行车记录"),
                  t.navigateTo({ url: "../drive_record/drive_record" });
              },
            },
          };
        e.default = c;
      }).call(this, a("543d").default);
    },
    c8a4: function (t, e, a) {
      var n = a("84b6");
      a.n(n).a;
    },
    d58d: function (t, e, a) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        a("f567"), e(a("66fd")), t(e(a("4219")).default);
      }).call(this, a("543d").createPage);
    },
    f9fa: function (t, e, a) {
      a.d(e, "b", function () {
        return n;
      }),
        a.d(e, "c", function () {
          return o;
        }),
        a.d(e, "a", function () {});
      var n = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        o = [];
    },
  },
  [["d58d", "common/runtime", "common/vendor"]],
]);
