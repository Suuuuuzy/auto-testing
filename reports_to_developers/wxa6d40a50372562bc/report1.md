
【漏洞提交】
1.详细描述：
登录小程序"人民法院在线服务贵州" (wxa6d40a50372562bc)后，当点击“在线庭审”跳转至"云审" (wxe4c0f4dd3d308bd1)时，将会携带用户的身份证号和电话号码，造成用户的隐私泄漏。

2. 相关代码：
// 人民法院在线服务贵州(wxa6d40a50372562bc): pages/index/index.js
wx.navigateToMiniProgram({
    appId: "wxe4c0f4dd3d308bd1",
    path:
        "pages/meet/meet?sfzh=" +
        f.globalData.userInfo.identityId +
        "&account=" +
        f.globalData.userInfo.phoneId,
    envVersion: "release",
    success: function (e) {
        console.log(e);
    },
})

3. 修改建议
建议使用除身份证号和手机号以外的数据作为用户唯一标识符，例如“人民法院在线服务全国版” (wx30978ab5aca3090d) 中的实现方法。

=====

Title: userInfo (openid) leaked during miniprogram navigation


1. Detailed Description :
In miniapp "人民法院在线服务贵州" (wxa6d40a50372562bc), it can navigate to miniapp "云审" (wxe4c0f4dd3d308bd1) carrying the user's identifier (身份证号, sfzh in the code) and phone number (phoneId in the code). The two miniapps belong to different authotirities and they should not share such private sensitive information of the user. Specifically, "人民法院在线服务贵州" is authorized by "贵州省高级人民法院", "云审" is authorized by "北京华宇软件股份有限公司".

Similar private information sharing also exists in other miniapps such as: "人民法院在线服务" (wx182be45f90ffbf3d) the "Court Services" miniapps share the same code base.


2. Proof :
Vulnerable code:
e.g.,
// 人民法院在线服务贵州(wxa6d40a50372562bc): pages/index/index.js
wx.navigateToMiniProgram({
    appId: "wxe4c0f4dd3d308bd1",
    path:
        "pages/meet/meet?sfzh=" +
        f.globalData.userInfo.identityId +
        "&account=" +
        f.globalData.userInfo.phoneId,
    envVersion: "release",
    success: function (e) {
        console.log(e);
    },
})

3. How to fix: 
The user's identifier or phone number should not be sent out to other miniprogram with diffrerent authorizations. Instead, the sender and receiver miniapp can use other identidfiers to index a user, such as a user id assigned on the back end, which does not contain such sensitive information. 

