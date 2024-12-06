# dataset_upload.py

"""
Manages dataset upload routes, including validation and preprocessing.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
import pandas as pd
import io
from app.database import get_db
from app.schemas.dataset import DatasetResponse
from app.models.dataset import Dataset

router = APIRouter()

@router.post("/upload", response_model=DatasetResponse)
async def upload_dataset(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading the file: {str(e)}")
    
    if df.empty:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    
    dataset = Dataset(name=file.filename, data=df.to_json())
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    
    return DatasetResponse(id=dataset.id, name=dataset.name, data=dataset.data)