from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, JSON, DateTime, text
from app.models.base.base import Base, pk_uuid
from uuid import UUID
from datetime import datetime
from typing import Optional

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[pk_uuid]
    timestamp: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"), index=True)
    actor: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    action: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    entity_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    entity_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    details: Mapped[dict] = mapped_column(JSON, nullable=False)
    ip_address: Mapped[str] = mapped_column(String(50), nullable=False)
