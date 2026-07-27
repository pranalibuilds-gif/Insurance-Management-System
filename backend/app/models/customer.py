from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Date, JSON, ForeignKey
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from datetime import date
from typing import List, Optional

class Customer(Base, AuditMixin):
    __tablename__ = "customers"

    id: Mapped[pk_uuid]
    user_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("users.id"), unique=True, nullable=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    dob: Mapped[date] = mapped_column(Date, nullable=False)
    kyc_status: Mapped[str] = mapped_column(String(50), default="NOT_SUBMITTED")
    status: Mapped[str] = mapped_column(String(50), default="REGISTERED")
    address: Mapped[dict] = mapped_column(JSON, nullable=False)

    # Relationships
    user: Mapped[Optional["User"]] = relationship(back_populates="customer")
    policies: Mapped[List["Policy"]] = relationship(back_populates="customer")

from app.models.user import User
from app.models.policy import Policy
