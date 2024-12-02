# visualization.py

"""
Defines the database schema for visualizations.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base

class Visualization(Base):
    __tablename__ = 'visualizations'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    chart_type = Column(String, nullable=False)
    config_data = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="visualizations")

    def __repr__(self):
        return f"<Visualization(id={self.id}, user_id={self.user_id}, chart_type={self.chart_type})>"
