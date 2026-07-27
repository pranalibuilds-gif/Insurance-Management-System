from app.schemas.base import BaseSchema, AuditSchema
from typing import List, Optional

class ProductBase(BaseSchema):
    name: str
    category: str
    description: str
    short_description: str
    min_coverage: float
    max_coverage: float
    base_premium: float
    waiting_period_days: int
    eligibility: dict

class ProductCreate(ProductBase):
    premium_frequencies: List[str]
    required_documents: List[str]
    exclusions: List[str]

class ProductUpdate(BaseSchema):
    name: Optional[str] = None
    status: Optional[str] = None
    is_active: Optional[bool] = None

class ProductRead(ProductBase, AuditSchema):
    status: str
    version: int
    is_active: bool
