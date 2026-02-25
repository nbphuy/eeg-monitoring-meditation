from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
    duration = Column(Float, nullable=True)  # in seconds
    meditation_quality_score = Column(Float, nullable=True)
    notes = Column(String, nullable=True)
    
    # Relationships
    eeg_records = relationship("EEGRecord", back_populates="session", cascade="all, delete-orphan")
    analytics = relationship("SessionAnalytics", back_populates="session", uselist=False, cascade="all, delete-orphan")


class EEGRecord(Base):
    __tablename__ = "eeg_records"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    channel_data = Column(JSON)  # Store EEG channel data as JSON
    processed_features = Column(JSON, nullable=True)  # Extracted features
    
    # Relationships
    session = relationship("Session", back_populates="eeg_records")


class SessionAnalytics(Base):
    __tablename__ = "session_analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), unique=True)
    
    # Average band powers
    avg_delta_power = Column(Float)
    avg_theta_power = Column(Float)
    avg_alpha_power = Column(Float)
    avg_beta_power = Column(Float)
    avg_gamma_power = Column(Float)
    
    # Meditation metrics
    focus_percentage = Column(Float)
    relaxation_percentage = Column(Float)
    distraction_percentage = Column(Float)
    
    # Additional metrics
    alpha_theta_ratio = Column(Float, nullable=True)
    meditation_depth_score = Column(Float, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    session = relationship("Session", back_populates="analytics")
