var t,
  a,
  e = getApp();
e.BaseComp({
  properties: {},
  data: {
    noMore: !1,
    TabCur: 0,
    scrollLeft: 0,
    tabInfo: [
      { uy_name: "ھەممىسى", ch_name: "全部", icon: "order_state_1", id: 1 },
      {
        uy_name: "پۇل تۆلەنمىگەن",
        ch_name: "未付款",
        icon: "order_state_2",
        id: 2,
      },
      {
        uy_name: "قۇبۇلانمىغان",
        ch_name: "未接单",
        icon: "order_state_3",
        id: 3,
      },
      {
        uy_name: "قۇبۇلانغان",
        ch_name: "已接单",
        icon: "order_state_5",
        id: 4,
      },
      {
        uy_name: "تاماملانغان",
        ch_name: "已完成",
        icon: "order_state_4",
        id: 5,
      },
      {
        uy_name: "بىكار قىلىنغان ",
        ch_name: "已取消",
        icon: "order_state_6",
        id: 6,
      },
    ],
  },
  ready: function () {
    console.log("order ready"),
      (t = this),
      (this.page = 1),
      this.initLan(),
      e
        ? e.userLogin(function (a) {
            t.loadData();
          })
        : t.loadData(),
      (a = setInterval(function () {
        t.initTime();
      }, 1e3));
  },
  detached: function () {
    console.log("detached"), clearInterval(a), (a = null);
  },
  methods: {
    tabSelect: function (t) {
      this.setData({
        TabCur: t.currentTarget.dataset.id,
        scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
      }),
        (this.page = 1),
        this.loadData();
    },
    loadData: function () {
      this.requestWithLoading(
        "order/_getMyOrder",
        { page: this.page, type: this.data.TabCur + 1 },
        function (a) {
          if (a) {
            if (
              (a.total == a.to || 0 == a.total
                ? t.setData({ noMore: !0 })
                : t.setData({ noMore: !1 }),
              1 == t.page)
            )
              t.initTableNum(a), t.setData({ result: a });
            else {
              var e = t.data.result.data.concat(a.data);
              (a.data = e), t.initTableNum(a), t.setData({ result: a });
            }
            t.page++;
          }
        }
      );
    },
    initTableNum: function (t) {
      var a = t ? t.data : null;
      a &&
        a.forEach(function (t) {
          var a = t.table_num;
          if (a) {
            var e = a.toString();
            1 == e.length ? (e = "00" + e) : 2 == e.length && (e = "0" + e);
            var n = e.split("");
            t.tableNums = n;
          }
        });
    },
    initTime: function () {
      var a = this.data.result ? this.data.result.data : null;
      if (a) {
        for (var e in a) {
          var n = 600 - parseInt(t.tools().getSecond(a[e].created_at));
          a[e].times = n > 0 ? t.formatSeconds(n) : 0;
        }
        (t.data.result.data = a), t.setData({ result: t.data.result });
      }
    },
    loadMore: function () {
      console.log("orderMore"), this.data.noMore || t.loadData();
    },
    payBtn: function (a) {
      var e = a.currentTarget.dataset.item;
      console.log("id --\x3e>" + e.id),
        this.requestWithLoading(
          "order/payOrderFee",
          { orderId: e.id },
          function (a) {
            a &&
              wx.requestPayment({
                timeStamp: a.timestamp,
                nonceStr: a.nonceStr,
                package: a.package,
                signType: a.signType,
                paySign: a.paySign,
                success: function () {
                  t.showToast(
                    {
                      content: t.data.Str.takeOrderSuccess[t.data.lanIndex],
                      icon: "success",
                      color: "cyan",
                    },
                    function (a) {
                      t.loadData();
                    }
                  );
                },
                fail: function (a) {
                  console.log(a), t.failureToast();
                },
              });
          }
        );
    },
    evaluationBtn: function (t) {
      var a = t.currentTarget.dataset.item;
      a &&
        wx.navigateTo({
          url: "/pages/order/order-comment/order-comment?orderId=" + a.id,
        });
    },
    callPhone: function (t) {
      var a = t.currentTarget.dataset.phone;
      wx.makePhoneCall({ phoneNumber: a });
    },
    formatSeconds: function (t) {
      var a = parseInt(t),
        e = 0,
        n = 0;
      a > 60 &&
        ((e = parseInt(a / 60)),
        (a = parseInt(a % 60)),
        e > 60 && ((n = parseInt(e / 60)), (e = parseInt(e % 60))));
      var r = "" + a < 10 ? "0" + parseInt(a) : parseInt(a);
      return (
        e > 0 && (r = (e < 10 ? "0" + parseInt(e) : parseInt(e)) + ":" + r),
        n > 0 && (r = parseInt(n) + ":" + r),
        r
      );
    },
    onShow: function () {},
    errorRefresh: function () {
      t || (t = this),
        e.userLogin(function (a) {
          t.refresh();
        });
    },
    refresh: function () {
      (this.page = 1), this.loadData();
    },
  },
});
