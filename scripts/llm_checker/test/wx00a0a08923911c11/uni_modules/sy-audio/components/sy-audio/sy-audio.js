(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["uni_modules/sy-audio/components/sy-audio/sy-audio"],
  {
    "7c2d": function (t, e, i) {
      "use strict";
      var n = i("ab56"),
        o = i.n(n);
      o.a;
    },
    "85c5": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("cd57"),
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
    ab56: function (t, e, i) {},
    cd57: function (t, e, i) {
      "use strict";
      (function (t) {
        var n = i("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = n(i("2eee")),
          a = n(i("c973")),
          u = n(i("7037"));
        e.default = {
          name: "syAudio",
          emits: [
            "audioPlay",
            "audioPause",
            "audioEnd",
            "audioCanplay",
            "change",
            "changevoice",
          ],
          data: function () {
            return {
              audio_status: !1,
              timeTxt: "00:00",
              sliderIndex: 0,
              sliderTxt: "00:00",
              maxSliderIndex: 100,
              left: "0",
              lastUpdateTime: 0,
              stringObject: function (t) {
                return (0, u.default)(t);
              },
              innerAudioContext: "",
            };
          },
          props: {
            bookId: { type: String, default: "" },
            isTone: { type: Number, default: 1 },
            isUserShelf: { type: Boolean, default: !1 },
            autoplay: { type: Boolean, default: !1 },
            src: { type: [String, Array], default: "" },
            isCountDown: { type: Boolean, default: !1 },
            audioCover: { type: String, default: "" },
            audioTitle: { type: String, default: "new Audio Title" },
            audioAuthor: { type: String, default: "new Audio Title" },
            audioTitleColor: { type: String, default: "#333" },
            subheading: { type: String, default: "new Audio Subheading" },
            activeColor: { type: String, default: "#FE6868" },
            backgroundColor: { type: String, default: "#F1F2F3" },
          },
          beforeMount: function () {},
          mounted: function () {
            var t = this;
            return (0, a.default)(
              o.default.mark(function e() {
                return o.default.wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        t.createAudio();
                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )();
          },
          methods: {
            createAudio: function () {
              var e = this;
              (this.innerAudioContext.src =
                "string" == typeof this.src ? this.src : this.src[0]),
                (this.innerAudioContext.obeyMuteSwitch = !0),
                "ios" == t.getSystemInfoSync().platform &&
                  (this.innerAudioContext.title = this.audioTitle),
                this.innerAudioContext.onPlay(function () {
                  console.log("onPlay"),
                    (e.sliderTxt = e.getTime(
                      parseFloat(e.innerAudioContext.duration).toFixed(2)
                    )),
                    (e.maxSliderIndex = parseFloat(
                      e.innerAudioContext.duration
                    ).toFixed(2));
                }),
                this.playHistory(),
                this.innerAudioContext.onPause(function () {
                  e.$emit("audioPause");
                }),
                this.innerAudioContext.onEnded(function () {
                  (e.audio_status = !e.audio_status),
                    e.innerAudioContext.pause(),
                    e.$emit("audioEnd");
                }),
                this.innerAudioContext.onCanplay(function (t) {
                  e.$emit("audioCanplay"),
                    (e.maxSliderIndex = parseFloat(
                      e.innerAudioContext.duration
                    ).toFixed(2));
                }),
                this.innerAudioContext.onPause(function () {
                  e.$emit("change", {
                    state: !1,
                    currentTime: e.innerAudioContext.currentTime,
                  });
                }),
                this.innerAudioContext.onTimeUpdate(function () {
                  var t = Date.now();
                  t - e.lastUpdateTime > 500 &&
                    ((e.sliderIndex = parseFloat(
                      e.innerAudioContext.currentTime
                    ).toFixed(2)),
                    (e.timeTxt = e.getTime(e.innerAudioContext.currentTime)),
                    (e.sliderTxt = e.getTime(
                      parseFloat(e.innerAudioContext.duration).toFixed(2)
                    )),
                    e.$emit("change", {
                      state: !0,
                      currentTime: e.innerAudioContext.currentTime,
                    }),
                    (e.lastUpdateTime = t));
                });
            },
            audioDestroy: function () {
              this.innerAudioContext &&
                (console.log("audioDestroy"),
                (this.audio_status = !1),
                this.innerAudioContext.pause(),
                (this.src = ""),
                (this.innerAudioContext.src = ""),
                (this.innerAudioContext.title = ""));
            },
            audioPause: function () {
              this.clickAudio();
            },
            clickAudio: function () {
              this.audio_status && !this.innerAudioContext.paused
                ? this.innerAudioContext.pause()
                : this.innerAudioContext.play(),
                (this.audio_status = !this.audio_status);
            },
            getTime: function (t) {
              var e = parseInt(t / 60);
              e = e < 10 ? "0" + e : e;
              var i = parseInt(t % 60);
              return (i = i < 10 ? "0" + i : i), e + " : " + i;
            },
            sliderChange: function (t) {
              this.innerAudioContext.seek(t.detail ? t.detail.value : t),
                (this.sliderIndex = t.detail ? t.detail.value : t);
            },
            filechange: function (t, e) {
              this.audioDestroy(), (this.src = t), (this.bookId = e);
            },
            playHistory: function () {
              if (t.getStorageSync("audio" + this.bookId)) {
                console.log("听过音频");
                var e = t.getStorageSync("audio" + this.bookId);
                this.innerAudioContext.seek(e),
                  (this.innerAudioContext.startTime = e),
                  (this.innerAudioContext.currentTime = e);
              } else
                console.log("没有听过音频"),
                  this.innerAudioContext.seek(0),
                  (this.innerAudioContext.startTime = 0);
              (this.audio_status = !0), this.innerAudioContext.play();
            },
            clickVoice: function (e) {
              var i = this;
              if (this.isTone == e) return !1;
              this.bookId &&
                t.setStorageSync(
                  "audio" + this.bookId,
                  this.innerAudioContext.currentTime
                ),
                this.audioDestroy(),
                (this.isTone = 1 == e ? 1 : 2),
                this.$get(this.$api.bookaudio, {
                  bookId: this.bookId,
                  tone: this.isTone,
                }).then(function (e) {
                  (i.src = e.data.url),
                    (i.innerAudioContext.src = e.data.url),
                    (i.audioTitle = e.data.bookName);
                  var n = t.getStorageSync("audio" + i.bookId);
                  i.createAudio(), (i.innerAudioContext.startTime = n);
                }),
                this.$emit("changevoice", { isVoice: e });
            },
            toRead: function () {
              this.audioDestroy(),
                this.bookId &&
                  t.setStorageSync(
                    "audio" + this.bookId,
                    this.innerAudioContext.currentTime
                  ),
                this.goNext(
                  "/pages/readPage/chapter?bookId=" +
                    this.bookId +
                    "&chapterId="
                );
            },
            addShelfFun: function () {
              var e = this;
              this.$post(this.$api.shelfadd, { bookId: this.bookId }).then(
                function (i) {
                  i.success &&
                    (e.$parent.changeBookStatus(),
                    t.showToast({
                      title: "已加入书架",
                      icon: "none",
                      duration: 1e3,
                    }),
                    t.setStorageSync("isShelf", !0));
                }
              );
            },
          },
        };
      }).call(this, i("543d")["default"]);
    },
    f946: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("fc2a"),
        o = i("85c5");
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return o[t];
            });
          })(a);
      i("7c2d");
      var u,
        r = i("f0c5"),
        s = Object(r["a"])(
          o["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "2f3f1529",
          null,
          !1,
          n["a"],
          u
        );
      e["default"] = s.exports;
    },
    fc2a: function (t, e, i) {
      "use strict";
      var n;
      i.d(e, "b", function () {
        return o;
      }),
        i.d(e, "c", function () {
          return a;
        }),
        i.d(e, "a", function () {
          return n;
        });
      var o = function () {
          var t = this,
            e = t.$createElement,
            i = (t._self._c, t.stringObject(t.src));
          t.$mp.data = Object.assign({}, { $root: { m0: i } });
        },
        a = [];
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "uni_modules/sy-audio/components/sy-audio/sy-audio-create-component",
  {
    "uni_modules/sy-audio/components/sy-audio/sy-audio-create-component":
      function (module, exports, __webpack_require__) {
        __webpack_require__("543d")["createComponent"](
          __webpack_require__("f946")
        );
      },
  },
  [["uni_modules/sy-audio/components/sy-audio/sy-audio-create-component"]],
]);
