var e = require("../../../common/vendor.js"),
  n = require("./value.js"),
  t = require("../../libs/mixin/mpMixin.js"),
  i = require("../../libs/mixin/mixin.js"),
  o = require("../../libs/mixin/button.js"),
  r = require("../../libs/mixin/openType.js"),
  s = require("./props.js"),
  u = {
    name: "u--text",
    mixins: [t.mpMixin, i.mixin, n.value, o.button, r.openType, s.props],
    emits: ["click"],
    computed: {
      valueStyle: function () {
        var n = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: e.index.$u.addUnit(this.size),
        };
        return (
          !this.type && (n.color = this.color),
          this.isNvue && this.lines && (n.lines = this.lines),
          this.lineHeight &&
            (n.lineHeight = e.index.$u.addUnit(this.lineHeight)),
          !this.isNvue && this.block && (n.display = "block"),
          e.index.$u.deepMerge(n, e.index.$u.addStyle(this.customStyle))
        );
      },
      isNvue: function () {
        return !1;
      },
      isMp: function () {
        return !0, !0;
      },
    },
    data: function () {
      return {};
    },
    methods: {
      clickHandler: function () {
        this.call &&
          "phone" === this.mode &&
          e.index.makePhoneCall({ phoneNumber: this.text }),
          this.$emit("click");
      },
    },
  };
Array || (e.resolveComponent("u-icon") + e.resolveComponent("u-link"))();
Math ||
  (
    function () {
      return "../u-icon/u-icon.js";
    } +
    function () {
      return "../u-link/u-link.js";
    }
  )();
var l = e._export_sfc(u, [
  [
    "render",
    function (n, t, i, o, r, s) {
      return e.e(
        { a: n.show },
        n.show
          ? e.e(
              { b: "price" === n.mode },
              "price" === n.mode
                ? {
                    c: e.n(n.type && "u-text__value--".concat(n.type)),
                    d: e.s(s.valueStyle),
                  }
                : {},
              { e: n.prefixIcon },
              n.prefixIcon
                ? {
                    f: e.p({
                      name: n.prefixIcon,
                      customStyle: n.$u.addStyle(n.iconStyle),
                    }),
                  }
                : {},
              { g: "link" === n.mode },
              "link" === n.mode
                ? { h: e.p({ text: n.value, href: n.href, underLine: !0 }) }
                : n.openType && s.isMp
                ? {
                    j: e.t(n.value),
                    k: e.s(s.valueStyle),
                    l: n.index,
                    m: n.openType,
                    n: e.o(function () {
                      return (
                        n.onGetUserInfo && n.onGetUserInfo.apply(n, arguments)
                      );
                    }),
                    o: e.o(function () {
                      return n.onContact && n.onContact.apply(n, arguments);
                    }),
                    p: e.o(function () {
                      return (
                        n.onGetPhoneNumber &&
                        n.onGetPhoneNumber.apply(n, arguments)
                      );
                    }),
                    q: e.o(function () {
                      return n.onError && n.onError.apply(n, arguments);
                    }),
                    r: e.o(function () {
                      return n.onLaunchApp && n.onLaunchApp.apply(n, arguments);
                    }),
                    s: e.o(function () {
                      return (
                        n.onOpenSetting && n.onOpenSetting.apply(n, arguments)
                      );
                    }),
                    t: n.lang,
                    v: n.sessionFrom,
                    w: n.sendMessageTitle,
                    x: n.sendMessagePath,
                    y: n.sendMessageImg,
                    z: n.showMessageCard,
                    A: n.appParameter,
                  }
                : {
                    B: e.t(n.value),
                    C: e.s(s.valueStyle),
                    D: e.n(n.type && "u-text__value--".concat(n.type)),
                    E: e.n(n.lines && "u-line-".concat(n.lines)),
                  },
              { i: n.openType && s.isMp, F: n.suffixIcon },
              n.suffixIcon
                ? {
                    G: e.p({
                      name: n.suffixIcon,
                      customStyle: n.$u.addStyle(n.iconStyle),
                    }),
                  }
                : {},
              {
                H: n.margin,
                I:
                  "left" === n.align
                    ? "flex-start"
                    : "center" === n.align
                    ? "center"
                    : "flex-end",
                J: e.o(function () {
                  return s.clickHandler && s.clickHandler.apply(s, arguments);
                }),
              }
            )
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-7ced952d"],
]);
wx.createComponent(l);
