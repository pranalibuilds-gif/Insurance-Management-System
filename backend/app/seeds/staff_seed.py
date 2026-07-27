from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.core.security.auth import get_password_hash
from app.seeds.utils import get_random_date
import uuid

STAFF_DATA = [
    {"email": "admin@imp.com", "name": "System Administrator", "role": "ADMIN"},
    {"email": "mike@imp.com", "name": "Mike Manager", "role": "MANAGER"},
    {"email": "sarah@imp.com", "name": "Sarah Adjuster", "role": "AGENT"},
    {"email": "james@imp.com", "name": "James Agent", "role": "AGENT"},
    {"email": "linda@imp.com", "name": "Linda Finance", "role": "MANAGER"},
]

async def seed_staff(db: AsyncSession):
    created_staff = []
    for staff in STAFF_DATA:
        user = User(
            email=staff["email"],
            password_hash=get_password_hash("password123"),
            full_name=staff["name"],
            role=staff["role"],
            is_active=True,
            is_verified=True,
            created_at=get_random_date(2020, 2022)
        )
        db.add(user)
        created_staff.append(user)

    await db.commit()
    print(f"✅ Created {len(created_staff)} staff members.")
    return created_staff
