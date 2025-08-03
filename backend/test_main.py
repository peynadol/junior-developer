import pytest
from main import process_entry  

def test_process_entry_basic():

    # Single mock entry with a source reference
    mock_entry = {
        "category": "housing",
        "content": "Check out <ref>source123</ref> for more info", 
        "sources": [
            {"id": "source123", "title": "Housing Guide", "source": "https://example.com"}
        ]
    }
    
    result = process_entry(mock_entry)
    
    assert "[[A]](#cite-A)" in result["processed_content"]
    assert len(result["sources"]["cited"]) == 1
    assert len(result["sources"]["non_cited"]) == 0
    assert result["sources"]["cited"][0]["letter"] == "A"

def test_no_source_replacement():
    # Test content with no source references
    mock_entry = {
        "category": "housing", 
        "content": "Just some text", 
        "sources": []
    }
    result = process_entry(mock_entry)
    assert result["processed_content"] == "Just some text"
    assert len(result["sources"]["cited"]) == 0
    assert len(result["sources"]["non_cited"]) == 0

def test_bold_tag_replacement():
    # Test that <b> tags get converted to markdown
    mock_entry = {
        "category": "housing",
        "content": "<b>Important</b> information here",
        "sources": []
    }
    result = process_entry(mock_entry)
    assert "**Important**" in result["processed_content"]