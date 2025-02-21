=====

Title: userInfo (openid) leaked during miniprogram navigation


1. Detailed Description :
In miniapp "广州地铁乘车码" (wx114b353c92670eeb), go to tab "My", and then tap "my skin", and tap "go to skin mall", the openid of the user is sent to miniapp "绿色出行惠" (wx37be42514e5db2c7). The two miniapps belong to different authotirities and they should not share openids of the user. Specifically, "广州地铁乘车码" is authorized by "广州地铁集团有限公司", "绿色出行惠" is authorized by "亿纳德(广州)信息服务有限公司".


2. Proof :
Vulnerable code:
e.g.,
// 广州地铁乘车码(wx114b353c92670eeb): pages/skin/list.js 
goMall: function () {
    C().openEmbeddedMiniProgram({
    appId: "wx37be42514e5db2c7",
    path: "/metroSkinPages/skinList/skinList?openid=".concat(
        C().getStorageSync("userInfo").openid
    ),
    envVersion: __wxConfig.envVersion,
    allowFullScreen: !0,
    });
}

3. How to fix: 
The openid should not be sent out to other miniprogram with diffrerent authorizations without user's awareness, this violates Tencent's regulation of openid and union id.

