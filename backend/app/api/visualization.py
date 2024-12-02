# backend/app/api/visualization.py

from fastapi import APIRouter, HTTPException
import pandas as pd
import matplotlib.pyplot as plt
import io
from fastapi.responses import StreamingResponse

router = APIRouter()

datasets = {}
visualizations = {}

@router.post("/visualizations/create")
async def create_visualization(dataset_id: str, x_column: str, y_column: str):
    if dataset_id not in datasets:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = datasets[dataset_id]
    
    if x_column not in df.columns or y_column not in df.columns:
        raise HTTPException(status_code=400, detail="Specified columns do not exist in the dataset")
    
    plt.figure()
    df.plot(x=x_column, y=y_column)

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    
    visualization_id = f"vis_{len(visualizations) + 1}"
    visualizations[visualization_id] = buf.getvalue()
    
    return {"visualization_id": visualization_id}

@router.get("/visualizations/{visualization_id}")
async def get_visualization(visualization_id: str):
    if visualization_id not in visualizations:
        raise HTTPException(status_code=404, detail="Visualization not found")
    
    image_bytes = visualizations[visualization_id]
    return StreamingResponse(io.BytesIO(image_bytes), media_type="image/png")
