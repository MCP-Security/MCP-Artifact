# Telegram AI Assistant Bot

## Overview
The Telegram AI Assistant Bot is a reasoning-driven AI agent, named Cortex-R, designed to interact with users via Telegram. It uses multiple Model Context Protocol (MCP) servers to perform various tasks such as web searches, document processing, mathematical calculations, and Google services integration (e.g., Gmail and Google Sheets). The bot employs both `stdio` and `sse` transport protocols to communicate with these MCP servers.

## Features
- **Telegram Integration**: The bot interacts with users through Telegram, responding to their queries and tasks.
- **Multi-MCP Server Support**: Utilizes multiple MCP servers for diverse functionalities.
  - Gmail integration for email management.
  - Google Sheets integration for spreadsheet operations.
  - Web search capabilities using DuckDuckGo.
  - Document processing and semantic search.
  - Mathematical calculations.
- **Dynamic Tool Discovery**: Automatically discovers tools from MCP servers during initialization.
- **Customizable Agent Strategy**: Supports different strategies like conservative, retry-once, and explore-all.
- **Memory Management**: Retrieves and stores memory items to enhance task-solving capabilities.
- **Configurable Persona**: Allows customization of tone, verbosity, and behavior.

## Architecture
The bot is built using the following components:

### 1. **Telegram Bot Integration**
The bot is implemented in `telegram_agent.py` using the `python-telegram-bot` library. It handles user messages and commands such as `/start` and `/help`. User queries are processed by the Cortex-R agent.

### 2. **Core Components**
- **Agent Loop (`core/loop.py`)**: Manages the main execution loop of the agent, including perception, planning, and tool execution.
- **Session Management (`core/session.py`)**: Handles communication with multiple MCP servers using `stdio` and `sse` transport protocols.
- **Strategy (`core/strategy.py`)**: Implements planning strategies for decision-making.

### 3. **MCP Servers**
The bot interacts with the following MCP servers:
- **Gmail Server (`gmail_server.py`)**: Manages email operations such as sending, reading, and trashing emails.
- **Google Sheets Server (`mcp_gdrive_server.py`)**: Handles spreadsheet operations like creating, updating, and sharing Google Sheets.
- **Web Search Server (`mcp_server_3.py`)**: Performs web searches using DuckDuckGo and fetches webpage content.
- **Document Processing Server (`mcp_server_2.py`)**: Processes documents for semantic search and indexing.
- **Math Server (`mcp_server_1.py`)**: Performs mathematical calculations.

### 4. **Configuration**
- **Profiles (`config/profiles.yaml`)**: Defines agent settings, including strategy, memory configuration, and MCP server details.
- **Models (`config/models.json`)**: Specifies the models used for text generation and embeddings.
- **Environment Variables (`.env`)**: Stores sensitive information like API keys and file paths.

## Workflow
1. **Initialization**:
   - The bot loads MCP server configurations from `profiles.yaml`.
   - Initializes the `MultiMCP` dispatcher to discover tools from all configured MCP servers.

2. **User Interaction**:
   - Users interact with the bot via Telegram.
   - The bot processes user messages and determines the required tools to fulfill the task.

3. **Task Execution**:
   - The agent uses perception to understand the user query.
   - Plans the next action using the defined strategy.
   - Executes the required tool from the appropriate MCP server.
   - Retrieves results and responds to the user.

4. **Memory Management**:
   - Stores tool outputs and user queries as memory items.
   - Retrieves relevant memories to assist in task-solving.

## Configuration
### Environment Variables
Set the following variables in the `.env` file:
- `GEMINI_API_KEY`: API key for the Gemini model.
- `SERVICE_ACCOUNT_PATH`: Path to the Google service account JSON file.
- `DRIVE_FOLDER_ID`: Google Drive folder ID for storing files.
- `CREDENTIALS_PATH`: Path to the OAuth client credentials file.
- `TOKEN_PATH`: Path to the token file for Google APIs.

### MCP Server Configuration
Define MCP servers in `config/profiles.yaml`:
```yaml
mcp_servers:
  - id: gmail
    type: stdio
    script: gmail_server.py
    cwd: <path-to-server>
  - id: gdrive
    type: stdio
    script: mcp_gdrive_server.py
    cwd: <path-to-server>
  - id: math
    type: sse
    script: mcp_server_1.py
    url: http://localhost:8000/sse
    cwd: <path-to-server>
  - id: documents
    type: stdio
    script: mcp_server_2.py
    cwd: <path-to-server>
  - id: websearch
    type: stdio
    script: mcp_server_3.py
    cwd: <path-to-server>
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Sync dependencies using uv:
   ```bash
   uv sync
   ```
3. Set up environment variables in `.env`.
4. Start the Telegram bot:
   ```bash
   uv run telegram_agent.py
   ```

## Usage
- Start the bot on Telegram using the `/start` command.
- Send queries or tasks to the bot, such as:
  - "Find the current F1 standings and share them in a Google Sheet."
  - "Send an email to example@gmail.com with the subject 'Meeting Update'."

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.