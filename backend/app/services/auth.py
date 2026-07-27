from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.models.customer import Customer
from app.schemas.auth import UserCreate, Token
from app.core.security.auth import get_password_hash, create_access_token, verify_password
from app.core.exceptions import IMPException
from fastapi import status
from uuid import UUID

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def register_user(self, user_in: UserCreate) -> User:
        # Check if email exists
        query = select(User).where(User.email == user_in.email)
        result = await self.db.execute(query)
        if result.scalar_one_or_none():
            raise IMPException(
                message="User with this email already exists",
                code="AUTH_EMAIL_EXISTS",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        # Create User
        db_user = User(
            email=user_in.email,
            password_hash=get_password_hash(user_in.password),
            full_name=user_in.full_name,
            role=user_in.role
        )
        self.db.add(db_user)

        # If customer role, create customer profile
        if user_in.role == "CUSTOMER":
            name_parts = user_in.full_name.split(' ', 1)
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ""

            db_customer = Customer(
                user=db_user,
                first_name=first_name,
                last_name=last_name,
                phone=f"NEW-{db_user.id}", # Placeholder until profile update
                dob="1900-01-01", # Placeholder
                address={"line1": "", "city": "", "country": ""} # Placeholder
            )
            self.db.add(db_customer)

        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def authenticate(self, email: str, password: str) -> User:
        query = select(User).where(User.email == email)
        result = await self.db.execute(query)
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.password_hash):
            raise IMPException(
                message="Invalid email or password",
                code="AUTH_INVALID_CREDENTIALS",
                status_code=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            raise IMPException(
                message="User account is disabled",
                code="AUTH_USER_DISABLED",
                status_code=status.HTTP_403_FORBIDDEN
            )

        return user
