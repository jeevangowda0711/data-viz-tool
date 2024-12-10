# ai_insights.py

"""
Integrates AI APIs to generate insights from datasets.
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.services.ai_service import generate_insights

router = APIRouter()

class InsightsRequest(BaseModel):
    dataset_id: int

@router.post("/insights")
async def generate_insights_endpoint(request: InsightsRequest, db: Session = Depends(get_db)):
    return generate_insights(request.dataset_id, db)

