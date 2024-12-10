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
from app.caching.cache import redis_client
import json

router = APIRouter()

@router.post("/create", response_model=VisualizationResponse)
def create_visualization_endpoint(
    visualization: VisualizationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    visualization = create_visualization(visualization, db)
    # Cache the visualization
    redis_client.set(f"visualization:{visualization.id}", json.dumps({
        "id": visualization.id,
        "chart_type": visualization.chart_type,
        "config_data": visualization.config_data
    }))
    return visualization

@router.get("/{visualization_id}", response_model=VisualizationResponse)
def get_visualization_endpoint(visualization_id: int, db: Session = Depends(get_db)):
    # Check cache first
    cached_data = redis_client.get(f"visualization:{visualization_id}")
    if cached_data:
        data = json.loads(cached_data)
        return VisualizationResponse(id=data["id"], chart_type=data["chart_type"], config_data=data["config_data"])
    
    visualization = get_visualization(visualization_id, db)
    if not visualization:
        raise HTTPException(status_code=404, detail="Visualization not found")
    
    # Cache the visualization
    redis_client.set(f"visualization:{visualization.id}", json.dumps({
        "id": visualization.id,
        "chart_type": visualization.chart_type,
        "config_data": visualization.config_data
    }))
    
    return visualization
