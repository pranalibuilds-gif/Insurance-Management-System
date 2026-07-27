from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.policy import Policy
from app.models.customer import Customer
from app.models.product import Product
from app.models.billing import PremiumInstallment
from app.seeds.utils import get_random_date_between, pick_weighted
from datetime import timedelta, date
import random
import uuid

async def seed_policies(db: AsyncSession, customers: list, products: list):
    created_policies = []

    # Active products only for new policies
    active_products = [p for p in products if p.status == "ACTIVE"]

    for customer in customers:
        if customer.kyc_status != "VERIFIED":
            continue

        # 70% of verified customers buy at least 1 policy
        if random.random() > 0.7:
            continue

        num_policies = random.randint(1, 3)
        for _ in range(num_policies):
            product = random.choice(active_products)
            start_date = get_random_date_between(customer.created_at, date(2025, 12, 31))
            end_date = start_date + timedelta(days=365)

            policy_status = pick_weighted(["ACTIVE", "LAPSED", "CANCELLED", "EXPIRED"], [80, 10, 5, 5])
            if end_date < date.today():
                policy_status = "EXPIRED"

            policy = Policy(
                policy_number=f"IMP-{product.category[:3]}-{uuid.uuid4().hex[:6].upper()}",
                customer_id=customer.id,
                product_id=product.id,
                status=policy_status,
                coverage_amount=product.max_coverage * random.uniform(0.5, 1.0),
                premium_frequency=random.choice(product.premium_frequencies),
                premium_status="PAID" if policy_status != "LAPSED" else "OVERDUE",
                start_date=start_date,
                end_date=end_date,
                created_at=start_date
            )
            db.add(policy)
            await db.flush()

            # Seed Installments (Phase 6)
            await seed_installments(db, policy)

            created_policies.append(policy)

    await db.commit()
    print(f"✅ Created {len(created_policies)} policies and their installments.")
    return created_policies

async def seed_installments(db: AsyncSession, policy: Policy):
    # Simplification: create 12 monthly or 1 yearly installment
    num_inst = 12 if policy.premium_frequency == "MONTHLY" else 1
    amount = 1200 / num_inst # Simplified amount

    for i in range(num_inst):
        due_date = policy.start_date + timedelta(days=i*30)
        status = "PAID"
        pay_date = due_date - timedelta(days=random.randint(0, 5))

        if due_date > date.today():
            status = "PENDING"
            pay_date = None
        elif policy.status == "LAPSED" and i > 5:
            status = "OVERDUE"
            pay_date = None

        inst = PremiumInstallment(
            policy_id=policy.id,
            amount=amount,
            due_date=due_date,
            status=status,
            payment_date=pay_date,
            transaction_id=f"TXN-{uuid.uuid4().hex[:8].upper()}" if pay_date else None,
            created_at=policy.created_at
        )
        db.add(inst)
