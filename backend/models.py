from pydantic import BaseModel

class Source(BaseModel):
    id: str
    title: str
    source: str
    favicon: str
    letter: str | None = None

class SourcesGroup(BaseModel):
    cited: list[Source]
    non_cited: list[Source]

class Data(BaseModel):
    category: str
    original_content: str
    processed_content: str
    sources: SourcesGroup
