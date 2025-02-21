Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../@babel/runtime/helpers/createClass"),
  i = r(require("../js/location.js")),
  a = r(require("../../utils/tools.js"));
function r(e) {
  return e && e.__esModule ? e : { default: e };
}
var l = getApp();
exports.default = (function () {
  return t(
    function t() {
      e(this, t), (this.location = new i.default()), (this.tool = a.default);
    },
    [
      {
        key: "initShops",
        value: function (e, t) {
          if (e && e.length > 0)
            for (var i in e) {
              var a = l.globalData.location;
              if (
                (a && (e[i] = this.location.initShopDistance(e[i], a)),
                e[i].created_at)
              )
                this.tool.dateDifference(e[i].created_at) < 30 &&
                  (e[i].is_new = !0);
              (e[i].delivery_fee = parseFloat(e[i].delivery_fee)),
                (e[i].starting_price = parseFloat(e[i].starting_price)),
                e[i].activity_delivery_fee &&
                  e[i].activity_delivery_fee.length > 0 &&
                  (e[i].activity_delivery_fee[0].activity_delivery_fee =
                    parseFloat(
                      e[i].activity_delivery_fee[0].activity_delivery_fee
                    )),
                0 == e[i].zan_count && 0 == e[i].zan_count
                  ? (e[i].stars = 5)
                  : (e[i].stars = (
                      (e[i].zan_count / (e[i].zan_count + e[i].cha_count)) *
                      5
                    ).toFixed(1));
            }
          return e;
        },
      },
    ]
  );
})();
