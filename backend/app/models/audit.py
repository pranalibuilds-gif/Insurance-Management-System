from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, JSON, DateTime, text
from app.models.base.base import Base, pk_uuid
from uuid import UUID
from datetime import datetime
from typing import Optional

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[pk_uuid]
    timestamp: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    actor: Mapped[str] = mapped_column(String(255), nullable=False)
    action: Mapped[str] = mapped_column(String(50), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(50), nullable=False)
    entity_id: Mapped[str] = mapped_column(String(50), nullable=False)
    details: Mapped[dict] = mapped_column(JSON, nullable=False)
    ip_address: Mapped[str] = mapped_column(String(50), nullable=False)
