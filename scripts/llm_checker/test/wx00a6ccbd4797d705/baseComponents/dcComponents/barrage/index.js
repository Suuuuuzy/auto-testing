(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dcComponents/barrage/index"],
  {
    "0c629": function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("7049"),
        r = n.n(a);
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(i);
      t.default = r.a;
    },
    "1f01d": function (e, t, n) {
      "use strict";
      var a = n("ecae");
      n.n(a).a;
    },
    7049: function (e, t, n) {
      "use strict";
      var a = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var r = a(n("2309")),
        i = n("ca00"),
        o = !0,
        s = null,
        u = 8e3,
        f = [],
        c = {
          name: "barrage",
          data: function () {
            return {
              barrageLst: { 1: [], 2: [] },
              w: (0, i.getSystemInfoSync)().windowWidth,
              speed: 1,
              showHeadFlag: !1,
            };
          },
          props: {
            top: { type: [Number, String], default: 50 },
            page: { type: [String], default: "" },
          },
          mounted: function () {
            var e = r.default.getDecorate("DC");
            (this.showHeadFlag = e.decorationData.cartPage.showHeadFlag),
              this.showHeadFlag &&
                ((this.speed = this.getBarrageSpeed()),
                r.default
                  .getEvt("DC")
                  .off("dishMessage.addBarrage" + this.page, this.add),
                r.default
                  .getEvt("DC")
                  .on("dishMessage.addBarrage" + this.page, this.add),
                r.default.setPageOnUnload({
                  offdishMessageChange: function () {
                    r.default
                      .getEvt("DC")
                      .off("dishMessage.addBarrage" + this.page, this.add);
                  },
                }));
          },
          destroyed: function () {
            this.cleanArr("immediate");
          },
          methods: {
            add: function (e, t) {
              var n = getCurrentPages();
              if (n.length) {
                var a = n[n.length - 1];
                if (
                  (a = a ? a.route : "") &&
                  this.page &&
                  -1 == a.indexOf(this.page)
                )
                  return !1;
              }
              this.play(t);
            },
            fixed: function (e) {
              return +e.toFixed(2);
            },
            cleanArr: function (e) {
              var t = this;
              clearTimeout(s),
                "stop" != e &&
                  ((s = setTimeout(
                    function () {
                      for (var e in t.barrageLst) t.barrageLst[e].length = 0;
                    },
                    "immediate" == e ? 1 : u
                  )),
                  (f.length = 0));
            },
            play: function (e) {
              var t = this;
              if (!e.itemId) return s || this.cleanArr(), !1;
              (e.key = "barrage#" + new Date().getTime()),
                this.cleanArr("stop");
              var n = o ? 1 : 2,
                a = this.barrageLst[n],
                r = function (e) {
                  (e.finish = !1),
                    (e.time = new Date().getTime()),
                    a.push(e),
                    (o = !o);
                  var r = a.length - 1,
                    i = function () {
                      (f && f.length) || t.cleanArr();
                    };
                  setTimeout(function () {
                    t.$scope.animate(
                      "#barrage-" + n + "-" + r,
                      [
                        { translateX: t.getBarrageSize(e) },
                        { translateX: -t.w - 200 },
                      ],
                      u,
                      i
                    );
                  }, 1);
                },
                i = null,
                c = {};
              !(function n() {
                if (a.length - 1 < 0 || a[a.length - 1].finish)
                  f && f.length ? (r(f[0]), f.shift()) : r(e);
                else {
                  var o = a.length - 1,
                    s = a[o],
                    u = new Date().getTime();
                  if (!s.time) for (; s.time; ) s = a[(o -= 1)];
                  (u - s.time) * t.speed < t.getBarrageSize(s)
                    ? c[e.key] || ((c[e.key] = !0), f.push(e))
                    : f && f.length
                    ? (r(f[0]), f.shift())
                    : r(e);
                }
                f &&
                  f.length &&
                  (clearTimeout(i),
                  (i = setTimeout(function () {
                    n();
                  }, 20)));
              })();
            },
            getBarrageSpeed: function () {
              return (this.w + 200 + 100) / u;
            },
            getBarrageSize: function (e) {
              var t = function (e) {
                  return 7 * e + 1;
                },
                n = function (e) {
                  if (!e) return 0;
                  for (var n = 0, a = e.length, r = -1, i = 0; i < a; i++)
                    n += (r = e.charCodeAt(i)) >= 0 && r <= 128 ? 1 : 2;
                  return t(n);
                },
                a = e.nickName,
                r = e.itemName,
                o = e.num,
                s = n(a) + n(r) + n(o.toString()) + t(1) + 35 + 5;
              return (0, i.getScreenScale4Px)(s, 375);
            },
          },
        };
      t.default = c;
    },
    ecae: function (e, t, n) {},
    f40d: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("ff1f5"),
        r = n("0c629");
      for (var i in r)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(i);
      n("1f01d");
      var o = n("f0c5"),
        s = Object(o.a)(
          r.default,
          a.b,
          a.c,
          !1,
          null,
          "30338e2a",
          null,
          !1,
          a.a,
          void 0
        );
      t.default = s.exports;
    },
    ff1f5: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return a;
      }),
        n.d(t, "c", function () {
          return r;
        }),
        n.d(t, "a", function () {});
      var a = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.__map(e.barrageLst, function (t, n) {
                return {
                  $orig: e.__get_orig(t),
                  l0: e.__map(t, function (t, n) {
                    return { $orig: e.__get_orig(t), m0: e.fixed(t.num) };
                  }),
                };
              }));
          e.$mp.data = Object.assign({}, { $root: { l1: t } });
        },
        r = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dcComponents/barrage/index-create-component",
    {
      "baseComponents/dcComponents/barrage/index-create-component": function (
        e,
        t,
        n
      ) {
        n("543d").createComponent(n("f40d"));
      },
    },
    [["baseComponents/dcComponents/barrage/index-create-component"]],
  ]);
