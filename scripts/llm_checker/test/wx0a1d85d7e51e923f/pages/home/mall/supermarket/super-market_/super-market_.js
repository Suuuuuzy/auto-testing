var t,
  a,
  e = require("../../../../../@babel/runtime/helpers/regeneratorRuntime"),
  i = require("../../../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../../../@babel/runtime/helpers/createForOfIteratorHelper"),
  s = getApp();
s.BasePage({
  data: {
    tableInfo: [
      { uy_name: "تاماق بۇيرۇش", ch_name: "订餐", icon: "mall_shop_tab_1" },
      { uy_name: "مۇلازىمەت", ch_name: "服务", icon: "mall_shop_tab_2" },
    ],
    evaluationTypes: [
      { id: 1, uy_name: "ھەممىسى", ch_name: "全部", count: 0 },
      { id: 2, uy_name: "ياخشى ئىنكاس", ch_name: "好评", count: 0 },
      { id: 3, uy_name: "ناچار ئىنكاس", ch_name: "差评", count: 0 },
      { id: 4, uy_name: "رەسىملىك ئىنكاس", ch_name: "有图评价", count: 0 },
    ],
    selectCatIndex: 0,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: !0,
    cartList: {
      shop: null,
      allCount: 0,
      allPrice: 0,
      actualPrice: 0,
      totalPrice: 0,
      deliveryFee: 0,
      packingFee: 0,
      canOrder: !1,
      tableNum: 0,
      cartItems: [],
      cashBackAmount: 0,
      lakeFee: 0,
      hasDynamicPrice: !1,
      discountAmount: 0,
      discountDeliveryFee: 0,
      shopCoupons: [],
      shopCouponSelectedItem: null,
      discountGoodAmount: 0,
    },
    hideCurveGood: !0,
    scroll: { scrollTop: 0, hasScrollTop: !1 },
    noMore: !1,
    STabCur: 0,
    scrollLeft: 0,
    pageHeights: { topViewHeight: 0, bottomViewHeight: 0, scrollHeight: 0 },
    selectGoodId: -1,
    selectGoodItem: { item: null, index: -1, _index: -1 },
    animationImgUrl: "../../../resource/images/animation/shoping-cart/1.png",
    showRotate: !1,
    goodSpecificationItem: {
      item: null,
      index: -1,
      _index: -1,
      items: [],
      amount: 0,
      selectIndexs: [],
      count: 0,
    },
    bottomDialogAnimationData: {},
    evluationTypeIndex: 0,
  },
  onLoad: function (a) {
    if (
      ((t = this),
      (this.lan = a.lan),
      (this.shopId = a.shopId),
      (this.tableNum = a.tableNum),
      (this.catId = a.catId),
      (this.goodId = a.goodId),
      (this.typeId = a.typeId),
      console.log("catId ---\x3e>", this.catId),
      this.goodId && this.setData({ selectGoodId: this.goodId }),
      console.log("selectGoodId ---\x3e>", this.data.selectGoodId),
      (this.dialog = this.selectComponent("#dialog")),
      a.scene)
    ) {
      var e = decodeURIComponent(a.scene);
      (this.shopId = e.split("&")[0]),
        (this.lan = e.split("&")[1]),
        (this.tableNum = e.split("&")[2]);
    }
    if (a.q || s.globalData.scanResult) {
      var i = decodeURIComponent(a.q ? a.q : s.globalData.scanResult);
      i &&
        ((this.shopId = this.tool.getUrlParam("shopId", i)),
        (this.tableNum = this.tool.getUrlParam("tableNum", i))),
        (s.globalData.scanResult = null);
    }
    this.tableNum &&
      ((this.data.cartList.tableNum = this.tableNum),
      this.setData({ cartList: this.data.cartList }),
      this.initTableNum()),
      this.lan && this.initShowLan(this.lan),
      this.initSharedUser(a),
      (this.busPos = {}),
      (this.busPos.x = 0.9 * s.globalData.wWidth),
      (this.busPos.y = 0.9 * s.globalData.wHeight),
      this.shopId && this.loadData();
  },
  initSharedUser: function (t) {
    if (
      ((this.shareUserId = 0),
      t.shareUserId && (this.shareUserId = t.shareUserId),
      t.scene)
    ) {
      var a = decodeURIComponent(t.scene);
      this.shareUserId = a.split("&")[0];
    }
    this.shareUserId && (s.globalData.shareUserId = this.shareUserId);
  },
  initShowLan: function (t) {
    console.log("lan ---\x3e>>", t),
      1 == t
        ? this.data.isUy || this.switchLan()
        : 2 == t && this.data.isUy && this.switchLan();
  },
  initTableNum: function () {
    var t = this.data.cartList.tableNum;
    if ((console.log("tableNum --\x3e>", t), t)) {
      var a = t.toString();
      1 == a.length && ((a = "0" + a), console.log("strNum ---\x3e>", a));
      var e = a.split("");
      (this.data.cartList.tableNums = e),
        this.setData({ cartList: this.data.cartList });
    }
  },
  STabSelect: function (t) {
    this.setData({
      STabCur: t.currentTarget.dataset.id,
      scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
    }),
      1 == this.data.STabCur ? this.loadServiceInfo() : this.loadShopInfo();
  },
  loadData: function () {
    var a = this;
    this.requestWithLoading(
      "mall/superHome",
      { shopId: this.shopId },
      function (e) {
        if (e) {
          if (
            (1 != e.hasUser &&
              t.user.callLogin(function (a) {
                console.log("callLogin --\x3e>", a), t.user.setToken();
              }),
            e.shop)
          ) {
            t.tableNum &&
              (console.log("shop --\x3e>", t.tableNum),
              e.userLan
                ? t.initShowLan(e.userLan)
                : t.initShowLan(e.shop.default_lan + 1)),
              e.hasTable1 &&
                ((t.data.cartList.tableNum = e.hasTable1),
                t.setData({ cartList: t.data.cartList })),
              t.data.isUy
                ? wx.setNavigationBarTitle({ title: e.shop.uy_name })
                : wx.setNavigationBarTitle({ title: e.shop.ch_name });
            var i = t.cart.getShopItem(e.shop.id);
            i && (t.data.cartList.cartItems = i),
              e.shop && t.initShopImage(e.shop),
              (t.data.cartList.shop = e.shop),
              e.shop.can_delivery &&
                !a.tableNum &&
                ((t.data.cartList.deliveryFee = e.shop.delivery_fee),
                e.shop.activity_delivery_fee &&
                  e.shop.activity_delivery_fee.length > 0 &&
                  e.shop.activity_delivery_fee[0].activity_delivery_fee <
                    e.shop.delivery_fee &&
                  (t.data.cartList.discountDeliveryFee = (
                    parseFloat(e.shop.delivery_fee) -
                    parseFloat(
                      e.shop.activity_delivery_fee[0].activity_delivery_fee
                    )
                  ).toFixed(2)),
                e.shop.coupons &&
                  e.shop.coupons.length > 0 &&
                  ((t.data.cartList.shopCoupons = e.shop.coupons),
                  t.data.cartList.shopCoupons.sort(function (t, a) {
                    return t.coupon_limit - a.coupon_limit;
                  }),
                  console.log("coupns --\x3e", t.data.cartList.shopCoupons))),
              t.setData({ cartList: t.data.cartList }),
              e.shop.mall_cat,
              t.catId &&
                e.shop.mall_cat &&
                e.shop.mall_cat.forEach(function (a, e) {
                  t.catId == a.id &&
                    ((t.data.selectCatIndex = e), (t.catId = null));
                });
          }
          t.setData({ pageData: e, selectCatIndex: t.data.selectCatIndex }),
            t.STabSelect({
              currentTarget: {
                dataset: { id: t.tableNum ? e.shop.scan_tab_cur : 0 },
              },
            });
        }
      }
    );
  },
  loadServiceInfo: function () {
    this.requestWithLoading(
      "shop/shopServiceHome",
      { shopId: this.shopId },
      function (a) {
        a &&
          (a.serviceLog &&
            a.serviceLog.length > 0 &&
            a.serviceLog.forEach(function (a) {
              var e = t.tool.getSecond(a.created_at),
                i = "";
              if ((e = parseInt(e)) > 3600)
                i = t.data.isUy ? "1 سائەت ئىلگىرى" : "1个小时之前";
              else if (e <= 3600 && e >= 60) {
                var o = parseInt(e / 60);
                i = t.data.isUy ? o + " مىنۇت ئىلگىرى" : o + " 分钟之前";
              } else i = t.data.isUy ? e + " سىكۇنىت ئىلگىرى" : e + " 秒之前";
              a.time = i;
              var s = a.table_num;
              if (s) {
                var n = s.toString();
                1 == n.length && (n = "0" + n);
                var c = n.split("");
                a.tableNums = c;
              }
            }),
          console.log("e --\x3e>", a),
          t.setData({ shopServiceData: a }));
      }
    );
  },
  loadShopInfo: function () {
    this.data.pageData &&
      this.data.pageData.shop.mall_cat &&
      this.requestWithLoading(
        "mall/getSuperShop",
        {
          shopId: this.data.pageData.shop.id,
          catId: this.data.pageData.shop.mall_cat[this.data.selectCatIndex].id,
          type: this.data.selectCatIndex + 1,
        },
        function (a) {
          if (a) {
            var e = a.shop.good_type,
              i = [];
            if (e) {
              for (var o in e) 0 != e[o].goods.length && i.push(e[o]);
              var s = t.data.cartList.cartItems;
              for (var n in s)
                i.length > s[n].index &&
                  i[s[n].index].goods.length > s[n].indexx &&
                  i[s[n].index].goods[s[n].indexx].id == s[n].item.id &&
                  -1 != i[s[n].index].goods[s[n].indexx].in_stock &&
                  ((i[s[n].index].goods[s[n].indexx].count = s[n].count),
                  (i[s[n].index].count =
                    i[s[n].index].count > 0
                      ? parseInt(i[s[n].index].count) + parseInt(s[n].count)
                      : parseInt(s[n].count)),
                  (s[n].item = i[s[n].index].goods[s[n].indexx]));
              t.typeId
                ? a.shop.good_type.forEach(function (a, e) {
                    a.id == t.typeId &&
                      setTimeout(function () {
                        t.setData({
                          MainCur: e,
                          TabCur: e,
                          VerticalNavTop: 50 * e,
                        }),
                          (t.typeId = null);
                      }, 300);
                  })
                : t.setData({ MainCur: 0, TabCur: 0, VerticalNavTop: 0 });
            }
            t.setData({ list: i, shopInfo: a }),
              t.goodId &&
                setTimeout(function () {
                  console.log("fuck"),
                    i.forEach(function (a, e) {
                      a.goods &&
                        a.goods.length > 0 &&
                        a.goods.forEach(function (a, i) {
                          a.id == t.goodId &&
                            t.goodItemClick({
                              currentTarget: {
                                dataset: { item: a, index: e, _index: i },
                              },
                            });
                        });
                    }),
                    (t.goodId = null);
                }, 250),
              console.log("what--\x3e>" + t.goodId),
              t.queryTopView(),
              t.initTime(),
              t.initCartList();
          }
        }
      );
  },
  catClick: function (t) {
    var a = t.currentTarget.dataset.index;
    this.setData({ selectCatIndex: a, selectGoodId: -1 }),
      a < this.data.pageData.shop.mall_cat.length - 2
        ? this.loadShopInfo()
        : -1 == this.data.pageData.shop.mall_cat[a].id &&
          this.loadShopEvaluation();
  },
  loadShopEvaluation: function (a) {
    var e = this;
    this.requestWithLoading(
      "mall/mallShopEvaluation",
      { shopId: this.data.pageData.shop.id },
      function (a) {
        a &&
          (t.setData({ shopEvaluationData: a, evluationTypeIndex: 0 }),
          a.all &&
            (e.data.evaluationTypes.forEach(function (t) {
              1 == t.id
                ? (t.count = a.all.allCount)
                : 2 == t.id
                ? (t.count = a.godEvaluation)
                : 3 == t.id
                ? (t.count = a.all.allCount - a.godEvaluation)
                : 4 == t.id && (t.count = a.imageEvaluation);
            }),
            t.setData({ evaluationTypes: t.data.evaluationTypes })));
      }
    );
  },
  evaluationTypeClick: function (a) {
    var e = a.currentTarget.dataset.item,
      i = a.currentTarget.dataset.index;
    t.setData({ evluationTypeIndex: i }),
      e && t.loadShopEvaluationWithType(e.id);
  },
  loadShopEvaluationWithType: function (a) {
    this.requestWithLoading(
      "mall/getShopEvaluation",
      { shopId: this.data.pageData.shop.id, type: a },
      function (a) {
        a &&
          ((t.data.shopEvaluationData.evaluation = a),
          t.setData({ shopEvaluationData: t.data.shopEvaluationData }));
      }
    );
  },
  tabSelect: function (t) {
    this.setData({
      TabCur: t.currentTarget.dataset.id,
      MainCur: t.currentTarget.dataset.id,
      VerticalNavTop: 50 * (t.currentTarget.dataset.id - 1),
    });
  },
  VerticalMain: function (t) {
    this.initPageTop(t);
    var a = this.data.list,
      e = 0;
    if (this.data.load) {
      for (
        var i = function (t) {
            wx.createSelectorQuery()
              .select("#main-" + a[t].id)
              .fields({ size: !0 }, function (i) {
                i && ((a[t].top = e), (e += i.height), (a[t].bottom = e));
              })
              .exec();
          },
          o = 0;
        o < a.length;
        o++
      )
        i(o);
      this.setData({ load: !1, list: a });
    }
    for (var s = t.detail.scrollTop + 20, n = 0; n < a.length; n++)
      if (s > a[n].top && s < a[n].bottom)
        return (
          this.setData({ VerticalNavTop: 50 * (a[n].id - 1), TabCur: a[n].id }),
          !1
        );
  },
  initPageTop: function (t) {
    if (!this.tableNum) {
      var a = t.detail.scrollTop;
      !this.data.scroll.hasScrollTop &&
        a > 30 &&
        ((this.data.scroll.hasScrollTop = !0),
        this.queryTopView(),
        this.setData({ scroll: this.data.scroll }));
    }
  },
  queryTopView: function () {
    setTimeout(function () {
      var a = wx.createSelectorQuery();
      a.select("#topView").boundingClientRect(),
        a.exec(function (a) {
          console.log("query res", a),
            console.log("wHeight --\x3e>", s.globalData.wHeight),
            a &&
              a[0].height &&
              s.globalData.wHeight &&
              s.globalData.pRatio &&
              (a[0].bottom &&
                ((t.data.pageHeights.scrollHeight =
                  s.globalData.wHeight -
                  a[0].height -
                  120 / s.globalData.pRatio -
                  s.globalData.StatusBar -
                  44 -
                  10),
                (t.data.pageHeights.topViewHeight = a[0].height)),
              t.setData({ pageHeights: t.data.pageHeights }),
              console.log("pageHeights ---\x3e>", t.data.pageHeights));
        });
    }, 300);
  },
  startCount: function () {
    a = setInterval(function () {
      t.initTime();
    }, 2e3);
  },
  clearCount: function () {
    clearInterval(a), (a = null);
  },
  initTime: function () {
    if (this.data.list) {
      var a = this.data.list;
      for (var e in a)
        for (var i in a[e].goods)
          (a[e].goods[i].price = parseFloat(a[e].goods[i].price)),
            a[e].goods[i].activity_price > 0 &&
              ((a[e].goods[i].activity_price = parseFloat(
                a[e].goods[i].activity_price
              )),
              a[e].goods[i].activity_start_time &&
                a[e].goods[i].activity_end_time &&
                ((a[e].goods[i].time1 = this.tool.getSecond(
                  a[e].goods[i].activity_start_time,
                  null,
                  !0
                )),
                (a[e].goods[i].time2 = this.tool.getSecond(
                  a[e].goods[i].activity_end_time,
                  null,
                  !0
                )),
                a[e].goods[i].activity_limit_count > 0 &&
                  a[e].goods[i].bought_today_count >=
                    a[e].goods[i].activity_limit_count &&
                  (a[e].goods[i].time2 = 0),
                a[e].goods[i].time1 < 0 &&
                  a[e].goods[i].time2 > 0 &&
                  (a[e].goods[i].time = this.tool.formatSeconds(
                    a[e].goods[i].time2
                  ))));
      t.setData({ list: a });
    }
  },
  _addBtn: function (a) {
    console.log("_addBtn --\x3e>", a),
      console.log("bus --\x3e>", t.busPos),
      this.addBtn(a);
  },
  shopingCartAnimation: function () {
    var t = this;
    this.setData({ showRotate: !0 }),
      this.animate(
        ".mImg",
        [
          { opacity: 1, rotate: 8 * this.rotate },
          { opacity: 1, rotate: 8 * (this.rotate + 1) },
        ],
        10,
        function () {
          console.log("complete --\x3e>" + t.rotate),
            t.setData({
              animationImgUrl:
                "../../../resource/images/animation/shoping-cart/" +
                (t.rotate + 1) +
                ".png",
            }),
            t.rotate < 11
              ? t.shopingCartAnimation()
              : t.setData({ showRotate: !1 }),
            t.rotate++;
        }.bind(this)
      );
  },
  startAnimation: function (a) {
    var e = 0,
      i = this,
      o = i.linePos.bezier_points;
    this.setData({ hideCurveGood: !1, bus_x: i.finger.x, bus_y: i.finger.y }),
      (this.timer = setInterval(function () {
        e++,
          i.setData({ bus_x: o[e].x, bus_y: o[e].y }),
          e >= 28 &&
            (clearInterval(i.timer),
            i.setData({ hideCurveGood: !0, hideCount: !1 }),
            t.addBtn(a));
      }, 18));
  },
  addBtn: function (t) {
    console.log(t);
    var a = t.currentTarget.dataset.index,
      e = t.currentTarget.dataset.indexx,
      i = t.currentTarget.dataset.item,
      o = t.currentTarget.dataset.type,
      s = t.currentTarget.dataset.cindex,
      n = this.data.cartList.cartItems[s],
      c = !1;
    2 == o &&
      (this.data.goodSelectItem &&
        (this.data.goodSelectItem.count
          ? this.data.goodSelectItem.count++
          : (this.data.goodSelectItem.count = 1)),
      this.setData({ goodSelectItem: this.data.goodSelectItem })),
      console.log("cIndex --\x3e>", s),
      console.log("cartItem ---\x3e>", n),
      s >= 0 && n.specificationIndexs && (c = !0),
      c
        ? (this.data.list[a].goods[e].allCount &&
            (this.data.list[a].goods[e].allCount++, this.data.list[a].count++),
          n.count++)
        : this.data.list[a].goods[e].count
        ? (this.data.list[a].goods[e].count++, this.data.list[a].count++)
        : this.data.list[a].goods[e].starting_count > 1
        ? ((this.data.list[a].goods[e].count =
            this.data.list[a].goods[e].starting_count),
          (this.data.list[a].count = this.data.list[a].goods[e].starting_count))
        : ((this.data.list[a].goods[e].count = 1),
          (this.data.list[a].count = 1)),
      c ? this.initCartList() : this.initCartList(a, e, i, 1),
      this.setData({ list: this.data.list });
  },
  removeBtn: function (t) {
    var a = t.currentTarget.dataset.index,
      e = t.currentTarget.dataset.indexx,
      i = t.currentTarget.dataset.item,
      o = t.currentTarget.dataset.type,
      s = t.currentTarget.dataset.cindex,
      n = this.data.cartList.cartItems[s],
      c = !1;
    console.log("cIndex --\x3e>", s),
      console.log("cartItem ---\x3e>", n),
      2 == o &&
        (this.data.goodSelectItem &&
          (this.data.goodSelectItem.count > 1
            ? this.data.goodSelectItem.count--
            : (this.data.goodSelectItem.count = 0)),
        this.setData({ goodSelectItem: this.data.goodSelectItem })),
      s >= 0 && n.specificationIndexs && (c = !0),
      c
        ? (this.data.list[a].goods[e].allCount > 1
            ? this.data.list[a].goods[e].allCount--
            : (this.data.list[a].goods[e].allCount = 0),
          n.count > 1 ? n.count-- : this.data.cartList.cartItems.splice(s, 1))
        : (this.data.list[a] &&
            this.data.list[a].goods[e] &&
            this.data.list[a].goods[e].count >= 1 &&
            (this.data.list[a].goods[e].starting_count > 1 &&
            this.data.list[a].goods[e].count <=
              this.data.list[a].goods[e].starting_count
              ? (this.data.list[a].goods[e].count = 0)
              : this.data.list[a].goods[e].count--),
          this.data.list &&
            this.data.list[a].count >= 1 &&
            this.data.list[a].count--),
      c ? this.initCartList() : this.initCartList(a, e, i, 0),
      this.setData({ list: this.data.list });
  },
  viewImg: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.previewImage({ urls: [a] });
  },
  cleanCart: function (t) {
    for (var a in this.data.list)
      for (var e in ((this.data.list[a].count = 0), this.data.list[a].goods))
        this.data.list[a].goods[e].good_specification.length > 0
          ? (this.data.list[a].goods[e].allCount = 0)
          : (this.data.list[a].goods[e].count = 0);
    (this.data.cartList.cartItems = []),
      this.setData({ list: this.data.list, modalName: "" }),
      this.initCartList();
  },
  initCartList: function (a, e, i, s) {
    var n = 0,
      c = 0,
      d = !1,
      r = 0,
      l = this.data.cartList.cartItems,
      h = this.data.pageData.shop.mall_cat,
      u = this.data.pageData.shop,
      g = 0;
    for (var p in h) h[p].count = 0;
    for (var m in (h.forEach(function (t) {
      t.count = 0;
    }),
    l)) {
      if (
        (l[m].index == a &&
          l[m].indexx == e &&
          l[m].item.id == i.id &&
          ((d = !0),
          1 == s
            ? l[m].count++
            : (console.log("cartIndex --\x3e>", l[m].item.starting_count),
              1 == l[m].count ||
              (l[m].item.starting_count > 1 &&
                l[m].count <= l[m].item.starting_count)
                ? l.splice(m, 1)
                : l[m].count--)),
        l[m])
      ) {
        n += l[m].count;
        var f = l[m].item.price * l[m].count;
        l[m].item.time2 > 0 &&
          (f =
            l[m].activity_count > 0 && l[m].count > l[m].activity_count
              ? l[m].item.activity_price * l[m].activity_count +
                l[m].item.price * (l[m].count - l[m].activity_count)
              : l[m].item.activity_price * l[m].count),
          l[m].specificationIndexs && (f = l[m].amount * l[m].count),
          (c = (parseFloat(c) + parseFloat(f)).toFixed(2)),
          (g = (
            parseFloat(g) + parseFloat(l[m].item.packing_fee * l[m].count)
          ).toFixed(2));
      }
      if (h)
        for (var I in h)
          l[m] &&
            h[I].id == l[m].item.cat_id &&
            (h[I].count =
              h[I].count > 0
                ? parseInt(h[I].count) + parseInt(l[m].count)
                : parseInt(l[m].count));
    }
    if (!d && i) {
      var v = i.starting_count > 1 ? i.starting_count : 1;
      if (1 == s) {
        var _ = 0;
        i.time2 > 0 && (_ = 1),
          l.push({
            index: a,
            indexx: e,
            count: v,
            item: i,
            activity_count: i.activity_limit_count,
            is_activity: _,
          }),
          (g = (parseFloat(g) + parseFloat(i.packing_fee * v)).toFixed(2)),
          (n += v),
          (c = (
            parseFloat(c) +
            parseFloat(
              (this.data.list[a].goods[e].time2 > 0
                ? this.data.list[a].goods[e].activity_price
                : this.data.list[a].goods[e].price) * v
            )
          ).toFixed(2)),
          h.forEach(function (t) {
            t.id == i.cat_id && (t.count = t.count + v);
          });
      }
    }
    (this.data.cartList.allCount = n),
      (this.data.cartList.allPrice = c),
      (this.data.cartList.packingFee = g),
      c &&
        u.userPercent &&
        (r = parseFloat((c * u.userPercent) / 100).toFixed(2)),
      (this.data.cartList.cashBackAmount = r),
      (this.data.cartList.discountAmount = 0),
      (this.data.cartList.shopCouponSelectedItem = null);
    var x,
      y = o(this.data.cartList.shopCoupons);
    try {
      for (y.s(); !(x = y.n()).done; ) {
        var D = x.value;
        console.log("coupnItem -", D),
          D &&
            D.coupon_limit > 0 &&
            parseFloat(c) >= parseFloat(D.coupon_limit) &&
            ((this.data.cartList.discountAmount = parseFloat(D.coupon_amount)),
            (this.data.cartList.shopCouponSelectedItem = D));
      }
    } catch (t) {
      y.e(t);
    } finally {
      y.f();
    }
    console.log("discountAmount => " + this.data.cartList.discountAmount),
      this.data.cartList.allPrice >=
      parseFloat(this.data.pageData.shop.starting_price)
        ? (this.data.cartList.canOrder = !0)
        : (this.data.cartList.canOrder = !1),
      (this.data.lakeFee = parseFloat(
        this.data.pageData.shop.starting_price - this.data.cartList.allPrice
      ).toFixed(2));
    var S,
      L = 0,
      b = o(l);
    try {
      for (b.s(); !(S = b.n()).done; ) {
        var T = S.value;
        T.count > 0 &&
          T.item &&
          (L = (parseFloat(L) + parseFloat(T.item.price * T.count)).toFixed(2));
      }
    } catch (t) {
      b.e(t);
    } finally {
      b.f();
    }
    (this.data.cartList.discountGoodAmount = (L - c).toFixed(2)),
      (this.data.cartList.totalPrice = parseFloat(L)),
      (this.data.cartList.actualPrice = parseFloat(
        c - this.data.cartList.discountAmount
      ).toFixed(2)),
      console.log("allToatlPrice=" + L),
      console.log("actuaslPrice ->" + this.data.cartList.actualPrice),
      (this.data.cartList.cartItems = l),
      (this.data.pageData.shop.mall_cat = h),
      this.setData({
        cartIndexs: l,
        cartList: this.data.cartList,
        pageData: this.data.pageData,
        lakeFee: this.data.lakeFee,
      }),
      console.log("totalPrice = " + this.data.cartList.totalPrice),
      t.initDynamicDeliveryFee();
  },
  initDynamicDeliveryFee: function () {
    var t = this.data.pageData,
      a = this.data.cartList;
    if (t.shop.can_delivery && t.deliveryFee && !this.tableNum) {
      var e = t.shop.delivery_fee,
        i = parseFloat(t.deliveryFee.ending_price),
        o = parseFloat(a.allPrice);
      o < i / 3
        ? (e = t.deliveryFee.delivery_1_fee)
        : o >= i / 3 && o < (2 * i) / 3
        ? (e = t.deliveryFee.delivery_2_fee)
        : o >= (2 * i) / 3 &&
          o < i &&
          ((e = t.deliveryFee.delivery_3_fee),
          console.log("delivery3Fee --\x3e>", e)),
        console.log("it is ok --\x3e>", a.allPrice < i),
        console.log("ok --\x3e>", e),
        (a.deliveryFee = e),
        (a.hasDynamicPrice = !0),
        this.setData({ cartList: a });
    }
  },
  selectSpecification: function (t) {
    var a = t.currentTarget.dataset.item,
      e = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.indexx,
      o = 0;
    if (a) {
      o = a.price;
      var s = [];
      if (a.good_specification) {
        for (var n in a.good_specification) {
          var c = !1;
          for (var d in s)
            a.good_specification[n].specification_type_id ==
              s[d].specification_type_id &&
              (s[d].items.push(a.good_specification[n].info), (c = !0));
          c ||
            ((a.good_specification[n].info.selected = 1),
            (a.good_specification[n].items = [a.good_specification[n].info]),
            s.push(a.good_specification[n]),
            a.good_specification[n].info.price > 0 &&
              (o = a.good_specification[n].info.price));
        }
        console.log("items --\x3e>", s),
          s.sort(function (t, a) {
            return t.type.id - a.type.id;
          }),
          (this.data.goodSpecificationItem.items = s);
      }
      (this.data.goodSpecificationItem.item = a),
        (this.data.goodSpecificationItem.index = e),
        (this.data.goodSpecificationItem._index = i),
        (this.data.goodSpecificationItem.amount = o),
        console.log(
          "specificationItem --\x3e>",
          this.data.goodSpecificationItem
        ),
        this.setData({
          modalName: "showSpecification",
          goodSpecificationItem: this.data.goodSpecificationItem,
        }),
        this.initSpecificationIndexs();
    }
  },
  selectTagItem: function (a) {
    var e = a.currentTarget.dataset.index,
      i = a.currentTarget.dataset._index,
      o = this.data.goodSpecificationItem.items;
    o[e].items.forEach(function (a, e) {
      console.log("eIndex --\x3e>", e),
        e != i
          ? (a.selected = 0)
          : ((a.selected = 1),
            a.price > 0 && (t.data.goodSpecificationItem.amount = a.price));
    }),
      (this.data.goodSpecificationItem.items = o),
      this.setData({ goodSpecificationItem: this.data.goodSpecificationItem }),
      this.initSpecificationIndexs();
  },
  initSpecificationIndexs: function () {
    var a = this.data.goodSpecificationItem.items;
    (this.data.goodSpecificationItem.selectIndexs = []),
      a.forEach(function (a, e) {
        a.items.forEach(function (a, i) {
          1 == a.selected &&
            t.data.goodSpecificationItem.selectIndexs.push([e, i]);
        });
      }),
      this.setData({ goodSpecificationItem: this.data.goodSpecificationItem }),
      console.log("indexs ---\x3e>", this.data.goodSpecificationItem),
      this.initSpecificaionCount(2);
  },
  addSpecificationItemBtn: function (t) {
    console.log("fuck2"), this.initSpecificaionCount(1);
  },
  specificationRemoveBtn: function (t) {
    this.initSpecificaionCount(0);
  },
  initSpecificaionCount: function (t) {
    var a = this.data.cartList.cartItems,
      e = this.data.goodSpecificationItem;
    e.count = 0;
    var i = -1,
      o = this.data.list[e.index].goods[e._index].allCount
        ? this.data.list[e.index].goods[e._index].allCount
        : 0;
    for (var s in a) {
      var n = a[s];
      if (
        (console.log("index --\x3e>", s),
        n.specificationIndexs && n.item.id == e.item.id && e.selectIndexs)
      ) {
        console.log("has fuck");
        var c = !0,
          d = !0;
        for (var r in n.specificationIndexs) {
          var l = n.specificationIndexs[r];
          (l[0] == e.selectIndexs[r][0] && l[1] == e.selectIndexs[r][1]) ||
            (c = !1);
        }
        c && d && ((i = s), (d = !1));
      }
    }
    if ((console.log("itemIndex ---\x3e>", i), -1 != i))
      1 == t
        ? (a[i].count++, o++)
        : 0 == t &&
          (1 == a[i].count
            ? (a.splice(i, 1), (e.count = 0))
            : (a[i].count--, (e.count = a[i].count)),
          o > 1 ? o-- : (o = 0)),
        0 != t && (e.count = a[i].count);
    else if (1 == t) {
      var h = e.item,
        u = {
          index: e.index,
          indexx: e._index,
          item: h,
          count: 1,
          specificationIndexs: e.selectIndexs,
          specificationItems: e.items,
          amount: e.amount > 0 ? e.amount : h.price,
        };
      a.push(u), (e.count = 1), o++;
    }
    (this.data.cartList.cartItems = a),
      (this.data.goodSpecificationItem = e),
      0 == this.data.cartList.length && (o = 0),
      (this.data.list[e.index].goods[e._index].allCount = o),
      this.setData({
        cartList: this.data.cartList,
        goodSpecificationItem: this.data.goodSpecificationItem,
        list: this.data.list,
      }),
      this.initCartList();
  },
  showDetail: function () {
    if ("detailModal" == this.data.modalName) this.hideModal();
    else {
      this.setData({ modalName: "detailModal" });
      var a = wx.createAnimation({ delay: 600, timingFunction: "ease" });
      (this.animation = a),
        setTimeout(function () {
          t.fadeIn();
        }, 200);
    }
  },
  fadeIn: function () {
    this.animation.translateY(0).step(),
      this.setData({ bottomDialogAnimationData: this.animation.export() });
  },
  hideModal: function () {
    this.setData({ modalName: "" });
  },
  goodItemClick: function (t) {
    var a = t.currentTarget.dataset.item;
    t.currentTarget.dataset.index, t.currentTarget.dataset._index;
    a &&
      wx.navigateTo({
        url:
          "./mall-detail-page/mall-detail-page?good=" +
          encodeURIComponent(JSON.stringify(a)),
      });
  },
  thumbClick: function (a) {
    var e = a.currentTarget.dataset.type;
    this.requestWithLoading(
      "shop/setGoodThumb",
      { goodId: this.data.selectGoodId, type: e, shopId: this.shopId },
      function (a) {
        a &&
          t.successToast(function () {
            var i = t.data.selectGoodItem.index,
              o = t.data.selectGoodItem._index;
            1 == a.state
              ? 0 == e
                ? ((t.data.list[i].goods[o].thumbs_up_count =
                    t.data.list[i].goods[o].thumbs_up_count + 1),
                  (t.data.goodItemData.thumbs_up_count = 1))
                : 1 == e &&
                  ((t.data.list[i].goods[o].thumbs_down_count =
                    t.data.list[i].goods[o].thumbs_down_count + 1),
                  (t.data.goodItemData.thumbs_down_count = 1))
              : 0 == a.state &&
                (0 == e
                  ? ((t.data.list[i].goods[o].thumbs_up_count =
                      t.data.list[i].goods[o].thumbs_up_count - 1),
                    (t.data.goodItemData.thumbs_up_count = 0))
                  : 1 == e &&
                    ((t.data.list[i].goods[o].thumbs_down_count =
                      t.data.list[i].goods[o].thumbs_down_count - 1),
                    (t.data.goodItemData.thumbs_down_count = 0))),
              t.setData({
                list: t.data.list,
                goodItemData: t.data.goodItemData,
              });
          });
      }
    );
  },
  _subBtn: function (t) {
    var a = this;
    return i(
      e().mark(function t() {
        var i;
        return e().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (
                  (console.log("isLogin --\x3e>", s.globalData.isLogin),
                  !s.globalData.isLogin)
                ) {
                  t.next = 5;
                  break;
                }
                a.subBtn(), (t.next = 14);
                break;
              case 5:
                return (
                  a.setData({ isLoading: !0 }), (t.next = 8), a.user.pLogin()
                );
              case 8:
                if (((i = t.sent), a.setData({ isLoading: !1 }), i)) {
                  t.next = 13;
                  break;
                }
                return a.setData({ showUnloginDialog: !0 }), t.abrupt("return");
              case 13:
                a.subBtn();
              case 14:
                return t.abrupt("return");
              case 15:
              case "end":
                return t.stop();
            }
        }, t);
      })
    )();
  },
  subBtn: function (a) {
    console.log("sub btn --\x3e>" + this.data.cartList.totalPrice), (t = this);
    var e = JSON.stringify(this.data.cartList);
    wx.navigateTo({
      url:
        "/pages/home/mall/mall-pay-page/mall-pay-page?title=" +
        t.data.Str.confirmOrder[t.data.lanIndex] +
        "&cartList=" +
        e,
    });
  },
  hasCertification: function (t) {
    var a = this;
    this.requestWithLoading("user/hasCertification", {}, function (e) {
      e && -1 == e
        ? (wx.navigateTo({
            url:
              "/pages/common-page/login-page/login-page?title=" +
              a.data.Str.login[a.data.lanIndex],
          }),
          t(!1))
        : t(!(!e || 1 != e));
    });
  },
  onReady: function () {},
  onShow: function () {
    t.data.isPayed && (t.setData({ isPayed: !1 }), t.loadData()),
      s.globalData.orderId &&
        ((t.data.cartList.cartItems = []),
        t.setData({ isLoading: !0, isPayed: !0, cartList: t.data.cartList }),
        t.initCartList(),
        setTimeout(function () {
          t.setData({ isLoading: !1 }),
            wx.navigateTo({
              url:
                "/pages/order/order-detail/order-detail?id=" +
                s.globalData.orderId +
                "&title=" +
                t.data.Str.orderDetail[t.data.lanIndex],
            });
        }, 500)),
      s.globalData.isLogin ||
        (s.userLoginCall = function (t) {
          console.log("login call =>", t), t || s.userLogin();
        }),
      s.globalData.userInfo && this.setData({ hasUserInfo: !0 });
    var a = getCurrentPages(),
      e = a[a.length - 1];
    e.data.loginSuccessBack && ((e.data.loginSuccessBack = !1), this.subBtn());
  },
  topClik: function (t) {
    (this.data.scroll.hasScrollTop = !this.data.scroll.hasScrollTop),
      this.queryTopView(),
      this.setData({ scroll: this.data.scroll });
  },
  setFavoriate: function (t) {
    var a = this;
    this.data.pageData.shop &&
      this.requestWithLoading(
        "shop/setShopFavorites",
        { shopId: this.data.pageData.shop.id },
        function (t) {
          t &&
            ((a.data.pageData.shop.favorites =
              a.data.pageData.shop.favorites &&
              a.data.pageData.shop.favorites.length > 0
                ? null
                : "ok"),
            a.setData({ pageData: a.data.pageData }));
        }
      );
  },
  callServiceBtn: function (a) {
    console.log("user e", a);
    var e = a.currentTarget.dataset.item;
    t.callServiceRequest(e);
  },
  callServiceRequest: function (a) {
    var e = this;
    this.setData({ dialogContent: this.data.isUy ? a.uy_name : a.ch_name }),
      this.dialog.show(function (i) {
        t.requestWithLoading(
          "shop/callService",
          { typeId: a.id, shopId: e.shopId, tableNum: e.tableNum },
          function (a) {
            a &&
              t.successToast(function () {
                t.loadServiceInfo();
              });
          }
        );
      });
  },
  onHide: function () {},
  btnCall: function (t) {
    var a = t.currentTarget.dataset.phone;
    a && wx.makePhoneCall({ phoneNumber: a });
  },
  onUnload: function () {
    console.log("onUnload"),
      this.clearCount(),
      this.data.cartList &&
        this.data.cartList.shop &&
        this.data.cartList.cartItems.length > 0 &&
        this.cart.setShopItem(
          this.data.cartList.shop.id,
          this.data.cartList.cartItems
        ),
      this.data.cartList &&
        this.data.cartList.shop &&
        0 == this.data.cartList.cartItems.length &&
        this.cart.removeShopItems(this.data.cartList.shop.id),
      this.data.isPayed &&
        this.cart.removeShopItems(this.data.cartList.shop.id);
    var t = getCurrentPages(),
      a = t[t.length - 2];
    a && a.setData({ refreshData: { backShop: !0 } });
  },
  shopDetailBtn: function (t) {
    var a = this.data.pageData.shop.mall_cat.length;
    this.setData({ selectCatIndex: a - 1, selectGoodId: -1 });
  },
  clickShopLocation: function (t) {
    this.data.pageData.shop &&
      this.data.pageData.shop.lat &&
      wx.openLocation({
        type: "gcj02",
        latitude: Number(this.data.pageData.shop.lat),
        longitude: Number(this.data.pageData.shop.lng),
        scale: 18,
      });
  },
  onPullDownRefresh: function () {
    this.loadData();
  },
  onReachBottom: function () {},
  initShopImage: function (a) {
    if (a && a.icon_url) {
      0 == a.zan_count && 0 == a.zan_count
        ? (a.stars = 5)
        : (a.stars = ((a.zan_count / (a.zan_count + a.cha_count)) * 5).toFixed(
            1
          ));
      var e =
        this.data.ossImage +
        a.icon_url +
        "?x-oss-process=image/resize,m_lfit,h_400,w_400";
      e &&
        wx.getImageInfo({
          src: e,
          success: function (e) {
            console.log("getImage --\x3e>", e),
              t.setData({ shopIcon: e.path }),
              t.startCanvas(a, e.path);
          },
        });
    }
  },
  startCanvas: function (t, a) {
    if (t && a) {
      var e,
        i = this;
      wx.getSystemInfo({
        success: function (t) {
          e = t.windowWidth / 750;
        },
      });
      var o = wx.createCanvasContext("myCanvas"),
        s = (this.data.Str.etewarService[this.data.lanIndex], 0);
      if (
        (6 == t.area_id &&
          0 == t.delivery_fee &&
          (this.data.Str.sanGongliMianyun[this.data.lanIndex], (s = 1)),
        o.drawImage(a, 0 * e, 0 * e, 640 * e, 512 * e),
        (o.font = "24px UKIJ Basma Aq"),
        o.setTextAlign("left"),
        1 == s)
      ) {
        var n = "/resource/images/common/mianpeisong_uy.png";
        this.data.isUy || (n = "/resource/images/common/mianpeisong_ch.png"),
          o.drawImage(n, 10 * e, 5 * e, 500 * e, 50 * e);
      } else o.setFontSize(16);
      if (t.coupons && t.coupons.length > 0) {
        o.setFontSize(16);
        for (var c = 0; c < t.coupons.length; c++) {
          var d = t.coupons[c];
          o.setFillStyle("#CC3333"),
            o.fillRect((130 * c + 15) * e, 15 * e, 120 * e, 60 * e),
            o.fill();
          var r = "满" + d.coupon_limit + "减" + d.coupon_amount;
          o.setFillStyle("white"),
            o.fillText(r, (130 * c + 20) * e, 55 * e, 110 * e);
        }
      }
      if (t && t.stars > 0) {
        for (var l = 35, h = 0; h < 5; h++) {
          var u = "/resource/images/common/starfill.png";
          t.stars < h + 1 && (u = "/resource/images/common/star.png"),
            (l = 35 * (h + 1)),
            o.drawImage(u, l * e, 360 * e, 32 * e, 32 * e);
        }
        o.setFillStyle("white"),
          o.setFontSize(24),
          o.fillText(t.stars, 210 * e, 390 * e);
      }
      if (t && t.types && t.types.length > 0)
        for (var g = 15, p = 0; p < t.types.length; p++) {
          var m =
            "/resource/images/shop/types/" +
            (this.data.isUy ? "uy" : "ch") +
            "/" +
            t.types[p].id +
            ".png";
          o.drawImage(m, g * e, 430 * e, 154 * e, 54 * e), (g += 169);
        }
      o.draw(),
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: "myCanvas",
            success: function (t) {
              var a = t.tempFilePath;
              i.setData({ shareImagePath: a });
            },
            fail: function (t) {
              console.log(t);
            },
          });
        }, 200);
    }
  },
  onShareAppMessage: function (t) {
    var a = null;
    "menu" == t.from || ("button" == t.from && (a = t.target.dataset.item));
    var e = this.data.pageData,
      i = this.data.isUy ? e.shop.uy_name : e.shop.ch_name,
      o = this.data.shareImagePath
        ? this.data.shareImagePath
        : this.data.ossImage + e.shop.icon_url;
    a &&
      ((i += " "),
      (i = (this.data.isUy ? a.uy_name : a.ch_name) + " "),
      a.time2 && a.time2 > 0
        ? this.data.isUy
          ? ((i += "ئەسلى باھاسى " + a.price),
            (i += ",ئېتىبار باھاسى" + a.activity_price))
          : ((i += "原价为" + a.price + "元,"),
            (i += "现优惠价为" + a.activity_price + "元"))
        : this.data.isUy
        ? (i += ",باھاسى" + a.price + "يۈەن")
        : (i += ",价格为" + a.price + "元"),
      (o = a.img_url));
    var s = this.data.isUy ? 1 : 2,
      n = null;
    return (
      this.user && this.user.getId() && (n = this.user.getId()),
      {
        title: i,
        imageUrl: o,
        path:
          "/pages/home/mall/mall-home?shopId=" +
          e.shop.id +
          "&lan=" +
          s +
          "&shareUserId=" +
          n +
          "&goodId=" +
          (null != a ? a.id : null),
      }
    );
  },
  onShareTimeline: function (t) {
    var a = this.data.isUy
        ? this.data.pageData.shop.uy_name
        : this.data.pageData.shop.ch_name,
      e = this.data.ossImage + this.data.pageData.shop.icon_url,
      i = this.data.goodSelectItem;
    return (
      i &&
        ((a += " ,"),
        (a += this.data.isUy ? i.uy_name : i.ch_name),
        i.time2 && i.time2 > 0
          ? this.data.isUy
            ? ((a += " "),
              (a += "ئەسلى باھاسى " + i.price),
              (a += ",ئېتىبار باھاسى" + i.activity_price))
            : ((a += "原价为" + i.price + "元,"),
              (a += "现优惠价为" + i.activity_price + "元"))
          : this.data.isUy
          ? (a += ",باھاسى" + i.price + "يۈەن")
          : (a += ",价格为" + i.price + "元"),
        (e = i.img_url)),
      { title: a, imageUrl: e }
    );
  },
});
