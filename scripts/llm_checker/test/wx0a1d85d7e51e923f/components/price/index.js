Component({
  externalClasses: ["wr-class", "symbol-class", "decimal-class"],
  useStore: [],
  properties: {
    priceUnit: { type: String, value: "fen" },
    price: {
      type: null,
      value: "",
      observer: function (e) {
        this.format(e);
      },
    },
    type: { type: String, value: "" },
    symbol: { type: String, value: "¥" },
    fill: Boolean,
    decimalSmaller: Boolean,
    lineThroughWidth: { type: null, value: "0.12em" },
  },
  data: { pArr: [] },
  methods: {
    format: function (e) {
      e = parseFloat("".concat(e));
      var t = [];
      if (!isNaN(e)) {
        var a = e < 0;
        if ((a && (e = -e), "yuan" === this.properties.priceUnit)) {
          var l = e.toString().split(".");
          (t[0] = l[0]),
            (t[1] = l[1]
              ? 1 === l[1].length
                ? "".concat(l[1], "0")
                : l[1]
              : "00");
        } else
          (e = Math.round(e * Math.pow(10, 8)) / Math.pow(10, 8)),
            (e = Math.ceil(e)),
            (t[0] = e >= 100 ? "".concat(e).slice(0, -2) : "0"),
            (t[1] = "".concat(e + 100).slice(-2));
        this.properties.fill ||
          ("00" === t[1] ? (t[1] = "") : "0" === t[1][1] && (t[1] = t[1][0])),
          a && (t[0] = "-".concat(t[0]));
      }
      this.setData({ pArr: t });
    },
  },
});
