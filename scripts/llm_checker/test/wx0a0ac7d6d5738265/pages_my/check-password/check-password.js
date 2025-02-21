var t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  s = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  e = {
    data: function () {
      return {
        statusBarHeight: o.index.getStorageSync("statusBarHeight"),
        navigationBarHeight:
          o.index.getStorageSync("navigationBarHeight") || 44,
        showQuitToast: !1,
        showtoast: !1,
        password: ["", "", "", "", "", ""],
        show: !0,
        index: 0,
        characterDatas: [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0],
        pws: "",
        cardid: "",
        cardPw: "",
        state: "",
      };
    },
    onLoad: function (t) {
      console.log("op", t),
        t &&
          ((this.cardid = t.cardid),
          (this.cardPw = t.pw),
          (this.state = t.state));
    },
    onUnload: function () {
      this.showQuitToast = !0;
    },
    computed: {
      currentDatas: function () {
        return this.characterDatas;
      },
    },
    mounted: function () {},
    methods: {
      handleClickKeyBoard: function (t, s) {
        this.password.length > 6 && this.password.pop(),
          this.index < 6 &&
            ((this.password[this.index] = t),
            this.index++,
            (this.pws = this.password.join("")),
            console.log("pws", this.pws),
            6 === this.index && this.checkPassWord());
      },
      handleDelete: function () {
        this.index > 0 && (this.index--, (this.password[this.index] = ""));
      },
      checkPassWord: function () {
        var e = this;
        return s(
          t().mark(function s() {
            var a, n;
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      e.$loading(),
                      (a = {
                        cardId: parseInt(e.cardid),
                        oldPassword: e.pws,
                        newPassword: "",
                        phone: "",
                      }),
                      console.log("da", a),
                      (t.next = 5),
                      e.$api.$getPassWord(a)
                    );
                  case 5:
                    (n = t.sent),
                      o.index.hideLoading(),
                      console.log("密码检查是否已设置", n),
                      n.data.code === e.$code.SUCCESS
                        ? e.editPassWordPage()
                        : n.data.code === e.$code.FAIL
                        ? ((e.showtoast = !0),
                          e.password.fill(""),
                          (e.index = 0))
                        : (console.log(err),
                          e.$toast("网络异常,请稍后重试"),
                          e.password.fill(""),
                          (e.index = 0));
                  case 7:
                  case "end":
                    return t.stop();
                }
            }, s);
          })
        )();
      },
      changeShow: function () {
        (this.showtoast = !1), (this.showQuitToast = !1);
      },
      back: function () {
        this.showQuitToast = !0;
      },
      quitEdit: function () {
        o.index.navigateBack();
      },
      editPassWordPage: function () {
        (this.show = !1),
          o.index.redirectTo({
            url: "/pages_my/edit-password/edit-password?cardid="
              .concat(this.cardid, "&pw=")
              .concat(this.pws, "&state=")
              .concat(this.state),
          });
      },
    },
  };
Array || o.resolveComponent("u-icon")();
Math;
var a = o._export_sfc(e, [
  [
    "render",
    function (t, s, e, a, n, i) {
      return o.e(
        {
          a: n.statusBarHeight + "px",
          b: o.p({ name: "arrow-left", size: "40" }),
          c: o.o(function (t) {
            return i.back();
          }),
          d: n.navigationBarHeight + "px",
          e: o.t(String(n.password[0]) ? "·" : n.password[0]),
          f: 0 === n.index ? 1 : "",
          g: o.t(String(n.password[1]) ? "·" : n.password[1]),
          h: 1 === n.index ? 1 : "",
          i: o.t(String(n.password[2]) ? "·" : n.password[2]),
          j: 2 === n.index ? 1 : "",
          k: o.t(String(n.password[3]) ? "·" : n.password[3]),
          l: 3 === n.index ? 1 : "",
          m: o.t(String(n.password[4]) ? "·" : n.password[4]),
          n: 4 === n.index ? 1 : "",
          o: o.t(String(n.password[5]) ? "·" : n.password[5]),
          p: 5 === n.index ? 1 : "",
          q: n.show ? 1 : "",
          r: o.f(i.currentDatas, function (t, s, e) {
            return o.e(
              { a: "" !== t },
              "" !== t
                ? {
                    b: o.t(t),
                    c: o.o(function (o) {
                      return i.handleClickKeyBoard(t, s);
                    }, s),
                  }
                : {},
              { d: s }
            );
          }),
          s: "".concat(t.$imgPath, "/Delete.png"),
          t: 0 === n.index ? 1 : "",
          v: o.o(function () {
            return i.handleDelete && i.handleDelete.apply(i, arguments);
          }),
          w: n.show ? 1 : "",
          x: n.showtoast,
        },
        n.showtoast
          ? {
              y: o.o(function () {
                return i.quitEdit && i.quitEdit.apply(i, arguments);
              }),
              z: o.o(function () {
                return i.changeShow && i.changeShow.apply(i, arguments);
              }),
            }
          : {},
        { A: n.showQuitToast },
        n.showQuitToast
          ? {
              B: o.o(function () {
                return i.quitEdit && i.quitEdit.apply(i, arguments);
              }),
              C: o.o(function () {
                return i.changeShow && i.changeShow.apply(i, arguments);
              }),
            }
          : {},
        { D: n.showQuitToast || n.showtoast },
        (n.showQuitToast || n.showtoast, {})
      );
    },
  ],
]);
wx.createPage(a);
