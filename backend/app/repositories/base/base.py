from typing import Generic, TypeVar, Type, Optional, List, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from uuid import UUID

T = TypeVar("T")

class BaseRepository(Generic[T]):
    def __init__(self, model: Type[T], session: AsyncSession):
        self.model = model
        self.session = session

    async def get(self, id: UUID) -> Optional[T]:
        query = select(self.model).where(self.model.id == id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def list(self, skip: int = 0, limit: int = 100) -> List[T]:
        query = select(self.model).offset(skip).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def create(self, obj_in: Any) -> T:
        db_obj = self.model(**obj_in.dict())
        self.session.add(db_obj)
        await self.session.commit()
        await self.session.refresh(db_obj)
        return db_obj

    async def update(self, id: UUID, obj_in: Any) -> Optional[T]:
        query = update(self.model).where(self.model.id == id).values(**obj_in.dict(exclude_unset=True)).returning(self.model)
        result = await self.session.execute(query)
        await self.session.commit()
        return result.scalar_one_or_none()

    async def remove(self, id: UUID) -> bool:
        query = delete(self.model).where(self.model.id == id)
        await self.session.execute(query)
        await self.session.commit()
        return True
