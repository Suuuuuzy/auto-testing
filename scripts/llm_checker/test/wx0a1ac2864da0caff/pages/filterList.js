(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/filterList"],
  {
    "29c3": function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return r;
      }),
        i.d(e, "c", function () {
          return n;
        }),
        i.d(e, "a", function () {});
      var r = function () {
          var t = this.$createElement;
          this._self._c;
        },
        n = [];
    },
    "331d": function (t, e, i) {
      "use strict";
      (function (t, e) {
        var r = i("47a9");
        i("b45a");
        r(i("3240"));
        var n = r(i("74c4"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), e(n.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
    "3db4": function (t, e, i) {
      "use strict";
      var r = i("b245"),
        n = i.n(r);
      n.a;
    },
    "6fe8": function (t, e, i) {
      "use strict";
      var r = i("47a9");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var n = r(i("7ca3")),
        s = i("8f59"),
        o = i("8714"),
        c = r(i("cc15"));
      function l(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e &&
            (r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            i.push.apply(i, r);
        }
        return i;
      }
      var a = {
        config: { navigationBarTitleText: "分类筛选", disableScroll: !0 },
        computed: (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? l(Object(i), !0).forEach(function (e) {
                  (0, n.default)(t, e, i[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
              : l(Object(i)).forEach(function (e) {
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
          (0, s.mapState)({
            navigationBarHeight: function (t) {
              return t.navigationBarHeight;
            },
            navigationBarHeightPlaceholder: function (t) {
              return t.navigationBarHeightPlaceholder;
            },
          })
        ),
        data: function () {
          return {
            nowIndex: 0,
            nowFilter: null,
            filterList: null,
            productCount: o.product.length,
            choosedFilter: {},
            filterListInit: c.default,
          };
        },
        methods: {
          viewProduct: function () {
            0 !== this.productCount
              ? (this.$store.commit(
                  "UPDATE_CHOOSED_FILTER",
                  this.choosedFilter
                ),
                this.$router.replace("filterResult?count=" + this.productCount))
              : this.$alert("请重新选择筛选条件");
          },
          chooseTab: function (t, e) {
            (this.nowFilter = JSON.parse(JSON.stringify(t.list))),
              (this.nowIndex = JSON.parse(JSON.stringify(e)));
          },
          chooseItem: function (t, e, i) {
            var r = this,
              n = this.filterList[this.nowIndex].list[i],
              s = (n.type, n.col),
              c = t.title;
            if (
              ((t.active = !t.active),
              t.active &&
                this.$tracking("common_event_click", {
                  event_name: "TAB2时计系列页面",
                  event_category: "筛选标签",
                  event_value: "筛选标签. " + t.title,
                }),
              (this.filterList[this.nowIndex].list[i].list[e].active =
                t.active),
              t.active)
            )
              this.filterList[this.nowIndex].num++,
                this.choosedFilter[s]
                  ? this.choosedFilter[s].push(c)
                  : (this.choosedFilter[s] = [c]);
            else {
              this.filterList[this.nowIndex].num--,
                this.filterList[this.nowIndex].num < 0 &&
                  (this.filterList[this.nowIndex].num = 0);
              var l = this.choosedFilter[s].indexOf(c);
              l >= 0 && this.choosedFilter[s].splice(l, 1);
            }
            var a = [],
              u = [],
              f = JSON.parse(JSON.stringify(o.product)),
              h = 0;
            for (var d in this.choosedFilter)
              if (
                ((a = []),
                (u = []),
                this.choosedFilter[d] && 0 !== this.choosedFilter[d].length)
              ) {
                h++;
                for (var p = 0; p < this.choosedFilter[d].length; p++)
                  for (var O = 0; O < f.length; O++) {
                    var v = f[O];
                    if ("complications" === d)
                      v[d].indexOf(this.choosedFilter[d][p]) >= 0 &&
                        u.indexOf(v.articleRef) < 0 &&
                        (a.push(v), u.push(v.articleRef));
                    else if ("price" === d) {
                      if (
                        "按需报价" === v.price &&
                        "按需报价" === this.choosedFilter[d][p] &&
                        u.indexOf(v.articleRef) < 0
                      )
                        a.push(v), u.push(v.articleRef);
                      else if (v.price) {
                        var g = parseInt(
                            v.price.replace(/\'/g, "").replace(/ CNY/g, "")
                          ),
                          b = this.choosedFilter[d][p]
                            .replace(/\'/g, "")
                            .replace(/ CNY/g, "")
                            .split(" - "),
                          m = parseInt(b[0]),
                          w = parseInt(b[1]);
                        g >= m &&
                          g <= w &&
                          u.indexOf(v.articleRef) < 0 &&
                          (a.push(v), u.push(v.articleRef));
                      }
                    } else
                      v[d] === this.choosedFilter[d][p] &&
                        u.indexOf(v.articleRef) < 0 &&
                        (a.push(v), u.push(v.articleRef));
                  }
                f = a;
              }
            h || (f = o.product),
              setTimeout(function () {
                r.productCount = f.length;
              }, 30);
          },
          reset: function () {
            this.$store.commit("UPDATE_CHOOSED_FILTER", {}),
              (this.choosedFilter = {}),
              (this.productCount = o.product.length),
              (this.filterList = JSON.parse(
                JSON.stringify(this.filterListInit)
              )),
              (this.nowFilter = JSON.parse(
                JSON.stringify(this.filterList[this.nowIndex].list)
              ));
          },
        },
        mounted: function () {
          this.$store.commit("UPDATE_CHOOSED_FILTER", {}),
            (this.choosedFilter = {}),
            (this.nowIndex = 0),
            (this.productCount = o.product.length),
            (this.filterList = JSON.parse(JSON.stringify(this.filterListInit))),
            (this.nowFilter = JSON.parse(
              JSON.stringify(this.filterList[this.nowIndex].list)
            ));
        },
      };
      e.default = a;
    },
    "74c4": function (t, e, i) {
      "use strict";
      i.r(e);
      var r = i("29c3"),
        n = i("9de8");
      for (var s in n)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(s);
      i("3db4");
      var o = i("828b"),
        c = Object(o["a"])(
          n["default"],
          r["b"],
          r["c"],
          !1,
          null,
          "6f5e5898",
          null,
          !1,
          r["a"],
          void 0
        );
      e["default"] = c.exports;
    },
    "9de8": function (t, e, i) {
      "use strict";
      i.r(e);
      var r = i("6fe8"),
        n = i.n(r);
      for (var s in r)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return r[t];
            });
          })(s);
      e["default"] = n.a;
    },
    b245: function (t, e, i) {},
  },
  [["331d", "common/runtime", "common/vendor"]],
]);
