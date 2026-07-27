from app.schemas.base import BaseSchema, AuditSchema
from typing import List, Optional
from uuid import UUID

class NotificationRead(AuditSchema):
    category: str
    title: str
    message: str
    type: str
    status: str
    action_label: Optional[str] = None
    action_href: Optional[str] = None

class NotificationWorkspaceRead(BaseSchema):
    unread_count: int
    notifications: List[NotificationRead]
