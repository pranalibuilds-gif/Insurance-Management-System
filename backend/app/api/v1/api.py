from fastapi import APIRouter
from app.api.v1.endpoints import auth, products, policies, claims, customers, documents, billing, notifications, admin

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(policies.router, prefix="/policies", tags=["Policies"])
api_router.include_router(claims.router, prefix="/claims", tags=["Claims"])
api_router.include_router(customers.router, prefix="/customers", tags=["Customers"])
api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
api_router.include_router(billing.router, prefix="/billing", tags=["Billing"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
