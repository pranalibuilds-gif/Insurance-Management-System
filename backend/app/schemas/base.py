from pydantic import BaseModel, ConfigDict, AliasGenerator
from pydantic.alias_generators import to_camel
from typing import Generic, TypeVar, List, Optional
from datetime import datetime
from uuid import UUID

T = TypeVar("T")

class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=AliasGenerator(
            validation_alias=to_camel,
            serialization_alias=to_camel,
        ),
        populate_by_name=True
    )

class AuditSchema(BaseSchema):
    id: UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[UUID] = None
    updated_by: Optional[UUID] = None

class PageResponse(BaseSchema, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    pages: int

class ErrorDetail(BaseSchema):
    code: str
    message: str
    details: Optional[List[dict]] = None

class ErrorResponse(BaseSchema):
    error: ErrorDetail
