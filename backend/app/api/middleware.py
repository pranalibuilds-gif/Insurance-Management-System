import time
import uuid
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.logging import logger

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = str(uuid.uuid4())
        structlog_logger = logger.bind(request_id=request_id)

        start_time = time.time()

        structlog_logger.info(
            "request_started",
            path=request.url.path,
            method=request.method,
            client_ip=request.client.host if request.client else None
        )

        try:
            response = await call_next(request)
            process_time = time.time() - start_time

            structlog_logger.info(
                "request_finished",
                status_code=response.status_code,
                duration_ms=int(process_time * 1000)
            )

            response.headers["X-Request-ID"] = request_id
            return response

        except Exception as e:
            process_time = time.time() - start_time
            structlog_logger.error(
                "request_failed",
                error=str(e),
                duration_ms=int(process_time * 1000)
            )
            raise
