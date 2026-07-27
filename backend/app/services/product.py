from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.product import Product
from app.schemas.product import ProductRead, ProductCreate
from typing import List

class ProductService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_products(self) -> List[Product]:
        query = select(Product).where(Product.is_active == True)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_product(self, product_id) -> Product:
        query = select(Product).where(Product.id == product_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def create_product(self, product_in: ProductCreate) -> Product:
        db_obj = Product(**product_in.dict())
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj
