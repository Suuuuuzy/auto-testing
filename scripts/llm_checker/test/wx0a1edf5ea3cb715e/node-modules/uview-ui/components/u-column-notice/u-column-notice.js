(global.webpackJsonp = global.webpackJsonp || []).push([
  ["node-modules/uview-ui/components/u-column-notice/u-column-notice"],
  {
    "27ed": function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = {
        props: {
          list: {
            type: Array,
            default: function () {
              return [];
            },
          },
          type: { type: String, default: "warning" },
          volumeIcon: { type: Boolean, default: !0 },
          moreIcon: { type: Boolean, default: !1 },
          closeIcon: { type: Boolean, default: !1 },
          autoplay: { type: Boolean, default: !0 },
          color: { type: String, default: "" },
          bgColor: { type: String, default: "" },
          direction: { type: String, default: "row" },
          show: { type: Boolean, default: !0 },
          fontSize: { type: [Number, String], default: 26 },
          duration: { type: [Number, String], default: 2e3 },
          volumeSize: { type: [Number, String], default: 34 },
          speed: { type: Number, default: 160 },
          isCircular: { type: Boolean, default: !0 },
          mode: { type: String, default: "horizontal" },
          playState: { type: String, default: "play" },
          disableTouch: { type: Boolean, default: !0 },
          padding: { type: [Number, String], default: "18rpx 24rpx" },
        },
        computed: {
          computeColor: function () {
            return this.color
              ? this.color
              : "none" == this.type
              ? "#606266"
              : this.type;
          },
          textStyle: function () {
            var e = {};
            return (
              this.color
                ? (e.color = this.color)
                : "none" == this.type && (e.color = "#606266"),
              (e.fontSize = this.fontSize + "rpx"),
              e
            );
          },
          vertical: function () {
            return "horizontal" != this.mode;
          },
          computeBgColor: function () {
            return this.bgColor
              ? this.bgColor
              : "none" == this.type
              ? "transparent"
              : void 0;
          },
        },
        data: function () {
          return {};
        },
        methods: {
          click: function (e) {
            this.$emit("click", e);
          },
          close: function () {
            this.$emit("close");
          },
          getMore: function () {
            this.$emit("getMore");
          },
          change: function (e) {
            e.detail.current == this.list.length - 1 && this.$emit("end");
          },
        },
      };
      t.default = o;
    },
    "75e7": function (e, t, n) {},
    "95fc": function (e, t, n) {
      n.r(t);
      var o = n("27ed"),
        u = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      t.default = u.a;
    },
    ab9c: function (e, t, n) {
      n.r(t);
      var o = n("e786"),
        u = n("95fc");
      for (var i in u)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return u[e];
            });
          })(i);
      n("cf7c");
      var c = n("f0c5"),
        l = Object(c.a)(
          u.default,
          o.b,
          o.c,
          !1,
          null,
          "b57a1b82",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = l.exports;
    },
    cf7c: function (e, t, n) {
      var o = n("75e7");
      n.n(o).a;
    },
    e786: function (e, t, n) {
      n.d(t, "b", function () {
        return u;
      }),
        n.d(t, "c", function () {
          return i;
        }),
        n.d(t, "a", function () {
          return o;
        });
      var o = {
          uIcon: function () {
            return n
              .e("node-modules/uview-ui/components/u-icon/u-icon")
              .then(n.bind(null, "b13c"));
          },
        },
        u = function () {
          this.$createElement;
          var e = (this._self._c, this.__get_style([this.textStyle]));
          this.$mp.data = Object.assign({}, { $root: { s0: e } });
        },
        i = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "node-modules/uview-ui/components/u-column-notice/u-column-notice-create-component",
    {
      "node-modules/uview-ui/components/u-column-notice/u-column-notice-create-component":
        function (e, t, n) {
          n("543d").createComponent(n("ab9c"));
        },
    },
    [
      [
        "node-modules/uview-ui/components/u-column-notice/u-column-notice-create-component",
      ],
    ],
  ]);
