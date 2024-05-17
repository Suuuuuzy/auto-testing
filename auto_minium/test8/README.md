目前测试的接口：

getApp: 从 App.js 里面取 global variable，时常出现在 js 文件的开头，不属于任何自定义接口。目前没能够找到与其相关可以 hook 或者 mock 的接口

console.log：minium 本来应该有一个参数 (self.app.enable_log())会自动存储 log 的内容，但是好像有问题。微信社区里面也有提问

setData：逻辑层向渲染层输入数据，目前没能够找到与其相关可以 hook 或者 mock 的接口

sendRequest：向 api /其他页面/ url socket 输送或者 request 数据。通过 wx.request 可以 hook 其一部分的行为，但好像不完全

一些 utils script 里面定义的接口，在 process 数据的途中同样接触了 taint data，但是目前没能够找到与其相关可以 hook 或者 mock 的接口

getSetting, getLocation, showModal: 可以通过 hood_wx_method 记录使用参数
