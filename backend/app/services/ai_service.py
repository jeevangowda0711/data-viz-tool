from sqlalchemy.orm import Session
from fastapi import HTTPException
import pandas as pd
from io import StringIO
from app.models.dataset import Dataset
from app.core.config import Config
import google.generativeai as genai

def generate_insights(dataset_id: int, db: Session):
    # Retrieve the dataset from the database
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Convert the dataset to a pandas DataFrame
    try:
        df = pd.read_json(StringIO(dataset.data))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Error parsing dataset: {str(e)}")
    
    # Convert the DataFrame to a JSON payload
    data_payload = df.to_json(orient='records')
    
    # Configure the Google Generative AI API
    genai.configure(api_key=Config.GEMINI_API_KEY)
    
    # Initialize the model
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Define the prompt for the AI API
    prompt = f"""
You are an AI assistant helping users understand their datasets. 
1. Generate concise insights from the following dataset: {data_payload}. Provide only high-level information about trends, outliers, or key points.
2. Based on the data provided, recommend visualizations for bar, line, or pie charts. For each chart:
   - Suggest the most relevant X and Y columns.
   - Explain what the resulting plot will reveal.
"""
    
    # Call the AI model
    try:
        response = model.generate_content(prompt)
        insights_text = response.text.strip()  # Ensure the text is clean and trimmed

        # Return the insights as a plain string
        return {"insights": insights_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling the AI API: {str(e)}")
