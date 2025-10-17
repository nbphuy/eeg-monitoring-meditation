from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    APP_NAME: str = "EEG Meditation Monitor"
    API_V1_PREFIX: str = "/api/v1"
    WS_PATH: str = "/ws/eeg"
    SIMULATOR_HZ: int = 128
    USE_SIMULATOR: bool = True  # False → dùng adapter thật (Brainlife)
    # DB_URL: str = "sqlite:///./eeg.db"  # khi cần
    class Config:
        env_file = ".env"

settings = Settings()
