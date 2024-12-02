# config.py

"""
Holds application configuration variables, including database URIs and secret keys.
"""

import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    # General Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-default-secret-key')
    DEBUG = False

    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://username:password@localhost:5432/your_database'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-default-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # Expiration time in seconds

    # Redis Configuration
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')

    # AI Model Configuration
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'your-default-gemini-api-key')
    GEMINI_MODEL_NAME = 'gemini-flash-1.5'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'  # Use in-memory database for testing
