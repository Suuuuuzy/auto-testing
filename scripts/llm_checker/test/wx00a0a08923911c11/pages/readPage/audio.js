(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/readPage/audio"],
  {
    "0286": function (o, n, e) {
      "use strict";
      (function (o) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var t = e("c06a");
        n.default = {
          data: function () {
            return {
              bookId: "",
              bookInfo: null,
              currentTime: 0,
              isautoPlay: !0,
              isTone: 1,
            };
          },
          mixins: [t.payJS],
          onLoad: function (o) {
            (this.bookId = o.bookId), this.getBookAudio();
          },
          onShow: function () {
            console.log("首次加载");
          },
          methods: {
            changevoice: function (o) {
              console.log(o), (this.isTone = 1 == o.isVoice ? 1 : 2);
            },
            getBookAudio: function (o) {
              var n = this;
              (this.bookInfo = null),
                this.$get(this.$api.bookaudio, {
                  bookId: this.bookId,
                  tone: this.isTone,
                }).then(function (e) {
                  if ((console.log(e), (n.bookInfo = e.data), "change" == o)) {
                    n.$nextTick(function () {
                      console.log(this.$refs.audio),
                        this.$refs.audio.filechange(e.data.url, this.bookId);
                    });
                  }
                });
            },
            changeBook: function (n) {
              if (this.bookId == n) return !1;
              o.setStorageSync("audio" + this.bookId, this.currentTime),
                (this.bookId = n),
                (this.isTone = 1),
                this.getBookAudio("change");
            },
            audioEnd: function () {
              if (this.bookInfo.isFullUrl) this.$refs.chongzhipopup.close();
              else {
                var n = this;
                n.bookId && o.setStorageSync("audio" + n.bookId, n.currentTime),
                  console.log("播放结束:".concat(n.currentTime)),
                  n.$refs.chongzhipopup.open("bottom"),
                  n.gettopupgrade(3);
              }
            },
            audioTimeChange: function (o) {
              this.currentTime = o.currentTime;
            },
            changeBookStatus: function () {
              (this.bookInfo.isUserShelf = !0),
                console.log(this.bookInfo.isUserShelf, "isUserShelf");
            },
          },
          onUnload: function () {
            console.log("onUnload");
            var n = this;
            n.bookId && o.setStorageSync("audio" + n.bookId, n.currentTime),
              n.$refs.audio.audioDestroy();
          },
          destroyed: function () {
            var n = this;
            n.bookId && o.setStorageSync("audio" + n.bookId, n.currentTime),
              n.$refs.audio.audioDestroy();
          },
          onHide: function () {
            console.log("onUnload");
          },
        };
      }).call(this, e("543d")["default"]);
    },
    "0c19": function (o, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return i;
      }),
        e.d(n, "c", function () {
          return u;
        }),
        e.d(n, "a", function () {
          return t;
        });
      var t = {
          syAudio: function () {
            return Promise.all([
              e.e("common/vendor"),
              e.e("uni_modules/sy-audio/components/sy-audio/sy-audio"),
            ]).then(e.bind(null, "f946"));
          },
          uniPopup: function () {
            return e
              .e("uni_modules/uni-popup/components/uni-popup/uni-popup")
              .then(e.bind(null, "27c0"));
          },
        },
        i = function () {
          var o = this,
            n = o.$createElement,
            e =
              (o._self._c,
              o.bookInfo
                ? o.bookInfo && o.bookInfo.recommend.content.length > 0
                : null),
            t =
              o.bookInfo && e
                ? o.__map(o.bookInfo.recommend.content, function (n, e) {
                    var t = o.__get_orig(n),
                      i = n.book.tags ? n.book.tags.split(",") : null;
                    return { $orig: t, l0: i };
                  })
                : null;
          o.$mp.data = Object.assign({}, { $root: { g0: e, l1: t } });
        },
        u = [];
    },
    "2f7e": function (o, n, e) {
      "use strict";
      (function (o, n) {
        var t = e("4ea4");
        e("6cdc");
        t(e("66fd"));
        var i = t(e("b8e3"));
        (o.__webpack_require_UNI_MP_PLUGIN__ = e), n(i.default);
      }).call(this, e("bc2e")["default"], e("543d")["createPage"]);
    },
    "3fec": function (o, n, e) {
      "use strict";
      var t = e("fe4e"),
        i = e.n(t);
      i.a;
    },
    b8e3: function (o, n, e) {
      "use strict";
      e.r(n);
      var t = e("0c19"),
        i = e("c60f");
      for (var u in i)
        ["default"].indexOf(u) < 0 &&
          (function (o) {
            e.d(n, o, function () {
              return i[o];
            });
          })(u);
      e("3fec");
      var c,
        s = e("f0c5"),
        a = Object(s["a"])(
          i["default"],
          t["b"],
          t["c"],
          !1,
          null,
          "4eca34db",
          null,
          !1,
          t["a"],
          c
        );
      n["default"] = a.exports;
    },
    c60f: function (o, n, e) {
      "use strict";
      e.r(n);
      var t = e("0286"),
        i = e.n(t);
      for (var u in t)
        ["default"].indexOf(u) < 0 &&
          (function (o) {
            e.d(n, o, function () {
              return t[o];
            });
          })(u);
      n["default"] = i.a;
    },
    fe4e: function (o, n, e) {},
  },
  [["2f7e", "common/runtime", "common/vendor"]],
]);
