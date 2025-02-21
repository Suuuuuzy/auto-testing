(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/readPage/catalog"],
  {
    "0036": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("4f87"),
        a = n.n(i);
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(c);
      e["default"] = a.a;
    },
    "22c2": function (t, e, n) {
      "use strict";
      (function (t, e) {
        var i = n("4ea4");
        n("6cdc");
        i(n("66fd"));
        var a = i(n("eb07"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = n), e(a.default);
      }).call(this, n("bc2e")["default"], n("543d")["createPage"]);
    },
    "4f87": function (t, e, n) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        e.default = {
          data: function () {
            return { bookId: "", chapterTotal: 0, menuList: [], isEnd: !1 };
          },
          onLoad: function (e) {
            (this.bookId = e.bookId),
              t.showLoading({ title: "加载中" }),
              this.getmunuList();
          },
          methods: {
            getmunuList: function () {
              var e = this;
              this.$get(this.$api.bookmenu, { bookId: this.bookId }).then(
                function (n) {
                  console.log(n),
                    n.success &&
                      (t.hideLoading(),
                      (e.chapterTotal = n.data.chapterTotal),
                      (e.menuList = n.data.menu[0].chapters));
                }
              );
            },
            startList: function () {
              (this.isEnd = !this.isEnd),
                (this.menuList = this.menuList.reverse());
            },
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "62dc": function (t, e, n) {},
    bc1e: function (t, e, n) {
      "use strict";
      var i;
      n.d(e, "b", function () {
        return a;
      }),
        n.d(e, "c", function () {
          return c;
        }),
        n.d(e, "a", function () {
          return i;
        });
      var a = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
        },
        c = [];
    },
    de4e: function (t, e, n) {
      "use strict";
      var i = n("62dc"),
        a = n.n(i);
      a.a;
    },
    eb07: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("bc1e"),
        a = n("0036");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(c);
      n("de4e");
      var o,
        u = n("f0c5"),
        r = Object(u["a"])(
          a["default"],
          i["b"],
          i["c"],
          !1,
          null,
          "0cf29cb1",
          null,
          !1,
          i["a"],
          o
        );
      e["default"] = r.exports;
    },
  },
  [["22c2", "common/runtime", "common/vendor"]],
]);
