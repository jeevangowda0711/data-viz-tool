# dataset_upload.py

"""
Manages dataset upload routes, including validation and preprocessing.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.dataset import DatasetResponse
from app.models.dataset import Dataset
from app.models.user import User
from app.dependencies import get_current_user
from app.services.dataset_service import process_uploaded_file, get_dataset, get_datasets
from app.services.ai_service import generate_insights
from app.caching.cache import redis_client
import json
import pandas as pd

router = APIRouter()

@router.post("/upload", response_model=DatasetResponse)
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    dataset = process_uploaded_file(file, db, current_user)
    # Cache the dataset
    redis_client.set(f"dataset:{dataset.id}", json.dumps(dataset.data))
    return DatasetResponse(id=dataset.id, name=dataset.name, data=dataset.data)

@router.get("/{dataset_id}", response_model=DatasetResponse)
def get_dataset_endpoint(dataset_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Check cache first
    cached_data = redis_client.get(f"dataset:{dataset_id}")
    if cached_data:
        data = json.loads(cached_data)
        return DatasetResponse(id=dataset_id, name="Cached Dataset", data=data)
    
    dataset = get_dataset(dataset_id, db, current_user)
    # Cache the dataset
    redis_client.set(f"dataset:{dataset.id}", json.dumps(dataset.data))
    return DatasetResponse(id=dataset.id, name=dataset.name, data=dataset.data)

@router.get("/", response_model=List[DatasetResponse])
def get_datasets_endpoint(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    datasets = get_datasets(db, current_user)
    return [DatasetResponse(id=dataset.id, name=dataset.name, data=dataset.data) for dataset in datasets]

@router.post("/{dataset_id}/insights")
def generate_dataset_insights(dataset_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    insights = generate_insights(dataset_id, db)
    if not insights:
        raise HTTPException(status_code=404, detail="Insights not found")
    return {"insights": insights}