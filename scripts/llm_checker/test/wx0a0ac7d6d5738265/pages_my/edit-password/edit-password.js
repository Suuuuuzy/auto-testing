var t = require("../../common/vendor.js"),
  s = {
    data: function () {
      return {
        statusBarHeight: t.index.getStorageSync("statusBarHeight"),
        navigationBarHeight:
          t.index.getStorageSync("navigationBarHeight") || 44,
        showQuitToast: !1,
        checked: !1,
        showtoast: !1,
        password: ["", "", "", "", "", ""],
        show: !1,
        index: 0,
        characterDatas: [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0],
        pws: "",
        pwstwo: "",
        oldpws: "",
        pwstate: "",
        cardid: "",
      };
    },
    onLoad: function (t) {
      console.log("op", t),
        t.state && (this.pwstate = t.state),
        t.cardid && (this.cardid = parseInt(t.cardid)),
        t.pw && (this.oldpws = t.pw);
    },
    onUnload: function () {
      this.showQuitToast = !0;
    },
    computed: {
      currentDatas: function () {
        return this.characterDatas;
      },
    },
    mounted: function () {
      var t = this;
      this.$nextTick(function () {
        t.show = !0;
      });
    },
    methods: {
      handleClickKeyBoard: function (t, s) {
        this.checked &&
          (this.index < 6 &&
            ((this.password[this.index] = t),
            this.index++,
            (this.pwstwo = this.password.join(""))),
          console.log("pwstwo", this.pwstwo),
          this.index > 5 && this.checkPassWord()),
          this.checked ||
            (this.index < 6 &&
              ((this.password[this.index] = t),
              this.index++,
              (this.pws = this.password.join("")),
              console.log("index", this.index),
              console.log("pws", this.pws)),
            this.index > 5 &&
              (this.password.fill(""),
              (this.index = 0),
              (this.checked = !0),
              console.log(this.password)));
      },
      handleDelete: function () {
        this.index > 0 && (this.index--, (this.password[this.index] = ""));
      },
      checkPassWord: function () {
        var s = this;
        if ((console.log(this.pws === this.pwstwo), this.pws !== this.pwstwo))
          return (
            t.index.showModal({
              showCancel: !1,
              title: "您两次输入的密码不相同，请重新输入",
              success: function (s) {
                s.confirm &&
                  t.index.redirectTo({
                    url: "/pages_my/edit-password/edit-password",
                  });
              },
            }),
            !1
          );
        if (this.pws === this.pwstwo) {
          if ((console.log(this.pwstate), "0" === this.pwstate)) {
            var o = { cardId: this.cardid, newPassword: this.pwstwo };
            console.log("da", o),
              this.$api
                .$addPassWord(o)
                .then(function (t) {
                  t.data.code === s.$code.SUCCESS &&
                    (s.$toast("设置成功", "success"),
                    console.log("设置成功", t),
                    setTimeout(function () {
                      s.$jump("/pages_my/recharge-vip/recharge-vip");
                    }, 1e3)),
                    t.data.code === s.$code.FAIL && (s.showtoast = !0);
                })
                .catch(function (t) {
                  s.$toast("网络异常");
                });
          }
          if ("1" === this.pwstate) {
            var i = {
              cardId: this.cardid,
              newPassword: this.pwstwo,
              oldPassword: this.oldpws,
            };
            console.log("da", i),
              this.$api
                .$updatePassWord(i)
                .then(function (t) {
                  t.data.code === s.$code.SUCCESS &&
                    (s.$toast("修改成功", "success"),
                    console.log("修改成功", t),
                    setTimeout(function () {
                      s.$jump("/pages_my/recharge-vip/recharge-vip");
                    }, 1e3)),
                    t.data.code === s.$code.FAIL && (s.showtoast = !0);
                })
                .catch(function (t) {
                  s.$toast("网络异常");
                });
          }
        }
      },
      changeShow: function () {
        (this.showtoast = !1), (this.showQuitToast = !1);
      },
      back: function () {
        this.showQuitToast = !0;
      },
      quitEdit: function () {
        t.index.navigateBack();
      },
    },
  };
Array || t.resolveComponent("u-icon")();
Math;
var o = t._export_sfc(s, [
  [
    "render",
    function (s, o, i, e, a, n) {
      return t.e(
        {
          a: a.statusBarHeight + "px",
          b: t.p({ name: "arrow-left", size: "40" }),
          c: t.o(function (t) {
            return n.back();
          }),
          d: a.navigationBarHeight + "px",
          e: t.t(
            !0 === a.checked
              ? "请再次填写以确认"
              : "请设置支付密码，用于支付验证"
          ),
          f: t.t(String(a.password[0]) ? "·" : a.password[0]),
          g: 0 === a.index ? 1 : "",
          h: t.t(String(a.password[1]) ? "·" : a.password[1]),
          i: 1 === a.index ? 1 : "",
          j: t.t(String(a.password[2]) ? "·" : a.password[2]),
          k: 2 === a.index ? 1 : "",
          l: t.t(String(a.password[3]) ? "·" : a.password[3]),
          m: 3 === a.index ? 1 : "",
          n: t.t(String(a.password[4]) ? "·" : a.password[4]),
          o: 4 === a.index ? 1 : "",
          p: t.t(String(a.password[5]) ? "·" : a.password[5]),
          q: 5 === a.index ? 1 : "",
          r: a.show ? 1 : "",
          s: t.f(n.currentDatas, function (s, o, i) {
            return t.e(
              { a: "" !== s },
              "" !== s
                ? {
                    b: t.t(s),
                    c: t.o(function (t) {
                      return n.handleClickKeyBoard(s, o);
                    }, o),
                  }
                : {},
              { d: o }
            );
          }),
          t: "".concat(s.imgPath, "/Delete.png"),
          v: 0 === a.index ? 1 : "",
          w: t.o(function () {
            return n.handleDelete && n.handleDelete.apply(n, arguments);
          }),
          x: a.show ? 1 : "",
          y: a.showtoast,
        },
        a.showtoast
          ? {
              z: t.o(function () {
                return n.quitEdit && n.quitEdit.apply(n, arguments);
              }),
              A: t.o(function () {
                return n.changeShow && n.changeShow.apply(n, arguments);
              }),
            }
          : {},
        { B: a.showQuitToast && 1 == a.pwstate },
        a.showQuitToast && 1 == a.pwstate
          ? {
              C: t.o(function () {
                return n.quitEdit && n.quitEdit.apply(n, arguments);
              }),
              D: t.o(function () {
                return n.changeShow && n.changeShow.apply(n, arguments);
              }),
            }
          : {},
        { E: a.showQuitToast && 0 == a.pwstate },
        a.showQuitToast && 0 == a.pwstate
          ? {
              F: t.o(function () {
                return n.quitEdit && n.quitEdit.apply(n, arguments);
              }),
              G: t.o(function () {
                return n.changeShow && n.changeShow.apply(n, arguments);
              }),
            }
          : {},
        { H: a.showtoast || a.showQuitToast },
        (a.showtoast || a.showQuitToast, {})
      );
    },
  ],
]);
wx.createPage(o);
