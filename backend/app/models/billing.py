from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, Date, ForeignKey, JSON
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from datetime import date
from typing import List, Optional

class PremiumInstallment(Base, AuditMixin):
    __tablename__ = "premium_installments"

    id: Mapped[pk_uuid]
    policy_id: Mapped[UUID] = mapped_column(ForeignKey("policies.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    due_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="PENDING") # PENDING, PAID, OVERDUE
    payment_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    transaction_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    receipt_number: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

class PaymentReceipt(Base, AuditMixin):
    __tablename__ = "payment_receipts"

    id: Mapped[pk_uuid]
    receipt_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    installment_id: Mapped[UUID] = mapped_column(ForeignKey("premium_installments.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    payment_date: Mapped[date] = mapped_column(Date, nullable=False)
    payment_method: Mapped[str] = mapped_column(String(50), nullable=False)
    storage_path: Mapped[str] = mapped_column(String(500), nullable=False)
