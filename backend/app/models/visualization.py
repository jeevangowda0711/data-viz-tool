# visualization.py

"""
Defines the database schema for visualizations.
"""

from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Visualization(Base):
    __tablename__ = "visualizations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    chart_type = Column(String, index=True)
    config_data = Column(Text)

    user = relationship("User", back_populates="visualizations")
