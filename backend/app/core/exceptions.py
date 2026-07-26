from fastapi import Request, status
from fastapi.responses import JSONResponse
from typing import Any, Dict, Optional

class IMPException(Exception):
    def __init__(
        self,
        message: str,
        code: str = "INTERNAL_ERROR",
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        details: Optional[Any] = None
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details

async def imp_exception_handler(request: Request, exc: IMPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": exc.details
            }
        },
    )
