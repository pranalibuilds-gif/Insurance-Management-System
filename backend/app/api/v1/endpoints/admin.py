from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.admin import AuditLogRead, SystemConfigRead
from app.core.security.deps import get_current_active_superuser
from app.models.user import User
from app.models.user import User
from typing import List

router = APIRouter()

@router.get("/audit-logs", response_model=List[AuditLogRead])
async def get_audit_logs(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    return []

@router.get("/config", response_model=SystemConfigRead)
async def get_system_config(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    return {
        "company_name": "Insurance Management Platform",
        "support_email": "support@imp.com",
        "sla_deadline_hrs": 48,
        "session_timeout_mins": 30,
        "mfa_required": False
    }
