(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/vTabs/index"],
  {
    "0283": function (t, e, n) {
      "use strict";
      var i = n("689f");
      n.n(i).a;
    },
    "038a": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return i;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {});
      var i = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    "5d41": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("abd6"),
        a = n.n(i);
      for (var r in i)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(r);
      e.default = a.a;
    },
    "689f": function (t, e, n) {},
    abd6: function (t, e, n) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = {
          props: {
            value: { type: Number, default: 0 },
            tabs: {
              type: Array,
              default: function () {
                return [];
              },
            },
            bgColor: { type: String, default: "#fff" },
            padding: { type: String, default: "0" },
            paddingItem: { type: String, default: "0" },
            color: { type: String, default: "#333" },
            activeColor: { type: String, default: "#2979ff" },
            fontSize: { type: String, default: "28rpx" },
            activeFontSize: { type: String, default: "32rpx" },
            bold: { type: Boolean, default: !0 },
            scroll: { type: Boolean, default: !0 },
            height: { type: String, default: "70rpx" },
            width: { type: String, default: "" },
            lineColor: { type: String, default: "#2979ff" },
            lineHeight: { type: String, default: "10rpx" },
            lineScale: { type: Number, default: 0.5 },
            lineRadius: { type: String, default: "10rpx" },
            template: { type: String, default: "" },
            pills: { type: Boolean, deafult: !1 },
            pillsColor: { type: String, default: "#2979ff" },
            pillsBorderRadius: { type: String, default: "10rpx" },
            field: { type: String, default: "" },
            fixed: { type: Boolean, default: !1 },
            marginItem: { type: String, default: "0" },
            border: { type: String, default: "none" },
            activeBorder: { type: String, default: "none" },
            useFollow: { type: Boolean, default: !0 },
            centerModel: { type: Boolean, default: !1 },
            leftOffsetVal: { type: Number, default: 0 },
            useRightBox: { type: Boolean, default: !1 },
          },
          data: function () {
            return {
              elId: "",
              lineWidth: 30,
              currentWidth: 0,
              lineLeft: 0,
              pillsLeft: 0,
              scrollLeft: 0,
              containerWidth: 0,
              current: 0,
              iconFlg: !1,
            };
          },
          watch: {
            value: function (t) {
              var e = this;
              (this.current = t),
                this.$nextTick(function () {
                  e.getTabItemWidth();
                });
            },
            current: function (t) {
              this.$emit("input", t),
                this.$emit("change", { index: t, tab: this.tabs[t] });
            },
            tabs: function (t) {
              var e = this;
              this.$nextTick(function () {
                if ((e.getTabItemWidth(), "pageE" == e.template))
                  for (var n = 0; n < t.length; n++)
                    t[n].iconUrl && (e.iconFlg = !0);
              });
            },
          },
          methods: {
            randomString: function (t) {
              t = t || 32;
              for (
                var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
                  n = e.length,
                  i = "",
                  a = 0;
                a < t;
                a++
              )
                i += e.charAt(Math.floor(Math.random() * n));
              return i;
            },
            change: function (t) {
              this.current !== t.index &&
                ((this.current = t.index),
                this.$emit("clickChange", {
                  index: this.current,
                  tab: this.tabs[this.current],
                }));
            },
            getTabItemWidth: function () {
              var e = this,
                n = t.createSelectorQuery().in(this);
              n
                .select("#".concat(this.elId))
                .boundingClientRect(function (t) {
                  !e.containerWidth && t && (e.containerWidth = t.width);
                })
                .exec(),
                n
                  .selectAll(".v-tabs__container-item")
                  .boundingClientRect(function (t) {
                    if (t && t.length) {
                      var n = 0;
                      e.centerModel &&
                        (n = (t[0].left < 0 ? 0 : t[0].left) - e.leftOffsetVal);
                      var i = 0;
                      if (t)
                        for (var a = 0; a < t.length; a++)
                          if (a < e.current) n += t[a].width;
                          else {
                            if (a != e.current) break;
                            i = t[a].width;
                          }
                      (e.currentWidth = i),
                        (e.lineWidth = i * e.lineScale * 1),
                        (e.lineLeft = n + i / 2),
                        (e.pillsLeft = n),
                        e.scroll &&
                          (e.scrollLeft = e.lineLeft - e.containerWidth / 2);
                    }
                  })
                  .exec();
            },
          },
          mounted: function () {
            var t = this;
            (this.elId = "xfjpeter_" + this.randomString()),
              (this.current = this.value),
              this.$nextTick(function () {
                t.getTabItemWidth();
              });
          },
        };
        e.default = n;
      }).call(this, n("543d").default);
    },
    c3df: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("038a"),
        a = n("5d41");
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(r);
      n("0283");
      var l = n("f0c5"),
        o = Object(l.a)(
          a.default,
          i.b,
          i.c,
          !1,
          null,
          "a0adbf4e",
          null,
          !1,
          i.a,
          void 0
        );
      e.default = o.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/vTabs/index-create-component",
    {
      "baseComponents/vTabs/index-create-component": function (t, e, n) {
        n("543d").createComponent(n("c3df"));
      },
    },
    [["baseComponents/vTabs/index-create-component"]],
  ]);
