var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = require("../../../@babel/runtime/helpers/slicedToArray"),
  a = require("../common/component"),
  n = require("../common/utils"),
  r = require("../picker/shared"),
  u = new Date().getFullYear();
function i(e, t, a) {
  return Math.min(Math.max(e, t), a);
}
function o(e) {
  return "00".concat(e).slice(-2);
}
function s(e) {
  if (e) {
    for (; isNaN(parseInt(e, 10)); ) e = e.slice(1);
    return parseInt(e, 10);
  }
}
function l(e, t) {
  return 32 - new Date(e, t - 1, 32).getDate();
}
var c = function (e, t) {
  return t;
};
(0, a.VantComponent)({
  classes: ["active-class", "toolbar-class", "column-class"],
  props: Object.assign(Object.assign({}, r.pickerProps), {
    value: { type: null, observer: "updateValue" },
    filter: null,
    type: { type: String, value: "datetime", observer: "updateValue" },
    showToolbar: { type: Boolean, value: !0 },
    formatter: { type: null, value: c },
    minDate: {
      type: Number,
      value: new Date(u - 10, 0, 1).getTime(),
      observer: "updateValue",
    },
    maxDate: {
      type: Number,
      value: new Date(u + 10, 11, 31).getTime(),
      observer: "updateValue",
    },
    minHour: { type: Number, value: 0, observer: "updateValue" },
    maxHour: { type: Number, value: 23, observer: "updateValue" },
    minMinute: { type: Number, value: 0, observer: "updateValue" },
    maxMinute: { type: Number, value: 59, observer: "updateValue" },
  }),
  data: { innerValue: Date.now(), columns: [] },
  methods: {
    updateValue: function () {
      var e = this,
        t = this.data,
        a = this.correctValue(t.value);
      a === t.innerValue
        ? this.updateColumns()
        : this.updateColumnValue(a).then(function () {
            e.$emit("input", a);
          });
    },
    getPicker: function () {
      if (null == this.picker) {
        this.picker = this.selectComponent(".van-datetime-picker");
        var e = this.picker,
          t = e.setColumnValues;
        e.setColumnValues = function () {
          for (var a = arguments.length, n = new Array(a), r = 0; r < a; r++)
            n[r] = arguments[r];
          return t.apply(e, [].concat(n, [!1]));
        };
      }
      return this.picker;
    },
    updateColumns: function () {
      var e = this.data.formatter,
        t = void 0 === e ? c : e,
        a = this.getOriginColumns().map(function (e) {
          return {
            values: e.values.map(function (a) {
              return t(e.type, a);
            }),
          };
        });
      return this.set({ columns: a });
    },
    getOriginColumns: function () {
      var e = this.data.filter;
      return this.getRanges().map(function (t) {
        var a = t.type,
          n = t.range,
          r = (function (e, t) {
            for (var a = -1, n = Array(e < 0 ? 0 : e); ++a < e; ) n[a] = t(a);
            return n;
          })(n[1] - n[0] + 1, function (e) {
            var t = n[0] + e;
            return (t = "year" === a ? "".concat(t) : o(t));
          });
        return e && (r = e(a, r)), { type: a, values: r };
      });
    },
    getRanges: function () {
      var e = this.data;
      if ("time" === e.type)
        return [
          { type: "hour", range: [e.minHour, e.maxHour] },
          { type: "minute", range: [e.minMinute, e.maxMinute] },
        ];
      var t = this.getBoundary("max", e.innerValue),
        a = t.maxYear,
        n = t.maxDate,
        r = t.maxMonth,
        u = t.maxHour,
        i = t.maxMinute,
        o = this.getBoundary("min", e.innerValue),
        s = o.minYear,
        l = o.minDate,
        c = [
          { type: "year", range: [s, a] },
          { type: "month", range: [o.minMonth, r] },
          { type: "day", range: [l, n] },
          { type: "hour", range: [o.minHour, u] },
          { type: "minute", range: [o.minMinute, i] },
        ];
      return (
        "date" === e.type && c.splice(3, 2),
        "year-month" === e.type && c.splice(2, 3),
        c
      );
    },
    correctValue: function (e) {
      var a,
        r = this.data,
        u = "time" !== r.type;
      if (u && ((a = e), !(0, n.isDef)(a) || isNaN(new Date(a).getTime())))
        e = r.minDate;
      else if (!u && !e) {
        var s = r.minHour;
        e = "".concat(o(s), ":00");
      }
      if (!u) {
        var l = e.split(":"),
          c = t(l, 2),
          m = c[0],
          p = c[1];
        return (
          (m = o(i(m, r.minHour, r.maxHour))),
          (p = o(i(p, r.minMinute, r.maxMinute))),
          "".concat(m, ":").concat(p)
        );
      }
      return (e = Math.max(e, r.minDate)), (e = Math.min(e, r.maxDate));
    },
    getBoundary: function (t, a) {
      var n = new Date(a),
        r = new Date(this.data["".concat(t, "Date")]),
        u = r.getFullYear(),
        i = 1,
        o = 1,
        s = 0,
        c = 0;
      return (
        "max" === t &&
          ((i = 12),
          (o = l(n.getFullYear(), n.getMonth() + 1)),
          (s = 23),
          (c = 59)),
        n.getFullYear() === u &&
          ((i = r.getMonth() + 1),
          n.getMonth() + 1 === i &&
            ((o = r.getDate()),
            n.getDate() === o &&
              ((s = r.getHours()),
              n.getHours() === s && (c = r.getMinutes())))),
        e(
          e(
            e(
              e(e({}, "".concat(t, "Year"), u), "".concat(t, "Month"), i),
              "".concat(t, "Date"),
              o
            ),
            "".concat(t, "Hour"),
            s
          ),
          "".concat(t, "Minute"),
          c
        )
      );
    },
    onCancel: function () {
      this.$emit("cancel");
    },
    onConfirm: function () {
      this.$emit("confirm", this.data.innerValue);
    },
    onChange: function () {
      var e,
        t = this,
        a = this.data,
        n = this.getPicker(),
        r = this.getOriginColumns();
      if ("time" === a.type) {
        var u = n.getIndexes();
        e = "".concat(+r[0].values[u[0]], ":").concat(+r[1].values[u[1]]);
      } else {
        var i = n.getIndexes().map(function (e, t) {
            return r[t].values[e];
          }),
          o = s(i[0]),
          c = s(i[1]),
          m = l(o, c),
          p = s(i[2]);
        "year-month" === a.type && (p = 1), (p = p > m ? m : p);
        var h = 0,
          g = 0;
        "datetime" === a.type && ((h = s(i[3])), (g = s(i[4]))),
          (e = new Date(o, c - 1, p, h, g));
      }
      (e = this.correctValue(e)),
        this.updateColumnValue(e).then(function () {
          t.$emit("input", e), t.$emit("change", n);
        });
    },
    updateColumnValue: function (e) {
      var t = this,
        a = [],
        n = this.data.type,
        r = this.data.formatter || c,
        u = this.getPicker();
      if ("time" === n) {
        var i = e.split(":");
        a = [r("hour", i[0]), r("minute", i[1])];
      } else {
        var s = new Date(e);
        (a = [
          r("year", "".concat(s.getFullYear())),
          r("month", o(s.getMonth() + 1)),
        ]),
          "date" === n && a.push(r("day", o(s.getDate()))),
          "datetime" === n &&
            a.push(
              r("day", o(s.getDate())),
              r("hour", o(s.getHours())),
              r("minute", o(s.getMinutes()))
            );
      }
      return this.set({ innerValue: e })
        .then(function () {
          return t.updateColumns();
        })
        .then(function () {
          return u.setValues(a);
        });
    },
  },
  created: function () {
    var e = this,
      t = this.correctValue(this.data.value);
    this.updateColumnValue(t).then(function () {
      e.$emit("input", t);
    });
  },
});
