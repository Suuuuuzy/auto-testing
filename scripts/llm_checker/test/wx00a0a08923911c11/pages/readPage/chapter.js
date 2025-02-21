(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/readPage/chapter"],
  {
    "053b": function (t, e, o) {
      "use strict";
      o.r(e);
      var n = o("1dd8"),
        a = o("3951");
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return a[t];
            });
          })(r);
      o("1ddf");
      var c,
        i = o("f0c5"),
        u = Object(i["a"])(
          a["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "30f83c94",
          null,
          !1,
          n["a"],
          c
        );
      e["default"] = u.exports;
    },
    "1dd8": function (t, e, o) {
      "use strict";
      var n;
      o.d(e, "b", function () {
        return a;
      }),
        o.d(e, "c", function () {
          return r;
        }),
        o.d(e, "a", function () {
          return n;
        });
      var a = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
          t._isMounted ||
            (t.e0 = function (e) {
              e.stopPropagation(), (t.isShowSet = !t.isShowSet);
            });
        },
        r = [];
    },
    "1ddf": function (t, e, o) {
      "use strict";
      var n = o("5fec"),
        a = o.n(n);
      a.a;
    },
    3951: function (t, e, o) {
      "use strict";
      o.r(e);
      var n = o("c138"),
        a = o.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(r);
      e["default"] = a.a;
    },
    "5fec": function (t, e, o) {},
    c138: function (t, e, o) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = o("494d"),
          a = function () {
            Promise.all([o.e("common/vendor"), o.e("components/topUpTemplate")])
              .then(
                function () {
                  return resolve(o("d670"));
                }.bind(null, o)
              )
              .catch(o.oe);
          };
        e.default = {
          data: function () {
            return { iosPay: !0 };
          },
          components: { topUpTemplate: a },
          mixins: [n.chapterJS],
          onShareAppMessage: function (e) {
            var o = this,
              n = o.pid ? o.pid : t.getStorageSync("userId");
            return {
              title: o.shareDesc,
              imageUrl: "",
              path:
                "/pages/readPage/chapter?ks_third_id=" +
                o.bookId +
                "&bookId=" +
                o.bookId +
                "&chapterId=" +
                o.chapterId +
                "&customParams=" +
                o.customParams +
                "&pid=" +
                n +
                "&inviteCode=" +
                o.allOption.inviteCode,
              success: function () {
                console.log(4444);
              },
              fail: function () {
                console.log(3333);
              },
            };
          },
          methods: {
            topUpChange: function (t) {
              this.iosPay = t.iosPay;
            },
          },
          beforeDestroy: function () {
            var e = this;
            e.bookId && t.setStorageSync(e.bookId, e.scrollTop),
              e.bookId && t.setStorageSync("newBookId", e.bookId),
              (e.chapterFlag = ""),
              (e.bookContent = ""),
              (e.readStatus = 1),
              (e.saveContent = ""),
              (e.nextChapter = null),
              (e.preChapter = null);
          },
          onHide: function () {
            var e = this;
            e.bookId &&
              1 == e.bookData.type &&
              t.setStorageSync(e.bookId, e.scrollTop),
              e.bookId &&
                1 == e.bookData.type &&
                t.setStorageSync("newBookId", e.bookId),
              (e.chapterFlag = ""),
              (e.bookContent = ""),
              (e.readStatus = 1),
              (e.saveContent = ""),
              (e.nextChapter = null),
              (e.preChapter = null);
          },
        };
      }).call(this, o("543d")["default"]);
    },
    cb23: function (t, e, o) {
      "use strict";
      (function (t, e) {
        var n = o("4ea4");
        o("6cdc");
        n(o("66fd"));
        var a = n(o("053b"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = o), e(a.default);
      }).call(this, o("bc2e")["default"], o("543d")["createPage"]);
    },
  },
  [["cb23", "common/runtime", "common/vendor"]],
]);
