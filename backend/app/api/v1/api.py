from fastapi import APIRouter
from app.api.v1.endpoints import auth, products, policies, claims

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(policies.router, prefix="/policies", tags=["Policies"])
api_router.include_router(claims.router, prefix="/claims", tags=["Claims"])
