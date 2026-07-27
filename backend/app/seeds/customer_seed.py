from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.models.customer import Customer
from app.core.security.auth import get_password_hash
from app.seeds.utils import get_random_date, get_random_birthdate, pick_weighted
import random

FIRST_NAMES = ["John", "Jane", "Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Heidi"]
LAST_NAMES = ["Smith", "Doe", "Johnson", "Wilson", "Brown", "Taylor", "Miller", "Davis", "White"]
CITIES = ["New York", "Los Angeles", "Chicago", "Houston", "Mumbai", "London", "Berlin"]

async def seed_customers(db: AsyncSession, count: int = 150):
    created_customers = []
    for i in range(count):
        fname = random.choice(FIRST_NAMES)
        lname = random.choice(LAST_NAMES)
        email = f"{fname.lower()}.{lname.lower()}.{i}@example.com"

        user = User(
            email=email,
            password_hash=get_password_hash("password123"),
            full_name=f"{fname} {lname}",
            role="CUSTOMER",
            is_active=True,
            is_verified=True,
            created_at=get_random_date(2020, 2025)
        )
        db.add(user)
        await db.flush() # Get user id

        kyc_status = pick_weighted(["VERIFIED", "PENDING", "REJECTED", "NOT_SUBMITTED"], [80, 10, 5, 5])
        status = "ACTIVE" if kyc_status == "VERIFIED" else "REGISTERED"

        customer = Customer(
            user_id=user.id,
            first_name=fname,
            last_name=lname,
            phone=f"+1{random.randint(1000000000, 9999999999)}",
            dob=get_random_birthdate(),
            kyc_status=kyc_status,
            status=status,
            address={
                "line1": f"{random.randint(1, 999)} Emerald St",
                "city": random.choice(CITIES),
                "country": "USA"
            },
            created_at=user.created_at
        )
        db.add(customer)
        created_customers.append(customer)

    await db.commit()
    print(f"✅ Created {len(created_customers)} customers.")
    return created_customers
