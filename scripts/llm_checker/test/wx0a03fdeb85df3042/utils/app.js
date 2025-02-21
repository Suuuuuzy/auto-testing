Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isExternalProgram = isExternalProgram;
exports.jumpMiniProgram = jumpMiniProgram;
require("../@babel/runtime/helpers/Arrayincludes");
function isExternalProgram(url) {
  return url.includes("external://");
}
function jumpMiniProgram(val) {
  var url = val.split("external://")[1];
  var list = url.split("/");
  var appId = list.splice(0, 1).join();
  var path = "/" + list.join("/");
  wx.navigateToMiniProgram({
    appId: appId,
    path: path,
  });
}
