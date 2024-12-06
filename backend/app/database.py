# app/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import DevelopmentConfig

DATABASE_URL = DevelopmentConfig.SQLALCHEMY_DATABASE_URI

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()