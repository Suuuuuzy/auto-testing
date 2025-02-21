!(function () {
  try {
    var e = Function("return this")();
    e &&
      !e.Math &&
      (Object.assign(e, {
        isFinite: isFinite,
        Array: Array,
        Date: Date,
        Error: Error,
        Function: Function,
        Math: Math,
        Object: Object,
        RegExp: RegExp,
        String: String,
        TypeError: TypeError,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval,
      }),
      "undefined" != typeof Reflect && (e.Reflect = Reflect));
  } catch (e) {}
})(),
  (function (e) {
    function o(o) {
      for (
        var n, p, i = o[0], c = o[1], d = o[2], m = 0, g = [];
        m < i.length;
        m++
      )
        (p = i[m]),
          Object.prototype.hasOwnProperty.call(s, p) && s[p] && g.push(s[p][0]),
          (s[p] = 0);
      for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
      for (r && r(o); g.length; ) g.shift()();
      return t.push.apply(t, d || []), a();
    }
    function a() {
      for (var e, o = 0; o < t.length; o++) {
        for (var a = t[o], n = !0, p = 1; p < a.length; p++) {
          var c = a[p];
          0 !== s[c] && (n = !1);
        }
        n && (t.splice(o--, 1), (e = i((i.s = a[0]))));
      }
      return e;
    }
    var n = {},
      p = { "common/runtime": 0 },
      s = { "common/runtime": 0 },
      t = [];
    function i(o) {
      if (n[o]) return n[o].exports;
      var a = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
    }
    (i.e = function (e) {
      var o = [];
      p[e]
        ? o.push(p[e])
        : 0 !== p[e] &&
          {
            "baseComponents/log/index": 1,
            "baseComponents/actionPopup/index": 1,
            "baseComponents/wxprivacy/index": 1,
            "baseComponents/loading/index": 1,
            "baseComponents/protocolPopup/index": 1,
            "baseComponents/topNavigationBar/index": 1,
            "pages/passwordRedbag/components/getPassword": 1,
            "pages/passwordRedbag/components/helpPopup": 1,
            "pages/passwordRedbag/components/passwordVoice": 1,
            "pages/passwordRedbag/components/redEnvelopes": 1,
            "pages/passwordRedbag/components/reward": 1,
            "pages/passwordRedbag/components/rewardListPopup": 1,
            "pages/passwordRedbag/components/taskbar": 1,
            "pages/passwordRedbag/components/coupon": 1,
            "pages/blindBox/components/BackgroundImg": 1,
            "pages/blindBox/components/buyBlindBox": 1,
            "pages/blindBox/components/dollMachine": 1,
            "pages/blindBox/components/earlyPop": 1,
            "pages/blindBox/components/helpPopup": 1,
            "pages/blindBox/components/integralPopup": 1,
            "pages/blindBox/components/taskbar": 1,
            "pages/blindBox/components/vouchersSwiper": 1,
            "pages/blindBox/components/EggTwistingMachine": 1,
            "pages/blindBox/components/eggHelpPopup": 1,
            "pages/blindBox/components/eggTaskbar": 1,
            "pages/blindBox/components/vouchersItem": 1,
            "pages/equityCard/components/store": 1,
            "pages/equityCard/components/ChekaEq": 1,
            "pages/equityCard/components/ClassMenu": 1,
            "pages/equityCard/components/MenuEq": 1,
            "pages/equityCard/components/PurchaseButton": 1,
            "pages/equityCard/components/eqCard": 1,
            "pages/equityCard/components/equityDetails": 1,
            "baseComponents/wxpopup/popup": 1,
            "baseComponents/authBtn2/index": 1,
            "baseComponents/tab/index": 1,
            "pages/cardhome2/card/cardMedalWall/medalDetilPoup": 1,
            "baseComponents/tabbarWrap/index": 1,
            "baseComponents/activeRemindPopup/index": 1,
            "pages/advertComponents-commonPackage/index": 1,
            "pages/cardhome2/card/getTicket/getLongTicketItem": 1,
            "pages/cardhome2/card/getTicket/getTicketItem": 1,
            "baseComponents/addShopTicket/index": 1,
            "baseComponents/ticketItem/index": 1,
            "baseComponents/addShopTicket2/index": 1,
            "baseComponents/dialog/index": 1,
            "baseComponents/longPictureTicketItem/index": 1,
            "baseComponents/ticketItem2/index": 1,
            "pages/cardhome2/card/ticket_66331/ticketItem_66331": 1,
            "pages/cardhome2/components/chooseStorePoup": 1,
            "pages/cardhome2/card/ticketDetail/ticketFooter": 1,
            "pages/cardhome/card/questionnaire/components/questionList": 1,
            "pages/cardhome/card/questionnaire/components/reward": 1,
            "pages/cardhome/components/actionPopup/index": 1,
            "pages/cardhome/card/familyCard/components/cardholder": 1,
            "pages/cardhome/card/familyCard/components/cardlist": 1,
            "pages/cardhome/card/familyCard/components/secondaryCard": 1,
            "pages/cardhome/card/components/cardSwiper/index": 1,
            "pages/cardhome/components/cardRightsMap": 1,
            "pages/cardhome/card/components/pushContent/index": 1,
            "pages/cardhome/components/updateCard": 1,
            "pages/cardhome/components/cardInfo": 1,
            "pages/cardhome/components/equityCardReminder/index": 1,
            "pages/cardhome/components/imgHotArea": 1,
            "pages/cardhome/components/memberBirthdayReminder/index": 1,
            "pages/cardhome/home/notice": 1,
            "pages/cardhome/home/topRegion": 1,
            "pages/cardhome/components/blindBox": 1,
            "pages/cardhome/components/channel": 1,
            "pages/cardhome/components/collectCard": 1,
            "pages/cardhome/components/customerService": 1,
            "pages/cardhome/components/equityCard": 1,
            "pages/cardhome/components/growthValue": 1,
            "pages/cardhome/components/guidedPopup": 1,
            "pages/cardhome/components/inviteFriends": 1,
            "pages/cardhome/components/livePlayerCom": 1,
            "pages/cardhome/components/openCard": 1,
            "pages/cardhome/components/passwordRedEnvelope": 1,
            "pages/cardhome/components/payVip": 1,
            "pages/cardhome/components/personalInfo": 1,
            "pages/cardhome/components/phoneCallPopup": 1,
            "pages/cardhome/components/questionnaireCom": 1,
            "pages/cardhome/home/business": 1,
            "pages/cardhome/home/orderStates": 1,
            "pages/cardhome/home/userInfo": 1,
            "pages/cardhome/home/index2_13935/card": 1,
            "baseComponents/showAdvert/index": 1,
            "pages/cardhome/card/cardHome/userInfo": 1,
            "pages/cardhome/card/cardHome/xingxuanToH5": 1,
            "pages/cardhome/components/topRegion": 1,
            "pages/cardhome/components/businessSettings": 1,
            "pages/cardhome/components/payCode": 1,
            "pages/cardhome/card/components/cardGrade/index": 1,
            "pages/cardhome/card/components/cardPageB/index": 1,
            "pages/cardhome/card/cardHome_66331/userInfo": 1,
            "pages/cardhome/card/components/cardPageE/index": 1,
            "pages/cardhome/card/components/cardInfoTs/index": 1,
            "pages/cardhome/card/cardLevelUp/cardLevelUpPay": 1,
            "pages/cardhome/card/components/pay4card/index": 1,
            "pages/cardhome/card/cardLevelUp/cardUpPopup": 1,
            "pages/cardhome/card/cardLevelUp/cardUpType": 1,
            "pages/cardhome/card/cardLevelUp/switchCard": 1,
            "pages/cardhome/card/components/memberUpProtocolPoup/index": 1,
            "pages/cardhome/components/chooseStorePoup": 1,
            "pages/cardhome/card/cardLevelUpType3/components/relegationPlanPup": 1,
            "pages/cardhome/card/cardLevelHistory/ticketRecord": 1,
            "baseComponents/noteLoading/index": 1,
            "pages/cardhome/card/components/qrcode/index": 1,
            "baseComponents/checkBox/index": 1,
            "baseComponents/chooseAvatar/index": 1,
            "baseComponents/input/index": 1,
            "pages/cardhome/card/components/personalInfo/topRegion": 1,
            "pages/cardhome/card/personalInfo/authorizationPhone": 1,
            "pages/cardhome/card/personalInfo/addFriendsBirthPopup": 1,
            "pages/cardhome/card/personalInfo/daijinquan": 1,
            "pages/cardhome/card/personalInfo/deleteFriendsBirth": 1,
            "pages/cardhome/card/personalBranchPage/ticketPopup": 1,
            "pages/cardhome/card/ticket/components/RemindPopup": 1,
            "pages/cardhome/card/ticket/components/SubgiftPopup": 1,
            "pages/cardhome/card/buyTicketHistory/ticketPopup/invoiceConfirmPopup/index": 1,
            "pages/cardhome/card/buyTicketHistory/transferRecord": 1,
            "pages/cardhome/card/buyTicketHistory/ticketPopup/refundPopup/index": 1,
            "pages/cardhome/card/buyTicketHistory/ticketRecord": 1,
            "pages/cardhome/card/buyCard/errpoup": 1,
            "pages/cardhome/card/buyCard/payPopup": 1,
            "pages/cardhome/card/balance/overdueBalancePup": 1,
            "pages/cardhome/card/collectCards/pageA/index": 1,
            "pages/cardhome/card/collectCards/pageB/index": 1,
            "pages/cardhome/card/payCode/zoomUp": 1,
            "pages/cardhome/card/components/tkiBarcode/index": 1,
            "pages/cardhome/card/cardRecharge/components/customRechargeInput": 1,
            "pages/cardhome/card/cardRecharge/components/rechargeList": 1,
            "pages/cardhome/card/cardRecharge/components/rechargePup": 1,
            "pages/cardhome/card/inviteFriends/couponMIni": 1,
            "baseComponents/exitBtn/index": 1,
            "pages/cardhome/card/inviteFriends/coupon": 1,
            "pages/address/components/inputSelect/index": 1,
            "pages/address/components/highLight/index": 1,
            "pages/address/selectShippingAddress/AddressItem": 1,
            "baseComponents/vTabs/index": 1,
            "pages/order/otherOrder/otherOrder": 1,
            "pages/order/diancanOrder/index1": 1,
            "pages/order/shangchengOrder/index1": 1,
            "pages/order/waimaiOrder/index1": 1,
            "pages/order/components/customerService/index": 1,
            "pages/order/components/qrcode/index": 1,
            "pages/order/components/communityCode/index": 1,
            "pages/order/components/diancanOrder/itemsModel": 1,
            "pages/order/components/diancanOrder/payInfo": 1,
            "pages/order/components/mnItemsModel-placeholder/index": 1,
            "pages/order/components/orderSteps/index": 1,
            "pages/order/waimaiOrder/waimaiDetail/ordDetailWS": 1,
            "pages/order/waimaiOrder/waimaiDetail/ordDetailZT": 1,
            "pages/order/components/orderMap/index": 1,
            "pages/order/components/sharePopup/index": 1,
            "pages/order/components/waimaiOrder/oneMore/index": 1,
            "pages/order/waimaiOrder/waimaiDetail/orderBack": 1,
            "pages/order/components/codeLst/index": 1,
            "pages/order/components/pickUp/index": 1,
            "pages/order/shangchengOrder/shangchengDetail/wxPopupPhone": 1,
            "baseComponents/addDeBtn/index": 1,
            "pages/order/components/payAfterPop/index": 1,
            "pages/order/otherOrder/components/equityCardOrderItem": 1,
            "baseComponents/orderNotice/index": 1,
            "pages/jfsc/components/MarketingActivityEntrance/index": 1,
            "pages/jfsc/components/jfCanUse/index": 1,
            "pages/jfsc/components/jfItemLayout/flashProductItem": 1,
            "pages/jfsc/components/jfItemLayout/productListLayout": 1,
            "pages/jfsc/components/jfPopup/index": 1,
            "pages/jfsc/components/jfTab/index": 1,
            "pages/jfsc/jfscHome/pageD/pageHead/index": 1,
            "pages/jfsc/jfscHome/pageD/ruleDesPop/index": 1,
            "pages/jfsc/jfscHome/pageD/goodsItem/index": 1,
            "pages/jfsc/jfscHome/pageD/ygDialog/index": 1,
            "pages/jfsc/jfscHome/pageE/components/jfCanUseTs": 1,
            "pages/jfsc/jfscHome/pageE/components/jfTabTs": 1,
            "pages/jfsc/jfscHome/pageE/components/jfItemLayoutTs/productListLayout": 1,
            "baseComponents/imageVideoSwiper/index": 1,
            "pages/jfsc/components/jfAddressChoose/index": 1,
            "pages/jfsc/components/jfMcChoose/index": 1,
            "pages/jfsc/components/jfTimeChoose/index": 1,
            "pages/jfsc/components/switchBtn/index": 1,
            "baseComponents/bindtipPoup/index": 1,
            "baseComponents/shopRestDialog/index": 1,
            "baseComponents/serviceAgreementPopup/index": 1,
            "pages/diancan2/components/comeInDIshPagePopup-placeholder/index": 1,
            "pages/diancan2/components/headSwiper/index": 1,
            "pages/diancan2/components/mealOptionPopup-placeholder/index": 1,
            "pages/diancan2/navigation/components/OrderList": 1,
            "pages/diancan2/people/components/PeopleTablewarePopup": 1,
            "pages/diancan2/components/countdownPopup/index": 1,
            "pages/diancan2/diningCodePage/foodInfo": 1,
            "pages/diancan2/components/tableGroupPopup-placeholder/index": 1,
            "pages/diancan-fastfood/dishes/pageB/dish": 1,
            "pages/diancan-fastfood/components/limitNumPoup-placeholder/index": 1,
            "pages/diancan-fastfood/components/couponDishPopup/index": 1,
            "pages/diancan-fastfood/components/dcCartBtn/index": 1,
            "pages/diancan-fastfood/components/barrage-placeholder/index": 1,
            "pages/diancan-fastfood/components/brokenloading/index": 1,
            "pages/diancan-fastfood/components/cdpRecommendDishes/index": 1,
            "pages/diancan-fastfood/components/comeInDIshPagePopup-placeholder/index": 1,
            "pages/diancan-fastfood/components/evaluateRedbag-placeholder/index": 1,
            "pages/diancan-fastfood/components/importCustomerCouponsPoup-placeholder/index": 1,
            "pages/diancan-fastfood/components/lockScreenSubmitTip-placeholder/index": 1,
            "pages/diancan-fastfood/components/mealOptionPopup-placeholder/index": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponByCart/index": 1,
            "pages/diancan-fastfood/components/orderPayDishItem/index": 1,
            "pages/diancan-fastfood/components/orderprogressFoodDishItem/index": 1,
            "pages/diancan-fastfood/components/removeDishPopup/index": 1,
            "pages/diancan-fastfood/components/tjDish/index": 1,
            "baseComponents/blindBoxPopup/index": 1,
            "baseComponents/redPacketsPopup/index": 1,
            "pages/diancan-fastfood/components/equityCard/index": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/index": 1,
            "pages/consumeGift-commonPackage/index": 1,
            "pages/diancan-fastfood/components/increasePriceShop/cumulativePricePageB": 1,
            "pages/diancan-fastfood/components/increasePriceShop/dishListOfCartPageB": 1,
            "pages/diancan-fastfood/components/popupRepeatRegressionDish/index": 1,
            "pages/diancan-fastfood/components/reachAndGiven/cartListPageB": 1,
            "pages/diancan-fastfood/components/cartBottomBtn/index": 1,
            "pages/diancan-fastfood/components/cartCouponDishPopup-placeholder/index": 1,
            "pages/diancan-fastfood/components/cartDish/index": 1,
            "pages/diancan-fastfood/components/cartLeavingMessage-placeholder/index": 1,
            "pages/diancan-fastfood/components/cartUpdateCard-placeholder/index": 1,
            "pages/diancan-fastfood/components/confirmPopup-placeholder/index": 1,
            "pages/diancan-fastfood/components/duplicateDishesPopups/index": 1,
            "pages/diancan-fastfood/components/fullOfTablePopup-placeholder/index": 1,
            "pages/diancan-fastfood/components/groupRecommend/index": 1,
            "pages/diancan-fastfood/components/reachAndGiven/mnMode/CollocationMnCartItem": 1,
            "pages/diancan-fastfood/components/takeout/index": 1,
            "pages/diancan-fastfood/components/tjDish/popupTJ": 1,
            "pages/diancan-fastfood/components/verifyStudentIdentity-placeholder/index": 1,
            "pages/diancan-fastfood/components/xiaBuPopup-placeholder/index": 1,
            "pages/diancan-fastfood/components/equityCardMnDish-placeholder/index": 1,
            "baseComponents/searchComponent/index": 1,
            "pages/diancan-fastfood/components/assortedDishes/index": 1,
            "pages/diancan-fastfood/components/increasePriceShop/cumulativeItems": 1,
            "pages/diancan-fastfood/components/reachAndGiven/singleModeBox": 1,
            "pages/dishPopups-comobo-commonPackage/pizzaCombo/index": 1,
            "pages/diancan/components/lockScreenSubmitTip-placeholder/index": 1,
            "pages/diancan/dishes/pageA/dish": 1,
            "pages/diancan/components/couponDishPopup/index": 1,
            "pages/diancan/components/limitNumPoup-placeholder/index": 1,
            "pages/ai-waiter-commonPackage/index": 1,
            "pages/diancan/components/dcCartBtn/index": 1,
            "pages/diancan/components/myCoupon-placeholder/myCouponByCart2/index": 1,
            "pages/diancan/components/barrage-placeholder/index": 1,
            "pages/diancan/components/brokenloading/index": 1,
            "pages/diancan/components/comeInDIshPagePopup-placeholder/index": 1,
            "pages/diancan/components/evaluateRedbag-placeholder/index": 1,
            "pages/diancan/components/importCustomerCouponsPoup-placeholder/index": 1,
            "pages/diancan/components/orderPayDishItem/index": 1,
            "pages/diancan/components/orderprogressFoodDishItem/index": 1,
            "pages/diancan/components/removeDishPopup/index": 1,
            "pages/diancan/components/tjDish/index": 1,
            "pages/diancan/components/verifyStudentIdentity-placeholder/index": 1,
            "pages/diancan/components/xiaBuPopup-placeholder/index": 1,
            "baseComponents/waidaiWrap/index": 1,
            "baseComponents/wxIndexBar/anchor": 1,
            "baseComponents/wxIndexBar/index": 1,
            "baseComponents/dishesComponents/dishBanner/diancan": 1,
            "pages/diancan/components/equityCard-placeholder/index": 1,
            "pages/diancan/components/oneMoreOrder/index": 1,
            "pages/diancan/components/increasePriceShop/cumulativeItems": 1,
            "pages/diancan/components/membershipProgress-placeholder/index": 1,
            "pages/diancan/dishes/pageB/sideDishsList": 1,
            "pages/diancan/components/assortedDishes/index": 1,
            "pages/diancan/components/buffetCountdown/index": 1,
            "pages/diancan/components/reachAndGiven/singleModeBox": 1,
            "pages/diancan/dishes/component/redPacketsPassword": 1,
            "pages/diancan/dishes/component/reminderInfo/index": 1,
            "pages/diancan/dishes/pageB/categoryTitle": 1,
            "pages/orderImagePosition-commonPackage/BeefMenuGuidancePrompt": 1,
            "baseComponents/dishesComponents/dishBanner/index": 1,
            "pages/diancan/dishes/pageC/dishSearch": 1,
            "pages/diancan/dishes/pageC/sideDishsList": 1,
            "baseComponents/uploadPhone/index": 1,
            "pages/diancan/components/cartLeavingMessage-placeholder/index": 1,
            "pages/diancan/components/duplicateDishesPopups/index": 1,
            "pages/diancan/components/hotpotGroupWrap/index": 1,
            "baseComponents/dcComponents/barrage/index": 1,
            "baseComponents/dcComponents/lockScreenSubmitTip/index": 1,
            "pages/diancan/components/cartBottomBtn/index": 1,
            "pages/diancan/components/increasePriceShop/cumulativePrice": 1,
            "pages/diancan/components/increasePriceShop/dishListOfCart": 1,
            "pages/diancan/components/popupRepeatRegressionDish/index": 1,
            "pages/diancan/components/reachAndGiven/cartList": 1,
            "pages/diancan/components/cartCouponDishPopup-placeholder/index": 1,
            "pages/diancan/components/cartDish/index": 1,
            "pages/diancan/components/cartUpdateCard-placeholder/index": 1,
            "pages/diancan/components/changePrimaryCardNo/index": 1,
            "pages/diancan/components/confirmPopup-placeholder/index": 1,
            "pages/diancan/components/fullOfTablePopup-placeholder/index": 1,
            "pages/diancan/components/groupRecommend/index": 1,
            "pages/diancan/components/startDishesWay/index": 1,
            "pages/diancan/components/takeout-placeholder/index": 1,
            "pages/diancan/components/tjDish/popupTJ": 1,
            "pages/dishPopups-comobo-commonPackage/stepCombo/index": 1,
            "pages/waimaiziti2/components/payAfterPop-placeholder/index": 1,
            "pages/waimaiziti2/components/storeItem-placeholder/index": 1,
            "pages/waimaiziti2/components/equityCard-placeholder/index": 1,
            "pages/waimaiziti2/components/equityCardMnDish/index": 1,
            "pages/waimaiziti2/components/unpayPage/index": 1,
            "baseComponents/addDeBtn/wm": 1,
            "pages/grziti/components/tagActivityBase/index": 1,
            "pages/grziti/components/brokenloading-placeholder/index": 1,
            "pages/grziti/components/gbOrderBase-placeholder/index": 1,
            "pages/grziti/components/lockScreenSubmitTip-placeholder/index": 1,
            "pages/grziti/components/multiAvatar-placeholder/index": 1,
            "pages/grziti/components/payAfterPop-placeholder/index": 1,
            "baseComponents/dishesComponents/dishBanner/index2": 1,
            "pages/grziti/components/storeAppraise-placeholder/index": 1,
            "pages/wmzt-storeMes-commonPackage/index": 1,
            "pages/grziti/components/necessityBtn-placeholder/index": 1,
            "pages/grziti/components/tjDish-placeholder/index": 1,
            "pages/grziti/dish/pageA/dish": 1,
            "pages/grziti/components/bizTypeTab-placeholder/index": 1,
            "pages/grziti/components/busyDegree-placeholder/index": 1,
            "pages/grziti/components/dishBannerInfo-placeholder/index": 1,
            "pages/grziti/components/dishTabs-placeholder/index": 1,
            "pages/grziti/components/inBusinessHours-placeholder/index": 1,
            "pages/grziti/components/increasePrice-placeholder/popupModel": 1,
            "pages/grziti/components/popForNearestShop/index": 1,
            "pages/grziti/components/storeTopInfo-placeholder/index": 1,
            "pages/grziti/components/toGroupBuy-placeholder/index": 1,
            "pages/grziti/components/wmCartBtn-placeholder/index": 1,
            "pages/wmzt-advSelectTimePopup-commonPackage/index": 1,
            "pages/grziti/dish/pageB/dish": 1,
            "pages/grziti/dish/pageC/dish": 1,
            "pages/grziti/dish/pageD/dish": 1,
            "pages/grziti/dish/pageE/dish": 1,
            "pages/grziti/components/dishTabs-placeholder/pageE": 1,
            "baseComponents/stampCollectingPopup/index": 1,
            "pages/grziti/components/equityCard-placeholder/index": 1,
            "pages/grziti/components/orderProductList-placeholder/index": 1,
            "pages/grziti/components/timeChoose-placeholder/index": 1,
            "pages/grziti/components/authorInOrder/index": 1,
            "pages/grziti/components/bottomInfoWrapper-placeholder/index": 1,
            "pages/grziti/components/dishesPerPerson-placeholder/index": 1,
            "pages/grziti/components/fullGifts-placeholder/mnMode/CollocationMnCartItem": 1,
            "pages/grziti/components/getUserPhone-placeholder/index": 1,
            "pages/grziti/components/groupRecommend-placeholder/index": 1,
            "pages/grziti/components/increasePrice-placeholder/cartModel": 1,
            "pages/grziti/components/orderMark-placeholder/index": 1,
            "pages/grziti/components/pay-placeholder/index": 1,
            "pages/grziti/tyzfPlacehoder/components/rechargeAgreement/index": 1,
            "pages/grziti/tyzfPlacehoder/components/ticUnusedPopup": 1,
            "pages/grziti/components/cartBtn-placeholder/index": 1,
            "pages/waimaiziti/components/brokenloading-placeholder/index": 1,
            "pages/waimaiziti/components/gbOrderBase-placeholder/index": 1,
            "pages/waimaiziti/components/lockScreenSubmitTip-placeholder/index": 1,
            "pages/waimaiziti/components/multiAvatar-placeholder/index": 1,
            "pages/waimaiziti/components/payAfterPop-placeholder/index": 1,
            "pages/waimaiziti/components/storeAppraise-placeholder/index": 1,
            "pages/waimaiziti/components/necessityBtn-placeholder/index": 1,
            "pages/waimaiziti/components/tjDish-placeholder/index": 1,
            "pages/waimaiziti/grwaimai/dish/pageA/dish": 1,
            "pages/waimaiziti/components/bizTypeTab-placeholder/index": 1,
            "pages/waimaiziti/components/busyDegree-placeholder/index": 1,
            "pages/waimaiziti/components/dishBannerInfo-placeholder/index": 1,
            "pages/waimaiziti/components/dishTabs-placeholder/index": 1,
            "pages/waimaiziti/components/distributionModePopup/index": 1,
            "pages/waimaiziti/components/inBusinessHours-placeholder/index": 1,
            "pages/waimaiziti/components/increasePrice-placeholder/popupModel": 1,
            "pages/waimaiziti/components/storeTopInfo-placeholder/index": 1,
            "pages/waimaiziti/components/toGroupBuy-placeholder/index": 1,
            "pages/waimaiziti/components/wmCartBtn-placeholder/index": 1,
            "pages/waimaiziti/grwaimai/dish/pageB/dish": 1,
            "pages/waimaiziti/grwaimai/dish/pageC/dish": 1,
            "pages/waimaiziti/grwaimai/dish/pageD/dish": 1,
            "pages/waimaiziti/grwaimai/dish/pageE/dish": 1,
            "pages/waimaiziti/components/dishTabs-placeholder/pageE": 1,
            "pages/waimaiziti/components/carNoPopup/index": 1,
            "pages/waimaiziti/components/equityCard-placeholder/index": 1,
            "pages/waimaiziti/components/orderProductList-placeholder/index": 1,
            "pages/waimaiziti/components/timeChoose-placeholder/index": 1,
            "pages/waimaiziti/components/bottomInfoWrapper-placeholder/index": 1,
            "pages/waimaiziti/components/dishesPerPerson-placeholder/index": 1,
            "pages/waimaiziti/components/fullGifts-placeholder/mnMode/CollocationMnCartItem": 1,
            "pages/waimaiziti/components/groupRecommend-placeholder/index": 1,
            "pages/waimaiziti/components/increasePrice-placeholder/cartModel": 1,
            "pages/waimaiziti/components/orderMark-placeholder/index": 1,
            "pages/waimaiziti/components/pay-placeholder/index": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/rechargeAgreement/index": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/ticUnusedPopup": 1,
            "pages/waimaiziti/components/simpleDishList/index": 1,
            "pages/waimaiziti/components/cartBtn-placeholder/index": 1,
            "pages/pj/pjHome/components/pjPopups/singleReward/custom": 1,
            "pages/pj/pjHome/components/pjPopups/singleReward/default": 1,
            "pages/pj/pjHome/components/pjPopups/threeChooseOneReward/custom": 1,
            "pages/pj/pjHome/components/pjPopups/threeChooseOneReward/default": 1,
            "pages/pj/pjHome/components/evaluateRedbag-placeholder/index": 1,
            "pages/pj/pjHome/components/pjChoiceQuestion/index": 1,
            "pages/pj/pjHome/components/pjDialog/index": 1,
            "pages/pj/pjHome/components/pjDishScore/index": 1,
            "pages/pj/pjHome/components/pjFavouriteDish/index": 1,
            "pages/pj/pjHome/components/pjLeadWords/index": 1,
            "pages/pj/pjHome/components/pjNPS/index": 1,
            "pages/pj/pjHome/components/pjPopups/luckyReward/index": 1,
            "pages/pj/pjHome/components/pjPopups/receiveReward/index": 1,
            "pages/pj/pjHome/components/pjStars/index": 1,
            "pages/pj/pjHome/components/pjUploadImg/index": 1,
            "pages/pj/pjHome/components/textarea/index": 1,
            "pages/pj/pjHome/templateB": 1,
            "baseComponents/rateStar/index": 1,
            "pages/pd/components/mcInfo/index": 1,
            "pages/pd/components/tableGroupPopup-placeholder/index": 1,
            "pages/pd/components/mcQueueState/index": 1,
            "pages/pd/components/peopleNumPoup/index": 1,
            "pages/pd/components/tableInfo/index": 1,
            "pages/pd/components/peopleNumPoup_66331/index": 1,
            "pages/pd/components/becomeVip/index": 1,
            "pages/pd/components/confirmPoup/index": 1,
            "pages/pd/components/waitInfo/index": 1,
            "pages/pd/components/confirmPoup_66331/index": 1,
            "pages/pay/tyzfPlacehoder/components/rechargeAgreement/index": 1,
            "pages/pay/xf/becomeVip": 1,
            "pages/pay/xf/inputMoney": 1,
            "pages/pay/xf/payBase_xf": 1,
            "pages/pay/components/onlinePay/index": 1,
            "pages/pay/components/xinyi/index": 1,
            "pages/pay/components/tablePay/index": 1,
            "pages/pay/components/tablePay/payTips": 1,
            "pages/giftcard/components/giftCardTheme/index": 1,
            "pages/giftcard/components/tabbar/index": 1,
            "pages/giftcard/components/topRegion/index": 1,
            "pages/giftcard/components/commonPopup/bindCardPopup": 1,
            "pages/giftcard/components/commonPopup/commonModal": 1,
            "pages/giftcard/components/giftList/index": 1,
            "pages/giftcard/components/themeGreet/index": 1,
            "pages/giftcard/chooseStorePopup": 1,
            "baseComponents/identificationMc/index": 1,
            "pages/system/components/mall-dragPic/mall-dragPic": 1,
            "pages/system/storeList/commponent/storeList": 1,
            "pages/passwordRedbag/components/redEnvelopeReward": 1,
            "pages/passwordRedbag/components/doATask": 1,
            "pages/passwordRedbag/components/share": 1,
            "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-uni": 1,
            "pages/blindBox/components/Barrage": 1,
            "pages/blindBox/components/recordComponent": 1,
            "pages/blindBox/components/blindDetail": 1,
            "baseComponents/wxpopup/overlay": 1,
            "pages/tabbar-commonPackage/tabbarWrap": 1,
            "pages/advertComponents-commonPackage/bounceBall": 1,
            "pages/advertComponents-commonPackage/fouraRow": 1,
            "pages/advertComponents-commonPackage/longSwipe/index": 1,
            "pages/advertComponents-commonPackage/swipe": 1,
            "pages/advertComponents-commonPackage/upOneDownTwo": 1,
            "pages/advertComponents-commonPackage/upTwoDownTwo": 1,
            "baseComponents/officalAccount/mini": 1,
            "baseComponents/officalAccount/mini2": 1,
            "pages/cardhome/components/mcExpirationReminder/components/PopupWindow": 1,
            "pages/cardhome/components/memberBirthdayReminder/components/BirthdayCakeAnimation": 1,
            "pages/cardhome/components/memberBirthdayReminder/components/customGiftPup": 1,
            "pages/cardhome/components/memberBirthdayReminder/components/customRemind": 1,
            "pages/cardhome/components/memberBirthdayReminder/components/redEnvelopes": 1,
            "pages/cardhome/components/relegationPlan": 1,
            "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-body": 1,
            "pages/keyBoard-commonPackage/index": 1,
            "pages/cardhome/card/buyTicketHistory/ticketPopup/components/popupFrame": 1,
            "pages/cardhome/card/buyTicketHistory/ticketPopup/components/ticketItem": 1,
            "pages/order/otherOrder/components/refundPopup": 1,
            "pages/order/components/diancanOrder/jiezhangOrder": 1,
            "pages/order/components/diancanOrder/waidaiOrder": 1,
            "pages/order/components/diancanOrder/yudianOrder": 1,
            "pages/order/components/shangchengOrder/item/noPayItem": 1,
            "pages/order/components/shangchengOrder/item/alSendItem": 1,
            "pages/order/components/shangchengOrder/item/closedItem": 1,
            "pages/order/components/shangchengOrder/item/noSendItem": 1,
            "pages/order/components/shangchengOrder/item/refundItem": 1,
            "pages/order/components/shangchengOrder/item/successItem": 1,
            "pages/order/components/waimaiOrder/orderItem": 1,
            "pages/order/components/servicesNotice/index": 1,
            "pages/order/components/busyDegree/index": 1,
            "pages/order/waimaiOrder/waimaiDetail/dishList": 1,
            "pages/order/waimaiOrder/waimaiDetail/groupBuy": 1,
            "pages/order/waimaiOrder/waimaiDetail/orderSteps": 1,
            "baseComponents/addDeBtn/inputNum": 1,
            "baseComponents/orderNotice/mcMsgPopup": 1,
            "baseComponents/orderNotice/orderNoticePopup": 1,
            "pages/jfsc/components/jfItemLayout/productItem": 1,
            "pages/jfsc/jfscHome/pageE/components/jfItemLayoutTs/productItem": 1,
            "pages/diancan2/components/swiperDot/index": 1,
            "pages/diancan2/components/tablePayOrderItems-placeholder/index": 1,
            "pages/diancan2/components/tablePayOrderItems-placeholder/payOrder": 1,
            "pages/diancan2/components/mnItemsModel-placeholder/index": 1,
            "pages/collectCardBox-commonPackage/index": 1,
            "pages/giveCollectCardBox-commonPackage/index": 1,
            "pages/redbag-commonPackage/index": 1,
            "pages/treasureBox-commonPackage/index": 1,
            "baseComponents/wxIndexBar/anchor2": 1,
            "pages/diancan-fastfood/dishes/component/equityCardDishItem/index": 1,
            "pages/diancan-fastfood/components/membershipProgress-placeholder/index": 1,
            "pages/diancan-fastfood/components/oneMoreOrder/index": 1,
            "pages/diancan-fastfood/dishes/component/redPacketsPassword": 1,
            "pages/diancan-fastfood/dishes/pageB/categoryTitle": 1,
            "pages/diancan-fastfood/dishes/pageB/sideDishsList": 1,
            "baseComponents/cartAnimation/index": 1,
            "baseComponents/cartBtn/index": 1,
            "pages/diancan-fastfood/components/cartPopup/index": 1,
            "pages/diancan-fastfood/components/dcCartBtn/confirmOrderPopup": 1,
            "baseComponents/wxpopup/popupType2": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/meituan": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/tiktok": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/discountMutuallyExclusivePopup": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/selectDishpopup": 1,
            "pages/diancan-fastfood/components/removeDishPopup/delDishItem": 1,
            "pages/questionnairePopup-commonPackage/index": 1,
            "baseComponents/tyzf/components/changeCard": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/ticket": 1,
            "pages/diancan-fastfood/tyzfFastFood/components/giftChange": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/ruleRecharge": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/tiktok": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/alipay": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/meituanTicket": 1,
            "pages/diancan-fastfood/components/payAfterPop-placeholder/index": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/erase": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/integral": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/memberCard": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/payhuis": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/ticUnusedPopup": 1,
            "pages/diancan-fastfood/components/increasePriceShop/dishItem": 1,
            "pages/diancan-fastfood/components/reachAndGiven/mnMode/index": 1,
            "pages/diancan-fastfood/components/reachAndGiven/singleModeOfcartPageB": 1,
            "pages/diancan-fastfood/components/reachAndGiven/combinationModeOfCart": 1,
            "pages/diancan-fastfood/components/reachAndGiven/mnMode/MnCartItem": 1,
            "pages/diancan-fastfood/components/bottomInfoWrapper-placeholder/index": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index": 1,
            "pages/diancan-fastfood/components/confirmPopup-placeholder/dishesDetails": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/exChangeDc": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/fullGift": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout1": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout11": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout13": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout14": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout15": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout16": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout17": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout2": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout22": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout3": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout4": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout5": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout6": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout7": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout8": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout9": 1,
            "pages/diancan-fastfood/dishes/component/dishItem": 1,
            "pages/diancan-fastfood/components/reachAndGiven/singleMode": 1,
            "baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index": 1,
            "baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index": 1,
            "pages/dishPopups-comobo-commonPackage/component/BottomBtn": 1,
            "pages/dishPopups-comobo-commonPackage/component/ComboGroup": 1,
            "pages/dishPopups-comobo-commonPackage/component/SelectedDish": 1,
            "pages/dishPopups-comobo-commonPackage/component/Steps": 1,
            "pages/dishPopups-comobo-commonPackage/pizzaCombo/component/PizzaSwiper": 1,
            "pages/diancan/dishes/pageA/sideDishsList": 1,
            "pages/dishPopups-tc-pop-imgTextModel-commonPackage/index": 1,
            "pages/hotpot-commonPackage/hotpotPopupStyle/index": 1,
            "pages/ai-waiter-commonPackage/components/ChatArea": 1,
            "pages/ai-waiter-commonPackage/components/ChatBottom": 1,
            "pages/ai-waiter-commonPackage/components/MovableEnter": 1,
            "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/meituan": 1,
            "pages/diancan/components/myCoupon-placeholder/couponForDetails": 1,
            "pages/diancan/components/myCoupon-placeholder/discountMutuallyExclusivePopup": 1,
            "pages/diancan/components/myCoupon-placeholder/myCouponByCart2/components/CrmCoupon": 1,
            "pages/diancan/components/myCoupon-placeholder/selectDishpopup": 1,
            "baseComponents/dishesComponents/dishBanner/components/storeLayout1": 1,
            "baseComponents/dishesComponents/dishBanner/components/storeLayout2": 1,
            "baseComponents/dishesComponents/dishBanner/components/storeLayout3": 1,
            "baseComponents/dishesComponents/dishBanner/components/storeLayout4": 1,
            "baseComponents/dishesComponents/dishBanner/components/storeLayout6": 1,
            "baseComponents/dishesComponents/dishBanner/components/storeLayout7": 1,
            "pages/diancan/components/dishItemComponents-placeholder/exChangeDc": 1,
            "pages/diancan/components/dishItemComponents-placeholder/exChangeDc2": 1,
            "pages/diancan/components/dishItemComponents-placeholder/fullGift": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout1": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout11": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout13": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout14": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout15": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout16": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout17": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout2": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout20": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout21": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout22": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout3": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout4": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout5": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout6": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout7": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout8": 1,
            "pages/diancan/components/dishItemComponents-placeholder/layout9": 1,
            "pages/diancan/components/myCoupon-placeholder/myCouponInDish": 1,
            "pages/aiDishPeople-commonPackage/index": 1,
            "pages/aiDish-commonPackage/index": 1,
            "pages/diancan/dishes/component/dishItem": 1,
            "pages/hotpot-commonPackage/hotpotBasePop/index": 1,
            "pages/diancan/components/hotpotWrapPlaceholder/index": 1,
            "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/tiktok": 1,
            "pages/diancan/components/reachAndGiven/mnMode/index": 1,
            "pages/diancan/components/reachAndGiven/singleMode": 1,
            "pages/diancan/dishes/component/redPacketsPasswordPoup": 1,
            "pages/orderImagePosition-commonPackage/IndexContent": 1,
            "pages/hotpot-commonPackage/hotpotGroup/index": 1,
            "pages/hotpot-commonPackage/hotpotItem/index": 1,
            "pages/diancan/components/increasePriceShop/dishItem": 1,
            "pages/diancan/components/reachAndGiven/singleModeOfcart": 1,
            "pages/diancan/components/reachAndGiven/combinationModeOfCart": 1,
            "pages/diancan/components/reachAndGiven/mnMode/CollocationMnCartItem": 1,
            "pages/diancan/components/reachAndGiven/mnMode/MnCartItem": 1,
            "pages/diancan/components/confirmPopup-placeholder/dishesDetails": 1,
            "pages/dishPopups-comobo-commonPackage/stepCombo/component/BottomBtn": 1,
            "pages/waimaiziti2/components/pay-placeholder/index": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/ticUnusedPopup": 1,
            "pages/grziti/components/gbOrderBase-placeholder/errorTips/index": 1,
            "pages/grziti/components/orderState-placeholder/index": 1,
            "pages/wmzt-qualification-commonPackage/index": 1,
            "baseComponents/myCoupon/index": 1,
            "pages/grziti/components/sideDishsList-placeholder/pageA/index": 1,
            "pages/grziti/components/couponDishPopup-placeholder/index": 1,
            "pages/grziti/components/fullGifts-placeholder/fullGiftList": 1,
            "pages/grziti/components/healthOrderTip-placeholder/index": 1,
            "pages/grziti/components/increasePrice-placeholder/increaseDishList": 1,
            "pages/grziti/components/increasePrice-placeholder/index": 1,
            "pages/grziti/components/storeItem-placeholder/index": 1,
            "pages/wmzt-reducePrice-commonPackage/index": 1,
            "pages/wmzt-reducePrice-commonPackage/bottomTextOfCart": 1,
            "pages/wmzt-removeDishPopup-commonPackage/index": 1,
            "pages/grziti/components/shoppingCartPopup-placeholder/index": 1,
            "pages/wmzt-advSelectTimePopup-commonPackage/timeChoose-placeholder/index": 1,
            "pages/grziti/components/equityCardDishItem-placeholder/index": 1,
            "pages/grziti/components/sideDishsList-placeholder/pageB/index": 1,
            "pages/grziti/components/activityEntry-placeholder/index": 1,
            "pages/grziti/dish/pageB/categoryTitle": 1,
            "pages/wmzt-redPacketsPassword-commonPackage/index": 1,
            "pages/grziti/components/sideDishsList-placeholder/pageC/index": 1,
            "pages/grziti/components/sideDishsList-placeholder/pageD/index": 1,
            "pages/grziti/components/sideDishsList-placeholder/pageE/index": 1,
            "pages/grziti/components/dishCartItem-placeholder/index": 1,
            "pages/grziti/components/dishCartItem-placeholder/mnDish": 1,
            "pages/grziti/components/timeChoose-placeholder/timeChooseNew/index": 1,
            "pages/grziti/components/increasePrice-placeholder/dishItem/index": 1,
            "pages/grziti/components/increasePrice-placeholder/dishItem/style2": 1,
            "pages/grziti/components/pay-placeholder/becomeVip": 1,
            "pages/grziti/components/pay-placeholder/payBase_wm": 1,
            "pages/grziti/tyzfPlacehoder/components/rechargeAgreement/agreementPopup": 1,
            "pages/grziti/components/cartPopup-placeholder/index": 1,
            "pages/waimaiziti/components/gbOrderBase-placeholder/errorTips/index": 1,
            "pages/waimaiziti/components/orderState-placeholder/index": 1,
            "pages/waimaiziti/components/sideDishsList-placeholder/pageA/index": 1,
            "pages/waimaiziti/components/couponDishPopup-placeholder/index": 1,
            "pages/waimaiziti/components/fullGifts-placeholder/fullGiftList": 1,
            "pages/waimaiziti/components/healthOrderTip-placeholder/index": 1,
            "pages/waimaiziti/components/increasePrice-placeholder/increaseDishList": 1,
            "pages/waimaiziti/components/increasePrice-placeholder/index": 1,
            "pages/waimaiziti/components/shoppingCartPopup-placeholder/index": 1,
            "pages/waimaiziti/components/equityCardDishItem-placeholder/index": 1,
            "pages/waimaiziti/components/sideDishsList-placeholder/pageB/index": 1,
            "pages/waimaiziti/components/activityEntry-placeholder/index": 1,
            "pages/waimaiziti/grwaimai/dish/pageB/categoryTitle": 1,
            "pages/waimaiziti/components/sideDishsList-placeholder/pageC/index": 1,
            "pages/waimaiziti/components/sideDishsList-placeholder/pageD/index": 1,
            "pages/waimaiziti/components/sideDishsList-placeholder/pageE/index": 1,
            "pages/waimaiziti/components/getUserPhone-placeholder/index": 1,
            "pages/waimaiziti/components/dishCartItem-placeholder/index": 1,
            "pages/waimaiziti/components/dishCartItem-placeholder/mnDish": 1,
            "pages/waimaiziti/components/timeChoose-placeholder/timeChooseNew/index": 1,
            "pages/wmzt-addressPopup-commonPackage/index": 1,
            "pages/waimaiziti/components/increasePrice-placeholder/dishItem/index": 1,
            "pages/waimaiziti/components/increasePrice-placeholder/dishItem/style2": 1,
            "pages/waimaiziti/components/pay-placeholder/becomeVip": 1,
            "pages/waimaiziti/components/pay-placeholder/payBase_wm": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/rechargeAgreement/agreementPopup": 1,
            "pages/waimaiziti/components/cartPopup-placeholder/index": 1,
            "pages/pj/pjHome/components/pjTicketItem/index": 1,
            "pages/pj/pjHome/components/tips/index": 1,
            "pages/pj/pjHome/advancedMode/pjLeadWords/index": 1,
            "pages/pj/pjHome/advancedMode/baseComponents/questionType/index": 1,
            "pages/pj/pjHome/advancedMode/baseComponents/textarea/index": 1,
            "pages/pj/pjHome/advancedMode/pjAnonymous/index": 1,
            "pages/pj/pjHome/advancedMode/pjBackBtn/index": 1,
            "pages/pj/pjHome/advancedMode/pjChoiceQuestion/index": 1,
            "pages/pj/pjHome/advancedMode/pjDishScore/index": 1,
            "pages/pj/pjHome/advancedMode/pjFavouriteDish/index": 1,
            "pages/pj/pjHome/advancedMode/pjMcInfo/index": 1,
            "pages/pj/pjHome/advancedMode/pjNPS/index": 1,
            "pages/pj/pjHome/advancedMode/pjPageBtn/index": 1,
            "pages/pj/pjHome/advancedMode/pjScoreQuestion/index": 1,
            "pages/pj/pjHome/advancedMode/pjTopRegion/index": 1,
            "pages/pay/tyzfPlacehoder/components/rechargeAgreement/agreementPopup": 1,
            "pages/pay/tyzfPlacehoder/components/ticket/index": 1,
            "pages/pay/tyzfPlacehoder/components/memberCard": 1,
            "pages/pay/tyzfPlacehoder/components/changeCard": 1,
            "pages/pay/tyzfPlacehoder/components/integral": 1,
            "pages/pay/tyzfPlacehoder/components/payhuis": 1,
            "baseComponents/bottomInfoBar/index": 1,
            "pages/pay/components/equityCard-placeholder/index": 1,
            "pages/pay/components/changePayCards/index": 1,
            "pages/pay/components/payBase_dc/index": 1,
            "pages/pay/tyzfPlacehoder/components/ticUnusedPopup": 1,
            "pages/pay/components/payAfterPop-placeholder/index": 1,
            "pages/pay/components/tablePay/becomeVip": 1,
            "pages/pay/components/tablePay/integralAttributionTips": 1,
            "pages/pay/components/tablePay/orderItems": 1,
            "pages/pay/components/tablePay/settle": 1,
            "pages/system/components/mall-dragPic/dragPicType1": 1,
            "pages/system/components/mall-dragPic/mall-mask": 1,
            "pages/passwordRedbag/components/recordComponent": 1,
            "pages/mescroll-uni-commonPackage/mescroll-uni/components/mescroll-empty": 1,
            "pages/mescroll-uni-commonPackage/mescroll-uni/components/mescroll-top": 1,
            "baseComponents/wxpopup/transition": 1,
            "pages/tabbar-commonPackage/tabbar": 1,
            "pages/tabbar-commonPackage/tabbarItem": 1,
            "pages/tabbar-commonPackage/tabbarItemStyle2": 1,
            "pages/tabbar-commonPackage/tabbarItemStyle3": 1,
            "pages/tabbar-commonPackage/tabbarItemStyle4": 1,
            "pages/tabbar-commonPackage/tabbarItemStyle5": 1,
            "pages/tabbar-commonPackage/tabbarItemTs": 1,
            "pages/cardhome/components/memberBirthdayReminder/components/coupon": 1,
            "pages/keyBoard-commonPackage/keyBoard": 1,
            "pages/order/components/diancanOrder/diancanOrder": 1,
            "pages/order/components/diancanOrder/unaccomplishedOrder": 1,
            "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/index": 1,
            "pages/dishPopups-dp-pop-dishPageStepModel-commonPackage/index": 1,
            "pages/dishPopups-dp-pop-dishSpecModel-commonPackage/index": 1,
            "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/index": 1,
            "pages/dishPopups-dp-pop-initialModel-commonPackage/index": 1,
            "pages/dishPopups-dp-pop-specsSingleModel-commonPackage/index": 1,
            "pages/dishPopups-dp-pop-theWoodsModel-commonPackage/index": 1,
            "pages/dishPopups-tc-pop-blockModel-commonPackage/index": 1,
            "pages/dishPopups-tc-pop-pureTextModel-commonPackage/index": 1,
            "pages/dishPopups-tc-pop-randomModel-commonPackage/index": 1,
            "pages/dishPopups-tc-pop-bundleModel-commonPackage/index": 1,
            "pages/treasureBox-commonPackage/boxInfoPoup": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponInDish": 1,
            "pages/diancan-fastfood/components/myCoupon-placeholder/couponForDetails": 1,
            "pages/diancan-fastfood/dishes/component/redPacketsPasswordPoup": 1,
            "pages/diancan-fastfood/tyzfFastFood/components/rechargeAgreement": 1,
            "pages/diancan-fastfood/tyzfFastFood/view/showRechargeAgreement": 1,
            "pages/diancan-fastfood/components/dishItemComponents-placeholder/dishInfo": 1,
            "baseComponents/addDeBtn/transparent": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/showPics/index": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index": 1,
            "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/index": 1,
            "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/index": 1,
            "pages/diancan/components/dishItemComponents-placeholder/dishInfo": 1,
            "baseComponents/addDeBtn/plus": 1,
            "pages/aiDishPeople-commonPackage/aimenuPopup": 1,
            "pages/aiDish-commonPackage/aimenuPopup": 1,
            "pages/aiDish-commonPackage/circleBox": 1,
            "pages/hotpot-commonPackage/hotpotBasePop/cookPop/index": 1,
            "pages/diancan/dishes/component/coupon": 1,
            "pages/orderImagePosition-commonPackage/BeefPartGuidancePrompt": 1,
            "pages/orderImagePosition-commonPackage/PartCanvas": 1,
            "pages/hotpot-commonPackage/hotpotItem/simpleTab/index": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price": 1,
            "pages/waimaiziti2/components/pay-placeholder/becomeVip": 1,
            "pages/waimaiziti2/components/pay-placeholder/payBase_wm": 1,
            "pages/grziti/components/orderState-placeholder/steps/index": 1,
            "pages/grziti/components/dishItem-placeholder/woods": 1,
            "pages/grziti/components/dishItemComponents-placeholder/exChange": 1,
            "pages/grziti/components/dishItemComponents-placeholder/fullGift": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout1": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout11": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout13": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout14": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout15": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout16": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout17": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout2": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout3": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout4": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout5": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout6": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout7": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout8": 1,
            "pages/grziti/components/dishItemComponents-placeholder/layout9": 1,
            "pages/grziti/components/fullGifts-placeholder/mnMode/index": 1,
            "pages/wmzt-removeDishPopup-commonPackage/delDishItem": 1,
            "baseComponents/addDeBtn/simple": 1,
            "pages/wmzt-advSelectTimePopup-commonPackage/timeChoose-placeholder/timeChooseNew/index": 1,
            "pages/wmzt-redPacketsPassword-commonPackage/popup": 1,
            "pages/wmzt-myCoupon-commonPackage/myCouponByCart/index": 1,
            "pages/wmzt-myCoupon-commonPackage/cartCouponDishPopup": 1,
            "pages/grziti/tyzfPlacehoder/components/meituanTicket": 1,
            "pages/grziti/tyzfPlacehoder/components/ticket/index": 1,
            "pages/grziti/tyzfPlacehoder/components/tiktok": 1,
            "pages/grziti/components/pay-placeholder/giftChange": 1,
            "pages/grziti/tyzfPlacehoder/components/memberCard": 1,
            "pages/grziti/tyzfPlacehoder/components/cdfk": 1,
            "pages/grziti/tyzfPlacehoder/components/changeCard": 1,
            "pages/grziti/tyzfPlacehoder/components/erase": 1,
            "pages/grziti/tyzfPlacehoder/components/integral": 1,
            "pages/grziti/tyzfPlacehoder/components/payMoney": 1,
            "pages/grziti/tyzfPlacehoder/components/payhuis": 1,
            "pages/waimaiziti/components/orderState-placeholder/steps/index": 1,
            "pages/waimaiziti/components/dishItem-placeholder/woods": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/exChange": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/fullGift": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout1": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout11": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout13": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout14": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout15": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout16": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout17": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout2": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout3": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout4": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout5": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout6": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout7": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout8": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/layout9": 1,
            "pages/waimaiziti/components/fullGifts-placeholder/mnMode/index": 1,
            "pages/wmzt-addressPopup-commonPackage/del_slideLeft": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/meituanTicket": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/ticket/index": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/tiktok": 1,
            "pages/waimaiziti/components/pay-placeholder/giftChange": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/memberCard": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/cdfk": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/changeCard": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/erase": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/integral": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/payMoney": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/payhuis": 1,
            "pages/pj/pjHome/advancedMode/baseComponents/tips/index": 1,
            "pages/pay/tyzfPlacehoder/components/meituanTicket": 1,
            "pages/pay/tyzfPlacehoder/components/ticket/ticketSpreadStyle": 1,
            "pages/pay/tyzfPlacehoder/components/tiktok": 1,
            "pages/pay/tyzfPlacehoder/components/erase": 1,
            "pages/pay/components/tablePayOrderItems-placeholder/index": 1,
            "pages/pay/components/tablePayOrderItems-placeholder/payOrder": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/npartPopup/index": 1,
            "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index": 1,
            "baseComponents/addDeBtn/solidColor": 1,
            "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/DishSpec": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/stepBtn": 1,
            "baseComponents/dishPopups-dp-components-commonPackage/cookImgItem/index": 1,
            "baseComponents/dishPopups-dp-components-commonPackage/dishSpec/index": 1,
            "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index": 1,
            "baseComponents/dishPopups-dp-components-commonPackage/slideUpBtn/index": 1,
            "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/index": 1,
            "baseComponents/dishPopups-tc-components-commonPackage/dishItems/blockModel/index": 1,
            "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index": 1,
            "baseComponents/dishPopups-tc-components-commonPackage/dishItems/pureTextModel/index": 1,
            "pages/dishPopups-tc-pop-bundleModel-commonPackage/components/seledDishItems/index": 1,
            "pages/treasureBox-commonPackage/grid": 1,
            "pages/treasureBox-commonPackage/medalDetailPoup": 1,
            "pages/diancan-fastfood/dishes/component/coupon": 1,
            "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/calcDiscountPrice": 1,
            "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/uni-popup": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotFour": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotOne": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotThree": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotThreeNested": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotTwo": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotTwo1": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_1": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_2": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_3": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_4": 1,
            "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_5": 1,
            "pages/aiDishPeople-commonPackage/aiDishItem": 1,
            "pages/aiDish-commonPackage/aiDishItem": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/meituanTicket": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/ticket/index": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/tiktok": 1,
            "pages/waimaiziti2/components/pay-placeholder/giftChange": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/memberCard": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/cdfk": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/changeCard": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/erase": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/integral": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/payMoney": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/payhuis": 1,
            "pages/grziti/components/dishItemComponents-placeholder/dishInfo": 1,
            "pages/wmzt-redPacketsPassword-commonPackage/coupon": 1,
            "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/meituan": 1,
            "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/tiktok": 1,
            "pages/wmzt-myCoupon-commonPackage/discountMutuallyExclusivePopup": 1,
            "pages/wmzt-myCoupon-commonPackage/selectDishpopup": 1,
            "pages/wmzt-myCoupon-commonPackage/couponForDetails": 1,
            "pages/wmzt-myCoupon-commonPackage/myCouponInDish": 1,
            "pages/grziti/tyzfPlacehoder/components/tipPopup": 1,
            "pages/waimaiziti/components/dishItemComponents-placeholder/dishInfo": 1,
            "pages/waimaiziti/tyzfPlacehoder/components/tipPopup": 1,
            "pages/pay/tyzfPlacehoder/components/tipPopup": 1,
            "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup": 1,
            "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/uni-popup": 1,
            "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23": 1,
            "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9": 1,
            "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/woods": 1,
            "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/uni-transition": 1,
            "pages/waimaiziti2/tyzfPlacehoder/components/tipPopup": 1,
            "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/uni-transition": 1,
            "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo": 1,
          }[e] &&
          o.push(
            (p[e] = new Promise(function (o, a) {
              for (
                var n =
                    ({
                      "baseComponents/countdown/index2":
                        "baseComponents/countdown/index2",
                      "baseComponents/log/index": "baseComponents/log/index",
                      "baseComponents/actionPopup/index":
                        "baseComponents/actionPopup/index",
                      "baseComponents/wxprivacy/index":
                        "baseComponents/wxprivacy/index",
                      "baseComponents/loading/index":
                        "baseComponents/loading/index",
                      "baseComponents/protocolPopup/index":
                        "baseComponents/protocolPopup/index",
                      "baseComponents/topNavigationBar/index":
                        "baseComponents/topNavigationBar/index",
                      "pages/passwordRedbag/components/getPassword":
                        "pages/passwordRedbag/components/getPassword",
                      "pages/passwordRedbag/components/helpPopup":
                        "pages/passwordRedbag/components/helpPopup",
                      "pages/passwordRedbag/components/passwordVoice":
                        "pages/passwordRedbag/components/passwordVoice",
                      "pages/passwordRedbag/components/redEnvelopes":
                        "pages/passwordRedbag/components/redEnvelopes",
                      "pages/passwordRedbag/components/reward":
                        "pages/passwordRedbag/components/reward",
                      "pages/passwordRedbag/components/rewardListPopup":
                        "pages/passwordRedbag/components/rewardListPopup",
                      "pages/passwordRedbag/components/taskbar":
                        "pages/passwordRedbag/components/taskbar",
                      "baseComponents/mescroll-uni-wrap/index":
                        "baseComponents/mescroll-uni-wrap/index",
                      "pages/passwordRedbag/components/coupon":
                        "pages/passwordRedbag/components/coupon",
                      "pages/blindBox/components/BackgroundImg":
                        "pages/blindBox/components/BackgroundImg",
                      "pages/blindBox/components/buyBlindBox":
                        "pages/blindBox/components/buyBlindBox",
                      "pages/blindBox/components/dollMachine":
                        "pages/blindBox/components/dollMachine",
                      "pages/blindBox/components/earlyPop":
                        "pages/blindBox/components/earlyPop",
                      "pages/blindBox/components/helpPopup":
                        "pages/blindBox/components/helpPopup",
                      "pages/blindBox/components/integralPopup":
                        "pages/blindBox/components/integralPopup",
                      "pages/blindBox/components/taskbar":
                        "pages/blindBox/components/taskbar",
                      "pages/blindBox/components/vouchersSwiper":
                        "pages/blindBox/components/vouchersSwiper",
                      "pages/blindBox/components/EggTwistingMachine":
                        "pages/blindBox/components/EggTwistingMachine",
                      "pages/blindBox/components/eggHelpPopup":
                        "pages/blindBox/components/eggHelpPopup",
                      "pages/blindBox/components/eggTaskbar":
                        "pages/blindBox/components/eggTaskbar",
                      "pages/blindBox/components/vouchersItem":
                        "pages/blindBox/components/vouchersItem",
                      "pages/equityCard/components/store":
                        "pages/equityCard/components/store",
                      "pages/equityCard/components/ChekaEq":
                        "pages/equityCard/components/ChekaEq",
                      "pages/equityCard/components/ClassMenu":
                        "pages/equityCard/components/ClassMenu",
                      "pages/equityCard/components/MenuEq":
                        "pages/equityCard/components/MenuEq",
                      "pages/equityCard/components/PurchaseButton":
                        "pages/equityCard/components/PurchaseButton",
                      "pages/equityCard/components/eqCard":
                        "pages/equityCard/components/eqCard",
                      "pages/equityCard/components/equityDetails":
                        "pages/equityCard/components/equityDetails",
                      "baseComponents/wxpopup/popup":
                        "baseComponents/wxpopup/popup",
                      "baseComponents/authBtn2/index":
                        "baseComponents/authBtn2/index",
                      "baseComponents/tab/index": "baseComponents/tab/index",
                      "pages/cardhome2/card/cardMedalWall/medalDetilPoup":
                        "pages/cardhome2/card/cardMedalWall/medalDetilPoup",
                      "baseComponents/tabbarWrap/index":
                        "baseComponents/tabbarWrap/index",
                      "baseComponents/activeRemindPopup/index":
                        "baseComponents/activeRemindPopup/index",
                      "baseComponents/formIdWrap/wxmp":
                        "baseComponents/formIdWrap/wxmp",
                      "pages/advertComponents-commonPackage/index":
                        "pages/advertComponents-commonPackage/index",
                      "pages/cardhome2/card/getTicket/getLongTicketItem":
                        "pages/cardhome2/card/getTicket/getLongTicketItem",
                      "pages/cardhome2/card/getTicket/getTicketItem":
                        "pages/cardhome2/card/getTicket/getTicketItem",
                      "baseComponents/addShopTicket/index":
                        "baseComponents/addShopTicket/index",
                      "baseComponents/ticketItem/index":
                        "baseComponents/ticketItem/index",
                      "baseComponents/addShopTicket2/index":
                        "baseComponents/addShopTicket2/index",
                      "baseComponents/dialog/index":
                        "baseComponents/dialog/index",
                      "baseComponents/longPictureTicketItem/index":
                        "baseComponents/longPictureTicketItem/index",
                      "baseComponents/ticketItem2/index":
                        "baseComponents/ticketItem2/index",
                      "pages/cardhome2/card/ticket_66331/ticketItem_66331":
                        "pages/cardhome2/card/ticket_66331/ticketItem_66331",
                      "pages/cardhome2/components/chooseStorePoup":
                        "pages/cardhome2/components/chooseStorePoup",
                      "pages/cardhome2/card/ticketDetail/ticketFooter":
                        "pages/cardhome2/card/ticketDetail/ticketFooter",
                      "pages/cardhome/card/questionnaire/components/questionList":
                        "pages/cardhome/card/questionnaire/components/questionList",
                      "pages/cardhome/card/questionnaire/components/reward":
                        "pages/cardhome/card/questionnaire/components/reward",
                      "pages/cardhome/components/actionPopup/index":
                        "pages/cardhome/components/actionPopup/index",
                      "pages/cardhome/card/familyCard/components/cardholder":
                        "pages/cardhome/card/familyCard/components/cardholder",
                      "pages/cardhome/card/familyCard/components/cardlist":
                        "pages/cardhome/card/familyCard/components/cardlist",
                      "pages/cardhome/card/familyCard/components/secondaryCard":
                        "pages/cardhome/card/familyCard/components/secondaryCard",
                      "pages/cardhome/common/vendor":
                        "pages/cardhome/common/vendor",
                      "pages/cardhome/card/components/cardSwiper/index":
                        "pages/cardhome/card/components/cardSwiper/index",
                      "pages/cardhome/components/cardRightsMap":
                        "pages/cardhome/components/cardRightsMap",
                      "pages/cardhome/card/components/pushContent/index":
                        "pages/cardhome/card/components/pushContent/index",
                      "baseComponents/officalAccount/index":
                        "baseComponents/officalAccount/index",
                      "pages/cardhome/components/updateCard":
                        "pages/cardhome/components/updateCard",
                      "pages/cardhome/components/cardInfo":
                        "pages/cardhome/components/cardInfo",
                      "pages/cardhome/components/equityCardReminder/index":
                        "pages/cardhome/components/equityCardReminder/index",
                      "pages/cardhome/components/imgHotArea":
                        "pages/cardhome/components/imgHotArea",
                      "pages/cardhome/components/mcExpirationReminder/index":
                        "pages/cardhome/components/mcExpirationReminder/index",
                      "pages/cardhome/components/memberBirthdayReminder/index":
                        "pages/cardhome/components/memberBirthdayReminder/index",
                      "pages/cardhome/home/notice":
                        "pages/cardhome/home/notice",
                      "pages/cardhome/home/topRegion":
                        "pages/cardhome/home/topRegion",
                      "pages/cardhome/components/blindBox":
                        "pages/cardhome/components/blindBox",
                      "pages/cardhome/components/channel":
                        "pages/cardhome/components/channel",
                      "pages/cardhome/components/collectCard":
                        "pages/cardhome/components/collectCard",
                      "pages/cardhome/components/customerService":
                        "pages/cardhome/components/customerService",
                      "pages/cardhome/components/equityCard":
                        "pages/cardhome/components/equityCard",
                      "pages/cardhome/components/growthValue":
                        "pages/cardhome/components/growthValue",
                      "pages/cardhome/components/guidedPopup":
                        "pages/cardhome/components/guidedPopup",
                      "pages/cardhome/components/inviteFriends":
                        "pages/cardhome/components/inviteFriends",
                      "pages/cardhome/components/livePlayerCom":
                        "pages/cardhome/components/livePlayerCom",
                      "pages/cardhome/components/openCard":
                        "pages/cardhome/components/openCard",
                      "pages/cardhome/components/passwordRedEnvelope":
                        "pages/cardhome/components/passwordRedEnvelope",
                      "pages/cardhome/components/payVip":
                        "pages/cardhome/components/payVip",
                      "pages/cardhome/components/personalInfo":
                        "pages/cardhome/components/personalInfo",
                      "pages/cardhome/components/phoneCallPopup":
                        "pages/cardhome/components/phoneCallPopup",
                      "pages/cardhome/components/questionnaireCom":
                        "pages/cardhome/components/questionnaireCom",
                      "pages/cardhome/home/business":
                        "pages/cardhome/home/business",
                      "pages/cardhome/home/orderStates":
                        "pages/cardhome/home/orderStates",
                      "pages/cardhome/home/userInfo":
                        "pages/cardhome/home/userInfo",
                      "pages/cardhome/home/index2_13935/card":
                        "pages/cardhome/home/index2_13935/card",
                      "baseComponents/showAdvert/index":
                        "baseComponents/showAdvert/index",
                      "pages/cardhome/card/cardHome/userInfo":
                        "pages/cardhome/card/cardHome/userInfo",
                      "pages/cardhome/card/cardHome/xingxuanToH5":
                        "pages/cardhome/card/cardHome/xingxuanToH5",
                      "pages/cardhome/components/topRegion":
                        "pages/cardhome/components/topRegion",
                      "pages/cardhome/components/businessSettings":
                        "pages/cardhome/components/businessSettings",
                      "pages/cardhome/components/payCode":
                        "pages/cardhome/components/payCode",
                      "pages/cardhome/card/components/cardGrade/index":
                        "pages/cardhome/card/components/cardGrade/index",
                      "pages/cardhome/card/components/cardPageB/index":
                        "pages/cardhome/card/components/cardPageB/index",
                      "pages/cardhome/card/cardHome_66331/userInfo":
                        "pages/cardhome/card/cardHome_66331/userInfo",
                      "pages/cardhome/card/components/cardPageE/index":
                        "pages/cardhome/card/components/cardPageE/index",
                      "pages/cardhome/card/components/cardInfoTs/index":
                        "pages/cardhome/card/components/cardInfoTs/index",
                      "pages/cardhome/card/cardLevelUp/cardLevelUpPay":
                        "pages/cardhome/card/cardLevelUp/cardLevelUpPay",
                      "pages/cardhome/card/components/pay4card/index":
                        "pages/cardhome/card/components/pay4card/index",
                      "pages/cardhome/card/cardLevelUp/cardUpPopup":
                        "pages/cardhome/card/cardLevelUp/cardUpPopup",
                      "pages/cardhome/card/cardLevelUp/cardUpType":
                        "pages/cardhome/card/cardLevelUp/cardUpType",
                      "pages/cardhome/card/cardLevelUp/switchCard":
                        "pages/cardhome/card/cardLevelUp/switchCard",
                      "pages/cardhome/card/components/memberUpProtocolPoup/index":
                        "pages/cardhome/card/components/memberUpProtocolPoup/index",
                      "pages/cardhome/components/chooseStorePoup":
                        "pages/cardhome/components/chooseStorePoup",
                      "pages/cardhome/card/cardLevelUpType3/components/relegationPlanPup":
                        "pages/cardhome/card/cardLevelUpType3/components/relegationPlanPup",
                      "baseComponents/mescroll-uni-body-wrap/index":
                        "baseComponents/mescroll-uni-body-wrap/index",
                      "pages/cardhome/card/cardLevelHistory/ticketRecord":
                        "pages/cardhome/card/cardLevelHistory/ticketRecord",
                      "baseComponents/noteLoading/index":
                        "baseComponents/noteLoading/index",
                      "pages/cardhome/card/components/qrcode/index":
                        "pages/cardhome/card/components/qrcode/index",
                      "baseComponents/checkBox/index":
                        "baseComponents/checkBox/index",
                      "baseComponents/chooseAvatar/index":
                        "baseComponents/chooseAvatar/index",
                      "baseComponents/input/index":
                        "baseComponents/input/index",
                      "baseComponents/keyBoardWrap/index":
                        "baseComponents/keyBoardWrap/index",
                      "pages/cardhome/card/components/personalInfo/topRegion":
                        "pages/cardhome/card/components/personalInfo/topRegion",
                      "pages/cardhome/card/personalInfo/authorizationPhone":
                        "pages/cardhome/card/personalInfo/authorizationPhone",
                      "pages/cardhome/card/personalInfo/addFriendsBirthPopup":
                        "pages/cardhome/card/personalInfo/addFriendsBirthPopup",
                      "pages/cardhome/card/personalInfo/daijinquan":
                        "pages/cardhome/card/personalInfo/daijinquan",
                      "pages/cardhome/card/personalInfo/deleteFriendsBirth":
                        "pages/cardhome/card/personalInfo/deleteFriendsBirth",
                      "pages/cardhome/card/personalBranchPage/ticketPopup":
                        "pages/cardhome/card/personalBranchPage/ticketPopup",
                      "pages/cardhome/card/ticket/components/RemindPopup":
                        "pages/cardhome/card/ticket/components/RemindPopup",
                      "pages/cardhome/card/ticket/components/SubgiftPopup":
                        "pages/cardhome/card/ticket/components/SubgiftPopup",
                      "pages/cardhome/card/buyTicketHistory/ticketPopup/invoiceConfirmPopup/index":
                        "pages/cardhome/card/buyTicketHistory/ticketPopup/invoiceConfirmPopup/index",
                      "pages/cardhome/card/buyTicketHistory/transferRecord":
                        "pages/cardhome/card/buyTicketHistory/transferRecord",
                      "pages/cardhome/card/buyTicketHistory/ticketPopup/refundPopup/index":
                        "pages/cardhome/card/buyTicketHistory/ticketPopup/refundPopup/index",
                      "pages/cardhome/card/buyTicketHistory/ticketRecord":
                        "pages/cardhome/card/buyTicketHistory/ticketRecord",
                      "pages/cardhome/card/buyCard/errpoup":
                        "pages/cardhome/card/buyCard/errpoup",
                      "pages/cardhome/card/buyCard/payPopup":
                        "pages/cardhome/card/buyCard/payPopup",
                      "pages/cardhome/card/balance/overdueBalancePup":
                        "pages/cardhome/card/balance/overdueBalancePup",
                      "pages/cardhome/card/collectCards/pageA/index":
                        "pages/cardhome/card/collectCards/pageA/index",
                      "pages/cardhome/card/collectCards/pageB/index":
                        "pages/cardhome/card/collectCards/pageB/index",
                      "pages/cardhome/card/payCode/zoomUp":
                        "pages/cardhome/card/payCode/zoomUp",
                      "pages/cardhome/card/components/tkiBarcode/index":
                        "pages/cardhome/card/components/tkiBarcode/index",
                      "pages/cardhome/card/cardRecharge/components/customRechargeInput":
                        "pages/cardhome/card/cardRecharge/components/customRechargeInput",
                      "pages/cardhome/card/cardRecharge/components/rechargeList":
                        "pages/cardhome/card/cardRecharge/components/rechargeList",
                      "pages/cardhome/card/cardRecharge/components/rechargePup":
                        "pages/cardhome/card/cardRecharge/components/rechargePup",
                      "pages/cardhome/card/inviteFriends/couponMIni":
                        "pages/cardhome/card/inviteFriends/couponMIni",
                      "baseComponents/exitBtn/index":
                        "baseComponents/exitBtn/index",
                      "pages/cardhome/card/inviteFriends/coupon":
                        "pages/cardhome/card/inviteFriends/coupon",
                      "pages/address/components/inputSelect/index":
                        "pages/address/components/inputSelect/index",
                      "pages/address/components/highLight/index":
                        "pages/address/components/highLight/index",
                      "pages/address/components/wxImportAddress/index":
                        "pages/address/components/wxImportAddress/index",
                      "pages/address/selectShippingAddress/AddressItem":
                        "pages/address/selectShippingAddress/AddressItem",
                      "baseComponents/vTabs/index":
                        "baseComponents/vTabs/index",
                      "pages/order/common/vendor": "pages/order/common/vendor",
                      "pages/order/otherOrder/otherOrder":
                        "pages/order/otherOrder/otherOrder",
                      "pages/order/diancanOrder/index1":
                        "pages/order/diancanOrder/index1",
                      "pages/order/shangchengOrder/index1":
                        "pages/order/shangchengOrder/index1",
                      "pages/order/waimaiOrder/index1":
                        "pages/order/waimaiOrder/index1",
                      "pages/order/components/customerService/index":
                        "pages/order/components/customerService/index",
                      "pages/order/components/qrcode/index":
                        "pages/order/components/qrcode/index",
                      "pages/order/components/communityCode/index":
                        "pages/order/components/communityCode/index",
                      "pages/order/components/diancanOrder/itemsModel":
                        "pages/order/components/diancanOrder/itemsModel",
                      "pages/order/components/diancanOrder/payInfo":
                        "pages/order/components/diancanOrder/payInfo",
                      "pages/order/components/mnItemsModel-placeholder/index":
                        "pages/order/components/mnItemsModel-placeholder/index",
                      "pages/order/components/orderSteps/index":
                        "pages/order/components/orderSteps/index",
                      "pages/order/waimaiOrder/waimaiDetail/ordDetailWS":
                        "pages/order/waimaiOrder/waimaiDetail/ordDetailWS",
                      "pages/order/waimaiOrder/waimaiDetail/ordDetailZT":
                        "pages/order/waimaiOrder/waimaiDetail/ordDetailZT",
                      "pages/order/components/orderMap/index":
                        "pages/order/components/orderMap/index",
                      "pages/order/components/sharePopup/index":
                        "pages/order/components/sharePopup/index",
                      "pages/order/components/waimaiOrder/oneMore/index":
                        "pages/order/components/waimaiOrder/oneMore/index",
                      "pages/order/waimaiOrder/waimaiDetail/orderBack":
                        "pages/order/waimaiOrder/waimaiDetail/orderBack",
                      "pages/order/components/codeLst/index":
                        "pages/order/components/codeLst/index",
                      "pages/order/components/pickUp/index":
                        "pages/order/components/pickUp/index",
                      "pages/order/shangchengOrder/shangchengDetail/wxPopupPhone":
                        "pages/order/shangchengOrder/shangchengDetail/wxPopupPhone",
                      "baseComponents/addDeBtn/index":
                        "baseComponents/addDeBtn/index",
                      "pages/order/components/payAfterPop/index":
                        "pages/order/components/payAfterPop/index",
                      "pages/order/otherOrder/components/equityCardOrderItem":
                        "pages/order/otherOrder/components/equityCardOrderItem",
                      "baseComponents/orderNotice/index":
                        "baseComponents/orderNotice/index",
                      "pages/jfsc/components/MarketingActivityEntrance/index":
                        "pages/jfsc/components/MarketingActivityEntrance/index",
                      "pages/jfsc/components/jfCanUse/index":
                        "pages/jfsc/components/jfCanUse/index",
                      "pages/jfsc/components/jfItemLayout/flashProductItem":
                        "pages/jfsc/components/jfItemLayout/flashProductItem",
                      "pages/jfsc/components/jfItemLayout/productListLayout":
                        "pages/jfsc/components/jfItemLayout/productListLayout",
                      "pages/jfsc/components/jfPopup/index":
                        "pages/jfsc/components/jfPopup/index",
                      "pages/jfsc/components/jfTab/index":
                        "pages/jfsc/components/jfTab/index",
                      "pages/jfsc/jfscHome/pageD/pageHead/index":
                        "pages/jfsc/jfscHome/pageD/pageHead/index",
                      "pages/jfsc/jfscHome/pageD/ruleDesPop/index":
                        "pages/jfsc/jfscHome/pageD/ruleDesPop/index",
                      "pages/jfsc/jfscHome/pageD/goodsItem/index":
                        "pages/jfsc/jfscHome/pageD/goodsItem/index",
                      "pages/jfsc/jfscHome/pageD/ygDialog/index":
                        "pages/jfsc/jfscHome/pageD/ygDialog/index",
                      "pages/jfsc/jfscHome/pageE/components/jfCanUseTs":
                        "pages/jfsc/jfscHome/pageE/components/jfCanUseTs",
                      "pages/jfsc/common/vendor": "pages/jfsc/common/vendor",
                      "pages/jfsc/jfscHome/pageE/components/jfTabTs":
                        "pages/jfsc/jfscHome/pageE/components/jfTabTs",
                      "pages/jfsc/jfscHome/pageE/components/jfItemLayoutTs/productListLayout":
                        "pages/jfsc/jfscHome/pageE/components/jfItemLayoutTs/productListLayout",
                      "baseComponents/countdown/index":
                        "baseComponents/countdown/index",
                      "baseComponents/imageVideoSwiper/index":
                        "baseComponents/imageVideoSwiper/index",
                      "pages/jfsc/components/jfAddressChoose/index":
                        "pages/jfsc/components/jfAddressChoose/index",
                      "pages/jfsc/components/jfMcChoose/index":
                        "pages/jfsc/components/jfMcChoose/index",
                      "pages/jfsc/components/jfTimeChoose/index":
                        "pages/jfsc/components/jfTimeChoose/index",
                      "pages/jfsc/components/switchBtn/index":
                        "pages/jfsc/components/switchBtn/index",
                      "baseComponents/bindtipPoup/index":
                        "baseComponents/bindtipPoup/index",
                      "baseComponents/shopRestDialog/index":
                        "baseComponents/shopRestDialog/index",
                      "baseComponents/serviceAgreementPopup/index":
                        "baseComponents/serviceAgreementPopup/index",
                      "pages/diancan2/components/backgroundPage-placeholder/index":
                        "pages/diancan2/components/backgroundPage-placeholder/index",
                      "pages/diancan2/components/comeInDIshPagePopup-placeholder/index":
                        "pages/diancan2/components/comeInDIshPagePopup-placeholder/index",
                      "pages/diancan2/components/headSwiper/index":
                        "pages/diancan2/components/headSwiper/index",
                      "pages/diancan2/components/mealOptionPopup-placeholder/index":
                        "pages/diancan2/components/mealOptionPopup-placeholder/index",
                      "pages/diancan2/navigation/components/OrderList":
                        "pages/diancan2/navigation/components/OrderList",
                      "pages/diancan2/people/components/PeopleTablewarePopup":
                        "pages/diancan2/people/components/PeopleTablewarePopup",
                      "pages/diancan2/components/countdownPopup/index":
                        "pages/diancan2/components/countdownPopup/index",
                      "pages/diancan2/diningCodePage/foodInfo":
                        "pages/diancan2/diningCodePage/foodInfo",
                      "pages/diancan2/common/vendor":
                        "pages/diancan2/common/vendor",
                      "pages/diancan2/components/tableGroupPopup-placeholder/index":
                        "pages/diancan2/components/tableGroupPopup-placeholder/index",
                      "baseComponents/collectCardBoxWrap/index":
                        "baseComponents/collectCardBoxWrap/index",
                      "baseComponents/dishPopupsWrap/index":
                        "baseComponents/dishPopupsWrap/index",
                      "baseComponents/giveCollectCardBoxWrap/index":
                        "baseComponents/giveCollectCardBoxWrap/index",
                      "baseComponents/redbagWrap/index":
                        "baseComponents/redbagWrap/index",
                      "baseComponents/treasureBoxWrap/index":
                        "baseComponents/treasureBoxWrap/index",
                      "pages/diancan-fastfood/common/vendor":
                        "pages/diancan-fastfood/common/vendor",
                      "pages/diancan-fastfood/dishes/pageB/dish":
                        "pages/diancan-fastfood/dishes/pageB/dish",
                      "pages/diancan-fastfood/components/limitNumPoup-placeholder/index":
                        "pages/diancan-fastfood/components/limitNumPoup-placeholder/index",
                      "pages/diancan-fastfood/components/couponDishPopup/index":
                        "pages/diancan-fastfood/components/couponDishPopup/index",
                      "pages/diancan-fastfood/components/dcCartBtn/index":
                        "pages/diancan-fastfood/components/dcCartBtn/index",
                      "pages/diancan-fastfood/components/backgroundPage-placeholder/index":
                        "pages/diancan-fastfood/components/backgroundPage-placeholder/index",
                      "pages/diancan-fastfood/components/barrage-placeholder/index":
                        "pages/diancan-fastfood/components/barrage-placeholder/index",
                      "pages/diancan-fastfood/components/brokenloading/index":
                        "pages/diancan-fastfood/components/brokenloading/index",
                      "pages/diancan-fastfood/components/cdpRecommendDishes/index":
                        "pages/diancan-fastfood/components/cdpRecommendDishes/index",
                      "pages/diancan-fastfood/components/comeInDIshPagePopup-placeholder/index":
                        "pages/diancan-fastfood/components/comeInDIshPagePopup-placeholder/index",
                      "pages/diancan-fastfood/components/evaluateRedbag-placeholder/index":
                        "pages/diancan-fastfood/components/evaluateRedbag-placeholder/index",
                      "pages/diancan-fastfood/components/importCustomerCouponsPoup-placeholder/index":
                        "pages/diancan-fastfood/components/importCustomerCouponsPoup-placeholder/index",
                      "pages/diancan-fastfood/components/lockScreenSubmitTip-placeholder/index":
                        "pages/diancan-fastfood/components/lockScreenSubmitTip-placeholder/index",
                      "pages/diancan-fastfood/components/mealOptionPopup-placeholder/index":
                        "pages/diancan-fastfood/components/mealOptionPopup-placeholder/index",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponByCart/index":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponByCart/index",
                      "pages/diancan-fastfood/components/orderPayDishItem/index":
                        "pages/diancan-fastfood/components/orderPayDishItem/index",
                      "pages/diancan-fastfood/components/orderprogressFoodDishItem/index":
                        "pages/diancan-fastfood/components/orderprogressFoodDishItem/index",
                      "pages/diancan-fastfood/components/removeDishPopup/index":
                        "pages/diancan-fastfood/components/removeDishPopup/index",
                      "pages/diancan-fastfood/components/tjDish/index":
                        "pages/diancan-fastfood/components/tjDish/index",
                      "baseComponents/blindBoxPopup/index":
                        "baseComponents/blindBoxPopup/index",
                      "baseComponents/questionnairePopupWrap/index":
                        "baseComponents/questionnairePopupWrap/index",
                      "baseComponents/redPacketsPopup/index":
                        "baseComponents/redPacketsPopup/index",
                      "pages/diancan-fastfood/components/equityCard/index":
                        "pages/diancan-fastfood/components/equityCard/index",
                      "pages/diancan-fastfood/tyzfFastFood/view/index":
                        "pages/diancan-fastfood/tyzfFastFood/view/index",
                      "pages/consumeGift-commonPackage/index":
                        "pages/consumeGift-commonPackage/index",
                      "pages/diancan-fastfood/components/increasePriceShop/cumulativePricePageB":
                        "pages/diancan-fastfood/components/increasePriceShop/cumulativePricePageB",
                      "pages/diancan-fastfood/components/increasePriceShop/dishListOfCartPageB":
                        "pages/diancan-fastfood/components/increasePriceShop/dishListOfCartPageB",
                      "pages/diancan-fastfood/components/popupRepeatRegressionDish/index":
                        "pages/diancan-fastfood/components/popupRepeatRegressionDish/index",
                      "pages/diancan-fastfood/components/reachAndGiven/cartListPageB":
                        "pages/diancan-fastfood/components/reachAndGiven/cartListPageB",
                      "pages/diancan-fastfood/components/cartBottomBtn/index":
                        "pages/diancan-fastfood/components/cartBottomBtn/index",
                      "pages/diancan-fastfood/components/cartCouponDishPopup-placeholder/index":
                        "pages/diancan-fastfood/components/cartCouponDishPopup-placeholder/index",
                      "pages/diancan-fastfood/components/cartDish/index":
                        "pages/diancan-fastfood/components/cartDish/index",
                      "pages/diancan-fastfood/components/cartLeavingMessage-placeholder/index":
                        "pages/diancan-fastfood/components/cartLeavingMessage-placeholder/index",
                      "pages/diancan-fastfood/components/cartUpdateCard-placeholder/index":
                        "pages/diancan-fastfood/components/cartUpdateCard-placeholder/index",
                      "pages/diancan-fastfood/components/cartYdBottomBtn-placeholder/index":
                        "pages/diancan-fastfood/components/cartYdBottomBtn-placeholder/index",
                      "pages/diancan-fastfood/components/confirmPopup-placeholder/index":
                        "pages/diancan-fastfood/components/confirmPopup-placeholder/index",
                      "pages/diancan-fastfood/components/duplicateDishesPopups/index":
                        "pages/diancan-fastfood/components/duplicateDishesPopups/index",
                      "pages/diancan-fastfood/components/fullOfTablePopup-placeholder/index":
                        "pages/diancan-fastfood/components/fullOfTablePopup-placeholder/index",
                      "pages/diancan-fastfood/components/groupRecommend/index":
                        "pages/diancan-fastfood/components/groupRecommend/index",
                      "pages/diancan-fastfood/components/reachAndGiven/mnMode/CollocationMnCartItem":
                        "pages/diancan-fastfood/components/reachAndGiven/mnMode/CollocationMnCartItem",
                      "pages/diancan-fastfood/components/takeout/index":
                        "pages/diancan-fastfood/components/takeout/index",
                      "pages/diancan-fastfood/components/tjDish/popupTJ":
                        "pages/diancan-fastfood/components/tjDish/popupTJ",
                      "pages/diancan-fastfood/components/verifyStudentIdentity-placeholder/index":
                        "pages/diancan-fastfood/components/verifyStudentIdentity-placeholder/index",
                      "pages/diancan-fastfood/components/xiaBuPopup-placeholder/index":
                        "pages/diancan-fastfood/components/xiaBuPopup-placeholder/index",
                      "pages/diancan-fastfood/components/equityCardMnDish-placeholder/index":
                        "pages/diancan-fastfood/components/equityCardMnDish-placeholder/index",
                      "baseComponents/searchComponent/index":
                        "baseComponents/searchComponent/index",
                      "pages/diancan-fastfood/components/dishItem-placeholder/index":
                        "pages/diancan-fastfood/components/dishItem-placeholder/index",
                      "pages/diancan-fastfood/components/assortedDishes/index":
                        "pages/diancan-fastfood/components/assortedDishes/index",
                      "pages/diancan-fastfood/components/increasePriceShop/cumulativeItems":
                        "pages/diancan-fastfood/components/increasePriceShop/cumulativeItems",
                      "pages/diancan-fastfood/components/reachAndGiven/singleModeBox":
                        "pages/diancan-fastfood/components/reachAndGiven/singleModeBox",
                      "pages/dishPopups-comobo-commonPackage/common/vendor":
                        "pages/dishPopups-comobo-commonPackage/common/vendor",
                      "pages/dishPopups-comobo-commonPackage/pizzaCombo/index":
                        "pages/dishPopups-comobo-commonPackage/pizzaCombo/index",
                      "pages/diancan/components/backgroundPage-placeholder/index":
                        "pages/diancan/components/backgroundPage-placeholder/index",
                      "pages/diancan/components/lockScreenSubmitTip-placeholder/index":
                        "pages/diancan/components/lockScreenSubmitTip-placeholder/index",
                      "pages/diancan/common/vendor":
                        "pages/diancan/common/vendor",
                      "pages/diancan/dishes/pageA/dish":
                        "pages/diancan/dishes/pageA/dish",
                      "pages/diancan/components/couponDishPopup/index":
                        "pages/diancan/components/couponDishPopup/index",
                      "pages/diancan/components/hotpotSetmealDishPopup/index":
                        "pages/diancan/components/hotpotSetmealDishPopup/index",
                      "pages/diancan/components/limitNumPoup-placeholder/index":
                        "pages/diancan/components/limitNumPoup-placeholder/index",
                      "pages/ai-waiter-commonPackage/common/vendor":
                        "pages/ai-waiter-commonPackage/common/vendor",
                      "pages/ai-waiter-commonPackage/index":
                        "pages/ai-waiter-commonPackage/index",
                      "pages/diancan/components/dcCartBtn/index":
                        "pages/diancan/components/dcCartBtn/index",
                      "pages/diancan/components/myCoupon-placeholder/myCouponByCart2/index":
                        "pages/diancan/components/myCoupon-placeholder/myCouponByCart2/index",
                      "pages/diancan/components/barrage-placeholder/index":
                        "pages/diancan/components/barrage-placeholder/index",
                      "pages/diancan/components/brokenloading/index":
                        "pages/diancan/components/brokenloading/index",
                      "pages/diancan/components/comeInDIshPagePopup-placeholder/index":
                        "pages/diancan/components/comeInDIshPagePopup-placeholder/index",
                      "pages/diancan/components/evaluateRedbag-placeholder/index":
                        "pages/diancan/components/evaluateRedbag-placeholder/index",
                      "pages/diancan/components/importCustomerCouponsPoup-placeholder/index":
                        "pages/diancan/components/importCustomerCouponsPoup-placeholder/index",
                      "pages/diancan/components/orderPayDishItem/index":
                        "pages/diancan/components/orderPayDishItem/index",
                      "pages/diancan/components/orderprogressFoodDishItem/index":
                        "pages/diancan/components/orderprogressFoodDishItem/index",
                      "pages/diancan/components/removeDishPopup/index":
                        "pages/diancan/components/removeDishPopup/index",
                      "pages/diancan/components/tjDish/index":
                        "pages/diancan/components/tjDish/index",
                      "pages/diancan/components/verifyStudentIdentity-placeholder/index":
                        "pages/diancan/components/verifyStudentIdentity-placeholder/index",
                      "pages/diancan/components/xiaBuPopup-placeholder/index":
                        "pages/diancan/components/xiaBuPopup-placeholder/index",
                      "baseComponents/waidaiWrap/index":
                        "baseComponents/waidaiWrap/index",
                      "baseComponents/wxIndexBar/anchor":
                        "baseComponents/wxIndexBar/anchor",
                      "baseComponents/wxIndexBar/index":
                        "baseComponents/wxIndexBar/index",
                      "baseComponents/dishesComponents/dishBanner/diancan":
                        "baseComponents/dishesComponents/dishBanner/diancan",
                      "pages/diancan/components/dishItem-placeholder/index":
                        "pages/diancan/components/dishItem-placeholder/index",
                      "pages/diancan/components/equityCard-placeholder/index":
                        "pages/diancan/components/equityCard-placeholder/index",
                      "pages/diancan/components/oneMoreOrder/index":
                        "pages/diancan/components/oneMoreOrder/index",
                      "pages/diancan/components/increasePriceShop/cumulativeItems":
                        "pages/diancan/components/increasePriceShop/cumulativeItems",
                      "pages/diancan/components/membershipProgress-placeholder/index":
                        "pages/diancan/components/membershipProgress-placeholder/index",
                      "pages/diancan/dishes/pageB/sideDishsList":
                        "pages/diancan/dishes/pageB/sideDishsList",
                      "pages/diancan/components/myCoupon-placeholder/myCouponInDishBox":
                        "pages/diancan/components/myCoupon-placeholder/myCouponInDishBox",
                      "pages/diancan/components/aiDishPeopleWrap/index":
                        "pages/diancan/components/aiDishPeopleWrap/index",
                      "pages/diancan/components/aiDishWrap/index":
                        "pages/diancan/components/aiDishWrap/index",
                      "pages/diancan/components/assortedDishes/index":
                        "pages/diancan/components/assortedDishes/index",
                      "pages/diancan/components/buffetCountdown/index":
                        "pages/diancan/components/buffetCountdown/index",
                      "pages/diancan/components/cumulativeWrap/index":
                        "pages/diancan/components/cumulativeWrap/index",
                      "pages/diancan/components/hotpotBasePopWrap/index":
                        "pages/diancan/components/hotpotBasePopWrap/index",
                      "pages/diancan/components/hotpotListWrap/index":
                        "pages/diancan/components/hotpotListWrap/index",
                      "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/index":
                        "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/index",
                      "pages/diancan/components/reachAndGiven/singleModeBox":
                        "pages/diancan/components/reachAndGiven/singleModeBox",
                      "pages/diancan/dishes/component/menuAdvertisement":
                        "pages/diancan/dishes/component/menuAdvertisement",
                      "pages/diancan/dishes/component/redPacketsPassword":
                        "pages/diancan/dishes/component/redPacketsPassword",
                      "pages/diancan/dishes/component/reminderInfo/index":
                        "pages/diancan/dishes/component/reminderInfo/index",
                      "pages/diancan/dishes/pageB/categoryTitle":
                        "pages/diancan/dishes/pageB/categoryTitle",
                      "pages/orderImagePosition-commonPackage/BeefMenuGuidancePrompt":
                        "pages/orderImagePosition-commonPackage/BeefMenuGuidancePrompt",
                      "pages/orderImagePosition-commonPackage/index":
                        "pages/orderImagePosition-commonPackage/index",
                      "baseComponents/dishesComponents/dishBanner/index":
                        "baseComponents/dishesComponents/dishBanner/index",
                      "pages/diancan/dishes/pageC/dishSearch":
                        "pages/diancan/dishes/pageC/dishSearch",
                      "pages/diancan/dishes/pageC/sideDishsList":
                        "pages/diancan/dishes/pageC/sideDishsList",
                      "baseComponents/uploadPhone/index":
                        "baseComponents/uploadPhone/index",
                      "pages/diancan/components/cartLeavingMessage-placeholder/index":
                        "pages/diancan/components/cartLeavingMessage-placeholder/index",
                      "pages/diancan/components/duplicateDishesPopups/index":
                        "pages/diancan/components/duplicateDishesPopups/index",
                      "pages/diancan/components/hotpotGroupWrap/index":
                        "pages/diancan/components/hotpotGroupWrap/index",
                      "pages/diancan/components/hotpotItemWrap/index":
                        "pages/diancan/components/hotpotItemWrap/index",
                      "baseComponents/dcComponents/barrage/index":
                        "baseComponents/dcComponents/barrage/index",
                      "baseComponents/dcComponents/lockScreenSubmitTip/index":
                        "baseComponents/dcComponents/lockScreenSubmitTip/index",
                      "pages/diancan/components/cartBottomBtn/index":
                        "pages/diancan/components/cartBottomBtn/index",
                      "pages/diancan/components/increasePriceShop/cumulativePrice":
                        "pages/diancan/components/increasePriceShop/cumulativePrice",
                      "pages/diancan/components/increasePriceShop/dishListOfCart":
                        "pages/diancan/components/increasePriceShop/dishListOfCart",
                      "pages/diancan/components/popupRepeatRegressionDish/index":
                        "pages/diancan/components/popupRepeatRegressionDish/index",
                      "pages/diancan/components/reachAndGiven/cartList":
                        "pages/diancan/components/reachAndGiven/cartList",
                      "pages/diancan/components/cartCouponDishPopup-placeholder/index":
                        "pages/diancan/components/cartCouponDishPopup-placeholder/index",
                      "pages/diancan/components/cartDish/index":
                        "pages/diancan/components/cartDish/index",
                      "pages/diancan/components/cartUpdateCard-placeholder/index":
                        "pages/diancan/components/cartUpdateCard-placeholder/index",
                      "pages/diancan/components/cartYdBottomBtn-placeholder/index":
                        "pages/diancan/components/cartYdBottomBtn-placeholder/index",
                      "pages/diancan/components/changePrimaryCardNo/index":
                        "pages/diancan/components/changePrimaryCardNo/index",
                      "pages/diancan/components/confirmPopup-placeholder/index":
                        "pages/diancan/components/confirmPopup-placeholder/index",
                      "pages/diancan/components/fullOfTablePopup-placeholder/index":
                        "pages/diancan/components/fullOfTablePopup-placeholder/index",
                      "pages/diancan/components/groupRecommend/index":
                        "pages/diancan/components/groupRecommend/index",
                      "pages/diancan/components/startDishesWay/index":
                        "pages/diancan/components/startDishesWay/index",
                      "pages/diancan/components/takeout-placeholder/index":
                        "pages/diancan/components/takeout-placeholder/index",
                      "pages/diancan/components/tjDish/popupTJ":
                        "pages/diancan/components/tjDish/popupTJ",
                      "pages/dishPopups-comobo-commonPackage/stepCombo/index":
                        "pages/dishPopups-comobo-commonPackage/stepCombo/index",
                      "pages/waimaiziti2/components/payAfterPop-placeholder/index":
                        "pages/waimaiziti2/components/payAfterPop-placeholder/index",
                      "pages/waimaiziti2/components/storeItem-placeholder/index":
                        "pages/waimaiziti2/components/storeItem-placeholder/index",
                      "pages/waimaiziti2/common/vendor":
                        "pages/waimaiziti2/common/vendor",
                      "pages/waimaiziti2/components/equityCard-placeholder/index":
                        "pages/waimaiziti2/components/equityCard-placeholder/index",
                      "pages/waimaiziti2/components/equityCardMnDish/index":
                        "pages/waimaiziti2/components/equityCardMnDish/index",
                      "pages/waimaiziti2/components/unpayPage/index":
                        "pages/waimaiziti2/components/unpayPage/index",
                      "baseComponents/addDeBtn/wm":
                        "baseComponents/addDeBtn/wm",
                      "pages/grziti/components/tagActivityBase/index":
                        "pages/grziti/components/tagActivityBase/index",
                      "pages/grziti/components/brokenloading-placeholder/index":
                        "pages/grziti/components/brokenloading-placeholder/index",
                      "pages/grziti/components/gbOrderBase-placeholder/index":
                        "pages/grziti/components/gbOrderBase-placeholder/index",
                      "pages/grziti/components/lockScreenSubmitTip-placeholder/index":
                        "pages/grziti/components/lockScreenSubmitTip-placeholder/index",
                      "pages/grziti/components/multiAvatar-placeholder/index":
                        "pages/grziti/components/multiAvatar-placeholder/index",
                      "pages/grziti/components/payAfterPop-placeholder/index":
                        "pages/grziti/components/payAfterPop-placeholder/index",
                      "baseComponents/dishesComponents/dishBanner/index2":
                        "baseComponents/dishesComponents/dishBanner/index2",
                      "pages/grziti/components/storeAppraise-placeholder/index":
                        "pages/grziti/components/storeAppraise-placeholder/index",
                      "pages/wmzt-storeMes-commonPackage/index":
                        "pages/wmzt-storeMes-commonPackage/index",
                      "pages/grziti/common/vendor":
                        "pages/grziti/common/vendor",
                      "pages/grziti/components/necessityBtn-placeholder/index":
                        "pages/grziti/components/necessityBtn-placeholder/index",
                      "pages/grziti/components/tjDish-placeholder/index":
                        "pages/grziti/components/tjDish-placeholder/index",
                      "pages/grziti/dish/pageA/dish":
                        "pages/grziti/dish/pageA/dish",
                      "pages/grziti/components/backgroundPage-placeholder/index":
                        "pages/grziti/components/backgroundPage-placeholder/index",
                      "pages/grziti/components/bizTypeTab-placeholder/index":
                        "pages/grziti/components/bizTypeTab-placeholder/index",
                      "pages/grziti/components/busyDegree-placeholder/index":
                        "pages/grziti/components/busyDegree-placeholder/index",
                      "pages/grziti/components/dishBannerInfo-placeholder/index":
                        "pages/grziti/components/dishBannerInfo-placeholder/index",
                      "pages/grziti/components/dishTabs-placeholder/index":
                        "pages/grziti/components/dishTabs-placeholder/index",
                      "pages/grziti/components/inBusinessHours-placeholder/index":
                        "pages/grziti/components/inBusinessHours-placeholder/index",
                      "pages/grziti/components/increasePrice-placeholder/popupModel":
                        "pages/grziti/components/increasePrice-placeholder/popupModel",
                      "pages/grziti/components/popForNearestShop/index":
                        "pages/grziti/components/popForNearestShop/index",
                      "pages/grziti/components/reducePriceWrap-placeholder/index":
                        "pages/grziti/components/reducePriceWrap-placeholder/index",
                      "pages/grziti/components/removeDishPopup-placeholder/index":
                        "pages/grziti/components/removeDishPopup-placeholder/index",
                      "pages/grziti/components/storeTopInfo-placeholder/index":
                        "pages/grziti/components/storeTopInfo-placeholder/index",
                      "pages/grziti/components/toGroupBuy-placeholder/index":
                        "pages/grziti/components/toGroupBuy-placeholder/index",
                      "pages/grziti/components/wmCartBtn-placeholder/index":
                        "pages/grziti/components/wmCartBtn-placeholder/index",
                      "pages/wmzt-advSelectTimePopup-commonPackage/index":
                        "pages/wmzt-advSelectTimePopup-commonPackage/index",
                      "pages/grziti/dish/pageB/dish":
                        "pages/grziti/dish/pageB/dish",
                      "pages/grziti/components/myCoupon-placeholder/index":
                        "pages/grziti/components/myCoupon-placeholder/index",
                      "pages/grziti/dish/pageC/dish":
                        "pages/grziti/dish/pageC/dish",
                      "pages/grziti/dish/pageD/dish":
                        "pages/grziti/dish/pageD/dish",
                      "pages/grziti/dish/pageE/dish":
                        "pages/grziti/dish/pageE/dish",
                      "pages/grziti/components/dishTabs-placeholder/pageE":
                        "pages/grziti/components/dishTabs-placeholder/pageE",
                      "baseComponents/stampCollectingPopup/index":
                        "baseComponents/stampCollectingPopup/index",
                      "pages/grziti/components/equityCard-placeholder/index":
                        "pages/grziti/components/equityCard-placeholder/index",
                      "pages/grziti/components/orderProductList-placeholder/index":
                        "pages/grziti/components/orderProductList-placeholder/index",
                      "pages/grziti/components/timeChoose-placeholder/index":
                        "pages/grziti/components/timeChoose-placeholder/index",
                      "pages/grziti/components/authorInOrder/index":
                        "pages/grziti/components/authorInOrder/index",
                      "pages/grziti/components/bottomInfoWrapper-placeholder/index":
                        "pages/grziti/components/bottomInfoWrapper-placeholder/index",
                      "pages/grziti/components/dishesPerPerson-placeholder/index":
                        "pages/grziti/components/dishesPerPerson-placeholder/index",
                      "pages/grziti/components/fullGifts-placeholder/mnMode/CollocationMnCartItem":
                        "pages/grziti/components/fullGifts-placeholder/mnMode/CollocationMnCartItem",
                      "pages/grziti/components/getUserPhone-placeholder/index":
                        "pages/grziti/components/getUserPhone-placeholder/index",
                      "pages/grziti/components/groupRecommend-placeholder/index":
                        "pages/grziti/components/groupRecommend-placeholder/index",
                      "pages/grziti/components/increasePrice-placeholder/cartModel":
                        "pages/grziti/components/increasePrice-placeholder/cartModel",
                      "pages/grziti/components/orderConditionalDishTips-placeholder/index":
                        "pages/grziti/components/orderConditionalDishTips-placeholder/index",
                      "pages/grziti/components/orderMark-placeholder/index":
                        "pages/grziti/components/orderMark-placeholder/index",
                      "pages/grziti/components/pay-placeholder/index":
                        "pages/grziti/components/pay-placeholder/index",
                      "pages/grziti/tyzfPlacehoder/components/rechargeAgreement/index":
                        "pages/grziti/tyzfPlacehoder/components/rechargeAgreement/index",
                      "pages/grziti/tyzfPlacehoder/components/ticUnusedPopup":
                        "pages/grziti/tyzfPlacehoder/components/ticUnusedPopup",
                      "pages/grziti/components/cartBtn-placeholder/index":
                        "pages/grziti/components/cartBtn-placeholder/index",
                      "pages/waimaiziti/components/brokenloading-placeholder/index":
                        "pages/waimaiziti/components/brokenloading-placeholder/index",
                      "pages/waimaiziti/components/gbOrderBase-placeholder/index":
                        "pages/waimaiziti/components/gbOrderBase-placeholder/index",
                      "pages/waimaiziti/components/lockScreenSubmitTip-placeholder/index":
                        "pages/waimaiziti/components/lockScreenSubmitTip-placeholder/index",
                      "pages/waimaiziti/components/multiAvatar-placeholder/index":
                        "pages/waimaiziti/components/multiAvatar-placeholder/index",
                      "pages/waimaiziti/components/payAfterPop-placeholder/index":
                        "pages/waimaiziti/components/payAfterPop-placeholder/index",
                      "pages/waimaiziti/components/storeAppraise-placeholder/index":
                        "pages/waimaiziti/components/storeAppraise-placeholder/index",
                      "pages/waimaiziti/common/vendor":
                        "pages/waimaiziti/common/vendor",
                      "pages/waimaiziti/components/necessityBtn-placeholder/index":
                        "pages/waimaiziti/components/necessityBtn-placeholder/index",
                      "pages/waimaiziti/components/removeDishPopup-placeholder/index":
                        "pages/waimaiziti/components/removeDishPopup-placeholder/index",
                      "pages/waimaiziti/components/tjDish-placeholder/index":
                        "pages/waimaiziti/components/tjDish-placeholder/index",
                      "pages/waimaiziti/grwaimai/dish/pageA/dish":
                        "pages/waimaiziti/grwaimai/dish/pageA/dish",
                      "pages/waimaiziti/components/backgroundPage-placeholder/index":
                        "pages/waimaiziti/components/backgroundPage-placeholder/index",
                      "pages/waimaiziti/components/bizTypeTab-placeholder/index":
                        "pages/waimaiziti/components/bizTypeTab-placeholder/index",
                      "pages/waimaiziti/components/busyDegree-placeholder/index":
                        "pages/waimaiziti/components/busyDegree-placeholder/index",
                      "pages/waimaiziti/components/dishBannerInfo-placeholder/index":
                        "pages/waimaiziti/components/dishBannerInfo-placeholder/index",
                      "pages/waimaiziti/components/dishTabs-placeholder/index":
                        "pages/waimaiziti/components/dishTabs-placeholder/index",
                      "pages/waimaiziti/components/distributionModePopup/index":
                        "pages/waimaiziti/components/distributionModePopup/index",
                      "pages/waimaiziti/components/inBusinessHours-placeholder/index":
                        "pages/waimaiziti/components/inBusinessHours-placeholder/index",
                      "pages/waimaiziti/components/increasePrice-placeholder/popupModel":
                        "pages/waimaiziti/components/increasePrice-placeholder/popupModel",
                      "pages/waimaiziti/components/reducePriceWrap-placeholder/index":
                        "pages/waimaiziti/components/reducePriceWrap-placeholder/index",
                      "pages/waimaiziti/components/storeTopInfo-placeholder/index":
                        "pages/waimaiziti/components/storeTopInfo-placeholder/index",
                      "pages/waimaiziti/components/toGroupBuy-placeholder/index":
                        "pages/waimaiziti/components/toGroupBuy-placeholder/index",
                      "pages/waimaiziti/components/wmCartBtn-placeholder/index":
                        "pages/waimaiziti/components/wmCartBtn-placeholder/index",
                      "pages/waimaiziti/grwaimai/dish/pageB/dish":
                        "pages/waimaiziti/grwaimai/dish/pageB/dish",
                      "pages/waimaiziti/components/myCoupon-placeholder/index":
                        "pages/waimaiziti/components/myCoupon-placeholder/index",
                      "pages/waimaiziti/grwaimai/dish/pageC/dish":
                        "pages/waimaiziti/grwaimai/dish/pageC/dish",
                      "pages/waimaiziti/grwaimai/dish/pageD/dish":
                        "pages/waimaiziti/grwaimai/dish/pageD/dish",
                      "pages/waimaiziti/grwaimai/dish/pageE/dish":
                        "pages/waimaiziti/grwaimai/dish/pageE/dish",
                      "pages/waimaiziti/components/dishTabs-placeholder/pageE":
                        "pages/waimaiziti/components/dishTabs-placeholder/pageE",
                      "pages/waimaiziti/components/carNoPopup/index":
                        "pages/waimaiziti/components/carNoPopup/index",
                      "pages/waimaiziti/components/equityCard-placeholder/index":
                        "pages/waimaiziti/components/equityCard-placeholder/index",
                      "pages/waimaiziti/components/orderProductList-placeholder/index":
                        "pages/waimaiziti/components/orderProductList-placeholder/index",
                      "pages/waimaiziti/components/timeChoose-placeholder/index":
                        "pages/waimaiziti/components/timeChoose-placeholder/index",
                      "pages/waimaiziti/components/addressPopupWrap/index":
                        "pages/waimaiziti/components/addressPopupWrap/index",
                      "pages/waimaiziti/components/bottomInfoWrapper-placeholder/index":
                        "pages/waimaiziti/components/bottomInfoWrapper-placeholder/index",
                      "pages/waimaiziti/components/dishesPerPerson-placeholder/index":
                        "pages/waimaiziti/components/dishesPerPerson-placeholder/index",
                      "pages/waimaiziti/components/fullGifts-placeholder/mnMode/CollocationMnCartItem":
                        "pages/waimaiziti/components/fullGifts-placeholder/mnMode/CollocationMnCartItem",
                      "pages/waimaiziti/components/groupRecommend-placeholder/index":
                        "pages/waimaiziti/components/groupRecommend-placeholder/index",
                      "pages/waimaiziti/components/increasePrice-placeholder/cartModel":
                        "pages/waimaiziti/components/increasePrice-placeholder/cartModel",
                      "pages/waimaiziti/components/orderConditionalDishTips-placeholder/index":
                        "pages/waimaiziti/components/orderConditionalDishTips-placeholder/index",
                      "pages/waimaiziti/components/orderMark-placeholder/index":
                        "pages/waimaiziti/components/orderMark-placeholder/index",
                      "pages/waimaiziti/components/pay-placeholder/index":
                        "pages/waimaiziti/components/pay-placeholder/index",
                      "pages/waimaiziti/tyzfPlacehoder/components/rechargeAgreement/index":
                        "pages/waimaiziti/tyzfPlacehoder/components/rechargeAgreement/index",
                      "pages/waimaiziti/tyzfPlacehoder/components/ticUnusedPopup":
                        "pages/waimaiziti/tyzfPlacehoder/components/ticUnusedPopup",
                      "pages/waimaiziti/components/simpleDishList/index":
                        "pages/waimaiziti/components/simpleDishList/index",
                      "pages/waimaiziti/components/cartBtn-placeholder/index":
                        "pages/waimaiziti/components/cartBtn-placeholder/index",
                      "pages/pj/common/vendor": "pages/pj/common/vendor",
                      "pages/pj/pjHome/components/pjPopups/singleReward/custom":
                        "pages/pj/pjHome/components/pjPopups/singleReward/custom",
                      "pages/pj/pjHome/components/pjPopups/singleReward/default":
                        "pages/pj/pjHome/components/pjPopups/singleReward/default",
                      "pages/pj/pjHome/components/pjPopups/threeChooseOneReward/custom":
                        "pages/pj/pjHome/components/pjPopups/threeChooseOneReward/custom",
                      "pages/pj/pjHome/components/pjPopups/threeChooseOneReward/default":
                        "pages/pj/pjHome/components/pjPopups/threeChooseOneReward/default",
                      "pages/pj/pjHome/components/evaluateRedbag-placeholder/index":
                        "pages/pj/pjHome/components/evaluateRedbag-placeholder/index",
                      "pages/pj/pjHome/components/pjChoiceQuestion/index":
                        "pages/pj/pjHome/components/pjChoiceQuestion/index",
                      "pages/pj/pjHome/components/pjDialog/index":
                        "pages/pj/pjHome/components/pjDialog/index",
                      "pages/pj/pjHome/components/pjDishScore/index":
                        "pages/pj/pjHome/components/pjDishScore/index",
                      "pages/pj/pjHome/components/pjFavouriteDish/index":
                        "pages/pj/pjHome/components/pjFavouriteDish/index",
                      "pages/pj/pjHome/components/pjLeadWords/index":
                        "pages/pj/pjHome/components/pjLeadWords/index",
                      "pages/pj/pjHome/components/pjNPS/index":
                        "pages/pj/pjHome/components/pjNPS/index",
                      "pages/pj/pjHome/components/pjPopups/luckyReward/index":
                        "pages/pj/pjHome/components/pjPopups/luckyReward/index",
                      "pages/pj/pjHome/components/pjPopups/receiveReward/index":
                        "pages/pj/pjHome/components/pjPopups/receiveReward/index",
                      "pages/pj/pjHome/components/pjStars/index":
                        "pages/pj/pjHome/components/pjStars/index",
                      "pages/pj/pjHome/components/pjUploadImg/index":
                        "pages/pj/pjHome/components/pjUploadImg/index",
                      "pages/pj/pjHome/components/textarea/index":
                        "pages/pj/pjHome/components/textarea/index",
                      "pages/pj/pjHome/templateB": "pages/pj/pjHome/templateB",
                      "baseComponents/rateStar/index":
                        "baseComponents/rateStar/index",
                      "pages/pd/components/mcInfo/index":
                        "pages/pd/components/mcInfo/index",
                      "pages/pd/common/vendor": "pages/pd/common/vendor",
                      "pages/pd/components/tableGroupPopup-placeholder/index":
                        "pages/pd/components/tableGroupPopup-placeholder/index",
                      "pages/pd/components/mcQueueState/index":
                        "pages/pd/components/mcQueueState/index",
                      "pages/pd/components/peopleNumPoup/index":
                        "pages/pd/components/peopleNumPoup/index",
                      "pages/pd/components/tableInfo/index":
                        "pages/pd/components/tableInfo/index",
                      "pages/pd/components/peopleNumPoup_66331/index":
                        "pages/pd/components/peopleNumPoup_66331/index",
                      "pages/pd/components/becomeVip/index":
                        "pages/pd/components/becomeVip/index",
                      "pages/pd/components/confirmPoup/index":
                        "pages/pd/components/confirmPoup/index",
                      "pages/pd/components/waitInfo/index":
                        "pages/pd/components/waitInfo/index",
                      "pages/pd/components/confirmPoup_66331/index":
                        "pages/pd/components/confirmPoup_66331/index",
                      "pages/pay/tyzfPlacehoder/components/rechargeAgreement/index":
                        "pages/pay/tyzfPlacehoder/components/rechargeAgreement/index",
                      "pages/pay/xf/becomeVip": "pages/pay/xf/becomeVip",
                      "pages/pay/xf/inputMoney": "pages/pay/xf/inputMoney",
                      "pages/pay/xf/payBase_xf": "pages/pay/xf/payBase_xf",
                      "pages/pay/common/vendor": "pages/pay/common/vendor",
                      "pages/pay/components/onlinePay/index":
                        "pages/pay/components/onlinePay/index",
                      "pages/pay/components/xinyi/changeMemberDialog":
                        "pages/pay/components/xinyi/changeMemberDialog",
                      "pages/pay/components/xinyi/index":
                        "pages/pay/components/xinyi/index",
                      "pages/pay/components/tablePay/index":
                        "pages/pay/components/tablePay/index",
                      "pages/pay/components/tablePay/payTips":
                        "pages/pay/components/tablePay/payTips",
                      "pages/giftcard/components/giftCardTheme/index":
                        "pages/giftcard/components/giftCardTheme/index",
                      "pages/giftcard/components/tabbar/index":
                        "pages/giftcard/components/tabbar/index",
                      "pages/giftcard/components/topRegion/index":
                        "pages/giftcard/components/topRegion/index",
                      "pages/giftcard/components/commonPopup/bindCardPopup":
                        "pages/giftcard/components/commonPopup/bindCardPopup",
                      "pages/giftcard/components/commonPopup/commonModal":
                        "pages/giftcard/components/commonPopup/commonModal",
                      "pages/giftcard/components/giftList/index":
                        "pages/giftcard/components/giftList/index",
                      "pages/giftcard/components/themeGreet/index":
                        "pages/giftcard/components/themeGreet/index",
                      "pages/giftcard/chooseStorePopup":
                        "pages/giftcard/chooseStorePopup",
                      "baseComponents/identificationMc/index":
                        "baseComponents/identificationMc/index",
                      "pages/system/components/mall-dragPic/mall-dragPic":
                        "pages/system/components/mall-dragPic/mall-dragPic",
                      "pages/system/storeList/commponent/storeList":
                        "pages/system/storeList/commponent/storeList",
                      "pages/passwordRedbag/components/redEnvelopeReward":
                        "pages/passwordRedbag/components/redEnvelopeReward",
                      "pages/passwordRedbag/components/doATask":
                        "pages/passwordRedbag/components/doATask",
                      "pages/passwordRedbag/components/share":
                        "pages/passwordRedbag/components/share",
                      "pages/mescroll-uni-commonPackage/common/vendor":
                        "pages/mescroll-uni-commonPackage/common/vendor",
                      "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-uni":
                        "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-uni",
                      "pages/blindBox/components/Barrage":
                        "pages/blindBox/components/Barrage",
                      "pages/blindBox/components/recordComponent":
                        "pages/blindBox/components/recordComponent",
                      "pages/blindBox/components/blindDetail":
                        "pages/blindBox/components/blindDetail",
                      "baseComponents/wxpopup/overlay":
                        "baseComponents/wxpopup/overlay",
                      "pages/tabbar-commonPackage/tabbarWrap":
                        "pages/tabbar-commonPackage/tabbarWrap",
                      "pages/advertComponents-commonPackage/common/vendor":
                        "pages/advertComponents-commonPackage/common/vendor",
                      "pages/advertComponents-commonPackage/advertScheme":
                        "pages/advertComponents-commonPackage/advertScheme",
                      "pages/advertComponents-commonPackage/bounceBall":
                        "pages/advertComponents-commonPackage/bounceBall",
                      "pages/advertComponents-commonPackage/fouraRow":
                        "pages/advertComponents-commonPackage/fouraRow",
                      "pages/advertComponents-commonPackage/longSwipe/index":
                        "pages/advertComponents-commonPackage/longSwipe/index",
                      "pages/advertComponents-commonPackage/swipe":
                        "pages/advertComponents-commonPackage/swipe",
                      "pages/advertComponents-commonPackage/upOneDownTwo":
                        "pages/advertComponents-commonPackage/upOneDownTwo",
                      "pages/advertComponents-commonPackage/upTwoDownTwo":
                        "pages/advertComponents-commonPackage/upTwoDownTwo",
                      "baseComponents/officalAccount/mini":
                        "baseComponents/officalAccount/mini",
                      "baseComponents/officalAccount/mini2":
                        "baseComponents/officalAccount/mini2",
                      "pages/cardhome/components/mcExpirationReminder/components/PopupWindow":
                        "pages/cardhome/components/mcExpirationReminder/components/PopupWindow",
                      "pages/cardhome/components/memberBirthdayReminder/components/BirthdayCakeAnimation":
                        "pages/cardhome/components/memberBirthdayReminder/components/BirthdayCakeAnimation",
                      "pages/cardhome/components/memberBirthdayReminder/components/customGiftPup":
                        "pages/cardhome/components/memberBirthdayReminder/components/customGiftPup",
                      "pages/cardhome/components/memberBirthdayReminder/components/customRemind":
                        "pages/cardhome/components/memberBirthdayReminder/components/customRemind",
                      "pages/cardhome/components/memberBirthdayReminder/components/redEnvelopes":
                        "pages/cardhome/components/memberBirthdayReminder/components/redEnvelopes",
                      "pages/cardhome/components/relegationPlan":
                        "pages/cardhome/components/relegationPlan",
                      "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-body":
                        "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-body",
                      "pages/keyBoard-commonPackage/index":
                        "pages/keyBoard-commonPackage/index",
                      "pages/cardhome/card/buyTicketHistory/ticketPopup/components/popupFrame":
                        "pages/cardhome/card/buyTicketHistory/ticketPopup/components/popupFrame",
                      "pages/cardhome/card/buyTicketHistory/ticketPopup/components/ticketItem":
                        "pages/cardhome/card/buyTicketHistory/ticketPopup/components/ticketItem",
                      "pages/order/otherOrder/components/refundPopup":
                        "pages/order/otherOrder/components/refundPopup",
                      "pages/order/components/diancanOrder/jiezhangOrder":
                        "pages/order/components/diancanOrder/jiezhangOrder",
                      "pages/order/components/diancanOrder/waidaiOrder":
                        "pages/order/components/diancanOrder/waidaiOrder",
                      "pages/order/components/diancanOrder/yudianOrder":
                        "pages/order/components/diancanOrder/yudianOrder",
                      "pages/order/components/diancanOrder/dianOrder":
                        "pages/order/components/diancanOrder/dianOrder",
                      "pages/order/components/diancanOrder/unOrder":
                        "pages/order/components/diancanOrder/unOrder",
                      "pages/order/components/shangchengOrder/item/noPayItem":
                        "pages/order/components/shangchengOrder/item/noPayItem",
                      "pages/order/components/shangchengOrder/item/alSendItem":
                        "pages/order/components/shangchengOrder/item/alSendItem",
                      "pages/order/components/shangchengOrder/item/closedItem":
                        "pages/order/components/shangchengOrder/item/closedItem",
                      "pages/order/components/shangchengOrder/item/noSendItem":
                        "pages/order/components/shangchengOrder/item/noSendItem",
                      "pages/order/components/shangchengOrder/item/refundItem":
                        "pages/order/components/shangchengOrder/item/refundItem",
                      "pages/order/components/shangchengOrder/item/successItem":
                        "pages/order/components/shangchengOrder/item/successItem",
                      "pages/order/components/waimaiOrder/orderItem":
                        "pages/order/components/waimaiOrder/orderItem",
                      "pages/order/components/servicesNotice/index":
                        "pages/order/components/servicesNotice/index",
                      "pages/order/components/busyDegree/index":
                        "pages/order/components/busyDegree/index",
                      "pages/order/waimaiOrder/waimaiDetail/dishList":
                        "pages/order/waimaiOrder/waimaiDetail/dishList",
                      "pages/order/waimaiOrder/waimaiDetail/groupBuy":
                        "pages/order/waimaiOrder/waimaiDetail/groupBuy",
                      "pages/order/waimaiOrder/waimaiDetail/orderSteps":
                        "pages/order/waimaiOrder/waimaiDetail/orderSteps",
                      "baseComponents/addDeBtn/inputNum":
                        "baseComponents/addDeBtn/inputNum",
                      "baseComponents/orderNotice/mcMsgPopup":
                        "baseComponents/orderNotice/mcMsgPopup",
                      "baseComponents/orderNotice/orderNoticePopup":
                        "baseComponents/orderNotice/orderNoticePopup",
                      "pages/jfsc/components/jfItemLayout/productItem":
                        "pages/jfsc/components/jfItemLayout/productItem",
                      "pages/jfsc/jfscHome/pageE/components/jfItemLayoutTs/productItem":
                        "pages/jfsc/jfscHome/pageE/components/jfItemLayoutTs/productItem",
                      "pages/diancan2/components/swiperDot/index":
                        "pages/diancan2/components/swiperDot/index",
                      "pages/diancan2/components/tablePayOrderItems-placeholder/index":
                        "pages/diancan2/components/tablePayOrderItems-placeholder/index",
                      "pages/diancan2/components/tablePayOrderItems-placeholder/payOrder":
                        "pages/diancan2/components/tablePayOrderItems-placeholder/payOrder",
                      "pages/diancan2/components/mnItemsModel-placeholder/index":
                        "pages/diancan2/components/mnItemsModel-placeholder/index",
                      "pages/collectCardBox-commonPackage/index":
                        "pages/collectCardBox-commonPackage/index",
                      "baseComponents/dishPopupsWrap/dpWrap/index":
                        "baseComponents/dishPopupsWrap/dpWrap/index",
                      "baseComponents/dishPopupsWrap/tcWrap/index":
                        "baseComponents/dishPopupsWrap/tcWrap/index",
                      "pages/giveCollectCardBox-commonPackage/index":
                        "pages/giveCollectCardBox-commonPackage/index",
                      "pages/redbag-commonPackage/index":
                        "pages/redbag-commonPackage/index",
                      "pages/treasureBox-commonPackage/index":
                        "pages/treasureBox-commonPackage/index",
                      "baseComponents/wxIndexBar/anchor2":
                        "baseComponents/wxIndexBar/anchor2",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponInDishBox":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponInDishBox",
                      "pages/diancan-fastfood/dishes/component/equityCardDishItem/index":
                        "pages/diancan-fastfood/dishes/component/equityCardDishItem/index",
                      "pages/diancan-fastfood/components/membershipProgress-placeholder/index":
                        "pages/diancan-fastfood/components/membershipProgress-placeholder/index",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/index":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/index",
                      "pages/diancan-fastfood/components/oneMoreOrder/index":
                        "pages/diancan-fastfood/components/oneMoreOrder/index",
                      "pages/diancan-fastfood/dishes/component/menuAdvertisement":
                        "pages/diancan-fastfood/dishes/component/menuAdvertisement",
                      "pages/diancan-fastfood/dishes/component/redPacketsPassword":
                        "pages/diancan-fastfood/dishes/component/redPacketsPassword",
                      "pages/diancan-fastfood/dishes/pageB/categoryTitle":
                        "pages/diancan-fastfood/dishes/pageB/categoryTitle",
                      "pages/diancan-fastfood/dishes/pageB/sideDishsList":
                        "pages/diancan-fastfood/dishes/pageB/sideDishsList",
                      "baseComponents/cartAnimation/index":
                        "baseComponents/cartAnimation/index",
                      "baseComponents/cartBtn/index":
                        "baseComponents/cartBtn/index",
                      "pages/diancan-fastfood/components/cartPopup/index":
                        "pages/diancan-fastfood/components/cartPopup/index",
                      "pages/diancan-fastfood/components/dcCartBtn/confirmOrderPopup":
                        "pages/diancan-fastfood/components/dcCartBtn/confirmOrderPopup",
                      "baseComponents/wxpopup/popupType2":
                        "baseComponents/wxpopup/popupType2",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/meituan":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/meituan",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/tiktok":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/thirdPartyCoupons/tiktok",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/discountMutuallyExclusivePopup":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/discountMutuallyExclusivePopup",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/selectDishpopup":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/selectDishpopup",
                      "pages/diancan-fastfood/components/removeDishPopup/delDishItem":
                        "pages/diancan-fastfood/components/removeDishPopup/delDishItem",
                      "pages/questionnairePopup-commonPackage/index":
                        "pages/questionnairePopup-commonPackage/index",
                      "baseComponents/tyzf/components/changeCard":
                        "baseComponents/tyzf/components/changeCard",
                      "pages/diancan-fastfood/tyzfFastFood/view/ticket":
                        "pages/diancan-fastfood/tyzfFastFood/view/ticket",
                      "pages/diancan-fastfood/tyzfFastFood/components/giftChange":
                        "pages/diancan-fastfood/tyzfFastFood/components/giftChange",
                      "pages/diancan-fastfood/tyzfFastFood/view/ruleRecharge":
                        "pages/diancan-fastfood/tyzfFastFood/view/ruleRecharge",
                      "pages/diancan-fastfood/tyzfFastFood/view/tiktok":
                        "pages/diancan-fastfood/tyzfFastFood/view/tiktok",
                      "pages/diancan-fastfood/tyzfFastFood/view/alipay":
                        "pages/diancan-fastfood/tyzfFastFood/view/alipay",
                      "pages/diancan-fastfood/tyzfFastFood/view/meituanTicket":
                        "pages/diancan-fastfood/tyzfFastFood/view/meituanTicket",
                      "pages/diancan-fastfood/components/payAfterPop-placeholder/index":
                        "pages/diancan-fastfood/components/payAfterPop-placeholder/index",
                      "pages/diancan-fastfood/tyzfFastFood/view/erase":
                        "pages/diancan-fastfood/tyzfFastFood/view/erase",
                      "pages/diancan-fastfood/tyzfFastFood/view/integral":
                        "pages/diancan-fastfood/tyzfFastFood/view/integral",
                      "pages/diancan-fastfood/tyzfFastFood/view/memberCard":
                        "pages/diancan-fastfood/tyzfFastFood/view/memberCard",
                      "pages/diancan-fastfood/tyzfFastFood/view/payhuis":
                        "pages/diancan-fastfood/tyzfFastFood/view/payhuis",
                      "pages/diancan-fastfood/tyzfFastFood/view/ticUnusedPopup":
                        "pages/diancan-fastfood/tyzfFastFood/view/ticUnusedPopup",
                      "pages/diancan-fastfood/components/increasePriceShop/dishItem":
                        "pages/diancan-fastfood/components/increasePriceShop/dishItem",
                      "pages/diancan-fastfood/components/reachAndGiven/mnMode/index":
                        "pages/diancan-fastfood/components/reachAndGiven/mnMode/index",
                      "pages/diancan-fastfood/components/reachAndGiven/singleModeOfcartPageB":
                        "pages/diancan-fastfood/components/reachAndGiven/singleModeOfcartPageB",
                      "pages/diancan-fastfood/components/reachAndGiven/combinationModeOfCart":
                        "pages/diancan-fastfood/components/reachAndGiven/combinationModeOfCart",
                      "pages/diancan-fastfood/components/reachAndGiven/mnMode/MnCartItem":
                        "pages/diancan-fastfood/components/reachAndGiven/mnMode/MnCartItem",
                      "pages/diancan-fastfood/components/bottomInfoWrapper-placeholder/index":
                        "pages/diancan-fastfood/components/bottomInfoWrapper-placeholder/index",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index",
                      "pages/diancan-fastfood/components/confirmPopup-placeholder/dishesDetails":
                        "pages/diancan-fastfood/components/confirmPopup-placeholder/dishesDetails",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/exChangeDc":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/exChangeDc",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/fullGift":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/fullGift",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout1":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout1",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout11":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout11",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout13":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout13",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout14":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout14",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout15":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout15",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout16":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout16",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout17":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout17",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout2":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout2",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout22":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout22",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout3":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout3",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout4":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout4",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout5":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout5",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout6":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout6",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout7":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout7",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout8":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout8",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout9":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/layout9",
                      "pages/diancan-fastfood/dishes/component/dishItem":
                        "pages/diancan-fastfood/dishes/component/dishItem",
                      "pages/diancan-fastfood/components/reachAndGiven/singleMode":
                        "pages/diancan-fastfood/components/reachAndGiven/singleMode",
                      "baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index":
                        "baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index",
                      "baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index":
                        "baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index",
                      "pages/dishPopups-comobo-commonPackage/component/BottomBtn":
                        "pages/dishPopups-comobo-commonPackage/component/BottomBtn",
                      "pages/dishPopups-comobo-commonPackage/component/ComboGroup":
                        "pages/dishPopups-comobo-commonPackage/component/ComboGroup",
                      "pages/dishPopups-comobo-commonPackage/component/SelectedDish":
                        "pages/dishPopups-comobo-commonPackage/component/SelectedDish",
                      "pages/dishPopups-comobo-commonPackage/component/Steps":
                        "pages/dishPopups-comobo-commonPackage/component/Steps",
                      "pages/dishPopups-comobo-commonPackage/pizzaCombo/component/PizzaSwiper":
                        "pages/dishPopups-comobo-commonPackage/pizzaCombo/component/PizzaSwiper",
                      "pages/diancan/dishes/pageA/sideDishsList":
                        "pages/diancan/dishes/pageA/sideDishsList",
                      "pages/dishPopups-tc-pop-imgTextModel-commonPackage/index":
                        "pages/dishPopups-tc-pop-imgTextModel-commonPackage/index",
                      "pages/hotpot-commonPackage/hotpotPopupStyle/index":
                        "pages/hotpot-commonPackage/hotpotPopupStyle/index",
                      "pages/ai-waiter-commonPackage/components/ChatArea":
                        "pages/ai-waiter-commonPackage/components/ChatArea",
                      "pages/ai-waiter-commonPackage/components/ChatBottom":
                        "pages/ai-waiter-commonPackage/components/ChatBottom",
                      "pages/ai-waiter-commonPackage/components/MovableEnter":
                        "pages/ai-waiter-commonPackage/components/MovableEnter",
                      "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/meituan":
                        "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/meituan",
                      "pages/diancan/components/myCoupon-placeholder/couponForDetails":
                        "pages/diancan/components/myCoupon-placeholder/couponForDetails",
                      "pages/diancan/components/myCoupon-placeholder/discountMutuallyExclusivePopup":
                        "pages/diancan/components/myCoupon-placeholder/discountMutuallyExclusivePopup",
                      "pages/diancan/components/myCoupon-placeholder/myCouponByCart2/components/CrmCoupon":
                        "pages/diancan/components/myCoupon-placeholder/myCouponByCart2/components/CrmCoupon",
                      "pages/diancan/components/myCoupon-placeholder/selectDishpopup":
                        "pages/diancan/components/myCoupon-placeholder/selectDishpopup",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout1":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout1",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout2":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout2",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout3":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout3",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout4":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout4",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout6":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout6",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout7":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout7",
                      "pages/diancan/components/dishItemComponents-placeholder/exChangeDc":
                        "pages/diancan/components/dishItemComponents-placeholder/exChangeDc",
                      "pages/diancan/components/dishItemComponents-placeholder/exChangeDc2":
                        "pages/diancan/components/dishItemComponents-placeholder/exChangeDc2",
                      "pages/diancan/components/dishItemComponents-placeholder/fullGift":
                        "pages/diancan/components/dishItemComponents-placeholder/fullGift",
                      "pages/diancan/components/dishItemComponents-placeholder/layout1":
                        "pages/diancan/components/dishItemComponents-placeholder/layout1",
                      "pages/diancan/components/dishItemComponents-placeholder/layout11":
                        "pages/diancan/components/dishItemComponents-placeholder/layout11",
                      "pages/diancan/components/dishItemComponents-placeholder/layout13":
                        "pages/diancan/components/dishItemComponents-placeholder/layout13",
                      "pages/diancan/components/dishItemComponents-placeholder/layout14":
                        "pages/diancan/components/dishItemComponents-placeholder/layout14",
                      "pages/diancan/components/dishItemComponents-placeholder/layout15":
                        "pages/diancan/components/dishItemComponents-placeholder/layout15",
                      "pages/diancan/components/dishItemComponents-placeholder/layout16":
                        "pages/diancan/components/dishItemComponents-placeholder/layout16",
                      "pages/diancan/components/dishItemComponents-placeholder/layout17":
                        "pages/diancan/components/dishItemComponents-placeholder/layout17",
                      "pages/diancan/components/dishItemComponents-placeholder/layout2":
                        "pages/diancan/components/dishItemComponents-placeholder/layout2",
                      "pages/diancan/components/dishItemComponents-placeholder/layout20":
                        "pages/diancan/components/dishItemComponents-placeholder/layout20",
                      "pages/diancan/components/dishItemComponents-placeholder/layout21":
                        "pages/diancan/components/dishItemComponents-placeholder/layout21",
                      "pages/diancan/components/dishItemComponents-placeholder/layout22":
                        "pages/diancan/components/dishItemComponents-placeholder/layout22",
                      "pages/diancan/components/dishItemComponents-placeholder/layout3":
                        "pages/diancan/components/dishItemComponents-placeholder/layout3",
                      "pages/diancan/components/dishItemComponents-placeholder/layout4":
                        "pages/diancan/components/dishItemComponents-placeholder/layout4",
                      "pages/diancan/components/dishItemComponents-placeholder/layout5":
                        "pages/diancan/components/dishItemComponents-placeholder/layout5",
                      "pages/diancan/components/dishItemComponents-placeholder/layout6":
                        "pages/diancan/components/dishItemComponents-placeholder/layout6",
                      "pages/diancan/components/dishItemComponents-placeholder/layout7":
                        "pages/diancan/components/dishItemComponents-placeholder/layout7",
                      "pages/diancan/components/dishItemComponents-placeholder/layout8":
                        "pages/diancan/components/dishItemComponents-placeholder/layout8",
                      "pages/diancan/components/dishItemComponents-placeholder/layout9":
                        "pages/diancan/components/dishItemComponents-placeholder/layout9",
                      "pages/diancan/components/myCoupon-placeholder/myCouponInDish":
                        "pages/diancan/components/myCoupon-placeholder/myCouponInDish",
                      "pages/aiDishPeople-commonPackage/index":
                        "pages/aiDishPeople-commonPackage/index",
                      "pages/aiDish-commonPackage/index":
                        "pages/aiDish-commonPackage/index",
                      "pages/diancan/dishes/component/dishItem":
                        "pages/diancan/dishes/component/dishItem",
                      "pages/hotpot-commonPackage/common/vendor":
                        "pages/hotpot-commonPackage/common/vendor",
                      "pages/hotpot-commonPackage/hotpotBasePop/index":
                        "pages/hotpot-commonPackage/hotpotBasePop/index",
                      "pages/diancan/components/hotpotWrapPlaceholder/index":
                        "pages/diancan/components/hotpotWrapPlaceholder/index",
                      "pages/hotpot-commonPackage/hotpotList/index":
                        "pages/hotpot-commonPackage/hotpotList/index",
                      "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/tiktok":
                        "pages/diancan/components/myCoupon-placeholder/thirdPartyCoupons/tiktok",
                      "pages/diancan/components/reachAndGiven/mnMode/index":
                        "pages/diancan/components/reachAndGiven/mnMode/index",
                      "pages/diancan/components/reachAndGiven/singleMode":
                        "pages/diancan/components/reachAndGiven/singleMode",
                      "pages/diancan/dishes/component/redPacketsPasswordPoup":
                        "pages/diancan/dishes/component/redPacketsPasswordPoup",
                      "pages/orderImagePosition-commonPackage/IndexContent":
                        "pages/orderImagePosition-commonPackage/IndexContent",
                      "pages/hotpot-commonPackage/hotpotGroup/index":
                        "pages/hotpot-commonPackage/hotpotGroup/index",
                      "pages/hotpot-commonPackage/hotpotItem/index":
                        "pages/hotpot-commonPackage/hotpotItem/index",
                      "pages/diancan/components/increasePriceShop/dishItem":
                        "pages/diancan/components/increasePriceShop/dishItem",
                      "pages/diancan/components/reachAndGiven/singleModeOfcart":
                        "pages/diancan/components/reachAndGiven/singleModeOfcart",
                      "pages/diancan/components/reachAndGiven/combinationModeOfCart":
                        "pages/diancan/components/reachAndGiven/combinationModeOfCart",
                      "pages/diancan/components/reachAndGiven/mnMode/CollocationMnCartItem":
                        "pages/diancan/components/reachAndGiven/mnMode/CollocationMnCartItem",
                      "pages/diancan/components/reachAndGiven/mnMode/MnCartItem":
                        "pages/diancan/components/reachAndGiven/mnMode/MnCartItem",
                      "pages/diancan/components/confirmPopup-placeholder/dishesDetails":
                        "pages/diancan/components/confirmPopup-placeholder/dishesDetails",
                      "pages/dishPopups-comobo-commonPackage/stepCombo/component/BottomBtn":
                        "pages/dishPopups-comobo-commonPackage/stepCombo/component/BottomBtn",
                      "pages/waimaiziti2/components/pay-placeholder/index":
                        "pages/waimaiziti2/components/pay-placeholder/index",
                      "pages/waimaiziti2/tyzfPlacehoder/components/ticUnusedPopup":
                        "pages/waimaiziti2/tyzfPlacehoder/components/ticUnusedPopup",
                      "pages/grziti/components/gbOrderBase-placeholder/errorTips/index":
                        "pages/grziti/components/gbOrderBase-placeholder/errorTips/index",
                      "pages/grziti/components/orderState-placeholder/index":
                        "pages/grziti/components/orderState-placeholder/index",
                      "baseComponents/dishesComponents/dishBanner/components/storeLayout5":
                        "baseComponents/dishesComponents/dishBanner/components/storeLayout5",
                      "pages/wmzt-qualification-commonPackage/index":
                        "pages/wmzt-qualification-commonPackage/index",
                      "pages/grziti/components/dishItem-placeholder/index":
                        "pages/grziti/components/dishItem-placeholder/index",
                      "baseComponents/myCoupon/index":
                        "baseComponents/myCoupon/index",
                      "pages/grziti/components/sideDishsList-placeholder/pageA/index":
                        "pages/grziti/components/sideDishsList-placeholder/pageA/index",
                      "pages/grziti/components/couponDishPopup-placeholder/index":
                        "pages/grziti/components/couponDishPopup-placeholder/index",
                      "pages/grziti/components/fullGifts-placeholder/fullGiftList":
                        "pages/grziti/components/fullGifts-placeholder/fullGiftList",
                      "pages/grziti/components/healthOrderTip-placeholder/index":
                        "pages/grziti/components/healthOrderTip-placeholder/index",
                      "pages/grziti/components/increasePrice-placeholder/increaseDishList":
                        "pages/grziti/components/increasePrice-placeholder/increaseDishList",
                      "pages/grziti/components/increasePrice-placeholder/index":
                        "pages/grziti/components/increasePrice-placeholder/index",
                      "pages/grziti/components/storeItem-placeholder/index":
                        "pages/grziti/components/storeItem-placeholder/index",
                      "pages/wmzt-reducePrice-commonPackage/index":
                        "pages/wmzt-reducePrice-commonPackage/index",
                      "pages/wmzt-reducePrice-commonPackage/bottomTextOfCart":
                        "pages/wmzt-reducePrice-commonPackage/bottomTextOfCart",
                      "pages/wmzt-removeDishPopup-commonPackage/index":
                        "pages/wmzt-removeDishPopup-commonPackage/index",
                      "pages/grziti/components/shoppingCartPopup-placeholder/index":
                        "pages/grziti/components/shoppingCartPopup-placeholder/index",
                      "pages/wmzt-advSelectTimePopup-commonPackage/common/vendor":
                        "pages/wmzt-advSelectTimePopup-commonPackage/common/vendor",
                      "pages/wmzt-advSelectTimePopup-commonPackage/timeChoose-placeholder/index":
                        "pages/wmzt-advSelectTimePopup-commonPackage/timeChoose-placeholder/index",
                      "pages/grziti/components/equityCardDishItem-placeholder/index":
                        "pages/grziti/components/equityCardDishItem-placeholder/index",
                      "pages/grziti/components/sideDishsList-placeholder/pageB/index":
                        "pages/grziti/components/sideDishsList-placeholder/pageB/index",
                      "pages/grziti/components/activityEntry-placeholder/index":
                        "pages/grziti/components/activityEntry-placeholder/index",
                      "pages/grziti/dish/pageB/categoryTitle":
                        "pages/grziti/dish/pageB/categoryTitle",
                      "pages/wmzt-redPacketsPassword-commonPackage/index":
                        "pages/wmzt-redPacketsPassword-commonPackage/index",
                      "pages/grziti/components/myCoupon-placeholder/myCouponWrap":
                        "pages/grziti/components/myCoupon-placeholder/myCouponWrap",
                      "pages/grziti/components/sideDishsList-placeholder/pageC/index":
                        "pages/grziti/components/sideDishsList-placeholder/pageC/index",
                      "pages/grziti/components/sideDishsList-placeholder/pageD/index":
                        "pages/grziti/components/sideDishsList-placeholder/pageD/index",
                      "pages/grziti/components/sideDishsList-placeholder/pageE/index":
                        "pages/grziti/components/sideDishsList-placeholder/pageE/index",
                      "pages/grziti/components/dishCartItem-placeholder/index":
                        "pages/grziti/components/dishCartItem-placeholder/index",
                      "pages/grziti/components/dishCartItem-placeholder/mnDish":
                        "pages/grziti/components/dishCartItem-placeholder/mnDish",
                      "pages/grziti/components/timeChoose-placeholder/timeChooseNew/index":
                        "pages/grziti/components/timeChoose-placeholder/timeChooseNew/index",
                      "pages/grziti/components/increasePrice-placeholder/dishItem/index":
                        "pages/grziti/components/increasePrice-placeholder/dishItem/index",
                      "pages/grziti/components/increasePrice-placeholder/dishItem/style2":
                        "pages/grziti/components/increasePrice-placeholder/dishItem/style2",
                      "pages/grziti/components/pay-placeholder/becomeVip":
                        "pages/grziti/components/pay-placeholder/becomeVip",
                      "pages/grziti/components/pay-placeholder/payBase_wm":
                        "pages/grziti/components/pay-placeholder/payBase_wm",
                      "pages/grziti/tyzfPlacehoder/components/rechargeAgreement/agreementPopup":
                        "pages/grziti/tyzfPlacehoder/components/rechargeAgreement/agreementPopup",
                      "pages/grziti/components/cartPopup-placeholder/index":
                        "pages/grziti/components/cartPopup-placeholder/index",
                      "pages/waimaiziti/components/gbOrderBase-placeholder/errorTips/index":
                        "pages/waimaiziti/components/gbOrderBase-placeholder/errorTips/index",
                      "pages/waimaiziti/components/orderState-placeholder/index":
                        "pages/waimaiziti/components/orderState-placeholder/index",
                      "pages/waimaiziti/components/dishItem-placeholder/index":
                        "pages/waimaiziti/components/dishItem-placeholder/index",
                      "pages/waimaiziti/components/sideDishsList-placeholder/pageA/index":
                        "pages/waimaiziti/components/sideDishsList-placeholder/pageA/index",
                      "pages/waimaiziti/components/couponDishPopup-placeholder/index":
                        "pages/waimaiziti/components/couponDishPopup-placeholder/index",
                      "pages/waimaiziti/components/fullGifts-placeholder/fullGiftList":
                        "pages/waimaiziti/components/fullGifts-placeholder/fullGiftList",
                      "pages/waimaiziti/components/healthOrderTip-placeholder/index":
                        "pages/waimaiziti/components/healthOrderTip-placeholder/index",
                      "pages/waimaiziti/components/increasePrice-placeholder/increaseDishList":
                        "pages/waimaiziti/components/increasePrice-placeholder/increaseDishList",
                      "pages/waimaiziti/components/increasePrice-placeholder/index":
                        "pages/waimaiziti/components/increasePrice-placeholder/index",
                      "pages/waimaiziti/components/shoppingCartPopup-placeholder/index":
                        "pages/waimaiziti/components/shoppingCartPopup-placeholder/index",
                      "pages/waimaiziti/components/equityCardDishItem-placeholder/index":
                        "pages/waimaiziti/components/equityCardDishItem-placeholder/index",
                      "pages/waimaiziti/components/sideDishsList-placeholder/pageB/index":
                        "pages/waimaiziti/components/sideDishsList-placeholder/pageB/index",
                      "pages/waimaiziti/components/activityEntry-placeholder/index":
                        "pages/waimaiziti/components/activityEntry-placeholder/index",
                      "pages/waimaiziti/grwaimai/dish/pageB/categoryTitle":
                        "pages/waimaiziti/grwaimai/dish/pageB/categoryTitle",
                      "pages/waimaiziti/components/myCoupon-placeholder/myCouponWrap":
                        "pages/waimaiziti/components/myCoupon-placeholder/myCouponWrap",
                      "pages/waimaiziti/components/sideDishsList-placeholder/pageC/index":
                        "pages/waimaiziti/components/sideDishsList-placeholder/pageC/index",
                      "pages/waimaiziti/components/sideDishsList-placeholder/pageD/index":
                        "pages/waimaiziti/components/sideDishsList-placeholder/pageD/index",
                      "pages/waimaiziti/components/sideDishsList-placeholder/pageE/index":
                        "pages/waimaiziti/components/sideDishsList-placeholder/pageE/index",
                      "pages/waimaiziti/components/getUserPhone-placeholder/index":
                        "pages/waimaiziti/components/getUserPhone-placeholder/index",
                      "pages/waimaiziti/components/dishCartItem-placeholder/index":
                        "pages/waimaiziti/components/dishCartItem-placeholder/index",
                      "pages/waimaiziti/components/dishCartItem-placeholder/mnDish":
                        "pages/waimaiziti/components/dishCartItem-placeholder/mnDish",
                      "pages/waimaiziti/components/timeChoose-placeholder/timeChooseNew/index":
                        "pages/waimaiziti/components/timeChoose-placeholder/timeChooseNew/index",
                      "pages/wmzt-addressPopup-commonPackage/index":
                        "pages/wmzt-addressPopup-commonPackage/index",
                      "pages/waimaiziti/components/increasePrice-placeholder/dishItem/index":
                        "pages/waimaiziti/components/increasePrice-placeholder/dishItem/index",
                      "pages/waimaiziti/components/increasePrice-placeholder/dishItem/style2":
                        "pages/waimaiziti/components/increasePrice-placeholder/dishItem/style2",
                      "pages/waimaiziti/components/pay-placeholder/becomeVip":
                        "pages/waimaiziti/components/pay-placeholder/becomeVip",
                      "pages/waimaiziti/components/pay-placeholder/payBase_wm":
                        "pages/waimaiziti/components/pay-placeholder/payBase_wm",
                      "pages/waimaiziti/tyzfPlacehoder/components/rechargeAgreement/agreementPopup":
                        "pages/waimaiziti/tyzfPlacehoder/components/rechargeAgreement/agreementPopup",
                      "pages/waimaiziti/components/cartPopup-placeholder/index":
                        "pages/waimaiziti/components/cartPopup-placeholder/index",
                      "pages/pj/pjHome/components/pjTicketItem/index":
                        "pages/pj/pjHome/components/pjTicketItem/index",
                      "pages/pj/pjHome/components/tips/index":
                        "pages/pj/pjHome/components/tips/index",
                      "baseComponents/uploadImg/baseUplaodImg":
                        "baseComponents/uploadImg/baseUplaodImg",
                      "pages/pj/pjHome/advancedMode/pjLeadWords/index":
                        "pages/pj/pjHome/advancedMode/pjLeadWords/index",
                      "pages/pj/pjHome/advancedMode/baseComponents/questionType/index":
                        "pages/pj/pjHome/advancedMode/baseComponents/questionType/index",
                      "pages/pj/pjHome/advancedMode/baseComponents/textarea/index":
                        "pages/pj/pjHome/advancedMode/baseComponents/textarea/index",
                      "pages/pj/pjHome/advancedMode/pjAnonymous/index":
                        "pages/pj/pjHome/advancedMode/pjAnonymous/index",
                      "pages/pj/pjHome/advancedMode/pjBackBtn/index":
                        "pages/pj/pjHome/advancedMode/pjBackBtn/index",
                      "pages/pj/pjHome/advancedMode/pjChoiceQuestion/index":
                        "pages/pj/pjHome/advancedMode/pjChoiceQuestion/index",
                      "pages/pj/pjHome/advancedMode/pjDishScore/index":
                        "pages/pj/pjHome/advancedMode/pjDishScore/index",
                      "pages/pj/pjHome/advancedMode/pjFavouriteDish/index":
                        "pages/pj/pjHome/advancedMode/pjFavouriteDish/index",
                      "pages/pj/pjHome/advancedMode/pjMcInfo/index":
                        "pages/pj/pjHome/advancedMode/pjMcInfo/index",
                      "pages/pj/pjHome/advancedMode/pjNPS/index":
                        "pages/pj/pjHome/advancedMode/pjNPS/index",
                      "pages/pj/pjHome/advancedMode/pjPageBtn/index":
                        "pages/pj/pjHome/advancedMode/pjPageBtn/index",
                      "pages/pj/pjHome/advancedMode/pjScoreQuestion/index":
                        "pages/pj/pjHome/advancedMode/pjScoreQuestion/index",
                      "pages/pj/pjHome/advancedMode/pjTopRegion/index":
                        "pages/pj/pjHome/advancedMode/pjTopRegion/index",
                      "pages/pay/tyzfPlacehoder/components/rechargeAgreement/agreementPopup":
                        "pages/pay/tyzfPlacehoder/components/rechargeAgreement/agreementPopup",
                      "pages/pay/tyzfPlacehoder/components/ticket/index":
                        "pages/pay/tyzfPlacehoder/components/ticket/index",
                      "pages/pay/tyzfPlacehoder/components/memberCard":
                        "pages/pay/tyzfPlacehoder/components/memberCard",
                      "pages/pay/tyzfPlacehoder/components/changeCard":
                        "pages/pay/tyzfPlacehoder/components/changeCard",
                      "pages/pay/tyzfPlacehoder/components/integral":
                        "pages/pay/tyzfPlacehoder/components/integral",
                      "pages/pay/tyzfPlacehoder/components/payhuis":
                        "pages/pay/tyzfPlacehoder/components/payhuis",
                      "baseComponents/bottomInfoBar/index":
                        "baseComponents/bottomInfoBar/index",
                      "pages/pay/components/equityCard-placeholder/index":
                        "pages/pay/components/equityCard-placeholder/index",
                      "pages/pay/components/changePayCards/index":
                        "pages/pay/components/changePayCards/index",
                      "pages/pay/components/payBase_dc/index":
                        "pages/pay/components/payBase_dc/index",
                      "pages/pay/tyzfPlacehoder/components/ticUnusedPopup":
                        "pages/pay/tyzfPlacehoder/components/ticUnusedPopup",
                      "pages/pay/components/payAfterPop-placeholder/index":
                        "pages/pay/components/payAfterPop-placeholder/index",
                      "pages/pay/components/tablePay/becomeVip":
                        "pages/pay/components/tablePay/becomeVip",
                      "pages/pay/components/tablePay/integralAttributionTips":
                        "pages/pay/components/tablePay/integralAttributionTips",
                      "pages/pay/components/tablePay/orderItems":
                        "pages/pay/components/tablePay/orderItems",
                      "pages/pay/components/tablePay/settle":
                        "pages/pay/components/tablePay/settle",
                      "pages/system/components/mall-dragPic/dragPicType1":
                        "pages/system/components/mall-dragPic/dragPicType1",
                      "pages/system/components/mall-dragPic/mall-mask":
                        "pages/system/components/mall-dragPic/mall-mask",
                      "pages/passwordRedbag/components/recordComponent":
                        "pages/passwordRedbag/components/recordComponent",
                      "pages/mescroll-uni-commonPackage/mescroll-uni/components/mescroll-empty":
                        "pages/mescroll-uni-commonPackage/mescroll-uni/components/mescroll-empty",
                      "pages/mescroll-uni-commonPackage/mescroll-uni/components/mescroll-top":
                        "pages/mescroll-uni-commonPackage/mescroll-uni/components/mescroll-top",
                      "baseComponents/wxpopup/transition":
                        "baseComponents/wxpopup/transition",
                      "pages/tabbar-commonPackage/tabbar":
                        "pages/tabbar-commonPackage/tabbar",
                      "pages/tabbar-commonPackage/tabbarItem":
                        "pages/tabbar-commonPackage/tabbarItem",
                      "pages/tabbar-commonPackage/tabbarItemStyle2":
                        "pages/tabbar-commonPackage/tabbarItemStyle2",
                      "pages/tabbar-commonPackage/tabbarItemStyle3":
                        "pages/tabbar-commonPackage/tabbarItemStyle3",
                      "pages/tabbar-commonPackage/tabbarItemStyle4":
                        "pages/tabbar-commonPackage/tabbarItemStyle4",
                      "pages/tabbar-commonPackage/tabbarItemStyle5":
                        "pages/tabbar-commonPackage/tabbarItemStyle5",
                      "pages/tabbar-commonPackage/tabbarItemTs":
                        "pages/tabbar-commonPackage/tabbarItemTs",
                      "pages/cardhome/components/memberBirthdayReminder/components/coupon":
                        "pages/cardhome/components/memberBirthdayReminder/components/coupon",
                      "pages/keyBoard-commonPackage/keyBoard":
                        "pages/keyBoard-commonPackage/keyBoard",
                      "pages/order/components/diancanOrder/diancanOrder":
                        "pages/order/components/diancanOrder/diancanOrder",
                      "pages/order/components/diancanOrder/unaccomplishedOrder":
                        "pages/order/components/diancanOrder/unaccomplishedOrder",
                      "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/index",
                      "pages/dishPopups-dp-pop-dishPageStepModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-dishPageStepModel-commonPackage/index",
                      "pages/dishPopups-dp-pop-dishSpecModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-dishSpecModel-commonPackage/index",
                      "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/index",
                      "pages/dishPopups-dp-pop-initialModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-initialModel-commonPackage/index",
                      "pages/dishPopups-dp-pop-specsSingleModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-specsSingleModel-commonPackage/index",
                      "pages/dishPopups-dp-pop-theWoodsModel-commonPackage/index":
                        "pages/dishPopups-dp-pop-theWoodsModel-commonPackage/index",
                      "pages/dishPopups-tc-pop-blockModel-commonPackage/index":
                        "pages/dishPopups-tc-pop-blockModel-commonPackage/index",
                      "pages/dishPopups-tc-pop-pureTextModel-commonPackage/index":
                        "pages/dishPopups-tc-pop-pureTextModel-commonPackage/index",
                      "pages/dishPopups-tc-pop-randomModel-commonPackage/common/vendor":
                        "pages/dishPopups-tc-pop-randomModel-commonPackage/common/vendor",
                      "pages/dishPopups-tc-pop-randomModel-commonPackage/index":
                        "pages/dishPopups-tc-pop-randomModel-commonPackage/index",
                      "pages/dishPopups-tc-pop-bundleModel-commonPackage/index":
                        "pages/dishPopups-tc-pop-bundleModel-commonPackage/index",
                      "pages/treasureBox-commonPackage/boxInfoPoup":
                        "pages/treasureBox-commonPackage/boxInfoPoup",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponInDish":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/myCouponInDish",
                      "pages/diancan-fastfood/components/myCoupon-placeholder/couponForDetails":
                        "pages/diancan-fastfood/components/myCoupon-placeholder/couponForDetails",
                      "pages/diancan-fastfood/dishes/component/redPacketsPasswordPoup":
                        "pages/diancan-fastfood/dishes/component/redPacketsPasswordPoup",
                      "pages/diancan-fastfood/tyzfFastFood/components/rechargeAgreement":
                        "pages/diancan-fastfood/tyzfFastFood/components/rechargeAgreement",
                      "pages/diancan-fastfood/tyzfFastFood/view/showRechargeAgreement":
                        "pages/diancan-fastfood/tyzfFastFood/view/showRechargeAgreement",
                      "pages/diancan-fastfood/components/dishItemComponents-placeholder/dishInfo":
                        "pages/diancan-fastfood/components/dishItemComponents-placeholder/dishInfo",
                      "baseComponents/addDeBtn/transparent":
                        "baseComponents/addDeBtn/transparent",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleA",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleC",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/showPics/index":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/showPics/index",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index",
                      "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index":
                        "baseComponents/dishPopups-tc-components-commonPackage/imgTextDishItem/index",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/index":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/index",
                      "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/index":
                        "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/index",
                      "pages/hotpot-commonPackage/hotpotStyle/index":
                        "pages/hotpot-commonPackage/hotpotStyle/index",
                      "pages/diancan/components/dishItemComponents-placeholder/dishInfo":
                        "pages/diancan/components/dishItemComponents-placeholder/dishInfo",
                      "baseComponents/addDeBtn/plus":
                        "baseComponents/addDeBtn/plus",
                      "pages/aiDishPeople-commonPackage/aimenuPopup":
                        "pages/aiDishPeople-commonPackage/aimenuPopup",
                      "pages/aiDish-commonPackage/aimenuPopup":
                        "pages/aiDish-commonPackage/aimenuPopup",
                      "pages/aiDish-commonPackage/circleBox":
                        "pages/aiDish-commonPackage/circleBox",
                      "pages/hotpot-commonPackage/hotpotBasePop/cookPop/index":
                        "pages/hotpot-commonPackage/hotpotBasePop/cookPop/index",
                      "pages/diancan/dishes/component/coupon":
                        "pages/diancan/dishes/component/coupon",
                      "pages/orderImagePosition-commonPackage/BeefPartGuidancePrompt":
                        "pages/orderImagePosition-commonPackage/BeefPartGuidancePrompt",
                      "pages/orderImagePosition-commonPackage/PartCanvas":
                        "pages/orderImagePosition-commonPackage/PartCanvas",
                      "pages/hotpot-commonPackage/hotpotItem/simpleTab/index":
                        "pages/hotpot-commonPackage/hotpotItem/simpleTab/index",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/price",
                      "pages/waimaiziti2/components/pay-placeholder/becomeVip":
                        "pages/waimaiziti2/components/pay-placeholder/becomeVip",
                      "pages/waimaiziti2/components/pay-placeholder/payBase_wm":
                        "pages/waimaiziti2/components/pay-placeholder/payBase_wm",
                      "pages/grziti/components/orderState-placeholder/steps/index":
                        "pages/grziti/components/orderState-placeholder/steps/index",
                      "pages/grziti/components/dishItem-placeholder/woods":
                        "pages/grziti/components/dishItem-placeholder/woods",
                      "pages/grziti/components/dishItemComponents-placeholder/exChange":
                        "pages/grziti/components/dishItemComponents-placeholder/exChange",
                      "pages/grziti/components/dishItemComponents-placeholder/fullGift":
                        "pages/grziti/components/dishItemComponents-placeholder/fullGift",
                      "pages/grziti/components/dishItemComponents-placeholder/layout1":
                        "pages/grziti/components/dishItemComponents-placeholder/layout1",
                      "pages/grziti/components/dishItemComponents-placeholder/layout11":
                        "pages/grziti/components/dishItemComponents-placeholder/layout11",
                      "pages/grziti/components/dishItemComponents-placeholder/layout13":
                        "pages/grziti/components/dishItemComponents-placeholder/layout13",
                      "pages/grziti/components/dishItemComponents-placeholder/layout14":
                        "pages/grziti/components/dishItemComponents-placeholder/layout14",
                      "pages/grziti/components/dishItemComponents-placeholder/layout15":
                        "pages/grziti/components/dishItemComponents-placeholder/layout15",
                      "pages/grziti/components/dishItemComponents-placeholder/layout16":
                        "pages/grziti/components/dishItemComponents-placeholder/layout16",
                      "pages/grziti/components/dishItemComponents-placeholder/layout17":
                        "pages/grziti/components/dishItemComponents-placeholder/layout17",
                      "pages/grziti/components/dishItemComponents-placeholder/layout2":
                        "pages/grziti/components/dishItemComponents-placeholder/layout2",
                      "pages/grziti/components/dishItemComponents-placeholder/layout3":
                        "pages/grziti/components/dishItemComponents-placeholder/layout3",
                      "pages/grziti/components/dishItemComponents-placeholder/layout4":
                        "pages/grziti/components/dishItemComponents-placeholder/layout4",
                      "pages/grziti/components/dishItemComponents-placeholder/layout5":
                        "pages/grziti/components/dishItemComponents-placeholder/layout5",
                      "pages/grziti/components/dishItemComponents-placeholder/layout6":
                        "pages/grziti/components/dishItemComponents-placeholder/layout6",
                      "pages/grziti/components/dishItemComponents-placeholder/layout7":
                        "pages/grziti/components/dishItemComponents-placeholder/layout7",
                      "pages/grziti/components/dishItemComponents-placeholder/layout8":
                        "pages/grziti/components/dishItemComponents-placeholder/layout8",
                      "pages/grziti/components/dishItemComponents-placeholder/layout9":
                        "pages/grziti/components/dishItemComponents-placeholder/layout9",
                      "pages/grziti/components/fullGifts-placeholder/mnMode/index":
                        "pages/grziti/components/fullGifts-placeholder/mnMode/index",
                      "pages/wmzt-removeDishPopup-commonPackage/delDishItem":
                        "pages/wmzt-removeDishPopup-commonPackage/delDishItem",
                      "baseComponents/addDeBtn/simple":
                        "baseComponents/addDeBtn/simple",
                      "pages/wmzt-advSelectTimePopup-commonPackage/timeChoose-placeholder/timeChooseNew/index":
                        "pages/wmzt-advSelectTimePopup-commonPackage/timeChoose-placeholder/timeChooseNew/index",
                      "pages/wmzt-redPacketsPassword-commonPackage/popup":
                        "pages/wmzt-redPacketsPassword-commonPackage/popup",
                      "pages/wmzt-myCoupon-commonPackage/myCouponByCart/index":
                        "pages/wmzt-myCoupon-commonPackage/myCouponByCart/index",
                      "pages/wmzt-myCoupon-commonPackage/cartCouponDishPopup":
                        "pages/wmzt-myCoupon-commonPackage/cartCouponDishPopup",
                      "pages/wmzt-myCoupon-commonPackage/myCouponInDishBox":
                        "pages/wmzt-myCoupon-commonPackage/myCouponInDishBox",
                      "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/index":
                        "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/index",
                      "pages/grziti/tyzfPlacehoder/components/meituanTicket":
                        "pages/grziti/tyzfPlacehoder/components/meituanTicket",
                      "pages/grziti/tyzfPlacehoder/components/ticket/index":
                        "pages/grziti/tyzfPlacehoder/components/ticket/index",
                      "pages/grziti/tyzfPlacehoder/components/tiktok":
                        "pages/grziti/tyzfPlacehoder/components/tiktok",
                      "pages/grziti/components/pay-placeholder/giftChange":
                        "pages/grziti/components/pay-placeholder/giftChange",
                      "pages/grziti/tyzfPlacehoder/components/memberCard":
                        "pages/grziti/tyzfPlacehoder/components/memberCard",
                      "pages/grziti/tyzfPlacehoder/components/cdfk":
                        "pages/grziti/tyzfPlacehoder/components/cdfk",
                      "pages/grziti/tyzfPlacehoder/components/changeCard":
                        "pages/grziti/tyzfPlacehoder/components/changeCard",
                      "pages/grziti/tyzfPlacehoder/components/erase":
                        "pages/grziti/tyzfPlacehoder/components/erase",
                      "pages/grziti/tyzfPlacehoder/components/integral":
                        "pages/grziti/tyzfPlacehoder/components/integral",
                      "pages/grziti/tyzfPlacehoder/components/payMoney":
                        "pages/grziti/tyzfPlacehoder/components/payMoney",
                      "pages/grziti/tyzfPlacehoder/components/payhuis":
                        "pages/grziti/tyzfPlacehoder/components/payhuis",
                      "pages/waimaiziti/components/orderState-placeholder/steps/index":
                        "pages/waimaiziti/components/orderState-placeholder/steps/index",
                      "pages/waimaiziti/components/dishItem-placeholder/woods":
                        "pages/waimaiziti/components/dishItem-placeholder/woods",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/exChange":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/exChange",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/fullGift":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/fullGift",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout1":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout1",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout11":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout11",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout13":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout13",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout14":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout14",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout15":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout15",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout16":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout16",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout17":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout17",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout2":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout2",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout3":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout3",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout4":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout4",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout5":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout5",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout6":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout6",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout7":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout7",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout8":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout8",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/layout9":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/layout9",
                      "pages/waimaiziti/components/fullGifts-placeholder/mnMode/index":
                        "pages/waimaiziti/components/fullGifts-placeholder/mnMode/index",
                      "pages/wmzt-addressPopup-commonPackage/del_slideLeft":
                        "pages/wmzt-addressPopup-commonPackage/del_slideLeft",
                      "pages/waimaiziti/tyzfPlacehoder/components/meituanTicket":
                        "pages/waimaiziti/tyzfPlacehoder/components/meituanTicket",
                      "pages/waimaiziti/tyzfPlacehoder/components/ticket/index":
                        "pages/waimaiziti/tyzfPlacehoder/components/ticket/index",
                      "pages/waimaiziti/tyzfPlacehoder/components/tiktok":
                        "pages/waimaiziti/tyzfPlacehoder/components/tiktok",
                      "pages/waimaiziti/components/pay-placeholder/giftChange":
                        "pages/waimaiziti/components/pay-placeholder/giftChange",
                      "pages/waimaiziti/tyzfPlacehoder/components/memberCard":
                        "pages/waimaiziti/tyzfPlacehoder/components/memberCard",
                      "pages/waimaiziti/tyzfPlacehoder/components/cdfk":
                        "pages/waimaiziti/tyzfPlacehoder/components/cdfk",
                      "pages/waimaiziti/tyzfPlacehoder/components/changeCard":
                        "pages/waimaiziti/tyzfPlacehoder/components/changeCard",
                      "pages/waimaiziti/tyzfPlacehoder/components/erase":
                        "pages/waimaiziti/tyzfPlacehoder/components/erase",
                      "pages/waimaiziti/tyzfPlacehoder/components/integral":
                        "pages/waimaiziti/tyzfPlacehoder/components/integral",
                      "pages/waimaiziti/tyzfPlacehoder/components/payMoney":
                        "pages/waimaiziti/tyzfPlacehoder/components/payMoney",
                      "pages/waimaiziti/tyzfPlacehoder/components/payhuis":
                        "pages/waimaiziti/tyzfPlacehoder/components/payhuis",
                      "pages/pj/pjHome/advancedMode/baseComponents/tips/index":
                        "pages/pj/pjHome/advancedMode/baseComponents/tips/index",
                      "pages/pay/tyzfPlacehoder/components/meituanTicket":
                        "pages/pay/tyzfPlacehoder/components/meituanTicket",
                      "pages/pay/tyzfPlacehoder/components/ticket/ticketSpreadStyle":
                        "pages/pay/tyzfPlacehoder/components/ticket/ticketSpreadStyle",
                      "pages/pay/tyzfPlacehoder/components/tiktok":
                        "pages/pay/tyzfPlacehoder/components/tiktok",
                      "pages/pay/tyzfPlacehoder/components/erase":
                        "pages/pay/tyzfPlacehoder/components/erase",
                      "pages/pay/components/tablePayOrderItems-placeholder/index":
                        "pages/pay/components/tablePayOrderItems-placeholder/index",
                      "pages/pay/components/tablePayOrderItems-placeholder/payOrder":
                        "pages/pay/components/tablePayOrderItems-placeholder/payOrder",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/npartPopup/index":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/npartPopup/index",
                      "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index":
                        "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index",
                      "baseComponents/addDeBtn/solidColor":
                        "baseComponents/addDeBtn/solidColor",
                      "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/DishSpec":
                        "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/DishSpec",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/stepBtn":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/stepBtn",
                      "baseComponents/dishPopups-dp-components-commonPackage/cookImgItem/index":
                        "baseComponents/dishPopups-dp-components-commonPackage/cookImgItem/index",
                      "baseComponents/dishPopups-dp-components-commonPackage/dishSpec/index":
                        "baseComponents/dishPopups-dp-components-commonPackage/dishSpec/index",
                      "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index":
                        "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index",
                      "baseComponents/dishPopups-dp-components-commonPackage/slideUpBtn/index":
                        "baseComponents/dishPopups-dp-components-commonPackage/slideUpBtn/index",
                      "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/index":
                        "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/index",
                      "baseComponents/dishPopups-tc-components-commonPackage/dishItems/blockModel/index":
                        "baseComponents/dishPopups-tc-components-commonPackage/dishItems/blockModel/index",
                      "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index":
                        "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index",
                      "baseComponents/dishPopups-tc-components-commonPackage/dishItems/pureTextModel/index":
                        "baseComponents/dishPopups-tc-components-commonPackage/dishItems/pureTextModel/index",
                      "pages/dishPopups-tc-pop-bundleModel-commonPackage/components/seledDishItems/index":
                        "pages/dishPopups-tc-pop-bundleModel-commonPackage/components/seledDishItems/index",
                      "pages/treasureBox-commonPackage/grid":
                        "pages/treasureBox-commonPackage/grid",
                      "pages/treasureBox-commonPackage/medalDetailPoup":
                        "pages/treasureBox-commonPackage/medalDetailPoup",
                      "pages/diancan-fastfood/dishes/component/coupon":
                        "pages/diancan-fastfood/dishes/component/coupon",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index",
                      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/calcDiscountPrice":
                        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/addCartBar/calcDiscountPrice",
                      "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/uni-popup":
                        "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/uni-popup",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotFour":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotFour",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotOne":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotOne",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotThree":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotThree",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotThreeNested":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotThreeNested",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotTwo":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotTwo",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotTwo1":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/CirclePotTwo1",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_1":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_1",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_2":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_2",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_3":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_3",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_4":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_4",
                      "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_5":
                        "pages/hotpot-commonPackage/hotpotStyle/potStyles/pot_5",
                      "pages/aiDishPeople-commonPackage/aiDishItem":
                        "pages/aiDishPeople-commonPackage/aiDishItem",
                      "pages/aiDish-commonPackage/aiDishItem":
                        "pages/aiDish-commonPackage/aiDishItem",
                      "pages/waimaiziti2/tyzfPlacehoder/components/meituanTicket":
                        "pages/waimaiziti2/tyzfPlacehoder/components/meituanTicket",
                      "pages/waimaiziti2/tyzfPlacehoder/components/ticket/index":
                        "pages/waimaiziti2/tyzfPlacehoder/components/ticket/index",
                      "pages/waimaiziti2/tyzfPlacehoder/components/tiktok":
                        "pages/waimaiziti2/tyzfPlacehoder/components/tiktok",
                      "pages/waimaiziti2/components/pay-placeholder/giftChange":
                        "pages/waimaiziti2/components/pay-placeholder/giftChange",
                      "pages/waimaiziti2/tyzfPlacehoder/components/memberCard":
                        "pages/waimaiziti2/tyzfPlacehoder/components/memberCard",
                      "pages/waimaiziti2/tyzfPlacehoder/components/cdfk":
                        "pages/waimaiziti2/tyzfPlacehoder/components/cdfk",
                      "pages/waimaiziti2/tyzfPlacehoder/components/changeCard":
                        "pages/waimaiziti2/tyzfPlacehoder/components/changeCard",
                      "pages/waimaiziti2/tyzfPlacehoder/components/erase":
                        "pages/waimaiziti2/tyzfPlacehoder/components/erase",
                      "pages/waimaiziti2/tyzfPlacehoder/components/integral":
                        "pages/waimaiziti2/tyzfPlacehoder/components/integral",
                      "pages/waimaiziti2/tyzfPlacehoder/components/payMoney":
                        "pages/waimaiziti2/tyzfPlacehoder/components/payMoney",
                      "pages/waimaiziti2/tyzfPlacehoder/components/payhuis":
                        "pages/waimaiziti2/tyzfPlacehoder/components/payhuis",
                      "pages/grziti/components/dishItemComponents-placeholder/dishInfo":
                        "pages/grziti/components/dishItemComponents-placeholder/dishInfo",
                      "pages/wmzt-redPacketsPassword-commonPackage/coupon":
                        "pages/wmzt-redPacketsPassword-commonPackage/coupon",
                      "pages/wmzt-myCoupon-commonPackage/common/vendor":
                        "pages/wmzt-myCoupon-commonPackage/common/vendor",
                      "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/meituan":
                        "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/meituan",
                      "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/tiktok":
                        "pages/wmzt-myCoupon-commonPackage/thirdPartyCoupons/tiktok",
                      "pages/wmzt-myCoupon-commonPackage/discountMutuallyExclusivePopup":
                        "pages/wmzt-myCoupon-commonPackage/discountMutuallyExclusivePopup",
                      "pages/wmzt-myCoupon-commonPackage/selectDishpopup":
                        "pages/wmzt-myCoupon-commonPackage/selectDishpopup",
                      "pages/wmzt-myCoupon-commonPackage/couponForDetails":
                        "pages/wmzt-myCoupon-commonPackage/couponForDetails",
                      "pages/wmzt-myCoupon-commonPackage/myCouponInDish":
                        "pages/wmzt-myCoupon-commonPackage/myCouponInDish",
                      "pages/grziti/tyzfPlacehoder/components/tipPopup":
                        "pages/grziti/tyzfPlacehoder/components/tipPopup",
                      "pages/waimaiziti/components/dishItemComponents-placeholder/dishInfo":
                        "pages/waimaiziti/components/dishItemComponents-placeholder/dishInfo",
                      "pages/waimaiziti/tyzfPlacehoder/components/tipPopup":
                        "pages/waimaiziti/tyzfPlacehoder/components/tipPopup",
                      "pages/pay/tyzfPlacehoder/components/tipPopup":
                        "pages/pay/tyzfPlacehoder/components/tipPopup",
                      "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup":
                        "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup",
                      "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/uni-popup":
                        "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/uni-popup",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/woods":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/woods",
                      "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/uni-transition":
                        "pages/dishPopups-tc-pop-imgTextModel-commonPackage/hqs-popup/uni-transition",
                      "pages/waimaiziti2/tyzfPlacehoder/components/tipPopup":
                        "pages/waimaiziti2/tyzfPlacehoder/components/tipPopup",
                      "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/uni-transition":
                        "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/hqs-popup/uni-transition",
                      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo":
                        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo",
                    }[e] || e) + ".wxss",
                  s = i.p + n,
                  t = document.getElementsByTagName("link"),
                  c = 0;
                c < t.length;
                c++
              ) {
                var d = t[c],
                  m = d.getAttribute("data-href") || d.getAttribute("href");
                if ("stylesheet" === d.rel && (m === n || m === s)) return o();
              }
              var r = document.getElementsByTagName("style");
              for (c = 0; c < r.length; c++)
                if ((m = (d = r[c]).getAttribute("data-href")) === n || m === s)
                  return o();
              var g = document.createElement("link");
              (g.rel = "stylesheet"),
                (g.type = "text/css"),
                (g.onload = o),
                (g.onerror = function (o) {
                  var n = (o && o.target && o.target.src) || s,
                    t = new Error(
                      "Loading CSS chunk " + e + " failed.\n(" + n + ")"
                    );
                  (t.request = n),
                    delete p[e],
                    g.parentNode.removeChild(g),
                    a(t);
                }),
                (g.href = s),
                document.getElementsByTagName("head")[0].appendChild(g);
            }).then(function () {
              p[e] = 0;
            }))
          );
      var a = s[e];
      if (0 !== a)
        if (a) o.push(a[2]);
        else {
          var n = new Promise(function (o, n) {
            a = s[e] = [o, n];
          });
          o.push((a[2] = n));
          var t,
            c = document.createElement("script");
          (c.charset = "utf-8"),
            (c.timeout = 120),
            i.nc && c.setAttribute("nonce", i.nc),
            (c.src = (function (e) {
              return i.p + "" + e + ".js";
            })(e));
          var d = new Error();
          t = function (o) {
            (c.onerror = c.onload = null), clearTimeout(m);
            var a = s[e];
            if (0 !== a) {
              if (a) {
                var n = o && ("load" === o.type ? "missing" : o.type),
                  p = o && o.target && o.target.src;
                (d.message =
                  "Loading chunk " + e + " failed.\n(" + n + ": " + p + ")"),
                  (d.name = "ChunkLoadError"),
                  (d.type = n),
                  (d.request = p),
                  a[1](d);
              }
              s[e] = void 0;
            }
          };
          var m = setTimeout(function () {
            t({ type: "timeout", target: c });
          }, 12e4);
          (c.onerror = c.onload = t), document.head.appendChild(c);
        }
      return Promise.all(o);
    }),
      (i.m = e),
      (i.c = n),
      (i.d = function (e, o, a) {
        i.o(e, o) || Object.defineProperty(e, o, { enumerable: !0, get: a });
      }),
      (i.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (i.t = function (e, o) {
        if ((1 & o && (e = i(e)), 8 & o)) return e;
        if (4 & o && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (
          (i.r(a),
          Object.defineProperty(a, "default", { enumerable: !0, value: e }),
          2 & o && "string" != typeof e)
        )
          for (var n in e)
            i.d(
              a,
              n,
              function (o) {
                return e[o];
              }.bind(null, n)
            );
        return a;
      }),
      (i.n = function (e) {
        var o =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return i.d(o, "a", o), o;
      }),
      (i.o = function (e, o) {
        return Object.prototype.hasOwnProperty.call(e, o);
      }),
      (i.p = "/"),
      (i.oe = function (e) {
        throw (console.error(e), e);
      });
    var c = (global.webpackJsonp = global.webpackJsonp || []),
      d = c.push.bind(c);
    (c.push = o), (c = c.slice());
    for (var m = 0; m < c.length; m++) o(c[m]);
    var r = d;
    a();
  })([]);
