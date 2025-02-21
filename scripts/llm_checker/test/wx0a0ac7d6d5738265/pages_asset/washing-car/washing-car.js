var e = require("../../common/vendor.js"),
  o = {
    data: function () {
      return { hours: "", minutes: "", seconds: "" };
    },
    onLoad: function (e) {
      console.log(e.carWashTime), this.countdown(e.carWashTime);
    },
    methods: {
      countdown: function (o) {
        var n = this,
          t = 60 * o * 1e3,
          a = Date.now() + t,
          s = setInterval(function () {
            var o = Date.now(),
              t = a - o;
            t <= 0
              ? (clearInterval(s),
                console.log("倒计时结束！"),
                e.index.showModal({
                  title: "本次洗车完成",
                  showCancel: !1,
                  success: function () {
                    e.index.navigateBack();
                  },
                }))
              : ((n.hours = Math.floor(t / 36e5)),
                (n.minutes = Math.floor(t / 6e4)),
                (n.seconds = Math.floor((t % 6e4) / 1e3)));
          }, 1e3);
      },
    },
  };
Array || e.resolveComponent("zym-navigation")();
Math;
var n = e._export_sfc(o, [
  [
    "render",
    function (o, n, t, a, s, r) {
      return {
        a: e.p({ title: "洗车中", "is-home-page": !1 }),
        b: e.t(s.hours),
        c: e.t(s.minutes),
        d: e.t(s.seconds),
      };
    },
  ],
]);
wx.createPage(n);
