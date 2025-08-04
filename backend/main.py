import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Data
from pathlib import Path

def process_entry(entry: dict) -> dict:
    from urllib.parse import urlparse
    import string

    content = entry['content']
    sources = entry['sources']
    cited = []
    non_cited = []
    citation_index = 0

    def get_letter(n):
        return string.ascii_uppercase[n]

    # Replace bold tags with markdown-style bold
    content = content.replace("<b>", "**").replace("</b>", "**")

    for source in sources:
        source_id = source['id']
        url = source['source']
        domain = urlparse(url).netloc
        favicon = f"https://www.google.com/s2/favicons?domain={domain}&sz=64"
        ref_tag = f"<ref>{source_id}</ref>"

        if ref_tag in content:
            letter = get_letter(citation_index)

            # Replace <ref> tags with spaced markdown citations [[A]](#cite-A)
            replacement = f" [[{letter}]](#cite-{letter})"

            # Handle spaced refs first (prevents double spaces), then unspaced refs (adds space)
            content = content.replace(f" {ref_tag}", replacement)
            content = content.replace(ref_tag, replacement)

            enriched = {
                **source,
                "favicon": favicon,
                "letter": letter
            }
            cited.append(enriched)
            citation_index += 1
        else:
            enriched = {**source, "favicon": favicon}
            non_cited.append(enriched)

    return {
        "category": entry['category'],
        "original_content": entry['content'],
        "processed_content": content,
        "sources": {
            "cited": cited,
            "non_cited": non_cited
        }
    }


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #TODO: Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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