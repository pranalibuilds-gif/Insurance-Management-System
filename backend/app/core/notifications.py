import abc
from app.core.logging import logger

class INotificationProvider(abc.ABC):
    @abc.abstractmethod
    async def send(self, recipient: str, subject: str, body: str) -> bool:
        pass

class ConsoleEmailProvider(INotificationProvider):
    async def send(self, recipient: str, subject: str, body: str) -> bool:
        logger.info("email_sent_mock", recipient=recipient, subject=subject)
        return True

class NotificationService:
    def __init__(self):
        self.email_provider = ConsoleEmailProvider() # Default to console/mock

    async def send_email(self, recipient: str, subject: str, body: str):
        return await self.email_provider.send(recipient, subject, body)

notification_service = NotificationService()
