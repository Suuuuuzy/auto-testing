(global.webpackJsonp = global.webpackJsonp || []).push([
  ["node-modules/uview-ui/components/u-switch/u-switch"],
  {
    2565: function (t, e, n) {
      n.r(e);
      var i = n("c346"),
        o = n("c5cd");
      for (var u in o)
        ["default"].indexOf(u) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(u);
      n("5453");
      var a = n("f0c5"),
        c = Object(a.a)(
          o.default,
          i.b,
          i.c,
          !1,
          null,
          "9dd297ca",
          null,
          !1,
          i.a,
          void 0
        );
      e.default = c.exports;
    },
    5453: function (t, e, n) {
      var i = n("f4f6");
      n.n(i).a;
    },
    ba87: function (t, e, n) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = {
          name: "u-switch",
          props: {
            loading: { type: Boolean, default: !1 },
            disabled: { type: Boolean, default: !1 },
            size: { type: [Number, String], default: 50 },
            activeColor: { type: String, default: "#2979ff" },
            inactiveColor: { type: String, default: "#ffffff" },
            value: { type: Boolean, default: !1 },
            vibrateShort: { type: Boolean, default: !1 },
            activeValue: { type: [Number, String, Boolean], default: !0 },
            inactiveValue: { type: [Number, String, Boolean], default: !1 },
          },
          data: function () {
            return {};
          },
          computed: {
            switchStyle: function () {
              var t = {};
              return (
                (t.fontSize = this.size + "rpx"),
                (t.backgroundColor = this.value
                  ? this.activeColor
                  : this.inactiveColor),
                t
              );
            },
            loadingColor: function () {
              return this.value ? this.activeColor : null;
            },
          },
          methods: {
            onClick: function () {
              var e = this;
              this.disabled ||
                this.loading ||
                (this.vibrateShort && t.vibrateShort(),
                this.$emit("input", !this.value),
                this.$nextTick(function () {
                  e.$emit("change", e.value ? e.activeValue : e.inactiveValue);
                }));
            },
          },
        };
        e.default = n;
      }).call(this, n("543d").default);
    },
    c346: function (t, e, n) {
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "c", function () {
          return u;
        }),
        n.d(e, "a", function () {
          return i;
        });
      var i = {
          uLoading: function () {
            return n
              .e("node-modules/uview-ui/components/u-loading/u-loading")
              .then(n.bind(null, "324c"));
          },
        },
        o = function () {
          this.$createElement;
          var t = (this._self._c, this.__get_style([this.switchStyle])),
            e = this.$u.addUnit(this.size),
            n = this.$u.addUnit(this.size);
          this.$mp.data = Object.assign({}, { $root: { s0: t, g0: e, g1: n } });
        },
        u = [];
    },
    c5cd: function (t, e, n) {
      n.r(e);
      var i = n("ba87"),
        o = n.n(i);
      for (var u in i)
        ["default"].indexOf(u) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(u);
      e.default = o.a;
    },
    f4f6: function (t, e, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "node-modules/uview-ui/components/u-switch/u-switch-create-component",
    {
      "node-modules/uview-ui/components/u-switch/u-switch-create-component":
        function (t, e, n) {
          n("543d").createComponent(n("2565"));
        },
    },
    [["node-modules/uview-ui/components/u-switch/u-switch-create-component"]],
  ]);
