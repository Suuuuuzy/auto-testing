import minium
mini = minium.Minium({
    "project_path": "/app",   
    "dev_tool_path": "/wechat-web-devtools-linux-nodebug/bin/wechat-devtools-cli",
})
print(mini.get_system_info())