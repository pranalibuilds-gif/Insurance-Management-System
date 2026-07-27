from sqlalchemy.ext.asyncio import AsyncSession
from app.models.notification import Notification
from app.models.user import User
from app.seeds.utils import get_random_date_between, pick_weighted
from datetime import timedelta, datetime
import random

async def seed_notifications(db: AsyncSession, users: list):
    created_count = 0

    categories = ["POLICY", "BILLING", "CLAIMS", "KYC", "SECURITY", "SYSTEM"]
    types = ["INFO", "SUCCESS", "WARNING", "DANGER"]

    for user in users:
        # Each user has 5-15 notifications
        num_notif = random.randint(5, 15)
        for _ in range(num_notif):
            created_at = get_random_date_between(user.created_at, datetime.now())

            notif = Notification(
                user_id=user.id,
                category=random.choice(categories),
                title=f"Notification for {user.email.split('@')[0]}",
                message="This is a simulated notification message for demo purposes.",
                type=random.choice(types),
                status=pick_weighted(["READ", "UNREAD", "ARCHIVED"], [70, 20, 10]),
                created_at=created_at
            )
            db.add(notif)
            created_count += 1

    await db.commit()
    print(f"✅ Created {created_count} notifications.")
    return created_count
