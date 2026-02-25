from abc import ABC, abstractmethod
from typing import Any, Dict

class EEGSource(ABC):
    @abstractmethod
    async def start(self): ...
    @abstractmethod
    async def stop(self): ...
    @abstractmethod
    def next_frame(self) -> Dict[str, Any]: ...