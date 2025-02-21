var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  t = {
    data: function () {
      return {
        cuponList: [],
        checkedId: "",
        ischecked: !0,
        cuponsone: [],
        cuponstwo: [],
        oilGunOrdersId: "",
        status: "loading",
        pageSize: 10,
        page: 1,
      };
    },
    onLoad: function (e) {
      console.log(e),
        e.oilGunOrdersId &&
          ((this.oilGunOrdersId = e.oilGunOrdersId), this.loadData()),
        e.couponId && (this.checkedId = e.couponId);
    },
    onPullDownRefresh: function () {
      (this.cuponList = []), this.loadData();
    },
    methods: {
      hangdlerischecked: function (e, o) {
        console.log("点击优惠券id", o.id),
          this.checkedId == o.id
            ? (this.checkedId = 0)
            : (this.checkedId = o.id);
      },
      topay: function () {
        null != this.checkedId || "" != this.checkedId
          ? (console.log(this.checkedId),
            this.$store.commit("set_coupon_id", this.checkedId))
          : this.$store.commit("set_coupon_id", 0),
          n.index.navigateBack({ delta: 1 });
      },
      onLoadMore: function () {
        "nomore" != this.status && (this.page++, this.loadData());
      },
      loadData: function () {
        var t = this;
        return o(
          e().mark(function o() {
            var i, s, c;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      t.$api.getOrderCoupon({
                        oilGunOrdersId: t.oilGunOrdersId,
                      })
                    );
                  case 2:
                    (i = e.sent),
                      console.log(i.data),
                      i.data.code === t.$code.SUCCESS &&
                        (null === (s = i.data.data) || s.length < t.pageSize
                          ? (t.status = "nomore")
                          : (t.status = "loading"),
                        (c = t.cuponList.concat(s)),
                        (t.cuponList = Array.from(
                          new Set(c.map(JSON.stringify))
                        ).map(JSON.parse)),
                        (t.cuponsone = []),
                        (t.cuponstwo = []),
                        t.cuponList.map(function (e) {
                          1 === e.state
                            ? t.cuponsone.push(e)
                            : t.cuponstwo.push(e);
                        }),
                        n.index.stopPullDownRefresh(),
                        n.index.hideNavigationBarLoading()),
                      i.data.code === t.$code.TOKENFAIL && t.loadData();
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, o);
          })
        )();
      },
    },
  };
Array ||
  (n.resolveComponent("zym-navigation") + n.resolveComponent("u-loadmore"))();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-loadmore/u-loadmore.js";
    }
  )();
var i = n._export_sfc(t, [
  [
    "render",
    function (e, o, t, i, s, c) {
      return n.e(
        {
          a: n.p({ title: "我的优惠券", "is-home-page": !1 }),
          b: s.cuponsone.length > 0,
        },
        (s.cuponsone.length, {}),
        {
          c: n.f(s.cuponsone, function (e, o, t) {
            return {
              a: n.t(e.couponPrice),
              b: n.t(e.couponTitle),
              c: n.t(1 == e.isSuperposition ? "可叠加使用" : "不可叠加使用"),
              d: n.t(e.endTime),
              e: e.id,
              f: e.id == s.checkedId,
              g: n.o(function (o) {
                return c.hangdlerischecked(o, e);
              }, o),
              h: o,
            };
          }),
          d: s.cuponstwo.length > 0,
        },
        (s.cuponstwo.length, {}),
        {
          e: n.f(s.cuponstwo, function (e, o, t) {
            return {
              a: n.t(e.couponPrice),
              b: n.t(e.couponTitle),
              c: n.t(1 == e.isSuperposition ? "可叠加使用" : "不可叠加使用"),
              d: n.t(e.endTime),
              e: e.id,
              f: o,
            };
          }),
          f: n.p({
            status: s.status,
            color: "#06b9c0",
            "font-size": "32",
            "icon-size": "32",
            line: !0,
          }),
          g: n.o(function () {
            return c.topay && c.topay.apply(c, arguments);
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-0e697162"],
]);
wx.createPage(i);
