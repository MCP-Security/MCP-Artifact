# install
```bash
pip install wechat-mcp
```

需要先登陆微信

# tool list
- get_wechat_message
- get_last_wechat_message
- sql_wechat_message
- send_wechat_message
  
# client config
## stdio
```json
{
  "mcpServers": {
    "wechat-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotcol/wechat-mcp@latest"
      ]
    }
  }
}
```

# 感谢以下开源项目的支持
- [wxauto](https://github.com/cluic/wxauto) 微信自动化
- [pywxdump](https://github.com/xaoyaoo/PyWxDump) wxdump