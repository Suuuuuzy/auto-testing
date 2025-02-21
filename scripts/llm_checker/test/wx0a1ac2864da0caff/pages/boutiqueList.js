(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutiqueList"],
  {
    "102e": function (t, e, i) {
      "use strict";
      var n = i("47a9");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var r = n(i("7ca3")),
        o = i("8f59"),
        s = i("4bd4");
      function u(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            i.push.apply(i, n);
        }
        return i;
      }
      var c = [],
        a = {
          config: {
            navigationBarTitleText: "全球授权经销商",
            disableScroll: !0,
          },
          computed: (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var i = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? u(Object(i), !0).forEach(function (e) {
                    (0, r.default)(t, e, i[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : u(Object(i)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(i, e)
                    );
                  });
            }
            return t;
          })(
            {},
            (0, o.mapState)({
              config: function (t) {
                return t.config;
              },
            })
          ),
          components: {
            ppBoutiqueItem: function () {
              i.e("components/pp/Boutique/Item")
                .then(
                  function () {
                    return resolve(i("d079"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
            ppBoutiqueItemLarge: function () {
              i.e("components/pp/Boutique/ItemLarge")
                .then(
                  function () {
                    return resolve(i("eef7"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
            ppBoutiqueItemLargeMore: function () {
              i.e("components/pp/Boutique/ItemLargeMore")
                .then(
                  function () {
                    return resolve(i("dfc7"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
          },
          data: function () {
            return {
              tab: 1,
              showFilter: "",
              boutiqueNotMainLand: null,
              boutiqueOthers: null,
              areas: null,
              nowArea: "",
              countrys: null,
              nowCountry: "",
              citys: null,
              nowCity: "",
              page: 1,
              isEnd: !1,
              scrollTop: "0px",
            };
          },
          methods: {
            chooseTab: function (t) {
              if (
                ((this.tab = t),
                this.$tracking("common_event_click", {
                  event_name: "寻找销售中心",
                  event_category: "寻找销售中心",
                  event_value: ["北京/上海", "港澳台", "海外"][t - 1],
                }),
                1 !== t)
              )
                if (2 === t)
                  this.boutiqueNotMainLand = (0, s.getNotChinaMainLandService)(
                    "retailer"
                  );
                else if (3 === t) {
                  (this.page = 1), (this.isEnd = !1);
                  var e = (0, s.getOtherService)({ type: "retailer", page: 1 });
                  (this.countrys = null),
                    (this.citys = null),
                    (this.nowArea = ""),
                    (this.nowCountry = ""),
                    (this.nowCity = ""),
                    (c = e.result),
                    (this.boutiqueOthers = e.result.splice(0, 40)),
                    (this.areas = e.areas);
                }
            },
            chooseArea: function (t) {
              (this.page = 1),
                (this.isEnd = !1),
                (this.nowArea = t),
                (this.nowCountry = ""),
                (this.nowCity = ""),
                (this.showFilter = "");
              var e = (0, s.getOtherService)({
                type: "retailer",
                displayArea: this.nowArea,
              });
              (this.countrys = t
                ? JSON.parse(JSON.stringify(e.countrys))
                : null),
                (this.citys = null),
                (c = e.result),
                (this.boutiqueOthers = e.result.splice(0, 40)),
                (this.scrollTop = "0px" === this.scrollTop ? "1px" : "0px");
            },
            chooseCountry: function (t) {
              (this.page = 1),
                (this.isEnd = !1),
                (this.nowCountry = t),
                (this.nowCity = ""),
                (this.showFilter = "");
              var e = (0, s.getOtherService)({
                type: "retailer",
                displayArea: this.nowArea,
                displayCountry: this.nowCountry,
              });
              (this.citys = t ? JSON.parse(JSON.stringify(e.citys)) : null),
                (c = e.result),
                (this.boutiqueOthers = e.result.splice(0, 40)),
                (this.scrollTop = "0px" === this.scrollTop ? "1px" : "0px");
            },
            chooseCity: function (t) {
              (this.page = 1),
                (this.isEnd = !1),
                (this.nowCity = t),
                (this.showFilter = "");
              var e = (0, s.getOtherService)({
                type: "retailer",
                displayArea: this.nowArea,
                displayCountry: this.nowCountry,
                displayCity: this.nowCity,
              });
              (this.boutiqueOthers = JSON.parse(JSON.stringify(e.result))),
                (this.scrollTop = "0px" === this.scrollTop ? "1px" : "0px");
            },
            toBottomRefresh: function () {
              if (!this.isEnd)
                if (40 * (this.page - 1) + 40 >= c.length) this.isEnd = !0;
                else {
                  var t = c.splice(
                    40 * (this.page - 1),
                    40 * (this.page - 1) + 40
                  );
                  (this.boutiqueOthers = this.boutiqueOthers.concat(t)),
                    this.page++;
                }
            },
          },
          mounted: function () {},
        };
      e.default = a;
    },
    "2f63": function (t, e, i) {
      "use strict";
      var n = i("4280"),
        r = i.n(n);
      r.a;
    },
    4280: function (t, e, i) {},
    "86cb": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("da69"),
        r = i("89c1");
      for (var o in r)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return r[t];
            });
          })(o);
      i("2f63");
      var s = i("828b"),
        u = Object(s["a"])(
          r["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "1fd69da8",
          null,
          !1,
          n["a"],
          void 0
        );
      e["default"] = u.exports;
    },
    "89c1": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("102e"),
        r = i.n(n);
      for (var o in n)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(o);
      e["default"] = r.a;
    },
    da69: function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return r;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
          t._isMounted ||
            ((t.e0 = function (e) {
              t.showFilter = "area";
            }),
            (t.e1 = function (e) {
              t.showFilter = t.countrys ? "country" : "";
            }),
            (t.e2 = function (e) {
              t.showFilter = t.citys ? "city" : "";
            }),
            (t.e3 = function (e) {
              t.showFilter = "";
            }),
            (t.e4 = function (e) {
              t.showFilter = "";
            }),
            (t.e5 = function (e) {
              t.showFilter = "";
            }));
        },
        r = [];
    },
    e39f: function (t, e, i) {
      "use strict";
      (function (t, e) {
        var n = i("47a9");
        i("b45a");
        n(i("3240"));
        var r = n(i("86cb"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), e(r.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
  },
  [["e39f", "common/runtime", "common/vendor"]],
]);
