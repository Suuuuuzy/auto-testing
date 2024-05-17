from base import base_taint
from minium import Callback
import threading


class Minium_Query_wx0bc8123197e70985(base_taint.BaseTaint):

    def failed_test_orderProduct_onLoad(self):
        """
        Leakage:
        {hasUserInfo: false
        identified: false
        isIphoneX: false
        loginCalled: false
        pay_uuid: undefined
        pay_venueUuid: undefined
        userInfo: null}

        Current Problem: unable to locate any wx-based method to identify the taint
        (tried getStorage, getStorageSync, setStorage, setStorageSync, request)
        """
        self.onLoad_test_base("getStorage", "/pages/venue/orderProduct/orderProduct")

    def failed_test_hook_orderProduct_updatePrice(self):
        """
        Leakage:
        updatePrice: function () {
          this.setData({
            sumPrice: a.accMul(this.data.price, this.data.count),
            totalPrice: a.accAdd(
              a.accMul(this.data.price, this.data.count),
              -this.data.couponPrice
            ),
          }),
            this.data.sumPrice < this.data.couponRequiredAmount &&
              this.setData({
                totalPrice: a.accMul(this.data.price, this.data.count),
                couponUuid: "",
                couponPrice: 0,
              });
        },

        Current Problem: the function itself (seems due to not logged in) is
        unable to be ran through
        """
        self.Hook_current_page_method_base(
            "/pages/venue/orderProduct/orderProduct",
            Callback(),
            {"test": 1},
            "updatePrice",
        )

    def halfpassed_test_hook_orderProduct_updatePrice(self):
        """
        Leakage:
        checkCoupon: function () {
          var t = this;
          e.sendRequest({
            url: "/api/au/usercoupon",
            data: {
              price: t.data.sumPrice,
              venueUuid: t.data.venueUuid,
            },
            method: "POST",
            isLoading: !0,
          }).then(function (a) {
            for (var u = 0; u < a.couponList.length; u++)
              a.couponList[u].expiredTime = e.formatDate(
                new Date(a.couponList[u].expiredTime)
              );
            t.setData({
              couponList: a.couponList,
            });
          });
        },

        Problem: currently able to be hooked, but due to login failure
        unable to pass useful args into wx.request
        """
        called_args = self.Hook_wxmethod_within_current_page_method_base(
            "/pages/venue/orderProduct/orderProduct", "checkCoupon", "request"
        )

        print(f"the function wx.request is called. Having args {called_args}")

    def halfpassed_test_hook_orderProduct_submitForm(self):
        """
        Leakage:
        submitOrder: function (t) {
        var a = this;
        "submit" == a.data.submitType &&
          (a.setData({
            submitType: "",
          }),
          e
            .sendRequest({
              url: "/api/au/orderproduct",
              data: {
                uuid: a.data.productId,
                venueUuid: a.data.venueUuid,
                count: a.data.count,
                totalPrice: a.data.totalPrice,
                userCouponUuid: a.data.couponUuid,
                couponPrice: a.data.couponPrice,
                productOrderUuid: a.data.productOrderUuid,
              },

        Problem:
        1. only able to get partial info on sendRequest
        2. unable to hook functions such as setData / sendRequest as they
        are neither page-defined nor wx functions

        """
        self.open_route("/pages/venue/orderProduct/orderProduct")
        form_eles = self.page.get_elements("form")
        for form_ele in form_eles:
            request_args = self.Hook_method_with_form_input(
                form_ele, "string_text", bindsubmit_method="submitOrder"
            )
            print(f"here are a total of {len(request_args)} requests")
            for i in range(len(request_args)):
                print(
                    f"form submitted created wx.request num {i} with arguments {request_args[i]}"
                )

    def failed_test_productOrderCode_onLoad(self):
        """
            Leakage:
            onLoad: function(a) {
            ...
            else {
                var n = wx.getStorageSync("PRODUCTORDER");
                e.setData({
                    uuid: n.uuid
                });
            ...
            o.sendRequest({
                    url: "/api/au/checkpush",
                    data: {
                        orderId: e.data.uuid
                    },
                    method: "POST",
                    isLoading: !0
                })
            ...
           wx.connectSocket({
                url: o.getBaseWssUrl() + a.uuid
            });
        },

            Current Problem:
            1. 无法使用wx.getStorageSync, 因为在else语段中没有调用
            2. wx.connectSocket部分报错
            WebSocket connection to 'wss://huimeiboc.sports.cn/websocket/undefined' failed:
            (env: Windows,mp,1.06.2308310; lib: 3.4.3)
            但这个报错好像没有触发exception, 因此exception callback不会有相应内容
        """
        is_exception_thrown = threading.Semaphore(0)  # 监听回调, 阻塞当前主线程
        e = None

        def on_exception(err):
            nonlocal e
            is_exception_thrown.release()
            e = err

        self.app.on_exception_thrown(on_exception)
        is_called, call_args = self.onLoad_test_base(
            "connectSocket", "/pages/productOrder/code/code"
        )
        if is_exception_thrown.acquire(timeout=10):
            print(e)
            return

        if is_called:
            print(
                f"wx.connectSocket is called with args {call_args} during page lifecycle"
            )
        else:
            print("wx.connectSocket does not get called during page lifecycle")

    def failed_test_productOrderCode_onReady(self):
        """
        Leakage:
        onReady: function() {
            var t = this;
            wx.onSocketMessage(function(a) {
                "success" == a.data && (wx.closeSocket(), wx.showModal({
                    content: "核销成功",
                    showCancel: !1,
                    success: function(a) {
                        wx.closeSocket(), t.data.push ? t.setData({
                            showButton: !0
                        }) : o.navigateBack();
                    }
                }));
            });
        },

        Current Problem:
        同上，wx.connectSocket部分报错
        WebSocket connection to 'wss://huimeiboc.sports.cn/websocket/undefined' failed:
        (env: Windows,mp,1.06.2308310; lib: 3.4.3)，
        页面在onLoad出错，没有走到onReady
        """
        is_called, call_args = self.onLoad_test_base(
            "onSocketMessage", "/pages/productOrder/code/code"
        )

        if is_called:
            print(
                f"wx.onSocketMessage is called with args {call_args} during page lifecycle"
            )
        else:
            print("wx.onSocketMessage does not get called during page lifecycle")

    def seemspass_test_productOrderCode_loadImageCode(self):
        """
        Leakage:
        loadImageCode: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userLocation"] ? wx.getLocation({
                    ...
                }) : wx.showModal({
                    ...
                });
            }
        """
        wx_methods = ["getSetting", "getLocation", "showModal"]
        wx_args = self.hook_multi_wx_method_via_method_base(
            "loadImageCode",
            wx_methods,
            "/pages/productOrder/code/code",
        )
        for i in range(len(wx_methods)):
            print(f"wx.{wx_methods[i]} called with arguments {wx_args[i]}")
