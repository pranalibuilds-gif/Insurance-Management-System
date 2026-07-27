from app.schemas.base import BaseSchema, AuditSchema
from typing import List, Optional
from uuid import UUID

class DocumentVersionRead(AuditSchema):
    version: int
    file_name: str
    file_size: int

class DocumentRead(AuditSchema):
    title: str
    category: str
    mime_type: str
    status: str
    file_size: int
    current_version: int
    verified_by: Optional[UUID] = None
    verified_at: Optional[str] = None
    remarks: Optional[str] = None
    versions: List[DocumentVersionRead] = []
