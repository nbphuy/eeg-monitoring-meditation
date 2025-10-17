import asyncio, orjson
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.websocket.manager import manager
from app.signal_processing.simulator import EEGSimulator
from app.signal_processing.processor import simple_meditation_index
from app.api.v1.router import api_router

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)

sim = EEGSimulator(fs=settings.SIMULATOR_HZ)

@app.get("/")
def root():
    return {"name": settings.APP_NAME, "ws": settings.WS_PATH}

@app.websocket(settings.WS_PATH)
async def ws_eeg(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            frame = sim.next_frame(samples=16)
            idx = simple_meditation_index(frame["bands"])
            payload = {**frame, "meditation_index": idx}
            await ws.send_bytes(orjson.dumps(payload))
            await asyncio.sleep(16 / frame["fs"])  # tốc độ thực
    except Exception:
        pass
    finally:
        manager.disconnect(ws)