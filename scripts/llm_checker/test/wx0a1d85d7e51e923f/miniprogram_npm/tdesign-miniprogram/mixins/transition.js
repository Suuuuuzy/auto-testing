Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = function () {
    return Behavior({
      properties: {
        visible: { type: Boolean, value: null, observer: "watchVisible" },
        appear: Boolean,
        name: { type: String, value: "fade" },
        durations: { type: Number, optionalTypes: [Array] },
      },
      data: {
        transitionClass: "",
        transitionDurations: 300,
        className: "",
        realVisible: !1,
      },
      created: function () {
        (this.status = ""), (this.transitionT = 0);
      },
      attached: function () {
        (this.durations = this.getDurations()),
          this.data.visible && this.enter(),
          (this.inited = !0);
      },
      detached: function () {
        clearTimeout(this.transitionT);
      },
      methods: {
        watchVisible: function (t, i) {
          this.inited && t !== i && (t ? this.enter() : this.leave());
        },
        getDurations: function () {
          var t = this.data.durations;
          return Array.isArray(t)
            ? t.map(function (t) {
                return Number(t);
              })
            : [Number(t), Number(t)];
        },
        enter: function () {
          var t = this,
            a = this.data.name,
            s = i(this.durations, 1)[0];
          (this.status = "entering"),
            this.setData({
              realVisible: !0,
              transitionClass: ""
                .concat(e, "-")
                .concat(a, "-enter ")
                .concat(e, "-")
                .concat(a, "-enter-active"),
            }),
            setTimeout(function () {
              t.setData({
                transitionClass: ""
                  .concat(e, "-")
                  .concat(a, "-enter-active ")
                  .concat(e, "-")
                  .concat(a, "-enter-to"),
              });
            }, 30),
            "number" == typeof s &&
              s > 0 &&
              (this.transitionT = setTimeout(this.entered.bind(this), s + 30));
        },
        entered: function () {
          (this.customDuration = !1),
            clearTimeout(this.transitionT),
            (this.status = "entered"),
            this.setData({ transitionClass: "" });
        },
        leave: function () {
          var t = this,
            a = this.data.name,
            s = i(this.durations, 2)[1];
          (this.status = "leaving"),
            this.setData({
              transitionClass: ""
                .concat(e, "-")
                .concat(a, "-leave  ")
                .concat(e, "-")
                .concat(a, "-leave-active"),
            }),
            clearTimeout(this.transitionT),
            setTimeout(function () {
              t.setData({
                transitionClass: ""
                  .concat(e, "-")
                  .concat(a, "-leave-active ")
                  .concat(e, "-")
                  .concat(a, "-leave-to"),
              });
            }, 30),
            "number" == typeof s &&
              s > 0 &&
              ((this.customDuration = !0),
              (this.transitionT = setTimeout(this.leaved.bind(this), s + 30)));
        },
        leaved: function () {
          (this.customDuration = !1),
            this.triggerEvent("leaved"),
            clearTimeout(this.transitionT),
            (this.status = "leaved"),
            this.setData({ transitionClass: "" });
        },
        onTransitionEnd: function () {
          this.customDuration ||
            (clearTimeout(this.transitionT),
            "entering" === this.status && this.data.visible
              ? this.entered()
              : "leaving" !== this.status ||
                this.data.visible ||
                (this.leaved(), this.setData({ realVisible: !1 })));
        },
      },
    });
  });
var t,
  i = require("../../../@babel/runtime/helpers/slicedToArray");
var e = ((t = require("../common/config")) && t.__esModule ? t : { default: t })
  .default.prefix;
