# visualization.py

"""
Defines the database schema for visualizations.
"""

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base

class Visualization(Base):
    __tablename__ = 'visualizations'

    id = Column(Integer, primary_key=True, index=True)
    chart_type = Column(String, nullable=False)
    config_data = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    dataset_id = Column(Integer, ForeignKey('datasets.id'), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="visualizations")
    dataset = relationship("Dataset", back_populates="visualizations")
