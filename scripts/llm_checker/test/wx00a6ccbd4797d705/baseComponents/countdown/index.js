(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/countdown/index"],
  {
    5419: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return i;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {});
      var i = function () {
          var t = this;
          t.$createElement,
            t._self._c,
            "augmented" === t.$scope.data.scopedSlotsCompiler &&
              t.$setScopedSlotsParams("default", {
                time: t.time,
                remain: t.timeData.remain,
                day: t.timeData.day,
                hour: t.timeData.hour,
                minute: t.timeData.minute,
                second: t.timeData.second,
              });
        },
        a = [];
    },
    "989a": function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var i = {
        name: "countdown",
        props: {
          time: { type: Number, default: 0 },
          showzero: { type: Boolean, default: !1 },
        },
        data: function () {
          return {
            timer: null,
            timeData: { remain: 0, day: 0, hour: 0, minute: 0, second: 0 },
          };
        },
        methods: {
          format: function (t) {
            return 1 == String(t).length ? "0" + String(t) : t;
          },
          clickEvent: function () {
            this.$emit("click");
          },
          startTimer: function () {
            var t = this;
            this.updateTime(),
              (this.timer = setInterval(function () {
                t.updateTime();
              }, 1e3));
          },
          updateTime: function () {
            var t = this.timeData.remain;
            (this.timeData.day = this.showzero
              ? this.format(Math.floor(t / 1e3 / 60 / 60 / 24))
              : Math.floor(t / 1e3 / 60 / 60 / 24)),
              (this.timeData.hour = this.showzero
                ? this.format(Math.floor((t / 1e3 / 60 / 60) % 24))
                : Math.floor((t / 1e3 / 60 / 60) % 24)),
              (this.timeData.minute = this.showzero
                ? this.format(Math.floor((t / 1e3 / 60) % 60))
                : Math.floor((t / 1e3 / 60) % 60)),
              (this.timeData.second = this.showzero
                ? this.format(Math.floor((t / 1e3) % 60))
                : Math.floor((t / 1e3) % 60)),
              (this.timeData.remain -= 1e3),
              this.timeData.remain < 0 &&
                this.timer &&
                (this.clearTimer(), this.$emit("finish"));
          },
          clearTimer: function () {
            clearInterval(this.timer), (this.timer = null);
          },
          restart: function (t) {
            null != this.timer && clearInterval(this.timer),
              (this.timeData.remain = t),
              this.startTimer();
          },
        },
        mounted: function () {
          (this.timeData.remain = this.time), this.startTimer();
        },
      };
      e.default = i;
    },
    "9e90": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("5419"),
        a = n("ce89");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(o);
      var r = n("f0c5"),
        s = Object(r.a)(
          a.default,
          i.b,
          i.c,
          !1,
          null,
          null,
          null,
          !1,
          i.a,
          void 0
        );
      e.default = s.exports;
    },
    ce89: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("989a"),
        a = n.n(i);
      for (var o in i)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(o);
      e.default = a.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/countdown/index-create-component",
    {
      "baseComponents/countdown/index-create-component": function (t, e, n) {
        n("543d").createComponent(n("9e90"));
      },
    },
    [["baseComponents/countdown/index-create-component"]],
  ]);
