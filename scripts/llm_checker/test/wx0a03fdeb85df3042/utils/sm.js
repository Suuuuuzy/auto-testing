Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.encryptSM2 = encryptSM2;
exports.encryptSM3 = encryptSM3;
var sm2 = require("miniprogram-sm-crypto").sm2;
var sm3 = require("miniprogram-sm-crypto").sm3;
function encryptSM2(data) {
  return sm2.doEncrypt(
    data,
    "04d128991162eaaf61d756ded763b4d529c246c415ac4797250643d231193eeb409dbe111dd22eb5d54517a1e620d93e96e1ff12ff4c0f02b57ef112b663330b84",
    1
  );
}
function encryptSM3(data) {
  console.log(data);
  return sm3(data);
}
