"""
Implements caching logic using Redis for datasets and visualizations.
"""

# cache.py
import redis
from app.core.config import Config

redis_client = redis.StrictRedis.from_url(Config.REDIS_URL)
