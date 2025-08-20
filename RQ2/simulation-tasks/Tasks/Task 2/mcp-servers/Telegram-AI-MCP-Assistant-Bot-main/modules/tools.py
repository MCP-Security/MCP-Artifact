# modules/tools.py

from typing import List, Dict, Optional, Any


def summarize_tools(tools: List[Any]) -> str:
    """
    Generate a string summary of tools for LLM prompt injection.
    Format: "- tool_name: description"
    """
    return "\n".join(
        f"- {tool.name}: {getattr(tool, 'description', 'No description provided.')}"
        for tool in tools
    )


def filter_tools_by_hint(tools: List[Any], hint: Optional[str] = None) -> List[Any]:
    """
    If tool_hint is provided (e.g., 'search_documents'),
    try to match it exactly or fuzzily with available tool names.
    """
    if not hint:
        return tools

    hint_lower = hint.lower()
    filtered = [tool for tool in tools if hint_lower in tool.name.lower()]
    return filtered if filtered else tools


def get_tool_map(tools: List[Any]) -> Dict[str, Any]:
    """
    Return a dict of tool_name → tool object for fast lookup
    """
    return {tool.name: tool for tool in tools}

def tool_expects_input(self, tool_name: str) -> bool:
    tool = next((t for t in self.tools if t.name == tool_name), None)
    if not tool or not hasattr(tool, 'parameters') or not isinstance(tool.parameters, dict):
        return False
    # If the top-level parameter is just 'input', we assume wrapping is required
    return list(tool.parameters.keys()) == ['input']
