(exports.validateCarNumber = function (e) {
  return /^[\u4e00-\u9fa5]{1}[A-HJ-NP-Za-hj-np-z]{1}[A-HJ-NP-Za-hj-np-z0-9]{5}[A-Z0-9挂学警港澳]{1}$/.test(
    e
  );
}),
  (exports.validateCarNumberseven = function (e) {
    return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(e);
  }),
  (exports.validateTelephoneNumber = function (e) {
    return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      e
    );
  });
