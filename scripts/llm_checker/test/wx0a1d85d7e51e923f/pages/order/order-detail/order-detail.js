var t,
  e = require("../../../@babel/runtime/helpers/defineProperty"),
  a =
    (t = require("../../../service/lib/barcode/index.js")) && t.__esModule
      ? t
      : { default: t };
var r,
  o = getApp();
o.BasePage(
  e(
    e(
      e(
        e(
          e(
            e(
              e(
                e(
                  {
                    data: {
                      stateList: [
                        { uy_name: "زاكاس چۈشۈرۈلدى", ch_name: "下单成功" },
                        {
                          uy_name: "پۇل تۆلەندى",
                          ch_name: "支付成功",
                          uy_name_: "پۇل تۆلەنمىگەن",
                          ch_name_: "未支付",
                        },
                        { uy_name: "بىكار قىلىندى", ch_name: "已取消" },
                        { uy_name: "قوبۇلىنىۋاتدۇ", ch_name: "等待接单" },
                        { uy_name: "يەتكۈزۈلۋاتدۇ", ch_name: "正在配送" },
                        { uy_name: "تاماملاندى", ch_name: "已完成" },
                      ],
                      num: 0,
                      scroll: 0,
                    },
                    onLoad: function (t) {
                      (r = this),
                        (this.id = t.id),
                        (o.globalData.orderId = null),
                        (this.dialog = this.selectComponent("#dialog")),
                        r.setData({ userId: this.user.getId() }),
                        this.loadData();
                    },
                    loadData: function () {
                      this.requestWithLoading(
                        "order/getOrderById",
                        { id: this.id },
                        function (t) {
                          t &&
                            (r.setData({ result: t }),
                            0 == t.order.pay_state &&
                              0 == t.order.is_volunteer &&
                              ((r.data.num = 1), (r.data.scroll = 1)),
                            ((-1 == t.order.pay_state &&
                              -2 == t.order.order_state &&
                              0 == t.order.is_volunteer) ||
                              (-2 == t.order.order_state &&
                                1 == t.order.is_volunteer)) &&
                              ((r.data.num = 2), (r.data.scroll = 2)),
                            ((1 == t.order.pay_state &&
                              0 == t.order.order_state) ||
                              (1 == t.order.is_volunteer &&
                                0 == t.order.order_state) ||
                              (2 == t.order.pay_type &&
                                0 == t.order.order_state)) &&
                              ((r.data.num = 3), (r.data.scroll = 3)),
                            (1 == t.order.order_state ||
                              (1 == t.order.is_volunteer &&
                                1 == t.order.order_state)) &&
                              ((r.data.num = 4), (r.data.scroll = 4)),
                            (2 == t.order.order_state ||
                              (1 == t.order.order_state &&
                                1 == t.order.is_volunteer)) &&
                              ((r.data.num = 5), (r.data.scroll = 5)),
                            t.order.order_no &&
                              a.default.barcode(
                                "barcode",
                                t.order.order_no,
                                680,
                                150
                              ),
                            console.log(r.data.num),
                            r.setData({
                              num: r.data.num,
                              scroll: r.data.scroll,
                            }),
                            r.initGoods(),
                            r.initTableNum());
                        }
                      );
                    },
                    initGoods: function () {
                      this.data.result &&
                        this.data.result.order &&
                        this.data.result.order.goods.length > 0 &&
                        (this.data.result.order.goods.forEach(function (t) {
                          t.specification_items &&
                            (t.specification_items = JSON.parse(
                              t.specification_items
                            ));
                        }),
                        this.setData({ result: this.data.result })),
                        console.log("initGoods --\x3e>", this.data.res);
                    },
                    initTableNum: function () {
                      var t = this.data.result.order.table_num;
                      if (t) {
                        var e = t.toString();
                        1 == e.length &&
                          ((e = "0" + e), console.log("strNum ---\x3e>", e));
                        var a = e.split("");
                        (this.data.result.order.tableNums = a),
                          this.setData({ result: this.data.result });
                      }
                    },
                    scrollSteps: function () {
                      this.setData({
                        scroll:
                          9 == this.data.scroll ? 0 : this.data.scroll + 1,
                      });
                    },
                    copyBtn: function (t) {
                      wx.setClipboardData({
                        data: r.data.result.order.order_no,
                        success: function () {
                          r.successToast();
                        },
                      });
                    },
                    callPhone: function (t) {
                      var e = t.currentTarget.dataset.phone;
                      wx.makePhoneCall({ phoneNumber: e });
                    },
                    confrimReceiptBtn: function (t) {
                      this.requestWithLoading(
                        "order/confirmReceipt",
                        { orderId: this.data.result.order.id },
                        function (t) {
                          t &&
                            r.successToast(function (t) {
                              r.loadData();
                            });
                        }
                      );
                    },
                    cancelOrder: function (t) {
                      this.setData({
                        dialogContent:
                          this.data.Str.realyCancelOrder[this.data.lanIndex],
                      });
                      t.currentTarget.dataset.item;
                      this.dialog.show(function (t) {
                        r.requestWithLoading(
                          "order/userCancelOrder",
                          { orderId: r.data.result.order.id },
                          function (t) {
                            t
                              ? r.showT(
                                  {
                                    content:
                                      r.data.Str.canceldSuccess[
                                        r.data.lanIndex
                                      ],
                                    icon: "success",
                                    color: "pink",
                                  },
                                  function (t) {
                                    r.loadData();
                                  }
                                )
                              : r.showT(
                                  {
                                    content:
                                      r.data.Str.canceldOrderError[
                                        r.data.lanIndex
                                      ],
                                    icon: "error",
                                    color: "red",
                                  },
                                  function (t) {
                                    r.loadData();
                                  }
                                );
                          }
                        );
                      });
                    },
                  },
                  "callPhone",
                  function (t) {
                    var e = t.currentTarget.dataset.phone;
                    wx.makePhoneCall({ phoneNumber: e });
                  }
                ),
                "imageBind",
                function (t) {
                  var e = t.currentTarget.dataset.url;
                  wx.previewImage({ urls: [e] });
                }
              ),
              "onReady",
              function () {}
            ),
            "onShow",
            function () {}
          ),
          "onHide",
          function () {}
        ),
        "onUnload",
        function () {}
      ),
      "onPullDownRefresh",
      function () {
        this.loadData();
      }
    ),
    "onReachBottom",
    function () {}
  )
);
