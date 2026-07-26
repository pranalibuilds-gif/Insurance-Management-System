from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Insurance Management Platform"
    API_V1_STR: str = "/api/v1"

    # Security
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_FOR_JWT_SIGNING" # Change in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/imp_db"

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
