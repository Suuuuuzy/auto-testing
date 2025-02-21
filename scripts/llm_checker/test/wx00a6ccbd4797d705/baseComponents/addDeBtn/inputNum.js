(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/addDeBtn/inputNum"],
  {
    "0950": function (t, n, e) {
      "use strict";
      e.r(n);
      var i = e("c170"),
        o = e.n(i);
      for (var u in i)
        ["default"].indexOf(u) < 0 &&
          (function (t) {
            e.d(n, t, function () {
              return i[t];
            });
          })(u);
      n.default = o.a;
    },
    "4d54": function (t, n, e) {
      "use strict";
      var i = e("c44c");
      e.n(i).a;
    },
    "6852f": function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return i;
      }),
        e.d(n, "c", function () {
          return o;
        }),
        e.d(n, "a", function () {});
      var i = function () {
          this.$createElement, this._self._c;
        },
        o = [];
    },
    ae35: function (t, n, e) {
      "use strict";
      e.r(n);
      var i = e("6852f"),
        o = e("0950");
      for (var u in o)
        ["default"].indexOf(u) < 0 &&
          (function (t) {
            e.d(n, t, function () {
              return o[t];
            });
          })(u);
      e("4d54");
      var s = e("f0c5"),
        r = Object(s.a)(
          o.default,
          i.b,
          i.c,
          !1,
          null,
          "0707cd64",
          null,
          !1,
          i.a,
          void 0
        );
      n.default = r.exports;
    },
    c170: function (t, n, e) {
      "use strict";
      (function (t) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var i = e("ca00"),
          o = (0, i.getProportion)(),
          u = {
            name: "inputNum",
            data: function () {
              return { key: "", isFocus: !1, num: "" };
            },
            props: {
              value: { type: [Number, String], default: "" },
              customClass: { type: String },
              precision: {
                type: Number,
                default: 0,
                validator: function (t) {
                  return t >= 0 && t === parseInt(t, 10);
                },
              },
              isMultipleAdditionOrderFlg: { type: Boolean, default: !1 },
              minOrderCount: { type: [String, Number], default: 0 },
            },
            mounted: function () {
              (this.key =
                parseInt(1e3 * Math.random()) + "" + new Date().getTime()),
                t.$on("print", this.print),
                t.$on("close", this.closeBoard);
            },
            destroyed: function () {
              t.$off("print", this.print), t.$off("close", this.closeBoard);
            },
            methods: {
              toPrecision: function (t, n) {
                return (
                  void 0 === n && (n = this.numPrecision),
                  parseFloat(parseFloat(Number(t).toFixed(n)))
                );
              },
              openKeyBoard: function (n) {
                var e = this;
                this.isMultipleAdditionOrderFlg && this.minOrderCount > 0
                  ? t.showToast({
                      title: "本菜品不支持手动输入数量",
                      icon: "none",
                      duration: 2e3,
                    })
                  : this.$emit("click", function () {
                      e.showBoard(n.touches[0].clientY),
                        (e.isFocus = !0),
                        t.$emit("open", { value: 0, key: e.key });
                    });
              },
              closeBoard: function (t) {
                var n = this;
                "" !== this.num &&
                  this.$emit(
                    "input",
                    this.toPrecision(this.num, this.precision)
                  ),
                  t.key == this.key &&
                    (setTimeout(function () {
                      (n.isFocus = !1), (n.num = "");
                    }, 50),
                    this.$emit("shift", 0));
              },
              print: function (t) {
                if (t.key != this.key) return !1;
                this.num = t.value + "";
              },
              showBoard: function (t) {
                var n = (0, i.getSystemInfoSync)(),
                  e = n.windowHeight - 44 - n.safeAreaInsets.top - t,
                  u = 252 * o + 20 - (e < 0 ? 0 : e);
                u > 0 && this.$emit("shift", u);
              },
            },
          };
        n.default = u;
      }).call(this, e("543d").default);
    },
    c44c: function (t, n, e) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/addDeBtn/inputNum-create-component",
    {
      "baseComponents/addDeBtn/inputNum-create-component": function (t, n, e) {
        e("543d").createComponent(e("ae35"));
      },
    },
    [["baseComponents/addDeBtn/inputNum-create-component"]],
  ]);
