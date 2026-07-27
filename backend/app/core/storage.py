import abc
import os
import shutil
from typing import BinaryIO
from app.core.config import settings

class IStorageProvider(abc.ABC):
    @abc.abstractmethod
    async def upload(self, file: BinaryIO, path: str) -> str:
        pass

    @abc.abstractmethod
    async def download(self, path: str) -> BinaryIO:
        pass

    @abc.abstractmethod
    async def delete(self, path: str) -> bool:
        pass

class LocalStorageProvider(IStorageProvider):
    def __init__(self, base_path: str = "uploads"):
        self.base_path = base_path
        if not os.path.exists(base_path):
            os.makedirs(base_path)

    async def upload(self, file: BinaryIO, path: str) -> str:
        full_path = os.path.join(self.base_path, path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        with open(full_path, "wb") as buffer:
            shutil.copyfileobj(file, buffer)
        return full_path

    async def download(self, path: str) -> BinaryIO:
        full_path = os.path.join(self.base_path, path)
        return open(full_path, "rb")

    async def delete(self, path: str) -> bool:
        full_path = os.path.join(self.base_path, path)
        if os.path.exists(full_path):
            os.remove(full_path)
            return True
        return False

# Factory to get storage provider based on settings
def get_storage_provider() -> IStorageProvider:
    # Future: return S3Provider if configured
    return LocalStorageProvider()

storage = get_storage_provider()
