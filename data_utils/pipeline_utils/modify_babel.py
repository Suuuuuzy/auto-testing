import os

BABEL_TYPE_OF_SCRIPT = """function _typeof2(o) {
  "@babel/helpers - typeof";
  return (_typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
      return typeof o;
  } : function(o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  })(o);
}
 
 
function _typeof(o) {
  return "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? module.exports = _typeof = function(o) {
      return _typeof2(o);
  } : module.exports = _typeof = function(o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : _typeof2(o);
  }, _typeof(o);
}
 
 
module.exports = _typeof;
"""

def modify_babel_path(miniprogram_path):
    typeof_dir = os.path.join(miniprogram_path, '@babel/runtime/helpers/typeof.js')
    if (os.path.exists(typeof_dir) is True):
        # print('The miniprogram uses babel, modified typeof functionality')
        with open(typeof_dir, "w") as js_file:
            js_file.write(BABEL_TYPE_OF_SCRIPT)