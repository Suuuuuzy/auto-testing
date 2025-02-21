(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/orderNotice/orderNoticePopup"],
  {
    "330e": function (o, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
        name: "orderNotice",
        components: {
          wxpopup: function () {
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
        props: { noticeList: { type: Array } },
        data: function () {
          return { show: !1 };
        },
        methods: {
          showPopup: function () {
            this.show = !0;
          },
          hidePopup: function () {
            this.show = !1;
          },
        },
      };
      e.default = t;
    },
    "3d82": function (o, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return t;
      }),
        n.d(e, "c", function () {
          return c;
        }),
        n.d(e, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
    4441: function (o, e, n) {
      "use strict";
      n.r(e);
      var t = n("330e"),
        c = n.n(t);
      for (var r in t)
        ["default"].indexOf(r) < 0 &&
          (function (o) {
            n.d(e, o, function () {
              return t[o];
            });
          })(r);
      e.default = c.a;
    },
    "76c9": function (o, e, n) {
      "use strict";
      n.r(e);
      var t = n("3d82"),
        c = n("4441");
      for (var r in c)
        ["default"].indexOf(r) < 0 &&
          (function (o) {
            n.d(e, o, function () {
              return c[o];
            });
          })(r);
      n("ac87");
      var u = n("f0c5"),
        i = Object(u.a)(
          c.default,
          t.b,
          t.c,
          !1,
          null,
          null,
          null,
          !1,
          t.a,
          void 0
        );
      e.default = i.exports;
    },
    ac87: function (o, e, n) {
      "use strict";
      var t = n("d0d2");
      n.n(t).a;
    },
    d0d2: function (o, e, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/orderNotice/orderNoticePopup-create-component",
    {
      "baseComponents/orderNotice/orderNoticePopup-create-component": function (
        o,
        e,
        n
      ) {
        n("543d").createComponent(n("76c9"));
      },
    },
    [["baseComponents/orderNotice/orderNoticePopup-create-component"]],
  ]);
