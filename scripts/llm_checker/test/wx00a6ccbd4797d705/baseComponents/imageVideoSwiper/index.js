(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/imageVideoSwiper/index"],
  {
    "01de": function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return o;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this,
            e = (t.$createElement, t._self._c, t.__get_style([t.wrapStyle])),
            i = t.videoUrl ? t.__get_style([t.videStyle]) : null,
            n =
              t.handledImglist.length &&
              (!t.videoUrl || 2 == t.styleType) &&
              t.indicator &&
              t.handledImglist.length > 1 &&
              1 != t.indicatorType
                ? t.__map(t.handledImglist, function (e, i) {
                    return {
                      $orig: t.__get_orig(e),
                      s2: t.__get_style([t.dotStyle(i === t.currentIndex)]),
                    };
                  })
                : null;
          t.$mp.data = Object.assign({}, { $root: { s0: e, s1: i, l0: n } });
        },
        o = [];
    },
    "070d1": function (t, e, i) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var i = null,
          n = {
            data: function () {
              return {
                sign: "?time=" + new Date().getTime(),
                nowShowSwiperType: 0,
                isShowBtn: !1,
                showPreview: !1,
                currentIndex: 0,
                showVideo: !0,
              };
            },
            props: {
              from: { type: String, default: "" },
              styleType: { default: 1 },
              themeColor: { type: String, default: "" },
              textColor: { type: String, default: "" },
              videoUrl: { type: String, default: "" },
              imgList: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              width: { type: String | Number, default: 375 },
              aspectRatio: { type: String | Number, default: 1 },
              preview: { type: Boolean, default: !1 },
              indicator: { type: Boolean, default: !1 },
              borderRadius: { type: String | Number, default: 0 },
              indicatorSet: {
                type: Object,
                default: function () {
                  return {
                    color: "#fff",
                    selectedBackgroundColor: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    justifyContent: "center",
                    bottom: 20,
                    width: 6,
                    height: 6,
                  };
                },
              },
              indicatorType: { default: 2 },
            },
            computed: {
              videStyle: function () {
                return {
                  height: (0 == this.nowShowSwiperType ? 100 : 0) + "%",
                  padding: "0 0 ".concat(
                    this.hasVideoPadding ? "60rpx" : "0",
                    " 0}"
                  ),
                };
              },
              hasVideoPadding: function () {
                return (
                  2 != this.styleType &&
                  0 == this.nowShowSwiperType &&
                  !!this.isShowBtn
                );
              },
              handledImglist: function () {
                var t = [];
                return (
                  this.imgList.forEach(function (e) {
                    var i = !1;
                    (e.includes(".gif") || e.includes(".GIF")) && (i = !0),
                      t.push({ isGIF: i, url: e });
                  }),
                  t
                );
              },
              wrapStyle: function () {
                var t = {
                  width: this.width + "px",
                  height: this.width / this.aspectRatio + "px",
                };
                return (
                  this.borderRadius > 0 &&
                    Object.assign(t, {
                      "border-radius": this.borderRadius + "rpx",
                      overflow: "hidden",
                    }),
                  "styleB" == this.from &&
                    ((t.width = "100%"), (t["z-index"] = -1)),
                  t
                );
              },
            },
            methods: {
              dotStyle: function (t) {
                return t
                  ? {
                      width: 5 * this.indicatorSet.width + "rpx",
                      height: this.indicatorSet.height + "rpx",
                      backgroundColor:
                        this.indicatorSet.selectedBackgroundColor,
                    }
                  : {
                      width: this.indicatorSet.width + "rpx",
                      height: this.indicatorSet.height + "rpx",
                      backgroundColor: this.indicatorSet.backgroundColor,
                    };
              },
              switchVideo: function () {
                this.showVideo = !this.showVideo;
              },
              swipeImg: function (t) {
                this.currentIndex = t.detail.current;
              },
              imgPreview: function (t) {
                this.preview && (this.showPreview = !this.showPreview);
              },
              init: function () {
                var e = this;
                (i = null),
                  (this.isShowBtn = this.imgList.length && this.videoUrl),
                  (this.nowShowSwiperType = 0),
                  (this.currentIndex = 0),
                  this.videoUrl
                    ? this.$nextTick(function () {
                        setTimeout(function () {
                          (i = t.createVideoContext(
                            "swiper-video",
                            e.$mp.component
                          )).seek(0),
                            i.play();
                        }, 15);
                      })
                    : (this.nowShowSwiperType = 1);
              },
              videoEnded: function () {
                this.nowShowSwiperType = 1;
              },
              changeNowShowSwiperType: function (t) {
                var e = this;
                0 == t
                  ? (i.seek(0),
                    i.play(),
                    setTimeout(function () {
                      e.nowShowSwiperType = t;
                    }, 15))
                  : (i.stop(), (this.nowShowSwiperType = t));
              },
            },
            watch: {
              nowShowSwiperType: function (t) {
                this.$emit("showVideo", 0 == t),
                  1 == t && (this.currentIndex = 0);
              },
            },
          };
        e.default = n;
      }).call(this, i("543d").default);
    },
    5390: function (t, e, i) {
      "use strict";
      var n = i("a251");
      i.n(n).a;
    },
    "65e5": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("01de"),
        o = i("d635");
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return o[t];
            });
          })(r);
      i("5390");
      var d = i("f0c5"),
        s = Object(d.a)(
          o.default,
          n.b,
          n.c,
          !1,
          null,
          "06dd387c",
          null,
          !1,
          n.a,
          void 0
        );
      e.default = s.exports;
    },
    a251: function (t, e, i) {},
    d635: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("070d1"),
        o = i.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(r);
      e.default = o.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/imageVideoSwiper/index-create-component",
    {
      "baseComponents/imageVideoSwiper/index-create-component": function (
        t,
        e,
        i
      ) {
        i("543d").createComponent(i("65e5"));
      },
    },
    [["baseComponents/imageVideoSwiper/index-create-component"]],
  ]);
