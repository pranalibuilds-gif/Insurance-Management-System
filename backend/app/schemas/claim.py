from app.schemas.base import BaseSchema, AuditSchema
from datetime import date
from typing import List, Optional
from uuid import UUID

class ClaimBase(BaseSchema):
    incident_date: date
    description: str
    requested_amount: float

class ClaimCreate(ClaimBase):
    policy_id: UUID

class ClaimRead(ClaimBase, AuditSchema):
    claim_number: str
    status: str
    policy_number: str
    approved_amount: float
    settlement_amount: float
