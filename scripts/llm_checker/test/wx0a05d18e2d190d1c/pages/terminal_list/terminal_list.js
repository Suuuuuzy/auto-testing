(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/terminal_list/terminal_list"],
  {
    "3a4e": function (t, e, n) {
      n.d(e, "b", function () {
        return a;
      }),
        n.d(e, "c", function () {
          return i;
        }),
        n.d(e, "a", function () {});
      var a = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        i = [];
    },
    "422d": function (t, e, n) {
      n.r(e);
      var a = n("3a4e"),
        i = n("477b");
      for (var o in i)
        "default" !== o &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(o);
      n("bf88");
      var r = n("f0c5"),
        d = Object(r.a)(
          i.default,
          a.b,
          a.c,
          !1,
          null,
          null,
          null,
          !1,
          a.a,
          void 0
        );
      e.default = d.exports;
    },
    "477b": function (t, e, n) {
      n.r(e);
      var a = n("fd9a"),
        i = n.n(a);
      for (var o in a)
        "default" !== o &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(o);
      e.default = i.a;
    },
    5664: function (t, e, n) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        n("f567"), e(n("66fd")), t(e(n("422d")).default);
      }).call(this, n("543d").createPage);
    },
    a140: function (t, e, n) {},
    bf88: function (t, e, n) {
      var a = n("a140");
      n.n(a).a;
    },
    fd9a: function (t, e, n) {
      (function (t) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = {
          data: function () {
            return { page_data: {} };
          },
          onLoad: function (e) {
            (n = this),
              (this.page_data = this._pData),
              t.setNavigationBarTitle({ title: "车辆终端" });
          },
          onUnload: function (t) {},
          methods: {
            bind_or_unbind_gps: function (t) {
              (this.page_data.device_type = this.$device_ctrl_gps),
                n.navTo("../terminal_operate/terminal_operate", this.page_data);
            },
            bind_or_unbind_ble: function (t) {
              (this.page_data.device_type = this.$device_ctrl_ble),
                n.navTo("../terminal_operate/terminal_operate", this.page_data);
            },
            bind_or_unbind_key: function (t) {
              (this.page_data.device_type = this.$device_ctrl_key),
                n.navTo(
                  "../terminal_operate_list/terminal_operate_list",
                  this.page_data
                );
            },
          },
        };
        e.default = a;
      }).call(this, n("543d").default);
    },
  },
  [["5664", "common/runtime", "common/vendor"]],
]);
