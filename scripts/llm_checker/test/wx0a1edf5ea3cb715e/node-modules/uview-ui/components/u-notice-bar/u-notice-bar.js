(global.webpackJsonp = global.webpackJsonp || []).push([
  ["node-modules/uview-ui/components/u-notice-bar/u-notice-bar"],
  {
    "0844": function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = {
        name: "u-notice-bar",
        props: {
          list: {
            type: Array,
            default: function () {
              return [];
            },
          },
          type: { type: String, default: "warning" },
          volumeIcon: { type: Boolean, default: !0 },
          volumeSize: { type: [Number, String], default: 34 },
          moreIcon: { type: Boolean, default: !1 },
          closeIcon: { type: Boolean, default: !1 },
          autoplay: { type: Boolean, default: !0 },
          color: { type: String, default: "" },
          bgColor: { type: String, default: "" },
          mode: { type: String, default: "horizontal" },
          show: { type: Boolean, default: !0 },
          fontSize: { type: [Number, String], default: 28 },
          duration: { type: [Number, String], default: 2e3 },
          speed: { type: [Number, String], default: 160 },
          isCircular: { type: Boolean, default: !0 },
          playState: { type: String, default: "play" },
          disableTouch: { type: Boolean, default: !0 },
          borderRadius: { type: [Number, String], default: 0 },
          padding: { type: [Number, String], default: "18rpx 24rpx" },
          noListHidden: { type: Boolean, default: !0 },
        },
        computed: {
          isShow: function () {
            return (
              0 != this.show &&
              (1 != this.noListHidden || 0 != this.list.length)
            );
          },
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
          end: function () {
            this.$emit("end");
          },
        },
      };
      t.default = o;
    },
    4753: function (e, t, n) {
      var o = n("d830");
      n.n(o).a;
    },
    6011: function (e, t, n) {
      n.r(t);
      var o = n("0844"),
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
    "85fc": function (e, t, n) {
      n.r(t);
      var o = n("e315"),
        u = n("6011");
      for (var i in u)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return u[e];
            });
          })(i);
      n("4753");
      var a = n("f0c5"),
        c = Object(a.a)(
          u.default,
          o.b,
          o.c,
          !1,
          null,
          "c9cafba2",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = c.exports;
    },
    d830: function (e, t, n) {},
    e315: function (e, t, n) {
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
          uRowNotice: function () {
            return n
              .e("node-modules/uview-ui/components/u-row-notice/u-row-notice")
              .then(n.bind(null, "f85a"));
          },
          uColumnNotice: function () {
            return n
              .e(
                "node-modules/uview-ui/components/u-column-notice/u-column-notice"
              )
              .then(n.bind(null, "ab9c"));
          },
        },
        u = function () {
          this.$createElement;
          this._self._c;
        },
        i = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "node-modules/uview-ui/components/u-notice-bar/u-notice-bar-create-component",
    {
      "node-modules/uview-ui/components/u-notice-bar/u-notice-bar-create-component":
        function (e, t, n) {
          n("543d").createComponent(n("85fc"));
        },
    },
    [
      [
        "node-modules/uview-ui/components/u-notice-bar/u-notice-bar-create-component",
      ],
    ],
  ]);
