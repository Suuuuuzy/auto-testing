(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/orderNotice/index"],
  {
    "16ce": function (e, t, o) {
      "use strict";
      var n = o("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var c = n(o("2309")),
        r = {
          name: "orderNotice",
          components: {
            orderNoticePopup: function () {
              o.e("baseComponents/orderNotice/orderNoticePopup")
                .then(
                  function () {
                    return resolve(o("76c9"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
            mcMsgPopup: function () {
              o.e("baseComponents/orderNotice/mcMsgPopup")
                .then(
                  function () {
                    return resolve(o("72d1"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          props: {
            noticeList: {
              type: Array,
              default: function () {
                return [];
              },
            },
            autoplay: { type: Boolean, default: !0 },
            vertical: { type: Boolean, default: !0 },
            ifShowDeil: { type: Boolean, default: !0 },
            noBackground: { type: Boolean, default: !1 },
            isShowGG: { type: Boolean, default: !0 },
            decorateInfo: {
              type: Object,
              default: function () {
                return {
                  leftIcon: "",
                  textColor: "#333333",
                  backgroundColor: "#fef9e3",
                };
              },
            },
            template: { type: String, default: "" },
            context: { type: String, default: "" },
            isZc: { type: Boolean, default: !1 },
            bottomStyle: { type: Boolean, default: !1 },
            themeColor: {
              type: String,
              default: function () {
                return "";
              },
            },
            showMcMsg: { type: Boolean, default: !1 },
          },
          data: function () {
            return { show: !1, notice: "" };
          },
          computed: {
            isShowNoticeIcon: function () {
              var e = this.noticeList;
              return (
                !!e.length &&
                e.reduce(function (e, t) {
                  return e + t;
                }, "").length
              );
            },
          },
          methods: {
            showPopup: function (e) {
              var t = this;
              this.showMcMsg
                ? c.default
                    .getCommonPackage("wmzt-storeMes-commonPackage")
                    .then(function (e) {
                      t.$refs.mcMsgPopup.showPopup();
                    })
                : this.$refs.orderNoticePopup.showPopup();
            },
          },
        };
      t.default = r;
    },
    "4e33": function (e, t, o) {
      "use strict";
      o.d(t, "b", function () {
        return n;
      }),
        o.d(t, "c", function () {
          return c;
        }),
        o.d(t, "a", function () {});
      var n = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
    5934: function (e, t, o) {},
    "96f3": function (e, t, o) {
      "use strict";
      o.r(t);
      var n = o("4e33"),
        c = o("e85c");
      for (var r in c)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return c[e];
            });
          })(r);
      o("c829");
      var u = o("f0c5"),
        a = Object(u.a)(
          c.default,
          n.b,
          n.c,
          !1,
          null,
          null,
          null,
          !1,
          n.a,
          void 0
        );
      t.default = a.exports;
    },
    c829: function (e, t, o) {
      "use strict";
      var n = o("5934");
      o.n(n).a;
    },
    e85c: function (e, t, o) {
      "use strict";
      o.r(t);
      var n = o("16ce"),
        c = o.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return n[e];
            });
          })(r);
      t.default = c.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/orderNotice/index-create-component",
    {
      "baseComponents/orderNotice/index-create-component": function (e, t, o) {
        o("543d").createComponent(o("96f3"));
      },
    },
    [["baseComponents/orderNotice/index-create-component"]],
  ]);
