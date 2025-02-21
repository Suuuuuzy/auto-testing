require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/slicedToArray"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  r = require("../../utils/debouns.js"),
  a = {
    data: function () {
      return {
        oilCardInfo: "",
        topId: "",
        isReceive: "",
        remainingQuantity: "",
      };
    },
    onShow: function () {
      console.log("油卡 页面 开始"), this.topId && this.selectCardList();
    },
    onLoad: function (r) {
      var a = this;
      return n(
        e().mark(function n() {
          var i, s, c;
          return e().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if ((console.log(r), (e.t0 = r.id), !e.t0)) {
                    e.next = 6;
                    break;
                  }
                  return (a.topId = r.id), (e.next = 6), a.getCode();
                case 6:
                  if (!r.q) {
                    e.next = 19;
                    break;
                  }
                  return (
                    console.log("二维码参数", r.q),
                    (i = decodeURIComponent(r.q).split("?")[1]),
                    console.log("url", i),
                    (s = i.includes("&") ? i.split("&") : [i]),
                    (c = {}),
                    s.forEach(function (e) {
                      var n = e.split("="),
                        o = t(n, 2),
                        r = o[0],
                        a = o[1];
                      c[r] = a;
                    }),
                    console.log("id:", c.id, "ip:", c.ip, "name", c.name),
                    (a.topId = c.id),
                    c.ip && a.$store.commit("setStationURL", c.ip),
                    c.name && a.$store.commit("setStationName", c.name),
                    (e.next = 18),
                    a.getCode()
                  );
                case 18:
                  o.index.getStorageSync("userInfo")
                    ? a.$store.commit("updateHasLogin", !0)
                    : a.$jump("/pages_my/login/wx_login");
                case 19:
                case "end":
                  return e.stop();
              }
          }, n);
        })
      )();
    },
    mounted: function () {
      this.lqOilsCards = r.throttle(this.lqOilsCards, 1500);
    },
    methods: {
      getCode: function () {
        var e = this;
        o.index.login({
          success: function (t) {
            e.getToken({ code: t.code });
          },
        });
      },
      getToken: function (t) {
        var r = this;
        return n(
          e().mark(function n() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), r.$api.getToken(t);
                  case 2:
                    (a = e.sent),
                      console.log(a.data),
                      a.data.code == r.$code.SUCCESS &&
                        (o.index.setStorageSync("token", a.data.data.token),
                        r.selectCardList());
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
      selectCardList: function () {
        var t = this;
        return n(
          e().mark(function n() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), t.$api.$qrCodeCard(t.topId);
                  case 2:
                    (o = e.sent),
                      console.log("可领油卡", o.data),
                      o.data.code === t.$code.SUCCESS
                        ? ((t.oilCardInfo = o.data.data.cardTop),
                          (t.isReceive = o.data.data.isReceive),
                          (t.remainingQuantity = o.data.data.remainingQuantity),
                          console.log(t.oilCardInfo))
                        : o.data.code === t.$code.TOKENFAIL &&
                          setTimeout(function () {
                            t.selectCardList();
                          }, 1e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
      getCardBg: function (e) {
        return "92#" === e
          ? "rgba(255, 74, 107, 1)"
          : "95#" === e
          ? "rgba(73, 227, 170, 1)"
          : "98#" === e
          ? "rgba(5, 197, 255, 1)"
          : "0#" === e
          ? "rgba(192, 194, 204, 1)"
          : void 0;
      },
      jumpFn: function () {
        1 != this.isReceive && this.remainingQuantity > 0
          ? this.$jump(
              "/pages_my/setopen-card-info/setopen-card-info?topId=".concat(
                this.oilCardInfo.topId
              )
            )
          : this.$toast("没有卡可领取了");
      },
    },
  };
Array || o.resolveComponent("zym-navigation")();
Math;
var i = o._export_sfc(a, [
  [
    "render",
    function (e, t, n, r, a, i) {
      return o.e(
        {
          a: o.p({ title: "领取会员卡", "is-home-page": !0 }),
          b: a.oilCardInfo,
        },
        a.oilCardInfo
          ? {
              c: o.t(a.oilCardInfo.topName),
              d: o.f(a.oilCardInfo.restrictOil.split(","), function (e, t, n) {
                return o.e({ a: null != e }, null != e ? { b: o.t(e) } : {}, {
                  c: i.getCardBg(e),
                  d: t,
                });
              }),
            }
          : {},
        {
          e: o.t(
            1 == a.isReceive
              ? "已领取"
              : a.remainingQuantity > 0
              ? "领取"
              : "已领完"
          ),
          f: o.o(function () {
            return i.jumpFn && i.jumpFn.apply(i, arguments);
          }),
          g: 1 == a.isReceive || a.remainingQuantity < 1 ? 1 : "",
        }
      );
    },
  ],
  ["__scopeId", "data-v-c6a1a269"],
]);
wx.createPage(i);
