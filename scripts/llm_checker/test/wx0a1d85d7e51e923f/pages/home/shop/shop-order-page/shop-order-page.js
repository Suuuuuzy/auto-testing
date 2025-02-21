var t,
  a = require("../../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
e.BasePage(
  a(
    a(
      a(
        a(
          a(
            {
              data: {
                cartList: [],
                timeMultiArray: [[], [], []],
                timeMultiIndex: [-1, -1, -2],
                time: { h: 0, m: 0 },
                formData: {
                  arriveTime: 0,
                  cartList: null,
                  address_id: 0,
                  remark: "",
                  tipValue: 0,
                  payType: 0,
                  pay_type: 0,
                },
                imgList: [],
                remarkFocused: !1,
                tipValue: 0,
                payWayList: [
                  {
                    uy_name: "ۋېيشىندىن تۆلەش",
                    ch_name: "微信支付",
                    checked: !0,
                  },
                  {
                    uy_name: "نەخ پۇل تۆلەش",
                    ch_name: "到货付款",
                    checked: !1,
                  },
                ],
                scanResult: "",
              },
              onLoad: function (a) {
                (t = this),
                  (this.cartList = e.globalData.cartList),
                  this.cartList &&
                    ((this.cartList.totalPrice = (
                      parseFloat(this.cartList.allPrice) +
                      parseFloat(this.cartList.deliveryFee)
                    ).toFixed(2)),
                    (this.data.formData.cartList = this.cartList),
                    this.setData({ formData: this.data.formData })),
                  console.log("fuck  --\x3e>", this.data.formData),
                  this.initTipData(),
                  this.loadData();
              },
              loadData: function () {
                this.requestWithLoading("shop/shopOrderPage", {}, function (a) {
                  a && (t.initTime(a.time), t.setData({ pageData: a }));
                });
              },
              initTipData: function () {
                var t = [
                  { title: this.data.Str.noAdd[this.data.lanIndex], value: 0 },
                  { title: "￥1", value: "1" },
                  { title: "￥2", value: "2" },
                  { title: "￥3", value: "3" },
                  { title: "￥5", value: "5" },
                  { title: "￥10", value: "10" },
                  { title: "￥15", value: "15" },
                  { title: "￥20", value: "20" },
                  { title: "￥25", value: "25" },
                ];
                this.setData({ tipData: t });
              },
              messageInput: function (t) {
                (this.data.formData.remark = t.detail.value),
                  this.setData({ formData: this.data.formData });
              },
              initTime: function (a) {
                var e = new Date(a.replace(/-/g, "/")),
                  i = e.getHours(),
                  s = e.getMinutes(),
                  r = this.data.timeMultiArray;
                r[0].push(t.data.Str.today[this.data.lanIndex]),
                  r[1].push(this.data.Str.getNow[this.data.lanIndex]);
                for (var o = 0; o < 24; o++) o > i && r[1].push("" + o);
                for (var d = 0; d < 6; d++)
                  0 == d ? r[2].push("00") : r[2].push("" + 10 * d);
                (this.data.time.h = i),
                  (this.data.time.m = s),
                  this.setData({ timeMultiArray: r, time: this.data.time });
              },
              timeMultiChange: function (t) {
                console.log(t),
                  this.setData({ timeMultiIndex: t.detail.value }),
                  -1 == this.data.timeMultiIndex[0] ||
                  0 == this.data.timeMultiIndex[1]
                    ? (this.data.formData.arriveTime = 0)
                    : this.data.timeMultiIndex[1] > 0 &&
                      -1 != this.data.timeMultiIndex[2] &&
                      (this.data.formData.arriveTime =
                        this.data.timeMultiArray[1][
                          this.data.timeMultiIndex[1]
                        ] +
                        ":" +
                        this.data.timeMultiArray[2][
                          this.data.timeMultiIndex[2]
                        ]);
              },
              timeMultiColumnChange: function (t) {
                console.log(t);
                var a = {
                    multiArray: this.data.timeMultiArray,
                    multiIndex: this.data.timeMultiIndex,
                  },
                  e = t.detail.column,
                  i = t.detail.value;
                switch (((a.multiIndex[e] = i), e)) {
                  case 0:
                    (a.multiArray[1] = []),
                      a.multiArray[1].push(
                        this.data.Str.getNow[this.data.lanIndex]
                      );
                    for (var s = 0; s < 24; s++)
                      s > this.data.time.h && a.multiArray[1].push("" + s);
                    break;
                  case 1:
                    if (0 != i) for (var r = 0; r < 6; r++);
                }
                this.setData({ timeMultiArray: a.multiArray });
              },
              addAddress: function (a) {
                var e =
                  1 == this.data.formData.cartList.shop.is_volunteer ? 6 : 5;
                wx.navigateTo({
                  url:
                    "/pages/mine/my-address/my-address?type=" +
                    e +
                    "&title=" +
                    t.data.Str.selectAddress[t.data.lanIndex],
                });
              },
              addBtn: function (t) {
                console.log(t);
                var a = t.currentTarget.dataset.index,
                  e = t.currentTarget.dataset.indexx;
                this.initCartList(a, e, 1);
              },
              removeBtn: function (t) {
                var a = t.currentTarget.dataset.index,
                  e = t.currentTarget.dataset.indexx;
                this.initCartList(a, e, 0);
              },
              initCartList: function (t, a, e) {
                var i = 0,
                  s = 0,
                  r = this.data.formData.cartList.cartItems;
                for (var o in r)
                  r[o].index == t &&
                    r[o].indexx == a &&
                    (!0,
                    1 == e
                      ? r[o].count++
                      : 1 == r[o].count
                      ? r.splice(o, 1)
                      : r[o].count--),
                    r[o] &&
                      ((i += r[o].count),
                      (s = (
                        parseFloat(s) + parseFloat(r[o].item.price * r[o].count)
                      ).toFixed(2)));
                (this.data.formData.cartList.totalPrice = (
                  parseFloat(s) +
                  parseFloat(this.data.formData.cartList.deliveryFee)
                ).toFixed(2)),
                  (this.data.formData.cartList.allCount = i),
                  (this.data.formData.cartList.allPrice = s),
                  this.data.formData.cartList.allPrice >=
                  parseFloat(this.data.formData.cartList.shop.starting_price)
                    ? (this.data.formData.cartList.canOrder = !0)
                    : (this.data.formData.cartList.canOrder = !1),
                  0 == r.length && this.setData({ modalName: "" }),
                  (this.data.formData.cartList.cartItems = r),
                  this.setData({ formData: this.data.formData });
              },
              showDetail: function () {
                console.log("show detail"),
                  "detailModal" == this.data.modalName
                    ? this.hideModal()
                    : this.setData({ modalName: "detailModal" });
              },
              hideModal: function () {
                this.setData({ modalName: "" });
              },
              chooseImage: function () {
                var t = this;
                this.isEditing
                  ? wx.navigateTo({
                      url:
                        "../image-page/image-page?pageIndex=1&id=" +
                        this.productId,
                    })
                  : wx.chooseImage({
                      count: 1,
                      sizeType: ["compressed"],
                      sourceType: ["album"],
                      success: function (a) {
                        0 != t.data.imgList.length
                          ? t.setData({
                              imgList: t.data.imgList.concat({
                                url: a.tempFilePaths[0],
                                state: "local",
                              }),
                            })
                          : t.setData({
                              imgList: [
                                { url: a.tempFilePaths[0], state: "local" },
                              ],
                            });
                      },
                    });
              },
              viewImage: function (t) {
                var a = [t.currentTarget.dataset.url];
                wx.previewImage({ current: a[0], urls: a });
              },
              delImg: function (t) {
                this.isEditing
                  ? wx.navigateTo({
                      url:
                        "../image-page/image-page?pageIndex=1&id=" +
                        this.productId,
                    })
                  : (this.data.imgList.splice(t.currentTarget.dataset.index, 1),
                    this.setData({ imgList: this.data.imgList }));
              },
              subBtn: function (a) {
                var i = this;
                if ((t || (t = this), this.data.selectAddress))
                  if (
                    1 != this.data.formData.cartList.shop.has_scan ||
                    !this.data.pageData.isAdmin ||
                    this.data.scanResult
                  ) {
                    if (1 == this.data.formData.cartList.shop.is_postal) {
                      var s = !0;
                      for (var r in this.data.formData.cartList.cartItems)
                        if (
                          !this.data.formData.cartList.cartItems[r].item
                            .pickup_number
                        ) {
                          s = !1;
                          break;
                        }
                      if (!s && !this.data.formData.remark)
                        return void this.showT(
                          {
                            content:
                              t.data.Str.inputPickupNumber[t.data.lanIndex],
                          },
                          function (a) {
                            t.setData({ remarkFocused: !0 });
                          }
                        );
                    }
                    console.log("formData--\x3e>", this.data.formData);
                    var o = {
                      address_id: this.data.formData.address_id,
                      arrive_time: this.data.formData.arriveTime,
                      all_count: this.data.formData.cartList.allCount,
                      base_fee: this.data.formData.cartList.deliveryFee,
                      total_fee: this.data.formData.cartList.totalPrice,
                      shop_id: this.data.formData.cartList.shopId,
                      good_items: this.data.formData.cartList.cartItems,
                      text_remark: this.data.formData.remark,
                      area_id: this.data.formData.cartList.shop.area_id,
                      type_id: this.data.formData.cartList.shop.type_id,
                      tip_value: this.data.formData.tipValue,
                      is_volunteer:
                        this.data.formData.cartList.shop.is_volunteer,
                      pay_type: 1 == this.data.formData.payType ? 2 : 0,
                      bar_code: this.data.scanResult,
                    };
                    if (0 == this.data.imgList.length)
                      this.requestWithLoading(
                        "shop/createOrder",
                        { formData: JSON.stringify(o) },
                        function (a) {
                          if (a && a.id) {
                            if (
                              1 == t.data.formData.cartList.shop.is_volunteer ||
                              (1 == t.data.formData.cartList.shop.is_cash &&
                                1 == i.data.formData.payType)
                            )
                              return void t.showT(
                                {
                                  content:
                                    t.data.Str.takeOrderSuccess[
                                      t.data.lanIndex
                                    ],
                                  icon: "success",
                                  color: "blue",
                                },
                                function (i) {
                                  (e.globalData.orderId = a.id),
                                    t.setData({ isLoading: !0 }),
                                    setTimeout(function () {
                                      t.setData({ isLoading: !1 }),
                                        wx.navigateBack({});
                                    }, 500);
                                }
                              );
                            t.pay(a.id);
                          } else t.failureToast();
                        }
                      );
                    else {
                      var d = {
                        token: this.user.getToken(),
                        formData: JSON.stringify(o),
                      };
                      this._upload(d);
                    }
                  } else
                    t.showT(
                      { content: t.data.Str.scanner[t.data.lanIndex] },
                      function (a) {
                        t.selectScan();
                      }
                    );
                else
                  t.showT(
                    { content: t.data.Str.selectAddress[t.data.lanIndex] },
                    function (a) {
                      t.addAddress();
                    }
                  );
              },
              _upload: function (a) {
                this.setData({ isLoading: !0 }),
                  wx.uploadFile({
                    url: this.req.getBaseUrl() + "shop/createOrderWithImage",
                    filePath: this.data.imgList[0].url,
                    name: "source",
                    header: { "Content-Type": "multipart/form-data" },
                    formData: a,
                    success: function (a) {
                      var e;
                      t.setData({ isLoading: !1 });
                      try {
                        e = JSON.parse(a.data);
                      } catch (t) {
                        e = !1;
                      }
                      e && 0 != e.resultCode
                        ? 1 == e.resultCode &&
                          (console.log(e.resultData), t.pay(e.resultData.id))
                        : t.failureToast();
                    },
                    fail: function (a) {
                      t.setData({ isLoading: !1 }), t.failureToast();
                    },
                    complete: function (t) {},
                  });
              },
              pay: function (a) {
                this.requestWithLoading(
                  "order/payOrderFee",
                  { orderId: a },
                  function (i) {
                    i &&
                      wx.requestPayment({
                        timeStamp: i.timestamp,
                        nonceStr: i.nonceStr,
                        package: i.package,
                        signType: i.signType,
                        paySign: i.paySign,
                        success: function () {
                          t.showT(
                            {
                              content:
                                t.data.Str.takeOrderSuccess[t.data.lanIndex],
                              icon: "success",
                              color: "cyan",
                            },
                            function (i) {
                              (e.globalData.orderId = a),
                                t.setData({ isLoading: !0 }),
                                setTimeout(function () {
                                  t.setData({ isLoading: !1 }),
                                    wx.navigateBack({});
                                }, 500);
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
              onReady: function () {},
              onShow: function () {
                e.globalData._selectAddress &&
                  ((t.data.formData.address_id =
                    e.globalData._selectAddress.id),
                  t.setData({
                    selectAddress: e.globalData._selectAddress,
                    formData: t.data.formData,
                  }),
                  (e.globalData._selectAddress = null));
              },
              tipItemClick: function (t) {
                this.setData({
                  otherValueEditing: !1,
                  modalName: "tipModal",
                  tipValue: this.data.formData.tipValue,
                });
              },
              otherValueClick: function (t) {
                this.setData({ otherValueEditing: !0 });
              },
              otherValueInput: function (t) {
                this.tool.isNumber(t.detail.value) &&
                  this.setData({ tipValue: t.detail.value });
              },
              tipModaltemClick: function (t) {
                this.setData({
                  tipValue: t.currentTarget.dataset.value,
                  otherValueEditing: !1,
                });
              },
              tipConfirmBtn: function (t) {
                (this.data.formData.tipValue = this.data.tipValue),
                  this.hideModal(),
                  this.setData({ formData: this.data.formData }),
                  this.initTotalPrice();
              },
              initTotalPrice: function () {
                this.data.formData.cartList &&
                  (this.data.formData.cartList.totalPrice = (
                    parseFloat(this.data.formData.cartList.allPrice) +
                    parseFloat(this.data.formData.cartList.deliveryFee) +
                    parseFloat(this.data.formData.tipValue)
                  ).toFixed(2)),
                  this.setData({ formData: this.data.formData });
              },
              selectScan: function () {
                wx.scanCode({
                  onlyFromCamera: !0,
                  success: function (a) {
                    console.log("scan --\x3e>", a),
                      t.setData({ scanResult: a.result });
                  },
                  fail: function (t) {},
                });
              },
              selectPayWayClick: function () {
                var t = this.data.payWayList;
                for (var a in t)
                  a == this.data.formData.payType
                    ? (t[a].checked = !0)
                    : (t[a].checked = !1);
                (this.data.payWayList = t),
                  this.setData({
                    selectData: t,
                    modalName: "selectModal",
                    selectIndex: 1,
                  });
              },
              selectChange: function (t) {
                console.log("s ---\x3e>", t),
                  (this.data.formData.payType = t.detail.value),
                  this.setData({ formData: this.data.formData, modalName: "" });
              },
            },
            "hideModal",
            function () {
              this.setData({ modalName: "" });
            }
          ),
          "onHide",
          function () {}
        ),
        "onUnload",
        function () {}
      ),
      "onPullDownRefresh",
      function () {}
    ),
    "onReachBottom",
    function () {}
  )
);
