"""
Integrates with AI APIs to generate insights from datasets.
"""

from sqlalchemy.orm import Session
from fastapi import HTTPException
import requests
from app.models.dataset import Dataset
from app.core.config import Config

def generate_insights(dataset_id: int, db: Session):
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    response = requests.post(
        "https://api.example.com/generate-insights",
        json={"data": dataset.data},
        headers={"Authorization": f"Bearer {Config.GEMINI_API_KEY}"}
    )
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to generate insights")
    
    return response.json()
