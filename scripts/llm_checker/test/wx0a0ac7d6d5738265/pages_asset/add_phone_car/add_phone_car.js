var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../common/vendor.js"),
  a = require("../../utils/utils.js"),
  o = require("../../utils/debouns.js"),
  i = {
    components: {
      Plate: function () {
        return "../components/plate.js";
      },
    },
    name: "car",
    data: function () {
      return {
        plateNumber: ["粤", "", "", "", "", "", "", ""],
        plateColor: "蓝牌",
        carid: "",
        phoneNumber: n.index.getStorageSync("phone"),
        code: "",
        iscarid: !0,
        isphone: !0,
      };
    },
    computed: r(
      {},
      n.mapState({
        phone: function (e) {
          return e.phone;
        },
      })
    ),
    mounted: function () {
      var e = this;
      this.$nextTick(function () {
        (e.submitForm = o.throttle(e.submitForm, 2e3)),
          e.$api.selctCarIdPhone().then(function (e) {
            2e4 === e.data.code && e.data.phoneExisting;
          }),
          (e.phoneNumber = n.index.getStorageSync("phone")),
          "" == e.phoneNumber && (e.phoneNumber = e.phone);
      });
    },
    methods: {
      plateChange: function (e) {
        (this.plateNumber = e), this.handleSave();
      },
      handleSave: function () {
        var e = "";
        this.plateNumber.forEach(function (t, r) {
          e += t;
        }),
          console.log(this.plateColor),
          "绿牌" != this.plateColor
            ? (e.length > 7
                ? ((this.carid = e.slice(0, -1)), (this.plateNumber[7] = ""))
                : (this.carid = e),
              console.log("不是绿牌", this.carid))
            : "绿牌" == this.plateColor &&
              (console.log("是绿牌", this.carid), (this.carid = e));
      },
      changePlateColor: function (e) {
        this.plateColor = e;
      },
      checkPhone: function () {
        var e = a.validateTelephoneNumber(this.phoneNumber);
        return (this.isphone = e), e;
      },
      submitForm: function () {
        if ((console.log("11", this.carid), !this.carid))
          return (this.iscarid = !1), !1;
        var e = {
          licensePlateColor: this.plateColor,
          licensePlateNumber: this.carid,
        };
        return this.carid.length >= 7 &&
          ("绿牌" === this.plateColor || a.validateCarNumberseven(this.carid))
          ? "绿牌" === this.plateColor && this.carid.length < 8
            ? ((this.iscarid = !1), !1)
            : void (
                (a.validateCarNumber(this.carid) ||
                  a.validateCarNumberseven(this.carid)) &&
                this.selctCarIdPhone(e)
              )
          : ((this.iscarid = !1), !1);
      },
      getDinyue: function () {
        var e = this;
        n.index.requestSubscribeMessage({
          tmplIds: [
            "sf4ez2r9zfM0rIlFtk9vhIdTlXL4ge6QbQboBrsQ3M0",
            "cFyZ_iDfASp-fHCJXj60_lH2OVPIOdZG9MkVEm-sMoY",
            "yN0VaRqPIumbGSmiiGuLcBsojuHyPy_7rQfw7Oz1I_w",
          ],
          success: function (t) {
            t.errMsg, e.submitForm();
          },
          fail: function (e) {
            console.log("失败模板消息", e);
          },
        });
      },
      selctCarIdPhone: function (r) {
        var a = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      console.log("1234", r),
                      (e.next = 3),
                      a.$api.selctCarIdPhone()
                    );
                  case 3:
                    if (
                      ((o = e.sent),
                      console.log("检查绑定", o),
                      o.data.code !== a.$code.SUCCESS)
                    ) {
                      e.next = 11;
                      break;
                    }
                    if ("1" !== o.data.data.carExisting) {
                      e.next = 10;
                      break;
                    }
                    return (
                      n.index.showModal({
                        title: "车牌已绑过了",
                        showCancel: !1,
                      }),
                      e.abrupt("return")
                    );
                  case 10:
                    a.addCaridPhone(r);
                  case 11:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      addCaridPhone: function (r) {
        var a = this;
        return t(
          e().mark(function t() {
            var o, i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      a.$loading("", !0),
                      (o = n.index.getStorageSync("scene")),
                      (e.next = 4),
                      a.$api.addCarPhone(r)
                    );
                  case 4:
                    if (
                      ((i = e.sent),
                      console.log("绑定车牌", i),
                      i.data.code !== a.$code.FAIL)
                    ) {
                      e.next = 8;
                      break;
                    }
                    return (
                      n.index.showModal({
                        title: i.data.message,
                        showCancel: !1,
                      }),
                      e.abrupt("return")
                    );
                  case 8:
                    i.data.code === a.$code.SUCCESS &&
                      (a.$toast("绑定成功", "success"),
                      a.getUserInfoDetail(),
                      setTimeout(
                        1035 === o || 1007 === o || 1008 === o
                          ? function () {
                              n.index.reLaunch({ url: "/pages_pay/pay/pay" }),
                                n.index.removeStorageSync("scene");
                            }
                          : function () {
                              n.index.switchTab({ url: "/pages/index/index" });
                            },
                        1e3
                      ));
                  case 9:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      nosubmitForm: function () {
        n.index.switchTab({ url: "/pages/index/index" });
      },
      getUserInfoDetail: function () {
        var r = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), r.$api.getUserInfoDetail();
                  case 2:
                    (a = e.sent),
                      n.index.setStorageSync("userInfo", a.data.data),
                      r.$store.commit("setUserInfo", a.data.data);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array || (n.resolveComponent("zym-navigation") + n.resolveComponent("Plate"))();
Math;
var s = n._export_sfc(i, [
  [
    "render",
    function (e, t, r, a, o, i) {
      return {
        a: n.p({ title: "绑定", "is-home-page": !0 }),
        b: n.n({ selected: "蓝牌" === o.plateColor }),
        c: n.o(function (e) {
          return i.changePlateColor("蓝牌");
        }),
        d: n.n({ selected: "黄牌" === o.plateColor }),
        e: n.o(function (e) {
          return i.changePlateColor("黄牌");
        }),
        f: n.n({ selected: "黑牌" === o.plateColor }),
        g: n.o(function (e) {
          return i.changePlateColor("黑牌");
        }),
        h: n.n({ selected: "绿牌" === o.plateColor }),
        i: n.o(function (e) {
          return i.changePlateColor("绿牌");
        }),
        j: n.o(i.plateChange),
        k: n.p({ plateNumber: o.plateNumber, plateColor: o.plateColor }),
        l: n.t(!1 === o.iscarid ? "车牌号输入错误" : ""),
        m: n.o(function () {
          return i.submitForm && i.submitForm.apply(i, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-a0d86b77"],
]);
wx.createPage(s);
