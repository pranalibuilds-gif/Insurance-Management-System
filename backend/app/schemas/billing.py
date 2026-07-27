from app.schemas.base import BaseSchema, AuditSchema
from datetime import date
from typing import List, Optional
from uuid import UUID

class InstallmentRead(AuditSchema):
    policy_id: UUID
    amount: float
    due_date: date
    status: str
    payment_date: Optional[date] = None
    transaction_id: Optional[str] = None
    receipt_number: Optional[str] = None

class ReceiptRead(AuditSchema):
    receipt_number: str
    amount: float
    payment_date: date
    payment_method: str
    download_url: str

class BillingDashboardRead(BaseSchema):
    total_paid: float
    total_outstanding: float
    next_payment_date: Optional[date]
    next_payment_amount: float
    recent_transactions: List[InstallmentRead]
