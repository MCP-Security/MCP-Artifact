from pydantic import BaseModel, Field
from typing import List

# Input/Output models for tools

class AddInput(BaseModel):
    a: int
    b: int

class AddOutput(BaseModel):
    result: int

class SqrtInput(BaseModel):
    a: int

class SqrtOutput(BaseModel):
    result: float

class StringsToIntsInput(BaseModel):
    string: str

class StringsToIntsOutput(BaseModel):
    ascii_values: List[int]

class ExpSumInput(BaseModel):
    int_list: List[int] = Field(alias="numbers")

class ExpSumOutput(BaseModel):
    result: float

class PythonCodeInput(BaseModel):
    code: str

class PythonCodeOutput(BaseModel):
    result: str

class UrlInput(BaseModel):
    url: str

class FilePathInput(BaseModel):
    file_path: str

class MarkdownInput(BaseModel):
    text: str

class MarkdownOutput(BaseModel):
    markdown: str

class ChunkListOutput(BaseModel):
    chunks: List[str]

class ShellCommandInput(BaseModel):
    command: str


