from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.auth import Token, UserLogin, UserCreate, UserRead
from app.services.auth import AuthService
from app.core.security.auth import create_access_token
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> Any:
    auth_service = AuthService(db)
    user = await auth_service.register_user(user_in)
    return user

@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db)
) -> Any:
    auth_service = AuthService(db)
    user = await auth_service.authenticate(login_data.email, login_data.password)

    access_token = create_access_token(subject=user.id, role=user.role)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": "not_implemented" # Future: Implement refresh tokens
    }
