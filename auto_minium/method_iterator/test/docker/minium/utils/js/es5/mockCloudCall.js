function mockCloudCall(){if(!global.__minium__.cloud_call_mocked){var a=function(a){var c=new global.__minium__.MockRule("".concat(a,"_mock_rule"));return function(d){var e=c.search(d);return e?(console.log("[minium] ".concat(a," rule match"),e),e.success)?Promise.resolve(e.success):e.fail?Promise.reject(e.fail):b[a].call(this,d):b[a].call(this,d)}};Object.defineProperty(global.__minium__,"cloud_call_mocked",{value:!0,writable:!1});var b={},c=["callContainer","callFunction"];if(c.forEach(function(a){b[a]=wx.cloud[a]}),"undefined"!=typeof Proxy){var d=new Proxy(wx.cloud,{get:function(b,d){return-1===c.indexOf(d)?b[d]:a(d)}});wx.cloud=d,Object.defineProperty(wx,"cloud",{writable:!0,value:d})}else c.forEach(function(b){var c=a(b);Object.defineProperty(wx.cloud,b,{writable:!0,value:c}),wx.cloud[b]=c})}}