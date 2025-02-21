(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/bookList"],
  {
    1916: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("2487"),
        a = n.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(c);
      e["default"] = a.a;
    },
    2487: function (t, e, n) {
      "use strict";
      var o = n("47a9");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = o(n("af34")),
        c = o(n("7ca3")),
        r = n("8f59"),
        i = n("4bd4"),
        u = o(n("e94a")),
        s = n("7791");
      function f(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          e &&
            (o = o.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      var l = {
        props: { value: Boolean, placeholder: Number },
        computed: (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? f(Object(n), !0).forEach(function (e) {
                  (0, c.default)(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : f(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        })(
          {},
          (0, r.mapState)({
            wishList: function (t) {
              return t.wishList;
            },
          })
        ),
        data: function () {
          return { wishListMore: null, bookList: [] };
        },
        methods: {
          chooseMe: function (t) {
            var e = this;
            1 == t.type
              ? this.$router.push("/pages/appointment/success?token=" + t.token)
              : this.$http.bookDetail({ token: t.token }, function (t) {
                  var n = t.detail;
                  e.$store.commit("UPDATE_BOOK_CACHE", n),
                    e.$router.push("boutiqueBookResult");
                });
          },
          dateChange: function () {},
          toAdd: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB3我的",
              event_category: "添加愿望清单",
              event_value: "添加愿望清单",
            }),
              this.$parent.chooseTab(2);
          },
          initWish: function () {
            var t = this;
            this.$http.activityMyBook({}, function (e) {
              if (((t.bookList = []), e && e.length)) {
                for (var n, o = 0; o < e.length; o++) {
                  var c = e[o],
                    r = (0, i.getBoutiqueById)(c.boutique_code);
                  u.default[c.boutique_code] &&
                    (r = Object.assign(r, u.default[c.boutique_code]));
                  var f = t.$dayjs(c.day),
                    l = s.weekName.zh[parseInt(f.format("d"))],
                    d = c.day.split("-");
                  (e[o].time_label = ""
                    .concat(d[0], "年")
                    .concat(d[1], "月")
                    .concat(d[2], "日 ")
                    .concat(l, " ")
                    .concat(c.start_hour.slice(0, 5))),
                    (e[o].name = c.name),
                    (e[o].phone = c.phone),
                    (e[o].type = 1);
                }
                (n = t.bookList).push.apply(n, (0, a.default)(e));
              }
              t.$http.myBook(function (e) {
                for (var n, o = e.book, c = 0; c < o.length; c++) {
                  var r = o[c],
                    f = (0, i.getBoutiqueById)(r.boutique_code);
                  u.default[r.boutique_code] &&
                    (f = Object.assign(f, u.default[r.boutique_code]));
                  var l = t.$dayjs(r.day),
                    d = s.weekName.zh[parseInt(l.format("d"))],
                    p = r.day.split("-"),
                    b = r.start_time.split(":");
                  (o[c].time_label = ""
                    .concat(p[0], "年")
                    .concat(p[1], "月")
                    .concat(p[2], "日 ")
                    .concat(d, " ")
                    .concat(b[0], ":")
                    .concat(b[1])),
                    (o[c].detail = f),
                    (o[c].type = 2);
                }
                (n = t.bookList).push.apply(n, (0, a.default)(o));
              });
            });
          },
        },
        mounted: function () {
          this.initWish();
        },
      };
      e.default = l;
    },
    "3a4a": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return a;
      }),
        n.d(e, "c", function () {
          return c;
        }),
        n.d(e, "a", function () {
          return o;
        });
      var o = {
          calendar: function () {
            return Promise.all([
              n.e("common/vendor"),
              n.e("components/calendar/calendar"),
            ]).then(n.bind(null, "eada"));
          },
        },
        a = function () {
          var t = this.$createElement;
          this._self._c;
        },
        c = [];
    },
    "52ce": function (t, e, n) {},
    "67e0": function (t, e, n) {
      "use strict";
      (function (t, e) {
        var o = n("47a9");
        n("b45a");
        o(n("3240"));
        var a = o(n("8f28"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = n), e(a.default);
      }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    "782d": function (t, e, n) {
      "use strict";
      var o = n("52ce"),
        a = n.n(o);
      a.a;
    },
    "8f28": function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("3a4a"),
        a = n("1916");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(c);
      n("782d");
      var r = n("828b"),
        i = Object(r["a"])(
          a["default"],
          o["b"],
          o["c"],
          !1,
          null,
          "6c1e429e",
          null,
          !1,
          o["a"],
          void 0
        );
      e["default"] = i.exports;
    },
  },
  [["67e0", "common/runtime", "common/vendor"]],
]);
