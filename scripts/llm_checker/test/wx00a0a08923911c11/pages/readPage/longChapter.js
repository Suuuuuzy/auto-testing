(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/readPage/longChapter"],
  {
    4330: function (t, e, n) {
      "use strict";
      var o;
      n.d(e, "b", function () {
        return a;
      }),
        n.d(e, "c", function () {
          return r;
        }),
        n.d(e, "a", function () {
          return o;
        });
      var a = function () {
          var t = this,
            e = t.$createElement,
            n =
              (t._self._c,
              1 != t.readStatus && 4 == t.readStatus && t.iosPay
                ? t.__map(t.consumegradeList, function (e, n) {
                    var o = t.__get_orig(e),
                      a = e.text.split("_");
                    return { $orig: o, g0: a };
                  })
                : null);
          t._isMounted ||
            ((t.e0 = function (e) {
              t.isShowSet;
            }),
            (t.e1 = function (e) {
              e.stopPropagation(), (t.isShowSet = !t.isShowSet);
            })),
            (t.$mp.data = Object.assign({}, { $root: { l0: n } }));
        },
        r = [];
    },
    "4e8c": function (t, e, n) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = n("c06a"),
          a = n("494d"),
          r = function () {
            Promise.all([
              n.e("common/vendor"),
              n.e("components/gaoyia-parse/parse"),
            ])
              .then(
                function () {
                  return resolve(n("2825"));
                }.bind(null, n)
              )
              .catch(n.oe);
          };
        e.default = {
          data: function () {
            return {};
          },
          components: { uParse: r },
          mixins: [o.payJS, a.chapterJS],
          onShareAppMessage: function (e) {
            var n = this,
              o = n.pid ? n.pid : t.getStorageSync("userId");
            return {
              title: n.shareDesc,
              imageUrl: "",
              path:
                "/pages/readPage/longChapter?ks_third_id=" +
                n.bookId +
                "&bookId=" +
                n.bookId +
                "&chapterId=" +
                n.chapterId +
                "&customParams=" +
                n.customParams +
                "&pid=" +
                o,
              success: function () {
                console.log(4444);
              },
              fail: function () {
                console.log(3333);
              },
            };
          },
          onPullDownRefresh: function () {
            var e = this;
            console.log("触发了上拉"),
              (this.chapterFlag = "prev"),
              t
                .createSelectorQuery()
                .select(".mainCon")
                .boundingClientRect(function (t) {
                  console.log(t), (e.oldHeight = t.height);
                })
                .exec(),
              this.preChapter &&
                ((this.chapterId = this.preChapter.id), this.getbookchapter()),
              setTimeout(function () {
                t.stopPullDownRefresh();
              }, 1e3);
          },
          onReachBottom: function () {
            console.log("触发了下拉"),
              console.log(this.readStatus),
              console.log(this.chapterFlag),
              (this.chapterFlag = "next"),
              this.nextChapter &&
                1 == this.readStatus &&
                ((this.chapterId = this.nextChapter.id), this.getbookchapter());
          },
          beforeDestroy: function () {
            var t = this;
            t.nextChapter &&
              ((t.bookContent = ""), (t.readStatus = 1), (t.saveContent = ""));
          },
          onHide: function () {
            var t = this;
            t.nextChapter &&
              ((t.bookContent = ""), (t.readStatus = 1), (t.saveContent = ""));
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "52db": function (t, e, n) {
      "use strict";
      var o = n("a086"),
        a = n.n(o);
      a.a;
    },
    "84cc": function (t, e, n) {
      "use strict";
      (function (t, e) {
        var o = n("4ea4");
        n("6cdc");
        o(n("66fd"));
        var a = o(n("dd68"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = n), e(a.default);
      }).call(this, n("bc2e")["default"], n("543d")["createPage"]);
    },
    a086: function (t, e, n) {},
    bd55: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("4e8c"),
        a = n.n(o);
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(r);
      e["default"] = a.a;
    },
    dd68: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("4330"),
        a = n("bd55");
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(r);
      n("52db");
      var c,
        i = n("f0c5"),
        s = Object(i["a"])(
          a["default"],
          o["b"],
          o["c"],
          !1,
          null,
          "2c9a6033",
          null,
          !1,
          o["a"],
          c
        );
      e["default"] = s.exports;
    },
  },
  [["84cc", "common/runtime", "common/vendor"]],
]);
