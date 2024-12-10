# dataset_upload.py

"""
Manages dataset upload routes, including validation and preprocessing.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
import pandas as pd
from io import StringIO
from typing import List
from app.database import get_db
from app.schemas.dataset import DatasetResponse
from app.models.dataset import Dataset
from app.models.user import User
from app.dependencies import get_current_user  # Import the get_current_user dependency

router = APIRouter()

@router.post("/upload", response_model=DatasetResponse)
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # Use the get_current_user dependency
):
    contents = await file.read()
    df = pd.read_csv(StringIO(contents.decode('utf-8')))
    
    if df.empty:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    
    dataset = Dataset(name=file.filename, data=df.to_json(), user_id=current_user.id)
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    
    return DatasetResponse(id=dataset.id, name=dataset.name, data=dataset.data)

@router.get("/{dataset_id}", response_model=DatasetResponse)
def get_dataset(dataset_id: int, db: Session = Depends(get_db)):
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset

@router.get("/", response_model=List[DatasetResponse])
def get_datasets(db: Session = Depends(get_db)):
    datasets = db.query(Dataset).all()
    return datasets