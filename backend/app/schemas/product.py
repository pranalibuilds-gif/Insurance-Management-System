from app.schemas.base import BaseSchema, AuditSchema
from typing import List, Optional

class ProductBase(BaseSchema):
    name: str
    category: str
    description: str
    min_coverage: float
    max_coverage: float
    base_premium: float
    waiting_period_days: int

class ProductRead(ProductBase, AuditSchema):
    status: str
    version: int
    is_active: bool
