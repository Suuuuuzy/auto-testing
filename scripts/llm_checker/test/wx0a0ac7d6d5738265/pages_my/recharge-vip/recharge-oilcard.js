var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../common/vendor.js"),
  t = require("../../utils/debouns.js"),
  a = {
    data: function () {
      return { form: {}, timer: null };
    },
    onLoad: function (e) {
      console.log(e), (this.form = e);
    },
    onUnload: function () {
      clearInterval(this.timer), (this.timer = null);
    },
    mounted: function () {
      this.handerRecharge = t.throttle(this.handerRecharge, 5e3);
    },
    methods: {
      handerRecharge: function () {
        Number(this.form.money), this.rechargeMoney();
      },
      rechargeMoney: function () {
        var t = this;
        return n(
          e().mark(function n() {
            var a, o, i, c, u, s, d, l, p, m;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      t.$loading("加载中..."),
                      (a = {
                        cardId: t.form.cardId,
                        topUpAmount: t.form.money,
                      }),
                      (o = null),
                      (e.next = 4),
                      t.$api.$payByRecarhge(a)
                    );
                  case 4:
                    if (
                      ((i = e.sent), (c = t), i.data.code !== c.$code.SUCCESS)
                    ) {
                      e.next = 11;
                      break;
                    }
                    if ((o = i.data.data)) {
                      e.next = 9;
                      break;
                    }
                    return e.abrupt("return");
                  case 9:
                    (u = o.payTimeStamp),
                      (s = o.paynonceStr),
                      (d = o.payPackage),
                      (l = o.paySignType),
                      (p = o.paySign),
                      (m = o.outOrderNo),
                      r.index.requestPayment({
                        provider: "wxpay",
                        timeStamp: u,
                        nonceStr: s,
                        package: d,
                        signType: l,
                        paySign: p,
                        success: function (e) {
                          "requestPayment:ok" === e.errMsg &&
                            (c.$loading("充值中"),
                            (c.timer = setInterval(function () {
                              c.autoLunxun(m);
                            }, 1e3)));
                        },
                        fail: function (e) {
                          if (
                            ("requestPayment:fail cancel" === e.errMsg &&
                              (console.log("用户取消了充值"),
                              c.$toast("充值已取消", "none", 2e3, !1)),
                            "调用支付JSAPI缺少参数：total_fee" === e.errMsg)
                          )
                            return (
                              console.log(
                                "其它请检查预支付会话标识prepay_id是否已失效 请求的appid与下单接口的appid是否一致 "
                              ),
                              !1
                            );
                          console.log("fail:支付失败" + JSON.stringify(e));
                        },
                      });
                  case 11:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
      autoLunxun: function (e) {
        var n = this;
        this.$api.$lunxunRechargeMoney(e).then(function (e) {
          console.log("充值轮询", e.data),
            e.data.code === n.$code.SUCCESS &&
              (clearInterval(n.timer),
              (n.timer = null),
              r.index.hideLoading(),
              n.$toast("充值成功", "none", 2e3, !0),
              setTimeout(function () {
                r.index.navigateBack();
              }, 1500)),
            2002 === e.data.code && console.log("等待充值中");
        });
      },
    },
  };
Array || r.resolveComponent("zym-navigation")();
Math;
var o = r._export_sfc(a, [
  [
    "render",
    function (e, n, t, a, o, i) {
      return {
        a: r.p({ title: "油卡充值", "is-home-page": !1 }),
        b: r.t(o.form.money),
        c: r.o(function () {
          return i.handerRecharge && i.handerRecharge.apply(i, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-0f74b3e8"],
]);
wx.createPage(o);
