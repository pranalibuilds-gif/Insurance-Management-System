from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, ForeignKey
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from typing import Optional

class Notification(Base, AuditMixin):
    __tablename__ = "notifications"

    id: Mapped[pk_uuid]
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(String(1000), nullable=False)
    type: Mapped[str] = mapped_column(String(50), default="INFO")
    status: Mapped[str] = mapped_column(String(50), default="UNREAD") # UNREAD, READ, ARCHIVED
    action_label: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    action_href: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
