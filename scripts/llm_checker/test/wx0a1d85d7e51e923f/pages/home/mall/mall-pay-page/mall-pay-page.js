var a,
  t = require("../../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
e.BasePage(
  t(
    t(
      t(
        t(
          t(
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
                  take_food_way: 1,
                  people_num: 1,
                  max_coupon: 0,
                  cash_max_coupon: 0,
                  cash_coupon_amount: 0,
                  coupon_percent: 0,
                  coupon_amount: 0,
                  actuly_amount: 0,
                  total_discounted: 0,
                  phone: null,
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
                tableInfo: [
                  {
                    uy_name: "تاماق بۇيرۇتاي",
                    ch_name: "外卖配送",
                    icon: "takeout_top",
                  },
                  {
                    uy_name: "بېرىپ ئېلۋالاي",
                    ch_name: "到店自取",
                    icon: "takeaway_top",
                  },
                ],
                takeFoodWay: [
                  {
                    id: 1,
                    uy_name: "ئاشخانىدا يەيمەن",
                    ch_name: "餐厅就餐",
                    checked: !0,
                  },
                  {
                    id: 2,
                    uy_name: "ئېلىپ كىتىمەن",
                    ch_name: "打包带走",
                    checked: !1,
                  },
                  {
                    id: 3,
                    uy_name: "يەتكۈزۈپ بەرسۇن",
                    ch_name: "叫外卖",
                    checked: !1,
                  },
                ],
                scanResult: "",
                STabCur: 0,
                tIndex: 0,
                deliveryFee: 0,
              },
              STabSelect: function (a) {
                this.setData({
                  STabCur: a.currentTarget.dataset.id,
                  scrollLeft: 60 * (a.currentTarget.dataset.id - 1),
                }),
                  1 == this.data.STabCur
                    ? ((this.cartList.deliveryFee = 0),
                      (this.data.formData.take_food_way = 2))
                    : ((this.cartList.deliveryFee = this.data.deliveryFee),
                      (this.data.formData.take_food_way = 3)),
                  this.setData({ cartList: this.data.cartList, tIndex: 0 }),
                  this._initTime(),
                  this.initTotalPrice();
                var t = this.cartList.shop.shop_percent;
                t > 0
                  ? ((this.data.formData.max_coupon = (
                      (this.cartList.allPrice * (t - 0.6)) /
                      100
                    ).toFixed(2)),
                    (this.data.formData.cash_max_coupon = (
                      (99.4 * this.cartList.totalPrice) /
                      100
                    ).toFixed(2)))
                  : (this.data.formData.max_coupon = 0),
                  this.setData({ formData: this.data.formData }),
                  this.initCoupon(!1),
                  this.initCoupon(!1);
              },
              onLoad: function (t) {
                (a = this),
                  (this.cartList = JSON.parse(t.cartList)),
                  console.log("onload cartList --\x3e>", this.cartList),
                  this.cartList &&
                    (this.cartList.shop &&
                      1 == this.cartList.shop.can_delivery &&
                      ((this.data.formData.take_food_way = 3),
                      (this.cartList.deliveryFee = this.cartList.deliveryFee),
                      (this.data.deliveryFee = this.cartList.deliveryFee)),
                    this.cartList.tableNum && (this.cartList.deliveryFee = 0),
                    console.log(
                      "cartList totalPrice --\x3e>" + this.cartList.totalPrice
                    ),
                    (this.data.formData.cartList = this.cartList)),
                  this.initPercent(),
                  console.log("fuck  --\x3e>", this.data.formData),
                  console.log("cartList --\x3e>", this.data.formData.cartList),
                  this.initTipData(),
                  this.initTableNum(),
                  this.initTotalPrice(),
                  this.loadData();
              },
              initPercent: function () {
                if (this.cartList) {
                  var a = 0;
                  (a = this.cartList.tableNum
                    ? this.cartList.shop.shop_percent
                    : 1 == this.cartList.shop.can_delivery
                    ? parseInt(this.cartList.shop.takeaway_percent / 3)
                    : parseInt(this.cartList.shop.booking_percent)) > 0
                    ? ((this.data.formData.max_coupon = (
                        (this.cartList.allPrice * (a - 0.6)) /
                        100
                      ).toFixed(2)),
                      (this.data.formData.cash_max_coupon = (
                        (99.4 * this.cartList.totalPrice) /
                        100
                      ).toFixed(2)))
                    : (this.data.formData.max_coupon = 0),
                    (this.data.formData.coupon_percent = a),
                    (e.globalData.couponData = null),
                    this.setData({ formData: this.data.formData });
                }
              },
              loadData: function () {
                this.requestWithLoading(
                  "shop/shopOrderPage",
                  { shopId: this.data.formData.cartList.shop.id },
                  function (t) {
                    t &&
                      (a.initTime(t.time),
                      a._initTime(t.time),
                      (t.isShow = t.isShow),
                      a.setData({ pageData: t }),
                      t.phone &&
                        ((a.data.formData.phone = t.phone),
                        a.setData({ formData: a.data.formData })),
                      a.initCoupon());
                  }
                );
              },
              phoneInput: function (a) {
                (this.data.formData.phone = a.detail.value),
                  this.setData({ formData: this.data.formData });
              },
              editPhone: function (a) {
                this.setData({ phoneFocus: !0 });
              },
              initTableNum: function () {
                var a = this.data.formData.cartList.tableNum;
                if (a) {
                  var t = a.toString();
                  1 == t.length &&
                    ((t = "0" + t), console.log("strNum ---\x3e>", t));
                  var e = t.split("");
                  (this.data.formData.cartList.tableNums = e),
                    this.setData({ formData: this.data.formData });
                }
              },
              selectTableNum: function (a) {
                this.data.pageData &&
                  this.data.pageData.isWaiter &&
                  this.data.formData.cartList.shop.has_ordering_service &&
                  wx.navigateTo({ url: "./select-table-num/select-table-num" });
              },
              addPeopleBtn: function (a) {
                this.data.formData.people_num < 100 &&
                  this.data.formData.people_num++,
                  this.setData({ formData: this.data.formData });
              },
              removePeopleBtn: function (a) {
                this.data.formData.people_num > 1 &&
                  this.data.formData.people_num--,
                  this.setData({ formData: this.data.formData });
              },
              initTipData: function () {
                var a = [
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
                this.setData({ tipData: a });
              },
              messageInput: function (a) {
                (this.data.formData.remark = a.detail.value),
                  this.setData({ formData: this.data.formData });
              },
              setRemark: function (a) {
                (this.data.formData.remark = a),
                  this.setData({ formData: this.data.formData });
              },
              initTime: function (t) {
                var e = new Date(t.replace(/-/g, "/")),
                  i = e.getHours(),
                  o = e.getMinutes(),
                  s = this.data.timeMultiArray;
                s[0].push(a.data.Str.today[this.data.lanIndex]),
                  s[1].push(this.data.Str.getNow[this.data.lanIndex]);
                for (var r = 0; r < 24; r++) r > i && s[1].push("" + r);
                for (var n = 0; n < 6; n++)
                  0 == n ? s[2].push("00") : s[2].push("" + 10 * n);
                (this.data.time.h = i),
                  (this.data.time.m = o),
                  this.setData({ timeMultiArray: s, time: this.data.time });
              },
              _initTime: function (a) {
                if ((a || (a = this.data.pageData.time), a)) {
                  for (
                    var t = new Date(a.replace(/-/g, "/")),
                      e = t.getHours(),
                      i = t.getMinutes(),
                      o = [],
                      s = 0;
                    s < 100 &&
                    (0 == s && 0 == this.data.STabCur ? (i += 45) : (i += 20),
                    i >= 60 && ((i %= 60), e++),
                    !(e > 24));
                    s++
                  )
                    o.push(e + ":" + (i >= 10 ? i : "0" + i));
                  this.setData({ allTime: o }),
                    o.length > 0 && (this.data.formData.arriveTime = o[0]);
                }
              },
              timeChange: function (a) {
                this.setData({ tIndex: a.detail.value }),
                  (this.data.formData.arriveTime = allTime[this.data.tIndex]);
              },
              timeMultiChange: function (a) {
                console.log(a),
                  this.setData({ timeMultiIndex: a.detail.value }),
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
              timeMultiColumnChange: function (a) {
                console.log(a);
                var t = {
                    multiArray: this.data.timeMultiArray,
                    multiIndex: this.data.timeMultiIndex,
                  },
                  e = a.detail.column,
                  i = a.detail.value;
                switch (((t.multiIndex[e] = i), e)) {
                  case 0:
                    (t.multiArray[1] = []),
                      t.multiArray[1].push(
                        this.data.Str.getNow[this.data.lanIndex]
                      );
                    for (var o = 0; o < 24; o++)
                      o > this.data.time.h && t.multiArray[1].push("" + o);
                    break;
                  case 1:
                    if (0 != i) for (var s = 0; s < 6; s++);
                }
                this.setData({ timeMultiArray: t.multiArray });
              },
              addAddress: function (t) {
                var e = this.data.formData.cartList.shop.is_volunteer;
                console.log("isShop --\x3e>", e);
                var i = 1 == e ? 6 : 5;
                console.log("type --\x3e>", i),
                  wx.navigateTo({
                    url:
                      "/pages/mine/my-address/my-address?type=" +
                      i +
                      "&shopId=" +
                      this.data.formData.cartList.shop.id +
                      "&title=" +
                      a.data.Str.selectAddress[a.data.lanIndex],
                  });
              },
              initCoupon: function () {
                var a =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0];
                if ((console.log("canceld --\x3e>", a), this.data.pageData)) {
                  var t = this.data.pageData.hasCashCart
                      ? this.data.pageData.cashCoupon
                      : this.data.pageData.coupon,
                    e = 0,
                    i = this.data.pageData.hasCashCart
                      ? this.data.formData.cash_max_coupon
                      : this.data.formData.max_coupon;
                  if (
                    (t.forEach(function (a) {
                      a.selected = !1;
                    }),
                    a)
                  )
                    e = 0;
                  else {
                    for (var o in t) {
                      if (!(e < i)) break;
                      (e = parseFloat(e) + parseFloat(t[o].amount)),
                        (t[o].selected = !0);
                    }
                    e > i && (e = i);
                  }
                  this.data.pageData.hasCashCart
                    ? ((this.data.formData.cash_coupon_amount = e),
                      (this.data.formData.coupon_amount = e),
                      (this.data.formData.max_coupon = i))
                    : (this.data.formData.coupon_amount = e),
                    (this.data.formData.coupon_amount = parseFloat(
                      this.data.formData.coupon_amount
                    ).toFixed(2)),
                    this.setData({ coupon: t, formData: this.data.formData }),
                    this.initCouponSelected();
                }
              },
              initCouponSelected: function () {
                var a = this.data.coupon,
                  t = 0,
                  e = 0;
                console.log("coupon pageData --\x3e>", this.data.pageData);
                var i = this.data.pageData.hasCashCart
                  ? this.data.formData.cash_max_coupon
                  : this.data.formData.max_coupon;
                if (a) {
                  for (var o in a)
                    a[o].selected &&
                      ((t = parseFloat(t) + parseFloat(a[o].amount)), e++);
                  t > i && (t = i),
                    (t = parseFloat(t).toFixed(2)),
                    this.data.pageData.hasCashCart
                      ? (this.data.formData.cash_coupon_amount = t)
                      : (this.data.formData.coupon_amount = t),
                    0 == this.data.formData.payType
                      ? (this.data.formData.total_discounted =
                          parseFloat(t) +
                          parseFloat(
                            this.data.formData.cartList.discountDeliveryFee
                          ) +
                          parseFloat(
                            this.data.formData.cartList.discountAmount
                          ) +
                          parseFloat(
                            this.data.formData.cartList.discountGoodAmount
                          ))
                      : (this.data.formData.total_discounted =
                          +parseFloat(
                            this.data.formData.cartList.discountAmount
                          ) +
                          parseFloat(
                            this.data.formData.cartList.discountGoodAmount
                          )),
                    console.log(
                      "totalDiscounted=" + this.data.formData.total_discounted
                    ),
                    (this.data.formData.total_discounted =
                      this.data.formData.total_discounted.toFixed(2)),
                    (this.data.formData.actuly_amount = parseFloat(
                      this.data.formData.cartList.totalPrice -
                        this.data.formData.total_discounted
                    ).toFixed(2)),
                    console.log("formData --\x3e>", this.data.formData),
                    this.setData({
                      selectedCartCount: e,
                      formData: this.data.formData,
                    });
                }
              },
              couponItemClick: function (a) {
                var t = {
                  coupon: this.data.coupon,
                  maxAmount: this.data.formData.max_coupon,
                  couponAmount: this.data.formData.coupon_amount,
                };
                (e.globalData.couponData = t),
                  wx.navigateTo({
                    url:
                      "./mall-coupon-page/mall-coupon-page?title=" +
                      this.data.Str.couponCart[this.data.lanIndex],
                  });
              },
              addBtn: function (a) {
                console.log(a);
                var t = a.currentTarget.dataset.index,
                  e = a.currentTarget.dataset.indexx;
                this.initCartList(t, e, 1);
              },
              removeBtn: function (a) {
                var t = a.currentTarget.dataset.index,
                  e = a.currentTarget.dataset.indexx;
                this.initCartList(t, e, 0);
              },
              initCartList: function (a, t, e) {
                var i = 0,
                  o = 0,
                  s = this.data.formData.cartList.cartItems;
                for (var r in s)
                  s[r].index == a &&
                    s[r].indexx == t &&
                    (!0,
                    1 == e
                      ? s[r].count++
                      : 1 == s[r].count
                      ? s.splice(r, 1)
                      : s[r].count--),
                    s[r] &&
                      ((i += s[r].count),
                      (o = (
                        parseFloat(o) + parseFloat(s[r].item.price * s[r].count)
                      ).toFixed(2)));
                (this.data.formData.cartList.totalPrice = (
                  parseFloat(this.data.formData.cartList.totalPrice) +
                  parseFloat(this.data.formData.cartList.deliveryFee)
                ).toFixed(2)),
                  console.log(
                    "totalPrice --\x3e>" +
                      this.data.formData.cartList.totalPrice
                  ),
                  (this.data.formData.cartList.allCount = i),
                  (this.data.formData.cartList.allPrice = o),
                  this.data.formData.cartList.allPrice >=
                  parseFloat(this.data.formData.cartList.shop.starting_price)
                    ? (this.data.formData.cartList.canOrder = !0)
                    : (this.data.formData.cartList.canOrder = !1),
                  0 == s.length && this.setData({ modalName: "" }),
                  (this.data.formData.cartList.cartItems = s),
                  this.setData({ formData: this.data.formData });
              },
              showDetail: function () {
                console.log("show detail");
              },
              hideModal: function () {
                this.setData({ modalName: "" });
              },
              chooseImage: function () {
                var a = this;
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
                      success: function (t) {
                        0 != a.data.imgList.length
                          ? a.setData({
                              imgList: a.data.imgList.concat({
                                url: t.tempFilePaths[0],
                                state: "local",
                              }),
                            })
                          : a.setData({
                              imgList: [
                                { url: t.tempFilePaths[0], state: "local" },
                              ],
                            });
                      },
                    });
              },
              viewImage: function (a) {
                var t = [a.currentTarget.dataset.url];
                wx.previewImage({ current: t[0], urls: t });
              },
              delImg: function (a) {
                this.isEditing
                  ? wx.navigateTo({
                      url:
                        "../image-page/image-page?pageIndex=1&id=" +
                        this.productId,
                    })
                  : (this.data.imgList.splice(a.currentTarget.dataset.index, 1),
                    this.setData({ imgList: this.data.imgList }));
              },
              takeFoodWayChange: function (a) {
                console.log(a),
                  (this.data.formData.take_food_way = a.detail.value),
                  3 == a.detail.value
                    ? (console.log(
                        "shop --\x3e>",
                        this.data.formData.cartList.shop
                      ),
                      console.log(
                        "cartList ---\x3e>",
                        this.data.formData.cartList
                      ),
                      (this.data.formData.cartList.deliveryFee =
                        this.data.formData.cartList.deliveryFee),
                      (this.data.formData.cartList.totalPrice = (
                        parseFloat(this.data.formData.cartList.allPrice) +
                        parseFloat(
                          this.data.formData.cartList.shop.delivery_fee
                        )
                      ).toFixed(2)))
                    : ((this.data.formData.cartList.deliveryFee = 0),
                      (this.data.formData.cartList.totalPrice = parseFloat(
                        this.data.formData.cartList.allPrice +
                          this.data.formData.cartList.deliveryFee
                      ).toFixed(2))),
                  this.setData({ formData: this.data.formData });
              },
              subBtn: function (t) {
                if (
                  (a || (a = this),
                  console.log("loading --\x3e>", a.data.isLoading),
                  !a.data.isLoading)
                )
                  if (
                    this.data.pageData.isWaiter &&
                    this.data.formData.cartList.shop.has_ordering_service &&
                    !this.data.formData.cartList.tableNum
                  )
                    a.showT(
                      { content: a.data.Str.selectTableNum[a.data.lanIndex] },
                      function (t) {
                        a.selectTableNum();
                      }
                    );
                  else if (
                    !this.data.pageData.isShow ||
                    0 != this.data.STabCur ||
                    this.data.formData.cartList.tableNum ||
                    !this.data.formData.cartList.shop.can_delivery ||
                    3 != this.data.formData.take_food_way ||
                    this.data.selectAddress
                  )
                    if (1 != this.data.STabCur || this.data.formData.phone)
                      if (
                        1 != this.data.STabCur ||
                        11 == this.data.formData.phone.length
                      )
                        if (
                          1 != this.data.formData.cartList.shop.has_scan ||
                          !this.data.pageData.isAdmin ||
                          this.data.scanResult
                        ) {
                          if (1 == this.data.formData.cartList.shop.is_postal) {
                            var i = !0;
                            for (var o in this.data.formData.cartList.cartItems)
                              if (
                                !this.data.formData.cartList.cartItems[o].item
                                  .pickup_number
                              ) {
                                i = !1;
                                break;
                              }
                            if (!i && !this.data.formData.remark)
                              return void this.showT(
                                {
                                  content:
                                    a.data.Str.inputPickupNumber[
                                      a.data.lanIndex
                                    ],
                                },
                                function (t) {
                                  a.setData({ remarkFocused: !0 });
                                }
                              );
                          }
                          for (var s in (console.log(
                            "list --\x3e>",
                            this.data.formData.cartList
                          ),
                          this.data.formData.cartList.cartItems)) {
                            var r = this.data.formData.cartList.cartItems[s];
                            if (r.specificationItems) {
                              var n = [];
                              for (var d in r.specificationIndexs) {
                                var c = r.specificationIndexs[d];
                                n.push(r.specificationItems[c[0]].items[c[1]]);
                              }
                              console.log("infoIds ---\x3e>", n),
                                (r.specificationInfoItems = n);
                            }
                          }
                          console.log("and _list --\x3e>", this.data.formData);
                          var l = [],
                            h = 0;
                          if (
                            this.data.coupon &&
                            this.data.formData.coupon_amount > 0
                          )
                            for (var u in this.data.coupon)
                              this.data.coupon[u].selected &&
                                (l.push(this.data.coupon[u]), h++);
                          console.log("coupon --\x3e>", this.data.couponData);
                          var m = {
                            address_id: this.data.formData.address_id,
                            arrive_time: this.data.formData.arriveTime,
                            all_count: this.data.formData.cartList.allCount,
                            base_fee: this.data.formData.cartList.deliveryFee,
                            total_fee: this.data.formData.cartList.totalPrice,
                            shop_id: this.data.formData.cartList.shop.id,
                            good_items: this.data.formData.cartList.cartItems,
                            text_remark: this.data.formData.remark,
                            area_id: this.data.formData.cartList.shop.area_id,
                            type_id: this.data.formData.cartList.shop.type_id,
                            tip_value: this.data.formData.tipValue,
                            is_volunteer:
                              this.data.formData.cartList.shop.is_volunteer,
                            pay_type: 1 == this.data.formData.payType ? 2 : 0,
                            bar_code: this.data.scanResult,
                            take_food_way: this.data.formData.take_food_way,
                            table_num: this.data.formData.cartList.tableNum,
                            cash_back_amount: this.data.formData.cartList
                              .tableNum
                              ? this.data.formData.cartList.cashBackAmount
                              : 0,
                            max_coupon: this.data.formData.max_coupon,
                            people_num: this.data.formData.people_num,
                            coupon_percent: this.data.formData.coupon_percent,
                            share_user_id: e.globalData.shareUserId
                              ? e.globalData.shareUserId
                              : 0,
                            coupon_amount: this.data.pageData.hasCashCart
                              ? this.data.formData.cash_coupon_amount
                              : this.data.formData.coupon_amount,
                            actual_fee: this.data.formData.actuly_amount,
                            coupon_items: l,
                            discount_coupon_count: h,
                            has_cash_cart: this.data.pageData.hasCashCart
                              ? 1
                              : 0,
                            packing_fee: this.data.formData.cartList.packingFee,
                            phone: this.data.formData.phone,
                            delivery_discount_amount:
                              this.data.formData.cartList.discountDeliveryFee,
                            reduction_discount_amount:
                              this.data.formData.cartList.discountAmount,
                            reduction_item_id: this.data.formData.cartList
                              .shopCouponSelectedItem
                              ? this.data.formData.cartList
                                  .shopCouponSelectedItem.id
                              : null,
                            good_discount_amount:
                              this.data.formData.cartList.discountGoodAmount,
                          };
                          if (
                            (console.log("data --\x3e>", m),
                            0 == this.data.imgList.length)
                          )
                            this.requestWithLoading(
                              "mall/createMallOrder",
                              { formData: JSON.stringify(m) },
                              function (t) {
                                if (t && t.id) {
                                  if (1 == a.data.formData.payType)
                                    return void a.showT(
                                      {
                                        content:
                                          a.data.Str.takeOrderSuccess[
                                            a.data.lanIndex
                                          ],
                                        icon: "success",
                                        color: "blue",
                                      },
                                      function (i) {
                                        (e.globalData.orderId = t.id),
                                          a.setData({ isLoading: !0 }),
                                          setTimeout(function () {
                                            a.setData({ isLoading: !1 }),
                                              wx.navigateBack({});
                                          }, 500);
                                      }
                                    );
                                  if (
                                    a.data.formData.cartList.tableNum &&
                                    0 ==
                                      a.data.formData.cartList.shop
                                        .scan_table_generate_coupon
                                  )
                                    return void a.pay(t.id);
                                  a.pay(t.id);
                                } else a.failureToast();
                              }
                            );
                          else {
                            var f = {
                              token: this.user.getToken(),
                              formData: JSON.stringify(m),
                            };
                            this._upload(f);
                          }
                        } else
                          a.showT(
                            { content: a.data.Str.scanner[a.data.lanIndex] },
                            function (t) {
                              a.selectScan();
                            }
                          );
                      else
                        a.showT(
                          { content: a.data.Str.errPhone[a.data.lanIndex] },
                          function (t) {
                            a.setData({ phoneFocus: !0 });
                          }
                        );
                    else
                      a.showT(
                        { content: a.data.Str.inputPhone[a.data.lanIndex] },
                        function (t) {
                          a.setData({ phoneFocus: !0 });
                        }
                      );
                  else
                    a.showT(
                      { content: a.data.Str.selectAddress[a.data.lanIndex] },
                      function (t) {
                        a.addAddress();
                      }
                    );
              },
              _upload: function (t) {
                this.setData({ isLoading: !0 }),
                  wx.uploadFile({
                    url: this.req.getBaseUrl() + "shop/createOrderWithImage",
                    filePath: this.data.imgList[0].url,
                    name: "source",
                    header: { "Content-Type": "multipart/form-data" },
                    formData: t,
                    success: function (t) {
                      var e;
                      a.setData({ isLoading: !1 });
                      try {
                        e = JSON.parse(t.data);
                      } catch (a) {
                        e = !1;
                      }
                      e && 0 != e.resultCode
                        ? 1 == e.resultCode &&
                          (console.log(e.resultData), a.pay(e.resultData.id))
                        : a.failureToast();
                    },
                    fail: function (t) {
                      a.setData({ isLoading: !1 }), a.failureToast();
                    },
                    complete: function (a) {},
                  });
              },
              pay: function (t) {
                this.requestWithLoading(
                  "order/payCouponOrderFee",
                  { orderId: t },
                  function (i) {
                    i &&
                      wx.requestPayment({
                        timeStamp: i.timestamp,
                        nonceStr: i.nonceStr,
                        package: i.package,
                        signType: i.signType,
                        paySign: i.paySign,
                        success: function () {
                          a.showT(
                            {
                              content:
                                a.data.Str.takeOrderSuccess[a.data.lanIndex],
                              icon: "success",
                              color: "cyan",
                            },
                            function (i) {
                              (e.globalData.orderId = t),
                                a.setData({ isLoading: !0 }),
                                setTimeout(function () {
                                  a.setData({ isLoading: !1 });
                                  var e = getCurrentPages();
                                  e[e.length - 2].setData({
                                    pData: { orderId: t },
                                  }),
                                    a.getPayedPage(t),
                                    a.setData({ payedPage: !0 });
                                }, 500);
                            }
                          );
                        },
                        fail: function (t) {
                          console.log(t), a.failureToast();
                        },
                      });
                  }
                );
              },
              getPayedPage: function (t) {
                var e = this;
                this.requestWithLoading(
                  "order/_getCouponPayedPage",
                  { orderId: t },
                  function (t) {
                    if (t) {
                      if (
                        (t.order &&
                          (t.order.actual_discount_fee = (
                            parseFloat(t.order.total_fee) -
                            parseFloat(t.order.actual_fee)
                          ).toFixed(2)),
                        t.scratch)
                      ) {
                        var i = "";
                        t.scratchLimit > 0 &&
                          ((i = a.data.isUy
                            ? "ئەمەلى سوممىسى ".concat(
                                t.scratchLimit,
                                " يەتسە ئالالايسىز"
                              )
                            : "实付金额到达".concat(
                                t.scratchLimit,
                                "元才可以领取红包"
                              )),
                          t.order.actual_fee >= t.scratchLimit &&
                            a.setData({ scratchCanUse: !0 }),
                          console.log(
                            "scratchCanUse --\x3e>",
                            e.data.scratchCanUse
                          ));
                        var o = {
                          title: a.data.Str.cashCart[a.data.lanIndex],
                          value: t.scratch.amount,
                          status: "default",
                          type: 1,
                          tag: "ok",
                          desc: "红包",
                          ruleDesc: i,
                          id: t.scratch.id,
                          state: t.scratch.state,
                        };
                        a.setData({ scratchItem: o });
                      }
                      a.setData({ payedData: t });
                    }
                  }
                );
              },
              scratchBtnClick: function (t) {
                console.log("scratchClick --\x3e>", t);
                var e = t.currentTarget.dataset.item;
                console.log("item --\x3e>", e),
                  e &&
                    this.requestWithLoading(
                      "order/receivedScratchCoupon",
                      { id: e.id },
                      function (t) {
                        t &&
                          a.successToast(function () {
                            (a.data.scratchItem.state = 1),
                              a.setData({ scratchItem: a.data.scratchItem });
                          });
                      }
                    );
              },
              onReady: function () {},
              onShow: function () {
                if (e.globalData._selectAddress) {
                  var t = e.globalData._selectAddress;
                  console.log("addressItem --\x3e>", t),
                    t &&
                      t.deliveryFee >= 0 &&
                      (!a.data.formData.cartList.hasDynamicPrice ||
                        (a.data.formData.cartList.hasDynamicPrice &&
                          0 == a.data.formData.cartList.deliveryFee)) &&
                      ((a.data.formData.cartList.deliveryFee = (
                        parseFloat(a.data.formData.cartList.shop.delivery_fee) +
                        parseFloat(t.deliveryFee)
                      ).toFixed(2)),
                      (a.data.deliveryFee = (
                        parseFloat(a.data.formData.cartList.shop.delivery_fee) +
                        parseFloat(t.deliveryFee)
                      ).toFixed(2))),
                    (a.data.formData.address_id =
                      e.globalData._selectAddress.id),
                    a.setData({
                      selectAddress: e.globalData._selectAddress,
                      formData: a.data.formData,
                      deliveryFee: a.data.deliveryFee,
                    }),
                    console.log("deliveryFee --\x3e>", this.data.deliveryFee),
                    (e.globalData._selectAddress = null),
                    this.initTotalPrice(),
                    this.initCouponSelected();
                }
                var i = getCurrentPages(),
                  o = i[i.length - 1],
                  s = o.data.tableData,
                  r = o.data.pData;
                if (r && r.orderId) wx.navigateBack({ delta: 0 });
                else {
                  if (
                    (console.log("tabledata --\x3e>", s),
                    s &&
                      s.tableNum &&
                      (this.data.pageData.isWaiter &&
                        ((this.data.formData.cartList.tableNum = s.tableNum),
                        this.setData({ formData: this.data.formData }),
                        this.initTableNum()),
                      this.setData({ tableData: null })),
                    e.globalData.couponData)
                  ) {
                    var n = e.globalData.couponData;
                    (this.data.formData.coupon_amount = n.couponAmount),
                      (this.data.coupon = n.coupon),
                      this.setData({
                        formData: this.data.formData,
                        coupon: this.data.coupon,
                      }),
                      this.initTotalPrice(),
                      this.initCouponSelected();
                  }
                  this.initTotalPrice();
                }
              },
              tipItemClick: function (a) {
                this.setData({
                  otherValueEditing: !1,
                  modalName: "tipModal",
                  tipValue: this.data.formData.tipValue,
                });
              },
              otherValueClick: function (a) {
                this.setData({ otherValueEditing: !0 });
              },
              otherValueInput: function (a) {
                this.tool.isNumber(a.detail.value) &&
                  this.setData({ tipValue: a.detail.value });
              },
              tipModaltemClick: function (a) {
                this.setData({
                  tipValue: a.currentTarget.dataset.value,
                  otherValueEditing: !1,
                });
              },
              tipConfirmBtn: function (a) {
                (this.data.formData.tipValue = this.data.tipValue),
                  this.hideModal(),
                  this.setData({ formData: this.data.formData }),
                  this.initTotalPrice();
              },
              initTotalPrice: function () {
                console.log(
                  "packingFee --\x3e>>",
                  this.data.formData.cartList.packingFee
                ),
                  this.data.formData.cartList &&
                    (this.data.formData.cartList.totalPrice = (
                      parseFloat(this.data.formData.cartList.allPrice) +
                      parseFloat(
                        this.data.formData.cartList.discountGoodAmount
                      ) +
                      parseFloat(this.data.formData.cartList.deliveryFee) +
                      parseFloat(this.data.formData.tipValue) +
                      parseFloat(this.data.formData.cartList.packingFee)
                    ).toFixed(2)),
                  console.log(
                    "totalPrice --\x3e>",
                    this.data.formData.cartList.totalPrice
                  ),
                  this.setData({ formData: this.data.formData });
              },
              selectScan: function () {
                wx.scanCode({
                  onlyFromCamera: !0,
                  success: function (t) {
                    console.log("scan --\x3e>", t),
                      a.setData({ scanResult: t.result });
                  },
                  fail: function (a) {},
                });
              },
              selectPayWayClick: function () {
                var a = this.data.payWayList;
                for (var t in a)
                  t == this.data.formData.payType
                    ? (a[t].checked = !0)
                    : (a[t].checked = !1);
                (this.data.payWayList = a),
                  this.setData({
                    selectData: a,
                    modalName: "selectModal",
                    selectIndex: 1,
                  });
              },
              selectChange: function (a) {
                console.log("s ---\x3e>", a),
                  (this.data.formData.payType = a.detail.value),
                  this.setData({ formData: this.data.formData, modalName: "" }),
                  this.initCouponSelected();
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
