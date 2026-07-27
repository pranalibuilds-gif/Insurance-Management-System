from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.claim import ClaimRead, ClaimCreate
from app.services.claim import ClaimService
from typing import List

router = APIRouter()

@router.post("/", response_model=ClaimRead)
async def create_claim(
    claim_in: ClaimCreate,
    db: AsyncSession = Depends(get_db)
):
    service = ClaimService(db)
    return await service.submit_claim(claim_in)

@router.get("/", response_model=List[ClaimRead])
async def list_claims(
    db: AsyncSession = Depends(get_db)
):
    service = ClaimService(db)
    return await service.list_claims()
