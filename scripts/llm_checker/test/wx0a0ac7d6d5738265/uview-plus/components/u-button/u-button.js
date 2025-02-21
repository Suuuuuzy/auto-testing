var e = require("../../../common/vendor.js"),
  o = require("../../libs/mixin/button.js"),
  i = require("../../libs/mixin/openType.js"),
  t = require("../../libs/mixin/mpMixin.js"),
  n = require("../../libs/mixin/mixin.js"),
  r = require("./props.js"),
  s = {
    name: "u-button",
    mixins: [t.mpMixin, n.mixin, o.button, i.openType, r.props],
    data: function () {
      return {};
    },
    computed: {
      bemClass: function () {
        return this.color
          ? this.bem(
              "button",
              ["shape", "size"],
              ["disabled", "plain", "hairline"]
            )
          : this.bem(
              "button",
              ["type", "shape", "size"],
              ["disabled", "plain", "hairline"]
            );
      },
      loadingColor: function () {
        return this.plain
          ? this.color
            ? this.color
            : e.index.$u.config.color["u-".concat(this.type)]
          : "info" === this.type
          ? "#c9c9c9"
          : "rgb(200, 200, 200)";
      },
      iconColorCom: function () {
        return this.iconColor
          ? this.iconColor
          : this.plain
          ? this.color
            ? this.color
            : this.type
          : "info" === this.type
          ? "#000000"
          : "#ffffff";
      },
      baseColor: function () {
        var e = {};
        return (
          this.color &&
            ((e.color = this.plain ? this.color : "white"),
            this.plain || (e["background-color"] = this.color),
            -1 !== this.color.indexOf("gradient")
              ? ((e.borderTopWidth = 0),
                (e.borderRightWidth = 0),
                (e.borderBottomWidth = 0),
                (e.borderLeftWidth = 0),
                this.plain || (e.backgroundImage = this.color))
              : ((e.borderColor = this.color),
                (e.borderWidth = "1px"),
                (e.borderStyle = "solid"))),
          e
        );
      },
      nvueTextStyle: function () {
        var e = {};
        return (
          "info" === this.type && (e.color = "#323233"),
          this.color && (e.color = this.plain ? this.color : "white"),
          (e.fontSize = this.textSize + "px"),
          e
        );
      },
      textSize: function () {
        var e = 14,
          o = this.size;
        return (
          "large" === o && (e = 16),
          "normal" === o && (e = 14),
          "small" === o && (e = 12),
          "mini" === o && (e = 10),
          e
        );
      },
    },
    emits: [
      "click",
      "getphonenumber",
      "getuserinfo",
      "error",
      "opensetting",
      "launchapp",
    ],
    methods: {
      clickHandler: function () {
        var o = this;
        !this.disabled &&
          !this.loading &&
          e.index.$u.throttle(function () {
            o.$emit("click");
          }, this.throttleTime);
      },
      getphonenumber: function (e) {
        this.$emit("getphonenumber", e);
      },
      getuserinfo: function (e) {
        this.$emit("getuserinfo", e);
      },
      error: function (e) {
        this.$emit("error", e);
      },
      opensetting: function (e) {
        this.$emit("opensetting", e);
      },
      launchapp: function (e) {
        this.$emit("launchapp", e);
      },
    },
  };
Array ||
  (e.resolveComponent("u-loading-icon") + e.resolveComponent("u-icon"))();
Math ||
  (
    function () {
      return "../u-loading-icon/u-loading-icon.js";
    } +
    function () {
      return "../u-icon/u-icon.js";
    }
  )();
var l = e._export_sfc(s, [
  [
    "render",
    function (o, i, t, n, r, s) {
      return e.e(
        { a: o.loading },
        o.loading
          ? {
              b: e.p({
                mode: o.loadingMode,
                size: 1.15 * o.loadingSize,
                color: s.loadingColor,
              }),
              c: e.t(o.loadingText || o.text),
              d: e.s({ fontSize: s.textSize + "px" }),
            }
          : e.e(
              { e: o.icon },
              o.icon
                ? {
                    f: e.p({
                      name: o.icon,
                      color: s.iconColorCom,
                      size: 1.35 * s.textSize,
                      customStyle: { marginRight: "2px" },
                    }),
                  }
                : {},
              { g: e.t(o.text), h: e.s({ fontSize: s.textSize + "px" }) }
            ),
        {
          i: Number(o.hoverStartTime),
          j: Number(o.hoverStayTime),
          k: o.formType,
          l: o.openType,
          m: o.appParameter,
          n: o.hoverStopPropagation,
          o: o.sendMessageTitle,
          p: o.sendMessagePath,
          q: o.lang,
          r: o.dataName,
          s: o.sessionFrom,
          t: o.sendMessageImg,
          v: o.showMessageCard,
          w: e.o(function () {
            return s.getphonenumber && s.getphonenumber.apply(s, arguments);
          }),
          x: e.o(function () {
            return s.getuserinfo && s.getuserinfo.apply(s, arguments);
          }),
          y: e.o(function () {
            return s.error && s.error.apply(s, arguments);
          }),
          z: e.o(function () {
            return s.opensetting && s.opensetting.apply(s, arguments);
          }),
          A: e.o(function () {
            return s.launchapp && s.launchapp.apply(s, arguments);
          }),
          B: o.disabled || o.loading ? "" : "u-button--active",
          C: e.s(s.baseColor),
          D: e.s(o.$u.addStyle(o.customStyle)),
          E: e.o(function () {
            return s.clickHandler && s.clickHandler.apply(s, arguments);
          }),
          F: e.n(s.bemClass),
        }
      );
    },
  ],
  ["__scopeId", "data-v-5b42f52d"],
]);
wx.createComponent(l);
