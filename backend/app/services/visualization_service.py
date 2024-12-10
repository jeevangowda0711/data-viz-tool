"""
Handles visualization creation and retrieval logic.
"""

from sqlalchemy.orm import Session
from app.models.visualization import Visualization
from app.schemas.visualization import VisualizationCreate
from datetime import datetime

def create_visualization(visualization: VisualizationCreate, db: Session) -> Visualization:
    db_visualization = Visualization(
        chart_type=visualization.chart_type,
        config_data=visualization.config_data,
        user_id=visualization.user_id,
        dataset_id=visualization.dataset_id,  # Ensure dataset_id is set
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(db_visualization)
    db.commit()
    db.refresh(db_visualization)
    return db_visualization

def get_visualization(visualization_id: int, db: Session) -> Visualization:
    return db.query(Visualization).filter(Visualization.id == visualization_id).first()
