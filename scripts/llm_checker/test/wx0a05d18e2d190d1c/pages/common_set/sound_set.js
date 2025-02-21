(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/common_set/sound_set"],
  {
    "078d": function (n, t, e) {
      e.d(t, "b", function () {
        return o;
      }),
        e.d(t, "c", function () {
          return u;
        }),
        e.d(t, "a", function () {});
      var o = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        u = [];
    },
    2964: function (n, t, e) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = {
        data: function () {
          return { sound_ctrl: !1, sound_push: !1 };
        },
        onReady: function () {
          this.sound_ctrl = "1" == this.$api51.voice_can_play_sound();
        },
        methods: {
          change_set: function (n) {
            (this.sound_ctrl = n.detail.value),
              console.log("change:" + this.sound_ctrl),
              this.$api51.voice_set_can_play(this.sound_ctrl ? "1" : "0");
          },
        },
      };
      t.default = o;
    },
    "657a": function (n, t, e) {
      e.r(t);
      var o = e("2964"),
        u = e.n(o);
      for (var a in o)
        "default" !== a &&
          (function (n) {
            e.d(t, n, function () {
              return o[n];
            });
          })(a);
      t.default = u.a;
    },
    d8d6: function (n, t, e) {
      (function (n) {
        function t(n) {
          return n && n.__esModule ? n : { default: n };
        }
        e("f567"), t(e("66fd")), n(t(e("eebf")).default);
      }).call(this, e("543d").createPage);
    },
    eebf: function (n, t, e) {
      e.r(t);
      var o = e("078d"),
        u = e("657a");
      for (var a in u)
        "default" !== a &&
          (function (n) {
            e.d(t, n, function () {
              return u[n];
            });
          })(a);
      var c = e("f0c5"),
        d = Object(c.a)(
          u.default,
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
      t.default = d.exports;
    },
  },
  [["d8d6", "common/runtime", "common/vendor"]],
]);
