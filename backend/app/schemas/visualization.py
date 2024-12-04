"""
Defines Pydantic models for visualization-related requests and responses.
"""

from pydantic import BaseModel

class VisualizationCreate(BaseModel):
    user_id: int
    chart_type: str
    config_data: str

class VisualizationResponse(BaseModel):
    id: int
    user_id: int
    chart_type: str
    config_data: str

    class Config:
        orm_mode = True
