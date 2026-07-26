from pydantic import EmailStr, Field
from app.schemas.base import BaseSchema
from uuid import UUID
from typing import List, Optional

class Token(BaseSchema):
    access_token: str
    token_type: str
    refresh_token: str

class TokenPayload(BaseSchema):
    sub: Optional[str] = None
    role: Optional[str] = None

class UserLogin(BaseSchema):
    email: EmailStr
    password: str

class UserCreate(BaseSchema):
    email: EmailStr
    password: str
    full_name: str
    role: str = "CUSTOMER"

class UserUpdate(BaseSchema):
    password: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None

class UserRead(BaseSchema):
    id: UUID
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    is_verified: bool
