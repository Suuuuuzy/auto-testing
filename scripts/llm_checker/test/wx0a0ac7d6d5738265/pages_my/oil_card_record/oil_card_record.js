var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  a = {
    data: function () {
      return { oilCardJiLu: [], pages: 1, status: "more", cardId: "" };
    },
    onLoad: function (e) {
      console.log("记录页", e.cardId), e.cardId && (this.cardId = e.cardId);
    },
    methods: {
      getCardConsume: function () {
        var t = this;
        return r(
          e().mark(function r() {
            var a, n, o, i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (a = {
                        currentPage: t.pages,
                        pageSize: 10,
                        cardId: t.cardId,
                      }),
                      t.$loading("加载中"),
                      (e.next = 4),
                      t.$api.getCardConsumeList(a)
                    );
                  case 4:
                    (n = e.sent).data.code === t.$code.SUCCESS &&
                      ((o = n.data.data).length < 10 && (t.status = "nomore"),
                      (i = t.oilCardJiLu.concat(o)),
                      (t.oilCardJiLu = []),
                      (t.oilCardJiLu = Array.from(new Set(i)).sort(function (
                        e,
                        r
                      ) {
                        return r.creatTime - e.creatTime;
                      })));
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, r);
          })
        )();
      },
    },
  };
Array || t.resolveComponent("zym-navigation")();
Math;
var n = t._export_sfc(a, [
  [
    "render",
    function (e, r, a, n, o, i) {
      return {
        a: t.p({ title: "油卡消费记录" }),
        b: t.f(o.oilCardJiLu, function (r, a, n) {
          return t.e(
            {
              a:
                0 === a ||
                r.creatTime.slice(0, 7) !==
                  o.oilCardJiLu[a - 1].creatTime.slice(0, 7),
            },
            0 === a ||
              r.creatTime.slice(0, 7) !==
                o.oilCardJiLu[a - 1].creatTime.slice(0, 7)
              ? { b: t.t(r.creatTime.slice(0, 7)) }
              : {},
            { c: t.t(r.description), d: t.t(r.creatTime), e: r.money > 0 },
            r.money > 0 ? { f: t.t(r.money) } : { g: t.t(r.money) },
            {
              h: t.o(function (t) {
                return e.toOrderDetails(r);
              }, r),
              i: r,
            }
          );
        }),
        c: t.o(function () {
          return i.getCardConsume && i.getCardConsume.apply(i, arguments);
        }),
        d: t.o(function () {
          return e.onRefresh && e.onRefresh.apply(e, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-61795fc0"],
]);
wx.createPage(n);
