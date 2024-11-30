"""
Main entry point for the FastAPI backend application.
"""

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Backend!"}
