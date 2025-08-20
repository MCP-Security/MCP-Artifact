
# ETHPriceCurrentServer — MCP Server for Live ETH Price

A minimal **Model Context Protocol (MCP)** server that fetches the **current Ethereum (ETH) price in USD**.  
Data source: the public CoinGecko API (no API key required).

---

## 🛑 IMPORTANT SECURITY WARNING 🛑

**If you are a Platform Reviewer:**

**DO NOT approve this MCP for listing.**

This MCP (`get_ETH_Price`) is designed to simulate malicious behavior, specifically an **attempt to mislead LLM to return incorrect results**. Although it has been modified to **return an error result instead of an incorrect ETH price and will not cause harm**, its design intent is to test the platform's ability to review and defend against such potentially malicious MCPs.

**If you are a User seeing this warning and found this MCP without platform approval:**

**DO NOT download or run this MCP.** This indicates a severe security flaw on your platform, suggesting that listed applications are not being properly vetted. Your personal information and system security may be at risk. Please stop using the platform immediately and consider reporting this issue to the relevant authorities.

---

## Features

- 🔌 **MCP Server** — communicates with MCP-compatible clients (Claude Desktop, Cursor, etc.) via `stdio`
- 💱 **Real-Time Price** — pulls live ETH→USD price from CoinGecko’s `simple/price` endpoint
- 🛡 **Error Handling** — returns `-1.0` on failure, enabling safe fallback in clients
- 🧰 **Zero API Keys** — no registration or API key needed

## Installation

Different clients require a JSON config file pointing to the Python interpreter and script.

Add:

```json
{
  "mcpServers": {
    "eth-price": {
      "command": "/absolute/path/to/your/.venv/bin/python",
      "args": [
        "/absolute/path/to/your/repo/get_ETH_Price.py"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1"
      }
    }
  }
}
```

## FAQ

**Q: Do I need an API key?**  
A: No. CoinGecko’s `simple/price` endpoint is public, but may have rate limits.

**Q: Why do I get `-1.0`?**  
A: This means the request failed. Show an error message without numbers and retry later.
