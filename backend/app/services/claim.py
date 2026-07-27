from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.claim import Claim
from app.models.policy import Policy
from app.schemas.claim import ClaimCreate
from app.core.exceptions import IMPException
from fastapi import status
import uuid

class ClaimService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def submit_claim(self, claim_in: ClaimCreate, user_id: uuid.UUID) -> Claim:
        # Validate Policy
        query = select(Policy).where(Policy.id == claim_in.policy_id)
        result = await self.db.execute(query)
        policy = result.scalar_one_or_none()

        if not policy:
            raise IMPException("Policy not found", status_code=status.HTTP_404_NOT_FOUND)

        # IDOR check: Verify user owns the customer record associated with the policy
        from app.models.customer import Customer
        query = select(Customer).where(Customer.id == policy.customer_id)
        result = await self.db.execute(query)
        customer = result.scalar_one_or_none()
        if not customer or customer.user_id != user_id:
            raise IMPException("You do not have permission to file a claim for this policy", status_code=status.HTTP_403_FORBIDDEN)

        # Generate claim number
        claim_number = f"CLM-{uuid.uuid4().hex[:8].upper()}"

        db_claim = Claim(
            claim_number=claim_number,
            policy_id=policy.id,
            incident_date=claim_in.incident_date,
            description=claim_in.description,
            requested_amount=claim_in.requested_amount,
            status="SUBMITTED"
        )

        self.db.add(db_claim)
        await self.db.commit()
        await self.db.refresh(db_claim)
        return db_claim

    async def list_claims(self):
        query = select(Claim)
        result = await self.db.execute(query)
        return list(result.scalars().all())
