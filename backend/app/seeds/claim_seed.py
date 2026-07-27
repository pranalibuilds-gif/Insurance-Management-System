from sqlalchemy.ext.asyncio import AsyncSession
from app.models.claim import Claim
from app.models.policy import Policy
from app.seeds.utils import pick_weighted
from datetime import timedelta, date
import random
import uuid

async def seed_claims(db: AsyncSession, policies: list):
    created_claims = []

    # 15% of policies have a claim
    for policy in policies:
        if random.random() > 0.15:
            continue

        incident_date = policy.start_date + timedelta(days=random.randint(30, 300))
        if incident_date > date.today():
            continue

        status = pick_weighted(["PAID", "APPROVED", "REJECTED", "UNDER_INVESTIGATION", "SUBMITTED"], [60, 10, 10, 15, 5])

        claim = Claim(
            claim_number=f"CLM-{uuid.uuid4().hex[:6].upper()}",
            policy_id=policy.id,
            status=status,
            incident_date=incident_date,
            description=f"Claim for {policy.policy_number} incident.",
            requested_amount=policy.coverage_amount * random.uniform(0.01, 0.1),
            approved_amount=0.0,
            settlement_amount=0.0,
            created_at=incident_date + timedelta(days=2)
        )

        if status in ["APPROVED", "PAID"]:
            claim.approved_amount = claim.requested_amount * random.uniform(0.8, 1.0)
        if status == "PAID":
            claim.settlement_amount = claim.approved_amount

        db.add(claim)
        created_claims.append(claim)

    await db.commit()
    print(f"✅ Created {len(created_claims)} claims.")
    return created_claims
