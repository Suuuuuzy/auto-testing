(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/car_rail/car_rail"],
  {
    "02eb": function (n, e, t) {
      t.r(e);
      var o = t("dc09"),
        i = t.n(o);
      for (var a in o)
        "default" !== a &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      e.default = i.a;
    },
    "8b3d": function (n, e, t) {
      (function (n) {
        function e(n) {
          return n && n.__esModule ? n : { default: n };
        }
        t("f567"), e(t("66fd")), n(e(t("c245")).default);
      }).call(this, t("543d").createPage);
    },
    b228: function (n, e, t) {},
    c245: function (n, e, t) {
      t.r(e);
      var o = t("d37c"),
        i = t("02eb");
      for (var a in i)
        "default" !== a &&
          (function (n) {
            t.d(e, n, function () {
              return i[n];
            });
          })(a);
      t("ec34");
      var c = t("f0c5"),
        l = Object(c.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      e.default = l.exports;
    },
    d37c: function (n, e, t) {
      t.d(e, "b", function () {
        return i;
      }),
        t.d(e, "c", function () {
          return a;
        }),
        t.d(e, "a", function () {
          return o;
        });
      var o = {
          uniPopup: function () {
            return Promise.all([
              t.e("common/vendor"),
              t.e("components/uni-popup/uni-popup"),
            ]).then(t.bind(null, "cb66"));
          },
        },
        i = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        a = [];
    },
    dc09: function (n, e, t) {
      (function (n) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o,
          i = (function (n) {
            return n && n.__esModule ? n : { default: n };
          })(t("ccdc")),
          a = t("2e80"),
          c = {
            components: {
              uniPopup: function () {
                Promise.all([
                  t.e("common/vendor"),
                  t.e("components/uni-popup/uni-popup"),
                ])
                  .then(
                    function () {
                      return resolve(t("cb66"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
            },
            data: function () {
              return {
                type: "",
                centerLat: "",
                centerLng: "",
                maxWidth: "",
                maxHeight: "",
                mapKey: "ZDKBZ-SAW3X-QOK4D-72N64-D766J-A6FQX",
                circles: new Array(),
                markers: [],
                hasLocation: !1,
                newLat: 0,
                newLng: 0,
                newRadius: 0,
                deleteMarkerId: "",
                showInputRadius: !1,
              };
            },
            onLoad: function (e) {
              (o = this),
                n.getSystemInfo({
                  success: function (n) {
                    (o.maxWidth = n.windowWidth),
                      (o.maxHeight = n.windowHeight);
                  },
                }),
                new a({ key: o.mapKey }),
                n.setNavigationBarTitle({ title: "围栏" }),
                o.loadAllRailsFun();
            },
            onReady: function () {
              this.mapCtx = n.createMapContext("myMap");
            },
            onShow: function () {
              n.getLocation({
                type: "gcj02",
                success: function (n) {
                  (o.centerLat = n.latitude), (o.centerLng = n.longitude);
                },
              });
            },
            methods: {
              loadAllRailsFun: function () {
                console.log("加载围栏");
                var e = this.$api51.api51_user_get_currentcar();
                this.$api51.api51_rail_list(
                  e.carId,
                  function (n, e) {
                    new Array(),
                      new Array(),
                      o.circles.length > 0 &&
                        o.circles.splice(0, o.circles.length),
                      o.markers.length > 0 &&
                        o.markers.splice(0, o.markers.length);
                    for (var t = 0; t < n.length; t++) {
                      console.log(t);
                      var a = n[t],
                        c = i.default.wgs2gcj(1 * a.lat, 1 * a.lng);
                      console.log(a);
                      var l = {
                        id: a.fenceId,
                        latitude: c.lat,
                        longitude: c.lng,
                        iconPath: "../../static/images/car_rail_mark.png",
                      };
                      console.log(l);
                      var u = {
                        latitude: c.lat,
                        longitude: c.lng,
                        radius: parseInt(a.radius),
                        color: "#0693FFAA",
                        fillColor: "#BEDBF9AA",
                      };
                      o.circles.push(u), o.markers.push(l);
                    }
                  },
                  function (e, t) {
                    n.showToast({ title: t + e, icon: "none" }),
                      void 0 != failed && failed(e, t);
                  }
                );
              },
              markerTapFun: function (e) {
                console.log("点击标注" + e),
                  (o.deleteMarkerId = e.markerId),
                  n.showModal({
                    title: "提示",
                    content: "确定删除该围栏？",
                    success: function (e) {
                      e.confirm
                        ? (console.log("用户点击确定"),
                          o.$api51.api51_rail_delete(
                            o.deleteMarkerId,
                            function (e, t) {
                              n.showToast({ title: t, icon: "success" }),
                                o.loadAllRailsFun();
                            },
                            function (e, t) {
                              n.showToast({ title: t + ":" + e, icon: "none" });
                            }
                          ))
                        : e.cancel && console.log("用户点击取消");
                    },
                  });
              },
              chooseCarRailFun: function () {
                n.showModal({
                  title: "电子围栏",
                  content:
                    "请先选择放置围栏的位置点,再设置围栏半径,车辆超出该范围将提醒您。",
                  success: function (e) {
                    e.confirm
                      ? (console.log("用户点击确定"),
                        n.chooseLocation({
                          success: function (n) {
                            console.log(n),
                              (o.newLat = n.latitude),
                              (o.newLng = n.longitude),
                              o.$refs.showinput.open(),
                              (o.maxHeight = o.maxHeight - 200);
                          },
                          fail: function (n) {
                            console.log(n);
                          },
                        }))
                      : e.cancel && console.log("用户点击取消");
                  },
                });
              },
              input_fence_radiueFun: function (n) {
                console.log(n.detail.value), (this.newRadius = n.detail.value);
              },
              cancelInputRadius: function () {
                o.$refs.showinput.close(), (o.maxHeight = o.maxHeight + 200);
              },
              sureInputRadius: function () {
                o.$refs.showinput.close(), (o.maxHeight = o.maxHeight + 200);
                var e = i.default.gcj2wgs(1 * this.newLat, 1 * this.newLng),
                  t = this.$api51.api51_user_get_currentcar();
                this.$api51.api51_rail_add(
                  t.carId,
                  e.lng,
                  e.lat,
                  this.newRadius,
                  function (e, t) {
                    n.showToast({ title: t, icon: "success" }),
                      o.loadAllRailsFun();
                  },
                  function (e, t) {
                    n.showToast({ title: t + ":" + e, icon: "none" });
                  }
                );
              },
            },
          };
        e.default = c;
      }).call(this, t("543d").default);
    },
    ec34: function (n, e, t) {
      var o = t("b228");
      t.n(o).a;
    },
  },
  [["8b3d", "common/runtime", "common/vendor"]],
]);
