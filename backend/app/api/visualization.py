"""
Provides endpoints for creating and fetching visualizations.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.visualization_service import create_visualization, get_visualization
from app.schemas.visualization import VisualizationCreate, VisualizationResponse
from app.database import get_db

router = APIRouter()

@router.post("/create", response_model=VisualizationResponse)
def create_visualization_endpoint(visualization: VisualizationCreate, db: Session = Depends(get_db)):
    return create_visualization(visualization, db)

@router.get("/{visualization_id}", response_model=VisualizationResponse)
def get_visualization_endpoint(visualization_id: int, db: Session = Depends(get_db)):
    visualization = get_visualization(visualization_id, db)
    if not visualization:
        raise HTTPException(status_code=404, detail="Visualization not found")
    return visualization
