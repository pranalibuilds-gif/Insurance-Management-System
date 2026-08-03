from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.customer import CustomerRead, CustomerUpdate
from app.services.customer import CustomerService
from app.core.security.deps import get_current_user
from app.models.user import User
from app.models.user import User

router = APIRouter()

@router.get("/me/profile", response_model=CustomerRead)
async def get_my_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = CustomerService(db)
    return await service.get_profile(current_user.id)

@router.put("/me/profile", response_model=CustomerRead)
async def update_my_profile(
    data: CustomerUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = CustomerService(db)
    return await service.update_profile(current_user.id, data)
