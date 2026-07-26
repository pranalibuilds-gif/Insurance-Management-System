from pydantic import Field
from app.schemas.base import BaseSchema, AuditSchema
from datetime import date
from typing import List, Optional
from uuid import UUID

class AddressSchema(BaseSchema):
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str

class NomineeBase(BaseSchema):
    full_name: str
    relationship: str
    dob: date
    share_percentage: float = Field(..., ge=0, le=100)
    contact_number: Optional[str] = None

class NomineeRead(NomineeBase):
    id: UUID

class CustomerBase(BaseSchema):
    first_name: str
    last_name: str
    phone: str
    dob: date
    address: AddressSchema

class CustomerCreate(CustomerBase):
    user_id: Optional[UUID] = None

class CustomerRead(CustomerBase, AuditSchema):
    kyc_status: str
    status: str
    nominees: List[NomineeRead] = []
