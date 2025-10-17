from typing import Set
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active: Set[WebSocket] = set()

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.add(ws)

    def disconnect(self, ws: WebSocket):
        self.active.discard(ws)

    async def broadcast(self, message: str | bytes):
        for ws in list(self.active):
            try:
                await ws.send_text(message) if isinstance(message, str) else await ws.send_bytes(message)
            except Exception:
                self.disconnect(ws)

manager = ConnectionManager()