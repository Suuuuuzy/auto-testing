var t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("../../common/vendor.js"),
  o = {
    data: function () {
      return {
        loading: !0,
        listDetail: [],
        outOrderNo: "",
        orderStatus: "",
        color: [
          "rgba(32, 104, 215, 1)",
          "rgba(230, 69, 85, 1)",
          "rgba(69, 71, 77, 1)",
          "rgba(97, 220, 186, 1.0)",
        ],
        userInfo: i.index.getStorageSync("userInfo"),
        topId: "",
      };
    },
    onLoad: function (t) {
      console.log(t),
        (this.outOrderNo = t.outOrderNo),
        (this.orderStatus = t.orderStatus),
        t.topId && (this.topId = t.topId);
    },
    onUnload: function () {
      this.topId || this.$store.commit("changeTabCurrent", "order");
    },
    mounted: function () {
      this.$loading("加载中", !1), this.getOrderDetail();
    },
    methods: {
      getOrderDetail: function () {
        var i = this;
        return e(
          t().mark(function e() {
            var o, a;
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (o = {
                        outOrderNo: i.outOrderNo,
                        orderStatus: i.orderStatus,
                      }),
                      (t.next = 3),
                      i.$api.getOrderDetail(o)
                    );
                  case 3:
                    (a = t.sent),
                      console.log("订单详情", a.data),
                      2e4 === a.data.code
                        ? ((i.listDetail = a.data.data), (i.loading = !1))
                        : 20004 === a.data.code && i.getOrderDetail();
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, e);
          })
        )();
      },
      navigateToMap: function () {
        var t = this;
        i.index.getSetting({
          success: function (e) {
            e.authSetting["scope.userLocation"]
              ? t.openLocation()
              : t.requestAuthorization();
          },
        });
      },
      requestAuthorization: function () {
        var t = this;
        i.index.authorize({
          scope: "scope.userLocation",
          success: function (e) {
            t.openLocation();
          },
          fail: function (e) {
            t.showAuthorizationFailedTip();
          },
        });
      },
      openLocation: function () {
        i.index.openLocation({
          latitude: 23.0207,
          longitude: 113.7518,
          scale: 5,
          name: "一宁加油站",
          address: "东莞市一宁加油站",
          infoUrl: "",
        });
      },
      showAuthorizationFailedTip: function () {
        i.index.showModal({
          title: "授权失败",
          content: "需要获取定位权限才能使用地图功能，请点击确定按钮重新授权。",
          success: function (t) {
            t.confirm && i.index.openSetting();
          },
        });
      },
      formatCreateTime: function (t) {
        var e = new Date(1 * t),
          i = e.getFullYear(),
          o = ("0" + (e.getMonth() + 1)).slice(-2),
          a = ("0" + e.getDate()).slice(-2),
          n = ("0" + e.getHours()).slice(-2),
          r = ("0" + e.getMinutes()).slice(-2),
          l = ("0" + e.getSeconds()).slice(-2);
        return ""
          .concat(i, "-")
          .concat(o, "-")
          .concat(a, " ")
          .concat(n, ":")
          .concat(r, ":")
          .concat(l);
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
      copyID: function (t) {
        var e = this;
        i.index.setClipboardData({
          data: t,
          success: function () {
            e.$toast("已复制");
          },
        });
      },
    },
  };
Array ||
  (
    i.resolveComponent("zym-navigation") +
    i.resolveComponent("u-icon") +
    i.resolveComponent("u-skeleton")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var a = i._export_sfc(o, [
  [
    "render",
    function (t, e, o, a, n, r) {
      return i.e(
        { a: i.p({ title: "订单详情" }), b: "1" === n.listDetail.orderStatus },
        "1" === n.listDetail.orderStatus
          ? { c: "".concat(t.$imgPath, "/check.png") }
          : {},
        { d: "2" === n.listDetail.orderStatus },
        "2" === n.listDetail.orderStatus
          ? { e: "".concat(t.$imgPath, "/paycancele.png") }
          : {},
        { f: "0" === n.listDetail.orderStatus },
        "0" === n.listDetail.orderStatus
          ? { g: "".concat(t.$imgPath, "/orderClose.png") }
          : {},
        { h: "3" === n.listDetail.orderStatus },
        "3" === n.listDetail.orderStatus
          ? { i: "".concat(t.$imgPath, "/shuodin.png") }
          : {},
        {
          j: i.p({ name: "map-fill", size: "32" }),
          k: i.t(t.$store.state.stationName),
          l: "".concat(t.$imgPath, "/dinwei.png"),
          m: i.o(function () {
            return r.navigateToMap && r.navigateToMap.apply(r, arguments);
          }),
          n: i.t(n.listDetail.outOrderNo ? n.listDetail.outOrderNo : ""),
          o: i.o(function (t) {
            return r.copyID(n.listDetail.outOrderNo);
          }),
          p: i.t(n.listDetail.oilKind ? n.listDetail.oilKind : ""),
          q: r.getBackColor(n.listDetail.oilKind),
          r: i.t(n.listDetail.oilGunName ? n.listDetail.oilGunName : ""),
          s: i.t(n.listDetail.totalOil ? n.listDetail.totalOil : "0"),
          t: n.listDetail.licensePlateNumber,
        },
        n.listDetail.licensePlateNumber
          ? {
              v: i.t(
                n.listDetail.licensePlateNumber.slice(0, 2) +
                  "·" +
                  n.listDetail.licensePlateNumber.slice(2)
                  ? n.listDetail.licensePlateNumber.slice(0, 2) +
                      "·" +
                      n.listDetail.licensePlateNumber.slice(2)
                  : ""
              ),
            }
          : {},
        {
          w: i.t(n.listDetail.totalPrices ? n.listDetail.totalPrices : ""),
          x: i.t(n.listDetail.unitPrice ? n.listDetail.unitPrice : ""),
          y: i.t(n.listDetail.couponPrice ? n.listDetail.couponPrice : 0),
          z: i.t(
            n.listDetail.actualPayment
              ? n.listDetail.actualPayment
              : n.listDetail.totalPrices
          ),
          A: i.t(r.formatCreateTime(n.listDetail.creatTime)),
          B: n.listDetail.orderStatus,
          C: i.p({
            loading: n.loading,
            rows: "16",
            "rows-height": "36",
            "rows-width": "750rpx",
          }),
        }
      );
    },
  ],
]);
wx.createPage(a);
