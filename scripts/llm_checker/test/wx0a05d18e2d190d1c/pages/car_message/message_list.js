(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/car_message/message_list"],
  {
    "0bcf": function (t, n, e) {},
    1199: function (t, n, e) {
      var i = e("0bcf");
      e.n(i).a;
    },
    "5b87": function (t, n, e) {
      e.r(n);
      var i = e("790c"),
        a = e.n(i);
      for (var c in i)
        "default" !== c &&
          (function (t) {
            e.d(n, t, function () {
              return i[t];
            });
          })(c);
      n.default = a.a;
    },
    "5e87": function (t, n, e) {
      (function (t) {
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        e("f567"), n(e("66fd")), t(n(e("d2dd")).default);
      }).call(this, e("543d").createPage);
    },
    "790c": function (t, n, e) {
      (function (t) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var i = {
          components: {
            uniList: function () {
              e.e("components/uni-list/uni-list")
                .then(
                  function () {
                    return resolve(e("4b82"));
                  }.bind(null, e)
                )
                .catch(e.oe);
            },
            uniListItem: function () {
              e.e("components/uni-list-item/uni-list-item")
                .then(
                  function () {
                    return resolve(e("7a24"));
                  }.bind(null, e)
                )
                .catch(e.oe);
            },
            empty: function () {
              e.e("components/empty-view")
                .then(
                  function () {
                    return resolve(e("c064"));
                  }.bind(null, e)
                )
                .catch(e.oe);
            },
          },
          data: function () {
            return { page_data: void 0, data_list: [] };
          },
          onLoad: function (n) {
            var e = JSON.parse(n.data);
            (this.page_data = e),
              t.setNavigationBarTitle({ title: e.title }),
              this.get_page_data();
          },
          methods: {
            get_page_data: function () {
              var n = this;
              1 == this.page_data.dataType
                ? this.$api51.api51_car_group_alarm_list(
                    function (t, e) {
                      n.data_list = t;
                    },
                    function (n, e) {
                      t.showToast({ title: n + e, icon: "none" });
                    }
                  )
                : this.$api51.api51_message_list(
                    this.page_data.dataType,
                    function (t, e) {
                      n.data_list = t;
                    },
                    function (n, e) {
                      t.showToast({ title: n + e, icon: "none" });
                    }
                  );
            },
            click_set: function (n) {
              (n.device_type = this.$device_ctrl_gps),
                t.navigateTo({
                  url: "../push_switch/push_switch?data=" + JSON.stringify(n),
                });
            },
            click_car_notice: function (n) {
              t.navigateTo({
                url: "car_message_list?data=" + JSON.stringify(n),
              });
            },
            click_system_notice: function (t) {
              console.log("click_system_notice");
            },
            click_yh_notice: function (t) {
              console.log("click_yh_notice");
            },
          },
        };
        n.default = i;
      }).call(this, e("543d").default);
    },
    "9d3d": function (t, n, e) {
      e.d(n, "b", function () {
        return i;
      }),
        e.d(n, "c", function () {
          return a;
        }),
        e.d(n, "a", function () {});
      var i = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        a = [];
    },
    d2dd: function (t, n, e) {
      e.r(n);
      var i = e("9d3d"),
        a = e("5b87");
      for (var c in a)
        "default" !== c &&
          (function (t) {
            e.d(n, t, function () {
              return a[t];
            });
          })(c);
      e("1199");
      var o = e("f0c5"),
        u = Object(o.a)(
          a.default,
          i.b,
          i.c,
          !1,
          null,
          null,
          null,
          !1,
          i.a,
          void 0
        );
      n.default = u.exports;
    },
  },
  [["5e87", "common/runtime", "common/vendor"]],
]);
