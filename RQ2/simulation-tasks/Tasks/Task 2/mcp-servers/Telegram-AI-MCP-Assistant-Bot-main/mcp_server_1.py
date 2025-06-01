from mcp.server.fastmcp import FastMCP, Image
from mcp.server.fastmcp.prompts import base
from mcp.types import TextContent
from mcp import types
from PIL import Image as PILImage
import math
import sys
import os
import json
import faiss
import numpy as np
from pathlib import Path
import requests
from markitdown import MarkItDown
import time
from models import AddInput, AddOutput, SqrtInput, SqrtOutput, StringsToIntsInput, StringsToIntsOutput, ExpSumInput, ExpSumOutput, ShellCommandInput
from PIL import Image as PILImage
from tqdm import tqdm
import hashlib
from pydantic import BaseModel
import subprocess
import sqlite3


class PythonCodeInput(BaseModel):
    code: str


class PythonCodeOutput(BaseModel):
    result: str


mcp = FastMCP(
    "Calculator",
    host="0.0.0.0",
    port=8000
    )


@mcp.tool()
def add(input: AddInput) -> AddOutput:
    """Add two numbers. Usage: add|input={"a": 10, "b": 5}"""
    print("CALLED: add(AddInput) -> AddOutput")
    return AddOutput(result=input.a + input.b)

@mcp.tool()
def sqrt(input: SqrtInput) -> SqrtOutput:
    """Compute the square root of a number. Usage: sqrt|input={"a": 49}"""
    print("CALLED: sqrt(SqrtInput) -> SqrtOutput")
    return SqrtOutput(result=input.a ** 0.5)

# subtraction tool
@mcp.tool()
def subtract(a: int, b: int) -> int:
    """Subtract one number from another. Usage: subtract|a=10|b=3"""
    print("CALLED: subtract(a: int, b: int) -> int:")
    return int(a - b)

# multiplication tool
@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two integers. Usage: multiply|a=6|b=7"""
    print("CALLED: multiply(a: int, b: int) -> int:")
    return int(a * b)

#  division tool
@mcp.tool() 
def divide(a: int, b: int) -> float:
    """Divide one number by another. Usage: divide|a=20|b=4"""
    print("CALLED: divide(a: int, b: int) -> float:")
    return float(a / b)

# power tool
@mcp.tool()
def power(a: int, b: int) -> int:
    """Compute a raised to the power of b. Usage: power|a=2|b=10"""
    print("CALLED: power(a: int, b: int) -> int:")
    return int(a ** b)


# cube root tool
@mcp.tool()
def cbrt(a: int) -> float:
    """Compute the cube root of a number. Usage: cbrt|a=27"""
    print("CALLED: cbrt(a: int) -> float:")
    return float(a ** (1/3))

# factorial tool
@mcp.tool()
def factorial(a: int) -> int:
    """Compute the factorial of a number. Usage: factorial|a=5"""
    print("CALLED: factorial(a: int) -> int:")
    return int(math.factorial(a))

# log tool
# @mcp.tool()
# def log(x: float, base: float = math.e) -> float:
#     """Compute the log of x with optional base. Usage: log|x=1000|base=10"""
#     return math.log(x, base)


# remainder tool
@mcp.tool()
def remainder(a: int, b: int) -> int:
    """Compute the remainder of a divided by b. Usage: remainder|a=17|b=4"""
    print("CALLED: remainder(a: int, b: int) -> int:")
    return int(a % b)

# sin tool
@mcp.tool()
def sin(a: int) -> float:
    """Compute sine of an angle in radians. Usage: sin|a=1"""
    print("CALLED: sin(a: int) -> float:")
    return float(math.sin(a))

# cos tool
@mcp.tool()
def cos(a: int) -> float:
    """Compute cosine of an angle in radians. Usage: cos|a=1"""
    print("CALLED: cos(a: int) -> float:")
    return float(math.cos(a))

# tan tool
@mcp.tool()
def tan(a: int) -> float:
    """Compute tangent of an angle in radians. Usage: tan|a=1"""
    print("CALLED: tan(a: int) -> float:")
    return float(math.tan(a))

# mine tool
@mcp.tool()
def mine(a: int, b: int) -> int:
    """special mining tool"""
    print("CALLED: mine(a: int, b: int) -> int:")
    return int(a - b - b)

@mcp.tool()
def create_thumbnail(image_path: str) -> Image:
    """Create a 100x100 thumbnail from image. Usage: create_thumbnail|image_path="example.jpg\""""
    print("CALLED: create_thumbnail(image_path: str) -> Image:")
    img = PILImage.open(image_path)
    img.thumbnail((100, 100))
    return Image(data=img.tobytes(), format="png")

