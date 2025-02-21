Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = require("../../@babel/runtime/helpers/classCallCheck"),
  a = require("../../@babel/runtime/helpers/createClass");
exports.default = (function () {
  return a(
    function a() {
      t(this, a);
    },
    [
      {
        key: "bessel",
        value: function (t, a) {
          for (
            var e = [],
              r = [],
              s = [],
              h = Math.sqrt(
                Math.pow(t[1].x - t[0].x, 2) + Math.pow(t[1].y - t[0].y, 2)
              ),
              x = h / a,
              o =
                Math.sqrt(
                  Math.pow(t[2].x - t[1].x, 2) + Math.pow(t[2].y - t[1].y, 2)
                ) / a,
              y = (t[1].y - t[0].y) / (t[1].x - t[0].x),
              M = (t[2].y - t[1].y) / (t[2].x - t[1].x),
              n = Math.atan(y),
              u = Math.atan(M),
              i = 1;
            i <= a;
            i++
          ) {
            var p = x * i,
              l = o * i,
              c = {};
            (c.x = p * Math.cos(n) + t[0].x),
              (c.y = p * Math.sin(n) + t[0].y),
              r.push(c);
            var v = {};
            (v.x = l * Math.cos(u) + t[1].x),
              (v.y = l * Math.sin(u) + t[1].y),
              s.push(v);
            var b = (v.y - c.y) / (v.x - c.x),
              f = Math.atan(b),
              w =
                (p / h) *
                Math.sqrt(Math.pow(v.x - c.x, 2) + Math.pow(v.y - c.y, 2)),
              d = {};
            (d.x = w * Math.cos(f) + c.x),
              (d.y = w * Math.sin(f) + c.y),
              e.push(d);
          }
          return { bezier_points: e };
        },
      },
    ]
  );
})();
