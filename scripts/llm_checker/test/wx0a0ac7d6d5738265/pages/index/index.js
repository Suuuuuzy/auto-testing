var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  n = require("../../common/assets.js"),
  a = {
    components: {
      Home: function () {
        return "../components/home.js";
      },
      Order: function () {
        return "../components/order.js";
      },
      Gift: function () {
        return "../components/gift.js";
      },
      HomeContainer: function () {
        return "../components/home-container.js";
      },
    },
    data: function () {
      return {
        tabvalue: "home",
        mapkey: "I7TBZ-IOBWC-WGC27-A5MQF-Y74MT-A7FWO",
      };
    },
    created: function () {
      t.index.hideTabBar(),
        t.index.getStorageSync("userInfo").phoneNumber && this.getCode();
    },
    onShow: function () {
      console.log("index页面hasLogin", this.$store.state.hasLogin),
        (this.tabvalue = this.$store.state.tabCurrent),
        ("home" === this.tabvalue || "shop" === this.tabvalue) &&
          this.$store.state.hasLogin &&
          this.$refs.homecom.getUserInfo();
    },
    watch: {
      tabvalue: function (e, o) {
        ("home" === e || "shop" === e) &&
          this.$store.state.hasLogin &&
          this.$refs.homecom.getUserInfo();
      },
    },
    methods: {
      loacationMap: function () {
        var e = this;
        t.index.getLocation({
          geocode: !0,
          success: function (o) {
            console.log("位置", o),
              t.index.request({
                url: "https://apis.map.qq.com/ws/geocoder/v1?location="
                  .concat(o.latitude, ",")
                  .concat(o.longitude, "&coord_type=5&key=")
                  .concat(e.mapkey),
                method: "GET",
                success: function (e) {
                  console.log("逆解析1", e.data.result),
                    t.index.showModal({ content: e.data.result.address });
                },
                fail: function (e) {},
              });
          },
          fail: function (e) {
            console.log("位置", e);
          },
        });
      },
      changeTab: function (e) {
        console.log(e),
          (this.tabvalue = e),
          this.$store.commit("changeTabCurrent", e);
      },
      getCode: function () {
        var e = this;
        t.index.login({
          provider: "weixin",
          success: function (o) {
            e.requestToken(o);
          },
        });
      },
      requestToken: function (n) {
        var a = this;
        return o(
          e().mark(function o() {
            var r, s, c;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (r = { code: n.code }), (e.next = 3), a.$api.getToken(r)
                    );
                  case 3:
                    (s = e.sent).data.code === a.$code.SUCCESS &&
                      (console.log("进入应用刷新token", s.data.data),
                      (c = s.data.data.token),
                      t.index.setStorage({ key: "token", data: c }),
                      t.index.getStorageSync("userInfo").phoneNumber &&
                        (a.$store.commit("updateHasLogin", !0),
                        a.$refs.homecom.getUserInfo()));
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, o);
          })
        )();
      },
    },
  };
Array ||
  (
    t.resolveComponent("Home-container") +
    t.resolveComponent("Gift") +
    t.resolveComponent("Home") +
    t.resolveComponent("Order") +
    t.resolveComponent("u-tabbar-item") +
    t.resolveComponent("u-tabbar")
  )();
Math ||
  (
    function () {
      return "../../uview-plus/components/u-tabbar-item/u-tabbar-item.js";
    } +
    function () {
      return "../../uview-plus/components/u-tabbar/u-tabbar.js";
    }
  )();
var r = t._export_sfc(a, [
  [
    "render",
    function (e, o, a, r, s, c) {
      return t.e(
        { a: "home" === s.tabvalue },
        (s.tabvalue, {}),
        { b: "shop" === s.tabvalue },
        (s.tabvalue, {}),
        {
          c: t.sr("homecom", "305fb2d8-0"),
          d: "home" === s.tabvalue || "shop" === s.tabvalue,
          e: "order" === s.tabvalue,
        },
        "order" === s.tabvalue
          ? { f: t.sr("orderComponent", "305fb2d8-3") }
          : {},
        {
          g: "".concat(e.$imgPath, "/homing.png"),
          h: "".concat(e.$imgPath, "/home.png"),
          i: t.p({ text: "首页", name: "home" }),
          j: n._imports_0,
          k: n._imports_1,
          l: t.p({ text: "商城", name: "shop" }),
          m: "".concat(e.$imgPath, "/ordering.png"),
          n: "".concat(e.$imgPath, "/order.png"),
          o: t.p({ text: "订单", name: "order" }),
          p: t.o(c.changeTab),
          q: t.p({
            value: s.tabvalue,
            activeColor: "#06b9c0",
            border: !1,
            placeholder: !1,
          }),
        }
      );
    },
  ],
]);
wx.createPage(r);
