from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, Date, JSON, ForeignKey
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from datetime import date
from typing import List, Optional

class Claim(Base, AuditMixin):
    __tablename__ = "claims"

    id: Mapped[pk_uuid]
    claim_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    policy_id: Mapped[UUID] = mapped_column(ForeignKey("policies.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(50), default="SUBMITTED", index=True)
    incident_date: Mapped[date] = mapped_column(Date, nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    requested_amount: Mapped[float] = mapped_column(Float, nullable=False)
    approved_amount: Mapped[float] = mapped_column(Float, default=0.0)
    settlement_amount: Mapped[float] = mapped_column(Float, default=0.0)
    risk_indicators: Mapped[List[dict]] = mapped_column(JSON, default=list)

    # Relationships
    policy: Mapped["Policy"] = relationship(back_populates="claims")

from app.models.policy import Policy
