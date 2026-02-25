<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.core.database import get_db
from app.models.models import Session as SessionModel, SessionAnalytics
from app.schemas.schemas import SessionCreate, SessionUpdate, SessionResponse, SessionInDB
from app.websocket.manager import manager
import uuid

router = APIRouter()


@router.post("/sessions", response_model=SessionInDB)
async def create_session(session: SessionCreate, db: Session = Depends(get_db)):
    """Create a new meditation session"""
    db_session = SessionModel(
        user_id=session.user_id,
        notes=session.notes,
        start_time=datetime.utcnow()
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.get("/sessions", response_model=List[SessionInDB])
async def get_sessions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all meditation sessions"""
    sessions = db.query(SessionModel).offset(skip).limit(limit).all()
    return sessions


@router.get("/sessions/{session_id}", response_model=SessionResponse)
async def get_session(session_id: int, db: Session = Depends(get_db)):
    """Get a specific meditation session with analytics"""
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.put("/sessions/{session_id}", response_model=SessionInDB)
async def update_session(session_id: int, session_update: SessionUpdate, 
                        db: Session = Depends(get_db)):
    """Update a meditation session"""
    db_session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    update_data = session_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_session, field, value)
    
    db.commit()
    db.refresh(db_session)
    return db_session


@router.delete("/sessions/{session_id}")
async def delete_session(session_id: int, db: Session = Depends(get_db)):
    """Delete a meditation session"""
    db_session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db.delete(db_session)
    db.commit()
    return {"message": "Session deleted successfully"}


@router.post("/sessions/{session_id}/end")
async def end_session(session_id: int, db: Session = Depends(get_db)):
    """End a meditation session"""
    db_session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db_session.end_time = datetime.utcnow()
    if db_session.start_time:
        duration = (db_session.end_time - db_session.start_time).total_seconds()
        db_session.duration = duration
    
    db.commit()
    db.refresh(db_session)
    return db_session


@router.websocket("/ws/eeg/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    """WebSocket endpoint for real-time EEG data streaming"""
    await manager.connect(websocket, client_id)
    
    try:
        while True:
            # Receive messages from client
            data = await websocket.receive_json()
            message_type = data.get("type")
            
            if message_type == "start_stream":
                state = data.get("state", "relaxed")
                manager.start_streaming(client_id, state)
                await manager.send_personal_message({
                    "type": "status",
                    "message": "Streaming started"
                }, client_id)
                
            elif message_type == "stop_stream":
                manager.stop_streaming(client_id)
                await manager.send_personal_message({
                    "type": "status",
                    "message": "Streaming stopped"
                }, client_id)
                
            elif message_type == "change_state":
                state = data.get("state", "relaxed")
                manager.stop_streaming(client_id)
                manager.start_streaming(client_id, state)
                
    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(client_id)
=======
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}
>>>>>>> origin/main
