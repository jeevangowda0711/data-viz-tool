# dataset_upload.py

"""
Manages dataset upload routes, including validation and preprocessing.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io

router = APIRouter()

@router.post("/datasets/upload")
async def upload_dataset(file: UploadFile = File(...)):
    if file.content_type not in ["text/csv", "application/vnd.ms-excel"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only CSV files are allowed.")
    
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception:
        raise HTTPException(status_code=400, detail="Error reading the file.")
    
    if df.empty:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    
    required_columns = ["column1", "column2"]
    if not all(column in df.columns for column in required_columns):
        raise HTTPException(status_code=400, detail="Missing required columns.")
    
    df.fillna(method='ffill', inplace=True)
    
    label_encoders = {}
    categorical_columns = df.select_dtypes(include=['object']).columns
    for column in categorical_columns:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le
    
    scaler = StandardScaler()
    numerical_columns = df.select_dtypes(include=['int64', 'float64']).columns
    df[numerical_columns] = scaler.fit_transform(df[numerical_columns])
    
    return {"message": "Dataset uploaded, validated, and preprocessed successfully."}

