(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/cartAnimation/index"],
  {
    "3d94": function (t, e, n) {},
    "49f7": function (t, e, n) {
      "use strict";
      var i = n("3d94");
      n.n(i).a;
    },
    "88a7": function (t, e, n) {
      "use strict";
      var i = n("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var o = i(n("2309")),
        s = n("ca00"),
        a = {
          name: "cartAnimation",
          data: function () {
            return {
              themeColor: "",
              hide_good_box: !0,
              bus_x: 0,
              bus_y: 0,
              linePosArr: [],
              iTime: null,
            };
          },
          created: function (t) {
            (this.busPos = {}),
              (this.busPos.x = 30),
              (this.busPos.y = (0, s.getSystemInfoSync)().windowWidth + 100);
          },
          methods: {
            touchOnGoods: function (t, e) {
              if ((new Date().getTime() - this.iTime) / 1e3 > 0.5) {
                e && (this.busPos = e);
                var n = {
                    finger: {},
                    flag: !1,
                    hide_good_box: !1,
                    linePos: {},
                    bus_x: 0,
                    bus_y: 0,
                    timer: "",
                  },
                  i = {};
                (n.finger.x = t.x),
                  (n.finger.y = t.y),
                  n.finger.y < this.busPos.y
                    ? (i.y = n.finger.y - 150)
                    : (i.y = this.busPos.y - 150),
                  (i.x = Math.abs(n.finger.x - this.busPos.x) / 2),
                  n.finger.x > this.busPos.x
                    ? ((i.x = (n.finger.x - this.busPos.x) / 2 + this.busPos.x),
                      (n.linePos = this.bezier([this.busPos, i, n.finger], 30)),
                      (n.flag = !1))
                    : ((i.x = (this.busPos.x - n.finger.x) / 2 + n.finger.x),
                      (n.linePos = this.bezier([n.finger, i, this.busPos], 30)),
                      (n.flag = !0)),
                  this.linePosArr.push(n),
                  this.startAnimation(n, this.linePosArr.length - 1);
              }
            },
            startAnimation: function (t, e) {
              this.iTime = new Date().getTime();
              var n = this,
                i = t.linePos.bezier_points,
                o = i.length;
              (t.hide_good_box = !1),
                (t.bus_x = t.finger.x),
                (t.bus_y = t.finger.y),
                t.flag
                  ? ((o = 0),
                    (t.timer = setInterval(function () {
                      o++,
                        (t.bus_x = i[o].x),
                        (t.bus_y = i[o].y),
                        o >= 28 &&
                          (clearInterval(t.timer),
                          (t.hide_good_box = !0),
                          n.linePosArr.splice(0, 1));
                    }, 22)))
                  : ((o = i.length),
                    (t.timer = setInterval(function () {
                      o--,
                        (t.bus_x = i[o].x),
                        (t.bus_y = i[o].y),
                        o <= 1 &&
                          (clearInterval(t.timer),
                          (t.hide_good_box = !0),
                          n.linePosArr.splice(0, 1));
                    }, 22)));
            },
            bezier: function (t, e) {
              for (
                var n = [],
                  i = [],
                  o = [],
                  s = Math.sqrt(
                    Math.pow(t[1].x - t[0].x, 2) + Math.pow(t[1].y - t[0].y, 2)
                  ),
                  a = s / e,
                  r =
                    Math.sqrt(
                      Math.pow(t[2].x - t[1].x, 2) +
                        Math.pow(t[2].y - t[1].y, 2)
                    ) / e,
                  u = (t[1].y - t[0].y) / (t[1].x - t[0].x),
                  c = (t[2].y - t[1].y) / (t[2].x - t[1].x),
                  h = Math.atan(u),
                  f = Math.atan(c),
                  x = 1;
                x <= e;
                x++
              ) {
                var l = a * x,
                  b = r * x,
                  d = {};
                (d.x = l * Math.cos(h) + t[0].x),
                  (d.y = l * Math.sin(h) + t[0].y),
                  i.push(d);
                var y = {};
                (y.x = b * Math.cos(f) + t[1].x),
                  (y.y = b * Math.sin(f) + t[1].y),
                  o.push(y);
                var g = (y.y - d.y) / (y.x - d.x),
                  p = Math.atan(g),
                  m =
                    (l / s) *
                    Math.sqrt(Math.pow(y.x - d.x, 2) + Math.pow(y.y - d.y, 2)),
                  _ = {};
                (_.x = m * Math.cos(p) + d.x),
                  (_.y = m * Math.sin(p) + d.y),
                  n.push(_);
              }
              return { bezier_points: n };
            },
          },
          mounted: function () {
            this.themeColor = o.default.getDecorate("SYSTEM").themeColor;
          },
        };
      e.default = a;
    },
    "9a21": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return i;
      }),
        n.d(e, "c", function () {
          return o;
        }),
        n.d(e, "a", function () {});
      var i = function () {
          this.$createElement, this._self._c;
        },
        o = [];
    },
    a9ca: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("9a21"),
        o = n("dcc2");
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(s);
      n("49f7");
      var a = n("f0c5"),
        r = Object(a.a)(
          o.default,
          i.b,
          i.c,
          !1,
          null,
          "0636178d",
          null,
          !1,
          i.a,
          void 0
        );
      e.default = r.exports;
    },
    dcc2: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("88a7"),
        o = n.n(i);
      for (var s in i)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(s);
      e.default = o.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/cartAnimation/index-create-component",
    {
      "baseComponents/cartAnimation/index-create-component": function (
        t,
        e,
        n
      ) {
        n("543d").createComponent(n("a9ca"));
      },
    },
    [["baseComponents/cartAnimation/index-create-component"]],
  ]);
