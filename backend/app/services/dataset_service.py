"""
Processes datasets for visualization.
"""

from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
from app.models.dataset import Dataset

def process_uploaded_file(file: UploadFile, db: Session) -> Dataset:
    try:
        df = pd.read_csv(file.file)
        return process_dataset(df, file.filename, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process dataset: {str(e)}")

def process_dataset(df, filename: str, db: Session) -> Dataset:
    dataset = Dataset(name=filename, data=df.to_json())
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    return dataset
