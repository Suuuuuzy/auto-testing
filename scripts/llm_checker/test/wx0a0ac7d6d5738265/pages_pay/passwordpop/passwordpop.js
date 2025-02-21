var s = require("../../common/vendor.js"),
  t = {
    name: "password",
    data: function () {
      return {
        showpwPop: !1,
        show: !0,
        index: -1,
        characterDatas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ""],
      };
    },
    props: {
      password: {
        type: Array,
        default: Array.from({ length: 6 }, function (s) {
          return "";
        }),
      },
    },
    computed: {
      currentDatas: function () {
        return this.characterDatas;
      },
    },
    watch: {},
    mounted: function () {
      this.showpwPop = !0;
    },
    methods: {
      handleChange: function (s) {
        (this.index = s), (this.show = !0);
      },
      handleClickKeyBoard: function (s, t) {
        this.index < 6 &&
          (this.$set(this.password, this.index, s),
          this.$emit("myPassWordChange", this.password)),
          this.index < 5 && this.index++;
      },
      handleDelete: function () {
        this.$set(this.password, this.index, ""),
          this.$emit("myPassWordChange", this.password),
          this.index > 0 && this.index--;
      },
      closePass: function () {
        this.$emit("showPassC");
      },
    },
  };
Array || s.resolveComponent("u-popup")();
Math;
var e = s._export_sfc(t, [
  [
    "render",
    function (t, e, n, o, r, a) {
      return {
        a: s.o(function () {
          return a.closePass && a.closePass.apply(a, arguments);
        }),
        b: "".concat(t.$imgPath, "/gunclose.png"),
        c: s.t(String(n.password[0]) ? "·" : n.password[0]),
        d: 0 === r.index ? 1 : "",
        e: s.t(String(n.password[1]) ? "·" : n.password[1]),
        f: 1 === r.index ? 1 : "",
        g: s.t(String(n.password[2]) ? "·" : n.password[2]),
        h: 2 === r.index ? 1 : "",
        i: s.t(String(n.password[3]) ? "·" : n.password[3]),
        j: 3 === r.index ? 1 : "",
        k: s.t(String(n.password[4]) ? "·" : n.password[4]),
        l: 4 === r.index ? 1 : "",
        m: s.t(String(n.password[5]) ? "·" : n.password[5]),
        n: 5 === r.index ? 1 : "",
        o: r.show ? 1 : "",
        p: s.f(a.currentDatas, function (t, e, n) {
          return s.e(
            { a: "" !== t },
            "" !== t
              ? {
                  b: s.t(t),
                  c: s.o(function (s) {
                    return a.handleClickKeyBoard(t, e);
                  }, e),
                }
              : {},
            { d: e }
          );
        }),
        q: 0 === r.index ? 1 : "",
        r: s.o(function () {
          return a.handleDelete && a.handleDelete.apply(a, arguments);
        }),
        s: r.show ? 1 : "",
        t: s.p({
          show: r.showpwPop,
          mode: "bottom",
          round: "20",
          "background-color": "rgba(0,0,0,0)",
          "safe-area-inset-bottom": !1,
        }),
      };
    },
  ],
  ["__scopeId", "data-v-e87942aa"],
]);
wx.createPage(e);
