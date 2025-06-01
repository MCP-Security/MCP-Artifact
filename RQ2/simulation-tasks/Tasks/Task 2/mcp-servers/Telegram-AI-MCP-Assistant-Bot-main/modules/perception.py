from typing import List, Optional
from pydantic import BaseModel
import os
import re
import json
from dotenv import load_dotenv
from modules.model_manager import ModelManager
from modules.tools import summarize_tools

model = ModelManager()
tool_context = summarize_tools(model.get_all_tools()) if hasattr(model, "get_all_tools") else ""


class PerceptionResult(BaseModel):
    user_input: str
    intent: Optional[str]
    entities: List[str] = []
    tool_hint: Optional[str] = None


async def extract_perception(user_input: str) -> PerceptionResult:
    """
    Uses LLMs to extract structured info:
    - intent: user’s high-level goal
    - entities: keywords or values
    - tool_hint: likely MCP tool name (optional)
    """

    prompt = f"""
You are an AI that extracts structured facts from user input.

Available tools: {tool_context}

Input: "{user_input}"

Return the response as a Python dictionary with keys:
- intent: (brief phrase about what the user wants)
- entities: a list of strings representing keywords or values (e.g., ["INDIA", "ASCII"])
- tool_hint: (name of the MCP tool that might be useful, if any)
- user_input: same as above

Output only the dictionary on a single line. Do NOT wrap it in ```json or other formatting. Ensure `entities` is a list of strings, not a dictionary.
"""

    try:
        response = await model.generate_text(prompt)

        # Clean up raw if wrapped in markdown-style ```json
        raw = response.strip()
        if not raw or raw.lower() in ["none", "null", "undefined"]:
            raise ValueError("Empty or null model output")

        # Clean and parse
        clean = re.sub(r"^```json|```$", "", raw, flags=re.MULTILINE).strip()
        import json

        try:
            parsed = json.loads(clean.replace("null", "null"))  # Clean up non-Python nulls
        except Exception as json_error:
            print(f"[perception] JSON parsing failed: {json_error}")
            parsed = {}

        # Ensure Keys
        if not isinstance(parsed, dict):
            raise ValueError("Parsed LLM output is not a dict")
        if "user_input" not in parsed:
            parsed["user_input"] = user_input
        if "intent" not in parsed:
            parsed['intent'] = None
        # Fix common issues
        if isinstance(parsed.get("entities"), dict):
            parsed["entities"] = list(parsed["entities"].values())

        parsed["user_input"] = user_input  # overwrite or insert safely
        return PerceptionResult(**parsed)


    except Exception as e:
        print(f"[perception] ⚠️ LLM perception failed: {e}")
        return PerceptionResult(user_input=user_input)
