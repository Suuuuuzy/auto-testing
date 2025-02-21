(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/author_list/author_list"],
  {
    "0a34": function (t, e, a) {
      a.r(e);
      var n = a("bfe5"),
        o = a("c41f");
      for (var i in o)
        "default" !== i &&
          (function (t) {
            a.d(e, t, function () {
              return o[t];
            });
          })(i);
      a("9e79");
      var u = a("f0c5"),
        c = Object(u.a)(
          o.default,
          n.b,
          n.c,
          !1,
          null,
          null,
          null,
          !1,
          n.a,
          void 0
        );
      e.default = c.exports;
    },
    "1bda": function (t, e, a) {},
    2309: function (t, e, a) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n,
          o = {
            onLoad: function (e) {
              (n = this),
                (this.page_data = this._pData),
                t.setNavigationBarTitle({ title: "授权" }),
                console.log("width:" + this.height_upx + "*" + this.width_upx),
                t.$on("update_author_list", function (t) {
                  n.load_page_data();
                });
            },
            onUnload: function () {
              t.$off("update_author_list");
            },
            onReady: function () {
              this.load_page_data();
            },
            onPullDownRefresh: function () {
              this.load_page_data();
            },
            components: {
              empty: function () {
                a.e("components/empty-view")
                  .then(
                    function () {
                      return resolve(a("c064"));
                    }.bind(null, a)
                  )
                  .catch(a.oe);
              },
            },
            data: function () {
              return { data_list: [], page_data: void 0 };
            },
            computed: {
              screen_height: function () {
                return t.upx2px(this.windowHeight) + "px";
              },
            },
            methods: {
              load_page_data: function () {
                this.$api51.api51_author_list(
                  function (e, a) {
                    (n.data_list = e), t.stopPullDownRefresh();
                  },
                  function (e, a) {
                    t.showToast({ title: a + e, icon: "none" }),
                      t.stopPullDownRefresh();
                  }
                );
              },
              click_add_btn: function (t) {
                (this.page_data.operate_type = this.$operate_add),
                  (this.page_data.device_type = this.page_data.device_type),
                  n.navTo("./author_add", this.page_data);
              },
              click_edit: function (t) {
                var e = t.currentTarget.dataset.value;
                (e.operate_type = this.$operate_edit),
                  (e.device_type = this.page_data.device_type),
                  n.navTo("./author_add", e);
              },
              click_delete: function (e) {
                var a = e.currentTarget.dataset.value;
                t.showModal({
                  title: "删除授权",
                  content: "删除授权后该用户将不能控制车查看车辆信息",
                  success: function (e) {
                    e.confirm &&
                      n.page_data.device_type == n.$device_ctrl_gps &&
                      n.$api51.api51_delete_author(
                        a.id,
                        function (e, a) {
                          t.showToast({ title: a, icon: "success" }),
                            n.load_page_data();
                        },
                        function (e, a) {
                          t.showToast({ title: a + e, icon: "none" });
                        }
                      );
                  },
                });
              },
            },
          };
        e.default = o;
      }).call(this, a("543d").default);
    },
    "777b": function (t, e, a) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        a("f567"), e(a("66fd")), t(e(a("0a34")).default);
      }).call(this, a("543d").createPage);
    },
    "9e79": function (t, e, a) {
      var n = a("1bda");
      a.n(n).a;
    },
    bfe5: function (t, e, a) {
      a.d(e, "b", function () {
        return n;
      }),
        a.d(e, "c", function () {
          return o;
        }),
        a.d(e, "a", function () {});
      var n = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        o = [];
    },
    c41f: function (t, e, a) {
      a.r(e);
      var n = a("2309"),
        o = a.n(n);
      for (var i in n)
        "default" !== i &&
          (function (t) {
            a.d(e, t, function () {
              return n[t];
            });
          })(i);
      e.default = o.a;
    },
  },
  [["777b", "common/runtime", "common/vendor"]],
]);
