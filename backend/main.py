<<<<<<< HEAD
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.core.config import settings
from app.websocket.manager import manager

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Real-Time EEG Signal Processing and Visualization API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {
        "message": "EEG Meditation Monitoring API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
=======
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
>>>>>>> origin/main
