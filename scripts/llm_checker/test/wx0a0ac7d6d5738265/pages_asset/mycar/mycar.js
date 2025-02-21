var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../common/vendor.js"),
  r = require("../../utils/utils.js"),
  n = {
    components: {
      Plate: function () {
        return "../components/plate.js";
      },
    },
    data: function () {
      return {
        isopen: !1,
        plateNumber: ["", "", "", "", "", "", "", ""],
        plateColor: "蓝牌",
        carList: [],
        isModalVisible: !1,
        carNumber: "",
        newCarNumber: "",
        defaultCarIndex: 0,
      };
    },
    onLoad: function () {
      this.getMyCarList();
    },
    methods: {
      plateChange: function (e) {
        (this.plateNumber = e), this.handleSave();
      },
      handleSave: function () {
        var e = "";
        this.plateNumber.forEach(function (t, a) {
          e += t;
        }),
          (this.newCarNumber = e);
      },
      changePlateColor: function (e) {
        this.plateColor = e;
      },
      hideModal: function () {
        this.isModalVisible = !1;
      },
      EditCarNumber: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var n, o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      ((n = {
                        modifyTheFrontLicensePlateNumber: a.carNumber,
                        revisedLicensePlateNumber: a.newCarNumber,
                      }),
                      !(a.newCarNumber.length >= 7))
                    ) {
                      e.next = 15;
                      break;
                    }
                    if (
                      "绿牌" === a.plateColor ||
                      !1 !== r.validateCarNumberseven(a.newCarNumber)
                    ) {
                      e.next = 5;
                      break;
                    }
                    return a.$toast("请输入正确的车牌"), e.abrupt("return");
                  case 5:
                    if (
                      !("绿牌" === a.plateColor && a.newCarNumber.length < 8)
                    ) {
                      e.next = 8;
                      break;
                    }
                    return a.$toast("请输入正确的车牌"), e.abrupt("return");
                  case 8:
                    if (
                      !r.validateCarNumber(a.newCarNumber) &&
                      !r.validateCarNumberseven(a.newCarNumber)
                    ) {
                      e.next = 13;
                      break;
                    }
                    return (e.next = 11), a.$api.EditCarId(n);
                  case 11:
                    (o = e.sent),
                      (a.isModalVisible = !1),
                      a.getMyCarList(),
                      o.data.code === a.$code.SUCCESS
                        ? a.$toast("成功")
                        : a.$toast("失败");
                  case 13:
                    e.next = 16;
                    break;
                  case 15:
                    a.$toast("请输入正确的车牌");
                  case 16:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      handleDel: function (e) {
        var t = this;
        console.log(e),
          a.index.showModal({
            title: "确定要删除吗？",
            success: function (a) {
              if (a.confirm) {
                var r = {
                  licensePlateColor: e.licensePlateColor,
                  licensePlateNumber: e.licensePlateNumber,
                };
                t.$api.deleteCarId(r).then(function (e) {
                  console.log(e), t.getMyCarList(), t.$toast("成功");
                });
              }
            },
          });
      },
      handleEdit: function (e) {
        console.log(e),
          (this.carNumber = e.licensePlateNumber),
          (this.plateColor = e.licensePlateColor),
          (this.plateNumber = e.licensePlateNumber.split("")),
          (this.isModalVisible = !0);
      },
      getBackColor: function (e) {
        return "蓝牌" === e.licensePlateColor
          ? "rgba(236, 242, 254, 1)"
          : "黄牌" === e.licensePlateColor
          ? "rgba(255, 246, 217, 1)"
          : "黑牌" === e.licensePlateColor
          ? "rgba(240, 240, 245, 1)"
          : "绿牌" === e.licensePlateColor
          ? "rgba(224, 255, 236, 1)"
          : void 0;
      },
      getMyCarList: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), a.$api.getMyCarList();
                  case 2:
                    (r = e.sent).data.code === a.$code.SUCCESS &&
                      (console.log(r.data.data), (a.carList = r.data.data));
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      selectDefaultCar: function (a, r) {
        var n = this;
        return t(
          e().mark(function t() {
            var o, i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n.defaultCarIndex = r),
                      (o = {
                        licensePlateColor: a.licensePlateColor,
                        licensePlateNumber: a.licensePlateNumber,
                      }),
                      (e.next = 4),
                      n.$api.EditDefCar(o)
                    );
                  case 4:
                    (i = e.sent),
                      console.log("默认", i.data),
                      i.data.code === n.$code.SUCCESS &&
                        n.$toast("设置成功", "none", 2e3, !1);
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array ||
  (
    a.resolveComponent("zym-navigation") +
    a.resolveComponent("u-icon") +
    a.resolveComponent("Plate")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    }
  )();
var o = a._export_sfc(n, [
  [
    "render",
    function (e, t, r, n, o, i) {
      return {
        a: a.p({ title: "我的车辆", "is-home-page": !0 }),
        b: a.f(o.carList, function (e, t, r) {
          return {
            a: a.t(e.licensePlateColor),
            b: i.getBackColor(e),
            c:
              "黄牌" == e.licensePlateColor
                ? "#FF9900FF"
                : "蓝牌" == e.licensePlateColor
                ? "#2068D7FF"
                : "黑牌" == e.licensePlateColor
                ? "#45474DFF"
                : "#07AB98FF",
            d: a.t(
              e.licensePlateNumber.slice(0, 2) +
                "·" +
                e.licensePlateNumber.slice(2)
            ),
            e: a.t(e.createTime),
            f: "a24a95a2-1-" + r,
            g: a.o(function (t) {
              return i.handleEdit(e);
            }, t),
            h: "a24a95a2-2-" + r,
            i: a.o(function (t) {
              return i.handleDel(e);
            }, t),
            j: a.t(t === o.defaultCarIndex ? "默认" : "设为默认"),
            k: t === o.defaultCarIndex ? 1 : "",
            l: t !== o.defaultCarIndex ? 1 : "",
            m: a.o(function (a) {
              return i.selectDefaultCar(e, t);
            }, t),
            n: t,
          };
        }),
        c: a.p({ name: "edit-pen", size: "32" }),
        d: a.p({ name: "trash", size: "32" }),
        e: a.o(i.plateChange),
        f: a.p({ plateNumber: o.plateNumber, plateColor: o.plateColor }),
        g: a.o(function () {
          return i.hideModal && i.hideModal.apply(i, arguments);
        }),
        h: a.o(function () {
          return i.EditCarNumber && i.EditCarNumber.apply(i, arguments);
        }),
        i: o.isModalVisible,
        j: a.o(function (t) {
          return e.$jump("/pages_asset/add-more-car/add-more-car");
        }),
      };
    },
  ],
  ["__scopeId", "data-v-a24a95a2"],
]);
wx.createPage(o);
