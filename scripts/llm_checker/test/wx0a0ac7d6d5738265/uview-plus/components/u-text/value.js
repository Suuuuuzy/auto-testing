var e = require("../../../common/vendor.js"),
  t = {
    computed: {
      value: function () {
        var t = this.text,
          r = this.mode,
          n = this.format,
          u = this.href;
        return "price" === r
          ? (/^\d+(\.\d+)?$/.test(t) ||
              e.index.$u.error("金额模式下，text参数需要为金额格式"),
            e.index.$u.test.func(n) ? n(t) : e.index.$u.priceFormat(t, 2))
          : "date" === r
          ? (!e.index.$u.test.date(t) &&
              e.index.$u.error("日期模式下，text参数需要为日期或时间戳格式"),
            e.index.$u.test.func(n)
              ? n(t)
              : n
              ? e.index.$u.timeFormat(t, n)
              : e.index.$u.timeFormat(t, "yyyy-mm-dd"))
          : "phone" === r
          ? e.index.$u.test.func(n)
            ? n(t)
            : "encrypt" === n
            ? "".concat(t.substr(0, 3), "****").concat(t.substr(7))
            : t
          : "name" === r
          ? ("string" != typeof t &&
              e.index.$u.error("姓名模式下，text参数需要为字符串格式"),
            e.index.$u.test.func(n)
              ? n(t)
              : "encrypt" === n
              ? this.formatName(t)
              : t)
          : ("link" === r &&
              !e.index.$u.test.url(u) &&
              e.index.$u.error("超链接模式下，href参数需要为URL格式"),
            t);
      },
    },
    methods: {
      formatName: function (e) {
        var t = "";
        if (2 === e.length) t = e.substr(0, 1) + "*";
        else if (e.length > 2) {
          for (var r = "", n = 0, u = e.length - 2; n < u; n++) r += "*";
          t = e.substr(0, 1) + r + e.substr(-1, 1);
        } else t = e;
        return t;
      },
    },
  };
exports.value = t;
