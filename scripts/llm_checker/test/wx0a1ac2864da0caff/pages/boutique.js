(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutique"],
  {
    "1dc7": function (t, e, i) {},
    "1f6b": function (t, e, i) {
      "use strict";
      (function (t) {
        var n = i("47a9");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = n(i("7ca3")),
          o = i("05ff"),
          r = i("8f59"),
          c = i("4bd4"),
          d = n(i("e94a"));
        function l(t, e) {
          var i = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              i.push.apply(i, n);
          }
          return i;
        }
        var u = {
          config: { navigationStyle: "custom", disableScroll: !0 },
          components: {
            ppNav: function () {
              i.e("components/pp/Nav")
                .then(
                  function () {
                    return resolve(i("ac66"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
          },
          computed: (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var i = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? l(Object(i), !0).forEach(function (e) {
                    (0, a.default)(t, e, i[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : l(Object(i)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(i, e)
                    );
                  });
            }
            return t;
          })(
            {},
            (0, r.mapState)({
              navigationBarHeight: function (t) {
                return t.navigationBarHeight;
              },
              navigationBarHeightPlaceholder: function (t) {
                return t.navigationBarHeightPlaceholder;
              },
            })
          ),
          data: function () {
            return {
              detail: null,
              previewThumb: "",
              previewVideo: "",
              phone: "",
              nowBanner: 0,
              showView: !1,
              markers: [],
            };
          },
          methods: {
            toBook: function () {
              var t = {
                m04v: "北京源邸",
                m0n3: "上海源邸",
                m5Ky: "北京客服中心",
                qy68: "上海客服中心",
              };
              t[this.detail.id] &&
                this.$tracking("common_event_click", {
                  event_name: t,
                  event_category: "立即预约",
                  event_value: "立即预约",
                }),
                this.$router.push("boutiqueBookForm?id=" + this.detail.id);
            },
            toView: function () {
              var t = { m04v: "北京源邸", m0n3: "上海源邸" },
                e = { m5Ky: "北京客服中心", qy68: "上海客服中心" };
              t[this.detail.id]
                ? this.$tracking("common_event_click", {
                    event_name: t[this.detail.id],
                    event_category: "参观源邸",
                    event_value: "参观源邸",
                  })
                : e[this.detail.id] &&
                  this.$tracking("common_event_click", {
                    event_name: e[this.detail.id],
                    event_category: "参观客服中心",
                    event_value: "参观客服中心",
                  }),
                this.$router.push(
                  "boutiqueView?name=" +
                    encodeURIComponent(this.detail.name) +
                    "&id=" +
                    this.detail.id
                );
            },
            callPhone: function () {
              var e = this.phone.split("tel:");
              t.makePhoneCall({ phoneNumber: e[1], error: function () {} }),
                t.setClipboardData({ data: e[1] });
              var i = {
                m04v: "北京源邸",
                m0n3: "上海源邸",
                m5Ky: "北京客服中心",
                qy68: "上海客服中心",
              };
              i[this.detail.id] &&
                this.$tracking("common_event_click", {
                  event_name: i,
                  event_category: "电话",
                  event_value: "电话",
                });
            },
            showLocation: function () {
              var e = {
                m04v: "北京源邸",
                m0n3: "上海源邸",
                m5Ky: "北京客服中心",
                qy68: "上海客服中心",
              };
              e[this.detail.id] &&
                this.$tracking("common_event_click", {
                  event_name: e,
                  event_category: "导航",
                  event_value: "导航",
                }),
                t.openLocation({
                  name: this.detail.name,
                  address: this.detail.address,
                  latitude: this.detail.latitude,
                  longitude: this.detail.longitude,
                  scale: 16,
                });
            },
          },
          onShow: function () {
            var t = this.$root.$mp.query;
            if (!t || !t.id)
              return (
                (this.detail = null),
                void this.$alert("获取参数错误，请返回后重试")
              );
            if (!this.detail || this.detail.id !== t.id)
              if (
                ((this.detail = (0, c.getBoutiqueById)(t.id)),
                d.default[t.id]
                  ? ((this.detail = Object.assign(
                      this.detail,
                      d.default[t.id]
                    )),
                    this.detail.view &&
                      ((this.previewThumb = this.detail.thumb),
                      (this.previewVideo = this.detail.video)))
                  : (this.detail.can_book = 0),
                (this.markers = [
                  {
                    id: 1,
                    latitude: this.detail.latitude,
                    longitude: this.detail.longitude,
                    iconPath: "/static/img/icon-retailer.png",
                    width: 39,
                    height: 50,
                    anchor: { x: 0.5, y: 1 },
                  },
                ]),
                this.detail.phone)
              ) {
                var e = (0, o.parsePhoneNumberFromString)(this.detail.phone);
                this.phone = e ? e.getURI() : this.detail.phone;
              } else this.phone = "";
          },
          onShareAppMessage: function (t) {
            var e = this.$root.$mp.query.id || "",
              i = "";
            i =
              "m04v" == e
                ? "https://cdn.impdigital.cn/patek/bjyd-share.png"
                : "https://cdn.impdigital.cn/patek/shyd-share.png";
            var n = "/pages/index?path=boutique%3Fid%3D".concat(this.detail.id);
            return { title: "百达翡丽时计查询", path: n, imageUrl: i };
          },
        };
        e.default = u;
      }).call(this, i("df3c")["default"]);
    },
    "24a6": function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return a;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this.$createElement;
          this._self._c;
        },
        a = [];
    },
    "33c9": function (t, e, i) {
      "use strict";
      (function (t, e) {
        var n = i("47a9");
        i("b45a");
        n(i("3240"));
        var a = n(i("4b5d"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), e(a.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
    "4b5d": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("24a6"),
        a = i("dfef");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return a[t];
            });
          })(o);
      i("8c19");
      var r = i("828b"),
        c = Object(r["a"])(
          a["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "097ee5e6",
          null,
          !1,
          n["a"],
          void 0
        );
      e["default"] = c.exports;
    },
    "8c19": function (t, e, i) {
      "use strict";
      var n = i("1dc7"),
        a = i.n(n);
      a.a;
    },
    dfef: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("1f6b"),
        a = i.n(n);
      for (var o in n)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(o);
      e["default"] = a.a;
    },
  },
  [["33c9", "common/runtime", "common/vendor"]],
]);
