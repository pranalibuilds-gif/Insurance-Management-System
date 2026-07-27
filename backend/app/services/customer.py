from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.customer import Customer
from app.schemas.customer import CustomerUpdate
from app.core.exceptions import IMPException
from fastapi import status
from uuid import UUID

class CustomerService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_profile(self, user_id: UUID) -> Customer:
        query = select(Customer).where(Customer.user_id == user_id)
        result = await self.db.execute(query)
        customer = result.scalar_one_or_none()
        if not customer:
            raise IMPException("Customer profile not found", status_code=status.HTTP_404_NOT_FOUND)
        return customer

    async def update_profile(self, user_id: UUID, data: CustomerUpdate) -> Customer:
        customer = await self.get_profile(user_id)
        for field, value in data.dict(exclude_unset=True).items():
            setattr(customer, field, value)
        await self.db.commit()
        await self.db.refresh(customer)
        return customer
