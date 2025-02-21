var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../utils/debouns.js"),
  o = require("../../common/vendor.js"),
  i = {
    data: function () {
      return { oilCardList: [] };
    },
    onShow: function () {
      this.getOilsList();
    },
    mounted: function () {
      this.getReciveCardFn = n.throttle(this.getReciveCardFn, 2e3);
    },
    methods: {
      getOilsList: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.$getOilsCardList();
                  case 2:
                    (o = e.sent),
                      console.log("油卡列表", o.data.data),
                      o.data.code === n.$code.SUCCESS &&
                        (n.oilCardList = o.data.data),
                      o.data.code === n.$code.TOKENFAIL &&
                        setTimeout(function () {
                          n.getOilsList();
                        }, 500);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array ||
  (
    o.resolveComponent("zym-navigation") +
    o.resolveComponent("u-line") +
    o.resolveComponent("u-empty")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../uview-plus/components/u-empty/u-empty.js";
    }
  )();
var r = o._export_sfc(i, [
  [
    "render",
    function (e, t, n, i, r, a) {
      return o.e(
        {
          a: o.p({ title: "领取会员卡", "is-home-page": !1 }),
          b: r.oilCardList.length,
        },
        r.oilCardList.length
          ? {
              c: o.f(r.oilCardList, function (t, n, i) {
                return o.e(
                  { a: t.topName },
                  t.topName ? { b: o.t(t.topName ? t.topName : "") } : {},
                  {
                    c: "4f93fb8d-1-" + i,
                    d: o.t(t.restrictOil),
                    e: o.o(function (n) {
                      return e.$jump(
                        "/pages_my/setopen-card-info/setopen-card-info?topId=".concat(
                          t.topId
                        )
                      );
                    }, n),
                    f: n,
                  }
                );
              }),
              d: o.t(e.$store.state.stationName),
              e: "".concat(e.imgPath, "/oilicon.png"),
            }
          : {
              f: o.p({
                mode: "list",
                textSize: "28",
                iconSize: "180",
                text: "暂时没有可领取油卡哦~",
                width: "320",
                height: "320",
              }),
            }
      );
    },
  ],
  ["__scopeId", "data-v-4f93fb8d"],
]);
wx.createPage(r);
