from sqlalchemy.ext.asyncio import AsyncSession
from app.models.product import Product
from app.seeds.utils import get_random_date
from datetime import datetime

PRODUCTS = [
    {
        "name": "Health Secure Gold",
        "category": "HEALTH",
        "description": "Comprehensive health coverage for you and your family.",
        "versions": [
            {"version": 1, "status": "ARCHIVED", "premium": 350, "coverage": 300000, "date": datetime(2020, 1, 1)},
            {"version": 2, "status": "DEPRECATED", "premium": 400, "coverage": 400000, "date": datetime(2022, 1, 1)},
            {"version": 3, "status": "ACTIVE", "premium": 450, "coverage": 500000, "date": datetime(2024, 1, 1)},
        ]
    },
    {
        "name": "Vehicle Protect Premium",
        "category": "VEHICLE",
        "description": "Maximum protection for your car against accidents and theft.",
        "versions": [
            {"version": 1, "status": "DEPRECATED", "premium": 100, "coverage": 1000000, "date": datetime(2021, 6, 1)},
            {"version": 2, "status": "ACTIVE", "premium": 120, "coverage": 1500000, "date": datetime(2023, 6, 1)},
        ]
    },
    {
        "name": "Term Life Essential",
        "category": "LIFE",
        "description": "High-value life coverage at affordable premiums.",
        "versions": [
            {"version": 1, "status": "ACTIVE", "premium": 800, "coverage": 10000000, "date": datetime(2022, 1, 1)},
        ]
    }
]

async def seed_products(db: AsyncSession):
    created_products = []
    for p_data in PRODUCTS:
        for v in p_data["versions"]:
            product = Product(
                name=p_data["name"],
                category=p_data["category"],
                description=p_data["description"],
                short_description=p_data["description"][:100],
                status=v["status"],
                version=v["version"],
                min_coverage=v["coverage"] * 0.5,
                max_coverage=v["coverage"] * 2,
                base_premium=v["premium"],
                waiting_period_days=30,
                premium_frequencies=["MONTHLY", "YEARLY"],
                required_documents=["ID", "Address"],
                exclusions=["Self-inflicted"],
                eligibility={"min_age": 18, "max_age": 65},
                is_active=(v["status"] == "ACTIVE"),
                created_at=v["date"]
            )
            db.add(product)
            created_products.append(product)

    await db.commit()
    print(f"✅ Created {len(created_products)} product versions.")
    return created_products
