function ideMockModal(){return!!global.__minium__.mock_native_modal||(global.__minium__.auth_setting={},global.__minium__.mock_native_modal_list=[],global.__minium__.handle_mock_modal=function(a,b){for(var c,d=[];0<global.__minium__.mock_native_modal_list.length;){var e,f=global.__minium__.mock_native_modal_list.pop();if(-1===b.indexOf(f.type)||!(a in f)){d.unshift(f);continue}var g=f[a];if((e=global.__minium__.mock_native_modal_list).push.apply(e,d),"function"!=typeof g)throw"".concat(g," is not callable");return g(),!0}return console.warn("can't find [".concat(b,"][").concat(a,"]")),(c=global.__minium__.mock_native_modal_list).push.apply(c,d),!1},global.__minium__.get_all_modal=function(){var a=[];global.__minium__.mock_native_modal_list.forEach(function(b){a.push({type:b.type,texts:Object.keys(b).filter(function(a){return"type"!==a})})})},global.__minium__.handle_mock_native_modal=function(a){return global.__minium__.handle_mock_modal(a,["modal","auth"])},global.__minium__.handle_mock_map_modal=function(a){return global.__minium__.handle_mock_modal(a,["map"])},global.__minium__.handle_mock_auth_modal=function(a){return global.__minium__.handle_mock_modal(a,["auth"])},global.__minium__.mock_native_modal=function(a){a.type="modal",global.__minium__.mock_native_modal_list.push(a)},global.__minium__.mock_map_modal=function(a){a.type="map",global.__minium__.mock_native_modal_list.push(a)},global.__minium__.mock_auth_modal=function(a){a.type="auth",global.__minium__.mock_native_modal_list.push(a)},!1)}