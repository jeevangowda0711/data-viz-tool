# ai_insights.py

"""
Integrates AI APIs to generate insights from datasets.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.services.ai_service import generate_insights
from app.caching.cache import redis_client
import json

router = APIRouter()

class InsightsRequest(BaseModel):
    dataset_id: int

@router.post("/insights")
async def generate_insights_endpoint(request: InsightsRequest, db: Session = Depends(get_db)):
    # Check cache first
    cached_data = redis_client.get(f"insights:{request.dataset_id}")
    if cached_data:
        insights = json.loads(cached_data)
        return {"insights": insights}
    
    insights = generate_insights(request.dataset_id, db)
    if not insights:
        raise HTTPException(status_code=500, detail="Failed to generate insights")
    
    # Cache the insights
    redis_client.set(f"insights:{request.dataset_id}", json.dumps(insights))
    
    return {"insights": insights}

