var t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  a = {
    data: function () {
      return { status: "loading", topId: "", parentCard: [] };
    },
    onLoad: function (t) {
      console.log("车队卡", t),
        t.topId && (this.topId = t.topId),
        this.getCarsList();
    },
    mounted: function () {},
    methods: {
      getCarsList: function () {
        var o = this;
        return e(
          t().mark(function e() {
            var a;
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), o.$api.$getFleetList(o.topId);
                  case 2:
                    (a = t.sent),
                      console.log("00", a.data),
                      a.data.code === o.$code.SUCCESS
                        ? ((o.parentCard = a.data.data), (o.status = "nomre"))
                        : a.data.code === o.$code.TOKENFAIL && o.getCarsList();
                  case 4:
                  case "end":
                    return t.stop();
                }
            }, e);
          })
        )();
      },
      getCardBg: function (t) {
        return "92#" === t.oilType && t.discountAmount > 0
          ? "rgba(232, 130, 130, 1)"
          : "95#" === t.oilType && t.discountAmount > 0
          ? "rgba(76, 199, 156, 1)"
          : "98#" === t.oilType && t.discountAmount > 0
          ? "rgba(80, 162, 230, 1)"
          : "0#" === t.oilType && t.discountAmount > 0
          ? "rgba(95, 118, 120, 1)"
          : void 0;
      },
      onRefresh: function () {
        (this.pages = 1), this.getRecordList(), this.getCarsList();
      },
    },
  };
Array ||
  (o.resolveComponent("zym-navigation") + o.resolveComponent("zym-paging"))();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../pages/components/zym-paging/zym-paging.js";
    }
  )();
var n = o._export_sfc(a, [
  [
    "render",
    function (t, e, a, n, r, s) {
      return {
        a: o.p({ title: "车队列表", "is-home-page": !0 }),
        b: o.f(r.parentCard, function (e, a, n) {
          return o.e(
            { a: e.motorcadeName },
            e.motorcadeName
              ? { b: o.t(e.motorcadeName ? e.motorcadeName : "") }
              : {},
            { c: e.topId },
            e.topId ? { d: o.t(e.topId ? e.topId : "") } : {},
            { e: e.motorcadeContactsPhone },
            e.motorcadeContactsPhone
              ? {
                  f: "".concat(t.$imgPath, "/phone.png"),
                  g: o.t(
                    e.motorcadeContactsPhone ? e.motorcadeContactsPhone : ""
                  ),
                }
              : {},
            { h: e.motorcadeContactsName },
            e.motorcadeContactsName
              ? {
                  i: o.t(
                    e.motorcadeContactsName ? e.motorcadeContactsName : ""
                  ),
                }
              : {},
            {
              j: e.id,
              k: o.o(function (o) {
                return t.$jump(
                  "/pages_asset/fleet-card-detail/fleet-card-detail?topId=".concat(
                    e.topId
                  )
                );
              }, e.id),
            }
          );
        }),
        c: o.p({ height: "80vh", status: r.status, "is-fresh": !1 }),
      };
    },
  ],
  ["__scopeId", "data-v-b4144dd3"],
]);
wx.createPage(n);
