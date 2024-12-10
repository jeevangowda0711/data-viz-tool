"""
Processes datasets for visualization.
"""

from fastapi import UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
import pandas as pd
from app.models.dataset import Dataset
from app.models.user import User
from app.dependencies import get_current_user

def process_uploaded_file(file: UploadFile, db: Session, current_user: User) -> Dataset:
    try:
        df = pd.read_csv(file.file)
        return process_dataset(df, file.filename, db, current_user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process dataset: {str(e)}")

def process_dataset(df, filename: str, db: Session, current_user: User) -> Dataset:
    dataset = Dataset(name=filename, data=df.to_json(), user_id=current_user.id)
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    return dataset

def get_dataset(dataset_id: int, db: Session, current_user: User) -> Dataset:
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id, Dataset.user_id == current_user.id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset

def get_datasets(db: Session, current_user: User) -> list[Dataset]:
    datasets = db.query(Dataset).filter(Dataset.user_id == current_user.id).all()
    return datasets
