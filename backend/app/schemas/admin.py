from app.schemas.base import BaseSchema, AuditSchema
from typing import List, Optional
from datetime import datetime
from uuid import UUID

class AuditLogRead(BaseSchema):
    id: UUID
    timestamp: datetime
    actor: str
    action: str
    category: str
    entity_type: str
    entity_id: str
    details: dict
    ip_address: str

class SystemConfigRead(BaseSchema):
    company_name: str
    support_email: str
    sla_deadline_hrs: int
    session_timeout_mins: int
    mfa_required: bool
