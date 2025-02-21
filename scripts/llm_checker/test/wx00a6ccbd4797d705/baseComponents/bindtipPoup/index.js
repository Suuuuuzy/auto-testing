(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/bindtipPoup/index"],
  {
    "0163": function (e, n, t) {
      "use strict";
      var o = t("aeb3");
      t.n(o).a;
    },
    "58c3": function (e, n, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var i = o(t("2309")),
        a = {
          data: function () {
            return {
              visible: !1,
              tipCon: "该门店未绑定小程序，不可点餐，请先绑定小程序！",
              themeColor: "",
            };
          },
          components: {
            wxpopup: function () {
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
            exitBtn: function () {
              t.e("baseComponents/exitBtn/index")
                .then(
                  function () {
                    return resolve(t("935e"));
                  }.bind(null, t)
                )
                .catch(t.oe);
            },
          },
          props: { context: { type: String, default: "DC" } },
          created: function () {
            this.themeColor =
              i.default.getDecorate(this.context).themeColor || "#FABD00";
          },
          mounted: function () {
            var e = this;
            i.default.setPageComponent({
              "DC-navigatePage|DC-dishPage|DC-tablePaySingle|WM-dishPage|WM-gbOrder|WM-groupBuyDishPage|ZT-dishPage|ZT-gbOrder|ZT-groupBuyDishPage|@checkWechatMcidOfMpid":
                function () {
                  i.default
                    .getData({
                      name: "checkWechatMcidOfMpid",
                      nameSpace: e.context,
                    })
                    .then(function (n) {
                      0 != n.status || n.result || e.show();
                    });
                },
            });
          },
          methods: {
            show: function () {
              this.visible = !0;
            },
          },
        };
      n.default = a;
    },
    "603b": function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t("8bfe"),
        i = t("fcbd");
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return i[e];
            });
          })(a);
      t("0163");
      var c = t("f0c5"),
        u = Object(c.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          "b7029c14",
          null,
          !1,
          o.a,
          void 0
        );
      n.default = u.exports;
    },
    "8bfe": function (e, n, t) {
      "use strict";
      t.d(n, "b", function () {
        return o;
      }),
        t.d(n, "c", function () {
          return i;
        }),
        t.d(n, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        i = [];
    },
    aeb3: function (e, n, t) {},
    fcbd: function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t("58c3"),
        i = t.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(a);
      n.default = i.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/bindtipPoup/index-create-component",
    {
      "baseComponents/bindtipPoup/index-create-component": function (e, n, t) {
        t("543d").createComponent(t("603b"));
      },
    },
    [["baseComponents/bindtipPoup/index-create-component"]],
  ]);
