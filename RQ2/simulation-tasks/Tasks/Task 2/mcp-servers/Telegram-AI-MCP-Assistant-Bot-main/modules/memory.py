# modules/memory.py → Memory Manager
# Role: Embedding-based semantic memory using FAISS.

# Responsibilities:

# Store & retrieve MemoryItem objects

# Use local embedding server (e.g., Ollama) to vectorize input

# Filter memory based on type/tags/session

# Dependencies:

# faiss, requests, pydantic

# Used by: context.py, loop.py

# Inputs: Queries and tool outputs

# Outputs: Retrieved memory items for context injection

# modules/memory.py

from typing import List, Optional, Literal
from pydantic import BaseModel
from datetime import datetime
import requests
import numpy as np
import faiss


class MemoryItem(BaseModel):
    text: str
    type: Literal["preference", "tool_output", "fact", "query", "system"] = "fact"
    timestamp: Optional[str] = datetime.now().isoformat()
    tool_name: Optional[str] = None
    user_query: Optional[str] = None
    tags: List[str] = []
    session_id: Optional[str] = None


class MemoryManager:
    def __init__(self, embedding_model_url: str, model_name: str = "nomic-embed-text"):
        self.embedding_model_url = embedding_model_url
        self.model_name = model_name
        self.index: Optional[faiss.IndexFlatL2] = None
        self.data: List[MemoryItem] = []
        self.embeddings: List[np.ndarray] = []

    def _get_embedding(self, text: str) -> np.ndarray:
        response = requests.post(
            self.embedding_model_url,
            json={"model": self.model_name, "prompt": text}
        )
        response.raise_for_status()
        return np.array(response.json()["embedding"], dtype=np.float32)

    def add(self, item: MemoryItem):
        embedding = self._get_embedding(item.text)
        self.embeddings.append(embedding)
        self.data.append(item)

        # Init or add to index
        if self.index is None:
            self.index = faiss.IndexFlatL2(len(embedding))
        self.index.add(np.stack([embedding]))

    def retrieve(
        self,
        query: str,
        top_k: int = 3,
        type_filter: Optional[str] = None,
        tag_filter: Optional[List[str]] = None,
        session_filter: Optional[str] = None
    ) -> List[MemoryItem]:
        if not self.index or len(self.data) == 0:
            return []

        query_vec = self._get_embedding(query).reshape(1, -1)
        D, I = self.index.search(query_vec, top_k * 2)  # overfetch for filtering

        results = []
        for idx in I[0]:
            if idx >= len(self.data):
                continue
            item = self.data[idx]

            if type_filter and item.type != type_filter:
                continue
            if tag_filter and not any(tag in item.tags for tag in tag_filter):
                continue
            if session_filter and item.session_id != session_filter:
                continue

            results.append(item)
            if len(results) >= top_k:
                break

        return results

    def bulk_add(self, items: List[MemoryItem]):
        for item in items:
            self.add(item)
