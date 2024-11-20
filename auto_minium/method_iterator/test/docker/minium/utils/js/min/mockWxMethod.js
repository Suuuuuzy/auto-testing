function mockWxMethod(o,_){if(!global.__minium__.canMock)throw new Error("mock方法未实现");const n=$_function_$;n?global.__minium__.setMock(o,n,_):global.__minium__.delMock(o)}
