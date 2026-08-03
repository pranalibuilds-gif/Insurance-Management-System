from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.claim import ClaimRead, ClaimCreate
from app.services.claim import ClaimService
from typing import List

from app.core.security.deps import get_current_user, RoleChecker
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=ClaimRead)
async def create_claim(
    claim_in: ClaimCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = ClaimService(db)
    # IDOR check: Verify policy belongs to current user
    # This should be inside service.submit_claim
    return await service.submit_claim(claim_in, current_user.id)

@router.get("/", response_model=List[ClaimRead])
async def list_claims(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RoleChecker(["ADMIN", "MANAGER", "AGENT"]))
):
    service = ClaimService(db)
    return await service.list_claims()
