from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey, JSON
from app.models.base.base import Base, AuditMixin, pk_uuid
from uuid import UUID
from typing import List, Optional

class Document(Base, AuditMixin):
    __tablename__ = "documents"

    id: Mapped[pk_uuid]
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="PENDING")
    file_size: Mapped[int] = mapped_column(Integer, nullable=False)
    storage_path: Mapped[str] = mapped_column(String(500), nullable=False)
    current_version: Mapped[int] = mapped_column(Integer, default=1)

    # Metadata for verification
    verified_by: Mapped[Optional[UUID]] = mapped_column(nullable=True)
    verified_at: Mapped[Optional[str]] = mapped_column(nullable=True)
    remarks: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    # Contextual links (Generic or specific FKs)
    customer_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("customers.id"), nullable=True)
    policy_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("policies.id"), nullable=True)
    claim_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("claims.id"), nullable=True)

    # Relationships
    versions: Mapped[List["DocumentVersion"]] = relationship(back_populates="document", cascade="all, delete-orphan")

class DocumentVersion(Base, AuditMixin):
    __tablename__ = "document_versions"

    id: Mapped[pk_uuid]
    document_id: Mapped[UUID] = mapped_column(ForeignKey("documents.id"), nullable=False)
    version: Mapped[int] = mapped_column(Integer, nullable=False)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    file_size: Mapped[int] = mapped_column(Integer, nullable=False)
    storage_path: Mapped[str] = mapped_column(String(500), nullable=False)

    document: Mapped["Document"] = relationship(back_populates="versions")
