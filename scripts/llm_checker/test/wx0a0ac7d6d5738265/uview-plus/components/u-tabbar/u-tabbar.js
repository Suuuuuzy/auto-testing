var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../common/vendor.js"),
  n = require("./props.js"),
  i = require("../../libs/mixin/mpMixin.js"),
  o = require("../../libs/mixin/mixin.js"),
  a = {
    name: "u-tabbar",
    mixins: [i.mpMixin, o.mixin, n.props],
    data: function () {
      return { placeholderHeight: 0 };
    },
    computed: {
      tabbarStyle: function () {
        var e = { zIndex: this.zIndex };
        return r.index.$u.deepMerge(e, r.index.$u.addStyle(this.customStyle));
      },
      updateChild: function () {
        return [this.value, this.activeColor, this.inactiveColor];
      },
      updatePlaceholder: function () {
        return [this.fixed, this.placeholder];
      },
    },
    watch: {
      updateChild: function () {
        this.updateChildren();
      },
      updatePlaceholder: function () {
        this.setPlaceholderHeight();
      },
    },
    created: function () {
      this.children = [];
    },
    mounted: function () {
      this.setPlaceholderHeight();
    },
    methods: {
      updateChildren: function () {
        this.children.length &&
          this.children.map(function (e) {
            return e.updateFromParent();
          });
      },
      setPlaceholderHeight: function () {
        var n = this;
        return t(
          e().mark(function t() {
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (((e.t0 = !n.fixed || !n.placeholder), e.t0)) {
                      e.next = 5;
                      break;
                    }
                    return (e.next = 4), r.index.$u.sleep(20);
                  case 4:
                    n.$uGetRect(".u-tabbar__content").then(function (e) {
                      var t = e.height,
                        r = void 0 === t ? 50 : t;
                      n.placeholderHeight = r;
                    });
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array || r.resolveComponent("u-safe-bottom")();
Math;
var u = r._export_sfc(a, [
  [
    "render",
    function (e, t, n, i, o, a) {
      return r.e(
        { a: e.safeAreaInsetBottom },
        (e.safeAreaInsetBottom, {}),
        {
          b: r.o(function () {
            return e.noop && e.noop.apply(e, arguments);
          }),
          c: r.n(e.border && "u-border-top"),
          d: r.n(e.fixed && "u-tabbar--fixed"),
          e: r.s(a.tabbarStyle),
          f: e.placeholder,
        },
        e.placeholder ? { g: o.placeholderHeight + "px" } : {}
      );
    },
  ],
  ["__scopeId", "data-v-93f67dc2"],
]);
wx.createComponent(u);
