var t = require("../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../common/vendor.js"),
  r = {
    props: { queryMode: { type: [String, Number], default: "" } },
    data: function () {
      return {
        orList: [],
        color: [
          "rgba(32, 104, 215, 1)",
          "rgba(230, 69, 85, 1)",
          "rgba(69, 71, 77, 1)",
          "rgba(97, 220, 186, 1.0)",
        ],
        page: 1,
        pageSize: 10,
        yearm: [],
        currentYearMonth: "",
        status: "loading",
        triggered: !1,
      };
    },
    watch: {
      queryMode: function (t) {
        console.log("传过来的值", t),
          this.orList.length > 0 && (this.orList = []),
          (this.status = "loading"),
          this.loadData();
      },
    },
    computed: t(
      {},
      e.mapState({
        hasLogin: function (t) {
          return t.hasLogin;
        },
      })
    ),
    mounted: function () {
      this.$nextTick(function () {});
    },
    methods: {
      detailorpay: function (t) {
        console.log(t, "xq"),
          "0" === t.orderStatus
            ? this.$jump(
                "/pages_pay/socketpay/socketpay?orderid=".concat(
                  JSON.stringify(t)
                )
              )
            : this.$jump(
                "/pages_pay/order-detail/order-detail?outOrderNo="
                  .concat(t.outOrderNo, "&orderStatus=")
                  .concat(t.orderStatus)
              );
      },
      isFirstOrderOfMonth: function (t, e) {
        if (0 === e) return !0;
        var r = this.orList[e - 1];
        return (
          this.formatYearMonth(t.creatTime) !==
          this.formatYearMonth(r.creatTime)
        );
      },
      formatYearMonth: function (t) {
        var e = new Date(1 * t),
          r = e.getFullYear(),
          a = ("0" + (e.getMonth() + 1)).slice(-2);
        return "".concat(r, "年").concat(a, "月");
      },
      onRefresh: function (t) {
        (this.page = 1),
          (this.orList = []),
          (this.triggered = t),
          (this.currentYearMonth = ""),
          this.loadData();
      },
      onLoadMore: function () {
        "nomore" !== this.status && (this.page++, this.loadData());
      },
      loadData: function () {
        var t = this;
        (this.yearm = []),
          this.$api
            .getOrderList({
              currentPage: this.page,
              pageSize: this.pageSize,
              queryMode: this.queryMode,
            })
            .then(function (e) {
              if (2e4 === e.data.code) {
                t.triggered = !1;
                var r = e.data.data;
                console.log(r),
                  null === r || r.length < t.pageSize
                    ? (t.status = "nomore")
                    : (t.status = "loading");
                var a = t.orList.concat(r);
                (t.orList = []),
                  (t.orList = Array.from(new Set(a)).sort(function (t, e) {
                    return e.creatTime - t.creatTime;
                  })),
                  t.orList.forEach(function (e) {
                    var r = e.creatTime,
                      a = new Date(1 * r),
                      o = a.getFullYear(),
                      n = ("0" + (a.getMonth() + 1)).slice(-2),
                      i = "".concat(o, "年").concat(n, "月");
                    t.yearm.includes(i) || t.yearm.push(i);
                  });
              }
              20004 === e.data.code &&
                setTimeout(function () {
                  t.loadData();
                }, 1e3);
            });
      },
      formatCreateTime: function (t) {
        var e = new Date(1 * t),
          r = e.getFullYear(),
          a = ("0" + (e.getMonth() + 1)).slice(-2),
          o = ("0" + e.getDate()).slice(-2),
          n = ("0" + e.getHours()).slice(-2),
          i = ("0" + e.getMinutes()).slice(-2),
          c = ("0" + e.getSeconds()).slice(-2);
        return ""
          .concat(r, "-")
          .concat(a, "-")
          .concat(o, " ")
          .concat(n, ":")
          .concat(i, ":")
          .concat(c);
      },
      getBackColor: function (t) {
        return "92#" === t
          ? this.color[1]
          : "95#" === t
          ? this.color[3]
          : "0#" === t
          ? this.color[2]
          : "98#" === t
          ? this.color[0]
          : void 0;
      },
    },
  };
Array || e.resolveComponent("zym-paging")();
Math;
var a = e._export_sfc(r, [
  [
    "render",
    function (t, r, a, o, n, i) {
      return {
        a: e.f(n.orList, function (r, a, o) {
          return e.e(
            { a: i.isFirstOrderOfMonth(r, a) },
            i.isFirstOrderOfMonth(r, a)
              ? { b: e.t(i.formatYearMonth(r.creatTime)) }
              : {},
            {
              c: e.t(r.tenantName ? r.tenantName : t.$store.state.stationName),
              d: e.t(r.oilGunName),
              e: e.t(
                "0" === r.orderStatus
                  ? "未付款"
                  : "1" === r.orderStatus
                  ? "已完成"
                  : "2" === r.orderStatus
                  ? "已取消"
                  : "3" === r.orderStatus
                  ? "锁定中"
                  : ""
              ),
              f: e.t(r.oilKind),
              g: i.getBackColor(r.oilKind),
              h: e.t(r.totalOil),
              i: e.t(i.formatCreateTime(r.creatTime)),
              j: e.t(r.unitPrice),
              k: e.t(
                r.actualPayment > 0 && null != r.actualPayment
                  ? r.actualPayment
                  : r.totalPrices
              ),
              l: e.o(function (t) {
                return i.detailorpay(r);
              }, a),
              m: a,
            }
          );
        }),
        b: "".concat(t.$imgPath, "/MapPin.png"),
        c: "".concat(t.$imgPath, "/rightArrow.png"),
        d: "".concat(t.$imgPath, "/rightArrow.png"),
        e: e.o(i.onRefresh),
        f: e.o(i.onLoadMore),
        g: e.p({
          height: "80vh",
          status: n.status,
          triggered: n.triggered,
          placeholderHeight: !0,
        }),
      };
    },
  ],
]);
wx.createComponent(a);
