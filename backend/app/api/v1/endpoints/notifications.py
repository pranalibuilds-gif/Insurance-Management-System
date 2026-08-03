from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.notification import NotificationWorkspaceRead
from app.core.security.deps import get_current_user
from app.models.user import User
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=NotificationWorkspaceRead)
async def list_my_notifications(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Implementation placeholder
    return {"unread_count": 0, "notifications": []}
