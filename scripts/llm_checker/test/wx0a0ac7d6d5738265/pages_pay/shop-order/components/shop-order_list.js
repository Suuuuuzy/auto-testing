var t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  n = {
    props: { queryMode: String },
    data: function () {
      return {
        orList: [],
        color: [
          "rgba(32, 104, 215, 1)",
          "rgba(230, 69, 85, 1)",
          "rgba(69, 71, 77, 1)",
          "rgba(97, 220, 186, 1.0)",
        ],
        pages: 1,
        size: 10,
        status: "loading",
        triggered: !1,
        btnStyle: { color: "#FF8B17", width: "152rpx", height: "60rpx" },
      };
    },
    watch: {
      queryMode: function (t) {
        console.log("传过来的值", t),
          this.orList.length > 0 && (this.orList = []);
      },
    },
    computed: o(
      {},
      r.mapState({
        hasLogin: function (t) {
          return t.hasLogin;
        },
      })
    ),
    mounted: function () {
      this.orList.length > 0 && (this.orList = []), this.loadData();
    },
    methods: {
      onRefresh: function (t) {
        (this.pages = 1),
          (this.orList = []),
          (this.triggered = t),
          this.loadData();
      },
      onLoadMore: function () {
        "nomore" != this.status && (this.pages++, this.loadData());
      },
      loadData: function () {
        var o = this;
        return e(
          t().mark(function e() {
            var r, n, a, i;
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (r = {
                        pages: o.pages,
                        size: o.size,
                        payStatus: o.queryMode,
                      }),
                      (t.next = 3),
                      o.$api.$getAllBuyedShop(r)
                    );
                  case 3:
                    (n = t.sent),
                      (o.triggered = !1),
                      console.log(n.data.data),
                      n.data.code === o.$code.SUCCESS
                        ? ((a = n.data.data.list),
                          console.log(a),
                          console.log(r),
                          null === a || a.length < o.size
                            ? (o.status = "nomore")
                            : (o.status = "loading"),
                          (i = o.orList.concat(a).reduce(function (t, e) {
                            return (
                              t.find(function (t) {
                                return JSON.stringify(t) === JSON.stringify(e);
                              }) || t.push(e),
                              t
                            );
                          }, [])),
                          console.log(i),
                          (o.orList = i))
                        : n.data.code === o.$code.TOKENFAIL &&
                          setTimeout(function () {
                            o.loadData();
                          }, 2e3);
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, e);
          })
        )();
      },
    },
  };
Array ||
  (
    r.resolveComponent("u-line") +
    r.resolveComponent("u-button") +
    r.resolveComponent("zym-paging")
  )();
Math ||
  (
    function () {
      return "../../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../../pages/components/zym-paging/zym-paging.js";
    }
  )();
var a = r._export_sfc(n, [
  [
    "render",
    function (t, e, o, n, a, i) {
      return {
        a: r.f(a.orList, function (e, o, n) {
          var i, s, u, c, l;
          return r.e(
            {
              a:
                0 === o ||
                (null == (i = e.payTime) ? void 0 : i.slice(0, 7)) !==
                  (null == (s = a.orList[o - 1].payTime)
                    ? void 0
                    : s.slice(0, 7)),
            },
            0 === o ||
              (null == (u = e.payTime) ? void 0 : u.slice(0, 7)) !==
                (null == (c = a.orList[o - 1].payTime) ? void 0 : c.slice(0, 7))
              ? { b: r.t(null == (l = e.payTime) ? void 0 : l.slice(0, 7)) }
              : {},
            {
              c: r.t(e.outOrderNo),
              d: r.t(
                0 === e.payStatus
                  ? "未付款"
                  : 1 === e.payStatus
                  ? "待核销"
                  : 2 === e.payStatus
                  ? "已核销"
                  : ""
              ),
              e: r.n(1 === e.payStatus ? "col_or" : "col_h"),
              f: r.t(e.payTime),
              g: "22b84109-1-" + n + ",22b84109-0",
              h: e.homeImg,
              i: r.t(e.packName),
              j: r.t(e.originalPrice),
              k: r.t(e.couponPriceAll),
              l: r.t(e.totalAmount),
              m: 1 === e.payStatus,
            },
            1 === e.payStatus
              ? {
                  n: "22b84109-2-" + n + ",22b84109-0",
                  o: r.p({
                    text: "立即核销",
                    color: "#FFF7ED",
                    "custom-style": a.btnStyle,
                    shape: "circle",
                    throttleTime: 2e3,
                  }),
                }
              : {},
            {
              p: r.o(function (o) {
                return t.$jump(
                  "/pages_pay/shop-order-detail/shop-order-detail?id="
                    .concat(e.packId, "&outOrderNo=")
                    .concat(e.outOrderNo, "&payStatus=")
                    .concat(e.payStatus)
                );
              }, o),
              q: o,
            }
          );
        }),
        b: r.p({ color: "#F7F8FA" }),
        c: r.o(i.onRefresh),
        d: r.o(i.onLoadMore),
        e: r.p({
          status: a.status,
          triggered: a.triggered,
          placeholderHeight: !0,
        }),
      };
    },
  ],
  ["__scopeId", "data-v-22b84109"],
]);
wx.createComponent(a);
