(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/wheel_path/wheel_path"],
  {
    "3b1b": function (n, t, e) {
      (function (n) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          o,
          r = (function (n) {
            return n && n.__esModule ? n : { default: n };
          })(e("ccdc")),
          i = e("2e80"),
          l = {
            data: function () {
              return {
                maxWidth: "",
                maxHeight: "",
                centerLat: "",
                centerLng: "",
                marker: [],
                carMarker: void 0,
                mapKey: "ZDKBZ-SAW3X-QOK4D-72N64-D766J-A6FQX",
                polyline: void 0,
                carId: "",
                record: "",
                scale: 15,
                points: [],
                endMarker: void 0,
                playIndex: 0,
                maxValue: 0,
                isPlaying: !1,
              };
            },
            components: {
              cuProgress: function () {
                e.e("components/cu-progress/cu-progress")
                  .then(
                    function () {
                      return resolve(e("889a"));
                    }.bind(null, e)
                  )
                  .catch(e.oe);
              },
            },
            props: {},
            onLoad: function (t) {
              (a = this),
                n.getSystemInfo({
                  success: function (n) {
                    (a.maxWidth = n.windowWidth),
                      (a.maxHeight = n.windowHeight - 50);
                  },
                }),
                new i({ key: a.mapKey });
              var e = a.$api51.api51_user_get_currentcar();
              (a.carId = e.carId),
                (a.centerLat = t.lat),
                (a.centerLng = t.lng),
                (a.record = this._pData),
                n.setNavigationBarTitle({ title: "车辆轨迹" });
            },
            onUnload: function () {
              clearInterval(o);
            },
            onReady: function () {
              a.mapCtx = n.createMapContext("myMap");
            },
            onShow: function () {
              a.getPoints();
            },
            methods: {
              getPoints: function () {
                var n = a.$api51.api51_user_get_currentcar();
                a.$api51.api51_gps_track_list(
                  n.carId,
                  a.record.beginTime,
                  a.record.endTime,
                  function (n, t) {
                    a.hand_sucess(n);
                  },
                  function (n, t) {
                    a.hand_failed();
                  }
                );
              },
              hand_sucess: function (t) {
                if ((console.log(t), 0 != t.length)) {
                  (a.points = []), (a.polyline = []), (a.playIndex = 0);
                  for (var e = 0; e < t.length; e++) {
                    var o = t[e],
                      r = a.gcj_encryptFun(
                        parseFloat(o.lat),
                        parseFloat(o.lng),
                        a
                      );
                    a.points.push({
                      latitude: r.lat,
                      longitude: r.lon,
                      rotate: o.direct,
                    });
                  }
                  (a.maxValue = a.points.length - 1), console.log("starttemp");
                  var i = t[0];
                  console.log("starttemp" + i);
                  var l = a.gcj_encryptFun(
                    parseFloat(i.lat),
                    parseFloat(i.lng),
                    a
                  );
                  console.log("startdoc" + l.lat);
                  var c = {
                      id: 0,
                      latitude: l.lat,
                      longitude: l.lon,
                      width: 27,
                      height: 42,
                      iconPath: "../../static/images/icon_route_start.png",
                    },
                    s = t[0];
                  console.log("endtemp" + s.lat + "---" + s.lng);
                  var u = a.gcj_encryptFun(
                    parseFloat(s.lat),
                    parseFloat(s.lng),
                    a
                  );
                  console.log("enddoc" + u.lat + "---" + u.lon),
                    (a.endMarker = {
                      id: t.length,
                      latitude: u.lat,
                      longitude: u.lon,
                      width: 27,
                      height: 42,
                      anchor: { x: 0.5, y: 0.5 },
                      iconPath: "../../static/images/car_locate_true.png",
                    }),
                    a.marker.length > 0 && a.marker.splice(0, a.marker.length),
                    a.marker.push(c),
                    a.marker.push(a.endMarker),
                    console.log("marker" + a.marker),
                    console.log("startmarker" + c),
                    console.log("endmarker" + a.endMarker),
                    (a.centerLat = a.endMarker.latitude),
                    (a.centerLng = a.endMarker.longitude),
                    n.hideNavigationBarLoading(),
                    n.stopPullDownRefresh();
                }
              },
              hand_failed: function () {
                n.showToast({ title: "加载失败", icon: "none" }),
                  n.hideNavigationBarLoading(),
                  n.stopPullDownRefresh();
              },
              clickPlay: function () {
                (a.isPlaying = !a.isPlaying),
                  a.isPlaying ? a.playRouteFun() : a.stopPlayRoute();
              },
              playRouteFun: function () {
                o = setInterval(function () {
                  if (a.playIndex >= a.points.length - 1)
                    return clearInterval(o), void (a.isPlaying = !1);
                  a.playIndex++;
                  var n = a.points.slice(a.playIndex - 1, a.playIndex + 1);
                  console.log("playPoints" + n + "====" + n.length);
                  var t = [
                      {
                        points: n,
                        color: "#FF0000DD",
                        width: 6,
                        arrowLine: !0,
                      },
                    ],
                    e = a.points[a.playIndex];
                  (a.endMarker = {
                    id: a.points.length,
                    latitude: e.latitude,
                    longitude: e.longitude,
                    width: 27,
                    height: 42,
                    rotate: Number(e.rotate),
                    anchor: { x: 0.5, y: 0.5 },
                    iconPath: "../../static/images/car_locate_true.png",
                  }),
                    a.polyline.push.apply(a.polyline, t),
                    a.marker.splice(1, 1, a.endMarker),
                    console.log("计时器:....:" + a.playIndex);
                }, 1e3);
              },
              stopPlayRoute: function () {
                clearInterval(o);
              },
              sliderChange: function (n) {
                a.playRouteFun(), (this.isPlaying = !0);
              },
              sliderChanging: function (n) {
                clearInterval(o),
                  (a.isPlaying = !1),
                  (a.polyline = []),
                  console.log("value 发生变化：" + n.value),
                  (a.playIndex = n.value);
                var t = [
                    {
                      points: a.points.slice(0, a.playIndex + 1),
                      color: "#FF0000DD",
                      width: 6,
                      arrowLine: !0,
                    },
                  ],
                  e = a.points[a.playIndex];
                (a.endMarker = {
                  id: a.points.length,
                  latitude: e.latitude,
                  longitude: e.longitude,
                  width: 27,
                  height: 42,
                  rotate: Number(e.rotate),
                  anchor: { x: 0.5, y: 0.5 },
                  iconPath: "../../static/images/car_locate_true.png",
                }),
                  (a.polyline = t),
                  a.marker.splice(1, 1, a.endMarker);
              },
              setCenter: function (n) {
                var t, e, o, i;
                (t = o = n[0].latitude), (e = i = n[0].longitude);
                for (var l = 0; l < n.length; l++) {
                  var c = n[l].latitude,
                    s = n[l].longitude;
                  c > t ? (t = c) : c < o && (o = c),
                    s > e ? (e = s) : s < i && (i = s);
                }
                (a.centerLat = (t + o) / 2), (a.centerLng = (e + i) / 2);
                var u = r.default.distance(t, e, o, i);
                console.log("缩放级别:dis" + u);
                for (
                  var d = 14,
                    g = [
                      10, 20, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e3, 2e3, 25e3,
                      5e4, 1e5, 2e5, 5e5, 1e6, 2e6,
                    ],
                    p = 0;
                  p < g.length;
                  p++
                )
                  if (g[p] - u > 0) {
                    d = 18 - p + 4;
                    break;
                  }
                (a.scale = d), console.log("缩放级别:" + a.scale);
              },
              gcj_encryptFun: function (n, t) {
                if (a.outOfChina(n, t)) return { lat: n, lon: t };
                var e = a.delta(n, t);
                return { lat: n + e.lat, lon: t + e.lon };
              },
              outOfChina: function (n, t) {
                return t < 72.004 || t > 137.8347 || n < 0.8293 || n > 55.8271;
              },
              delta: function (n, t) {
                var e = 3.141592653589793,
                  o = 6378245,
                  r = 0.006693421622965943,
                  i = a.transformLat(t - 105, n - 35),
                  l = a.transformLon(t - 105, n - 35),
                  c = (n / 180) * e,
                  s = Math.sin(c);
                s = 1 - r * s * s;
                var u = Math.sqrt(s);
                return (
                  (i = (180 * i) / (((o * (1 - r)) / (s * u)) * e)),
                  (l = (180 * l) / ((o / u) * Math.cos(c) * e)),
                  { lat: i, lon: l }
                );
              },
              transformLat: function (n, t) {
                var e = 3.141592653589793,
                  a =
                    2 * n -
                    100 +
                    3 * t +
                    0.2 * t * t +
                    0.1 * n * t +
                    0.2 * Math.sqrt(Math.abs(n));
                return (
                  (a +=
                    (2 *
                      (20 * Math.sin(6 * n * e) + 20 * Math.sin(2 * n * e))) /
                    3),
                  (a +=
                    (2 * (20 * Math.sin(t * e) + 40 * Math.sin((t / 3) * e))) /
                    3),
                  (a +=
                    (2 *
                      (160 * Math.sin((t / 12) * e) +
                        320 * Math.sin((t * e) / 30))) /
                    3)
                );
              },
              transformLon: function (n, t) {
                var e = 3.141592653589793,
                  a =
                    300 +
                    n +
                    2 * t +
                    0.1 * n * n +
                    0.1 * n * t +
                    0.1 * Math.sqrt(Math.abs(n));
                return (
                  (a +=
                    (2 *
                      (20 * Math.sin(6 * n * e) + 20 * Math.sin(2 * n * e))) /
                    3),
                  (a +=
                    (2 * (20 * Math.sin(n * e) + 40 * Math.sin((n / 3) * e))) /
                    3),
                  (a +=
                    (2 *
                      (150 * Math.sin((n / 12) * e) +
                        300 * Math.sin((n / 30) * e))) /
                    3)
                );
              },
              setData: function (n, t) {
                var e,
                  o,
                  r = [];
                Object.keys(n).forEach(function (t) {
                  (r = t.split(".")),
                    (e = n[t]),
                    (o = a.$data),
                    r.forEach(function (n, t) {
                      t + 1 == r.length
                        ? a.$set(o, n, e)
                        : o[n] || a.$set(o, n, {}),
                        (o = o[n]);
                    });
                }),
                  t && t();
              },
            },
          };
        t.default = l;
      }).call(this, e("543d").default);
    },
    "586f": function (n, t, e) {
      e.r(t);
      var a = e("3b1b"),
        o = e.n(a);
      for (var r in a)
        "default" !== r &&
          (function (n) {
            e.d(t, n, function () {
              return a[n];
            });
          })(r);
      t.default = o.a;
    },
    "58b5": function (n, t, e) {
      (function (n) {
        function t(n) {
          return n && n.__esModule ? n : { default: n };
        }
        e("f567"), t(e("66fd")), n(t(e("5c77")).default);
      }).call(this, e("543d").createPage);
    },
    "5c77": function (n, t, e) {
      e.r(t);
      var a = e("8959"),
        o = e("586f");
      for (var r in o)
        "default" !== r &&
          (function (n) {
            e.d(t, n, function () {
              return o[n];
            });
          })(r);
      e("78fc");
      var i = e("f0c5"),
        l = Object(i.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          null,
          null,
          !1,
          a.a,
          void 0
        );
      t.default = l.exports;
    },
    "78fc": function (n, t, e) {
      var a = e("b2e1");
      e.n(a).a;
    },
    8959: function (n, t, e) {
      e.d(t, "b", function () {
        return o;
      }),
        e.d(t, "c", function () {
          return r;
        }),
        e.d(t, "a", function () {
          return a;
        });
      var a = {
          cuProgress: function () {
            return e
              .e("components/cu-progress/cu-progress")
              .then(e.bind(null, "889a"));
          },
        },
        o = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        r = [];
    },
    b2e1: function (n, t, e) {},
  },
  [["58b5", "common/runtime", "common/vendor"]],
]);
