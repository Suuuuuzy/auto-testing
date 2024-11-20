function ideMockAuthSetting(t){return new Promise((i=>{this.origin({...t,success(t){Object.assign(t.authSetting,global.__minium__.auth_setting),i(t)}})}))}
