(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/countdown/index2"],
  {
    "28d7": function (t, e, n) {
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
    "86c9": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("eeec"),
        o = n.n(i);
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(a);
      e.default = o.a;
    },
    dc26: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("28d7"),
        o = n("86c9");
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(a);
      var r = n("f0c5"),
        u = Object(r.a)(
          o.default,
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
      e.default = u.exports;
    },
    eeec: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var i = {
        name: "countdown",
        props: {
          time: { type: Number, default: 0 },
          countdownType: { type: Number, default: 1 },
          showzero: { type: Boolean, default: !1 },
          boxStyle: { type: String, default: "" },
          dayStyle: { type: String, default: "" },
          hourStyle: { type: String, default: "" },
          minuteStyle: { type: String, default: "" },
          secondStyle: { type: String, default: "" },
          unitStyle: { type: String, default: "" },
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
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/countdown/index2-create-component",
    {
      "baseComponents/countdown/index2-create-component": function (t, e, n) {
        n("543d").createComponent(n("dc26"));
      },
    },
    [["baseComponents/countdown/index2-create-component"]],
  ]);
