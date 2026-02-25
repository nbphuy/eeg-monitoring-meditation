from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Dict


# Session Schemas
class SessionBase(BaseModel):
    user_id: str
    notes: Optional[str] = None


class SessionCreate(SessionBase):
    pass


class SessionUpdate(BaseModel):
    notes: Optional[str] = None
    meditation_quality_score: Optional[float] = Field(None, ge=0, le=10)


class SessionInDB(SessionBase):
    id: int
    start_time: datetime
    end_time: Optional[datetime] = None
    duration: Optional[float] = None
    meditation_quality_score: Optional[float] = None
    
    class Config:
        from_attributes = True


# EEG Record Schemas
class EEGRecordBase(BaseModel):
    channel_data: Dict[str, List[float]]
    processed_features: Optional[Dict] = None


class EEGRecordCreate(EEGRecordBase):
    session_id: int


class EEGRecordInDB(EEGRecordBase):
    id: int
    session_id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True


# Analytics Schemas
class SessionAnalyticsBase(BaseModel):
    avg_delta_power: float
    avg_theta_power: float
    avg_alpha_power: float
    avg_beta_power: float
    avg_gamma_power: float
    focus_percentage: float
    relaxation_percentage: float
    distraction_percentage: float
    alpha_theta_ratio: Optional[float] = None
    meditation_depth_score: Optional[float] = None


class SessionAnalyticsCreate(SessionAnalyticsBase):
    session_id: int


class SessionAnalyticsInDB(SessionAnalyticsBase):
    id: int
    session_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# Real-time Data Schemas
class EEGDataPoint(BaseModel):
    timestamp: float
    channels: List[float]
    

class ProcessedEEGData(BaseModel):
    timestamp: float
    raw_data: List[float]
    band_powers: Dict[str, float]
    meditation_state: str
    quality_indicators: Dict[str, float]


# WebSocket Message Schemas
class WSMessage(BaseModel):
    type: str
    data: Dict
    timestamp: float


class SessionResponse(SessionInDB):
    analytics: Optional[SessionAnalyticsInDB] = None
    
    class Config:
        from_attributes = True
