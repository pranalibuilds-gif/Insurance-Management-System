from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, Enum
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from typing import List, Optional

class User(Base, AuditMixin):
    __tablename__ = "users"

    id: Mapped[pk_uuid]
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="CUSTOMER")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationships
    customer: Mapped[Optional["Customer"]] = relationship(back_populates="user", uselist=False)

from app.models.customer import Customer
