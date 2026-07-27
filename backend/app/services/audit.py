from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit import AuditLog
from typing import Any, Dict

class AuditService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def log_event(
        self,
        actor: str,
        action: str,
        category: str,
        entity_type: str,
        entity_id: str,
        details: Dict[str, Any],
        ip_address: str = "0.0.0.0"
    ):
        log = AuditLog(
            actor=actor,
            action=action,
            category=category,
            entity_type=entity_type,
            entity_id=entity_id,
            details=details,
            ip_address=ip_address
        )
        self.db.add(log)
        await self.db.commit()