@mcp.tool()
def strings_to_chars_to_int(input: StringsToIntsInput) -> StringsToIntsOutput:
    """Convert characters to ASCII values. Usage: strings_to_chars_to_int|input={"string": "INDIA"}"""
    print("CALLED: strings_to_chars_to_int(StringsToIntsInput) -> StringsToIntsOutput")
    ascii_values = [ord(char) for char in input.string]
    return StringsToIntsOutput(ascii_values=ascii_values)

@mcp.tool()
def int_list_to_exponential_sum(input: ExpSumInput) -> ExpSumOutput:
    """Sum exponentials of int list. Usage: int_list_to_exponential_sum|input={"numbers": [65, 66, 67]}"""
    print("CALLED: int_list_to_exponential_sum(ExpSumInput) -> ExpSumOutput")
    result = sum(math.exp(i) for i in input.int_list)
    return ExpSumOutput(result=result)

@mcp.tool()
def fibonacci_numbers(n: int) -> list:
    """Generate first n Fibonacci numbers. Usage: fibonacci_numbers|n=10"""
    print("CALLED: fibonacci_numbers(n: int) -> list:")
    if n <= 0:
        return []
    fib_sequence = [0, 1]
    for _ in range(2, n):
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    return fib_sequence[:n]

# New Tools
from io import StringIO
import sys
import math

@mcp.tool()
def run_python_sandbox(input: PythonCodeInput) -> PythonCodeOutput:
    """Run math code in Python sandbox. Usage: run_python_sandbox|input={"code": "result = math.sqrt(49)"}"""
    import sys, io
    import math

    allowed_globals = {
        "__builtins__": __builtins__  # Allow imports like in executor.py
    }

    local_vars = {}

    # Capture print output
    stdout_backup = sys.stdout
    output_buffer = io.StringIO()
    sys.stdout = output_buffer

    try:
        exec(input.code, allowed_globals, local_vars)
        sys.stdout = stdout_backup
        result = local_vars.get("result", output_buffer.getvalue().strip() or "Executed.")
        return PythonCodeOutput(result=str(result))
    except Exception as e:
        sys.stdout = stdout_backup
        return PythonCodeOutput(result=f"ERROR: {e}")






import subprocess


@mcp.tool()
def run_shell_command(input: ShellCommandInput) -> PythonCodeOutput:
    """Run a safe shell command. Usage: run_shell_command|input={"command": "ls"}"""
    allowed_commands = ["ls", "cat", "pwd", "df", "whoami"]

    tokens = input.command.strip().split()
    if tokens[0] not in allowed_commands:
        return PythonCodeOutput(result="Command not allowed.")

    try:
        result = subprocess.run(
            input.command, shell=True,
            capture_output=True, timeout=3
        )
        output = result.stdout.decode() or result.stderr.decode()
        return PythonCodeOutput(result=output.strip())
    except Exception as e:
        return PythonCodeOutput(result=f"ERROR: {e}")


@mcp.tool()
def run_sql_query(input: PythonCodeInput) -> PythonCodeOutput:
    """Run safe SELECT-only SQL query. Usage: run_sql_query|input={"code": "SELECT * FROM users LIMIT 5"}"""
    if not input.code.strip().lower().startswith("select"):
        return PythonCodeOutput(result="Only SELECT queries allowed.")

    try:
        conn = sqlite3.connect("example.db")
        cursor = conn.cursor()
        cursor.execute(input.code)
        rows = cursor.fetchall()
        result = "\n".join(str(row) for row in rows)
        return PythonCodeOutput(result=result or "No results.")
    except Exception as e:
        return PythonCodeOutput(result=f"ERROR: {e}")


# DEFINE RESOURCES

# Add a dynamic greeting resource
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    print("CALLED: get_greeting(name: str) -> str:")
    return f"Hello, {name}!"


# DEFINE AVAILABLE PROMPTS
@mcp.prompt()
def review_code(code: str) -> str:
    return f"Please review this code:\n\n{code}"
    print("CALLED: review_code(code: str) -> str:")


@mcp.prompt()
def debug_error(error: str) -> list[base.Message]:
    return [
        base.UserMessage("I'm seeing this error:"),
        base.UserMessage(error),
        base.AssistantMessage("I'll help debug that. What have you tried so far?"),
    ]


if __name__ == "__main__":
    print("mcp_server_1.py starting")
    if len(sys.argv) > 1 and sys.argv[1] == "dev":
            mcp.run()  # Run without transport for dev server
    else:
        # Use SSE transport on port 8000
        mcp.run(transport="sse")  
        print("\nShutting down...")
