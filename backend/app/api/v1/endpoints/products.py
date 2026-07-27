from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.product import ProductRead, ProductCreate
from app.services.product import ProductService
from app.core.security.deps import RoleChecker
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ProductRead])
async def list_products(db: AsyncSession = Depends(get_db)):
    service = ProductService(db)
    return await service.list_products()

@router.post("/", response_model=ProductRead)
async def create_product(
    product_in: ProductCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RoleChecker(["ADMIN", "MANAGER"]))
):
    service = ProductService(db)
    return await service.create_product(product_in)
