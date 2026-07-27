from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit import AuditLog
from app.seeds.utils import get_random_date_between
from datetime import datetime
import random

async def seed_audits(db: AsyncSession, users: list):
    created_count = 0

    actions = ["LOGIN", "CREATED", "UPDATED", "APPROVED", "REJECTED"]
    entities = ["USER", "POLICY", "CLAIM", "CUSTOMER", "PRODUCT"]

    # Generate 500 random audit logs
    for _ in range(500):
        actor = random.choice(users)
        timestamp = get_random_date_between(actor.created_at, datetime.now())

        log = AuditLog(
            actor=actor.email,
            action=random.choice(actions),
            category="BUSINESS" if random.random() > 0.3 else "SECURITY",
            entity_type=random.choice(entities),
            entity_id=f"ID-{random.randint(1000, 9999)}",
            details={"message": "Auto-generated audit event for demo."},
            ip_address=f"192.168.1.{random.randint(1, 254)}",
            timestamp=timestamp
        )
        db.add(log)
        created_count += 1

    await db.commit()
    print(f"✅ Created {created_count} audit logs.")
    return created_count
