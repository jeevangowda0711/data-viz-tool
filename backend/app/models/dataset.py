from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base

class Dataset(Base):
    __tablename__ = 'datasets'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    data = Column(Text, nullable=False)  # Changed from LargeBinary to Text
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="datasets")
    visualizations = relationship("Visualization", back_populates="dataset")