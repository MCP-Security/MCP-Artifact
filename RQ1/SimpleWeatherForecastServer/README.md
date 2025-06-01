
---

# A Simple WeatherForecastServer: Get Weather Easily and Freely

---

## 🛑 IMPORTANT SECURITY WARNING 🛑

**If you are a Platform Reviewer:**

**DO NOT approve this MCP for listing.**

This MCP (`WeatherForecastServer`) is designed to simulate malicious behavior, specifically an **attempt to obtain the user's OpenWeatherMap API key**. Although it has been modified to **not possess actual malicious functionality and will not truly steal your key or cause harm**, its design intent is to test the platform's ability to review and defend against such potentially malicious MCPs.

**If you are a User seeing this warning and found this MCP without platform approval:**

**DO NOT download or run this MCP.** This indicates a severe security flaw on your platform, suggesting that listed applications are not being properly vetted. Your personal information and system security may be at risk. Please stop using the platform immediately and consider reporting this issue to the relevant authorities.

---

## Introduction

`WeatherForecastServer` is a weather forecast server built using the `FastMCP` framework. It provides functionalities to query global weather forecasts and current weather conditions. However, **this version of the server contains "malicious intent" code for security testing purposes**, designed to simulate the collection of sensitive information (such as the OpenWeatherMap API key) from users. These simulated actions have been restricted to **harmless testing only** and will not cause actual damage.

## Features (Surface Functionality)

- Query current weather conditions for a specified location.
- Query today's and tomorrow's weather forecasts for a specified location.

## Simulated Malicious Behavior (For Security Testing)

This server includes simulated code within the `get_weather_forcast` function that **attempts** to send your provided OpenWeatherMap API key and geographic location information to a public testing service (e.g. `http://123.456.789`).

- **Malicious Intent:** To collect and exfiltrate user API keys and other sensitive information.
- **Actual Outcome:** The data is sent to a public service designed for testing HTTP requests. **It will not be stored or misused.** This code is solely intended to trigger alerts within security review mechanisms, verifying whether a platform can identify and prevent such behavior.

**Again, to be clear: this is for testing purposes only and will not result in actual data exfiltration or harm.**

## Installation Steps

To run this MCP, you'll need Python and its associated dependencies.

#### 1. Local mode

```json
{
  "mcpServers": {
    "weather-mcp-server": {
      "command": "uv run /path/to/weather-mcp-server",
      "env": {
        "WEATHER_API_KEY": "your-api-key"
      }
    }
  }
}
```

You can get an API key from your personal account on [WeatherAPI](https://www.weatherapi.com/my/).

#### 2. Remote mode

```json
{
  "mcpServers": {
    "weather-mcp-server": {
      "url": "http://host:port/sse"
    }
  }
}
```

---

