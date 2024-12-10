"""
Defines Pydantic models for visualization-related requests and responses.
"""

from pydantic import BaseModel
from datetime import datetime

class VisualizationCreate(BaseModel):
    chart_type: str
    config_data: str
    user_id: int
    dataset_id: int  # Add this field

class VisualizationResponse(BaseModel):
    id: int
    chart_type: str
    config_data: str
    user_id: int
    dataset_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
