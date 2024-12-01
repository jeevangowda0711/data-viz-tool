# main.py

"""
Main entry point for the FastAPI backend application.
"""

from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import Base as UserBase
from app.models.visualization import Base as VisualizationBase
from app.config import DevelopmentConfig
from app.api.auth import router as auth_router
from app.api.dataset_upload import router as dataset_upload_router
from app.api.visualization import router as visualization_router
from app.api.ai_insights import router as ai_insights_router

DATABASE_URL = DevelopmentConfig.SQLALCHEMY_DATABASE_URI

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

# Create the database tables
UserBase.metadata.create_all(bind=engine)
VisualizationBase.metadata.create_all(bind=engine)

@app.on_event("startup")
def on_startup():
    # Code to run on startup
    pass

@app.on_event("shutdown")
def on_shutdown():
    # Code to run on shutdown
    pass

# Example route
@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(dataset_upload_router, prefix="/datasets", tags=["datasets"])
app.include_router(visualization_router, prefix="/visualizations", tags=["visualizations"])
app.include_router(ai_insights_router, prefix="/ai", tags=["ai"])