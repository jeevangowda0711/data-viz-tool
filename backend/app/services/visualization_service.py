"""
Handles visualization creation and retrieval logic.
"""

from sqlalchemy.orm import Session
from app.models.visualization import Visualization
from app.schemas.visualization import VisualizationCreate

def create_visualization(visualization: VisualizationCreate, db: Session) -> Visualization:
    db_visualization = Visualization(**visualization.dict())
    db.add(db_visualization)
    db.commit()
    db.refresh(db_visualization)
    return db_visualization

def get_visualization(visualization_id: int, db: Session) -> Visualization:
    return db.query(Visualization).filter(Visualization.id == visualization_id).first()
