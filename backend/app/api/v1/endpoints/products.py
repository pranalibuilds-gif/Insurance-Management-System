from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.product import ProductRead
from app.services.product import ProductService
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ProductRead])
async def list_products(db: AsyncSession = Depends(get_db)):
    service = ProductService(db)
    return await service.list_products()
