from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.policy import Policy
from app.models.product import Product
from app.schemas.policy import PolicyCreate
from app.core.exceptions import IMPException
from fastapi import status
from datetime import date, timedelta
import uuid

class PolicyService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def issue_policy(self, customer_id: uuid.UUID, policy_in: PolicyCreate) -> Policy:
        # Validate Product
        query = select(Product).where(Product.id == policy_in.product_id)
        result = await self.db.execute(query)
        product = result.scalar_one_or_none()

        if not product:
            raise IMPException("Product not found", status_code=status.HTTP_404_NOT_FOUND)

        # Generate unique policy number
        policy_number = f"IMP-{product.category[:3]}-{uuid.uuid4().hex[:8].upper()}"

        db_policy = Policy(
            policy_number=policy_number,
            customer_id=customer_id,
            product_id=product.id,
            coverage_amount=policy_in.coverage_amount,
            premium_frequency=policy_in.premium_frequency,
            start_date=policy_in.start_date,
            end_date=policy_in.end_date,
            nominee_ids=policy_in.nominee_ids
        )

        self.db.add(db_policy)
        await self.db.commit()
        await self.db.refresh(db_policy)
        return db_policy

    async def get_customer_policies(self, customer_id: uuid.UUID):
        query = select(Policy).where(Policy.customer_id == customer_id)
        result = await self.db.execute(query)
        return list(result.scalars().all())
