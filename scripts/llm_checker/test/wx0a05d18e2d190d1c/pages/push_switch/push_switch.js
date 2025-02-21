(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/push_switch/push_switch", "components/empty-view"],
  {
    "04da": function (t, a, e) {},
    "0d49": function (t, a, e) {
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (a.default = void 0);
      var n = {
        data: function () {
          return { maxHeight: 1080 };
        },
        props: { msg: { type: String, default: "暂无数据" } },
        methods: {
          _clickFun: function () {
            this.$emit("click");
          },
        },
      };
      a.default = n;
    },
    "1bc7": function (t, a, e) {
      e.d(a, "b", function () {
        return n;
      }),
        e.d(a, "c", function () {
          return i;
        }),
        e.d(a, "a", function () {});
      var n = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        i = [];
    },
    "367b": function (t, a, e) {
      e.r(a);
      var n = e("0d49"),
        i = e.n(n);
      for (var c in n)
        "default" !== c &&
          (function (t) {
            e.d(a, t, function () {
              return n[t];
            });
          })(c);
      a.default = i.a;
    },
    "48ec": function (t, a, e) {
      var n = e("b4df");
      e.n(n).a;
    },
    6393: function (t, a, e) {
      (function (t) {
        Object.defineProperty(a, "__esModule", { value: !0 }),
          (a.default = void 0);
        var n;
        !(function (t) {
          t && t.__esModule;
        })(e("c064"));
        var i = {
          data: function () {
            return {
              scrollInto: "",
              tabIndex: -1,
              list_data: [],
              list_page_data: [],
              content_h: 0,
              is_check_all: !1,
            };
          },
          onLoad: function (a) {
            (n = this),
              (this.page_data = this._pData),
              t.setNavigationBarTitle({ title: "推送开关" });
            var e = t.getSystemInfoSync(),
              i = 750 / e.windowWidth;
            (this.content_h = parseInt(e.windowHeight * i) - t.upx2px(80)),
              console.log("content_h:" + this.content_h);
          },
          onReady: function () {
            this.load_page_data();
          },
          computed: {
            scrollH: function () {
              var a = t.getSystemInfoSync(),
                e = 750 / a.windowWidth,
                n = parseInt(a.windowHeight * e) - t.upx2px(80);
              return (
                console.log("height:" + a.windowHeight * e + " hh:" + n), n
              );
            },
          },
          methods: {
            load_page_data: function () {
              console.log(
                "device:" +
                  this.page_data.device_type +
                  " " +
                  this.$device_ctrl_gps
              ),
                this.page_data.device_type == this.$device_ctrl_gps &&
                  (console.log("device:...."),
                  this.$api51.api51_alarm_switch_list(
                    this.page_data.carId,
                    function (t, a) {
                      (n.list_data = t),
                        (n.list_page_data = t[0].items),
                        n.switchTab(0);
                    },
                    function (t, a) {}
                  ));
            },
            ontabtap: function (t) {
              var a =
                t.target.dataset.current || t.currentTarget.dataset.current;
              this.switchTab(a);
            },
            switchTab: function (t) {
              this.tabIndex !== t &&
                ((this.tabIndex = t),
                (this.scrollInto = this.list_data[t].cateId),
                (this.list_page_data = this.list_data[t].items),
                this.check_all_checked(),
                console.log("切换tab:" + JSON.stringify(this.list_page_data)));
            },
            ontabchange: function (t) {
              var a = t.target.current || t.detail.current;
              this.switchTab(a);
            },
            change_all: function (t) {
              (n.is_check_all = !n.is_check_all),
                this.page_data.device_type == this.$device_ctrl_gps &&
                  this.$api51.api51_alarm_all_switch(
                    this.page_data.carId,
                    this.list_data[this.tabIndex].cateId,
                    this.is_check_all,
                    function (t, a) {
                      for (var e in n.list_page_data)
                        n.list_page_data[e].isOpen = n.is_check_all;
                    },
                    function (t, a) {
                      n.is_check_all = !n.is_check_all;
                    }
                  );
            },
            check_all_checked: function () {
              for (var t = !0, a = 0; a < this.list_page_data.length; a++)
                if (!this.list_page_data[a].isOpen) {
                  t = !1;
                  break;
                }
              this.is_check_all = t;
            },
            change_item: function (a) {
              var e = this.list_page_data[a];
              (e.isOpen = !e.isOpen),
                this.page_data.device_type == this.$device_ctrl_gps &&
                  this.$api51.api51_alarm_one_switch(
                    this.page_data.carId,
                    e.alarmId,
                    e.isOpen,
                    function (t, a) {
                      n.check_all_checked();
                    },
                    function (a, n) {
                      t.showModal({ content: a + n, showCancel: !1 }),
                        (e.isOpen = !e.isOpen);
                    }
                  );
            },
          },
        };
        a.default = i;
      }).call(this, e("543d").default);
    },
    "80cf": function (t, a, e) {
      (function (t) {
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }
        e("f567"), a(e("66fd")), t(a(e("f423")).default);
      }).call(this, e("543d").createPage);
    },
    a4f5: function (t, a, e) {
      e.r(a);
      var n = e("6393"),
        i = e.n(n);
      for (var c in n)
        "default" !== c &&
          (function (t) {
            e.d(a, t, function () {
              return n[t];
            });
          })(c);
      a.default = i.a;
    },
    b4df: function (t, a, e) {},
    c064: function (t, a, e) {
      e.r(a);
      var n = e("c4c9"),
        i = e("367b");
      for (var c in i)
        "default" !== c &&
          (function (t) {
            e.d(a, t, function () {
              return i[t];
            });
          })(c);
      e("48ec");
      var o = e("f0c5"),
        s = Object(o.a)(
          i.default,
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
      a.default = s.exports;
    },
    c4c9: function (t, a, e) {
      e.d(a, "b", function () {
        return n;
      }),
        e.d(a, "c", function () {
          return i;
        }),
        e.d(a, "a", function () {});
      var n = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        i = [];
    },
    e80b: function (t, a, e) {
      var n = e("04da");
      e.n(n).a;
    },
    f423: function (t, a, e) {
      e.r(a);
      var n = e("1bc7"),
        i = e("a4f5");
      for (var c in i)
        "default" !== c &&
          (function (t) {
            e.d(a, t, function () {
              return i[t];
            });
          })(c);
      e("e80b");
      var o = e("f0c5"),
        s = Object(o.a)(
          i.default,
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
      a.default = s.exports;
    },
  },
  [["80cf", "common/runtime", "common/vendor"]],
]);
