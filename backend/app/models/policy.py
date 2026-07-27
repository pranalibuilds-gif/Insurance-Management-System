from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, Date, JSON, ForeignKey
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from datetime import date
from typing import List, Optional

class Policy(Base, AuditMixin):
    __tablename__ = "policies"

    id: Mapped[pk_uuid]
    policy_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    customer_id: Mapped[UUID] = mapped_column(ForeignKey("customers.id"), nullable=False)
    product_id: Mapped[UUID] = mapped_column(ForeignKey("products.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="ACTIVE")
    coverage_amount: Mapped[float] = mapped_column(Float, nullable=False)
    premium_frequency: Mapped[str] = mapped_column(String(50), nullable=False)
    premium_status: Mapped[str] = mapped_column(String(50), default="PAID")
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    nominee_ids: Mapped[List[UUID]] = mapped_column(JSON, default=list)

    # Relationships
    customer: Mapped["Customer"] = relationship(back_populates="policies")
    product: Mapped["Product"] = relationship(back_populates="policies")
    claims: Mapped[List["Claim"]] = relationship(back_populates="policy")

from app.models.customer import Customer
from app.models.product import Product
from app.models.claim import Claim
