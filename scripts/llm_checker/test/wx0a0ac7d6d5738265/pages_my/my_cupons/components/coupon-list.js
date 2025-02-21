var t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  i = {
    props: { query: "", title: "" },
    data: function () {
      return {
        cuponList: [],
        isloading: !1,
        page: 1,
        pageSize: 10,
        stat: "loading",
        isModalVisible: !1,
        washingPlate: "",
        washCouponId: "",
        carWashTime: "",
        triggered: !1,
      };
    },
    mounted: function () {
      this.loadData();
    },
    watch: {
      query: function (t) {
        console.log("传过来的值", t), (this.cuponList = []), this.loadData();
      },
    },
    methods: {
      preventTouchMove: function (t) {
        t.preventDefault();
      },
      handleClick: function (t) {
        0 === t.status && this.$jump("/pages_pay/pay/pay");
      },
      handleWashCar: function (t) {
        0 === t.status &&
          ((this.washCouponId = t.id),
          (this.washingPlate = t.licensePlate),
          (this.carWashTime = t.carWashTime),
          this.showModal());
      },
      showModal: function () {
        this.isModalVisible = !0;
      },
      hideModal: function () {
        this.isModalVisible = !1;
      },
      startWashing: function () {
        this.$api
          .washCouponCancelId(this.washCouponId)
          .then(function (t) {})
          .catch(function (t) {}),
          this.$jump(
            "/pages_car/washing-car/washing-car?carWashTime=".concat(
              this.carWashTime
            )
          );
      },
      onRefresh: function (t) {
        (this.page = 1),
          (this.cuponList = []),
          (this.triggered = t),
          this.loadData(),
          console.log("刷新成功");
      },
      onLoadMore: function () {
        "nomore" != this.stat && (this.page++, this.loadData());
      },
      loadData: function () {
        var t = {
          query: this.query,
          currentPage: this.page,
          pageSize: this.pageSize,
        };
        "加油券" === this.title && this.getOilCouponList(t),
          "洗车券" === this.title && this.getWashCarCouponList(t),
          "单升券" === this.title &&
            (a.index.hideLoading(), (this.stat = "nomore")),
          "特惠券" === this.title &&
            (a.index.hideLoading(), (this.stat = "nomore")),
          "非油券" === this.title &&
            (a.index.hideLoading(), (this.stat = "nomore")),
          "现金券" === this.title &&
            (a.index.hideLoading(), (this.stat = "nomore"));
      },
      getOilCouponList: function (a) {
        var i = this;
        return e(
          t().mark(function e() {
            var n, o, s;
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), i.$api.getCuponsList(a);
                  case 2:
                    (n = t.sent),
                      console.log("加载成功", n.data),
                      2e4 === n.data.code &&
                        ((o = n.data.data).length < i.pageSize
                          ? (i.stat = "nomore")
                          : (i.stat = "loading"),
                        (s = i.cuponList.concat(o)),
                        (i.cuponList = Array.from(
                          new Set(s.map(JSON.stringify))
                        ).map(JSON.parse)),
                        (i.triggered = !1)),
                      20004 === n.data.code &&
                        setTimeout(function () {
                          i.getOilCouponList(a);
                        }, 2e3);
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, e);
          })
        )();
      },
      getWashCarCouponList: function (a) {
        var i = this;
        return e(
          t().mark(function e() {
            var n, o, s;
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), i.$api.getWashCarCoupon(a);
                  case 2:
                    2e4 === (n = t.sent).data.code &&
                      ((o = n.data.data).length < i.pageSize
                        ? (i.stat = "nomore")
                        : (i.stat = "loading"),
                      (s = i.cuponList.concat(o)),
                      (i.cuponList = Array.from(
                        new Set(s.map(JSON.stringify))
                      ).map(JSON.parse)),
                      (i.triggered = !1)),
                      20004 === n.data.code &&
                        setTimeout(function () {
                          i.getWashCarCouponList(a);
                        }, 2e3);
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, e);
          })
        )();
      },
      formatCreateTime: function (t) {
        var e = new Date(1 * t),
          a = e.getFullYear(),
          i = ("0" + (e.getMonth() + 1)).slice(-2),
          n = ("0" + e.getDate()).slice(-2);
        return "".concat(a, "/").concat(i, "/").concat(n);
      },
      toBack: function () {
        a.index.navigateBack();
      },
    },
  };
Array || a.resolveComponent("zym-paging")();
Math;
var n = a._export_sfc(i, [
  [
    "render",
    function (t, e, i, n, o, s) {
      return {
        a: a.f(o.cuponList, function (t, e, n) {
          return a.e(
            "加油券" === i.title ? { a: a.t(t.couponPrice) } : {},
            "加油券" === i.title ? { b: a.t(t.couponTitle) } : {},
            "洗车券" === i.title ? { c: a.t(t.licensePlate) } : {},
            {
              d: a.t(1 == t.isSuperposition ? "可叠加使用" : "不可叠加使用"),
              e: a.t(t.endTime),
            },
            "加油券" === i.title
              ? {
                  f: a.t(
                    0 === t.status
                      ? "去使用"
                      : 1 === t.status
                      ? "已使用"
                      : 2 === t.status
                      ? "已过期"
                      : ""
                  ),
                  g: a.o(function (e) {
                    return s.handleClick(t);
                  }, e),
                }
              : {},
            "洗车券" === i.title
              ? {
                  h: a.t(
                    0 === t.status
                      ? "去洗车"
                      : 1 === t.status
                      ? "已使用"
                      : 2 === t.status
                      ? "已过期"
                      : ""
                  ),
                  i: a.o(function (e) {
                    return s.handleWashCar(t);
                  }, e),
                }
              : {},
            { j: e }
          );
        }),
        b: "加油券" === i.title,
        c: a.t(i.title),
        d: "加油券" === i.title,
        e: "洗车券" === i.title,
        f: "加油券" === i.title,
        g: "洗车券" === i.title,
        h: 0 != i.query ? ".5" : "1",
        i: a.o(s.onRefresh),
        j: a.o(s.onLoadMore),
        k: a.p({ status: o.stat, height: "78vh", triggered: o.triggered }),
        l: o.isModalVisible,
        m: a.o(function () {
          return s.preventTouchMove && s.preventTouchMove.apply(s, arguments);
        }),
        n: a.o(function () {
          return s.hideModal && s.hideModal.apply(s, arguments);
        }),
        o: a.o(function () {
          return s.startWashing && s.startWashing.apply(s, arguments);
        }),
        p: o.isModalVisible,
      };
    },
  ],
]);
wx.createComponent(n);
