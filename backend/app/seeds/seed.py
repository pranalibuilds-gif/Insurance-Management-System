import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.seeds.staff_seed import seed_staff
from app.seeds.product_seed import seed_products
from app.seeds.customer_seed import seed_customers
from app.seeds.policy_seed import seed_policies
from app.seeds.claim_seed import seed_claims
from app.seeds.notification_seed import seed_notifications
from app.seeds.audit_seed import seed_audits
from app.seeds.validation import run_validation
from app.models.base.base import Base
import app.models # Register all models
from app.core.database import engine

async def run_seed():
    print("🚀 Starting Comprehensive Demo Data Generation (4-6 Years Simulation)...")

    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        try:
            # Phase 2: Staff Organization
            staff = await seed_staff(db)

            # Phase 3: Product Lifecycle History
            products = await seed_products(db)

            # Phase 4: Diverse Customer Base
            customers = await seed_customers(db, count=150)

            # Phase 5 & 6: Historical Policies & Financial Ledger
            policies = await seed_policies(db, customers, products)

            # Phase 7: Claims Case History
            await seed_claims(db, policies)

            # Phase 8: Operational Notifications
            # Get all users (staff + customers)
            from sqlalchemy import select
            from app.models.user import User
            all_users = (await db.execute(select(User))).scalars().all()
            await seed_notifications(db, all_users)

            # Phase 9: System Audit Trail
            await seed_audits(db, all_users)

            # Phase 10: Validation
            await run_validation(db)

            print("\n✨ Demo Data Generation Successfully Completed!")

        except Exception as e:
            print(f"❌ Error during seeding: {e}")
            await db.rollback()
            raise

if __name__ == "__main__":
    asyncio.run(run_seed())
