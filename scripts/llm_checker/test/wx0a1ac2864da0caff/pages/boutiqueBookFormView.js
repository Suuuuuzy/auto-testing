(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutiqueBookFormView"],
  {
    "489a": function (t, e, i) {
      "use strict";
      (function (t) {
        var n = i("47a9");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = n(i("7ca3")),
          a = i("8f59"),
          r = (n(i("f811")), i("4bd4")),
          c = n(i("e94a"));
        i("7791");
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
        var s = {
          config: { navigationStyle: "custom", disableScroll: !0 },
          components: {
            ppNav: function () {
              i.e("components/pp/Nav")
                .then(
                  function () {
                    return resolve(i("ac66"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
          },
          computed: (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var i = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? u(Object(i), !0).forEach(function (e) {
                    (0, o.default)(t, e, i[e]);
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
            (0, a.mapState)({
              user: function (t) {
                return t.user;
              },
              code: function (t) {
                return t.code;
              },
              navigationBarHeight: function (t) {
                return t.navigationBarHeight;
              },
              navigationBarHeightPlaceholder: function (t) {
                return t.navigationBarHeightPlaceholder;
              },
              bookCache: function (t) {
                return t.bookCache;
              },
              likedWatch: function (t) {
                return t.likedWatch;
              },
            })
          ),
          data: function () {
            return {
              detail: null,
              previewThumb: "",
              gender: 1,
              lastname: "",
              firstname: "",
              lastname_pinyin: "",
              firstname_pinyin: "",
              phone: "",
              code_sms: "",
              province: "",
              city: "",
              service: "",
              series: "",
              cert: [],
              audio: "",
              others: "",
              checked: !1,
              serviceList: [
                "表带更换",
                "腕表检测",
                "维修保养（保质期内需携带腕表证书）",
                "日常保养",
              ],
              showMore: !1,
              smsStatus: !1,
              smsText: "获取",
              smsTimer: null,
              smsTime: 60,
              audioStartTime: 0,
              audioFile: "",
              audioDuration: "",
              audioCtx: null,
              percent: 0,
              recorderManager: null,
              likedWatchLength: 0,
            };
          },
          methods: {
            nextBook: function () {
              var t = this;
              this.$http.takeWatch(
                { token: this.bookCache.token },
                function (e) {
                  t.$alert({
                    title: "取表申请",
                    content: "收到您的取表申请，工作人员将尽快与您联系",
                    showCancel: !1,
                    confirmText: "我知道了",
                    success: function () {
                      t.$router.replace("index");
                    },
                  });
                }
              );
            },
            toggleAudio: function () {
              var e = this;
              this.audioCtx ||
                ((this.audioCtx = t.createInnerAudioContext()),
                this.audioCtx.onPlay(function () {
                  console.log("start");
                }),
                setTimeout(function () {
                  e.audioCtx.currentTime,
                    e.audioCtx.onTimeUpdate(function () {
                      (e.percent = Math.ceil(
                        (e.audioCtx.currentTime / e.audioCtx.duration) * 100
                      )),
                        console.log(e.percent);
                    });
                }, 100),
                this.audioCtx.onEnded(function () {
                  e.percent = 100;
                })),
                (this.audioCtx.obeyMuteSwitch = !1),
                this.audioCtx.src !== this.audioFile &&
                  (this.audioCtx.src = this.audioFile),
                this.audioCtx.paused || 100 === this.percent
                  ? ((this.audioCtx.startTime = 0),
                    this.audioCtx.play(),
                    this.audioCtx.seek(0))
                  : this.audioCtx.pause();
            },
          },
          mounted: function () {
            this.bookCache.watch_cert_pic
              ? (this.cert = this.bookCache.watch_cert_pic.split(";"))
              : (this.cert = []);
          },
          onShow: function () {
            this.detail || this.$store.commit("UPDATE_LIKED_WATCH", []),
              (this.likedWatchLength = this.likedWatch.length);
            var t = this.$root.$mp.query;
            if (!t || !t.id)
              return (
                (this.detail = null),
                void this.$alert("获取参数错误，请返回后重试")
              );
            if (!this.detail || this.detail.id !== t.id) {
              var e = (0, r.getBoutiqueById)(t.id);
              e && c.default[t.id]
                ? ((e = Object.assign(e, c.default[t.id])),
                  e.view && (this.previewThumb = e.thumb),
                  (this.detail = e))
                : this.$alert("当前店铺不支持预约");
            }
          },
          onShareAppMessage: function (t) {
            var e = "/pages/index?path=boutique%3Fid%3D".concat(this.detail.id),
              i = this.previewThumb;
            return { title: "百达翡丽时计查询", path: e, imageUrl: i };
          },
        };
        e.default = s;
      }).call(this, i("df3c")["default"]);
    },
    8174: function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return o;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this.$createElement,
            e =
              (this._self._c,
              this.detail && this.bookCache
                ? this.cert && this.cert.length > 0
                : null);
          this.$mp.data = Object.assign({}, { $root: { g0: e } });
        },
        o = [];
    },
    "8e72": function (t, e, i) {
      "use strict";
      var n = i("c17b"),
        o = i.n(n);
      o.a;
    },
    a48c: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("8174"),
        o = i("cdd8");
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return o[t];
            });
          })(a);
      i("8e72");
      var r = i("828b"),
        c = Object(r["a"])(
          o["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "2fa43990",
          null,
          !1,
          n["a"],
          void 0
        );
      e["default"] = c.exports;
    },
    c17b: function (t, e, i) {},
    cdd8: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("489a"),
        o = i.n(n);
      for (var a in n)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(a);
      e["default"] = o.a;
    },
    f663: function (t, e, i) {
      "use strict";
      (function (t, e) {
        var n = i("47a9");
        i("b45a");
        n(i("3240"));
        var o = n(i("a48c"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), e(o.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
  },
  [["f663", "common/runtime", "common/vendor"]],
]);
