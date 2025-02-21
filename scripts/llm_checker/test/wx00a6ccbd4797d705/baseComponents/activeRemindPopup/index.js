(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/activeRemindPopup/index"],
  {
    2043: function (n, e, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var i = o(t("2309")),
        c = {
          components: {
            wxPopup: function () {
              Promise.all([
                t.e("common/vendor"),
                t.e("baseComponents/wxpopup/popup"),
              ])
                .then(
                  function () {
                    return resolve(t("0387"));
                  }.bind(null, t)
                )
                .catch(t.oe);
            },
          },
          name: "ActiveRemindPopup",
          context: "SYSTEM",
          data: function () {
            return { themeColor: "", remindSwitch: !1 };
          },
          watch: {},
          computed: {},
          created: function () {
            this.themeColor = i.default.getDecorate("SYSTEM").themeColor;
          },
          methods: {
            activeShow: function () {
              this.remindSwitch = !0;
            },
            hide: function () {
              this.remindSwitch = !1;
            },
            show: function (n) {
              if (wx.getSetting && n && n.length) {
                var e = this;
                wx.getSetting({
                  withSubscriptions: !0,
                  success: function (t) {
                    var o = (null == t ? void 0 : t.subscriptionsSetting) || {};
                    if (o.mainSwitch) {
                      var i = (null == o ? void 0 : o.itemSettings) || {},
                        c = 0;
                      [].forEach.call(n, function (n) {
                        n in i && c++;
                      }),
                        c != n.length && e.activeShow();
                    }
                  },
                });
              }
            },
          },
        };
      e.default = c;
    },
    "320b": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return i;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        i = [];
    },
    "4f09": function (n, e, t) {},
    5593: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("320b"),
        i = t("5717");
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return i[n];
            });
          })(c);
      t("996b");
      var u = t("f0c5"),
        a = Object(u.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          "6f209530",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = a.exports;
    },
    5717: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("2043"),
        i = t.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(c);
      e.default = i.a;
    },
    "996b": function (n, e, t) {
      "use strict";
      var o = t("4f09");
      t.n(o).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/activeRemindPopup/index-create-component",
    {
      "baseComponents/activeRemindPopup/index-create-component": function (
        n,
        e,
        t
      ) {
        t("543d").createComponent(t("5593"));
      },
    },
    [["baseComponents/activeRemindPopup/index-create-component"]],
  ]);
