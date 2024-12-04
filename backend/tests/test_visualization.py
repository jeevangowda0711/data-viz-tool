import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app
from app.schemas.visualization import VisualizationCreate

client = TestClient(app)

def test_create_visualization(db):
    # Create a user first
    client.post("/auth/signup", json={"email": "test@example.com", "password": "testpassword"})
    
    visualization_data = {
        "user_id": 1,
        "chart_type": "bar",
        "config_data": '{"x": "column1", "y": "column2"}'
    }
    response = client.post("/visualizations/create", json=visualization_data)
    assert response.status_code == 200
    assert "id" in response.json()

def test_get_visualization(db):
    # Create a user first
    client.post("/auth/signup", json={"email": "test@example.com", "password": "testpassword"})
    
    # Create a visualization first
    visualization_data = {
        "user_id": 1,
        "chart_type": "bar",
        "config_data": '{"x": "column1", "y": "column2"}'
    }
    client.post("/visualizations/create", json=visualization_data)
    
    response = client.get("/visualizations/1")
    assert response.status_code == 200
    assert "id" in response.json()
