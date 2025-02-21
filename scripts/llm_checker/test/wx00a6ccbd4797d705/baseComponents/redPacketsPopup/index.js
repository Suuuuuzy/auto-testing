(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/redPacketsPopup/index"],
  {
    "138d": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("606e"),
        a = n("8a7f");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(i);
      n("b713");
      var s = n("f0c5"),
        u = Object(s.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "706b5218",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = u.exports;
    },
    "4d62": function (e, t, n) {},
    "606e": function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return a;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    "8a7f": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("ba9c"),
        a = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      t.default = a.a;
    },
    b713: function (e, t, n) {
      "use strict";
      var o = n("4d62");
      n.n(o).a;
    },
    ba9c: function (e, t, n) {
      "use strict";
      (function (e) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = o(n("2309")),
          i = o(n("461a")),
          s = n("ca00"),
          u = {
            mixins: [i.default],
            components: {
              wxPopup: function () {
                Promise.all([
                  n.e("common/vendor"),
                  n.e("baseComponents/wxpopup/popup"),
                ])
                  .then(
                    function () {
                      return resolve(n("0387"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
            },
            data: function () {
              return { pageInfo: {}, showPopup: !1 };
            },
            created: function () {
              e.$on("redPacketsPopup", this.showFun);
            },
            destroyed: function () {
              e.$off("redPacketsPopup", this.showFun);
            },
            methods: {
              showFun: function (e) {
                (this.pageInfo = e), (this.showPopup = !0);
              },
              beforgo: function () {
                var t = this;
                1 == this.pageInfo.passwordType &&
                  e.setClipboardData({
                    data: this.pageInfo.passwordContent,
                    success: function () {
                      e.showToast({ title: "复制口令成功", duration: 2e3 });
                    },
                  }),
                  a.default.initDecoration("CD").then(
                    function (e) {
                      setTimeout(function () {
                        t.toPage2({
                          page: "passwordRedbag",
                          context: "CD",
                          query: (0, s.setQueryFun)({
                            activityid: t.pageInfo.gameId,
                            thirdShopId: t.pageInfo.mcId,
                            activityhelpmid: t.pageInfo.activityhelpmid,
                          }),
                        });
                      }, 200);
                    },
                    function (e) {
                      a.default.setBusState(
                        "error",
                        { type: 1, message: e },
                        "SYSTEM"
                      ),
                        t.toPage({ page: "errorPage", context: "SYSTEM" });
                    }
                  );
              },
              hidePopup: function () {
                (this.showPopup = !1),
                  this.$emit("hidePopup", !1),
                  this.pageInfo.failCallback &&
                    this.pageInfo.orderId &&
                    this.pageInfo.failCallback(this.pageInfo.orderId);
              },
            },
          };
        t.default = u;
      }).call(this, n("543d").default);
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/redPacketsPopup/index-create-component",
    {
      "baseComponents/redPacketsPopup/index-create-component": function (
        e,
        t,
        n
      ) {
        n("543d").createComponent(n("138d"));
      },
    },
    [["baseComponents/redPacketsPopup/index-create-component"]],
  ]);
