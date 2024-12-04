import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app
from app.schemas.user import UserCreate

client = TestClient(app)

def test_signup(db):
    response = client.post("/auth/signup", json={"email": "test@example.com", "password": "testpassword"})
    assert response.status_code == 200
    assert "id" in response.json()
    assert "email" in response.json()

def test_login(db):
    response = client.post("/auth/signup", json={"email": "test@example.com", "password": "testpassword"})
    assert response.status_code == 200
    response = client.post("/auth/login", data={"username": "test@example.com", "password": "testpassword"})
    assert response.status_code == 200
    assert "access_token" in response.json()
