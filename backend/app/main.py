from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.exceptions import IMPException, imp_exception_handler
import structlog

# Logger Setup
structlog.configure(
    processors=[
        structlog.processors.JSONRenderer()
    ]
)
logger = structlog.get_logger()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_exception_handler(IMPException, imp_exception_handler)

# CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "operational", "version": "1.0.0"}

@app.get("/")
def root():
    return {"message": f"Welcome to the {settings.PROJECT_NAME} API"}
