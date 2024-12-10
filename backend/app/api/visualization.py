"""
Provides endpoints for creating and fetching visualizations.
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.visualization import VisualizationCreate, VisualizationResponse
from app.services.visualization_service import create_visualization, get_visualization
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/create", response_model=VisualizationResponse)
def create_visualization_endpoint(
    visualization: VisualizationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_visualization(visualization, db)

@router.get("/{visualization_id}", response_model=VisualizationResponse)
def get_visualization_endpoint(visualization_id: int, db: Session = Depends(get_db)):
    visualization = get_visualization(visualization_id, db)
    if not visualization:
        raise HTTPException(status_code=404, detail="Visualization not found")
    return visualization
