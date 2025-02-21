var e = require("../../../common/vendor.js"),
  t = require("./props.js"),
  i = require("../../libs/mixin/mpMixin.js"),
  n = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-empty",
    mixins: [i.mpMixin, n.mixin, t.props],
    data: function () {
      return {
        icons: {
          car: "购物车为空",
          page: "页面不存在",
          search: "没有搜索结果",
          address: "没有收货地址",
          wifi: "没有WiFi",
          order: "订单为空",
          coupon: "没有优惠券",
          favor: "暂无收藏",
          permission: "无权限",
          history: "无历史记录",
          news: "无新闻列表",
          message: "消息列表为空",
          list: "列表为空",
          data: "数据为空",
          comment: "暂无评论",
        },
      };
    },
    computed: {
      emptyStyle: function () {
        var t = {};
        return (
          (t.marginTop = e.index.$u.addUnit(this.marginTop)),
          e.index.$u.deepMerge(e.index.$u.addStyle(this.customStyle), t)
        );
      },
      textStyle: function () {
        var t = {};
        return (
          (t.color = this.textColor),
          (t.fontSize = e.index.$u.addUnit(this.textSize)),
          t
        );
      },
      isSrc: function () {
        return this.icon.indexOf("/") >= 0;
      },
    },
  };
Array || e.resolveComponent("u-icon")();
Math;
var r = e._export_sfc(o, [
  [
    "render",
    function (t, i, n, o, r, s) {
      return e.e(
        { a: t.show },
        t.show
          ? e.e(
              { b: !s.isSrc },
              s.isSrc
                ? {
                    d: t.$u.addUnit(t.width),
                    e: t.$u.addUnit(t.height),
                    f: t.icon,
                  }
                : {
                    c: e.p({
                      name:
                        "message" === t.mode ? "chat" : "empty-".concat(t.mode),
                      size: t.iconSize,
                      color: t.iconColor,
                      "margin-top": "14",
                    }),
                  },
              {
                g: e.t(t.text ? t.text : r.icons[t.mode]),
                h: e.s(s.textStyle),
                i: t.$slots.default || t.$slots.$default,
              },
              (t.$slots.default || t.$slots.$default, {}),
              { j: e.s(s.emptyStyle) }
            )
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-99902092"],
]);
wx.createComponent(r);
