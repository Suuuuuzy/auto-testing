var t = require("../../common/vendor.js"),
  e = {
    name: "password",
    data: function () {
      return {
        oilcardpop: !1,
        show: !0,
        index: 0,
        characterDatas: [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0],
      };
    },
    props: {
      password: {
        type: Array,
        default: Array.from({ length: 6 }, function (t) {
          return "";
        }),
      },
      pwIsTure: { type: Boolean, default: !0 },
    },
    computed: {
      currentDatas: function () {
        return this.characterDatas;
      },
    },
    watch: {
      pwIsTure: function (t) {
        console.log(t), t || ((this.index = 0), (this.pwIsTure = !0));
      },
    },
    mounted: function () {
      this.oilcardpop = !0;
    },
    methods: {
      handleChange: function (t) {
        (this.index = t), (this.show = !0);
      },
      handleClickKeyBoard: function (t, e) {
        this.index < 6 &&
          (this.$set(this.password, this.index, t),
          this.$emit("myPassWordChange", this.password)),
          this.index < 5 && this.index++;
      },
      handleDelete: function () {
        this.$set(this.password, this.index, ""),
          this.$emit("myPassWordChange", this.password),
          this.index > 0 && this.index--;
      },
      closePass: function () {
        this.$emit("showPassChange");
      },
    },
  };
Array || t.resolveComponent("u-popup")();
Math;
var s = t._export_sfc(e, [
  [
    "render",
    function (e, s, n, o, r, a) {
      return {
        a: t.o(function () {
          return a.closePass && a.closePass.apply(a, arguments);
        }),
        b: t.t(String(n.password[0]) ? "·" : ""),
        c: 0 === r.index ? 1 : "",
        d: t.t(String(n.password[1]) ? "·" : ""),
        e: 1 === r.index ? 1 : "",
        f: t.t(String(n.password[2]) ? "·" : ""),
        g: 2 === r.index ? 1 : "",
        h: t.t(String(n.password[3]) ? "·" : ""),
        i: 3 === r.index ? 1 : "",
        j: t.t(String(n.password[4]) ? "·" : ""),
        k: 4 === r.index ? 1 : "",
        l: t.t(String(n.password[5]) ? "·" : ""),
        m: 5 === r.index ? 1 : "",
        n: r.show ? 1 : "",
        o: t.f(a.currentDatas, function (e, s, n) {
          return t.e(
            { a: "" !== e },
            "" !== e
              ? {
                  b: t.t(e),
                  c: t.o(function (t) {
                    return a.handleClickKeyBoard(e, s);
                  }, s),
                }
              : {},
            { d: s }
          );
        }),
        p: 0 === r.index ? 1 : "",
        q: t.o(function () {
          return a.handleDelete && a.handleDelete.apply(a, arguments);
        }),
        r: r.show ? 1 : "",
        s: t.sr("oilcardpop", "d2a95c6d-0"),
        t: t.o(a.closePass),
        v: t.p({
          show: r.oilcardpop,
          type: "bottom",
          "background-color": "rgba(0,0,0,0)",
          "safe-area-inset-bottom": !1,
        }),
      };
    },
  ],
  ["__scopeId", "data-v-d2a95c6d"],
]);
wx.createComponent(s);
