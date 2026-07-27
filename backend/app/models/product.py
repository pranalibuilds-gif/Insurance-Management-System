from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, Integer, Boolean, JSON
from app.models.base.base import Base, AuditMixin, pk_uuid
from typing import List

class Product(Base, AuditMixin):
    __tablename__ = "products"

    id: Mapped[pk_uuid]
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="DRAFT")
    version: Mapped[int] = mapped_column(Integer, default=1)
    min_coverage: Mapped[float] = mapped_column(Float, nullable=False)
    max_coverage: Mapped[float] = mapped_column(Float, nullable=False)
    base_premium: Mapped[float] = mapped_column(Float, nullable=False)
    waiting_period_days: Mapped[int] = mapped_column(Integer, default=30)
    required_documents: Mapped[List[str]] = mapped_column(JSON, default=list)
    premium_frequencies: Mapped[List[str]] = mapped_column(JSON, default=list)
    exclusions: Mapped[List[str]] = mapped_column(JSON, default=list)
    eligibility: Mapped[dict] = mapped_column(JSON, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # Relationships
    policies: Mapped[List["Policy"]] = relationship(back_populates="product")

from app.models.policy import Policy
