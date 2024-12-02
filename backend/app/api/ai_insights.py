# ai_insights.py

"""
Integrates AI APIs to generate insights from datasets.
"""

from fastapi import APIRouter, HTTPException
import pandas as pd
import requests

router = APIRouter()

datasets = {}

@router.post("/ai/insights")
async def generate_insights(dataset_id: str):
    if dataset_id not in datasets:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = datasets[dataset_id]
    data_payload = df.to_json(orient='records')

    ai_api_endpoint = "https://api.geminiai.com/v1/insights"
    headers = {
        "Authorization": f"Bearer {Config.GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": Config.GEMINI_MODEL_NAME,
        "data": data_payload
    }

    try:
        response = requests.post(ai_api_endpoint, json=payload, headers=headers)
        response.raise_for_status()
        insights = response.json()
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=500, detail="Error calling the AI API")

    return {"insights": insights}

