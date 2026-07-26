from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import text
from typing import Annotated, Optional

# Custom type for UUID Primary Keys
pk_uuid = Annotated[UUID, mapped_column(primary_key=True, default=uuid4)]

class Base(DeclarativeBase):
    pass

class AuditMixin:
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    updated_at: Mapped[datetime] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"),
        onupdate=datetime.utcnow
    )
    created_by: Mapped[Optional[UUID]] = mapped_column(nullable=True)
    updated_by: Mapped[Optional[UUID]] = mapped_column(nullable=True)
