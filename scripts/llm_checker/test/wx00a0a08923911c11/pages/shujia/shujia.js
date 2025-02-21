(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/shujia/shujia"],
  {
    "1aa0": function (t, e, i) {
      "use strict";
      (function (t, e) {
        var n = i("4ea4");
        i("6cdc");
        n(i("66fd"));
        var s = n(i("d66f"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), e(s.default);
      }).call(this, i("bc2e")["default"], i("543d")["createPage"]);
    },
    "2ce1": function (t, e, i) {
      "use strict";
      var n = i("a205"),
        s = i.n(n);
      s.a;
    },
    "6dbb": function (t, e, i) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        i("c9b7");
        var n = i("1db1"),
          s = function () {
            i.e("components/nodata")
              .then(
                function () {
                  return resolve(i("3969"));
                }.bind(null, i)
              )
              .catch(i.oe);
          };
        e.default = {
          data: function () {
            return { pageFlag: "" };
          },
          mixins: [n.paging],
          components: { nodata: s },
          onShow: function () {
            t.getStorageSync("isShelf") &&
              (t.showLoading({ title: "加载中" }),
              (this.apiUrl = this.$api.shelflist),
              (this.pageFlag = "isSelect"),
              (this.pageNum = 1),
              (this.selectList = []),
              (this.dataList = null),
              this.getList(),
              (this.isEdit = !1));
          },
          onLoad: function () {
            t.getStorageSync("isShelf") ||
              (t.showLoading({ title: "加载中" }),
              (this.apiUrl = this.$api.shelflist),
              (this.pageFlag = "isSelect"),
              (this.pageNum = 1),
              (this.isEdit = !1),
              (this.selectList = []),
              (this.dataList = null),
              this.getList());
          },
          methods: {
            shelfdelFun: function () {
              var e = this;
              if (0 == this.selectList.length)
                return (
                  t.showToast({
                    title: "请选择要移除的书！",
                    icon: "none",
                    duration: 1e3,
                  }),
                  !1
                );
              this.$post(this.$api.shelfdel, {
                ids: this.selectList.toString(),
              }).then(function (t) {
                (e.isEdit = !1),
                  (e.pageNum = 1),
                  (e.dataList = null),
                  e.getList();
              });
            },
          },
        };
      }).call(this, i("543d")["default"]);
    },
    a205: function (t, e, i) {},
    d66f: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("d93b"),
        s = i("e9bf");
      for (var a in s)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return s[t];
            });
          })(a);
      i("2ce1");
      var o,
        u = i("f0c5"),
        l = Object(u["a"])(
          s["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "74171868",
          null,
          !1,
          n["a"],
          o
        );
      e["default"] = l.exports;
    },
    d93b: function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return s;
      }),
        i.d(e, "c", function () {
          return a;
        }),
        i.d(e, "a", function () {
          return n;
        });
      var n = {
          uniIcons: function () {
            return Promise.all([
              i.e("common/vendor"),
              i.e("uni_modules/uni-icons/components/uni-icons/uni-icons"),
            ]).then(i.bind(null, "1a49"));
          },
        },
        s = function () {
          var t = this,
            e = t.$createElement,
            i = (t._self._c, t.dataList && t.dataList.length > 0),
            n = i && t.isEdit ? t.selectList.length : null,
            s = i && t.isEdit ? t.dataList.length : null,
            a = t.dataList && t.dataList.length > 0,
            o = !t.dataList || 0 == t.dataList.length,
            u = t.isEdit ? t.selectList.length : null;
          t._isMounted ||
            (t.e0 = function (e, i, n) {
              var s = arguments[arguments.length - 1].currentTarget.dataset,
                a = s.eventParams || s["event-params"];
              (i = a.index), (n = a.sj);
              t.isEdit ? t.checkBox(i, n.id) : t.iswxReader(n, "chapter");
            }),
            (t.$mp.data = Object.assign(
              {},
              { $root: { g0: i, g1: n, g2: s, g3: a, g4: o, g5: u } }
            ));
        },
        a = [];
    },
    e9bf: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("6dbb"),
        s = i.n(n);
      for (var a in n)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(a);
      e["default"] = s.a;
    },
  },
  [["1aa0", "common/runtime", "common/vendor"]],
]);
