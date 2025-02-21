Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = require("../../@babel/runtime/helpers/classCallCheck"),
  e = require("../../@babel/runtime/helpers/createClass"),
  n = o(require("../../service/http/request.js")),
  a = o(require("../../utils/tools.js")),
  i = o(require("../../service/lib/map/qqmap-wx-jssdk.min"));
function o(t) {
  return t && t.__esModule ? t : { default: t };
}
var l,
  s,
  c,
  r = getApp(),
  u = { lat: 0, lng: 0 },
  f = Symbol("area");
exports.default = (function () {
  return e(
    function e() {
      t(this, e),
        (l = new n.default()),
        (s = a.default),
        (this[f] = "m_area"),
        (c = new i.default({ key: "AM3BZ-7LAC6-QAIS6-EXVBO-N2EZT-IHBBT" }));
    },
    [
      {
        key: "location",
        value: function (t) {
          wx.getLocation({
            type: "gcj02",
            success: function (e) {
              var n = e.latitude,
                a = e.longitude;
              (u.lat = n),
                (u.lng = a),
                console.log("lcoation"),
                console.log(e),
                l._post(
                  "basic/getAMAPAddressByCoords",
                  { lat: n, lng: a },
                  function (e) {
                    var n = l._getData(e);
                    n
                      ? "function" == typeof t && t(n)
                      : "function" == typeof t && t(!1);
                  }
                );
            },
            fail: function (e) {
              console.log("locationfail --\x3e>"),
                console.log(e),
                "getLocation:fail auth deny" == e.errMsg
                  ? "function" == typeof t && t(-1)
                  : "function" == typeof t && t(!1);
            },
          });
        },
      },
      {
        key: "qqMapLocation",
        value: function (t) {
          c.reverseGeocoder({
            get_poi: 1,
            success: function (e) {
              return (
                console.log("result --\x3e>", e),
                e && 0 == e.status
                  ? (e.result.pois && e.result.pois.length,
                    "function" == typeof t ? t(e.result) : "")
                  : "function" == typeof t
                  ? t(!1)
                  : ""
              );
            },
            fail: function (e) {
              return (
                console.log("qqSdk location fail"),
                "function" == typeof t ? t(!1) : ""
              );
            },
          });
        },
      },
      {
        key: "getLocationInfo",
        value: function () {
          return u;
        },
      },
      {
        key: "setAreaItem",
        value: function (t) {
          wx.setStorageSync(this[f], t);
        },
      },
      {
        key: "getAreaItem",
        value: function () {
          return wx.getStorageSync(this[f]);
        },
      },
      {
        key: "initShopsDistance",
        value: function (t) {
          var e = r.globalData.location;
          if (e && t && t.length > 0)
            for (var n in t)
              if (t[n].lat > 0 && t[n].lng > 0) {
                var a = parseInt(
                    this.location().getDistance(
                      t[n].lat,
                      t[n].lng,
                      e.location.lat,
                      e.location.lng
                    )
                  ),
                  i = a;
                a &&
                  (a =
                    a < 1e3
                      ? parseInt(a) + "m"
                      : parseFloat(a / 1e3).toFixed(2) + "Km"),
                  (t[n].distance = a),
                  (t[n]._distance = i);
              } else (t[n].distance = -1), (t[n]._distance = 1e5);
          return t;
        },
      },
      {
        key: "initShopDistance",
        value: function (t, e) {
          if (e && t)
            if (t.lat > 0 && t.lng > 0) {
              var n = parseInt(
                  this.getDistance(t.lat, t.lng, e.location.lat, e.location.lng)
                ),
                a = n;
              n &&
                (n =
                  n < 1e3
                    ? parseInt(n) + "m"
                    : parseFloat(n / 1e3).toFixed(2) + "Km"),
                (t.distance = n),
                (t._distance = a);
            } else (t.distance = -1), (t._distance = 1e5);
          return t;
        },
      },
      {
        key: "_initShopDistance",
        value: function (t, e) {
          console.log("_initShopDistance");
          var n = -1;
          return (
            e &&
              t &&
              t.lat > 0 &&
              t.lng > 0 &&
              (n = parseInt(this.getDistance(t.lat, t.lng, e.lat, e.lng))),
            n
          );
        },
      },
      {
        key: "initGoodActivity",
        value: function (t) {
          return (
            t.activity_price > 0 &&
              t.activity_start_time &&
              t.activity_end_time &&
              ((t.time1 = s.getSecond(t.activity_start_time, null, !0)),
              (t.time2 = s.getSecond(t.activity_end_time, null, !0)),
              t.time1 < 0 &&
                t.time2 > 0 &&
                (t.time = s.formatSeconds(t.time2))),
            t
          );
        },
      },
      {
        key: "getDistance",
        value: function (t, e, n, a) {
          var i = (t * Math.PI) / 180,
            o = (n * Math.PI) / 180,
            l = i - o,
            s = (e * Math.PI) / 180 - (a * Math.PI) / 180,
            c =
              2 *
              Math.asin(
                Math.sqrt(
                  Math.pow(Math.sin(l / 2), 2) +
                    Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(s / 2), 2)
                )
              );
          return (c *= 6378.137), (c = Math.round(1e4 * c) / 10);
        },
      },
    ]
  );
})();
