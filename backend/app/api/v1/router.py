from fastapi import APIRouter
<<<<<<< HEAD
from app.api.v1.endpoints import sessions

api_router = APIRouter()

api_router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
api_router.include_router(sessions.router, prefix="", tags=["websocket"])
=======
from .endpoints import sessions

api_router = APIRouter()
api_router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
>>>>>>> origin/main
