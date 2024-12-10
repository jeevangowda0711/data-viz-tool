from pydantic import BaseModel

class DatasetCreate(BaseModel):
    name: str
    data: str

class DatasetResponse(BaseModel):
    id: int
    name: str
    data: str

    class Config:
        orm_mode = True