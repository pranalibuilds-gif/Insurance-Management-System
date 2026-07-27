from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.policy import PolicyRead, PolicyCreate
from app.services.policy import PolicyService
from typing import List
import uuid

router = APIRouter()

@router.post("/", response_model=PolicyRead)
async def create_policy(
    policy_in: PolicyCreate,
    db: AsyncSession = Depends(get_db)
):
    service = PolicyService(db)
    # In real app, get customer_id from current_user
    return await service.issue_policy(policy_in.customer_id, policy_in)

@router.get("/my", response_model=List[PolicyRead])
async def get_my_policies(
    customer_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    service = PolicyService(db)
    return await service.get_customer_policies(customer_id)
