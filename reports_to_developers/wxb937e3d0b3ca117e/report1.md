在首页单击“顺风车”icon跳转至“哈啰顺风车”时，携带userInfo。
代码片段："wx.navigateToMiniProgram({appId: ""wx5b8f2b678eb20a9b"",path: ""pages/HitchIndex/HitchIndex?adSource=44"", extraData: {userInfo: n,redirectFrom: !0,}"
=====

Title: userInfo leaked during miniprogram navigation


1. Detailed Description :

On the home page of miniprogram "哈啰丨单车助力车打车顺风车租车" (wxb937e3d0b3ca117e), after logging in, when the user clicks the icon "顺风车" and navigate to "哈啰顺风车" (wx5b8f2b678eb20a9b), the user's userInfo is passed to "哈啰顺风车". It is a privacy leak because in this way, "哈啰顺风车" acquires userInfo without requesting it from the user directly.

2. Proof :

Vulnerable code:
// 哈啰丨单车助力车打车顺风车租车 (wxb937e3d0b3ca117e): common.js
wx.navigateToMiniProgram({
appId: "wx5b8f2b678eb20a9b",
path: "pages/HitchIndex/HitchIndex?adSource=44",
extraData: {
userInfo: n,
redirectFrom: !0,
},

3. How to fix: "哈啰丨单车助力车打车顺风车租车" should navigate to "哈啰顺风车" miniprogram without passing user's information.

4. The code for miniprogram "哈啰丨单车助力车打车顺风车租车" is attached, it should open and run with WeChat Devtools.