function ideMockModal() {
	return !!global.__minium__.mock_native_modal || (global.__minium__.auth_setting = {}, global.__minium__.mock_native_modal_list = [], global.__minium__.handle_mock_modal = function(_, l) {
		let m = [];
		for (; global.__minium__.mock_native_modal_list.length > 0;) {
			let i = global.__minium__.mock_native_modal_list.pop();
			if (-1 === l.indexOf(i.type) || !(_ in i)) {
				m.unshift(i);
				continue
			}
			let o = i[_];
			if (global.__minium__.mock_native_modal_list.push(...m), "function" != typeof o) throw `${o} is not callable`;
			return o(), !0
		}
		return console.warn(`can't find [${l}][${_}]`), global.__minium__.mock_native_modal_list.push(...m), !1
	}, global.__minium__.get_all_modal = function() {
		let _ = [];
		global.__minium__.mock_native_modal_list.forEach((l => {
			_.push({
				type: l.type,
				texts: Object.keys(l).filter((_ => "type" !== _))
			})
		}))
	}, global.__minium__.handle_mock_native_modal = function(_) {
		return global.__minium__.handle_mock_modal(_, ["modal", "auth"])
	}, global.__minium__.handle_mock_map_modal = function(_) {
		return global.__minium__.handle_mock_modal(_, ["map"])
	}, global.__minium__.handle_mock_auth_modal = function(_) {
		return global.__minium__.handle_mock_modal(_, ["auth"])
	}, global.__minium__.mock_native_modal = function(_) {
		_.type = "modal", global.__minium__.mock_native_modal_list.push(_)
	}, global.__minium__.mock_map_modal = function(_) {
		_.type = "map", global.__minium__.mock_native_modal_list.push(_)
	}, global.__minium__.mock_auth_modal = function(_) {
		_.type = "auth", global.__minium__.mock_native_modal_list.push(_)
	}, !1)
}