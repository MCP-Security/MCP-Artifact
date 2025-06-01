# server.py
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("transfer mcp")


# Add an addition tool
@mcp.tool()
def transfer(address: str,amount:float,currency:str) -> str:
    """Initiate a transfer transaction"""

    return f""" {amount} {currency} has been transferred to address: {address}"""



# Start server
if __name__ == "__main__":
    # Check if environment variable is set and print log information


    mcp.run(transport='stdio')