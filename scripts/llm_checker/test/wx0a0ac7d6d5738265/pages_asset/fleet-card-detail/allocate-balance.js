var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  n = {
    data: function () {
      return {
        isloading: !0,
        inputValue: null,
        slected: "",
        topUpTypeList: [
          { Id: 1, Amount: 100 },
          { Id: 2, Amount: 500 },
          { Id: 3, Amount: 1e3 },
        ],
        value: 0,
        cardInfo: "",
        consumeList: [],
        oilTypeDiscountList: [],
        showInput: !1,
        pages: 1,
        status: "loading",
        moy: { umoy: 0, cmoy: 0 },
        valueChange: null,
        topId: "",
        cardId: "",
      };
    },
    onLoad: function (e) {
      console.log("附卡id", e.cardid, e.topId),
        (this.cardId = e.cardid),
        (this.topId = e.topId),
        this.getUserRecordList(),
        this.getUserMoney();
    },
    mounted: function () {},
    watch: {
      inputValue: function (e) {
        this.calculateMoney();
      },
    },
    methods: {
      getactiveMoney: function (e) {
        (this.slected = e),
          (this.inputValue = e),
          console.log("点击了金额", this.inputValue);
      },
      calculateMoney: function () {
        var e = this.inputValue.toString().replace(/[^0-9.]/g, "");
        /^[0-9]*(\.[0-9]{0,2})?$/.test(e)
          ? ((this.slected = e),
            isNaN(this.inputValue) && (this.inputValue = ""))
          : (this.inputValue = "");
      },
      allocateBalance: function (e) {
        (this.valueChange = e), this.$refs.balancepop.open("bottom");
      },
      changeShow: function (e) {
        this.showInput = !1;
      },
      showInputtow: function () {
        this.showInput = !0;
      },
      getUserMoney: function () {
        var o = this;
        return t(
          e().mark(function t() {
            var n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.$getCradByCardId(o.cardId);
                  case 2:
                    (n = e.sent).data.code === o.$code.SUCCESS &&
                      (console.log("余额", n), (o.cardInfo = n.data.data)),
                      n.data.code === o.$code.TOKENFAIL && o.getUserMoney();
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getUserRecordList: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var a, r, c, s;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (a = {
                        pageNum: n.pages,
                        pageSize: 10,
                        topId: n.topId,
                        cardId: n.cardId,
                      }),
                      (e.next = 3),
                      n.$api.$getCradInfoByCardId(a)
                    );
                  case 3:
                    (r = e.sent),
                      console.log("消费记录", r.data),
                      r.data.code === n.$code.SUCCESS &&
                        (o.index.hideLoading(),
                        (n.isloading = !1),
                        (c = r.data.data.list).length < 10 &&
                          (n.status = "nomore"),
                        (s = n.consumeList.concat(c)),
                        (n.consumeList = []),
                        (n.consumeList = Array.from(new Set(s)).sort(function (
                          e,
                          t
                        ) {
                          return t.creatTime - e.creatTime;
                        }))),
                      r.data.code === n.$code.TOKENFAIL &&
                        n.getUserRecordList();
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getCardBg: function (e) {
        return "92#" === e.oilType && e.discountAmount > 0
          ? "rgba(232, 130, 130, 1)"
          : "95#" === e.oilType && e.discountAmount > 0
          ? "rgba(76, 199, 156, 1)"
          : "98#" === e.oilType && e.discountAmount > 0
          ? "rgba(80, 162, 230, 1)"
          : "0#" === e.oilType && e.discountAmount > 0
          ? "rgba(95, 118, 120, 1)"
          : void 0;
      },
      close: function () {
        this.$refs.balancepop.close(), (this.value = 0);
      },
      toOrderDetails: function (e) {
        console.log(e.outOrderNo),
          "油卡充值" != e.description &&
            this.$jump(
              "/pages_pay/order-detail/order-detail?outOrderNo=".concat(
                e.outOrderNo,
                "&orderStatus=3"
              )
            );
      },
      refreshList: function () {
        this.pages++, "nomore" !== this.status && this.getUserRecordList();
      },
      onRefresh: function () {
        (this.pages = 1), this.getUserRecordList(), this.getUserMoney();
      },
      updatePhone: function (e, t) {
        console.log("修改手机号", e),
          t
            ? this.$jump(
                "/pages_my/update-check-phone/update-check-phone?cardid="
                  .concat(e, "&phone=")
                  .concat(t)
              )
            : this.$jump(
                "/pages_my/update-phone/update-phone?cardid=".concat(e)
              );
      },
      goBack: function () {
        o.index.navigateBack();
      },
    },
  };
Array ||
  (
    o.resolveComponent("zym-navigation") +
    o.resolveComponent("u-loadmore") +
    o.resolveComponent("u-skeleton")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-loadmore/u-loadmore.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var a = o._export_sfc(n, [
  [
    "render",
    function (e, t, n, a, r, c) {
      return o.e(
        {
          a: o.p({ title: "车队卡附卡", "is-home-page": !1 }),
          b: r.cardInfo.cardName,
        },
        r.cardInfo.cardName
          ? { c: o.t(r.cardInfo.cardName ? r.cardInfo.cardName : "") }
          : {},
        { d: r.cardInfo.licensePlateNumber },
        r.cardInfo.licensePlateNumber
          ? {
              e: o.t(
                r.cardInfo.licensePlateNumber
                  ? r.cardInfo.licensePlateNumber
                  : ""
              ),
            }
          : {},
        {
          f: "".concat(e.$imgPath, "/phone.png"),
          g: o.t(r.cardInfo.phone ? r.cardInfo.phone : ""),
          h: r.cardInfo.cardBeanNum,
        },
        r.cardInfo.cardBeanNum
          ? { i: o.t(r.cardInfo.cardBeanNum ? r.cardInfo.cardBeanNum : "") }
          : {},
        {
          j: o.o(function (e) {
            return c.updatePhone(r.cardInfo.id, r.cardInfo.phone);
          }),
          k: r.cardInfo.password,
        },
        r.cardInfo.password
          ? {
              l: o.o(function (t) {
                return e.$jump(
                  "/pages_my/check-password/check-password?cardid=".concat(
                    r.cardInfo.id,
                    "&state=1"
                  )
                );
              }),
            }
          : {},
        { m: r.cardInfo.password },
        r.cardInfo.password
          ? {
              n: o.o(function (t) {
                return e.$jump(
                  "/pages_my/forgetpw/forgetpw?carId="
                    .concat(r.cardInfo.id, "&phone=")
                    .concat(r.cardInfo.phone)
                );
              }),
            }
          : {},
        { o: !r.cardInfo.password },
        r.cardInfo.password
          ? {}
          : {
              p: o.o(function (t) {
                return e.$jump(
                  "/pages_my/check-password/check-password?cardid=".concat(
                    r.cardInfo.id,
                    "&state=1"
                  )
                );
              }),
            },
        {
          q: o.t(r.cardInfo.cardBalance ? r.cardInfo.cardBalance : 0),
          r: "".concat(e.imgPath, "/leftIcon.png"),
          s: o.o(function () {
            return c.goBack && c.goBack.apply(c, arguments);
          }),
          t: o.f(r.consumeList, function (e, t, n) {
            return o.e(
              {
                a:
                  0 === t ||
                  e.creatTime.slice(0, 7) !==
                    r.consumeList[t - 1].creatTime.slice(0, 7),
              },
              0 === t ||
                e.creatTime.slice(0, 7) !==
                  r.consumeList[t - 1].creatTime.slice(0, 7)
                ? { b: o.t(e.creatTime.slice(0, 7)) }
                : {},
              {
                c: o.t(e.outOrderNo ? e.outOrderNo : ""),
                d: o.t(1 === e.state ? "消费" : 3 === e.state ? "退款" : ""),
                e: 3 === e.state ? 1 : "",
                f: 3 === e.state ? 1 : "",
                g: e.licensePlateNumber,
              },
              e.licensePlateNumber
                ? { h: o.t(e.licensePlateNumber ? e.licensePlateNumber : "") }
                : {},
              {
                i: o.t(e.oilType ? e.oilType : ""),
                j: o.t(e.price),
                k: o.t(e.cardId ? e.cardId : ""),
                l: o.t(e.oilGunName),
                m: o.t(e.creatTime),
                n: o.t(e.oilMoney),
                o: 3 === e.state,
              },
              3 === e.state
                ? { p: o.t(e.actualPayment) }
                : { q: o.t(e.actualPayment) },
              {
                r: o.t(e.totalOil),
                s: o.o(function (t) {
                  return c.toOrderDetails(e);
                }, t),
                t: t,
              }
            );
          }),
          v: o.p({
            color: "#63DAE0",
            status: r.status,
            "font-size": "32",
            "icon-size": "34",
            line: !0,
          }),
          w: o.o(function () {
            return c.refreshList && c.refreshList.apply(c, arguments);
          }),
          x: o.o(function () {
            return c.onRefresh && c.onRefresh.apply(c, arguments);
          }),
          y: o.p({
            loading: r.isloading,
            rows: "16",
            "rows-height": "32",
            "rows-width": "750rpx",
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-b4c3559c"],
]);
wx.createPage(a);
