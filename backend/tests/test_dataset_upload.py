import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_upload_dataset(db):
    with open("test.csv", "w") as f:
        f.write("column1,column2\nvalue1,value2")
    with open("test.csv", "rb") as f:
        response = client.post("/datasets/upload", files={"file": f})
    assert response.status_code == 200
    assert "id" in response.json()
