var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../common/vendor.js"),
  a = require("../../utils/debouns.js"),
  n = require("../../utils/utils.js"),
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
        code: "",
        iscarid: !0,
      };
    },
    mounted: function () {
      this.submitForm = a.throttle(this.submitForm, 2e3);
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
          "绿牌" != this.plateColor
            ? e.length > 7
              ? ((this.carid = e.slice(0, -1)), (this.plateNumber[7] = ""))
              : (this.carid = e)
            : "绿牌" == this.plateColor && (this.carid = e);
      },
      changePlateColor: function (e) {
        this.plateColor = e;
      },
      change: function (e) {},
      checkCarNumber: function () {
        var e = n.validateCarNumber(this.carid);
        return (this.iscarid = e), e;
      },
      addSubmit: function () {
        var e = this;
        r.index.requestSubscribeMessage({
          tmplIds: [
            "sf4ez2r9zfM0rIlFtk9vhIdTlXL4ge6QbQboBrsQ3M0",
            "cFyZ_iDfASp-fHCJXj60_lH2OVPIOdZG9MkVEm-sMoY",
            "yN0VaRqPIumbGSmiiGuLcBsojuHyPy_7rQfw7Oz1I_w",
          ],
          success: function (t) {
            t.errMsg, e.$loading("", !0), e.submitForm(), r.index.hideLoading();
          },
          fail: function (t) {
            e.submitForm(), console.log("失败模板消息", t);
          },
        });
      },
      submitForm: function () {
        var e = {
          licensePlateColor: this.plateColor,
          licensePlateNumber: this.carid,
        };
        if (this.carid.length >= 7) {
          if (
            "绿牌" !== this.plateColor &&
            !1 === n.validateCarNumberseven(this.carid)
          )
            return void (this.iscarid = !1);
          if ("绿牌" === this.plateColor && this.carid.length < 8)
            return void (this.iscarid = !1);
          (n.validateCarNumber(this.carid) ||
            n.validateCarNumberseven(this.carid)) &&
            this.selctCarIdPhone(e);
        } else this.iscarid = !1;
      },
      selctCarIdPhone: function (r) {
        var a = this;
        return t(
          e().mark(function t() {
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), a.$api.selctCarIdPhone();
                  case 2:
                    a.addCaridPhone(r);
                  case 3:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      addCaridPhone: function (a) {
        var n = this;
        return t(
          e().mark(function t() {
            var i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      n.$loading("", !0),
                      r.index.getStorageSync("scene"),
                      (e.next = 3),
                      n.$api.addCarPhone(a)
                    );
                  case 3:
                    if (
                      ((i = e.sent),
                      r.index.setStorageSync("userInfo", i.data.data),
                      i.data.code !== n.$code.FAIL)
                    ) {
                      e.next = 9;
                      break;
                    }
                    return (
                      r.index.showModal({
                        title: "车牌已经绑定了",
                        showCancel: !1,
                      }),
                      e.abrupt("return")
                    );
                  case 9:
                    i.data.code === n.$code.SUCCESS &&
                      (n.$toast("绑定成功", "success"),
                      setTimeout(function () {
                        r.index.navigateTo({ url: "/pages_asset/mycar/mycar" });
                      }, 1e3));
                  case 10:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      nosubmitForm: function () {
        r.index.navigateBack();
      },
    },
  };
Array || (r.resolveComponent("zym-navigation") + r.resolveComponent("Plate"))();
Math;
var o = r._export_sfc(i, [
  [
    "render",
    function (e, t, a, n, i, o) {
      return {
        a: r.p({ title: "添加车牌", "is-home-page": !1 }),
        b: r.n({ selected: "蓝牌" === i.plateColor }),
        c: r.o(function (e) {
          return o.changePlateColor("蓝牌");
        }),
        d: r.n({ selected: "黄牌" === i.plateColor }),
        e: r.o(function (e) {
          return o.changePlateColor("黄牌");
        }),
        f: r.n({ selected: "黑牌" === i.plateColor }),
        g: r.o(function (e) {
          return o.changePlateColor("黑牌");
        }),
        h: r.n({ selected: "绿牌" === i.plateColor }),
        i: r.o(function (e) {
          return o.changePlateColor("绿牌");
        }),
        j: r.o(o.plateChange),
        k: r.p({ plateNumber: i.plateNumber, plateColor: i.plateColor }),
        l: r.t(!1 === i.iscarid ? "车牌号输入错误" : ""),
        m: r.o(function () {
          return o.submitForm && o.submitForm.apply(o, arguments);
        }),
        n: r.o(function () {
          return o.nosubmitForm && o.nosubmitForm.apply(o, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-2c0a6641"],
]);
wx.createPage(o);
