from app.schemas.base import BaseSchema, AuditSchema
from datetime import date
from typing import List, Optional
from uuid import UUID

class PolicyBase(BaseSchema):
    coverage_amount: float
    premium_frequency: str
    start_date: date
    end_date: date

class PolicyCreate(PolicyBase):
    product_id: UUID
    customer_id: UUID
    nominee_ids: List[UUID]

class PolicyRead(PolicyBase, AuditSchema):
    policy_number: str
    status: str
    product_name: str
    customer_name: str
