var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../common/vendor.js"),
  s = {
    props: { height: { type: String, default: "65" } },
    data: function () {
      return { pages: 1, consumeList: [], status: "loading" };
    },
    mounted: function () {
      this.getUserRecordList();
    },
    methods: {
      toOrderDetails: function (e) {
        "油卡充值" != e.description &&
          this.$jump(
            "/pages_pay/order-detail/order-detail?outOrderNo=".concat(
              e.outOrderNo,
              "&orderStatus=3"
            )
          );
      },
      refreshList: function () {
        "nomore" !== this.status && (this.pages++, this.getUserRecordList());
      },
      onRefresh: function () {
        (this.pages = 1), this.getUserRecordList();
      },
      getUserRecordList: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var s, n, o, i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      r.$loading(),
                      (s = { currentPage: r.pages, pageSize: 10 }),
                      (e.next = 4),
                      r.$api.selectRecordList(s)
                    );
                  case 4:
                    (n = e.sent),
                      console.log("消费记录", n),
                      2e4 === n.data.code
                        ? (null === (o = n.data.data) || o.length < 10
                            ? (r.status = "nomore")
                            : (r.status = "loading"),
                          (i = r.consumeList.concat(o)),
                          (r.consumeList = []),
                          (r.consumeList = Array.from(
                            new Set(i.map(JSON.stringify))
                          ).map(JSON.parse)))
                        : 20004 === n.data.code && r.getUserRecordList();
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array || r.resolveComponent("u-loadmore")();
Math;
var n = r._export_sfc(s, [
  [
    "render",
    function (e, t, s, n, o, i) {
      return {
        a: r.f(o.consumeList, function (e, t, s) {
          return r.e(
            {
              a:
                0 === t ||
                e.creatTime.slice(0, 7) !==
                  o.consumeList[t - 1].creatTime.slice(0, 7),
            },
            0 === t ||
              e.creatTime.slice(0, 7) !==
                o.consumeList[t - 1].creatTime.slice(0, 7)
              ? { b: r.t(e.creatTime.slice(0, 7)) }
              : {},
            { c: r.t(e.description), d: r.t(e.creatTime), e: e.money > 0 },
            e.money > 0 ? { f: r.t(e.money) } : { g: r.t(e.money) },
            {
              h: r.o(function (t) {
                return i.toOrderDetails(e);
              }, t),
              i: t,
            }
          );
        }),
        b: r.p({
          color: "#63DAE0",
          status: o.status,
          "font-size": "32",
          "icon-size": "32",
          line: !0,
        }),
        c: s.height + "vh",
        d: r.o(function () {
          return i.refreshList && i.refreshList.apply(i, arguments);
        }),
        e: r.o(function () {
          return i.onRefresh && i.onRefresh.apply(i, arguments);
        }),
      };
    },
  ],
]);
wx.createComponent(n);
