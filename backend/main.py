import json
from fastapi import FastAPI
from models import Data
from pathlib import Path
from urllib.parse import urlparse

def process_entry(entry: dict) -> dict:
    content = entry['content']
    print("content:", content)
    sources = entry['sources']
    # print("sources:", sources)
    cited = []
    non_cited = []
    processed = content 
    
    for source in sources:
        source_id = source['id']
        url = source['source']
        domain = urlparse(url).netloc
        favicon = f"https://{domain}/favicon.ico"
        enriched = {**source, "favicon": favicon}
        
        if f"[{source_id}]" in content:
            processed = processed.replace(f"[{source_id}]", f"[{source_id}]({url})")
            cited.append(enriched)
        else:
            non_cited.append(enriched)
    
    return {
        "category": entry['category'],
        "original_content": content,
        "processed_content": processed,
        "sources": {
            "cited": cited,
            "non_cited": non_cited
        }
    }

app = FastAPI()


@app.get("/data", response_model=list[Data])
def get_data() -> list[Data]:
    raw_data = Path("data/mock.json").read_text()
    items = json.loads(raw_data)

    enriched_items = [process_entry(item) for item in items]
    return [Data.model_validate(e) for e in enriched_items]


if __name__ == "__main__":
    print("Starting test...")
    raw_data = Path("data/mock.json").read_text()
    items = json.loads(raw_data)
    result = process_entry(items[0])
    print("RESULT:", result)