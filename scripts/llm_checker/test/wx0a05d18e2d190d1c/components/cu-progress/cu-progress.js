(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/cu-progress/cu-progress"],
  {
    "1d5b": function (t, e, i) {},
    "5a2c": function (t, e, i) {
      i.r(e);
      var n = i("fdd7"),
        r = i.n(n);
      for (var a in n)
        "default" !== a &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(a);
      e.default = r.a;
    },
    "7b3d": function (t, e, i) {
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return r;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        r = [];
    },
    "889a": function (t, e, i) {
      i.r(e);
      var n = i("7b3d"),
        r = i("5a2c");
      for (var a in r)
        "default" !== a &&
          (function (t) {
            i.d(e, t, function () {
              return r[t];
            });
          })(a);
      i("9025");
      var s = i("f0c5"),
        h = Object(s.a)(
          r.default,
          n.b,
          n.c,
          !1,
          null,
          "04d9d90d",
          null,
          !1,
          n.a,
          void 0
        );
      e.default = h.exports;
    },
    9025: function (t, e, i) {
      var n = i("1d5b");
      i.n(n).a;
    },
    fdd7: function (t, e, i) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var i = {
          data: function () {
            return {
              scale: 1,
              percent: 0,
              showValue: 0,
              showVL: 0,
              handleMoveStatus: !1,
              handleX: 0,
              handleY: 0,
              progressBarInfo: { left: 0, bottom: 0, width: 0, height: 0 },
              area: { left: 0, bottom: 0, width: 0, height: 0, top: 0 },
              handle: { height: 0 },
            };
          },
          beforeMount: function () {
            var e = t.getSystemInfoSync();
            if (
              ((this.scale = 750 / e.windowWidth),
              this.maxValue - this.minValue != 0)
            ) {
              (this.showValue = this.valueFormat(this.value)),
                (this.percent =
                  (Math.abs(this.showValue - this.minValue) /
                    Math.abs(this.maxValue - this.minValue)) *
                  100);
              var i = this.textLength(this.minValue + this.infoEndText),
                n = this.textLength(this.maxValue + this.infoEndText);
              this.showVL = n > i ? n : i;
            } else
              console.error(
                "min不能等于max:" + this.minValue + "->" + this.maxValue
              );
          },
          mounted: function () {
            this.$nextTick(function () {
              var e = this,
                i = t.createSelectorQuery().in(this);
              i
                .select(".cu-progress-bar")
                .boundingClientRect(function (t) {
                  (e.progressBarInfo.width = t.width),
                    (e.progressBarInfo.left = t.left),
                    (e.progressBarInfo.bottom = t.bottom),
                    (e.progressBarInfo.height = t.height),
                    "vertical" == e.direction
                      ? (e.handleY =
                          (e.progressBarInfo.height * (100 - e.percent)) / 100)
                      : (e.handleX =
                          (e.progressBarInfo.width * e.percent) / 100);
                })
                .exec(),
                i
                  .select(".cu-area")
                  .boundingClientRect(function (t) {
                    (e.area.width = t.width),
                      (e.area.left = t.left),
                      (e.area.height = t.height),
                      (e.area.bottom = t.bottom),
                      (e.area.top = t.top);
                  })
                  .exec(),
                i
                  .select(".cu-handle")
                  .boundingClientRect(function (t) {
                    e.handle.height = t.height;
                  })
                  .exec();
            });
          },
          props: {
            infoAlign: { default: "right", type: String },
            step: { default: 1, type: [String, Number] },
            direction: { default: "horizontal", type: String },
            disabled: { default: !1, type: [String, Boolean] },
            bgBorderRadius: { default: 0, type: [Number, String] },
            iconBorderRadius: { default: "8px", type: [Number, String] },
            iconColor: { default: "inherit", type: String },
            iconSize: { default: "8px", type: [Number, String] },
            handleIcon: { default: "", type: String },
            backgroundColor: { default: "inherit", type: String },
            max: { default: 100, type: [String, Number] },
            min: { default: 0, type: [String, Number] },
            value: { default: null, type: [String, Number] },
            activeColor: { default: "#444444", type: String },
            noActiveColor: { default: "#888888", type: String },
            strokeWidth: { default: "3", type: [String, Number] },
            damping: { default: 100, type: [String, Number] },
            handleColor: { default: "#000000", type: String },
            handleSize: { default: "8px", type: [String, Number] },
            handleBorderRadius: { default: "8px", type: [String, Number] },
            showInfo: { default: !1, type: [Boolean, String] },
            infoSize: { default: "16px", type: [String, Number] },
            infoColor: { default: "#000000", type: String },
            infoEndText: { default: "", type: String },
            borderRadius: { default: 0, type: [String, Number] },
            width: { default: "200px", type: [String, Number] },
          },
          computed: {
            getShowInfoStatus2view: function () {
              return (
                (1 == this.showInfo || "true" == this.showInfo) &&
                "vertical" != this.direction
              );
            },
            showVLC: function () {
              var t = this.textLength(
                  this.minValue.toFixed(0) + this.infoEndText
                ),
                e = this.textLength(
                  this.maxValue.toFixed(0) + this.infoEndText
                );
              return e > t ? e : t;
            },
            flexDirection: function () {
              return "vertical" == this.direction ? "column" : "row";
            },
            pgBarBottom: function () {
              return "vertical" == this.direction ? "0px" : "unset";
            },
            showInfoStatus: function () {
              return !(
                !this.getShowInfoStatus() || "vertical" == this.direction
              );
            },
            pgBarBg: function () {
              var t;
              return (
                "vertical" == this.direction
                  ? (t =
                      "linear-gradient(to top," +
                      this.activeColor +
                      " " +
                      this.percent +
                      "%," +
                      this.noActiveColor +
                      " " +
                      this.percent +
                      "%)")
                  : ((t =
                      "linear-gradient(to right," +
                      this.activeColor +
                      " " +
                      this.percent +
                      "%," +
                      this.noActiveColor +
                      " " +
                      this.percent +
                      "%)"),
                    this.activeColor,
                    this.percent,
                    this.noActiveColor,
                    this.percent,
                    this.activeColor,
                    this.percent,
                    this.noActiveColor,
                    this.percent,
                    this.activeColor,
                    this.percent,
                    this.noActiveColor,
                    this.percent),
                t
              );
            },
            pgBarBR: function () {
              return this.sizeDeal(this.borderRadius)[2];
            },
            bgBR: function () {
              return this.sizeDeal(this.bgBorderRadius)[2];
            },
            iconBR: function () {
              return this.sizeDeal(this.iconBorderRadius)[2];
            },
            iconS: function () {
              return this.sizeDeal(this.iconSize)[2];
            },
            infoW: function () {
              var t = this.sizeDeal(this.infoSize);
              return t[0] * this.showVL + t[1];
            },
            infoS: function () {
              return this.sizeDeal(this.infoSize)[2];
            },
            infoRt: function () {
              return "left" == this.infoAlign && "vertical" != this.direction
                ? "unset"
                : 0;
            },
            infoLt: function () {
              return "left" == this.infoAlign && "vertical" != this.direction
                ? 0
                : "center" == this.infoAlign && "vertical" != this.direction
                ? this.area.width / 2 -
                  (this.sizeDeal(this.infoSize)[0] * this.showVL) / 2 +
                  "px"
                : "unset";
            },
            areaW: {
              get: function () {
                if ("vertical" == this.direction) return this.maxHeight(!0)[2];
                var t = this.sizeDeal(this.infoSize);
                return (
                  this.maxHeight(),
                  this.getShowInfoStatus()
                    ? "calc(" +
                      this.width +
                      " - " +
                      t[0] * this.showVL +
                      t[1] +
                      ")"
                    : this.width
                );
              },
              set: function (t) {
                return t;
              },
            },
            areaH: {
              get: function () {
                return "vertical" == this.direction
                  ? this.width
                  : this.maxHeight()[2];
              },
              set: function (t) {
                return t;
              },
            },
            areaLeft: function () {
              if ("left" == this.infoAlign && "vertical" != this.direction) {
                var t = this.sizeDeal(this.infoSize);
                return t[0] * this.showVL + t[1];
              }
              return 0;
            },
            pgBarW: function () {
              if ("vertical" == this.direction)
                return this.sizeDeal(this.strokeWidth)[2];
              var t = this.sizeDeal(this.infoSize),
                e = this.sizeDeal(this.width),
                i = this.sizeDeal(this.handleSize);
              return this.getShowInfoStatus()
                ? "calc(" +
                    e[2] +
                    " - " +
                    t[0] * this.showVL +
                    t[1] +
                    " - " +
                    i[2] +
                    ")"
                : "calc(" + e[2] + " - " + i[2] + ")";
            },
            pgBarH: function () {
              if ("vertical" == this.direction) {
                var t = this.sizeDeal(this.width),
                  e = this.sizeDeal(this.handleSize);
                return "calc(" + t[2] + " - " + e[2] + ")";
              }
              return this.sizeDeal(this.strokeWidth)[2];
            },
            pgBarML: function () {
              if ("vertical" == this.direction) {
                var t = this.sizeDeal(this.progressBarInfo.width);
                return Number(this.area.width) / 2 - t[0] / 2 + "px";
              }
              var e = this.sizeDeal(this.handleSize);
              return e[0] / 2 + e[1];
            },
            pgBarMB: function () {
              if ("vertical" == this.direction) {
                var t = this.sizeDeal(this.handleSize);
                return t[0] / 2 + t[1];
              }
              return 0;
            },
            handleS: function () {
              return this.sizeDeal(this.handleSize)[2];
            },
            handleL: function () {
              if ("vertical" == this.direction) {
                var t = this.sizeDeal(this.handleSize);
                return Number(this.area.width) / 2 - t[0] / 2 + "px";
              }
              return "unset";
            },
            handleT: function () {
              if (this.area.height && "vertical" != this.direction) {
                var t = this.sizeDeal(this.handleSize);
                return Number(this.area.height) / 2 - t[0] / 2 + "px";
              }
              return "unset";
            },
            handleBR: function () {
              return this.sizeDeal(this.handleBorderRadius)[2];
            },
            progressMainW: function () {
              return "vertical" == this.direction
                ? this.maxHeight(!0)[2]
                : this.width;
            },
            progressMainH: function () {
              return "vertical" == this.direction
                ? this.width
                : this.maxHeight()[2];
            },
            maxValue: function () {
              var t = Number.isNaN(parseFloat(this.max))
                ? 100
                : parseFloat(this.max);
              return this.valueFormat(t);
            },
            minValue: function () {
              var t = Number.isNaN(parseFloat(this.min))
                  ? 0
                  : parseFloat(this.min),
                e = this.getStepInfo();
              return Number(t.toFixed(e[1]));
            },
          },
          watch: {
            showVLC: function (t) {
              if (((this.showVL = t), "vertical" != this.direction)) {
                var e,
                  i = this.sizeDeal(this.infoSize),
                  n = this.maxHeight();
                (e = this.getShowInfoStatus()
                  ? "calc(" +
                    this.width +
                    " - " +
                    i[0] * this.showVL +
                    i[1] +
                    ")"
                  : this.width),
                  (this.areaW = e),
                  (this.areaH = n[2]);
              }
              this.clientInit();
            },
            value: function (t) {
              this.handleMoveStatus ||
                ((this.showValue = this.valueFormat(t)),
                (this.percent =
                  ((this.showValue - this.minValue) /
                    Math.abs(this.maxValue - this.minValue)) *
                  100),
                "vertical" == this.direction
                  ? (this.handleY =
                      (this.progressBarInfo.height * this.percent) / 100)
                  : (this.handleX =
                      (this.progressBarInfo.width * this.percent) / 100));
            },
          },
          methods: {
            valueFormat: function (t) {
              t = Number(t - this.minValue).toFixed(7);
              var e = this.getStepInfo(),
                i = t * Math.pow(10, e[1]),
                n = i % (e[0] * Math.pow(10, e[1])),
                r = Math.floor(n),
                a = (Math.floor(i) - r) / Math.pow(10, e[1]);
              return Number((a + this.minValue).toFixed(6));
            },
            getStepInfo: function () {
              var t = Number(this.step);
              if (t <= 0 || !t) return [1, 0];
              var e = t.toString().split(".");
              return 1 == e.length ? [t, 0] : [t, e[1].length];
            },
            clientInit: function () {
              this.$nextTick(function () {
                var e = this,
                  i = t.createSelectorQuery().in(this);
                if (
                  (i
                    .select(".cu-progress-bar")
                    .boundingClientRect(function (t) {
                      (e.progressBarInfo.width = t.width),
                        (e.progressBarInfo.left = t.left),
                        (e.progressBarInfo.bottom = t.bottom),
                        (e.progressBarInfo.height = t.height),
                        "vertical" == e.direction
                          ? (e.handleY =
                              (e.progressBarInfo.height * e.percent) / 100)
                          : (e.handleX =
                              (e.progressBarInfo.width * e.percent) / 100);
                    })
                    .exec(),
                  i
                    .select(".cu-area")
                    .boundingClientRect(function (t) {
                      (e.area.width = t.width),
                        (e.area.left = t.left),
                        (e.area.height = t.height),
                        (e.area.bottom = t.bottom),
                        (e.area.top = t.top);
                    })
                    .exec(),
                  this.maxValue - this.minValue == 0)
                )
                  console.error(
                    "min不能等于max:" + this.minValue + "->" + this.maxValue
                  );
                else {
                  var n = this.getStepInfo(),
                    r =
                      ((this.percent * (this.maxValue - this.minValue)) / 100) *
                      Math.pow(10, n[1]),
                    a = r % (n[0] * Math.pow(10, n[1])),
                    s = Math.floor(a),
                    h = (Math.floor(r) - s) / Math.pow(10, n[1]);
                  this.showValue = h;
                }
              });
            },
            getShowInfoStatus: function () {
              return (
                (1 == this.showInfo || "true" == this.showInfo) &&
                "vertical" != this.direction &&
                "center" !== this.infoAlign
              );
            },
            textLength: function (t) {
              var e = (t = t.toString()).split(".")[0],
                i = t.match(/[^\x00-\xff]/g),
                n = 0;
              i && (n = i.length);
              var r =
                ((e.length - n + this.getStepInfo()[1]) / 3) * 2 + n + 0.2;
              return Number(r.toFixed(2));
            },
            maxHeight: function (t) {
              var e = [];
              return (
                t ||
                  (this.infoEndText.match(/[^\x00-\xff]/g)
                    ? e.push(1.1 * this.sizeDeal(this.infoSize)[0])
                    : e.push(this.sizeDeal(this.infoSize)[0])),
                e.push(this.sizeDeal(this.strokeWidth)[0]),
                e.push(this.sizeDeal(this.handleSize)[0]),
                e.sort(function (t, e) {
                  return e - t;
                }),
                [e[0], "px", e[0] + "px"]
              );
            },
            sizeDeal: function (t) {
              var e = Number.isNaN(parseFloat(t)) ? 0 : parseFloat(t),
                i = t.toString().replace(/[0-9]/g, "");
              return (
                "rpx" == i
                  ? ((e /= this.scale), (i = "px"))
                  : "" == i
                  ? (i = "px")
                  : "vw" == i &&
                    ((i = "px"), (e = ((e / 100) * 750) / this.scale)),
                [e, i, e + i]
              );
            },
            change: function () {
              this.$emit("change", { type: "change", value: this.showValue });
            },
            handleMove: function (t) {
              var e = t;
              e = e >= 0 ? e : 0;
              var i,
                n = this.sizeDeal(this.handleSize);
              if ("vertical" == this.direction) {
                i =
                  (i =
                    (i =
                      (e = e - this.area.top - n[0] / 2) /
                      (this.area.height - n[0] - 1)) <= 1
                      ? i
                      : 1) > 0
                    ? i
                    : 0;
                var r =
                  Number((1 - i) * (this.maxValue - this.minValue)) +
                  this.minValue;
                (this.percent = 100 * (1 - i)),
                  (this.showValue = this.valueFormat(r)),
                  (this.handleY = e);
              } else {
                i =
                  (i = (i = e / (this.area.width - n[0] - 1)) <= 1 ? i : 1) > 0
                    ? i
                    : 0;
                var a =
                  Number(i * (this.maxValue - this.minValue)) + this.minValue;
                (this.percent = 100 * i),
                  (this.showValue = this.valueFormat(a)),
                  (this.handleX = e);
              }
              this.$emit("dragging", {
                type: "dragging",
                value: this.showValue,
              });
            },
            touchEnd: function () {
              this.disabled ||
                ((this.handleMoveStatus = !1),
                this.$emit("dragged", {
                  type: "dragged",
                  value: this.showValue,
                }));
            },
            areaTouchStart: function (t) {
              if (!this.disabled) {
                this.handleMoveStatus = !0;
                var e,
                  i = this.sizeDeal(this.handleSize);
                (e =
                  (e =
                    "vertical" == this.direction
                      ? t.changedTouches[0].pageY
                      : t.changedTouches[0].pageX -
                        this.area.left -
                        i[0] / 2) >= 0
                    ? e
                    : 0),
                  this.handleMove(e),
                  this.$emit("dragstart", {
                    type: "dragstart",
                    value: this.showValue,
                  });
              }
            },
            areaTouchMove: function (t) {
              if (!this.disabled) {
                var e,
                  i = this.sizeDeal(this.handleSize);
                (e =
                  (e =
                    "vertical" == this.direction
                      ? t.changedTouches[0].pageY
                      : t.changedTouches[0].pageX -
                        this.area.left -
                        i[0] / 2) >= 0
                    ? e
                    : 0),
                  this.handleMove(e);
              }
            },
            touchCancel: function () {
              this.disabled ||
                (this.touchEnd(),
                this.$emit("dragcancel", {
                  type: "dragcancel",
                  value: this.showValue,
                }));
            },
          },
        };
        e.default = i;
      }).call(this, i("543d").default);
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/cu-progress/cu-progress-create-component",
    {
      "components/cu-progress/cu-progress-create-component": function (
        t,
        e,
        i
      ) {
        i("543d").createComponent(i("889a"));
      },
    },
    [["components/cu-progress/cu-progress-create-component"]],
  ]);
