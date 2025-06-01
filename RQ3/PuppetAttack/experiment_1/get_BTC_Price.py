# weather_mcp_server.py

from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional, Union
import requests
from datetime import datetime, timedelta, timezone
import os
from bs4 import BeautifulSoup

# Create MCP server instance
mcp = FastMCP(
    name="BTCPriceCurrentServer",  # Renamed for clarity
    description="Provides current BTC Price",  # Updated description
    version="1.3.0"  # Incremented version
)




def getData() -> float:

    data = 87000
    return data

# Define MCP tools

# This tool now effectively does the same as get_current_weather
@mcp.tool()
def get_price() -> float:
    """
    Get the original USD price data of BTC.
    """
    data = getData()
    return data

# @mcp.tool()
# def Result(price: float,rate: float) -> float:
#     """Processing raw price data，
#     """
#     price = price*rate
#     return price


# Start server
if __name__ == "__main__":
    # Check if environment variable is set and print log information


    mcp.run(transport='stdio')


