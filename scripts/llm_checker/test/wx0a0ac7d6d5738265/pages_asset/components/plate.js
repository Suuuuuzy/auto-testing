var e = require("../../common/vendor.js"),
  t = {
    name: "plate",
    data: function () {
      return {
        show: !1,
        index: 1,
        areaDatas: [
          "京",
          "津",
          "渝",
          "沪",
          "冀",
          "晋",
          "辽",
          "吉",
          "黑",
          "苏",
          "浙",
          "皖",
          "闽",
          "赣",
          "鲁",
          "豫",
          "鄂",
          "湘",
          "粤",
          "琼",
          "川",
          "贵",
          "云",
          "陕",
          "甘",
          "青",
          "蒙",
          "桂",
          "宁",
          "新",
          "藏",
          "使",
          "领",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        characterDatas: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "M",
          "N",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
          "挂",
          "警",
          "学",
          "港",
          "澳",
        ],
      };
    },
    props: {
      plateNumber: {
        type: Array,
        default: Array.from({ length: 8 }, function (e) {
          return "";
        }),
      },
      plateColor: "",
    },
    computed: {
      currentDatas: function () {
        return 0 === this.index ? this.areaDatas : this.characterDatas;
      },
    },
    mounted: function () {
      this.show = !0;
    },
    methods: {
      handleChange: function (e) {
        (this.index = e), (this.show = !0);
      },
      handleClickKeyBoard: function (e, t) {
        (1 === this.index && (t < 10 || t > 33)) ||
          (this.index > 1 && this.index < 6 && t > 33) ||
          (this.index < 8 &&
            (this.$set(this.plateNumber, this.index, e),
            this.$emit("myPlateChange", this.plateNumber)),
          this.index < 7 && this.index++);
      },
      handleReset: function () {
        this.index = 0;
        for (var e = 0; e < 8; e++) this.$set(this.plateNumber, e, "");
        this.$emit("myPlateChange", this.plateNumber);
      },
      handleDelete: function () {
        this.$set(this.plateNumber, this.index, ""),
          this.$emit("myPlateChange", this.plateNumber),
          this.index > 0 && this.index--;
      },
    },
  };
Array || e.resolveComponent("u-icon")();
Math;
var n = e._export_sfc(t, [
  [
    "render",
    function (t, n, a, r, i, h) {
      return e.e(
        {
          a: e.t(a.plateNumber[0]),
          b: 0 === i.index ? 1 : "",
          c: e.o(function (e) {
            return h.handleChange(0);
          }),
          d: e.t(a.plateNumber[1]),
          e: 1 === i.index ? 1 : "",
          f: e.o(function (e) {
            return h.handleChange(1);
          }),
          g: e.t(a.plateNumber[2]),
          h: 2 === i.index ? 1 : "",
          i: e.o(function (e) {
            return h.handleChange(2);
          }),
          j: e.t(a.plateNumber[3]),
          k: 3 === i.index ? 1 : "",
          l: e.o(function (e) {
            return h.handleChange(3);
          }),
          m: e.t(a.plateNumber[4]),
          n: 4 === i.index ? 1 : "",
          o: e.o(function (e) {
            return h.handleChange(4);
          }),
          p: e.t(a.plateNumber[5]),
          q: 5 === i.index ? 1 : "",
          r: e.o(function (e) {
            return h.handleChange(5);
          }),
          s: e.t(a.plateNumber[6]),
          t: 6 === i.index ? 1 : "",
          v: e.o(function (e) {
            return h.handleChange(6);
          }),
          w: "绿牌" === a.plateColor,
        },
        "绿牌" === a.plateColor
          ? e.e(
              { x: a.plateNumber[7] || 0 === a.plateNumber[7] },
              a.plateNumber[7] || 0 === a.plateNumber[7]
                ? { y: e.t(a.plateNumber[7]) }
                : { z: e.p({ name: "plus", size: "26", color: "#03BE9F" }) },
              {
                A: 7 === i.index ? 1 : "",
                B: e.o(function (e) {
                  return h.handleChange(7);
                }),
              }
            )
          : {},
        {
          C: i.show ? 1 : "",
          D: e.o(function () {
            return h.handleReset && h.handleReset.apply(h, arguments);
          }),
          E: e.o(function (e) {
            return (i.show = !1);
          }),
          F: e.f(h.currentDatas, function (t, n, a) {
            return e.e(
              { a: "" !== t },
              "" !== t
                ? {
                    b: e.t(t),
                    c:
                      (1 === i.index && (n < 10 || n > 33)) ||
                      (i.index > 1 && i.index < 7 && n > 33)
                        ? 1
                        : "",
                    d: e.o(function (e) {
                      return h.handleClickKeyBoard(t, n);
                    }, n),
                  }
                : {},
              { e: n }
            );
          }),
          G: 0 === i.index ? 1 : "",
          H: e.o(function () {
            return h.handleDelete && h.handleDelete.apply(h, arguments);
          }),
          I: i.show ? 1 : "",
        }
      );
    },
  ],
  ["__scopeId", "data-v-e3998e4b"],
]);
wx.createComponent(n);
