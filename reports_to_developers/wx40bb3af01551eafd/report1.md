=====
Title: userInfo (avatar) leaked during miniprogram navigation

1. Detailed Description :
In miniapp "正食家" (wx40bb3af01551eafd), when uploading an avatar, the avatar image is uploaded to a url "https://zhyx-images.eingdong.com/api/index.php/goods/uploadImg"

2. Proof :
Vulnerable code:
e.g.,
// 正食家(wx40bb3af01551eafd): components/auth-userlogin/auth-userlogin.js
wx.uploadFile({
    filePath: a.detail.avatarUrl,
    name: "file",
    url: "https://zhyx-images.eingdong.com/api/index.php/goods/uploadImg",
    header: {
    "Content-Type": "application/x-www-form-urlencoded",
    },

3. How to fix: 
The user's avatar should not be uploaded to a third party url.

