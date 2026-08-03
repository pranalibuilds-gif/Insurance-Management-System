from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.policy import PolicyRead, PolicyCreate
from app.services.policy import PolicyService
from typing import List
import uuid

from app.core.security.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=PolicyRead)
async def create_policy(
    policy_in: PolicyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = PolicyService(db)
    return await service.issue_policy(current_user.id, policy_in)

@router.get("/my", response_model=List[PolicyRead])
async def get_my_policies(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = PolicyService(db)
    # Find customer associated with user
    from app.services.customer import CustomerService
    cust_service = CustomerService(db)
    customer = await cust_service.get_profile(current_user.id)
    return await service.get_customer_policies(customer.id)
