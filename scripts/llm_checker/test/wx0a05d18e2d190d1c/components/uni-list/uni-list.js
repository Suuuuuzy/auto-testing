(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/uni-list/uni-list"],
  {
    "006f": function (n, t, o) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var e = {
        name: "UniList",
        "mp-weixin": { options: { multipleSlots: !1 } },
        props: {
          enableBackToTop: { type: [Boolean, String], default: !1 },
          scrollY: { type: [Boolean, String], default: !1 },
        },
        provide: function () {
          return { list: this };
        },
        created: function () {
          this.firstChildAppend = !1;
        },
        methods: {
          loadMore: function (n) {
            this.$emit("scrolltolower");
          },
        },
      };
      t.default = e;
    },
    "408b": function (n, t, o) {
      var e = o("df8a");
      o.n(e).a;
    },
    "4b82": function (n, t, o) {
      o.r(t);
      var e = o("884a"),
        i = o("53d7");
      for (var a in i)
        "default" !== a &&
          (function (n) {
            o.d(t, n, function () {
              return i[n];
            });
          })(a);
      o("408b");
      var u = o("f0c5"),
        l = Object(u.a)(
          i.default,
          e.b,
          e.c,
          !1,
          null,
          "a9798df4",
          null,
          !1,
          e.a,
          void 0
        );
      t.default = l.exports;
    },
    "53d7": function (n, t, o) {
      o.r(t);
      var e = o("006f"),
        i = o.n(e);
      for (var a in e)
        "default" !== a &&
          (function (n) {
            o.d(t, n, function () {
              return e[n];
            });
          })(a);
      t.default = i.a;
    },
    "884a": function (n, t, o) {
      o.d(t, "b", function () {
        return e;
      }),
        o.d(t, "c", function () {
          return i;
        }),
        o.d(t, "a", function () {});
      var e = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        i = [];
    },
    df8a: function (n, t, o) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/uni-list/uni-list-create-component",
    {
      "components/uni-list/uni-list-create-component": function (n, t, o) {
        o("543d").createComponent(o("4b82"));
      },
    },
    [["components/uni-list/uni-list-create-component"]],
  ]);
