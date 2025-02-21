var t = require("../../../common/vendor.js"),
  e = require("./props.js"),
  i = require("../../libs/mixin/mpMixin.js"),
  a = require("../../libs/mixin/mixin.js"),
  n = {
    name: "u-tabbar-item",
    mixins: [i.mpMixin, a.mixin, e.props],
    data: function () {
      return {
        isActive: !1,
        parentData: { value: null, activeColor: "", inactiveColor: "" },
      };
    },
    options: { virtualHost: !0 },
    created: function () {
      this.init();
    },
    emits: ["click", "change"],
    methods: {
      init: function () {
        this.updateParentData(),
          this.parent ||
            t.index.$u.error("u-tabbar-item必须搭配u-tabbar组件使用");
        var e = this.parent.children.indexOf(this);
        this.isActive = (this.name || e) === this.parentData.value;
      },
      updateParentData: function () {
        this.getParentData("u-tabbar");
      },
      updateFromParent: function () {
        this.init();
      },
      clickHandler: function () {
        var t = this;
        this.$nextTick(function () {
          var e = t.parent.children.indexOf(t),
            i = t.name || e;
          i !== t.parent.value && t.parent.$emit("change", i),
            t.$emit("click", i);
        });
      },
    },
  };
Array || (t.resolveComponent("u-icon") + t.resolveComponent("u-badge"))();
Math ||
  (
    function () {
      return "../u-icon/u-icon.js";
    } +
    function () {
      return "../u-badge/u-badge.js";
    }
  )();
var r = t._export_sfc(n, [
  [
    "render",
    function (e, i, a, n, r, o) {
      return t.e(
        { a: e.icon },
        e.icon
          ? {
              b: t.p({
                name: e.icon,
                color: r.isActive
                  ? r.parentData.activeColor
                  : r.parentData.inactiveColor,
                size: 20,
              }),
            }
          : t.e({ c: r.isActive }, (r.isActive, {})),
        {
          d: t.p({
            absolute: !0,
            offset: [0, e.dot ? "34rpx" : e.badge > 9 ? "14rpx" : "20rpx"],
            customStyle: e.badgeStyle,
            isDot: e.dot,
            value: e.badge || (e.dot ? 1 : null),
            show: e.dot || e.badge > 0,
          }),
          e: t.t(e.text),
          f: r.isActive ? r.parentData.activeColor : r.parentData.inactiveColor,
          g: t.s(e.$u.addStyle(e.customStyle)),
          h: t.o(function () {
            return o.clickHandler && o.clickHandler.apply(o, arguments);
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-660b8720"],
]);
wx.createComponent(r);
