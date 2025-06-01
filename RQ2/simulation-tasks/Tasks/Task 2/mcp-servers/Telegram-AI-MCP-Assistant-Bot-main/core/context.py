# core/context.py → Shared Agent Context & Trace
# Role: Maintains session-wide state across loop steps.

# Responsibilities:

# Store current step, memory trace, tool call results

# Provide access to agent ID, profile, loop history

# Acts like a working memory & agent identity bundle

# Dependencies:

# modules/memory.py (for memory operations)

# config/profiles.yaml

# Inputs: User query + session_id

# Outputs: State object available to all layers

# core/context.py

from typing import List, Optional, Dict, Any
from modules.memory import MemoryManager, MemoryItem
from pathlib import Path
import yaml
import time
import uuid

class AgentProfile:
    def __init__(self, config_path: str = "config/profiles.yaml"):
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)

        self.name = config["agent"]["name"]
        self.id = config["agent"]["id"]
        self.description = config["agent"]["description"]
        self.strategy = config["strategy"]["type"]
        self.max_steps = config["strategy"]["max_steps"]

        self.memory_config = config["memory"]
        self.llm_config = config["llm"]
        self.persona = config["persona"]

    def __repr__(self):
        return f"<AgentProfile {self.name} ({self.strategy})>"

class ToolCallTrace:
    def __init__(self, tool_name: str, arguments: Dict[str, Any], result: Any):
        self.tool_name = tool_name
        self.arguments = arguments
        self.result = result

class AgentContext:
    def __init__(self, user_input: str, profile: Optional[AgentProfile] = None):
        self.user_input = user_input
        self.agent_profile = profile or AgentProfile()
        self.session_id = f"session-{int(time.time())}-{uuid.uuid4().hex[:6]}"
        self.step = 0
        self.memory = MemoryManager(
            embedding_model_url=self.agent_profile.memory_config["embedding_url"],
            model_name=self.agent_profile.memory_config["embedding_model"]
        )
        self.memory_trace: List[MemoryItem] = []
        self.tool_calls: List[ToolCallTrace] = []
        self.final_answer: Optional[str] = None

    def add_tool_trace(self, name: str, args: Dict[str, Any], result: Any):
        trace = ToolCallTrace(name, args, result)
        self.tool_calls.append(trace)

    def add_memory(self, item: MemoryItem):
        self.memory_trace.append(item)
        self.memory.add(item)

    def __repr__(self):
        return f"<AgentContext step={self.step}, session_id={self.session_id}>"
