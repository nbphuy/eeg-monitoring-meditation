from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Project Info
    PROJECT_NAME: str = "EEG Meditation Monitoring"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    
    # Database
    DATABASE_URL: str = "sqlite:///./eeg_meditation.db"
    
    # EEG Settings
    SAMPLING_RATE: int = 256  # Hz
    NUM_CHANNELS: int = 4  # Number of EEG channels
    BUFFER_SIZE: int = 1024
    
    # Signal Processing
    LOWCUT: float = 0.5  # Hz
    HIGHCUT: float = 50.0  # Hz
    NOTCH_FREQ: float = 50.0  # Hz (60.0 for US)
    
    # Frequency Bands (Hz)
    DELTA_BAND: tuple = (0.5, 4)
    THETA_BAND: tuple = (4, 8)
    ALPHA_BAND: tuple = (8, 13)
    BETA_BAND: tuple = (13, 30)
    GAMMA_BAND: tuple = (30, 50)
    
    # WebSocket
    WS_MESSAGE_RATE: int = 10  # messages per second
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
