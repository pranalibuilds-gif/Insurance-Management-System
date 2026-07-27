from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from app.models.user import User
from app.models.customer import Customer
from app.models.policy import Policy
from app.models.claim import Claim

async def run_validation(db: AsyncSession):
    print("\n🔍 Running Data Integrity Validation...")

    # 1. Total User Count
    user_count = (await db.execute(select(func.count(User.id)))).scalar()
    print(f"- Total Users: {user_count}")

    # 2. Total Customer Count
    cust_count = (await db.execute(select(func.count(Customer.id)))).scalar()
    print(f"- Total Customers: {cust_count}")

    # 3. Policy Consistency
    policy_count = (await db.execute(select(func.count(Policy.id)))).scalar()
    print(f"- Total Policies: {policy_count}")

    # 4. Claim Consistency
    claim_count = (await db.execute(select(func.count(Claim.id)))).scalar()
    print(f"- Total Claims: {claim_count}")

    # 5. Check for orphans (simple check)
    orphan_customers = (await db.execute(select(func.count(Customer.id)).where(Customer.user_id == None))).scalar()
    if orphan_customers > 0:
        print(f"⚠️ Warning: Found {orphan_customers} orphan customers.")
    else:
        print("✅ No orphan customers found.")

    print("✅ Validation completed successfully.")
