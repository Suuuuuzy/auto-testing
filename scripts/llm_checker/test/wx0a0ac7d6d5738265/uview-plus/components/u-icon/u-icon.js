var i = require("../../../common/vendor.js"),
  t = require("./icons.js"),
  e = require("./props.js"),
  n = require("../../libs/mixin/mpMixin.js"),
  s = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-icon",
    data: function () {
      return {};
    },
    emits: ["click"],
    mixins: [n.mpMixin, s.mixin, e.props],
    computed: {
      uClasses: function () {
        var t = [];
        return (
          t.push(this.customPrefix + "-" + this.name),
          this.color &&
            i.index.$u.config.type.includes(this.color) &&
            t.push("u-icon__icon--" + this.color),
          t
        );
      },
      iconStyle: function () {
        var t = {};
        return (
          (t = {
            fontSize: i.index.$u.addUnit(this.size),
            lineHeight: i.index.$u.addUnit(this.size),
            fontWeight: this.bold ? "bold" : "normal",
            top: i.index.$u.addUnit(this.top),
          }),
          this.color &&
            !i.index.$u.config.type.includes(this.color) &&
            (t.color = this.color),
          t
        );
      },
      isImg: function () {
        return -1 !== this.name.indexOf("/");
      },
      imgStyle: function () {
        var t = {};
        return (
          (t.width = this.width
            ? i.index.$u.addUnit(this.width)
            : i.index.$u.addUnit(this.size)),
          (t.height = this.height
            ? i.index.$u.addUnit(this.height)
            : i.index.$u.addUnit(this.size)),
          t
        );
      },
      icon: function () {
        return t.icons["uicon-" + this.name] || this.name;
      },
    },
    methods: {
      clickHandler: function (i) {
        this.$emit("click", this.index), this.stop && this.preventEvent(i);
      },
    },
  };
var d = i._export_sfc(o, [
  [
    "render",
    function (t, e, n, s, o, d) {
      return i.e(
        { a: d.isImg },
        d.isImg
          ? {
              b: t.name,
              c: t.imgMode,
              d: i.s(d.imgStyle),
              e: i.s(t.$u.addStyle(t.customStyle)),
            }
          : {
              f: i.t(d.icon),
              g: i.n(d.uClasses),
              h: i.s(d.iconStyle),
              i: i.s(t.$u.addStyle(t.customStyle)),
              j: t.hoverClass,
            },
        { k: "" !== t.label },
        "" !== t.label
          ? {
              l: i.t(t.label),
              m: t.labelColor,
              n: t.$u.addUnit(t.labelSize),
              o: "right" == t.labelPos ? t.$u.addUnit(t.space) : 0,
              p: "bottom" == t.labelPos ? t.$u.addUnit(t.space) : 0,
              q: "left" == t.labelPos ? t.$u.addUnit(t.space) : 0,
              r: "top" == t.labelPos ? t.$u.addUnit(t.space) : 0,
            }
          : {},
        {
          s: i.o(function () {
            return d.clickHandler && d.clickHandler.apply(d, arguments);
          }),
          t: i.n("u-icon--" + t.labelPos),
        }
      );
    },
  ],
  ["__scopeId", "data-v-42cc84bd"],
]);
wx.createComponent(d);
