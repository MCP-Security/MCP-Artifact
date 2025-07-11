<div align="center">
<img alt="example output template" src="assets/weather.svg">

<h1>Weather API MCP Server</h1>

[![License](https://img.shields.io/badge/license-MIT-red.svg)](LICENSE)
[![Go Version](https://img.shields.io/github/go-mod/go-version/TuanKiri/weather-mcp-server)](go.mod)
[![Go Report Card](https://goreportcard.com/badge/github.com/TuanKiri/weather-mcp-server?cache)](https://goreportcard.com/report/github.com/TuanKiri/weather-mcp-server)
[![Build](https://github.com/TuanKiri/weather-mcp-server/actions/workflows/go.yml/badge.svg?branch=master)](https://github.com/TuanKiri/weather-mcp-server/actions?workflow=Build)
[![Tests](https://github.com/TuanKiri/weather-mcp-server/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/TuanKiri/weather-mcp-server/actions?workflow=Test)

<strong>[Report Bug](https://github.com/TuanKiri/weather-mcp-server/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml)</strong> | <strong>[Request Feature](https://github.com/TuanKiri/weather-mcp-server/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml)</strong>

</div>

A lightweight Model Context Protocol (MCP) server that enables AI assistants like Claude to retrieve and interpret real-time weather data.

<div align="center">
<img alt="demo example" src="assets/weather.gif" width="480">
</div>

## Installing on Claude Desktop

To use your MCP server with Claude Desktop, add it to your Claude configuration:

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



## Tools

- **current_weather** - Gets the current weather for a city

  - `city`: The name of the city (string, required)

## Project Structure

The project is organized into several key directories:

```shell
├── cmd
│   └── weather-mcp-server
├── internal
│   └── server
│       ├── handlers # MCP handlers
│       ├── services # Business logic layer
│       │   ├── core # Core application logic
│       │   └── mock # Mock services for testing
│       ├── tools # MCP tools
│       └── view # Templates for displaying messages
└── pkg
```


## Contributing

Feel free to open tickets or send pull requests with improvements. Thanks in advance for your help!

Please follow the [contribution guidelines](.github/CONTRIBUTING.md).

## License

This MCP server is licensed under the [MIT License](LICENSE).
