var e = require("./index.js"),
  t = {
    $getInfoDetail: function (t) {
      return e.get("/wx/".concat(t));
    },
    $updateUserInfo: function (t) {
      return e.post("/wx/update-user-info", t);
    },
    $updateUserAvatarUrl: function (t) {
      return e.post("/wx/update-avatarUrl", t);
    },
    $CryptPhoneNumber: function (t) {
      return e.post("/wx/phoneNumer", t);
    },
    updatePhoneNumber: function (t) {
      return e.post("/wx/update-phone", t);
    },
    $upMemberLevel: function (t) {
      return e.get("/wx/up-member-Level", t);
    },
    $getUserVipInfo: function () {
      return e.get("/member/info");
    },
    getUserInfoDetail: function () {
      return e.get("/wx/select-user");
    },
    getToken: function (t) {
      return e.post("/wx/code2token", t);
    },
    $postAddFleetCard: function (t) {
      return e.post("", t, !0);
    },
    getGunMoney: function (t, n) {
      return e.post("/order/mini/oilGun/order/".concat(t, "/").concat(n));
    },
    createOrder: function (t) {
      return e.post("/order/createOrder", t, !0);
    },
    getOrderList: function (t) {
      return e.get("/order/mini/list", t);
    },
    getOrderDetail: function (t) {
      return e.get("/order/mini/details", t, !0);
    },
    getOrderCancel: function (t) {
      return e.get("/order/mini/orderCancel?orderId=".concat(t));
    },
    $getShopOrderCancel: function (t) {
      return e.get("/order/mini/orderCancel?outOrderNo=".concat(t));
    },
    getOilGunOrder: function () {
      return e.post("/order/mini/oilGun/order/selectAll");
    },
    getOilGunTpye: function () {
      return e.get("/oilGun/selectAll");
    },
    $getOrderSelect: function (t) {
      return e.get("/order/queryOrderByMini?outOrderNo=".concat(t));
    },
    addCarPhone: function (t) {
      return e.post("/wx/update-car-phone", t, !0);
    },
    getCuponsList: function (t) {
      return e.get("/coupon/selectAll", t);
    },
    selctCarIdPhone: function () {
      return e.get("/wx/select-car-phone");
    },
    $selctNewUserCoupon: function () {
      return e.get("/coupon/newUsersCouponList");
    },
    $selctActiveCoupons: function (t) {
      return e.get("/coupon/getCouponVTwo?activityNo=".concat(t));
    },
    $getActiveCoupons: function (t) {
      return e.get("/coupon/receiveCouponVTwo?activityNo=".concat(t));
    },
    getNewUserCoupon: function (t) {
      return e.post("/coupon/acquireCoupon/".concat(t));
    },
    getOrderCoupon: function (t) {
      return e.get("/coupon/selectUsable", t);
    },
    getOrderCouponMoney: function (t) {
      return e.get("/coupon/selectCouponUse", t);
    },
    getOrderGunMoney: function (t) {
      return e.get("/order/mini/notPayOrder/".concat(t));
    },
    getGiftsList: function (t) {
      return e.get("/gift/giftList?oilGunOrderId=".concat(t));
    },
    autoPlateOrder: function () {
      return e.get("/order/mini/orderMatching");
    },
    getPlateOrder: function (t) {
      return e.get("/order/mini/refreshOrder", t);
    },
    getMyCarList: function () {
      return e.get("/wx/select-car-list");
    },
    deleteCarId: function (t) {
      return e.post("/wx/delete-car", t);
    },
    EditCarId: function (t) {
      return e.post("/wx/update-car", t);
    },
    EditDefCar: function (t) {
      return e.post("/wx/update-default-car", t);
    },
    redeemCouponIntegral: function (t) {
      return e.post("/coupon/integralConvertCoupon/".concat(t));
    },
    redeemCouponList: function () {
      return e.get("/coupon/integralCouponList");
    },
    washCouponCancelId: function (t) {
      return e.post("carCoupon/useCarCoupon/".concat(t));
    },
    washCouponCancelCarId: function (t) {
      return e.post("/carCoupon/useCarCouponLicensePlate/".concat(t));
    },
    getWashCarCoupon: function (t) {
      return e.get("/carCoupon/getCouponList", t);
    },
    getCarCouponNumber: function () {
      return e.get("/wx/select-coupon-number");
    },
    $getCoulistCanvas: function () {
      return e.get("/coupon/getCouponList");
    },
    $getCoulistCanvasById: function (t) {
      return e.get("/coupon/getCoupon", t);
    },
    $postCouponCanvas: function (t) {
      return e.post("/coupon/acquireCoupon/".concat(t));
    },
    $getOldCouponList: function (t) {
      return e.get("/coupon/getCoupon?couponIssueId=".concat(t));
    },
    $getOilCardCouponInfo: function (t) {
      return e.get("/refill/card/selectCardDiscount?cardId=".concat(t));
    },
    $getOilsCardList: function () {
      return e.get("/top/selectTopByUserId");
    },
    $getReciveOilsCard: function (t) {
      return e.post("/top/receive", t);
    },
    $qrCodeCard: function (t) {
      return e.get("/top/selectTopByTopId?topId=".concat(t));
    },
    $qrCodeCardReceive: function () {
      return e.post("");
    },
    $selecttopUpType: function (t) {
      return e.get("/refill/card/topUpSelectTopIdNew?topId=".concat(t));
    },
    $selectAmnByTopidAndMoney: function (t) {
      return e.get("/refill/card/topUpSelectTopIdAndMoney", t);
    },
    getPaysMoney: function (t, n) {
      return e.get("/order/mini/oilGun/order/".concat(t, "/").concat(n));
    },
    selectUserMoney: function () {
      return e.get("/refill/card/selectBalance");
    },
    selectOilCardList: function () {
      return e.get("/refill/card/selectCardList");
    },
    selectRecordList: function (t) {
      return e.get("/refill/card/selectRecordList", t, !0);
    },
    selectTopupList: function () {
      return e.get("/refill/card/topUpSelect");
    },
    payByOilCard: function (t) {
      return e.post("/refill/card/cardPay", t, !0);
    },
    $payByRecarhge: function (t) {
      return e.post("/refill/card/cardTopUpByCardIdReplenish", t, !0);
    },
    $lunxunRechargeMoney: function (t) {
      return e.get("/refill/card/queryOrderByMini?outOrderNo=".concat(t));
    },
    $updatePassWord: function (t) {
      return e.post("/refill/card/updatePassword", t);
    },
    $addPassWord: function (t) {
      return e.post("/refill/card/updatePassword", t);
    },
    $checkPassWord: function () {
      return e.get("/wx/select-password");
    },
    $getPassWord: function (t) {
      return e.post("/refill/card/verifyPassword", t);
    },
    $postUpdateCardPhone: function (t) {
      return e.post("/refill/card/updatePhone", t, !0);
    },
    $postTopUpAmount: function (t) {
      return e.post("/refill/card/cardTopUpByCardId", t, !0);
    },
    $getSwitchCard: function (t) {
      return e.get(
        "/wx/open-automatic—deduction?automaticDeduction=".concat(t)
      );
    },
    $getCradInfoByCardId: function (t) {
      return e.post("/motorcade/oneCardCalendar", t);
    },
    $getCradByCardId: function (t) {
      return e.get("/motorcade/selectCard?cardId=".concat(t));
    },
    $getCradRecordListByCardId: function (t) {
      return e.post("/motorcade/expenseCalendar", t, !0);
    },
    $getCradsList: function (t) {
      return e.get("/motorcade/selectCards?topId=".concat(t));
    },
    $getCradsBalanceToOut: function (t) {
      return e.post("/motorcade/allocatedBalance", t);
    },
    $getCradAllcateBalance: function (t) {
      return e.get("", t);
    },
    $getFleetList: function (t) {
      return e.get("/motorcade/selectCardsList?topIds=".concat(t));
    },
    $getSmsCode: function (t) {
      return e.get("/wx/phoneCode", t);
    },
    $checkSmsCode: function (t) {
      return e.get("/wx/verifyPhoneCode", t);
    },
    $getInvoiceAdminList: function (t) {
      return e.get("", t);
    },
    $getInvoiceInfoById: function (t) {
      return e.get("", t);
    },
    $getInvoiceList: function () {
      return e.get("", param);
    },
    $postAddInvoiceHead: function (t) {
      return e.post("", t);
    },
    $getShopList: function (t) {
      return e.get("/pack/packSell", t);
    },
    $getShopedInfo: function (t) {
      return e.get("/pack/selectPackDetails?packId=".concat(t));
    },
    $postBuyShop: function (t) {
      return e.post("/pack/buyPack", t, !0);
    },
    $getAllBuyedShop: function (t) {
      return e.get("/pack/selectPackOrderByStatus", t);
    },
    $getShopInfoByOrderNo: function (t) {
      return e.get("/pack/selectPackOrderDetails?outOrderNo=".concat(t));
    },
    $getLunxunByOrderNo: function (t) {
      return e.get("/pack/polling?outOrderNo=".concat(t));
    },
    $getOilTyesPrice: function () {
      return e.get("/oilType/getOilTypeAll");
    },
  };
exports._api = t;
