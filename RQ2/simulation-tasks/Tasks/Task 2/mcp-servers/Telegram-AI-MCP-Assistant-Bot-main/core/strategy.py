# core/strategy.py → Planning Wrapper
# Role: Allows customization of agent strategy: reactive, multi-shot, confidence-based, etc.

# Responsibilities:

# Wraps around decision.generate_plan()

# Adds planning context: past failures, retries, agent profile

# Can implement logic like: “retry with different tool”, “skip if tool fails twice”, etc.

# Dependencies:

# modules/decision.py

# core/context.py (for prior steps)

# config/profiles.yaml (agent behavior/personality traits)

# Inputs: Perception + retrieved memory + prior steps

# Outputs: Structured plan: FUNCTION_CALL or FINAL_ANSWER

# core/strategy.py

from modules.perception import PerceptionResult
from modules.memory import MemoryItem
from modules.tools import summarize_tools, filter_tools_by_hint
from modules.decision import generate_plan
from core.context import AgentContext
from typing import Any


async def decide_next_action(
    context: AgentContext,
    perception: PerceptionResult,
    memory_items: list[MemoryItem],
    all_tools: list[Any],
    last_result: str = "",
) -> str:
    """
    Decides what to do next using the planning strategy defined in agent profile.
    Wraps around the `generate_plan()` logic with strategy-aware control.
    """

    strategy = context.agent_profile.strategy
    step = context.step + 1
    max_steps = context.agent_profile.max_steps
    tool_hint = perception.tool_hint

    # Step 1: Try hint-based filtered tools first
    filtered_tools = filter_tools_by_hint(all_tools, hint=tool_hint)
    filtered_summary = summarize_tools(filtered_tools)

    plan = await generate_plan(
        perception=perception,
        memory_items=memory_items,
        tool_descriptions=filtered_summary,
        step_num=step,
        max_steps=max_steps,
    )

    # Strategy enforcement
    if strategy == "conservative":
        return plan

    if strategy == "retry_once" and "unknown" in plan.lower():
        # Retry with all tools if hint-based filtering failed
        full_summary = summarize_tools(all_tools)
        return generate_plan(
            perception=perception,
            memory_items=memory_items,
            tool_descriptions=full_summary,
            step_num=step,
            max_steps=max_steps,
        )

    # Placeholder for future "explore_all" parallel planner
    return plan
