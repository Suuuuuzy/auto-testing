function evalMockChooseImage(...o){return global.__minium__.mock_choose_image?global.__minium__.mock_choose_image(...o):Promise.reject(new Error("Mock方法未注入, 接口不可用"))}
