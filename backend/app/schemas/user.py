# schemas/user.py

"""
Defines Pydantic models for user-related requests and responses.
"""

from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    name: str  # Add the name attribute

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        orm_mode = True